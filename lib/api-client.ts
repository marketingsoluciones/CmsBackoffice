// Cliente HTTP para APIs REST según la guía

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

async function request<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${url}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const apiClient = {
  get: async <T>(url: string, params?: Record<string, any>): Promise<T> => {
    const queryString = params
      ? '?' + new URLSearchParams(
          Object.entries(params).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
              acc[key] = String(value);
            }
            return acc;
          }, {} as Record<string, string>)
        ).toString()
      : '';
    return request<T>(`${url}${queryString}`, { method: 'GET' });
  },

  post: async <T>(url: string, data: any): Promise<T> => {
    return request<T>(url, { method: 'POST', body: data });
  },

  put: async <T>(url: string, data: any): Promise<T> => {
    return request<T>(url, { method: 'PUT', body: data });
  },

  delete: async <T>(url: string): Promise<T> => {
    return request<T>(url, { method: 'DELETE' });
  },
};

