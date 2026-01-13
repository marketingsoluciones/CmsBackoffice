import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchApiCRM } from '../../../utils/CRMFetching';
import { CRM_QUERIES, CRM_MUTATIONS } from '../../../utils/crmQueries';

const DEFAULT_DEVELOPMENT = process.env.NEXT_PUBLIC_DEVELOPMENT || 'bodasdehoy';

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
  const { id } = req.query;
  const development = getDevelopment(req);

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ success: false, error: 'Campaign ID is required' });
  }

  try {
    if (req.method === 'GET') {
      // Obtener campaña - usar GET_CAMPAIGNS y filtrar por ID
      const response = await fetchApiCRM({
        query: CRM_QUERIES.GET_CAMPAIGNS,
        variables: {
          pagination: { page: 1, limit: 1000 },
        },
        development,
      });

      // La respuesta puede venir en diferentes formatos
      const campaigns = response?.getCRMCampaigns?.campaigns || response?.data?.getCRMCampaigns?.campaigns || [];
      const campaign = campaigns.find((c: any) => c.id === id || c._id === id);

      if (campaign) {
        return res.status(200).json({
          success: true,
          data: campaign,
          timestamp: new Date().toISOString(),
        });
      } else {
        console.error('[API Campaign] Campaign not found:', { id, campaignsCount: campaigns.length, responseKeys: Object.keys(response || {}) });
        return res.status(404).json({
          success: false,
          error: 'Campaign not found',
          debug: { id, campaignsCount: campaigns.length },
        });
      }
    }

    if (req.method === 'PUT') {
      // Actualizar campaña
      const input = req.body;

      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.UPDATE_CAMPAIGN,
        variables: { id, input },
        development,
      });

      if (response?.updateCampaign?.success) {
        return res.status(200).json({
          success: true,
          data: response.updateCampaign.campaign,
          timestamp: new Date().toISOString(),
        });
      } else {
        return res.status(400).json({
          success: false,
          error: response?.updateCampaign?.errors?.[0]?.message || 'Error updating campaign',
          errors: response?.updateCampaign?.errors,
        });
      }
    }

    if (req.method === 'DELETE') {
      // Eliminar campaña
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.DELETE_CAMPAIGN,
        variables: { id },
        development,
      });

      if (response?.deleteCampaign?.success) {
        return res.status(200).json({
          success: true,
          message: 'Campaign deleted successfully',
          timestamp: new Date().toISOString(),
        });
      } else {
        return res.status(400).json({
          success: false,
          error: response?.deleteCampaign?.errors?.[0]?.message || 'Error deleting campaign',
          errors: response?.deleteCampaign?.errors,
        });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('[API Campaign] Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error?.message || 'Error processing request',
    });
  }
}

