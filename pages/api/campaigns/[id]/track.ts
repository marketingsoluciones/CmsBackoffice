import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchApiCRM } from '../../../../utils/CRMFetching';
import { CRM_QUERIES } from '../../../../utils/crmQueries';

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
      // Obtener tracking de la campaña
      const campaignResponse = await fetchApiCRM({
        query: CRM_QUERIES.GET_CAMPAIGNS,
        variables: {
          pagination: { page: 1, limit: 1000 },
        },
        development,
      });

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

