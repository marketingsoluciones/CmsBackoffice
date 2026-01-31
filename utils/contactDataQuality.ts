/**
 * Utilidades para calcular calidad y completitud de datos de contactos
 */

export interface ContactData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  city?: string;
  country?: string;
  address?: string;
  linkedin?: string;
  website?: string;
  // category NO implementado - usar relationship
  relationship?: string;
  tags?: string[];
  emailStatus?: string;
  phoneStatus?: string;
}

/**
 * Calcula el score de calidad de datos (0-100)
 * Basado en campos llenos, verificados y completitud
 */
export function calculateDataQualityScore(contact: ContactData): number {
  let score = 0;

  // Información básica (40 puntos)
  if (contact.firstName && contact.firstName.trim()) score += 5;
  if (contact.lastName && contact.lastName.trim()) score += 5;
  if (contact.email && contact.email.trim()) score += 10;
  if (contact.phone && contact.phone.trim()) score += 10;
  if (contact.company && contact.company.trim()) score += 10;

  // Información de contacto verificada (20 puntos)
  // Mapear valores del backend: ACTIVE -> verified
  if (contact.emailStatus === "ACTIVE" || contact.emailStatus === "verified") score += 10;
  if (contact.phoneStatus === "ACTIVE" || contact.phoneStatus === "verified") score += 10;

  // Información de empresa (15 puntos)
  if (contact.position && contact.position.trim()) score += 5;
  if (contact.linkedin && contact.linkedin.trim()) score += 5;
  if (contact.website && contact.website.trim()) score += 5;

  // Ubicación (15 puntos)
  if (contact.city && contact.city.trim()) score += 5;
  if (contact.country && contact.country.trim()) score += 5;
  if (contact.address && contact.address.trim()) score += 5;

  // Clasificación (10 puntos)
  if (contact.relationship && contact.relationship.trim()) score += 5;
  if (contact.tags && contact.tags.length > 0) score += 5;

  return Math.min(100, score);
}

/**
 * Calcula el porcentaje de completitud (0-100)
 * Basado en campos requeridos y opcionales importantes
 */
export function calculateCompleteness(contact: ContactData): number {
  const fields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "company",
    "position",
    "city",
    "country",
    "linkedin",
    "relationship",
  ];

  const filledFields = fields.filter((field) => {
    const value = (contact as any)[field];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value && String(value).trim() !== "";
  });

  return Math.round((filledFields.length / fields.length) * 100);
}
