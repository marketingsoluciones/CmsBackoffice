import React, { useState, useEffect } from "react";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { CRM_QUERIES } from "../../utils/crmQueries";
import { ToastContextProvider } from "../../context/ToastContext";

interface ListSelectorProps {
  selectedLists: Array<{
    list_id: string;
    include_all: boolean;
    included_statuses?: string[];
  }>;
  onChange: (
    lists: Array<{
      list_id: string;
      include_all: boolean;
      included_statuses?: string[];
    }>
  ) => void;
  entityType: "LEAD" | "CONTACT" | "ENTITY" | "OPPORTUNITY" | "BUSINESS";
}

interface SavedView {
  id: string;
  name: string;
  entityType: string;
  itemIds?: string[];
}

export default function ListSelector({ selectedLists, onChange, entityType }: ListSelectorProps) {
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedLists, setExpandedLists] = useState<Set<string>>(new Set());
  const { dispatch } = ToastContextProvider();

  const pushToast = (type: string, message: string) => {
    dispatch({ type: "ADD_TOAST", payload: { id: `${Date.now()}-${Math.random()}`, type, message } } as any);
  };

  useEffect(() => {
    fetchSavedViews();
  }, [entityType]);

  const fetchSavedViews = async () => {
    setIsLoading(true);
    try {
      // Mapear entityType del componente al enum que espera API2
      // API2 usa: LEAD, CONTACT, COMPANY, BUSINESS, CAMPAIGN (enum CRM_SavedViewEntityType)
      // El componente recibe: LEAD, CONTACT, ENTITY, OPPORTUNITY, BUSINESS
      const backendEntityType = entityType === "ENTITY" ? "COMPANY" : 
                                entityType === "OPPORTUNITY" ? "LEAD" : 
                                entityType;

      const response = await fetchApiCRM({
        query: CRM_QUERIES.GET_SAVED_VIEWS,
        variables: {
          entityType: backendEntityType,
        },
      });

      // La respuesta de API2 tiene estructura: { getSavedViews: { savedViews: [...], total: number } }
      const viewsData = response?.getSavedViews?.savedViews || [];
      
      // Mapear a la estructura esperada (agregar itemIds si no viene)
      const mappedViews = viewsData.map((view: any) => ({
        id: view.id,
        name: view.name,
        entityType: view.entityType,
        itemIds: view.itemIds || [], // Si el backend no retorna itemIds, usar array vacío
      }));
      
      setSavedViews(mappedViews);
    } catch (err: any) {
      console.error("Error loading saved views:", err);
      pushToast("error", `Error al cargar listas: ${err?.message || "Error desconocido"}`);
      setSavedViews([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleList = (filterId: string) => {
    const isSelected = selectedLists.some((l) => l.list_id === filterId);
    if (isSelected) {
      onChange(selectedLists.filter((l) => l.list_id !== filterId));
    } else {
      onChange([
        ...selectedLists,
        {
          list_id: filterId,
          include_all: true,
        },
      ]);
    }
  };

  const handleToggleIncludeAll = (filterId: string) => {
    onChange(
      selectedLists.map((l) =>
        l.list_id === filterId ? { ...l, include_all: !l.include_all } : l
      )
    );
  };

  const toggleExpand = (filterId: string) => {
    setExpandedLists((prev) => {
      const next = new Set(prev);
      if (next.has(filterId)) {
        next.delete(filterId);
      } else {
        next.add(filterId);
      }
      return next;
    });
  };

  if (isLoading) {
    return (
      <div className="p-4 rounded-sm" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "2px" }}>
        <div className="text-xs" style={{ color: "#6B7280" }}>Cargando listas...</div>
      </div>
    );
  }

  if (savedViews.length === 0 && !isLoading) {
    return (
      <div className="p-4 rounded-sm" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "2px" }}>
        <div className="text-xs" style={{ color: "#6B7280" }}>
          No hay listas guardadas disponibles. Crea vistas guardadas para usarlas como listas de destinatarios.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium block mb-2" style={{ color: "#6B7280" }}>
        Listas Guardadas ({savedViews.length} disponibles)
      </label>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {savedViews.map((view) => {
          const isSelected = selectedLists.some((l) => l.list_id === view.id);
          const selectedList = selectedLists.find((l) => l.list_id === view.id);
          const isExpanded = expandedLists.has(view.id);

          return (
            <div
              key={view.id}
              className="p-3 rounded-sm transition-colors"
              style={{
                backgroundColor: isSelected ? "#EFF6FF" : "#FFFFFF",
                border: `1px solid ${isSelected ? "#3B82F6" : "#E5E7EB"}`,
                borderRadius: "2px",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleToggleList(view.id)}
                    className="w-4 h-4 rounded-sm"
                    style={{ accentColor: "#3B82F6" }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate" style={{ color: "#111827" }}>
                      {view.name}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      {view.entityType && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-sm" style={{ backgroundColor: "#F3F4F6", color: "#6B7280", borderRadius: "2px" }}>
                          {view.entityType}
                        </span>
                      )}
                      {view.itemIds && view.itemIds.length > 0 && (
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-sm"
                          style={{ backgroundColor: "#D1FAE5", color: "#047857", borderRadius: "2px" }}
                        >
                          {view.itemIds.length} elementos
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(view.id)}
                    className="px-2 py-1 text-[10px] font-medium rounded-sm transition-colors"
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
                      checked={selectedList?.include_all ?? true}
                      onChange={() => handleToggleIncludeAll(view.id)}
                      className="w-3 h-3 rounded-sm"
                      style={{ accentColor: "#3B82F6" }}
                    />
                    <span className="text-[10px]" style={{ color: "#6B7280" }}>
                      Incluir todos los elementos de esta lista
                    </span>
                  </label>
                  {!selectedList?.include_all && (
                    <div className="mt-2">
                      <label className="text-[10px] font-medium block mb-1" style={{ color: "#6B7280" }}>
                        Estados a incluir (opcional)
                      </label>
                      <div className="text-[10px]" style={{ color: "#9CA3AF" }}>
                        Selecciona estados específicos para filtrar elementos de esta lista
                      </div>
                      {/* TODO: Implementar selector de estados cuando el backend lo soporte */}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {selectedLists.length > 0 && (
        <div className="mt-2 p-2 rounded-sm" style={{ backgroundColor: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: "2px" }}>
          <div className="text-[10px] font-medium" style={{ color: "#166534" }}>
            {selectedLists.length} lista(s) seleccionada(s)
          </div>
        </div>
      )}
    </div>
  );
}

