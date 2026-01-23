import type { NextApiRequest, NextApiResponse } from 'next';
import { CRM_QUERIES, CRM_MUTATIONS } from '../../../utils/crmQueries';

const CRM_ENDPOINT = (process.env.NEXT_PUBLIC_CRM_GRAPHQL || "https://api2.eventosorganizador.com/graphql").replace(/\/$/, "");
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

// Helper para obtener token desde cookies/headers
const getToken = (req: NextApiRequest): string | undefined => {
  const cookieToken = req.cookies?.['idTokenV0.1.0'];
  if (cookieToken) return cookieToken;
  
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  return undefined;
};

// Función para hacer peticiones GraphQL desde el servidor
const fetchApiCRMFromServer = async (
  query: string,
  variables: Record<string, any>,
  development: string,
  token?: string
) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const developmentValue = (development && typeof development === 'string' && development.trim()) || DEFAULT_DEVELOPMENT;
  headers['X-Development'] = developmentValue;

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (process.env.NEXT_PUBLIC_PRODUCTION) {
    headers['IsProduction'] = String(process.env.NEXT_PUBLIC_PRODUCTION);
  }

  const response = await fetch(CRM_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const text = await response.text();
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const json = JSON.parse(text);
      if (json?.errors?.length) {
        errorMessage = json.errors[0]?.message || errorMessage;
      }
    } catch {
      errorMessage = text || errorMessage;
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();
  
  if (data.errors && data.errors.length > 0) {
    throw new Error(data.errors[0]?.message || 'Error en la petición GraphQL');
  }

  return data.data;
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
    if (req.method === 'GET') {
      // Obtener plantilla
      // Necesitamos listar todas y filtrar por ID (ya que no hay query GET_TEMPLATE)
      const token = getToken(req);
      const response = await fetchApiCRMFromServer(
        CRM_QUERIES.GET_CAMPAIGN_TEMPLATES,
        {
          pagination: { page: 1, limit: 1000 },
        },
        development,
        token
      );

      const templates = response?.getCampaignTemplates?.templates || [];
      const template = templates.find((t: any) => t.id === id);

      if (!template) {
        return res.status(404).json({
          success: false,
          error: 'Template not found',
        });
      }

      return res.status(200).json({
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
          thumbnail: template.thumbnail,
          status: template.enabled ? 'active' : 'inactive',
          isActive: template.enabled,
          whitelabelId: template.whitelabelId,
          createdAt: template.createdAt,
          updatedAt: template.updatedAt,
        },
        timestamp: new Date().toISOString(),
      });
    }

    if (req.method === 'PUT') {
      // Actualizar plantilla
      const {
        name,
        category,
        subject,
        htmlContent,
        textContent,
        variables,
        enabled,
      } = req.body;

      const token = getToken(req);
      const response = await fetchApiCRMFromServer(
        CRM_MUTATIONS.UPDATE_CAMPAIGN_TEMPLATE,
        {
          id,
          input: {
            ...(name && { name }),
            ...(category !== undefined && { category }),
            ...(subject !== undefined && { subject }),
            ...(htmlContent !== undefined && { body: htmlContent }),
            ...(textContent !== undefined && { body: textContent }),
            ...(variables !== undefined && { variables }),
            ...(enabled !== undefined && { enabled }),
          },
        },
        development,
        token
      );

      if (response?.updateCampaignTemplate?.success) {
        const template = response.updateCampaignTemplate.template;
        return res.status(200).json({
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
            updatedAt: template.updatedAt,
          },
          timestamp: new Date().toISOString(),
        });
      } else {
        return res.status(400).json({
          success: false,
          error: response?.updateCampaignTemplate?.errors?.[0]?.message || 'Error updating template',
          errors: response?.updateCampaignTemplate?.errors,
        });
      }
    }

    if (req.method === 'DELETE') {
      // Eliminar plantilla
      const token = getToken(req);
      const response = await fetchApiCRMFromServer(
        CRM_MUTATIONS.DELETE_CAMPAIGN_TEMPLATE,
        { id },
        development,
        token
      );

      if (response?.deleteCampaignTemplate?.success) {
        return res.status(200).json({
          success: true,
          message: 'Template deleted successfully',
          timestamp: new Date().toISOString(),
        });
      } else {
        return res.status(400).json({
          success: false,
          error: response?.deleteCampaignTemplate?.errors?.[0]?.message || 'Error deleting template',
          errors: response?.deleteCampaignTemplate?.errors,
        });
      }
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('[API Template] Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error?.message || 'Error processing request',
    });
  }
}

