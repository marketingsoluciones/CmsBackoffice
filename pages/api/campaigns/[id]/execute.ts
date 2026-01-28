import type { NextApiRequest, NextApiResponse } from 'next';
import { CRM_QUERIES, CRM_MUTATIONS } from '../../../../utils/crmQueries';

const CRM_ENDPOINT = (process.env.NEXT_PUBLIC_CRM_GRAPHQL || "https://api2.eventosorganizador.com/graphql").replace(/\/$/, "");
const DEFAULT_DEVELOPMENT = process.env.NEXT_PUBLIC_DEVELOPMENT || 'bodasdehoy';

// Almacenamiento temporal en memoria para ejecuciones de campañas
// Estructura: Map<campaignId, Array<execution>>
const executionsStore = new Map<string, any[]>();

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
      
      // Obtener ejecuciones del backend (ahora disponible en producción)
      let backendExecutions: any[] = [];
      try {
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
        backendExecutions = campaign?.executions || [];
      } catch (error) {
        // Si falla, usar ejecuciones en memoria como fallback
        console.warn('[API Campaign Execute] Error obteniendo ejecuciones del backend, usando memoria:', error);
      }

      // Obtener ejecuciones guardadas en memoria (fallback temporal)
      const memoryExecutions = executionsStore.get(id) || [];

      // Combinar ejecuciones (prioridad: backend > memoria)
      // Eliminar duplicados por ID, priorizando backend
      const allExecutions = [...backendExecutions, ...memoryExecutions];
      const uniqueExecutions = Array.from(
        new Map(allExecutions.map((exec: any) => [exec.id, exec])).values()
      );

      // Ordenar por fecha de inicio (más recientes primero)
      uniqueExecutions.sort((a: any, b: any) => {
        const dateA = new Date(a.startedAt || a.createdAt || 0).getTime();
        const dateB = new Date(b.startedAt || b.createdAt || 0).getTime();
        return dateB - dateA;
      });

      return res.status(200).json({
        success: true,
        data: {
          executions: uniqueExecutions.map((exec: any) => ({
            id: exec.id,
            executionNumber: exec.executionNumber,
            status: exec.status || 'completed',
            startedAt: exec.startedAt || exec.createdAt,
            completedAt: exec.completedAt,
            config: exec.config,
            results: exec.results || {
              total: 0,
              sent: 0,
              failed: 0,
            },
            notes: exec.notes,
            queueStats: exec.queueStats,
          })),
        },
        timestamp: new Date().toISOString(),
      });
    }

    if (req.method === 'POST') {
      // Ejecutar campaña manualmente
      const { notes, searchTerms, countries, regions, cities, sources } = req.body;
      const token = getToken(req);

      // Primero obtener la campaña para validar
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

      if (!campaign) {
        return res.status(404).json({
          success: false,
          error: 'Campaign not found',
        });
      }

      // Validaciones según el tipo de campaña
      if (campaign.type === 'SCRAPING') {
        // Validar términos de búsqueda
        const activeTerms = campaign.searchTerms?.filter((t: any) => t.enabled !== false) || [];
        const termsToUse = searchTerms && searchTerms.length > 0 ? searchTerms : activeTerms.map((t: any) => t.term || t);
        
        if (!termsToUse || termsToUse.length === 0) {
          return res.status(400).json({
            success: false,
            error: 'No hay términos de búsqueda activos. Agrega términos de búsqueda antes de ejecutar la campaña.',
          });
        }

        // Validar países
        const countriesToUse = countries && countries.length > 0 
          ? countries 
          : (campaign.searchConfig?.countries || []);
        
        if (!countriesToUse || countriesToUse.length === 0) {
          return res.status(400).json({
            success: false,
            error: 'No hay países configurados. Selecciona al menos un país objetivo antes de ejecutar la campaña.',
          });
        }
      } else {
        // Para campañas de envío, validar template y destinatarios
        if (!campaign.templateId) {
          return res.status(400).json({
            success: false,
            error: 'La campaña requiere un template. Selecciona un template antes de ejecutar.',
          });
        }

        const hasRecipients = 
          (campaign.recipient_selection?.events && campaign.recipient_selection.events.length > 0) ||
          (campaign.recipient_selection?.lists && campaign.recipient_selection.lists.length > 0) ||
          (campaign.recipient_selection?.tags?.include_tags && campaign.recipient_selection.tags.include_tags.length > 0);

        if (!hasRecipients) {
          return res.status(400).json({
            success: false,
            error: 'La campaña requiere destinatarios. Configura eventos, listas o tags antes de ejecutar.',
          });
        }
      }

      // Actualizar campaña para iniciar ejecución
      // Usar scheduledAt en el pasado para ejecutar inmediatamente
      const updateResponse = await fetchApiCRMFromServer(
        CRM_MUTATIONS.UPDATE_CAMPAIGN,
        {
          id,
          input: {
            scheduledAt: new Date().toISOString(), // Fecha actual para ejecutar inmediatamente
            notes: notes ? `${campaign.notes || ''}\n\nEjecución manual: ${notes}`.trim() : (campaign.notes || 'Ejecución manual'),
          },
        },
        development,
        token
      );

      if (!updateResponse?.updateCRMCampaign?.success) {
        return res.status(400).json({
          success: false,
          error: updateResponse?.updateCRMCampaign?.errors?.[0]?.message || 'Error al actualizar la campaña',
          errors: updateResponse?.updateCRMCampaign?.errors,
        });
      }

      // Obtener ejecuciones existentes (de memoria y backend)
      const memoryExecutions = executionsStore.get(id) || [];
      const backendExecutions = campaign.executions || [];
      const allExistingExecutions = [...memoryExecutions, ...backendExecutions];
      const executionNumber = allExistingExecutions.length + 1;

      // El backend ahora crea ejecuciones automáticamente cuando se actualiza scheduledAt
      // Esperar un momento y luego obtener la ejecución creada por el backend
      // Si el backend no la crea, usar la de memoria como fallback
      let execution;
      
      // Esperar un breve momento para que el backend cree la ejecución
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Intentar obtener la ejecución recién creada del backend
      try {
        const updatedCampaignResponse = await fetchApiCRMFromServer(
          CRM_QUERIES.GET_CAMPAIGNS,
          {
            pagination: { page: 1, limit: 1000 },
          },
          development,
          token
        );
        
        const updatedCampaigns = updatedCampaignResponse?.getCRMCampaigns?.campaigns || [];
        const updatedCampaign = updatedCampaigns.find((c: any) => c.id === id);
        const newBackendExecutions = updatedCampaign?.executions || [];
        
        // Si hay una nueva ejecución del backend, usarla
        if (newBackendExecutions.length > backendExecutions.length) {
          const newExecution = newBackendExecutions[0]; // La más reciente
          execution = {
            id: newExecution.id,
            executionNumber: newExecution.executionNumber,
            status: newExecution.status,
            startedAt: newExecution.startedAt,
            completedAt: newExecution.completedAt,
            config: newExecution.config,
            results: newExecution.results,
            notes: newExecution.notes,
            queueStats: newExecution.queueStats,
          };
        }
      } catch (error) {
        console.warn('[API Campaign Execute] Error obteniendo ejecución del backend:', error);
      }
      
      // Si el backend no creó la ejecución, crear una en memoria como fallback
      if (!execution) {
        execution = {
          id: `exec_${Date.now()}_${executionNumber}`,
          executionNumber,
          status: 'running' as const,
          startedAt: new Date().toISOString(),
          config: campaign.type === 'SCRAPING' ? {
            searchTerms: searchTerms && searchTerms.length > 0 ? searchTerms : (campaign.searchTerms?.filter((t: any) => t.enabled !== false).map((t: any) => t.term || t) || []),
            countries: countries && countries.length > 0 ? countries : (campaign.searchConfig?.countries || []),
            regions: regions || campaign.searchConfig?.regions || [],
            cities: cities || campaign.searchConfig?.cities || [],
            sources: sources || [],
          } : {
            templateId: campaign.templateId,
            recipient_selection: campaign.recipient_selection,
          },
          results: {
            total: 0,
            sent: 0,
            failed: 0,
            newBusinesses: campaign.type === 'SCRAPING' ? 0 : undefined,
            updatedBusinesses: campaign.type === 'SCRAPING' ? 0 : undefined,
            duplicatesSkipped: campaign.type === 'SCRAPING' ? 0 : undefined,
            errorsCount: 0,
          },
          notes: notes || undefined,
        };
        
        // Guardar ejecución en memoria solo si el backend no la creó
        const currentExecutions = executionsStore.get(id) || [];
        executionsStore.set(id, [...currentExecutions, execution]);
      }

      // Calcular tareas estimadas (para scraping)
      let tasksCreated = 0;
      let executionMessage = 'Ejecución de campaña iniciada';
      
      if (campaign.type === 'SCRAPING') {
        const termsCount = execution.config.searchTerms?.length || 0;
        const countriesCount = execution.config.countries?.length || 0;
        const citiesCount = execution.config.cities?.length || 1; // Si no hay ciudades, 1 por país
        tasksCreated = termsCount * countriesCount * citiesCount;
        executionMessage = `Ejecución de scraping iniciada con ${termsCount} término(s) y ${countriesCount} país(es)`;
      } else {
        // Para campañas de envío, estimar basado en destinatarios
        // Esto es una estimación, el backend calculará el número real
        tasksCreated = 1; // Se procesará como una tarea de envío
        executionMessage = 'Ejecución de campaña iniciada';
      }

      return res.status(200).json({
        success: true,
        data: {
          executionId: execution.id,
          executionNumber: execution.executionNumber,
          status: execution.status,
          config: execution.config,
          tasksCreated,
          message: executionMessage,
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
