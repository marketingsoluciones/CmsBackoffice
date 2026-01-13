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
    return res.status(400).json({ success: false, error: 'Campaign ID is required' });
  }

  try {
    if (req.method === 'GET') {
      // Obtener ejecuciones de la campaña
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
      const executions = campaign?.executions || [];

      return res.status(200).json({
        success: true,
        data: {
          executions: executions.map((exec: any, index: number) => ({
            id: exec.id || `exec_${index}`,
            status: exec.status || 'completed',
            startedAt: exec.startedAt || exec.createdAt,
            completedAt: exec.completedAt,
            results: exec.results || {
              total: 0,
              sent: 0,
              failed: 0,
            },
          })),
        },
        timestamp: new Date().toISOString(),
      });
    }

    if (req.method === 'POST') {
      // Ejecutar campaña manualmente
      const { notes } = req.body;
      const token = getToken(req);

      // Actualizar campaña para iniciar ejecución
      // No podemos enviar status directamente, usar scheduledAt en el pasado para ejecutar inmediatamente
      const updateResponse = await fetchApiCRMFromServer(
        CRM_MUTATIONS.UPDATE_CAMPAIGN,
        {
          id,
          input: {
            scheduledAt: new Date().toISOString(), // Fecha actual para ejecutar inmediatamente
            notes: notes || 'Ejecución manual',
          },
        },
        development,
        token
      );

      // Crear ejecución básica
      const execution = {
        id: `exec_${Date.now()}`,
        status: 'running',
        startedAt: new Date().toISOString(),
        results: {
          total: 0,
          sent: 0,
          failed: 0,
        },
      };

      return res.status(200).json({
        success: true,
        data: {
          executionId: execution.id,
          executionNumber: 1,
          status: 'running',
          config: {},
          tasksCreated: 0,
          message: 'Campaign execution started',
        },
        timestamp: new Date().toISOString(),
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('[API Campaign Execute] Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error?.message || 'Error processing request',
    });
  }
}
