import type { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';

const CRM_ENDPOINT = (process.env.NEXT_PUBLIC_CRM_GRAPHQL || "https://api2.eventosorganizador.com/graphql").replace(/\/$/, "");
const DEFAULT_DEVELOPMENT = process.env.NEXT_PUBLIC_DEVELOPMENT || "bodasdehoy";

// Helper para convertir Node.js stream a ReadableStream para fetch
function nodeStreamToWebStream(nodeStream: Readable): ReadableStream {
  return new ReadableStream({
    start(controller) {
      // Asegurarse de que el stream esté en modo flowing
      if (nodeStream.readableFlowing === null) {
        nodeStream.resume();
      }
      
      nodeStream.on('data', (chunk) => {
        try {
          controller.enqueue(Buffer.from(chunk));
        } catch (err) {
          controller.error(err);
        }
      });
      
      nodeStream.on('end', () => {
        controller.close();
      });
      
      nodeStream.on('error', (err) => {
        controller.error(err);
      });
    },
    cancel() {
      // Limpiar listeners si se cancela el stream
      nodeStream.removeAllListeners();
      nodeStream.destroy();
    },
  });
}

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
  const cookieToken = req.cookies?.['idTokenV0.1.0'];
  if (cookieToken) return cookieToken;
  
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
  // Manejar preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Development');
    return res.status(200).end();
  }

  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Obtener development y token
    const development = getDevelopment(req);
    const token = getToken(req);
    
    // Log siempre para debugging
    console.log('[API Proxy CRM Upload] Headers recibidos:', {
      'x-development': req.headers['x-development'],
      'development-cookie': req.cookies?.development,
      'development-resolved': development,
      'all-headers-keys': Object.keys(req.headers).filter(k => k.toLowerCase().includes('dev')),
    });

    // Preparar headers para la petición al backend
    const headers: Record<string, string> = {};
    
    // Copiar Content-Type del request original (incluye boundary)
    const contentType = req.headers['content-type'];
    if (contentType) {
      headers['Content-Type'] = contentType;
    }
    
    // Header para Apollo Server v4 CSRF protection (si es necesario)
    // Apollo Server v4 puede requerir este header para multipart requests
    headers['Apollo-Require-Preflight'] = 'true';
    
    // SIEMPRE enviar X-Development (aunque sea el default)
    // Asegurar que siempre tenga un valor válido
    const developmentValue = (development && typeof development === 'string' && development.trim()) || DEFAULT_DEVELOPMENT;
    headers['X-Development'] = developmentValue;
    
    // Log siempre para debugging
    console.log('[API Proxy CRM Upload] Enviando headers al backend:', {
      'X-Development': headers['X-Development'],
      'development-original': development,
      'DEFAULT_DEVELOPMENT': DEFAULT_DEVELOPMENT,
      hasAuth: !!token,
      endpoint: CRM_ENDPOINT,
    });
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    if (process.env.NEXT_PUBLIC_PRODUCTION) {
      headers['IsProduction'] = String(process.env.NEXT_PUBLIC_PRODUCTION);
    }

    // Reenviar el request completo al backend
    // Cuando bodyParser: false, req es un stream de Node.js que necesitamos convertir
    const nodeStream = req as unknown as Readable;
    const webStream = nodeStreamToWebStream(nodeStream);
    
    // Hacer la petición al backend desde el servidor (sin restricciones CORS)
    // Nota: duplex: 'half' es requerido cuando se usa un stream como body
    const backendResponse = await fetch(CRM_ENDPOINT, {
      method: 'POST',
      headers,
      body: webStream as any,
      // @ts-ignore - duplex es requerido para streams pero no está en los tipos de TypeScript
      duplex: 'half',
    });

    // Obtener el body de la respuesta como texto primero para manejar errores
    const responseText = await backendResponse.text();
    
    // Intentar parsear como JSON
    let responseData: any;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      // Si no es JSON válido, devolver el texto como error
      console.error('[API Proxy CRM Upload] Backend response is not valid JSON:', responseText.substring(0, 500));
      return res.status(backendResponse.status || 500).json({
        error: 'Invalid response from backend',
        message: `Backend returned non-JSON response: ${responseText.substring(0, 200)}`,
        status: backendResponse.status,
      });
    }

    // Establecer headers CORS correctos (sin duplicados)
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Development');

    // Devolver el status code y los datos
    return res.status(backendResponse.status).json(responseData);

  } catch (error: any) {
    console.error('[API Proxy CRM Upload] Error:', error);
    console.error('[API Proxy CRM Upload] Error stack:', error?.stack);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error?.message || 'Error processing upload request',
      details: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
    });
  }
}

// Configurar para manejar multipart/form-data sin parsear
export const config = {
  api: {
    bodyParser: false, // Desactivar bodyParser para reenviar el stream completo
  },
};

