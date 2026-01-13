import React from 'react';
import { TrackingEvent } from '../../types/campaigns';
import {
  EnvelopeIcon,
  CheckCircleIcon,
  EyeIcon,
  CursorArrowRaysIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

interface CampaignTrackingPanelProps {
  events: TrackingEvent[];
}

export default function CampaignTrackingPanel({ events }: CampaignTrackingPanelProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'sent':
        return EnvelopeIcon;
      case 'delivered':
        return CheckCircleIcon;
      case 'opened':
        return EyeIcon;
      case 'clicked':
        return CursorArrowRaysIcon;
      case 'bounced':
      case 'failed':
        return XCircleIcon;
      default:
        return EnvelopeIcon;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'sent':
        return { bg: '#DBEAFE', text: '#1D4ED8' };
      case 'delivered':
        return { bg: '#D1FAE5', text: '#047857' };
      case 'opened':
        return { bg: '#FEF3C7', text: '#B45309' };
      case 'clicked':
        return { bg: '#E9D5FF', text: '#6B21A8' };
      case 'bounced':
      case 'failed':
        return { bg: '#FEE2E2', text: '#DC2626' };
      default:
        return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  const getEventLabel = (type: string) => {
    switch (type) {
      case 'sent':
        return 'Enviado';
      case 'delivered':
        return 'Entregado';
      case 'opened':
        return 'Abierto';
      case 'clicked':
        return 'Clic';
      case 'bounced':
        return 'Rebotado';
      case 'failed':
        return 'Fallido';
      default:
        return type;
    }
  };

  if (events.length === 0) {
    return (
      <div className="max-w-4xl">
        <div className="p-8 text-center rounded-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
          <EnvelopeIcon className="w-12 h-12 mx-auto mb-4" style={{ color: '#9CA3AF' }} />
          <p className="text-sm" style={{ color: '#6B7280' }}>No hay eventos de tracking aún</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-1" style={{ color: '#111827' }}>
          Eventos de Tracking ({events.length})
        </h3>
        <p className="text-xs" style={{ color: '#6B7280' }}>
          Historial de eventos de la campaña
        </p>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {events.map((event) => {
          const Icon = getEventIcon(event.type);
          const colors = getEventColor(event.type);
          return (
            <div
              key={event.id}
              className="flex items-center gap-3 p-3 rounded-sm transition-colors"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '2px',
              }}
            >
              <div
                className="p-2 rounded-sm flex-shrink-0"
                style={{ backgroundColor: colors.bg, borderRadius: '2px' }}
              >
                <Icon className="w-4 h-4" style={{ color: colors.text }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="px-2 py-0.5 text-xs font-medium rounded-sm"
                    style={{ backgroundColor: colors.bg, color: colors.text, borderRadius: '2px' }}
                  >
                    {getEventLabel(event.type)}
                  </span>
                  <span className="text-xs truncate" style={{ color: '#6B7280' }}>
                    {event.recipient}
                  </span>
                </div>
                <div className="text-xs" style={{ color: '#9CA3AF' }}>
                  {new Date(event.timestamp).toLocaleString('es-ES')}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

