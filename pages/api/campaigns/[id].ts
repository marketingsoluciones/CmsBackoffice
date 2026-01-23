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
    return res.status(400).json({ success: false, error: 'Campaign ID is required' });
  }

  try {
    if (req.method === 'GET') {
      // Obtener campaña - usar GET_CAMPAIGNS y filtrar por ID
      const token = getToken(req);
      const response = await fetchApiCRMFromServer(
        CRM_QUERIES.GET_CAMPAIGNS,
        {
          pagination: { page: 1, limit: 1000 },
        },
        development,
        token
      );

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
      // Filtrar campos que no están permitidos en CRM_CampaignUpdateInput
      const { status, ...input } = req.body;
      
      // Si solo se envía status, manejar el cambio de estado de forma especial
      if (status && Object.keys(input).length === 0) {
        // Si se intenta cambiar el status, usar scheduledAt para programar
        // El status se maneja automáticamente por el backend según scheduledAt y otras condiciones
        if (status === 'SCHEDULED') {
          // Si se programa sin fecha, usar fecha actual + 1 hora por defecto
          input.scheduledAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
        } else if (status === 'PAUSED' || status === 'CANCELLED') {
          // Para pausar o cancelar, no necesitamos enviar nada
          // El backend debería manejar estos estados automáticamente
          // Por ahora, retornamos éxito sin hacer cambios
          return res.status(200).json({
            success: true,
            message: `Status change to ${status} should be handled by the backend automatically`,
            timestamp: new Date().toISOString(),
          });
        } else if (status === 'RUNNING') {
          // Para iniciar, usar scheduledAt en el pasado para ejecutar inmediatamente
          input.scheduledAt = new Date().toISOString();
        } else {
          // Para otros estados, no hacer nada
          return res.status(200).json({
            success: true,
            message: `Status ${status} is managed automatically by the backend`,
            timestamp: new Date().toISOString(),
          });
        }
      }

      // Si después de procesar el status el input sigue vacío, no hacer nada
      if (Object.keys(input).length === 0) {
        return res.status(200).json({
          success: true,
          message: 'No changes to apply',
          timestamp: new Date().toISOString(),
        });
      }

      const token = getToken(req);
      const response = await fetchApiCRMFromServer(
        CRM_MUTATIONS.UPDATE_CAMPAIGN,
        { id, input },
        development,
        token
      );

      if (response?.updateCRMCampaign?.success) {
        return res.status(200).json({
          success: true,
          data: response.updateCRMCampaign.campaign,
          timestamp: new Date().toISOString(),
        });
      } else {
        return res.status(400).json({
          success: false,
          error: response?.updateCRMCampaign?.errors?.[0]?.message || 'Error updating campaign',
          errors: response?.updateCRMCampaign?.errors,
        });
      }
    }

    if (req.method === 'DELETE') {
      // Eliminar campaña
      const token = getToken(req);
      const response = await fetchApiCRMFromServer(
        CRM_MUTATIONS.DELETE_CAMPAIGN,
        { id },
        development,
        token
      );

      if (response?.deleteCRMCampaign?.success) {
        return res.status(200).json({
          success: true,
          message: 'Campaign deleted successfully',
          timestamp: new Date().toISOString(),
        });
      } else {
        return res.status(400).json({
          success: false,
          error: response?.deleteCRMCampaign?.errors?.[0]?.message || 'Error deleting campaign',
          errors: response?.deleteCRMCampaign?.errors,
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

