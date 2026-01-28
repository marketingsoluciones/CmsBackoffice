import React, { useState } from 'react';
import { CampaignExecution } from '../../types/campaigns';
import { PlayIcon, ArrowPathIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useQueueEmails } from '../../hooks/useCampaigns';

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

  // Consultar cola global de emails (cada 5 segundos si hay ejecuciones RUNNING)
  const hasRunningExecutions = executions.some(exec => 
    exec.status === 'RUNNING' || 
    exec.status === 'running' ||
    (exec.queueStats && (exec.queueStats.pending > 0 || exec.queueStats.processing > 0))
  );
  
  const { data: queueData } = useQueueEmails(hasRunningExecutions ? 5000 : undefined);
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
    switch (status?.toLowerCase()) {
      case 'running':
        return 'En Ejecución';
      case 'completed':
        return 'Completada';
      case 'paused':
        return 'Pausada';
      case 'failed':
        return 'Fallida';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status || 'Desconocido';
    }
  };

  // Calcular tiempo transcurrido desde el inicio
  const getElapsedTime = (startedAt: string) => {
    const start = new Date(startedAt);
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  return (
    <div className="max-w-6xl space-y-4">
      {/* Resumen de cola global */}
      {queueData?.summary && (
        <div className="p-4 rounded-sm" style={{ backgroundColor: '#F0F9FF', border: '1px solid #BFDBFE', borderRadius: '2px' }}>
          <div className="text-xs font-semibold mb-2" style={{ color: '#1E40AF' }}>Estado de la Cola Global</div>
          <div className="grid grid-cols-4 gap-3">
            <div>
              <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Total en Cola</div>
              <div className="text-sm font-semibold" style={{ color: '#111827' }}>
                {queueData.summary.total?.toLocaleString('es-ES') || 0}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Email Messages</div>
              <div className="text-sm font-semibold" style={{ color: '#3B82F6' }}>
                {queueData.summary.email_messages?.toLocaleString('es-ES') || 0}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>CRM Emails</div>
              <div className="text-sm font-semibold" style={{ color: '#10B981' }}>
                {queueData.summary.crm_emails?.toLocaleString('es-ES') || 0}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Pendientes</div>
              <div className="text-sm font-semibold" style={{ color: '#F59E0B' }}>
                {queueData.summary.pending_emails?.toLocaleString('es-ES') || 0}
              </div>
            </div>
          </div>
        </div>
      )}

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
                        {(execution.status === 'RUNNING' || execution.status === 'running') && (
                          <span className="ml-2" style={{ color: '#10B981' }}>
                            • Tiempo: {getElapsedTime(execution.startedAt)}
                          </span>
                        )}
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

                {/* Estado de la cola (queueStats) */}
                {execution.queueStats && (
                  <div className="grid grid-cols-4 gap-3 mt-3 pt-3 border-t" style={{ borderColor: '#E5E7EB' }}>
                    <div>
                      <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Pendientes</div>
                      <div className="text-sm font-semibold" style={{ color: '#F59E0B' }}>
                        {execution.queueStats.pending?.toLocaleString('es-ES') || 0}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>En Proceso</div>
                      <div className="text-sm font-semibold" style={{ color: '#3B82F6' }}>
                        {execution.queueStats.processing?.toLocaleString('es-ES') || 0}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Completados</div>
                      <div className="text-sm font-semibold" style={{ color: '#10B981' }}>
                        {execution.queueStats.completed?.toLocaleString('es-ES') || 0}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Fallidos</div>
                      <div className="text-sm font-semibold" style={{ color: '#DC2626' }}>
                        {execution.queueStats.failed?.toLocaleString('es-ES') || 0}
                      </div>
                    </div>
                  </div>
                )}

                {/* Progreso de resultados */}
                {execution.results && (
                  <div className={`grid gap-4 mt-3 pt-3 border-t ${campaignType === 'SCRAPING' ? 'grid-cols-5' : 'grid-cols-3'}`} style={{ borderColor: '#E5E7EB' }}>
                    <div>
                      <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Total</div>
                      <div className="text-sm font-semibold" style={{ color: '#111827' }}>
                        {execution.results.total?.toLocaleString('es-ES') || 0}
                      </div>
                      {/* Barra de progreso si hay total y enviados */}
                      {execution.results.total > 0 && execution.results.sent !== null && execution.results.sent !== undefined && (
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5" style={{ backgroundColor: '#E5E7EB' }}>
                          <div
                            className="h-1.5 rounded-full transition-all"
                            style={{
                              backgroundColor: '#10B981',
                              width: `${Math.min(100, (execution.results.sent / execution.results.total) * 100)}%`
                            }}
                          />
                        </div>
                      )}
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
                            {execution.results.sent !== null && execution.results.sent !== undefined 
                              ? execution.results.sent.toLocaleString('es-ES') 
                              : 'En preparación'}
                          </div>
                          {/* Mostrar progreso si hay datos */}
                          {execution.results.total > 0 && execution.results.sent !== null && execution.results.sent !== undefined && (
                            <div className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
                              {Math.round((execution.results.sent / execution.results.total) * 100)}% completado
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Fallidos</div>
                          <div className="text-sm font-semibold" style={{ color: '#DC2626' }}>
                            {execution.results.failed !== null && execution.results.failed !== undefined 
                              ? execution.results.failed.toLocaleString('es-ES') 
                              : '-'}
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

