import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../lib/api-client';
import { Template, ApiResponse, PaginatedResponse } from '../types/campaigns';

// Listar plantillas
export function useTemplates(
  type?: string,
  page = 1,
  limit = 20,
  filters?: { category?: string; status?: string; search?: string }
) {
  const [data, setData] = useState<PaginatedResponse<Template> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get<ApiResponse<{ templates: Template[]; total: number; page: number; limit: number }>>(
        '/templates',
        { type, page, limit, ...filters }
      );
      if (response.success) {
        setData({
          items: response.data.templates,
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
  }, [type, page, limit, filters?.category, filters?.status, filters?.search]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return { data, loading, error, refetch: fetchTemplates };
}

// Obtener plantilla
export function useTemplate(id: string | null) {
  const [data, setData] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTemplate = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await apiClient.get<ApiResponse<Template>>(`/templates/${id}`);
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
    fetchTemplate();
  }, [fetchTemplate]);

  return { data, loading, error, refetch: fetchTemplate };
}

// Crear plantilla
export function useCreateTemplate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createTemplate = useCallback(async (templateData: Partial<Template>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.post<ApiResponse<Template>>('/templates', templateData);
      if (response.success) {
        return response.data;
      } else {
        throw new Error('Failed to create template');
      }
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createTemplate, loading, error };
}

// Actualizar plantilla
export function useUpdateTemplate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateTemplate = useCallback(async (id: string, templateData: Partial<Template>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.put<ApiResponse<Template>>(`/templates/${id}`, templateData);
      if (response.success) {
        return response.data;
      } else {
        throw new Error('Failed to update template');
      }
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateTemplate, loading, error };
}

// Eliminar plantilla
export function useDeleteTemplate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteTemplate = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/templates/${id}`);
      if (response.success) {
        return true;
      } else {
        throw new Error('Failed to delete template');
      }
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteTemplate, loading, error };
}

// Duplicar plantilla
export function useDuplicateTemplate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const duplicateTemplate = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.post<ApiResponse<Template>>(`/templates/${id}/duplicate`, {});
      if (response.success) {
        return response.data;
      } else {
        throw new Error('Failed to duplicate template');
      }
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { duplicateTemplate, loading, error };
}

// Preview de plantilla
export function useTemplatePreview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const previewTemplate = useCallback(async (htmlContent: string, variables?: Record<string, string>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.post<ApiResponse<{ preview: string }>>('/templates/preview', {
        htmlContent,
        variables,
      });
      if (response.success) {
        return response.data.preview;
      } else {
        throw new Error('Failed to preview template');
      }
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { previewTemplate, loading, error };
}

