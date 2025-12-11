import React, { useEffect, useMemo, useState } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { fetchApi } from "../../utils/Fetching";
import TableToolbar from "./TableToolbar";
import ColumnsConfigModalERP from "./ColumnsConfigModalERP";
import { useSavedViews } from "../../hooks/useSavedViews";
import { exportAsCsv, exportAsJson, exportAsXlsx } from "../../utils/export";
import FilterBuilder, { BuiltFilter, FilterField } from "./FilterBuilder";
import { ToastContextProvider } from "../../context/ToastContext";

type SortOrder = "asc" | "desc";

export interface ERPColumnConfig {
  field: string;
  label: string;
  visible: boolean;
  order: number;
  width?: number;
  pinned?: boolean;
  tooltip?: string;
}

export interface ERPSavedViewSortBy {
  field: string;
  order: SortOrder;
}

export interface ERPSavedViewConfig {
  id?: string;
  name?: string;
  columns: ERPColumnConfig[];
  filters?: any;
  sortBy?: ERPSavedViewSortBy;
  pageSize?: number;
}

export interface AdvancedTableERPProps<T> {
  title: string;
  entityType: "BUSINESS";
  defaultColumns: ERPColumnConfig[];
  query: string;
  variables?: Record<string, any>;
  mapResponse?: (data: any) => T[];
  renderCell?: (row: T, column: ERPColumnConfig) => React.ReactNode;
  getRowId?: (row: T) => string;
  renderActions?: (row: T) => React.ReactNode;
  fetcher?: (args: { query: string; variables?: Record<string, any> }) => Promise<any>;
  onRowClick?: (row: T) => void;
  // Props para filtros estilo Pipedrive
  labels?: Array<{ id: string; name: string; color: string }>;
  selectedLabels?: string[];
  onSelectLabels?: (labelIds: string[]) => void;
  onCreateLabel?: (name: string, color: string) => void;
  owners?: Array<{ id: string; name: string }>;
  selectedOwnerId?: string;
  onSelectOwner?: (ownerId: string | undefined) => void;
  onCreateFilter?: () => void;
}

