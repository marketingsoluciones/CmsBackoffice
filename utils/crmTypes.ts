/**
 * Tipos y Enums para el módulo CRM
 * Alineados con el schema GraphQL del backend
 * 
 * Última actualización: 2025-12-08
 * Backend: Schema corregido con enums CRM_LeadSource, CRM_LeadStatus actualizado
 */

// ============================================================================
// ENUMS - CRM Lead Source
// ============================================================================

/**
 * Enum para la fuente de origen del lead
 * Valores disponibles según el backend
 */
export enum CRM_LeadSource {
  WEBSITE = "WEBSITE",
  REFERRAL = "REFERRAL",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  OTHER = "OTHER"
}

/**
 * Tipo para LeadSource (alternativa a enum)
 */
export type CRMLeadSource = 
  | "WEBSITE"
  | "REFERRAL"
  | "SOCIAL_MEDIA"
  | "EMAIL"
  | "PHONE"
  | "OTHER";

// ============================================================================
// ENUMS - CRM Lead Status
// ============================================================================

/**
 * Enum para el estado del lead
 * Valores disponibles según el backend (actualizado con CONVERTED y LOST)
 */
export enum CRM_LeadStatus {
  NEW = "NEW",
  CONTACTED = "CONTACTED",
  QUALIFIED = "QUALIFIED",
  CONVERTED = "CONVERTED",      // NUEVO
  LOST = "LOST",                // NUEVO
  PROPOSAL = "PROPOSAL",
  NEGOTIATION = "NEGOTIATION",
  CLOSED_WON = "CLOSED_WON",
  CLOSED_LOST = "CLOSED_LOST",
  FOLLOW_UP = "FOLLOW_UP",
  COLD = "COLD",
  HOT = "HOT",
  WARM = "WARM"
}

/**
 * Tipo para LeadStatus (alternativa a enum)
 */
export type CRMLeadStatus = 
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "CONVERTED"
  | "LOST"
  | "PROPOSAL"
  | "NEGOTIATION"
  | "CLOSED_WON"
  | "CLOSED_LOST"
  | "FOLLOW_UP"
  | "COLD"
  | "HOT"
  | "WARM";

// ============================================================================
// ENUMS - CRM Priority
// ============================================================================

/**
 * Enum para la prioridad del lead/contacto/entidad
 */
export enum CRM_Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT"
}

/**
 * Tipo para Priority (alternativa a enum)
 */
export type CRMPriority = 
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "URGENT";

// ============================================================================
// ENUMS - CRM Label Entity Type
// ============================================================================

/**
 * Enum para el tipo de entidad que puede tener etiquetas
 */
export enum CRM_LabelEntityType {
  LEAD = "LEAD",
  CONTACT = "CONTACT",
  ENTITY = "ENTITY",
  CAMPAIGN = "CAMPAIGN"
}

/**
 * Tipo para LabelEntityType (alternativa a enum)
 */
export type CRMLabelEntityType = 
  | "LEAD"
  | "CONTACT"
  | "ENTITY"
  | "CAMPAIGN";

// ============================================================================
// INTERFACES - CRM Lead
// ============================================================================

/**
 * Input para crear/actualizar un lead
 */
export interface CRM_LeadInput {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  source?: CRM_LeadSource | CRMLeadSource;  // Enum o string
  status?: CRM_LeadStatus | CRMLeadStatus;  // Enum o string
  priority?: CRM_Priority | CRMPriority;      // Enum o string
  value?: number;
  notes?: string;
}

/**
 * Respuesta de un lead desde el backend
 */
export interface CRM_Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  source?: CRM_LeadSource | CRMLeadSource;
  status?: CRM_LeadStatus | CRMLeadStatus;
  priority?: CRM_Priority | CRMPriority;
  value?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Respuesta de la mutación createCRMLead / updateCRMLead
 */
export interface CRM_LeadResponse {
  success: boolean;
  lead?: CRM_Lead;
  errors?: Array<{
    field?: string;
    message: string;
    code?: string;
  }>;
}

/**
 * Respuesta de la query getCRMLeads
 */
export interface CRM_LeadsResponse {
  success: boolean;
  leads: CRM_Lead[];
  total: number;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
  };
  errors?: Array<{
    field?: string;
    message: string;
    code?: string;
  }>;
}

// ============================================================================
// INTERFACES - Paginación y Filtros
// ============================================================================

/**
 * Input para paginación
 */
export interface CRM_PaginationInput {
  page: number;
  limit: number;
}

/**
 * Filtros para leads
 */
export interface CRM_LeadFilters {
  status?: CRM_LeadStatus[] | CRMLeadStatus[];
  priority?: CRM_Priority[] | CRMPriority[];
  source?: CRM_LeadSource[] | CRMLeadSource[];
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

// ============================================================================
// UTILIDADES
// ============================================================================

/**
 * Valida si un string es un valor válido de CRM_LeadSource
 */
export function isValidLeadSource(value: string): value is CRMLeadSource {
  return Object.values(CRM_LeadSource).includes(value as CRM_LeadSource);
}

/**
 * Valida si un string es un valor válido de CRM_LeadStatus
 */
export function isValidLeadStatus(value: string): value is CRMLeadStatus {
  return Object.values(CRM_LeadStatus).includes(value as CRM_LeadStatus);
}

/**
 * Valida si un string es un valor válido de CRM_Priority
 */
export function isValidPriority(value: string): value is CRMPriority {
  return Object.values(CRM_Priority).includes(value as CRM_Priority);
}

/**
 * Convierte un string a CRM_LeadSource (con validación)
 */
export function toLeadSource(value: string): CRM_LeadSource {
  if (isValidLeadSource(value)) {
    return value;
  }
  throw new Error(`Invalid LeadSource: ${value}. Valid values: ${Object.values(CRM_LeadSource).join(", ")}`);
}

/**
 * Convierte un string a CRM_LeadStatus (con validación)
 */
export function toLeadStatus(value: string): CRMLeadStatus {
  if (isValidLeadStatus(value)) {
    return value;
  }
  throw new Error(`Invalid LeadStatus: ${value}. Valid values: ${Object.values(CRM_LeadStatus).join(", ")}`);
}

/**
 * Convierte un string a CRM_Priority (con validación)
 */
export function toPriority(value: string): CRMPriority {
  if (isValidPriority(value)) {
    return value;
  }
  throw new Error(`Invalid Priority: ${value}. Valid values: ${Object.values(CRM_Priority).join(", ")}`);
}

