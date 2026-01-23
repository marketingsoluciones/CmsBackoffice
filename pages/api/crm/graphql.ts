import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from 'firebase/auth';
import Cookies from 'js-cookie';
import { parseJwt } from '../../../utils/Authentication';

const CRM_ENDPOINT = (process.env.NEXT_PUBLIC_CRM_GRAPHQL || "https://api2.eventosorganizador.com/graphql").replace(/\/$/, "");
const DEFAULT_DEVELOPMENT = process.env.NEXT_PUBLIC_DEVELOPMENT || "bodasdehoy";

// Helper para obtener development desde cookies/headers
const getDevelopment = (req: NextApiRequest): string => {
  // Intentar obtener desde cookie
  const cookieDev = req.cookies?.development;
  if (cookieDev && typeof cookieDev === 'string') return cookieDev;
  
  // En Node.js, los headers siempre están en minúsculas en req.headers
  // Pero pueden ser string o array, así que necesitamos manejar ambos casos
  const headerDev = req.headers['x-development'];
  if (headerDev) {
    if (typeof headerDev === 'string') {
      return headerDev;
    } else if (Array.isArray(headerDev) && headerDev.length > 0) {
      return headerDev[0];
    }
  }
  
  return DEFAULT_DEVELOPMENT;
};

// Helper para obtener token desde cookies/headers
const getToken = (req: NextApiRequest): string | undefined => {
  // Intentar obtener desde cookie
  const cookieToken = req.cookies?.['idTokenV0.1.0'];
  if (cookieToken) return cookieToken;
  
  // Intentar obtener desde header Authorization
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  return undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // IMPORTANTE: Leer headers ANTES de procesar el body
    // Esto asegura que los headers estén disponibles incluso con bodies grandes
    const development = getDevelopment(req);
    const token = getToken(req);
    
    // Log siempre para debugging
    console.log('[API Proxy CRM] Headers recibidos:', {
      'x-development': req.headers['x-development'],
      'development-cookie': req.cookies?.development,
      'development-resolved': development,
      'content-length': req.headers['content-length'],
      'all-headers-keys': Object.keys(req.headers).filter(k => k.toLowerCase().includes('dev')),
    });
    
    const { query, variables } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Preparar headers para la petición al backend
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // SIEMPRE enviar X-Development (ya lo obtuvimos antes de procesar el body)
    // Asegurar que siempre tenga un valor válido
    const developmentValue = (development && typeof development === 'string' && development.trim()) || DEFAULT_DEVELOPMENT;
    headers['X-Development'] = developmentValue;
    
    // Log siempre (para debugging en producción también)
    console.log('[API Proxy CRM] Enviando headers al backend:', {
      'X-Development': headers['X-Development'],
      'development-original': development,
      'DEFAULT_DEVELOPMENT': DEFAULT_DEVELOPMENT,
      hasAuth: !!token,
      bodySize: JSON.stringify({ query, variables }).length,
      endpoint: CRM_ENDPOINT,
    });

    // Agregar token si existe
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Agregar header IsProduction si está definido
    if (process.env.NEXT_PUBLIC_PRODUCTION) {
      headers['IsProduction'] = String(process.env.NEXT_PUBLIC_PRODUCTION);
    }

    // Hacer la petición al backend desde el servidor (sin restricciones CORS)
    // Verificar que el header X-Development esté presente antes de enviar
    if (!headers['X-Development'] || !headers['X-Development'].trim()) {
      console.error('[API Proxy CRM] ERROR: X-Development header está vacío o undefined!', {
        'X-Development': headers['X-Development'],
        development,
        DEFAULT_DEVELOPMENT,
      });
      headers['X-Development'] = DEFAULT_DEVELOPMENT;
    }
    
    console.log('[API Proxy CRM] Realizando petición al backend:', {
      endpoint: CRM_ENDPOINT,
      method: 'POST',
      headers: Object.keys(headers),
      'X-Development-value': headers['X-Development'],
    });
    
    const backendResponse = await fetch(CRM_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
    });

    // Obtener el body de la respuesta
    const responseData = await backendResponse.json();
    
    // Log de la respuesta del backend si hay errores relacionados con development
    if (responseData?.data?.uploadCRMEntityFile?.errors?.some((e: any) => 
      e?.message?.toLowerCase().includes('development') || 
      e?.message?.toLowerCase().includes('desarrollo')
    )) {
      console.error('[API Proxy CRM] Backend reporta error de development:', {
        'X-Development-enviado': headers['X-Development'],
        'response-errors': responseData?.data?.uploadCRMEntityFile?.errors,
        'backend-url': CRM_ENDPOINT,
      });
    }

    // Copiar headers relevantes (excepto los CORS duplicados)
    const responseHeaders: Record<string, string> = {};
    
    // Copiar headers importantes pero filtrar duplicados CORS
    const corsHeaders = ['access-control-allow-origin', 'access-control-allow-credentials'];
    const seenHeaders = new Set<string>();
    
    backendResponse.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      // Si es un header CORS, solo copiarlo una vez
      if (corsHeaders.includes(lowerKey)) {
        if (!seenHeaders.has(lowerKey)) {
          responseHeaders[key] = value;
          seenHeaders.add(lowerKey);
        }
      } else {
        // Para otros headers, copiarlos normalmente
        responseHeaders[key] = value;
      }
    });

    // Establecer headers de respuesta
    Object.entries(responseHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    // Establecer headers CORS correctos (sin duplicados)
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Development');

    // Devolver el status code y los datos
    return res.status(backendResponse.status).json(responseData);

  } catch (error: any) {
    console.error('[API Proxy CRM] Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error?.message || 'Error processing request'
    });
  }
}

// Manejar preflight OPTIONS
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb', // Aumentado para soportar archivos base64 grandes
    },
  },
};

