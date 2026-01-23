import React, { useState } from 'react';
import { CampaignExecution } from '../../types/campaigns';
import { PlayIcon, ArrowPathIcon, ClockIcon } from '@heroicons/react/24/outline';

interface CampaignExecutionsPanelProps {
  campaignId: string;
  executions: CampaignExecution[];
  onExecute?: () => void;
  onSchedule?: (scheduledAt: string, notes?: string) => void;
  onRefresh?: () => void;
  campaignType?: string;
}

export default function CampaignExecutionsPanel({
  campaignId,
  executions,
  onExecute,
  onSchedule,
  onRefresh,
  campaignType,
}: CampaignExecutionsPanelProps) {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduledDateTime, setScheduledDateTime] = useState('');
  const [scheduleNotes, setScheduleNotes] = useState('');
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
      {/* Botones de acción */}
      {(onExecute || onSchedule) && (
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
            {onSchedule && (
              <button
                onClick={() => {
                  // Establecer fecha/hora por defecto: ahora + 1 hora
                  const defaultDate = new Date();
                  defaultDate.setHours(defaultDate.getHours() + 1);
                  const defaultDateTime = defaultDate.toISOString().slice(0, 16);
                  setScheduledDateTime(defaultDateTime);
                  setScheduleNotes('');
                  setShowScheduleModal(true);
                }}
                className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors flex items-center gap-1"
                style={{
                  color: '#6B7280',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '2px',
                }}
              >
                <ClockIcon className="w-4 h-4" />
                Programar
              </button>
            )}
            {onExecute && (
              <button
                onClick={onExecute}
                className="px-4 py-2 text-sm font-medium rounded-sm text-white transition-colors flex items-center gap-2"
                style={{ backgroundColor: '#10B981', borderRadius: '2px' }}
              >
                <PlayIcon className="w-4 h-4" />
                Ejecutar Ahora
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal de programación */}
      {showScheduleModal && onSchedule && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
          onClick={() => setShowScheduleModal(false)}
        >
          <div
            className="w-full max-w-md rounded-sm shadow-xl flex flex-col"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #F3F4F6',
              borderRadius: '2px',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
              <h3 className="text-base font-semibold" style={{ color: '#111827' }}>Programar Ejecución</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="p-1 rounded-sm transition-colors"
                style={{ color: '#6B7280' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: '#6B7280' }}>
                  Fecha y Hora *
                </label>
                <input
                  type="datetime-local"
                  value={scheduledDateTime}
                  onChange={(e) => setScheduledDateTime(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none"
                  style={{
                    border: '1px solid #E5E7EB',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '2px',
                  }}
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: '#6B7280' }}>
                  Notas (opcional)
                </label>
                <textarea
                  value={scheduleNotes}
                  onChange={(e) => setScheduleNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none"
                  style={{
                    border: '1px solid #E5E7EB',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '2px',
                  }}
                  placeholder="Notas sobre esta ejecución programada..."
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 px-4 py-3 flex-shrink-0" style={{ borderTop: '1px solid #E5E7EB' }}>
              <button
                type="button"
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 text-xs font-medium rounded-sm transition-colors"
                style={{
                  color: '#6B7280',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '2px',
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (scheduledDateTime) {
                    onSchedule(scheduledDateTime, scheduleNotes || undefined);
                    setShowScheduleModal(false);
                    setScheduledDateTime('');
                    setScheduleNotes('');
                  }
                }}
                disabled={!scheduledDateTime}
                className="px-4 py-2 text-xs font-medium rounded-sm text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: '#3B82F6',
                  borderRadius: '2px',
                }}
              >
                Programar
              </button>
            </div>
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
                        {execution.executionNumber ? `Ejecución #${execution.executionNumber}` : `Ejecución ${execution.id}`}
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
                  <div className={`grid gap-4 mt-3 pt-3 border-t ${campaignType === 'SCRAPING' ? 'grid-cols-5' : 'grid-cols-3'}`} style={{ borderColor: '#E5E7EB' }}>
                    <div>
                      <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Total</div>
                      <div className="text-sm font-semibold" style={{ color: '#111827' }}>
                        {execution.results.total?.toLocaleString('es-ES') || 0}
                      </div>
                    </div>
                    {campaignType === 'SCRAPING' ? (
                      <>
                        <div>
                          <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Nuevos</div>
                          <div className="text-sm font-semibold" style={{ color: '#10B981' }}>
                            {execution.results.newBusinesses?.toLocaleString('es-ES') || 0}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Actualizados</div>
                          <div className="text-sm font-semibold" style={{ color: '#3B82F6' }}>
                            {execution.results.updatedBusinesses?.toLocaleString('es-ES') || 0}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Duplicados</div>
                          <div className="text-sm font-semibold" style={{ color: '#F59E0B' }}>
                            {execution.results.duplicatesSkipped?.toLocaleString('es-ES') || 0}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Errores</div>
                          <div className="text-sm font-semibold" style={{ color: '#DC2626' }}>
                            {execution.results.errorsCount?.toLocaleString('es-ES') || 0}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Enviados</div>
                          <div className="text-sm font-semibold" style={{ color: '#10B981' }}>
                            {execution.results.sent?.toLocaleString('es-ES') || 0}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Fallidos</div>
                          <div className="text-sm font-semibold" style={{ color: '#DC2626' }}>
                            {execution.results.failed?.toLocaleString('es-ES') || 0}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {execution.config && campaignType === 'SCRAPING' && (
                  <div className="mt-3 pt-3 border-t text-xs" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>
                    <div className="font-medium mb-1">Configuración:</div>
                    {execution.config.searchTerms && execution.config.searchTerms.length > 0 && (
                      <div>Términos: {execution.config.searchTerms.length}</div>
                    )}
                    {execution.config.countries && execution.config.countries.length > 0 && (
                      <div>Países: {execution.config.countries.join(', ')}</div>
                    )}
                  </div>
                )}

                {execution.notes && (
                  <div className="mt-2 text-xs p-2 rounded-sm" style={{ backgroundColor: '#F9FAFB', color: '#6B7280', borderRadius: '2px' }}>
                    <div className="font-medium mb-1">Notas:</div>
                    <div>{execution.notes}</div>
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

