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
    return res.status(400).json({ success: false, error: 'Campaign ID is required' });
  }

  try {
    if (req.method === 'GET') {
      // Obtener ejecuciones de la campaña
      const campaignResponse = await fetchApiCRM({
        query: CRM_QUERIES.GET_CAMPAIGNS,
        variables: {
          pagination: { page: 1, limit: 1000 },
        },
        development,
      });

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

      // Actualizar estado a RUNNING para iniciar ejecución
      const updateResponse = await fetchApiCRM({
        query: CRM_MUTATIONS.UPDATE_CAMPAIGN,
        variables: {
          id,
          input: {
            status: 'RUNNING',
            notes: notes || 'Ejecución manual',
          },
        },
        development,
      });

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

