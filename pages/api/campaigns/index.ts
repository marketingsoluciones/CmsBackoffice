import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchApiCRM } from '../../../utils/CRMFetching';
import { CRM_QUERIES, CRM_MUTATIONS } from '../../../utils/crmQueries';

const DEFAULT_DEVELOPMENT = process.env.NEXT_PUBLIC_DEVELOPMENT || 'bodasdehoy';

// Helper para obtener development
const getDevelopment = (req: NextApiRequest): string => {
  const cookieDev = req.cookies?.development;
  if (cookieDev && typeof cookieDev === 'string') return cookieDev;
  
  const headerDev = req.headers['x-development'];
  if (headerDev) {
    if (typeof headerDev === 'string') return headerDev;
    if (Array.isArray(headerDev) && headerDev.length > 0) return headerDev[0];
  }
  
  return DEFAULT_DEVELOPMENT;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const development = getDevelopment(req);

  try {
    if (req.method === 'GET') {
      // Listar campañas
      const { page = 1, limit = 20, status, type, search } = req.query;

      const response = await fetchApiCRM({
        query: CRM_QUERIES.GET_CAMPAIGNS,
        variables: {
          pagination: {
            page: parseInt(String(page)),
            limit: parseInt(String(limit)),
          },
          filters: {
            ...(status ? { status: Array.isArray(status) ? status : [status] } : {}),
            ...(type ? { type: Array.isArray(type) ? type : [type] } : {}),
            ...(search ? { search: String(search) } : {}),
          },
        },
        development,
      });

      const campaigns = response?.getCRMCampaigns?.campaigns || [];
      const total = response?.getCRMCampaigns?.total || 0;

      return res.status(200).json({
        success: true,
        data: {
          campaigns,
          total,
          page: parseInt(String(page)),
          limit: parseInt(String(limit)),
        },
        timestamp: new Date().toISOString(),
      });
    }

    if (req.method === 'POST') {
      // Crear campaña
      const input = req.body;

      if (!input.name) {
        return res.status(400).json({
          success: false,
          error: 'Name is required',
        });
      }

      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.CREATE_CAMPAIGN,
        variables: { input },
        development,
      });

      if (response?.createCampaign?.success) {
        return res.status(201).json({
          success: true,
          data: response.createCampaign.campaign,
          timestamp: new Date().toISOString(),
        });
      } else {
        return res.status(400).json({
          success: false,
          error: response?.createCampaign?.errors?.[0]?.message || 'Error creating campaign',
          errors: response?.createCampaign?.errors,
        });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('[API Campaigns] Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error?.message || 'Error processing request',
    });
  }
}

