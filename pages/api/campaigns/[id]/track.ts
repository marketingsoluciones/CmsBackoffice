import type { NextApiRequest, NextApiResponse } from 'next';
import { CRM_QUERIES } from '../../../../utils/crmQueries';

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
      // Obtener tracking de la campaña
      const token = getToken(req);
      const campaignResponse = await fetchApiCRMFromServer(
        CRM_QUERIES.GET_CAMPAIGNS,
        {
          pagination: { page: 1, limit: 1000 },
        },
        development,
        token
      );

      const campaigns = campaignResponse?.getCRMCampaigns?.campaigns || [];
      const campaign = campaigns.find((c: any) => c.id === id);
      const metrics = campaign?.metrics || {};

      // Construir eventos de tracking desde métricas
      const events: any[] = [];

      // Simular eventos desde métricas (en producción esto vendría de una tabla de tracking)
      if (metrics.sent) {
        events.push({
          id: `event_sent_${id}`,
          type: 'sent',
          recipient: 'campaign',
          timestamp: campaign?.createdAt || new Date().toISOString(),
          metadata: { count: metrics.sent },
        });
      }

      if (metrics.opened) {
        events.push({
          id: `event_opened_${id}`,
          type: 'opened',
          recipient: 'campaign',
          timestamp: campaign?.updatedAt || new Date().toISOString(),
          metadata: { count: metrics.opened },
        });
      }

      if (metrics.clicked) {
        events.push({
          id: `event_clicked_${id}`,
          type: 'clicked',
          recipient: 'campaign',
          timestamp: campaign?.updatedAt || new Date().toISOString(),
          metadata: { count: metrics.clicked },
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          events,
        },
        timestamp: new Date().toISOString(),
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('[API Campaign Track] Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error?.message || 'Error processing request',
    });
  }
}
