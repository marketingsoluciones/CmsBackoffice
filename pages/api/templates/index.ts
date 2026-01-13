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
  const development = getDevelopment(req);

  try {
    if (req.method === 'GET') {
      // Listar plantillas
      const { type, whitelabelId, category, status, search, page = 1, limit = 20 } = req.query;

      const response = await fetchApiCRM({
        query: CRM_QUERIES.GET_CAMPAIGN_TEMPLATES,
        variables: {
          type: type as any,
          whitelabelId: whitelabelId as string,
          pagination: {
            page: parseInt(String(page)),
            limit: parseInt(String(limit)),
          },
        },
        development,
      });

      let templates = response?.getCampaignTemplates?.templates || [];
      const total = response?.getCampaignTemplates?.total || 0;

      // Aplicar filtros adicionales en el frontend si es necesario
      if (category) {
        templates = templates.filter((t: any) => t.category === category);
      }
      if (status) {
        templates = templates.filter((t: any) => t.status === status);
      }
      if (search) {
        const searchLower = String(search).toLowerCase();
        templates = templates.filter(
          (t: any) =>
            t.name?.toLowerCase().includes(searchLower) ||
            t.subject?.toLowerCase().includes(searchLower) ||
            t.description?.toLowerCase().includes(searchLower)
        );
      }

      // Transformar a formato esperado
      const formattedTemplates = templates.map((t: any) => ({
        id: t.id,
        name: t.name,
        description: t.description,
        type: t.type,
        category: t.category,
        subject: t.subject,
        htmlContent: t.body,
        textContent: t.body, // Para WhatsApp/SMS
        variables: t.variables || [],
        thumbnail: t.thumbnail,
        status: t.enabled ? 'active' : 'inactive',
        isActive: t.enabled,
        whitelabelId: t.whitelabelId,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      }));

      return res.status(200).json({
        success: true,
        data: {
          templates: formattedTemplates,
          total,
          page: parseInt(String(page)),
          limit: parseInt(String(limit)),
        },
        timestamp: new Date().toISOString(),
      });
    }

    if (req.method === 'POST') {
      // Crear plantilla
      const {
        name,
        type,
        category,
        subject,
        htmlContent,
        textContent,
        variables,
        whitelabelId,
      } = req.body;

      if (!name || !type) {
        return res.status(400).json({
          success: false,
          error: 'Name and type are required',
        });
      }

      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.CREATE_CAMPAIGN_TEMPLATE,
        variables: {
          input: {
            name,
            type,
            category,
            subject,
            body: htmlContent || textContent,
            variables: variables || [],
            whitelabelId,
            enabled: true,
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
          error: response?.createCampaignTemplate?.errors?.[0]?.message || 'Error creating template',
          errors: response?.createCampaignTemplate?.errors,
        });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('[API Templates] Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error?.message || 'Error processing request',
    });
  }
}

