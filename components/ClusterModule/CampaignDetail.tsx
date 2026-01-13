import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  useCampaign,
  useUpdateCampaign,
  useCampaignExecutions,
  useCampaignTracking,
  useExecuteCampaign,
} from '../../hooks/useCampaigns';
import { Campaign, CampaignStatus } from '../../types/campaigns';
import {
  ArrowLeftIcon,
  PencilIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { ToastContextProvider } from '../../context/ToastContext';
import CampaignMetricsPanel from './CampaignMetricsPanel';
import CampaignExecutionsPanel from './CampaignExecutionsPanel';
import CampaignTrackingPanel from './CampaignTrackingPanel';

interface CampaignDetailProps {
  campaignId: string;
  onEdit?: () => void;
  onBack?: () => void;
}

export default function CampaignDetail({ campaignId, onEdit, onBack }: CampaignDetailProps) {
  const router = useRouter();
  const { dispatch } = ToastContextProvider();
  const [activeTab, setActiveTab] = useState<'info' | 'metrics' | 'executions' | 'recipients' | 'tracking'>('info');

  // Polling cada 5 segundos si está RUNNING
  const { data: campaign, loading, error, refetch } = useCampaign(
    campaignId,
    campaign?.status === 'RUNNING' ? 5000 : undefined
  );

  const { data: executions, refetch: refetchExecutions } = useCampaignExecutions(
    campaignId,
    campaign?.status === 'RUNNING' ? 5000 : undefined
  );

  const { data: trackingEvents, refetch: refetchTracking } = useCampaignTracking(
    campaignId,
    campaign?.status === 'RUNNING' ? 10000 : undefined
  );

  const { updateCampaign } = useUpdateCampaign();
  const { executeCampaign } = useExecuteCampaign();

  const pushToast = (type: string, message: string) => {
    dispatch({ type: 'ADD_TOAST', payload: { id: `${Date.now()}-${Math.random()}`, type, message } } as any);
  };

  const handleStatusChange = async (newStatus: CampaignStatus) => {
    try {
      await updateCampaign(campaignId, { status: newStatus });
      pushToast('success', `Campaña ${newStatus === 'SCHEDULED' ? 'programada' : newStatus === 'PAUSED' ? 'pausada' : 'actualizada'}`);
      refetch();
    } catch (err: any) {
      pushToast('error', err?.message || 'Error al actualizar el estado');
    }
  };

  const handleExecute = async () => {
    try {
      await executeCampaign(campaignId);
      pushToast('success', 'Campaña ejecutada correctamente');
      refetch();
      refetchExecutions();
    } catch (err: any) {
      pushToast('error', err?.message || 'Error al ejecutar la campaña');
    }
  };

  const getStatusColor = (status: CampaignStatus) => {
    switch (status) {
      case 'DRAFT':
        return { bg: '#DBEAFE', text: '#1D4ED8' };
      case 'SCHEDULED':
        return { bg: '#DBEAFE', text: '#1D4ED8' };
      case 'RUNNING':
        return { bg: '#D1FAE5', text: '#047857' };
      case 'PAUSED':
        return { bg: '#FEF3C7', text: '#B45309' };
      case 'COMPLETED':
        return { bg: '#E9D5FF', text: '#6B21A8' };
      case 'CANCELLED':
        return { bg: '#FEE2E2', text: '#DC2626' };
      default:
        return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  const getStatusLabel = (status: CampaignStatus) => {
    switch (status) {
      case 'DRAFT':
        return 'Borrador';
      case 'SCHEDULED':
        return 'Programada';
      case 'RUNNING':
        return 'En Ejecución';
      case 'PAUSED':
        return 'Pausada';
      case 'COMPLETED':
        return 'Completada';
      case 'CANCELLED':
        return 'Cancelada';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-sm" style={{ color: '#6B7280' }}>Cargando campaña...</div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-sm" style={{ color: '#DC2626' }}>
          {error?.message || 'Campaña no encontrada'}
        </div>
      </div>
    );
  }

  const statusColors = getStatusColor(campaign.status);

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#F9FAFB' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-sm transition-colors"
              style={{ color: '#6B7280' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-xl font-semibold" style={{ color: '#111827' }}>
              {campaign.name}
            </h1>
            {campaign.objective && (
              <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
                {campaign.objective}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="px-3 py-1 text-xs font-medium rounded-sm"
            style={{ backgroundColor: statusColors.bg, color: statusColors.text, borderRadius: '2px' }}
          >
            {getStatusLabel(campaign.status)}
          </span>
          {campaign.status === 'DRAFT' && (
            <button
              onClick={() => handleStatusChange('SCHEDULED')}
              className="px-3 py-1.5 text-xs font-medium rounded-sm text-white transition-colors flex items-center gap-1"
              style={{ backgroundColor: '#3B82F6', borderRadius: '2px' }}
            >
              <PlayIcon className="w-4 h-4" />
              Programar
            </button>
          )}
          {campaign.status === 'SCHEDULED' && (
            <button
              onClick={() => handleStatusChange('PAUSED')}
              className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors flex items-center gap-1"
              style={{ color: '#B45309', backgroundColor: '#FEF3C7', borderRadius: '2px' }}
            >
              <PauseIcon className="w-4 h-4" />
              Pausar
            </button>
          )}
          {campaign.status === 'RUNNING' && (
            <>
              <button
                onClick={() => handleStatusChange('PAUSED')}
                className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors flex items-center gap-1"
                style={{ color: '#B45309', backgroundColor: '#FEF3C7', borderRadius: '2px' }}
              >
                <PauseIcon className="w-4 h-4" />
                Pausar
              </button>
              <button
                onClick={() => handleStatusChange('CANCELLED')}
                className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors flex items-center gap-1"
                style={{ color: '#DC2626', backgroundColor: '#FEE2E2', borderRadius: '2px' }}
              >
                <StopIcon className="w-4 h-4" />
                Cancelar
              </button>
            </>
          )}
          {campaign.status === 'PAUSED' && (
            <>
              <button
                onClick={() => handleStatusChange('RUNNING')}
                className="px-3 py-1.5 text-xs font-medium rounded-sm text-white transition-colors flex items-center gap-1"
                style={{ backgroundColor: '#10B981', borderRadius: '2px' }}
              >
                <PlayIcon className="w-4 h-4" />
                Reanudar
              </button>
              <button
                onClick={() => handleStatusChange('CANCELLED')}
                className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors flex items-center gap-1"
                style={{ color: '#DC2626', backgroundColor: '#FEE2E2', borderRadius: '2px' }}
              >
                <StopIcon className="w-4 h-4" />
                Cancelar
              </button>
            </>
          )}
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors flex items-center gap-1"
              style={{
                color: '#6B7280',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '2px',
              }}
            >
              <PencilIcon className="w-4 h-4" />
              Editar
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 px-6" style={{ backgroundColor: '#FFFFFF' }}>
        {[
          { id: 'info', label: 'Información', icon: null },
          { id: 'metrics', label: 'Métricas', icon: ChartBarIcon },
          { id: 'executions', label: 'Ejecuciones', icon: ClockIcon },
          { id: 'recipients', label: 'Destinatarios', icon: UserGroupIcon },
          { id: 'tracking', label: 'Tracking', icon: EnvelopeIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="px-4 py-2 text-sm font-medium transition-colors relative flex items-center gap-2"
              style={{
                color: activeTab === tab.id ? '#3B82F6' : '#6B7280',
                borderBottom: activeTab === tab.id ? '2px solid #3B82F6' : '2px solid transparent',
              }}
            >
              {Icon && <Icon className="w-4 h-4" />}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'info' && (
          <div className="max-w-4xl space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
                <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Tipo</div>
                <div className="text-sm font-medium" style={{ color: '#111827' }}>{campaign.type}</div>
              </div>
              <div className="p-4 rounded-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
                <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Estado</div>
                <div className="text-sm font-medium" style={{ color: statusColors.text }}>
                  {getStatusLabel(campaign.status)}
                </div>
              </div>
              {campaign.startDate && (
                <div className="p-4 rounded-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
                  <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Fecha de Inicio</div>
                  <div className="text-sm" style={{ color: '#111827' }}>
                    {new Date(campaign.startDate).toLocaleDateString('es-ES')}
                  </div>
                </div>
              )}
              {campaign.endDate && (
                <div className="p-4 rounded-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
                  <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Fecha de Fin</div>
                  <div className="text-sm" style={{ color: '#111827' }}>
                    {new Date(campaign.endDate).toLocaleDateString('es-ES')}
                  </div>
                </div>
              )}
              {campaign.budget && (
                <div className="p-4 rounded-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
                  <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Presupuesto</div>
                  <div className="text-sm font-medium" style={{ color: '#111827' }}>
                    €{campaign.budget.toLocaleString('es-ES')}
                  </div>
                </div>
              )}
              {campaign.targetAudience && (
                <div className="p-4 rounded-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
                  <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Audiencia Objetivo</div>
                  <div className="text-sm" style={{ color: '#111827' }}>{campaign.targetAudience}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'metrics' && campaign.metrics && (
          <CampaignMetricsPanel campaign={campaign} />
        )}

        {activeTab === 'executions' && (
          <CampaignExecutionsPanel
            campaignId={campaignId}
            executions={executions || []}
            onExecute={handleExecute}
            onRefresh={refetchExecutions}
          />
        )}

        {activeTab === 'recipients' && (
          <div className="max-w-4xl">
            <div className="p-4 rounded-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: '#111827' }}>Destinatarios</h3>
              {campaign.settings?.recipients ? (
                <div className="space-y-2">
                  {campaign.settings.recipients.contacts && campaign.settings.recipients.contacts.length > 0 && (
                    <div>
                      <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Contactos</div>
                      <div className="text-sm" style={{ color: '#111827' }}>
                        {campaign.settings.recipients.contacts.length} contacto(s)
                      </div>
                    </div>
                  )}
                  {campaign.settings.recipients.businesses && campaign.settings.recipients.businesses.length > 0 && (
                    <div>
                      <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Negocios</div>
                      <div className="text-sm" style={{ color: '#111827' }}>
                        {campaign.settings.recipients.businesses.length} negocio(s)
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm" style={{ color: '#6B7280' }}>No hay destinatarios configurados</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'tracking' && (
          <CampaignTrackingPanel events={trackingEvents || []} />
        )}
      </div>
    </div>
  );
}

