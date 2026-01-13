// Tipos de Campañas según la guía completa

export type CampaignType = 'EMAIL' | 'WHATSAPP' | 'SMS' | 'SCRAPING';
export type CampaignStatus = 'DRAFT' | 'SCHEDULED' | 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
export type TemplateType = 'EMAIL' | 'WHATSAPP' | 'SMS';
export type ExecutionStatus = 'running' | 'completed' | 'paused' | 'failed';

export interface CampaignMetrics {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  type: CampaignType;
  status: CampaignStatus;
  startDate?: string;
  endDate?: string;
  objective?: string;
  budget?: number;
  targetAudience?: string;
  metrics?: CampaignMetrics;
  settings?: {
    recipients?: {
      contacts?: string[];
      businesses?: string[];
    };
    template?: {
      id: string;
      subject?: string;
      body?: string;
    };
    sendImmediately?: boolean;
    trackOpens?: boolean;
    trackClicks?: boolean;
  };
  templateId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  type: TemplateType;
  category?: string;
  subject?: string;
  htmlContent?: string;
  textContent?: string;
  variables?: Array<{
    name: string;
    label: string;
    type: string;
    defaultValue?: string;
    required?: boolean;
  }>;
  thumbnail?: string;
  status?: string;
  isActive?: boolean;
  whitelabelId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignExecution {
  id: string;
  status: ExecutionStatus;
  startedAt: string;
  completedAt?: string;
  results?: {
    total: number;
    sent: number;
    failed: number;
  };
}

export interface TrackingEvent {
  id: string;
  type: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed';
  recipient: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

// Tipos para respuestas de API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