export function AdvancedTableERP<T>({
  title,
  entityType,
  defaultColumns,
  query,
  variables,
  mapResponse,
  renderCell,
  getRowId,
  renderActions,
  fetcher,
  onRowClick,
  labels = [],
  selectedLabels = [],
  onSelectLabels,
  onCreateLabel,
  owners = [],
  selectedOwnerId,
  onSelectOwner,
  onCreateFilter,
}: AdvancedTableERPProps<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [columns, setColumns] = useState<ERPColumnConfig[]>(defaultColumns);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isColumnsOpen, setIsColumnsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState<{ field?: string; order?: SortOrder }>({});
  const {
    enabled: savedViewsEnabled,
    getSavedViews,
    getSavedView,
    saveView,
    updateViewColumns
  } = useSavedViews();
  const [views, setViews] = useState<{ id: string; name: string }[]>([]);
  const [activeViewId, setActiveViewId] = useState<string | undefined>(undefined);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<BuiltFilter[]>([]);
  const { dispatch } = ToastContextProvider();
  const pushToast = (type: string, message: string) => {
    dispatch({
      type: "ADD_TOAST",
      payload: { id: `${Date.now()}-${Math.random()}`, type, message }
    } as any);
  };
  const [isSaving, setIsSaving] = useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  let handleSaveViewRef: (() => Promise<void>) | null = null;
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!e.key) return;
      
      // Focus search with '/'
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // Open filters with Ctrl+F
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setIsFiltersOpen(true);
      }
      // Save view with Ctrl+S
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (handleSaveViewRef) handleSaveViewRef();
      }
      // Open columns with 'c'
      if (!e.ctrlKey && !e.metaKey && e.key.toLowerCase() === 'c' && document.activeElement === document.body) {
        setIsColumnsOpen(true);
      }
      // Pagination with ArrowLeft / ArrowRight
      if (!e.ctrlKey && !e.metaKey && document.activeElement === document.body) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setPage(p => Math.max(1, p - 1));
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          setPage(p => p + 1);
        }
      }
    };
    window.addEventListener('keydown', handler as any);
    return () => window.removeEventListener('keydown', handler as any);
  }, []);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setIsLoading(true);
        const filtersObj: any = {};
        
        if (filters?.length) {
          Object.assign(filtersObj, filters);
        }
        
        if (selectedLabels && selectedLabels.length > 0) {
          filtersObj.labelIds = selectedLabels;
        }
        
        if (selectedOwnerId && selectedOwnerId !== "all") {
          filtersObj.ownerId = selectedOwnerId;
        }
        
        if (debouncedSearch) {
          filtersObj.search = debouncedSearch;
        }
        
        // Para ERP, las queries esperan page y limit directamente, o pagination
        const vars: any = {
          ...(variables || {}),
        };
        
        // Si las variables tienen pagination, mantenerla; si no, agregar page y limit
        if (variables?.pagination) {
          vars.pagination = { page, limit: pageSize };
        } else {
          vars.page = page;
          vars.limit = pageSize;
        }
        
        if (sortBy?.field) {
          vars.sortBy = sortBy.field;
          vars.sortOrder = sortBy.order || "asc";
        }
        
        if (Object.keys(filtersObj).length > 0) {
          vars.filter = filtersObj;
        }
        
        const data = fetcher
          ? await fetcher({ query, variables: vars })
          : await fetchApi({ query, variables: vars, type: "json", development: (vars as any)?.development });
        const list = mapResponse ? mapResponse(data) : (Array.isArray(data?.data) ? data?.data : []);
        if (mounted) setRows(list ?? []);
      } catch (e: any) {
        if (mounted) setRows([]);
        pushToast("error", e?.message || "Error al cargar datos");
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [query, JSON.stringify(variables), page, pageSize, debouncedSearch, JSON.stringify(sortBy), JSON.stringify(filters), JSON.stringify(selectedLabels), selectedOwnerId]);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(searchText), 400);
    return () => clearTimeout(id);
  }, [searchText]);

  useEffect(() => {
    let mounted = true;
    const loadViews = async () => {
      if (!savedViewsEnabled) {
        if (mounted) setViews([]);
        return;
      }
      try {
        const data = await getSavedViews(entityType);
        if (mounted) setViews((data || []).map((v: any) => ({ id: v.id, name: v.name })));
      } catch {
        if (mounted) setViews([]);
      }
    };
    loadViews();
    return () => { mounted = false; };
  }, [entityType, getSavedViews, savedViewsEnabled]);

  const visibleColumns = useMemo(
    () => columns.filter(c => c.visible).sort((a, b) => a.order - b.order),
    [columns]
  );

  const hasActions = Boolean(renderActions);

  const handleSort = (field: string) => {
    setSortBy(prev => {
      if (prev.field !== field) return { field, order: "asc" };
      return { field, order: prev.order === "asc" ? "desc" : "asc" };
    });
  };

  const handleExport = (format: "csv" | "xlsx" | "json") => {
    const headers = visibleColumns.map(c => c.label);
    const fields = visibleColumns.map(c => c.field);
    const data = rows.map((r: any) => fields.map(f => r?.[f]));
    if (format === "csv") return exportAsCsv(`${title}.csv`, [headers, ...data]);
    if (format === "xlsx") return exportAsXlsx(`${title}.xlsx`, headers, data);
    return exportAsJson(`${title}.json`, rows as any[]);
  };

  const handleSaveView = async () => {
    if (!savedViewsEnabled) {
      pushToast("info", "Las vistas guardadas aún no están disponibles en esta instancia.");
      return;
    }
    setIsSaving(true);
    const payload = {
      name: `${title} - vista`,
      entityType,
      columns,
      pageSize,
      sortBy: sortBy?.field ? { field: sortBy.field, order: sortBy.order || "asc" } : undefined,
      filters: filters?.length ? filters : (searchText ? { q: searchText } : undefined)
    } as any;
    const saved = await saveView(payload);
    if (saved?.id) {
      setActiveViewId(saved.id);
      const data = await getSavedViews(entityType);
      setViews((data || []).map((v: any) => ({ id: v.id, name: v.name })));
    }
    setIsSaving(false);
  };

  useEffect(() => {
    handleSaveViewRef = savedViewsEnabled ? handleSaveView : null;
  }, [columns, pageSize, sortBy, JSON.stringify(filters), searchText, activeViewId, savedViewsEnabled]);

  const handleChangeView = async (id?: string) => {
    if (!savedViewsEnabled) return;
    setActiveViewId(id);
    if (!id) return;
    const detail = await getSavedView(id);
    if (detail?.columns) setColumns(detail.columns);
    if (detail?.pageSize) setPageSize(detail.pageSize);
    if (detail?.sortBy) setSortBy(detail.sortBy);
    if (detail?.filters?.q) setSearchText(detail.filters.q);
    if (Array.isArray(detail?.filters)) setFilters(detail.filters);
    setPage(1);
  };

  const handleColumnsChange = async (next: ERPColumnConfig[]) => {
    setColumns(next);
    if (activeViewId) {
      setIsSaving(true);
      const minimal = next.map(c => ({ field: c.field, order: c.order }));
      if (savedViewsEnabled) {
        await updateViewColumns(activeViewId, minimal as any);
      }
      setIsSaving(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, field: string) => {
    setDraggedColumn(field);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', field);
  };

  const handleDragOver = (e: React.DragEvent, field: string) => {
    if (!draggedColumn || draggedColumn === field) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(field);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetField: string) => {
    if (!draggedColumn || draggedColumn === targetField) return;
    e.preventDefault();
    
    const ordered = [...columns].sort((a, b) => a.order - b.order);
    const draggedIndex = ordered.findIndex(c => c.field === draggedColumn);
    const targetIndex = ordered.findIndex(c => c.field === targetField);
    
    if (draggedIndex === -1 || targetIndex === -1) return;
    
    const [removed] = ordered.splice(draggedIndex, 1);
    ordered.splice(targetIndex, 0, removed);
    
    const normalized = ordered.map((c, idx) => ({ ...c, order: idx }));
    handleColumnsChange(normalized);
    
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 p-0" style={{ minHeight: 0, maxHeight: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: 'transparent' }}>
      <TableToolbar
        views={views}
        activeViewId={activeViewId}
        onChangeView={(id) => handleChangeView(id || undefined)}
        onOpenColumns={() => setIsColumnsOpen(true)}
        onOpenFilters={() => setIsFiltersOpen(true)}
        onSaveView={handleSaveView}
        viewsEnabled={savedViewsEnabled}
        onExport={handleExport}
        searchText={searchText}
        onSearchTextChange={(v) => { setSearchText(v); setPage(1); }}
        pageSize={pageSize}
        onPageSizeChange={(n) => { setPageSize(n); setPage(1); }}
        isSaving={isSaving}
        searchInputRef={searchInputRef}
        entityType={entityType}
        labels={labels}
        selectedLabels={selectedLabels}
        onSelectLabels={onSelectLabels}
        onCreateLabel={onCreateLabel}
        owners={owners}
        selectedOwnerId={selectedOwnerId}
        onSelectOwner={onSelectOwner}
        onCreateFilter={onCreateFilter}
      />
      <div className="w-full overflow-auto flex-1 min-h-0 rounded-sm" style={{ border: '1px solid #E5E7EB', borderRadius: '2px', backgroundColor: '#FFFFFF' }}>
        <table className="min-w-full text-sm" style={{ tableLayout: 'auto', width: '100%' }}>
          <thead>
            <tr>
              {visibleColumns.map(col => (
                <th
                  key={col.field}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, col.field)}
                  onDragOver={(e) => handleDragOver(e, col.field)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, col.field)}
                  onDragEnd={handleDragEnd}
                  className="text-left px-4 py-3 font-medium transition-colors whitespace-nowrap cursor-move"
                  style={{ 
                    borderBottom: '1px solid #E5E7EB', 
                    backgroundColor: dragOverColumn === col.field ? '#DBEAFE' : draggedColumn === col.field ? '#E0E7FF' : '#FAFAFA', 
                    color: '#111827',
                    fontSize: '13px',
                    width: 'auto',
                    minWidth: 'fit-content',
                    maxWidth: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (draggedColumn !== col.field && dragOverColumn !== col.field) {
                      e.currentTarget.style.backgroundColor = '#F5F5F5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (draggedColumn !== col.field && dragOverColumn !== col.field) {
                      e.currentTarget.style.backgroundColor = '#FAFAFA';
                    }
                  }}
                  title={`${col.tooltip || col.label} (Arrastra para reordenar)`}
                >
                  <span className="inline-block mr-1" style={{ color: '#9CA3AF' }}>☰</span>
                  {col.label}{sortBy.field === col.field ? (sortBy.order === "asc" ? " ↑" : " ↓") : ""}
                </th>
              ))}
              <th 
                className="text-left px-4 py-3 font-medium whitespace-nowrap"
                style={{ 
                  borderBottom: '1px solid #E5E7EB', 
                  backgroundColor: '#FAFAFA', 
                  color: '#374151',
                  width: 'auto',
                  minWidth: 'fit-content'
                }}
              >
                <button
                  className="p-1 rounded-sm transition-colors flex items-center justify-center"
                  style={{ 
                    border: '1px solid transparent',
                    borderRadius: '2px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F3F4F6';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                  onClick={() => setIsColumnsOpen(true)}
                  title="Configurar columnas"
                >
                  <Cog6ToothIcon width={16} height={16} style={{ color: '#6B7280' }} />
                </button>
              </th>
              {hasActions ? (
                <th className="text-left px-4 py-3 font-medium whitespace-nowrap" style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#FAFAFA', color: '#374151' }}>
                  Acciones
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={`sk-${i}`} className="animate-pulse">
                  {visibleColumns.map((c) => (
                    <td key={`${c.field}-${i}`} className="px-4 py-3" style={{ borderBottom: '1px solid #E5E7EB' }}>
                      <div className="h-3 rounded w-3/4" style={{ backgroundColor: '#E5E7EB' }} />
                    </td>
                  ))}
                  {hasActions ? (
                    <td className="px-4 py-3" style={{ borderBottom: '1px solid #E5E7EB' }}>
                      <div className="h-3 rounded w-1/3" style={{ backgroundColor: '#E5E7EB' }} />
                    </td>
                  ) : null}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td
                  className="px-4 py-6 text-center"
                  style={{ color: '#6B7280' }}
                  colSpan={visibleColumns.length + (hasActions ? 1 : 0)}
                >
                  No hay resultados para los filtros actuales.
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr
                  key={getRowId ? getRowId(row) : idx}
                  className="transition-colors"
                  style={{ 
                    cursor: onRowClick ? 'pointer' : 'default',
                    borderBottom: '1px solid #F3F4F6'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F5F5'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {visibleColumns.map(col => {
                    const cellValue = renderCell ? renderCell(row, col) : (row as any)?.[col.field];
                    if (React.isValidElement(cellValue) || (cellValue && typeof cellValue === 'object')) {
                      return (
                        <td 
                          key={col.field} 
                          className="whitespace-nowrap px-4 py-3"
                          style={{ 
                            borderBottom: '1px solid #F3F4F6',
                            color: '#111827',
                            fontSize: '13px',
                            width: 'auto',
                            minWidth: 'fit-content',
                            maxWidth: 'none'
                          }}
                        >
                          {cellValue}
                        </td>
                      );
                    }
                    const textValue = cellValue != null ? String(cellValue) : '';
                    return (
                      <td 
                        key={col.field} 
                        className="whitespace-nowrap px-4 py-3"
                        style={{ 
                          borderBottom: '1px solid #F3F4F6',
                          color: '#111827',
                          fontSize: '13px',
                          width: 'auto',
                          minWidth: 'fit-content',
                          maxWidth: 'none'
                        }}
                        title={textValue}
                      >
                        {textValue || ''}
                      </td>
                    );
                  })}
                  {hasActions ? (
                    <td className="px-4 py-3" style={{ borderBottom: '1px solid #F3F4F6' }}>
                      {renderActions ? renderActions(row) : null}
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-3 text-xs flex-shrink-0 flex-wrap gap-2" style={{ color: '#4B5563' }}>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 text-sm rounded-sm transition-colors disabled:opacity-40"
            style={{ border: '1px solid #E5E7EB', color: '#374151', borderRadius: '2px' }}
            onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#F9FAFB')}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            disabled={page <= 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
          >
            ← Anterior
          </button>
          <span className="text-sm whitespace-nowrap" style={{ color: '#4B5563' }}>Página {page}</span>
          <button
            className="px-3 py-1 text-sm rounded-sm transition-colors"
            style={{ border: `1px solid #3B82F6`, color: '#3B82F6', borderRadius: '2px' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#3B82F6';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#3B82F6';
            }}
            onClick={() => setPage(p => p + 1)}
          >
            Siguiente →
          </button>
        </div>
        <select
          className="rounded-sm px-3 py-1 text-xs transition-colors"
          style={{ border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF', color: '#374151', borderRadius: '2px' }}
          onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
          value={pageSize}
          onChange={(e) => { setPageSize(parseInt(e.target.value)); setPage(1); }}
          title="Registros por página"
        >
          {[20, 50, 100, 150, 200, 250, 500].map(n => <option key={n} value={n}>{`Registros: ${n}`}</option>)}
        </select>
      </div>
      <ColumnsConfigModalERP
        isOpen={isColumnsOpen}
        onClose={() => setIsColumnsOpen(false)}
        columns={columns}
        onChangeColumns={handleColumnsChange}
        onReset={() => setColumns(defaultColumns)}
        onSave={() => setIsColumnsOpen(false)}
      />
      <FilterBuilder
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        fields={visibleColumns.map(c => ({ field: c.field, label: c.label })) as FilterField[]}
        value={filters}
        onChange={setFilters}
        onApply={() => { setPage(1); }}
      />
    </div>
  );
}

