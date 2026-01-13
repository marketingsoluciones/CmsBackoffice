import React, { useState } from 'react';
import {
  useCampaign,
  useUpdateCampaign,
  useCampaignExecutions,
  useCampaignTracking,
  useExecuteCampaign,
} from '../../hooks/useCampaigns';
import { Campaign, CampaignStatus } from '../../types/campaigns';
import {
  PencilIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  CalendarIcon,
  PaperClipIcon,
} from '@heroicons/react/24/outline';
import { ToastContextProvider } from '../../context/ToastContext';
import CampaignMetricsPanel from './CampaignMetricsPanel';
import CampaignExecutionsPanel from './CampaignExecutionsPanel';
import CampaignTrackingPanel from './CampaignTrackingPanel';

interface CampaignDetailContentProps {
  campaignId: string;
  campaignData?: any; // Datos iniciales del modal
  onEdit?: () => void;
  notesContent?: React.ReactNode;
  activityContent?: React.ReactNode;
  emailContent?: React.ReactNode;
  filesContent?: React.ReactNode;
}

export default function CampaignDetailContent({
  campaignId,
  campaignData,
  onEdit,
  notesContent,
  activityContent,
  emailContent,
  filesContent,
}: CampaignDetailContentProps) {
  const { dispatch } = ToastContextProvider();
  const [activeTab, setActiveTab] = useState<'info' | 'metrics' | 'executions' | 'recipients' | 'tracking' | 'notes' | 'activity' | 'email' | 'files'>('info');

  // Polling cada 5 segundos si está RUNNING
  // Usar campaignData inicial si está disponible mientras carga
  const { data: campaign, loading, error, refetch } = useCampaign(
    campaignId,
    campaign?.status === 'RUNNING' ? 5000 : undefined
  );

  // Usar datos iniciales mientras carga
  const currentCampaign = campaign || campaignData;

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

  if (loading && !campaignData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-sm" style={{ color: '#6B7280' }}>Cargando campaña...</div>
      </div>
    );
  }

  if (error && !currentCampaign) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-sm" style={{ color: '#DC2626' }}>
          {error?.message || 'Campaña no encontrada'}
        </div>
      </div>
    );
  }

  if (!currentCampaign) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-sm" style={{ color: '#DC2626' }}>Campaña no encontrada</div>
      </div>
    );
  }

  const statusColors = getStatusColor(currentCampaign.status as CampaignStatus);

  return (
    <div className="flex flex-col" style={{ height: '100%', minHeight: 0 }}>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4 flex-wrap flex-shrink-0" style={{ backgroundColor: '#FFFFFF' }}>
        {[
          { id: 'info', label: 'Información', icon: null },
          { id: 'metrics', label: 'Métricas', icon: ChartBarIcon },
          { id: 'executions', label: 'Ejecuciones', icon: ClockIcon },
          { id: 'recipients', label: 'Destinatarios', icon: UserGroupIcon },
          { id: 'tracking', label: 'Tracking', icon: EnvelopeIcon },
          { id: 'notes', label: 'Notas', icon: DocumentTextIcon },
          { id: 'activity', label: 'Actividad', icon: CalendarIcon },
          { id: 'email', label: 'Email', icon: EnvelopeIcon },
          { id: 'files', label: 'Archivos', icon: PaperClipIcon },
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

      {/* Controles de estado */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b flex-shrink-0" style={{ borderColor: '#E5E7EB' }}>
        <span
          className="px-3 py-1 text-xs font-medium rounded-sm"
          style={{ backgroundColor: statusColors.bg, color: statusColors.text, borderRadius: '2px' }}
        >
          {getStatusLabel(currentCampaign.status as CampaignStatus)}
        </span>
        {currentCampaign.status === 'DRAFT' && (
          <button
            onClick={() => handleStatusChange('SCHEDULED')}
            className="px-3 py-1.5 text-xs font-medium rounded-sm text-white transition-colors flex items-center gap-1"
            style={{ backgroundColor: '#3B82F6', borderRadius: '2px' }}
          >
            <PlayIcon className="w-4 h-4" />
            Programar
          </button>
        )}
        {currentCampaign.status === 'SCHEDULED' && (
          <button
            onClick={() => handleStatusChange('PAUSED')}
            className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors flex items-center gap-1"
            style={{ color: '#B45309', backgroundColor: '#FEF3C7', borderRadius: '2px' }}
          >
            <PauseIcon className="w-4 h-4" />
            Pausar
          </button>
        )}
        {currentCampaign.status === 'RUNNING' && (
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
        {currentCampaign.status === 'PAUSED' && (
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
            className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors flex items-center gap-1 ml-auto"
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
        {activeTab === 'info' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-sm" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
                <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Tipo</div>
                <div className="text-sm font-medium" style={{ color: '#111827' }}>{currentCampaign.type}</div>
              </div>
              <div className="p-4 rounded-sm" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
                <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Estado</div>
                <div className="text-sm font-medium" style={{ color: statusColors.text }}>
                  {getStatusLabel(currentCampaign.status as CampaignStatus)}
                </div>
              </div>
              {currentCampaign.startDate && (
                <div className="p-4 rounded-sm" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
                  <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Fecha de Inicio</div>
                  <div className="text-sm" style={{ color: '#111827' }}>
                    {new Date(currentCampaign.startDate).toLocaleDateString('es-ES')}
                  </div>
                </div>
              )}
              {currentCampaign.endDate && (
                <div className="p-4 rounded-sm" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
                  <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Fecha de Fin</div>
                  <div className="text-sm" style={{ color: '#111827' }}>
                    {new Date(currentCampaign.endDate).toLocaleDateString('es-ES')}
                  </div>
                </div>
              )}
              {currentCampaign.budget && (
                <div className="p-4 rounded-sm" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
                  <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Presupuesto</div>
                  <div className="text-sm font-medium" style={{ color: '#111827' }}>
                    €{Number(currentCampaign.budget).toLocaleString('es-ES')}
                  </div>
                </div>
              )}
              {currentCampaign.targetAudience && (
                <div className="p-4 rounded-sm" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
                  <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Audiencia Objetivo</div>
                  <div className="text-sm" style={{ color: '#111827' }}>{currentCampaign.targetAudience}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'metrics' && currentCampaign.metrics && (
          <CampaignMetricsPanel campaign={currentCampaign as Campaign} />
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
          <div>
            <div className="p-4 rounded-sm" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: '#111827' }}>Destinatarios</h3>
              {currentCampaign.settings?.recipients ? (
                <div className="space-y-2">
                  {currentCampaign.settings.recipients.contacts && currentCampaign.settings.recipients.contacts.length > 0 && (
                    <div>
                      <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Contactos</div>
                      <div className="text-sm" style={{ color: '#111827' }}>
                        {currentCampaign.settings.recipients.contacts.length} contacto(s)
                      </div>
                    </div>
                  )}
                  {currentCampaign.settings.recipients.businesses && currentCampaign.settings.recipients.businesses.length > 0 && (
                    <div>
                      <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Negocios</div>
                      <div className="text-sm" style={{ color: '#111827' }}>
                        {currentCampaign.settings.recipients.businesses.length} negocio(s)
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

        {activeTab === 'notes' && (
          <div>
            {notesContent || (
              <div className="text-center py-12">
                <p className="text-sm" style={{ color: '#6B7280' }}>No hay notas disponibles</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'activity' && (
          <div>
            {activityContent || (
              <div className="text-center py-12">
                <p className="text-sm" style={{ color: '#6B7280' }}>No hay actividad disponible</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'email' && (
          <div>
            {emailContent || (
              <div className="text-center py-12">
                <p className="text-sm" style={{ color: '#6B7280' }}>No hay emails disponibles</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'files' && (
          <div>
            {filesContent || (
              <div className="text-center py-12">
                <p className="text-sm" style={{ color: '#6B7280' }}>No hay archivos disponibles</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

