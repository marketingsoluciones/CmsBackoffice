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
  // Intentar obtener desde cookie
  const cookieToken = req.cookies?.['idTokenV0.1.0'];
  if (cookieToken) return cookieToken;
  
  // Intentar obtener desde header Authorization
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

  // SIEMPRE enviar X-Development
  const developmentValue = (development && typeof development === 'string' && development.trim()) || DEFAULT_DEVELOPMENT;
  headers['X-Development'] = developmentValue;

  // Agregar token si existe
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Agregar header IsProduction si está definido
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
  const development = getDevelopment(req);

  try {
    if (req.method === 'GET') {
      // Listar plantillas
      const { type, whitelabelId, category, status, search, page = 1, limit = 20 } = req.query;

      const token = getToken(req);
      const response = await fetchApiCRMFromServer(
        CRM_QUERIES.GET_CAMPAIGN_TEMPLATES,
        {
          type: type as any,
          whitelabelId: whitelabelId as string,
          pagination: {
            page: parseInt(String(page)),
            limit: parseInt(String(limit)),
          },
        },
        development,
        token
      );

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

      const token = getToken(req);
      const response = await fetchApiCRMFromServer(
        CRM_MUTATIONS.CREATE_CAMPAIGN_TEMPLATE,
        {
          input: {
            name,
            type,
            category,
            subject,
            body: htmlContent || textContent,
            variables: variables || [],
            whitelabelId,
            enabled: true,
            language: 'es', // Idioma por defecto
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

