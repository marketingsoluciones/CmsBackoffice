import React, { useState, useRef, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  WrenchScrewdriverIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import LabelFilterDropdown from "./LabelFilterDropdown";
import FilterDropdown from "./FilterDropdown";
import CreateFilterModal from "./CreateFilterModal";

interface TableToolbarProps {
  views: { id: string; name: string }[];
  activeViewId?: string;
  onChangeView?: (id: string) => void;
  onOpenColumns?: () => void;
  onOpenFilters?: () => void;
  onSaveView?: () => void;
  onExport?: (format: "csv" | "xlsx" | "json") => void;
  searchText: string;
  onSearchTextChange: (value: string) => void;
  pageSize: number;
  onPageSizeChange: (value: number) => void;
  isSaving?: boolean;
  searchInputRef?: React.RefObject<HTMLInputElement>;
  // Opcional: info de orden y filtros para mostrar en la barra
  sortOptions?: { field: string; label: string }[];
  sortField?: string;
  sortOrder?: "asc" | "desc";
  onChangeSortField?: (field: string) => void;
  onToggleSortOrder?: () => void;
  filtersCount?: number;
  viewsEnabled?: boolean;
  // Props para filtros estilo Pipedrive
  entityType?: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN";
  labels?: Array<{ id: string; name: string; color: string }>;
  selectedLabels?: string[];
  onSelectLabels?: (labelIds: string[]) => void;
  onCreateLabel?: (name: string, color: string) => void;
  owners?: Array<{ id: string; name: string }>;
  selectedOwnerId?: string;
  onSelectOwner?: (ownerId: string | undefined) => void;
  selectedFilterId?: string;
  onSelectFilter?: (filterId: string | undefined) => void;
  onCreateFilter?: () => void;
}

export default function TableToolbar({
  views,
  activeViewId,
  onChangeView,
  entityType,
  onOpenColumns,
  onOpenFilters,
  onSaveView,
  onExport,
  searchText,
  onSearchTextChange,
  pageSize,
  onPageSizeChange,
  isSaving,
  searchInputRef,
  sortOptions,
  sortField,
  sortOrder,
  onChangeSortField,
  onToggleSortOrder,
  filtersCount,
  viewsEnabled = true,
  labels = [],
  selectedLabels = [],
  onSelectLabels,
  onCreateLabel,
  owners = [],
  selectedOwnerId,
  onSelectOwner,
  selectedFilterId,
  onSelectFilter,
  onCreateFilter,
}: TableToolbarProps) {
  const [isLabelsOpen, setIsLabelsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateFilterOpen, setIsCreateFilterOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const labelsButtonRef = useRef<HTMLButtonElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const exportButtonRef = useRef<HTMLButtonElement>(null);

  // Debug: Log cuando cambia el estado
  useEffect(() => {
    console.log("[TableToolbar] isCreateFilterOpen changed to:", isCreateFilterOpen);
  }, [isCreateFilterOpen]);

  // Cerrar menú de exportación al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        exportMenuRef.current &&
        !exportMenuRef.current.contains(event.target as Node) &&
        exportButtonRef.current &&
        !exportButtonRef.current.contains(event.target as Node)
      ) {
        setIsExportMenuOpen(false);
      }
    };

    if (isExportMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExportMenuOpen]);
  return (
    <div className="w-full flex flex-col gap-2 mb-2">
      {/* Fila 1: Vistas + Columnas + Guardar + Exportar */}
      <div className="w-full flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center gap-2">
          {views.length > 0 && (
            <select
              className="rounded-sm px-3 py-1 text-sm transition-colors disabled:cursor-not-allowed"
              style={{ border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF', color: '#374151', borderRadius: '2px' }}
              onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.borderColor = '#3B82F6')}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
              onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
              value={activeViewId || ""}
              onChange={(e) => onChangeView && onChangeView(e.target.value)}
              disabled={!viewsEnabled}
            >
              {views.map(v => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          )}
          {viewsEnabled && (
            <button
              className="px-3 py-1 text-xs rounded-sm text-white transition-colors"
              style={{ border: '1px solid #3B82F6', backgroundColor: '#3B82F6', borderRadius: '2px' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3B82F6'}
              onClick={onSaveView}
              title="Guardar vista actual (Ctrl+S)"
            >
              💾 {isSaving ? "Guardando..." : "Guardar vista"}
            </button>
          )}
        </div>
      </div>

      {/* Fila 2: Búsqueda + Filtros estilo Pipedrive + Orden + Botón de tres puntos */}
      <div className="w-full flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center gap-2 flex-1 min-w-[220px]">
          <div className="relative flex-1 min-w-[180px]">
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2" style={{ color: '#9CA3AF' }}>
              <MagnifyingGlassIcon width={16} height={16} />
            </span>
            <input
              ref={searchInputRef}
              value={searchText}
              placeholder="Buscar..."
              onChange={(e) => onSearchTextChange(e.target.value)}
              className="w-full rounded-sm pl-8 pr-3 py-1.5 text-sm focus:outline-none transition-colors"
              style={{ border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF', borderRadius: '2px' }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
              title="Buscar (/)"
            />
          </div>
          
          {/* Botón All labels estilo Pipedrive */}
          {entityType && onSelectLabels && (
            <div className="relative">
              <button
                ref={labelsButtonRef}
                className="px-3 py-1.5 text-sm rounded-sm transition-colors flex items-center gap-2"
                style={{ 
                  border: '1px solid #E5E7EB', 
                  backgroundColor: '#FFFFFF', 
                  color: '#374151',
                  borderRadius: '2px'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.backgroundColor = '#F9FAFB'; 
                  e.currentTarget.style.borderColor = '#3B82F6'; 
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.backgroundColor = '#FFFFFF'; 
                  e.currentTarget.style.borderColor = '#E5E7EB'; 
                }}
                onClick={() => setIsLabelsOpen(!isLabelsOpen)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 4H13M4 8H12M6 12H10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                {selectedLabels && selectedLabels.length > 0 
                  ? `${selectedLabels.length} etiqueta${selectedLabels.length > 1 ? 's' : ''}`
                  : 'Todas las etiquetas'
                }
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <LabelFilterDropdown
                isOpen={isLabelsOpen}
                onClose={() => setIsLabelsOpen(false)}
                entityType={entityType}
                selectedLabels={selectedLabels || []}
                onSelectLabels={onSelectLabels}
                labels={labels}
                onCreateLabel={onCreateLabel}
                buttonRef={labelsButtonRef}
              />
            </div>
          )}

          {/* Botón Everyone/Filters estilo Pipedrive */}
          {owners.length > 0 && onSelectOwner && (
            <div className="relative">
              <button
                ref={filterButtonRef}
                className="px-3 py-1.5 text-sm rounded-sm transition-colors flex items-center gap-2"
                style={{ 
                  border: '1px solid #E5E7EB', 
                  backgroundColor: '#FFFFFF', 
                  color: '#374151',
                  borderRadius: '2px'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.backgroundColor = '#F9FAFB'; 
                  e.currentTarget.style.borderColor = '#3B82F6'; 
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.backgroundColor = '#FFFFFF'; 
                  e.currentTarget.style.borderColor = '#E5E7EB'; 
                }}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M3 14C3 11 5 9 8 9C11 9 13 11 13 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                {selectedOwnerId ? owners.find(o => o.id === selectedOwnerId)?.name || "Todos" : "Todos"}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <FilterDropdown
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={[
                  ...owners.map(o => ({ id: o.id, name: o.name, type: "owner" as const })),
                  ...(filtersCount && filtersCount > 0 ? [{ id: "custom", name: "Custom filters", type: "filter" as const }] : [])
                ]}
                selectedFilterId={selectedFilterId || selectedOwnerId}
                onSelectFilter={(filterId) => {
                  // Si es un filtro guardado (no owner), usar onSelectFilter
                  // Si es un owner, usar onSelectOwner
                  const isOwner = owners.some(o => o.id === filterId);
                  if (isOwner && onSelectOwner) {
                    onSelectOwner(filterId);
                  } else if (onSelectFilter) {
                    onSelectFilter(filterId);
                  }
                }}
                onCreateFilter={() => {
                  console.log("[TableToolbar] onCreateFilter called");
                  setIsFilterOpen(false);
                  console.log("[TableToolbar] Setting isCreateFilterOpen to true immediately");
                  setIsCreateFilterOpen(true);
                  if (onCreateFilter) {
                    onCreateFilter();
                  }
                }}
                buttonRef={filterButtonRef}
                entityType={entityType}
              />
            </div>
          )}

          {/* Botón de tres puntos (menú de exportación) */}
          <div className="relative">
            <button
              ref={exportButtonRef}
              className="px-2 py-1.5 rounded-sm transition-colors flex items-center justify-center"
              style={{ 
                border: '1px solid #E5E7EB', 
                backgroundColor: isExportMenuOpen ? '#F3F4F6' : '#FFFFFF', 
                borderRadius: '2px' 
              }}
              onMouseEnter={(e) => {
                if (!isExportMenuOpen) {
                  e.currentTarget.style.backgroundColor = '#F9FAFB';
                  e.currentTarget.style.borderColor = '#3B82F6';
                }
              }}
              onMouseLeave={(e) => {
                if (!isExportMenuOpen) {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#E5E7EB';
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsExportMenuOpen(!isExportMenuOpen);
              }}
              title="Más opciones"
            >
              <EllipsisVerticalIcon width={16} height={16} style={{ color: '#374151' }} />
            </button>

            {isExportMenuOpen && (
              <div
                ref={exportMenuRef}
                className="absolute right-0 mt-1 z-50 min-w-[200px] rounded-sm shadow-lg"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '2px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div className="py-1">
                  <button
                    className="w-full px-3 py-2 text-sm text-left flex items-center gap-2 transition-colors rounded-sm"
                    style={{ color: '#374151' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F9FAFB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => {
                      // Export filter results
                      setIsExportMenuOpen(false);
                    }}
                  >
                    <ArrowUpTrayIcon width={16} height={16} style={{ color: '#6B7280' }} />
                    <span>Export filter results</span>
                  </button>
                  <button
                    className="w-full px-3 py-2 text-sm text-left flex items-center gap-2 transition-colors rounded-sm"
                    style={{ color: '#374151' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F9FAFB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => {
                      // Import data
                      setIsExportMenuOpen(false);
                    }}
                  >
                    <ArrowDownTrayIcon width={16} height={16} style={{ color: '#6B7280' }} />
                    <span>Import data</span>
                  </button>
                  <button
                    className="w-full px-3 py-2 text-sm text-left flex items-center gap-2 transition-colors rounded-sm"
                    style={{ color: '#374151' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F9FAFB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => {
                      // Open data cleanup
                      setIsExportMenuOpen(false);
                    }}
                  >
                    <WrenchScrewdriverIcon width={16} height={16} style={{ color: '#6B7280' }} />
                    <span>Open data cleanup</span>
                  </button>
                  <button
                    className="w-full px-3 py-2 text-sm text-left flex items-center gap-2 transition-colors rounded-sm"
                    style={{ color: '#374151' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F9FAFB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => {
                      // Restore data
                      setIsExportMenuOpen(false);
                    }}
                  >
                    <ArrowPathIcon width={16} height={16} style={{ color: '#6B7280' }} />
                    <span>Restore data</span>
                  </button>
                  <div style={{ borderTop: '1px solid #E5E7EB', margin: '4px 0' }}></div>
                  <button
                    className="w-full px-3 py-2 text-sm text-left flex items-center gap-2 transition-colors rounded-sm"
                    style={{ color: '#374151' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F9FAFB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => {
                      onExport && onExport("csv");
                      setIsExportMenuOpen(false);
                    }}
                  >
                    <span style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>CSV</span>
                    <span>CSV</span>
                  </button>
                  <button
                    className="w-full px-3 py-2 text-sm text-left flex items-center gap-2 transition-colors rounded-sm"
                    style={{ color: '#374151' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F9FAFB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => {
                      onExport && onExport("xlsx");
                      setIsExportMenuOpen(false);
                    }}
                  >
                    <span style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>XLS</span>
                    <span>Excel</span>
                  </button>
                  <button
                    className="w-full px-3 py-2 text-sm text-left flex items-center gap-2 transition-colors rounded-sm"
                    style={{ color: '#374151' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F9FAFB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => {
                      onExport && onExport("json");
                      setIsExportMenuOpen(false);
                    }}
                  >
                    <span style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>JSON</span>
                    <span>JSON</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {sortOptions && sortOptions.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-[11px]" style={{ color: '#6B7280' }}>Ordenar:</span>
              <select
                className="rounded-sm px-3 py-1 text-xs transition-colors"
                style={{ border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF', color: '#374151', borderRadius: '2px' }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                value={sortField || ""}
                onChange={(e) => onChangeSortField && onChangeSortField(e.target.value)}
                title="Campo de orden"
              >
                <option value="">Sin orden</option>
                {sortOptions.map(opt => (
                  <option key={opt.field} value={opt.field}>{opt.label}</option>
                ))}
              </select>
              <button
                className="px-2 py-1 text-[11px] rounded-sm transition-colors"
                style={{ border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF', color: '#374151', borderRadius: '2px' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F9FAFB'; e.currentTarget.style.borderColor = '#3B82F6'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#E5E7EB'; }}
                type="button"
                onClick={onToggleSortOrder}
                title="Dirección de orden"
              >
                {sortOrder === "desc" ? "↓ DESC" : "↑ ASC"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal para crear filtro */}
      <CreateFilterModal
        isOpen={isCreateFilterOpen}
        onClose={() => {
          console.log("[TableToolbar] Closing CreateFilterModal");
          setIsCreateFilterOpen(false);
        }}
        onCreate={(filter) => {
          console.log("Filter created:", filter);
          setIsCreateFilterOpen(false);
        }}
      />
    </div>
  );
}


