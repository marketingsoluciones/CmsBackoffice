import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const { htmlContent, variables } = req.body;

      if (!htmlContent) {
        return res.status(400).json({
          success: false,
          error: 'htmlContent is required',
        });
      }

      // Reemplazar variables con valores de ejemplo
      let previewContent = htmlContent;
      const defaultVariables: Record<string, string> = {
        nombre_contacto: 'Juan Pérez',
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@example.com',
        phone: '+34 600 123 456',
        empresa: 'Mi Empresa',
        ciudad: 'Madrid',
        pais: 'España',
        nombre_negocio: 'Negocio Ejemplo',
        website: 'https://example.com',
        provincia: 'Madrid',
        categoria: 'Categoría Ejemplo',
        fecha_hoy: new Date().toLocaleDateString('es-ES'),
        mes_actual: new Date().toLocaleDateString('es-ES', { month: 'long' }),
        anio: new Date().getFullYear().toString(),
        hora_actual: new Date().toLocaleTimeString('es-ES'),
        dia_semana: new Date().toLocaleDateString('es-ES', { weekday: 'long' }),
        mi_nombre: 'Mi Empresa',
        mi_email: 'contacto@miempresa.com',
        mi_website: 'https://miempresa.com',
        ...variables,
      };

      // Reemplazar todas las variables {{variable}}
      Object.entries(defaultVariables).forEach(([key, value]) => {
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'gi');
        previewContent = previewContent.replace(regex, value);
      });

      return res.status(200).json({
        success: true,
        data: {
          preview: previewContent,
        },
        timestamp: new Date().toISOString(),
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('[API Template Preview] Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error?.message || 'Error processing request',
    });
  }
}

