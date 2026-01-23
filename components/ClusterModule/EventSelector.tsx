import React, { useState, useEffect } from "react";
import { fetchApiEventos } from "../../utils/Fetching";
import { CRM_QUERIES } from "../../utils/crmQueries";
import { ToastContextProvider } from "../../context/ToastContext";
import { resolveDevelopment } from "../../utils/CRMFetching";
import { getAuth } from "firebase/auth";

// Nota: Ya no necesitamos resolveDevelopment porque fetchApiCRM lo maneja internamente

interface Evento {
  _id: string;
  nombre: string;
  fecha?: string;
  tipo?: string;
  poblacion?: string;
  invitados_array?: Array<{
    _id?: string;
    nombre?: string;
    correo?: string;
    telefono?: string;
    movil?: string;
  }>;
}

interface CRM_RecipientEvent {
  event_id: string;
  auto_create_contacts: boolean;
  selected_invitado_ids?: string[];
  event?: Evento;
}

interface EventSelectorProps {
  selectedEvents: CRM_RecipientEvent[];
  onChange: (events: CRM_RecipientEvent[]) => void;
  development?: string;
}

export default function EventSelector({ selectedEvents, onChange, development }: EventSelectorProps) {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const { dispatch } = ToastContextProvider();

  const pushToast = (type: string, message: string) => {
    dispatch({ type: "ADD_TOAST", payload: { id: `${Date.now()}-${Math.random()}`, type, message } } as any);
  };

  useEffect(() => {
    fetchEventos();
  }, [development]);

  const fetchEventos = async () => {
    setLoading(true);
    setError(null);
    try {
      // Usar API Local (Python) para eventos, no API2
      // Manejar resolveDevelopment de forma segura
      let dev = development || "bodasdehoy";
      try {
        if (typeof resolveDevelopment === 'function') {
          dev = development || resolveDevelopment() || "bodasdehoy";
        } else if (typeof window !== 'undefined') {
          // Fallback directo usando Cookies/localStorage
          const Cookies = (await import('js-cookie')).default;
          dev = development || Cookies.get("development") || 
                localStorage.getItem("development") || "bodasdehoy";
        }
      } catch (e) {
        console.warn("Error resolving development, using default:", e);
        dev = development || "bodasdehoy";
      }

      // Obtener userID desde Firebase Auth si está disponible
      // La query acepta userID como String o null, pero no string vacío
      let userID: string | null = null;
      try {
        if (typeof window !== "undefined") {
          const auth = getAuth();
          if (auth?.currentUser?.uid) {
            userID = auth.currentUser.uid;
          }
        }
      } catch (e) {
        console.warn("No se pudo obtener userID:", e);
      }

      const response = await fetchApiEventos({
        query: CRM_QUERIES.GET_EVENTOS,
        variables: {
          userID: userID, // null es aceptado por la API
          development: dev,
        },
        domain: dev,
      });

      // fetchApiEventos retorna Object.values(data)[0], que es el array de eventos
      // queryenEvento retorna un array directo de eventos según Fetching.js
      const eventosData = Array.isArray(response) ? response : [];
      
      // Mapear eventos del formato del backend (_id) al formato interno
      const eventosMapeados = eventosData.map((evento: any) => ({
        _id: evento._id || evento.id || String(Math.random()),
        nombre: evento.nombre || '',
        fecha: evento.fecha,
        tipo: evento.tipo,
        poblacion: evento.poblacion,
        invitados_array: (evento.invitados_array || []).map((inv: any) => ({
          _id: inv._id || inv.id || String(Math.random()),
          nombre: inv.nombre || '',
          correo: inv.correo || '',
          telefono: inv.telefono || '',
          movil: inv.movil || '',
        })),
      }));

      setEventos(eventosMapeados);
    } catch (err: any) {
      console.error("Error loading eventos:", err);
      // Intentar obtener el mensaje de error del servidor
      const errorMessage = err?.response?.data?.errors?.[0]?.message || 
                          err?.response?.data?.error?.message ||
                          err?.message || 
                          "Error al cargar eventos";
      console.error("Error details:", {
        message: errorMessage,
        response: err?.response?.data,
        status: err?.response?.status,
      });
      setError(errorMessage);
      setEventos([]);
      pushToast("error", `Error al cargar eventos: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEventToggle = (evento: Evento) => {
    const isSelected = selectedEvents.some((e) => e.event_id === evento._id);
    if (isSelected) {
      onChange(selectedEvents.filter((e) => e.event_id !== evento._id));
      setExpandedEvents((prev) => {
        const next = new Set(prev);
        next.delete(evento._id);
        return next;
      });
    } else {
      onChange([
        ...selectedEvents,
        {
          event_id: evento._id,
          auto_create_contacts: false,
          event: evento,
        },
      ]);
    }
  };

  const handleAutoCreateToggle = (eventId: string) => {
    onChange(
      selectedEvents.map((e) =>
        e.event_id === eventId ? { ...e, auto_create_contacts: !e.auto_create_contacts } : e
      )
    );
  };

  const toggleExpand = (eventId: string) => {
    setExpandedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  };

  const calculateValidRecipients = (evento: Evento): number => {
    if (!evento.invitados_array) return 0;
    return evento.invitados_array.filter(
      (inv) => (inv.correo && inv.correo.trim()) || (inv.telefono && inv.telefono.trim()) || (inv.movil && inv.movil.trim())
    ).length;
  };

  if (loading) {
    return (
      <div className="p-4 rounded-sm" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "2px" }}>
        <div className="text-xs" style={{ color: "#6B7280" }}>Cargando eventos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-sm" style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "2px" }}>
        <div className="text-xs" style={{ color: "#DC2626" }}>{error}</div>
        <button
          type="button"
          onClick={fetchEventos}
          className="mt-2 px-2 py-1 text-xs font-medium rounded-sm text-white"
          style={{ backgroundColor: "#DC2626", borderRadius: "2px" }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (eventos.length === 0) {
    return (
      <div className="p-4 rounded-sm" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "2px" }}>
        <div className="text-xs" style={{ color: "#6B7280" }}>
          No hay eventos disponibles. Los eventos aparecerán aquí cuando los crees en el sistema.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium block mb-2" style={{ color: "#6B7280" }}>
        Eventos ({eventos.length} disponibles)
      </label>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {eventos.map((evento) => {
          const isSelected = selectedEvents.some((e) => e.event_id === evento._id);
          const selectedEvent = selectedEvents.find((e) => e.event_id === evento._id);
          const isExpanded = expandedEvents.has(evento._id);
          const validRecipients = calculateValidRecipients(evento);

          return (
            <div
              key={evento._id}
              className="p-3 rounded-sm transition-colors"
              style={{
                backgroundColor: isSelected ? "#EFF6FF" : "#FFFFFF",
                border: `1px solid ${isSelected ? "#3B82F6" : "#E5E7EB"}`,
                borderRadius: "2px",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleEventToggle(evento)}
                    className="w-4 h-4 rounded-sm flex-shrink-0"
                    style={{ accentColor: "#3B82F6" }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate" style={{ color: "#111827" }}>
                      {evento.nombre || "Sin nombre"}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      {evento.fecha && (
                        <span className="text-[10px]" style={{ color: "#6B7280" }}>
                          {new Date(evento.fecha).toLocaleDateString("es-ES")}
                        </span>
                      )}
                      {evento.tipo && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-sm" style={{ backgroundColor: "#F3F4F6", color: "#6B7280", borderRadius: "2px" }}>
                          {evento.tipo}
                        </span>
                      )}
                      {evento.poblacion && (
                        <span className="text-[10px]" style={{ color: "#6B7280" }}>
                          {evento.poblacion}
                        </span>
                      )}
                      {validRecipients > 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-sm" style={{ backgroundColor: "#D1FAE5", color: "#047857", borderRadius: "2px" }}>
                          {validRecipients} válidos
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(evento._id)}
                    className="px-2 py-1 text-[10px] font-medium rounded-sm transition-colors flex-shrink-0"
                    style={{
                      color: "#3B82F6",
                      backgroundColor: "transparent",
                      borderRadius: "2px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EFF6FF")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    {isExpanded ? "Ocultar" : "Configurar"}
                  </button>
                )}
              </div>
              {isSelected && isExpanded && (
                <div className="mt-2 pt-2 border-t border-gray-200 space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedEvent?.auto_create_contacts ?? false}
                      onChange={() => handleAutoCreateToggle(evento._id)}
                      className="w-3 h-3 rounded-sm"
                      style={{ accentColor: "#3B82F6" }}
                    />
                    <span className="text-[10px]" style={{ color: "#6B7280" }}>
                      Auto-crear contactos para invitados sin contacto existente
                    </span>
                  </label>
                  
                  {/* Selector de invitados específicos */}
                  {!selectedEvent?.auto_create_contacts && evento.invitados_array && evento.invitados_array.length > 0 && (
                    <div className="mt-2">
                      <label className="text-[10px] font-medium block mb-1" style={{ color: "#6B7280" }}>
                        Seleccionar invitados específicos (opcional)
                      </label>
                      <div className="max-h-32 overflow-y-auto space-y-1 p-2 rounded-sm" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "2px" }}>
                        {evento.invitados_array.map((invitado, index) => {
                          const hasEmail = invitado.correo && invitado.correo.trim();
                          const hasPhone = (invitado.telefono && invitado.telefono.trim()) || (invitado.movil && invitado.movil.trim());
                          const phone = invitado.telefono?.trim() || invitado.movil?.trim() || "";
                          
                          // Generar ID según la guía del backend
                          let invitadoId: string | null = null;
                          if (hasEmail && hasPhone) {
                            invitadoId = `email:${hasEmail.toLowerCase().trim()}|phone:${phone}`;
                          } else if (hasEmail) {
                            invitadoId = `email:${hasEmail.toLowerCase().trim()}`;
                          } else if (hasPhone) {
                            invitadoId = `phone:${phone}`;
                          } else {
                            invitadoId = `index:${index}`;
                          }
                          
                          const isSelected = selectedEvent?.selected_invitado_ids?.includes(invitadoId) || false;
                          
                          return (
                            <label
                              key={index}
                              className="flex items-center gap-2 p-1 rounded-sm cursor-pointer hover:bg-white transition-colors"
                              style={{ borderRadius: "2px" }}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {
                                  const currentIds = selectedEvent?.selected_invitado_ids || [];
                                  let newIds: string[];
                                  if (isSelected) {
                                    newIds = currentIds.filter(id => id !== invitadoId);
                                  } else {
                                    newIds = [...currentIds, invitadoId!];
                                  }
                                  onChange(
                                    selectedEvents.map((e) =>
                                      e.event_id === evento._id
                                        ? { ...e, selected_invitado_ids: newIds.length > 0 ? newIds : undefined }
                                        : e
                                    )
                                  );
                                }}
                                className="w-3 h-3 rounded-sm"
                                style={{ accentColor: "#3B82F6" }}
                                disabled={!hasEmail && !hasPhone}
                              />
                              <span className={`text-[10px] flex-1 ${hasEmail || hasPhone ? 'text-gray-800' : 'text-gray-400'}`}>
                                {invitado.nombre || "Sin nombre"}
                                {hasEmail && <span className="ml-1 text-gray-500">({invitado.correo})</span>}
                                {!hasEmail && !hasPhone && <span className="ml-1 text-gray-400">(sin contacto)</span>}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                      {selectedEvent?.selected_invitado_ids && selectedEvent.selected_invitado_ids.length > 0 && (
                        <div className="mt-1 text-[10px]" style={{ color: "#047857" }}>
                          {selectedEvent.selected_invitado_ids.length} invitado(s) seleccionado(s)
                        </div>
                      )}
                    </div>
                  )}
                  
                  {selectedEvent?.auto_create_contacts && validRecipients > 0 && (
                    <div className="text-[10px] p-2 rounded-sm" style={{ backgroundColor: "#F0FDF4", color: "#166534", borderRadius: "2px" }}>
                      {validRecipients} invitado(s) con email o teléfono válido se incluirán automáticamente
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {selectedEvents.length > 0 && (
        <div className="mt-2 p-2 rounded-sm" style={{ backgroundColor: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: "2px" }}>
          <div className="text-[10px] font-medium" style={{ color: "#166534" }}>
            {selectedEvents.length} evento(s) seleccionado(s)
          </div>
        </div>
      )}
    </div>
  );
}

