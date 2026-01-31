/**
 * Utilidades para calcular calidad y completitud de datos de entidades
 */

export interface EntityData {
  name?: string;
  type?: string;
  website?: string;
  industry?: string;
  size?: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  socialMedia?: Record<string, string>;
  tags?: string[];
  phoneStatus?: string;
  emailStatus?: string;
  websiteStatus?: string;
}

/**
 * Calcula el score de calidad de datos (0-100)
 * Basado en campos llenos, verificados y completitud
 */
export function calculateEntityDataQualityScore(entity: EntityData): number {
  let score = 0;

  // Información básica (30 puntos)
  if (entity.name && entity.name.trim()) score += 10;
  if (entity.type && entity.type.trim()) score += 5;
  if (entity.industry && entity.industry.trim()) score += 5;
  if (entity.size && entity.size.trim()) score += 5;
  if (entity.description && entity.description.trim()) score += 5;

  // Información de contacto (25 puntos)
  if (entity.phone && entity.phone.trim()) score += 8;
  if (entity.email && entity.email.trim()) score += 8;
  if (entity.website && entity.website.trim()) score += 9;

  // Verificación de datos de contacto (20 puntos)
  // Mapear valores del backend: ACTIVE -> verified
  if (entity.phoneStatus === "ACTIVE" || entity.phoneStatus === "verified") score += 7;
  if (entity.emailStatus === "ACTIVE" || entity.emailStatus === "verified") score += 7;
  if (entity.websiteStatus === "ACTIVE" || entity.websiteStatus === "verified") score += 6;

  // Ubicación (15 puntos)
  if (entity.address) {
    if (entity.address.city && entity.address.city.trim()) score += 5;
    if (entity.address.country && entity.address.country.trim()) score += 5;
    if (entity.address.street && entity.address.street.trim()) score += 5;
  }

  // Información adicional (10 puntos)
  if (entity.socialMedia && Object.keys(entity.socialMedia).length > 0) score += 5;
  if (entity.tags && entity.tags.length > 0) score += 5;

  return Math.min(100, score);
}

/**
 * Calcula el porcentaje de completitud (0-100)
 * Basado en campos requeridos y opcionales importantes
 */
export function calculateEntityCompleteness(entity: EntityData): number {
  const fields = [
    "name",
    "type",
    "industry",
    "size",
    "website",
    "phone",
    "email",
    "description",
    "address.city",
    "address.country",
  ];

  const filledFields = fields.filter((field) => {
    if (field.startsWith("address.")) {
      const addressField = field.split(".")[1];
      return entity.address && entity.address[addressField as keyof typeof entity.address] && 
             String(entity.address[addressField as keyof typeof entity.address]).trim() !== "";
    }
    const value = (entity as any)[field];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value && String(value).trim() !== "";
  });

  return Math.round((filledFields.length / fields.length) * 100);
}
