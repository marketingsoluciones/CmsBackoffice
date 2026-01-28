import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../lib/api-client';
import { Campaign, CampaignExecution, TrackingEvent, ApiResponse, PaginatedResponse } from '../types/campaigns';

// Listar campañas
export function useCampaigns(page = 1, limit = 20, filters?: { status?: string; type?: string; search?: string }) {
  const [data, setData] = useState<PaginatedResponse<Campaign> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get<ApiResponse<{ campaigns: Campaign[]; total: number; page: number; limit: number }>>(
        '/campaigns',
        { page, limit, ...filters }
      );
      if (response.success) {
        setData({
          items: response.data.campaigns,
          total: response.data.total,
          page: response.data.page,
          limit: response.data.limit,
          totalPages: Math.ceil(response.data.total / response.data.limit),
        });
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, filters?.status, filters?.type, filters?.search]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  return { data, loading, error, refetch: fetchCampaigns };
}

// Obtener campaña
export function useCampaign(id: string | null, pollInterval?: number) {
  const [data, setData] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCampaign = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await apiClient.get<ApiResponse<Campaign>>(`/campaigns/${id}`);
      if (response.success) {
        setData(response.data);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCampaign();
    
    if (pollInterval && id) {
      const interval = setInterval(fetchCampaign, pollInterval);
      return () => clearInterval(interval);
    }
  }, [fetchCampaign, pollInterval, id]);

  return { data, loading, error, refetch: fetchCampaign };
}

// Crear campaña
export function useCreateCampaign() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createCampaign = useCallback(async (campaignData: Partial<Campaign>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.post<ApiResponse<Campaign>>('/campaigns', campaignData);
      if (response.success) {
        return response.data;
      } else {
        throw new Error('Failed to create campaign');
      }
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createCampaign, loading, error };
}

// Actualizar campaña
export function useUpdateCampaign() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateCampaign = useCallback(async (id: string, campaignData: Partial<Campaign>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.put<ApiResponse<Campaign>>(`/campaigns/${id}`, campaignData);
      if (response.success) {
        return response.data;
      } else {
        throw new Error('Failed to update campaign');
      }
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateCampaign, loading, error };
}

// Eliminar campaña
export function useDeleteCampaign() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteCampaign = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/campaigns/${id}`);
      if (response.success) {
        return true;
      } else {
        throw new Error('Failed to delete campaign');
      }
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteCampaign, loading, error };
}

// Ejecuciones de campaña
export function useCampaignExecutions(campaignId: string | null, pollInterval?: number) {
  const [data, setData] = useState<CampaignExecution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchExecutions = useCallback(async () => {
    if (!campaignId) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await apiClient.get<ApiResponse<{ executions: CampaignExecution[] }>>(
        `/campaigns/${campaignId}/execute`
      );
      if (response.success) {
        setData(response.data.executions);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [campaignId]);

  // Polling inteligente: activar si hay ejecuciones RUNNING o si se especifica pollInterval
  const hasRunningExecutions = data.some(exec => 
    exec.status === 'RUNNING' || 
    exec.status === 'running' ||
    (exec.queueStats && (exec.queueStats.pending > 0 || exec.queueStats.processing > 0))
  );

  useEffect(() => {
    fetchExecutions();
    
    // Polling automático si hay ejecuciones RUNNING o si se especifica pollInterval
    const shouldPoll = pollInterval || (hasRunningExecutions && campaignId);
    const intervalTime = pollInterval || 4000; // 4 segundos por defecto si hay ejecuciones RUNNING
    
    if (shouldPoll && campaignId) {
      const interval = setInterval(fetchExecutions, intervalTime);
      return () => clearInterval(interval);
    }
  }, [fetchExecutions, pollInterval, campaignId, hasRunningExecutions]);

  return { data, loading, error, refetch: fetchExecutions };
}

// Cola de emails (estado global de la cola de envíos)
export function useQueueEmails(pollInterval?: number) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchQueue = useCallback(async () => {
    try {
      setError(null);
      
      // Usar el proxy de Next.js para evitar problemas de CORS
      const response = await apiClient.get<ApiResponse<any>>('/queue/emails', {
        limit: 100,
      });

      if (response.success) {
        // Si el endpoint no está disponible aún, data será null
        setData(response.data || null);
      } else {
        throw new Error(response.error || 'Error al obtener la cola de emails');
      }
    } catch (err: any) {
      setError(err);
      // No mostrar error si el endpoint no existe aún
      if (err.message?.includes('404') || err.message?.includes('Not Found') || err.message?.includes('not available')) {
        setData(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQueue();
    
    if (pollInterval) {
      const interval = setInterval(fetchQueue, pollInterval);
      return () => clearInterval(interval);
    }
  }, [fetchQueue, pollInterval]);

  return { data, loading, error, refetch: fetchQueue };
}

// Tracking de campaña
export function useCampaignTracking(campaignId: string | null, pollInterval?: number) {
  const [data, setData] = useState<TrackingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTracking = useCallback(async () => {
    if (!campaignId) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await apiClient.get<ApiResponse<{ events: TrackingEvent[] }>>(
        `/campaigns/${campaignId}/track`
      );
      if (response.success) {
        setData(response.data.events);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [campaignId]);

  useEffect(() => {
    fetchTracking();
    
    if (pollInterval && campaignId) {
      const interval = setInterval(fetchTracking, pollInterval);
      return () => clearInterval(interval);
    }
  }, [fetchTracking, pollInterval, campaignId]);

  return { data, loading, error, refetch: fetchTracking };
}

// Ejecutar campaña
export function useExecuteCampaign() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const executeCampaign = useCallback(async (campaignId: string, notes?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.post<ApiResponse<any>>(
        `/campaigns/${campaignId}/execute`,
        { notes }
      );
      if (response.success) {
        return response.data;
      } else {
        throw new Error('Failed to execute campaign');
      }
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { executeCampaign, loading, error };
}

