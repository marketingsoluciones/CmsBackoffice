import type { NextApiRequest, NextApiResponse } from 'next';
import { CRM_QUERIES, CRM_MUTATIONS } from '../../../../utils/crmQueries';

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
    if (req.method === 'POST') {
      const token = getToken(req);
      
      // Obtener plantilla original
      const getResponse = await fetchApiCRMFromServer(
        CRM_QUERIES.GET_CAMPAIGN_TEMPLATES,
        {
          pagination: { page: 1, limit: 1000 },
        },
        development,
        token
      );

      const templates = getResponse?.getCampaignTemplates?.templates || [];
      const originalTemplate = templates.find((t: any) => t.id === id);

      if (!originalTemplate) {
        return res.status(404).json({
          success: false,
          error: 'Template not found',
        });
      }

      // Crear copia con nombre modificado
      const response = await fetchApiCRMFromServer(
        CRM_MUTATIONS.CREATE_CAMPAIGN_TEMPLATE,
        {
          input: {
            name: `${originalTemplate.name} (Copia)`,
            type: originalTemplate.type,
            category: originalTemplate.category,
            subject: originalTemplate.subject,
            body: originalTemplate.body,
            variables: originalTemplate.variables || [],
            whitelabelId: originalTemplate.whitelabelId,
            enabled: originalTemplate.enabled,
            language: originalTemplate.language || 'es',
          },
        },
        development,
        token
      );

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

