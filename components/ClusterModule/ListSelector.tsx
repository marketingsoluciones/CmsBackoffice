import React, { useState, useEffect } from "react";
import { useSavedFilters } from "../../hooks/useSavedFilters";
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

export default function ListSelector({ selectedLists, onChange, entityType }: ListSelectorProps) {
  const { filters, isLoading } = useSavedFilters(entityType);
  const [expandedLists, setExpandedLists] = useState<Set<string>>(new Set());

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

  if (filters.length === 0) {
    return (
      <div className="p-4 rounded-sm" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "2px" }}>
        <div className="text-xs" style={{ color: "#6B7280" }}>
          No hay listas guardadas disponibles. Crea filtros guardados para usarlos como listas de destinatarios.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium block mb-2" style={{ color: "#6B7280" }}>
        Listas Guardadas ({filters.length} disponibles)
      </label>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filters.map((filter) => {
          const isSelected = selectedLists.some((l) => l.list_id === filter.id);
          const selectedList = selectedLists.find((l) => l.list_id === filter.id);
          const isExpanded = expandedLists.has(filter.id);

          return (
            <div
              key={filter.id}
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
                    onChange={() => handleToggleList(filter.id)}
                    className="w-4 h-4 rounded-sm"
                    style={{ accentColor: "#3B82F6" }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate" style={{ color: "#111827" }}>
                      {filter.name}
                    </div>
                    {filter.conditions && filter.conditions.length > 0 && (
                      <div className="text-[10px] mt-0.5" style={{ color: "#6B7280" }}>
                        {filter.conditions.length} condición(es)
                      </div>
                    )}
                  </div>
                </div>
                {isSelected && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(filter.id)}
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
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedList?.include_all ?? true}
                      onChange={() => handleToggleIncludeAll(filter.id)}
                      className="w-3 h-3 rounded-sm"
                      style={{ accentColor: "#3B82F6" }}
                    />
                    <span className="text-[10px]" style={{ color: "#6B7280" }}>
                      Incluir todos los elementos de esta lista
                    </span>
                  </label>
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

