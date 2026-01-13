import React from 'react';
import { CampaignExecution } from '../../types/campaigns';
import { PlayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface CampaignExecutionsPanelProps {
  campaignId: string;
  executions: CampaignExecution[];
  onExecute?: () => void;
  onRefresh?: () => void;
}

export default function CampaignExecutionsPanel({
  campaignId,
  executions,
  onExecute,
  onRefresh,
}: CampaignExecutionsPanelProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return { bg: '#D1FAE5', text: '#047857' };
      case 'completed':
        return { bg: '#E9D5FF', text: '#6B21A8' };
      case 'paused':
        return { bg: '#FEF3C7', text: '#B45309' };
      case 'failed':
        return { bg: '#FEE2E2', text: '#DC2626' };
      default:
        return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'running':
        return 'En Ejecución';
      case 'completed':
        return 'Completada';
      case 'paused':
        return 'Pausada';
      case 'failed':
        return 'Fallida';
      default:
        return status;
    }
  };

  return (
    <div className="max-w-6xl space-y-4">
      {/* Botón ejecutar */}
      {onExecute && (
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>Ejecuciones</h3>
          <div className="flex items-center gap-2">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors flex items-center gap-1"
                style={{
                  color: '#6B7280',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '2px',
                }}
              >
                <ArrowPathIcon className="w-4 h-4" />
                Actualizar
              </button>
            )}
            <button
              onClick={onExecute}
              className="px-4 py-2 text-sm font-medium rounded-sm text-white transition-colors flex items-center gap-2"
              style={{ backgroundColor: '#10B981', borderRadius: '2px' }}
            >
              <PlayIcon className="w-4 h-4" />
              Ejecutar Campaña
            </button>
          </div>
        </div>
      )}

      {/* Lista de ejecuciones */}
      {executions.length === 0 ? (
        <div className="p-8 text-center rounded-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
          <p className="text-sm" style={{ color: '#6B7280' }}>No hay ejecuciones aún</p>
        </div>
      ) : (
        <div className="space-y-3">
          {executions.map((execution) => {
            const statusColors = getStatusColor(execution.status);
            return (
              <div
                key={execution.id}
                className="p-4 rounded-sm"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '2px' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {execution.status === 'running' && (
                      <ArrowPathIcon className="w-5 h-5 animate-spin" style={{ color: '#10B981' }} />
                    )}
                    <div>
                      <div className="text-sm font-medium" style={{ color: '#111827' }}>
                        Ejecución {execution.id}
                      </div>
                      <div className="text-xs" style={{ color: '#6B7280' }}>
                        Iniciada: {new Date(execution.startedAt).toLocaleString('es-ES')}
                      </div>
                    </div>
                  </div>
                  <span
                    className="px-2 py-1 text-xs font-medium rounded-sm"
                    style={{ backgroundColor: statusColors.bg, color: statusColors.text, borderRadius: '2px' }}
                  >
                    {getStatusLabel(execution.status)}
                  </span>
                </div>

                {execution.results && (
                  <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t" style={{ borderColor: '#E5E7EB' }}>
                    <div>
                      <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Total</div>
                      <div className="text-sm font-semibold" style={{ color: '#111827' }}>
                        {execution.results.total.toLocaleString('es-ES')}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Enviados</div>
                      <div className="text-sm font-semibold" style={{ color: '#10B981' }}>
                        {execution.results.sent.toLocaleString('es-ES')}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Fallidos</div>
                      <div className="text-sm font-semibold" style={{ color: '#DC2626' }}>
                        {execution.results.failed.toLocaleString('es-ES')}
                      </div>
                    </div>
                  </div>
                )}

                {execution.completedAt && (
                  <div className="text-xs mt-2" style={{ color: '#6B7280' }}>
                    Completada: {new Date(execution.completedAt).toLocaleString('es-ES')}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

