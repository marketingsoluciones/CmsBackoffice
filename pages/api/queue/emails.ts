import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'js-cookie';
import { getAuth } from 'firebase/auth';

// Helper para obtener el token de autenticación
async function getToken(req: NextApiRequest): Promise<string | null> {
  // Intentar obtener desde cookies
  const cookieToken = req.cookies.idTokenV0_1_0 || req.headers.authorization?.replace('Bearer ', '');
  if (cookieToken) {
    return cookieToken;
  }

  // Intentar obtener desde headers
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.replace('Bearer ', '');
  }

  return null;
}

// Helper para obtener el development
function getDevelopment(req: NextApiRequest): string {
  return (req.headers['x-development'] as string) || 
         (req.query.development as string) || 
         'bodasdehoy';
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Solo permitir GET
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const token = await getToken(req);
    const development = getDevelopment(req);
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 100;

    // Validar límite
    if (limit > 500) {
      return res.status(400).json({ success: false, error: 'Limit cannot exceed 500' });
    }

    // Construir URL con query params
    const url = new URL('https://api2.eventosorganizador.com/api/queue/emails');
    if (limit) {
      url.searchParams.set('limit', limit.toString());
    }

    // Headers para la petición al backend
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Development': development,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Hacer la petición al backend
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
    });

    // Si el endpoint no existe (404), retornar null sin error
    if (response.status === 404) {
      return res.status(200).json({
        success: true,
        data: null,
        message: 'Endpoint not available yet',
        timestamp: new Date().toISOString(),
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        success: false,
        error: errorText || `HTTP ${response.status}: ${response.statusText}`,
      });
    }

    const data = await response.json();

    // Retornar la respuesta del backend
    return res.status(200).json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[API Queue Emails] Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
