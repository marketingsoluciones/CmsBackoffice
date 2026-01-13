import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchApiCRM } from '../../../../utils/CRMFetching';
import { CRM_QUERIES, CRM_MUTATIONS } from '../../../../utils/crmQueries';

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
    return res.status(400).json({ success: false, error: 'Template ID is required' });
  }

  try {
    if (req.method === 'POST') {
      // Obtener plantilla original
      const getResponse = await fetchApiCRM({
        query: CRM_QUERIES.GET_CAMPAIGN_TEMPLATES,
        variables: {
          pagination: { page: 1, limit: 1000 },
        },
        development,
      });

      const templates = getResponse?.getCampaignTemplates?.templates || [];
      const originalTemplate = templates.find((t: any) => t.id === id);

      if (!originalTemplate) {
        return res.status(404).json({
          success: false,
          error: 'Template not found',
        });
      }

      // Crear copia con nombre modificado
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.CREATE_CAMPAIGN_TEMPLATE,
        variables: {
          input: {
            name: `${originalTemplate.name} (Copia)`,
            type: originalTemplate.type,
            category: originalTemplate.category,
            subject: originalTemplate.subject,
            body: originalTemplate.body,
            variables: originalTemplate.variables || [],
            whitelabelId: originalTemplate.whitelabelId,
            enabled: originalTemplate.enabled,
          },
        },
        development,
      });

      if (response?.createCampaignTemplate?.success) {
        const template = response.createCampaignTemplate.template;
        return res.status(201).json({
          success: true,
          data: {
            id: template.id,
            name: template.name,
            type: template.type,
            category: template.category,
            subject: template.subject,
            htmlContent: template.body,
            textContent: template.body,
            variables: template.variables || [],
            whitelabelId: template.whitelabelId,
            createdAt: template.createdAt,
            updatedAt: template.updatedAt,
          },
          timestamp: new Date().toISOString(),
        });
      } else {
        return res.status(400).json({
          success: false,
          error: response?.createCampaignTemplate?.errors?.[0]?.message || 'Error duplicating template',
          errors: response?.createCampaignTemplate?.errors,
        });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('[API Template Duplicate] Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error?.message || 'Error processing request',
    });
  }
}

