import React from 'react';
import { Campaign } from '../../types/campaigns';
import {
  EnvelopeIcon,
  CheckCircleIcon,
  EyeIcon,
  CursorArrowRaysIcon,
  CurrencyEuroIcon,
} from '@heroicons/react/24/outline';

interface CampaignMetricsPanelProps {
  campaign: Campaign;
}

export default function CampaignMetricsPanel({ campaign }: CampaignMetricsPanelProps) {
  const metrics = campaign.metrics || {
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
  };

  const openRate = metrics.delivered > 0 ? ((metrics.opened / metrics.delivered) * 100).toFixed(2) : '0.00';
  const clickRate = metrics.delivered > 0 ? ((metrics.clicked / metrics.delivered) * 100).toFixed(2) : '0.00';
  const conversionRate = metrics.sent > 0 ? ((metrics.converted / metrics.sent) * 100).toFixed(2) : '0.00';

  const metricCards = [
    {
      label: 'Enviados',
      value: metrics.sent.toLocaleString('es-ES'),
      icon: EnvelopeIcon,
      color: { bg: '#DBEAFE', text: '#1D4ED8' },
    },
    {
      label: 'Entregados',
      value: metrics.delivered.toLocaleString('es-ES'),
      icon: CheckCircleIcon,
      color: { bg: '#D1FAE5', text: '#047857' },
    },
    {
      label: 'Abiertos',
      value: metrics.opened.toLocaleString('es-ES'),
      icon: EyeIcon,
      color: { bg: '#FEF3C7', text: '#B45309' },
    },
    {
      label: 'Clics',
      value: metrics.clicked.toLocaleString('es-ES'),
      icon: CursorArrowRaysIcon,
      color: { bg: '#E9D5FF', text: '#6B21A8' },
    },
    {
      label: 'Convertidos',
      value: metrics.converted.toLocaleString('es-ES'),
      icon: CurrencyEuroIcon,
      color: { bg: '#FCE7F3', text: '#BE185D' },
    },
  ];

  return (
    <div className="max-w-6xl space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="p-4 rounded-sm"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '2px' }}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className="p-2 rounded-sm"
                  style={{ backgroundColor: card.color.bg, borderRadius: '2px' }}
                >
                  <Icon className="w-5 h-5" style={{ color: card.color.text }} />
                </div>
              </div>
              <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>
                {card.label}
              </div>
              <div className="text-2xl font-bold" style={{ color: '#111827' }}>
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tasas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
          <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Tasa de Apertura</div>
          <div className="text-2xl font-bold" style={{ color: '#3B82F6' }}>
            {openRate}%
          </div>
          <div className="text-xs mt-1" style={{ color: '#9CA3AF' }}>
            {metrics.opened} de {metrics.delivered} entregados
          </div>
        </div>
        <div className="p-4 rounded-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
          <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Tasa de Clics</div>
          <div className="text-2xl font-bold" style={{ color: '#10B981' }}>
            {clickRate}%
          </div>
          <div className="text-xs mt-1" style={{ color: '#9CA3AF' }}>
            {metrics.clicked} de {metrics.delivered} entregados
          </div>
        </div>
        <div className="p-4 rounded-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
          <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Tasa de Conversión</div>
          <div className="text-2xl font-bold" style={{ color: '#8B5CF6' }}>
            {conversionRate}%
          </div>
          <div className="text-xs mt-1" style={{ color: '#9CA3AF' }}>
            {metrics.converted} de {metrics.sent} enviados
          </div>
        </div>
      </div>
    </div>
  );
}

