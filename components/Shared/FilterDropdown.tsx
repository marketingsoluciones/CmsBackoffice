import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSavedFilters } from "../../hooks/useSavedFilters";
import CreateFilterModal from "./CreateFilterModal";
import EditFilterModal from "./EditFilterModal";
import { ToastContextProvider } from "../../context/ToastContext";

interface Filter {
  id: string;
  name: string;
  type: "owner" | "filter";
}

interface FilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filter[]; // Filtros de propietarios (owners)
  selectedFilterId?: string;
  onSelectFilter: (filterId: string | undefined) => void;
  onCreateFilter?: () => void;
  activeTab?: "favorites" | "owners" | "filters";
  buttonRef?: React.RefObject<HTMLButtonElement>;
  entityType?: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN"; // Tipo de entidad para los filtros guardados
}

export default function FilterDropdown({
  isOpen,
  onClose,
  filters,
  selectedFilterId,
  onSelectFilter,
  onCreateFilter,
  activeTab: initialTab = "owners",
  buttonRef,
  entityType = "LEAD",
}: FilterDropdownProps) {
  const [activeTab, setActiveTab] = useState<"favorites" | "owners" | "filters">(initialTab);
  const [searchText, setSearchText] = useState("");
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingFilter, setEditingFilter] = useState<{ id: string; name: string; conditions: any[]; visibility: "PRIVATE" | "SHARED"; saveColumns?: boolean } | null>(null);
  
  // Cargar filtros guardados del backend
  const { filters: savedFilters, isLoading: isLoadingFilters, createFilter, deleteFilter, updateFilter } = useSavedFilters(entityType);
  
  const { dispatch } = ToastContextProvider();
  const pushToast = (type: string, message: string) => {
    dispatch({
      type: "ADD_TOAST",
      payload: { id: `${Date.now()}-${Math.random()}`, type, message }
    } as any);
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef?.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        // No cerrar si se hace clic en el botón "Add new filter" o en el modal
        const target = event.target as HTMLElement;
        if (target.closest('[data-filter-modal]') || target.closest('[data-add-filter-button]')) {
          return;
        }
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Calcular posición del dropdown basándose en la posición del botón
      // Alineado a la derecha (de derecha a izquierda)
      if (buttonRef?.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const dropdownWidth = 280; // minWidth del dropdown
        setMenuPosition({
          top: rect.bottom + 4,
          left: rect.right - dropdownWidth,
        });
      }
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen && buttonRef?.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const dropdownWidth = 280; // minWidth del dropdown
        setMenuPosition({
          top: rect.bottom + 4,
          left: rect.right - dropdownWidth,
        });
      }
    };

    if (isOpen) {
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isOpen, buttonRef]);

  // Transformar savedFilters del backend al formato del dropdown
  const savedFilterItems: Filter[] = savedFilters.map(f => ({
    id: f.id,
    name: f.name,
    type: "filter" as const
  }));

  // Combinar filtros de propietarios con filtros guardados
  const allFilterItems = [...filters, ...savedFilterItems];

  if (!isOpen && !showCreateModal && !editingFilter) return null;

  const owners = filters.filter((f) => f.type === "owner");
  const filterItems = allFilterItems.filter((f) => f.type === "filter");
  const favorites = allFilterItems.filter((f) => {
    if (f.type === "filter") {
      const savedFilter = savedFilters.find(sf => sf.id === f.id);
      return savedFilter?.isFavorite || false;
    }
    return false;
  });

  const filteredItems = (activeTab === "owners" ? owners : activeTab === "filters" ? filterItems : favorites).filter(
    (item) => item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCreateFilter = async (filterData: {
    name: string;
    conditions: Array<{
      entity: string;
      field: string;
      operator: string;
      value: string;
    }>;
    visibility: "private" | "shared";
    saveColumns: boolean;
  }) => {
    // Mapeo de entidades del modal al formato del backend
    const entityMapping: Record<string, string> = {
      "lead": "LEAD",
      "contact": "CONTACT",
      "entity": "ENTITY",
      "campaign": "CAMPAIGN",
      "activity": "CAMPAIGN",
      "organization": "ENTITY",
      "person": "CONTACT",
    };

    // Transformar condiciones al formato del backend
    const transformedConditions = filterData.conditions
      .filter(c => c.entity && c.field && c.operator && c.value)
      .map(cond => {
        const mappedEntity = entityMapping[cond.entity.toLowerCase()] || cond.entity.toUpperCase();
        return {
          entity: mappedEntity,
          field: cond.field,
          operator: cond.operator,
          value: cond.value,
          group: "all" as const
        };
      });

    if (transformedConditions.length === 0) {
      pushToast("error", "Debe agregar al menos una condición válida");
      return;
    }

    const newFilter = await createFilter(
      filterData.name,
      transformedConditions,
      filterData.visibility.toUpperCase() as "PRIVATE" | "SHARED",
      false,
      filterData.saveColumns
    );

    if (newFilter) {
      setShowCreateModal(false);
      onClose();
      // Opcional: seleccionar el filtro recién creado
      // onSelectFilter(newFilter.id);
    }
  };

  const dropdownContent = (
    <div
      ref={dropdownRef}
      className="fixed rounded-lg shadow-lg"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        minWidth: "280px",
        maxWidth: "400px",
        zIndex: 9997,
        top: `${menuPosition.top}px`,
        left: `${menuPosition.left}px`,
      }}
    >
      {/* Search bar */}
      <div className="p-3 border-b" style={{ borderColor: "#E5E7EB" }}>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle cx="7" cy="7" r="5" stroke="#9CA3AF" strokeWidth="1.5" />
            <path
              d="M11 11L14 14"
              stroke="#9CA3AF"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            className="w-full pl-9 pr-3 py-2 rounded text-sm"
            style={{
              border: "1px solid #E5E7EB",
              backgroundColor: "#F9FAFB",
            }}
            placeholder="Buscar propietario o filtro"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: "#E5E7EB" }}>
        <button
          onClick={() => setActiveTab("favorites")}
          className="flex-1 flex flex-col items-center py-3 px-2 transition-colors"
          style={{
            borderBottom: activeTab === "favorites" ? "2px solid #1D4ED8" : "2px solid transparent",
            color: activeTab === "favorites" ? "#1D4ED8" : "#6B7280",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2L9.5 6L14 6.5L10.5 9.5L11.5 14L8 11.5L4.5 14L5.5 9.5L2 6.5L6.5 6L8 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill={activeTab === "favorites" ? "currentColor" : "none"}
            />
          </svg>
          <span className="text-xs mt-1">Favoritos</span>
        </button>
        <button
          onClick={() => setActiveTab("owners")}
          className="flex-1 flex flex-col items-center py-3 px-2 transition-colors"
          style={{
            borderBottom: activeTab === "owners" ? "2px solid #1D4ED8" : "2px solid transparent",
            color: activeTab === "owners" ? "#1D4ED8" : "#6B7280",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M3 14C3 11 5 9 8 9C11 9 13 11 13 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-xs mt-1">Propietarios</span>
        </button>
        <button
          onClick={() => setActiveTab("filters")}
          className="flex-1 flex flex-col items-center py-3 px-2 transition-colors"
          style={{
            borderBottom: activeTab === "filters" ? "2px solid #1D4ED8" : "2px solid transparent",
            color: activeTab === "filters" ? "#1D4ED8" : "#6B7280",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 4H14M4 8H12M6 12H10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-xs mt-1">Filtros</span>
        </button>
      </div>

      {/* Content */}
      <div className="max-h-64 overflow-y-auto">
        {activeTab === "favorites" && (
          <div className="p-4">
            <div
              className="p-4 rounded text-sm text-center"
              style={{
                backgroundColor: "#EFF6FF",
                border: "1px solid #BFDBFE",
                color: "#1E40AF",
              }}
            >
              Marca un propietario o filtro como favorito para que aparezca aquí.
            </div>
          </div>
        )}

        {activeTab === "owners" && (
          <div className="p-2">
            <div
              className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-50"
              onClick={() => onSelectFilter(undefined)}
            >
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="6" r="3" stroke="#6B7280" strokeWidth="1.5" />
                  <path
                    d="M3 14C3 11 5 9 8 9C11 9 13 11 13 14"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-sm" style={{ color: "#111827" }}>
                  Todos
                </span>
              </div>
              {!selectedFilterId && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13 4L6 11L3 8"
                    stroke="#1D4ED8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  // Si el propietario ya está seleccionado, deseleccionarlo
                  if (selectedFilterId === item.id) {
                    onSelectFilter(undefined);
                  } else {
                    onSelectFilter(item.id);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="6" r="3" stroke="#6B7280" strokeWidth="1.5" />
                    <path
                      d="M3 14C3 11 5 9 8 9C11 9 13 11 13 14"
                      stroke="#6B7280"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-sm" style={{ color: "#111827" }}>
                    {item.name}
                  </span>
                </div>
                {selectedFilterId === item.id && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13 4L6 11L3 8"
                      stroke="#1D4ED8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "filters" && (
          <div className="p-2">
            {filteredItems.map((item) => {
              // Verificar si es un filtro guardado (tiene id en savedFilters)
              const isSavedFilter = savedFilters.some(sf => sf.id === item.id);
              
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-50 group"
                  onClick={() => {
                    // Si el filtro ya está seleccionado, deseleccionarlo
                    if (selectedFilterId === item.id) {
                      onSelectFilter(undefined);
                    } else {
                      onSelectFilter(item.id);
                    }
                  }}
                >
                  <span className="text-sm" style={{ color: "#111827" }}>
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2">
                    {selectedFilterId === item.id && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M13 4L6 11L3 8"
                          stroke="#1D4ED8"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {isSavedFilter && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const filter = savedFilters.find(sf => sf.id === item.id);
                            if (filter) {
                              onClose(); // Cerrar el desplegable primero
                              setEditingFilter({
                                id: filter.id,
                                name: filter.name,
                                conditions: filter.conditions,
                                visibility: filter.visibility,
                                saveColumns: filter.saveColumns
                              });
                            }
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-blue-50"
                          style={{ color: "#3B82F6" }}
                          title="Editar filtro"
                        >
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M11.333 2.667a2.667 2.667 0 0 1 3.334 3.334L5.333 14.667H2v-3.333l9.333-9.333z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`¿Estás seguro de que quieres eliminar el filtro "${item.name}"?`)) {
                              deleteFilter(item.id);
                              // Si el filtro eliminado estaba seleccionado, deseleccionarlo
                              if (selectedFilterId === item.id) {
                                onSelectFilter(undefined);
                              }
                            }
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50"
                          style={{ color: "#EF4444" }}
                          title="Eliminar filtro"
                        >
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M4 4L12 12M12 4L4 12"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add new filter button */}
      <div className="p-2 border-t" style={{ borderColor: "#E5E7EB" }}>
        <button
          type="button"
          data-add-filter-button
          className="w-full flex items-center gap-2 p-2 rounded text-sm font-medium transition-colors"
          style={{ color: "#1D4ED8" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#EFF6FF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("[FilterDropdown] Add new filter button clicked");
            onClose(); // Cerrar el desplegable primero
            setShowCreateModal(true);
            if (onCreateFilter) {
              onCreateFilter();
            }
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 3V13M3 8H13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Añadir nuevo filtro
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Solo mostrar el desplegable si está abierto y no hay modales abiertos */}
      {mounted && typeof window !== "undefined" && isOpen && !showCreateModal && !editingFilter && createPortal(dropdownContent, document.body)}
      
      {/* Modal para crear filtro */}
      {showCreateModal && (
        <CreateFilterModal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            // No llamar onClose() aquí para evitar que se vuelva a abrir el desplegable
          }}
          onCreate={handleCreateFilter}
        />
      )}

      {/* Modal para editar filtro */}
      {editingFilter && (
        <EditFilterModal
          isOpen={!!editingFilter}
          onClose={() => {
            setEditingFilter(null);
          }}
          filter={editingFilter}
          onUpdate={async (filterData) => {
            const updated = await updateFilter(filterData.id, {
              name: filterData.name,
              conditions: filterData.conditions,
              visibility: filterData.visibility,
              saveColumns: filterData.saveColumns
            });
            if (updated) {
              setEditingFilter(null);
            }
          }}
        />
      )}
    </>
  );
}

