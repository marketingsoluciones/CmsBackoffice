import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { fetchApi } from "../../utils/Fetching";
import TableToolbar from "./TableToolbar";
import ColumnsConfigModal from "./ColumnsConfigModal";
import { useSavedViews } from "../../hooks/useSavedViews";
import { useSavedFilters } from "../../hooks/useSavedFilters";
import { exportAsCsv, exportAsJson, exportAsXlsx } from "../../utils/export";
import FilterBuilder, { BuiltFilter, FilterField } from "./FilterBuilder";
import { ToastContextProvider } from "../../context/ToastContext";

type SortOrder = "asc" | "desc";

export interface ColumnConfig {
  field: string;
  label: string;
  visible: boolean;
  order: number;
  width?: number;
  pinned?: boolean;
  tooltip?: string;
}

export interface SavedViewSortBy {
  field: string;
  order: SortOrder;
}

export interface SavedViewConfig {
  id?: string;
  name?: string;
  columns: ColumnConfig[];
  filters?: any;
  sortBy?: SavedViewSortBy;
  pageSize?: number;
}

export interface AdvancedTableProps<T> {
  title: string;
  entityType: "LEAD" | "CONTACT" | "COMPANY" | "BUSINESS" | "CAMPAIGN";
  defaultColumns: ColumnConfig[];
  query: string;
  variables?: Record<string, any>;
  mapResponse?: (data: any) => T[];
  renderCell?: (row: T, column: ColumnConfig) => React.ReactNode;
  getRowId?: (row: T) => string;
  renderActions?: (row: T) => React.ReactNode;
  fetcher?: (args: { query: string; variables?: Record<string, any> }) => Promise<any>;
  enableCRMFeatures?: boolean; // Prop opcional para activar features específicas de CRM (Cluster/Whitelabel)
  onRowClick?: (row: T) => void; // Callback cuando se hace clic en una fila
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

export function AdvancedTable<T>({
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
  enableCRMFeatures = false,
  onRowClick,
  labels = [],
  selectedLabels = [],
  onSelectLabels,
  onCreateLabel,
  owners = [],
  selectedOwnerId,
  onSelectOwner,
  onCreateFilter,
}: AdvancedTableProps<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [columns, setColumns] = useState<ColumnConfig[]>(defaultColumns);
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
  const [selectedFilterId, setSelectedFilterId] = useState<string | undefined>(undefined);
  const [defaultFilterId, setDefaultFilterId] = useState<string | undefined>(undefined);
  const { dispatch } = ToastContextProvider();
  const pushToast = (type: string, message: string) => {
    dispatch({
      type: "ADD_TOAST",
      payload: { id: `${Date.now()}-${Math.random()}`, type, message }
    } as any);
  };
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Hook para manejar filtros guardados (solo si enableCRMFeatures está activo)
  const { filters: savedFilters, updateFilter, createFilter } = useSavedFilters(enableCRMFeatures ? entityType : "LEAD");
  
  // Debug: Log cuando cambian los filtros guardados o el filtro seleccionado
  useEffect(() => {
    if (enableCRMFeatures) {
      console.log("[AdvancedTable] savedFilters:", savedFilters);
      console.log("[AdvancedTable] selectedFilterId:", selectedFilterId);
      if (selectedFilterId) {
        const activeFilter = savedFilters.find(f => f.id === selectedFilterId);
        console.log("[AdvancedTable] activeFilter:", activeFilter);
        console.log("[AdvancedTable] activeFilter?.saveColumns:", activeFilter?.saveColumns);
      }
    }
  }, [savedFilters, selectedFilterId, enableCRMFeatures]);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  let handleSaveViewRef: (() => Promise<void>) | null = null;
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Verificar que e.key existe antes de usarlo
      if (!e.key) return;
      
      // Focus search with '/'
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // Open filters with Ctrl+F (prevent default browser find)
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
        // Construir objeto de filtros
        const filtersObj: any = {};
        
        // Agregar filtros existentes si hay
        if (filters?.length) {
          Object.assign(filtersObj, filters);
        }
        
        // Agregar filtro de etiquetas si hay labels seleccionados
        if (selectedLabels && selectedLabels.length > 0) {
          filtersObj.labelIds = selectedLabels;
        }
        
        // Agregar filtro de propietario si hay uno seleccionado
        if (selectedOwnerId && selectedOwnerId !== "all") {
          filtersObj.ownerId = selectedOwnerId;
        }
        
        // Agregar búsqueda de texto si hay
        if (debouncedSearch) {
          filtersObj.search = debouncedSearch;
        }
        
        const vars = {
          ...(variables || {}),
          pagination: { page, limit: pageSize },
          sortBy: sortBy?.field ? { field: sortBy.field, order: sortBy.order || "asc" } : undefined
        } as any;
        
        // Solo agregar filters si tiene al menos una propiedad
        if (Object.keys(filtersObj).length > 0) {
          vars.filters = filtersObj;
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
  }, [query, JSON.stringify(variables), page, pageSize, debouncedSearch, JSON.stringify(sortBy), JSON.stringify(filters), JSON.stringify(selectedLabels), selectedOwnerId, selectedFilterId]);
  
  // Cargar configuración de columnas al iniciar (filtro por defecto)
  useEffect(() => {
    if (enableCRMFeatures && !selectedFilterId && savedFilters.length > 0) {
      // Buscar filtro por defecto
      const defaultFilter = savedFilters.find(f => 
        f.name === `Configuración por defecto - ${entityType}` && 
        f.saveColumns === true
      );
      
      if (defaultFilter && defaultFilter.columns && defaultFilter.columns.length > 0) {
        setDefaultFilterId(defaultFilter.id);
        // Mapear las columnas del filtro al formato de ColumnConfig
        const savedColumns: ColumnConfig[] = defaultFilter.columns.map(col => {
          const originalCol = defaultColumns.find(dc => dc.field === col.field);
          return {
            field: col.field,
            label: originalCol?.label || col.field,
            visible: col.visible,
            order: col.order,
            width: col.width || originalCol?.width,
            pinned: col.pinned || false,
            tooltip: originalCol?.tooltip
          };
        });
        
        // Agregar columnas que no están en el filtro guardado pero sí en defaultColumns
        const missingColumns = defaultColumns
          .filter(dc => !savedColumns.find(sc => sc.field === dc.field))
          .map(dc => ({
            ...dc,
            visible: false,
            order: savedColumns.length + defaultColumns.indexOf(dc)
          }));
        
        const allColumns = [...savedColumns, ...missingColumns].sort((a, b) => a.order - b.order);
        setColumns(allColumns);
      }
    }
  }, [enableCRMFeatures, savedFilters, entityType, defaultColumns, selectedFilterId]);

  // Aplicar columnas guardadas cuando se selecciona un filtro con saveColumns: true
  useEffect(() => {
    if (enableCRMFeatures) {
      if (selectedFilterId) {
        const activeFilter = savedFilters.find(f => f.id === selectedFilterId);
        if (activeFilter?.saveColumns && activeFilter.columns && activeFilter.columns.length > 0) {
          // Mapear las columnas del filtro al formato de ColumnConfig
          const savedColumns: ColumnConfig[] = activeFilter.columns.map(col => {
            // Buscar la columna original para mantener el label y otros campos
            const originalCol = defaultColumns.find(dc => dc.field === col.field);
            return {
              field: col.field,
              label: originalCol?.label || col.field,
              visible: col.visible,
              order: col.order,
              width: col.width || originalCol?.width,
              pinned: col.pinned || false,
              tooltip: originalCol?.tooltip
            };
          });
          
          // Agregar columnas que no están en el filtro guardado pero sí en defaultColumns
          const missingColumns = defaultColumns
            .filter(dc => !savedColumns.find(sc => sc.field === dc.field))
            .map(dc => ({
              ...dc,
              visible: false, // Ocultar columnas que no están en el filtro guardado
              order: savedColumns.length + defaultColumns.indexOf(dc)
            }));
          
          // Combinar y ordenar
          const allColumns = [...savedColumns, ...missingColumns].sort((a, b) => a.order - b.order);
          setColumns(allColumns);
        } else {
          // Si el filtro no tiene columnas guardadas, usar defaultColumns
          setColumns(defaultColumns);
        }
      } else {
        // Si no hay filtro seleccionado, usar filtro por defecto o defaultColumns
        const defaultFilter = savedFilters.find(f => 
          f.name === `Configuración por defecto - ${entityType}` && 
          f.saveColumns === true
        );
        
        if (defaultFilter && defaultFilter.columns && defaultFilter.columns.length > 0) {
          // Ya se cargó en el useEffect anterior
        } else {
          setColumns(defaultColumns);
        }
      }
    }
  }, [selectedFilterId, savedFilters, enableCRMFeatures, defaultColumns]);
  
  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

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

  // Función para guardar columnas automáticamente (con debounce)
  const autoSaveColumns = useCallback(async (colsToSave: ColumnConfig[]) => {
    if (!enableCRMFeatures) return;
    
    // Limpiar timeout anterior
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Guardar después de 500ms de inactividad (debounce)
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        let filterIdToUse = selectedFilterId;
        
        // Si no hay filtro seleccionado, usar o crear filtro por defecto
        if (!filterIdToUse) {
          // Buscar filtro por defecto existente
          const defaultFilter = savedFilters.find(f => 
            f.name === `Configuración por defecto - ${entityType}` && 
            f.saveColumns === true
          );
          
          if (defaultFilter) {
            filterIdToUse = defaultFilter.id;
            setDefaultFilterId(defaultFilter.id);
          } else {
            // Crear filtro por defecto
            // Normalizar órdenes primero
            const sorted = [...colsToSave].sort((a, b) => a.order - b.order);
            const normalized = sorted.map((c, idx) => ({
              field: c.field,
              visible: c.visible,
              order: idx, // Normalizar a orden secuencial
              pinned: c.pinned || false
            }));
            
            // Incluir todas las columnas de defaultColumns
            const savedFields = new Set(normalized.map(c => c.field));
            const missingColumns = defaultColumns
              .filter(dc => !savedFields.has(dc.field))
              .map((dc, idx) => ({
                field: dc.field,
                visible: false,
                order: normalized.length + idx,
                pinned: false
              }));
            
            const allColumns = [...normalized, ...missingColumns];
            
            const newFilter = await createFilter(
              `Configuración por defecto - ${entityType}`,
              [], // Sin condiciones
              "PRIVATE",
              false, // No favorito
              true, // saveColumns: true
              allColumns
            );
            
            if (newFilter) {
              filterIdToUse = newFilter.id;
              setDefaultFilterId(newFilter.id);
            } else {
              console.error("[AdvancedTable] Error al crear filtro por defecto");
              return;
            }
          }
        }
        
        // Verificar que el filtro tenga saveColumns: true
        const activeFilter = savedFilters.find(f => f.id === filterIdToUse);
        if (!activeFilter || !activeFilter.saveColumns) {
          // Si el filtro no tiene saveColumns, actualizarlo
          await updateFilter(filterIdToUse!, {
            saveColumns: true
          });
        }
        
        // Normalizar órdenes: asegurar que sean secuenciales (0, 1, 2, 3...)
        // Ordenar por order actual primero
        const sortedColumns = [...colsToSave].sort((a, b) => a.order - b.order);
        
        // Normalizar: asignar order secuencial basado en la posición en el array
        const normalizedColumns = sortedColumns.map((c, idx) => ({
          field: c.field,
          visible: c.visible,
          order: idx, // Normalizar a orden secuencial: 0, 1, 2, 3...
          pinned: c.pinned || false
        }));
        
        // IMPORTANTE: Incluir TODAS las columnas (visibles e invisibles)
        // Verificar si faltan columnas de defaultColumns
        const savedFields = new Set(normalizedColumns.map(c => c.field));
        const missingColumns = defaultColumns
          .filter(dc => !savedFields.has(dc.field))
          .map((dc, idx) => ({
            field: dc.field,
            visible: false, // Las columnas faltantes se marcan como invisibles
            order: normalizedColumns.length + idx, // Continuar la secuencia
            pinned: false
          }));
        
        // Combinar columnas normalizadas con las faltantes
        const allColumnsToSave = [...normalizedColumns, ...missingColumns];
        
        // Guardar columnas (TODAS, visibles e invisibles)
        await updateFilter(filterIdToUse!, {
          saveColumns: true,
          columns: allColumnsToSave
        });
        
        console.log("[AdvancedTable] Columnas guardadas automáticamente en filtro:", filterIdToUse);
      } catch (error: any) {
        console.error("[AdvancedTable] Error al guardar columnas automáticamente:", error);
        // No mostrar toast para guardado automático (evitar spam)
      }
    }, 500); // Debounce de 500ms
  }, [enableCRMFeatures, selectedFilterId, savedFilters, entityType, updateFilter, createFilter, defaultColumns]);

  const handleColumnsChange = async (next: ColumnConfig[]) => {
    // Normalizar órdenes antes de actualizar el estado
    // Asegurar que los órdenes sean secuenciales (0, 1, 2, 3...)
    const sorted = [...next].sort((a, b) => a.order - b.order);
    const normalized = sorted.map((c, idx) => ({ ...c, order: idx }));
    
    setColumns(normalized);
    
    // Guardar en vista guardada si existe
    if (activeViewId) {
      setIsSaving(true);
      const minimal = normalized.map(c => ({ field: c.field, order: c.order }));
      if (savedViewsEnabled) {
        await updateViewColumns(activeViewId, minimal as any);
      }
      setIsSaving(false);
    }
    
    // Guardar automáticamente en filtro guardado (con debounce)
    if (enableCRMFeatures) {
      autoSaveColumns(normalized);
    }
  };

  // Función para guardar columnas en el filtro guardado
  const handleSaveColumns = async () => {
    if (!enableCRMFeatures) {
      setIsColumnsOpen(false);
      return;
    }

    // Si no hay filtro seleccionado, usar o crear filtro por defecto
    let filterIdToUse = selectedFilterId;
    
    if (!filterIdToUse) {
      // Buscar filtro por defecto existente
      const defaultFilter = savedFilters.find(f => 
        f.name === `Configuración por defecto - ${entityType}` && 
        f.saveColumns === true
      );
      
      if (defaultFilter) {
        filterIdToUse = defaultFilter.id;
        setDefaultFilterId(defaultFilter.id);
      } else {
        // Si no existe, crear uno nuevo
        // Usar defaultColumns normalizadas como configuración inicial
        const normalizedDefault = defaultColumns.map((dc, idx) => ({
          field: dc.field,
          visible: dc.visible !== false, // Por defecto todas visibles
          order: idx,
          pinned: dc.pinned || false
        }));
        
        const newFilter = await createFilter(
          `Configuración por defecto - ${entityType}`,
          [],
          "PRIVATE",
          false,
          true,
          normalizedDefault
        );
        
        if (newFilter) {
          filterIdToUse = newFilter.id;
          setDefaultFilterId(newFilter.id);
        } else {
          pushToast("error", "Error al crear filtro por defecto");
          setIsColumnsOpen(false);
          return;
        }
      }
    }

    const activeFilter = savedFilters.find(f => f.id === filterIdToUse);
    if (!activeFilter) {
      pushToast("error", "No se encontró el filtro seleccionado");
      setIsColumnsOpen(false);
      return;
    }

    // Si el filtro no tiene saveColumns: true, actualizarlo
    if (!activeFilter.saveColumns) {
      await updateFilter(filterIdToUse!, {
        saveColumns: true
      });
    }

    setIsSaving(true);
    try {
      console.log("[AdvancedTable] Guardando columnas en filtro:", filterIdToUse);
      console.log("[AdvancedTable] Columnas actuales:", columns);
      
      // Verificar si las columnas actuales son iguales a las por defecto
      // Comparar campos, orden y visibilidad
      const sortedCurrent = [...columns].sort((a, b) => a.order - b.order);
      const sortedDefault = [...defaultColumns].sort((a, b) => (a.order || 0) - (b.order || 0));
      
      // Verificar si tienen los mismos campos en el mismo orden y visibilidad
      const isDefaultConfig = sortedCurrent.length === sortedDefault.length &&
        sortedCurrent.every((c, idx) => {
          const defaultCol = sortedDefault[idx];
          return defaultCol &&
                 c.field === defaultCol.field &&
                 c.visible === (defaultCol.visible !== false) &&
                 c.order === idx;
        });
      
      let columnsToSave;
      
      if (isDefaultConfig) {
        // Si es la configuración por defecto, guardar defaultColumns normalizadas
        console.log("[AdvancedTable] Guardando configuración por defecto (vista inicial)");
        columnsToSave = defaultColumns.map((dc, idx) => ({
          field: dc.field,
          visible: dc.visible !== false, // Por defecto todas visibles
          order: idx,
          pinned: dc.pinned || false
        }));
      } else {
        // Si no es la configuración por defecto, normalizar las columnas actuales
        const sorted = [...columns].sort((a, b) => a.order - b.order);
        const normalized = sorted.map((c, idx) => ({
          field: c.field,
          visible: c.visible,
          order: idx,
          pinned: c.pinned || false
        }));
        
        // Incluir todas las columnas de defaultColumns (visibles e invisibles)
        const savedFields = new Set(normalized.map(c => c.field));
        const missingColumns = defaultColumns
          .filter(dc => !savedFields.has(dc.field))
          .map((dc, idx) => ({
            field: dc.field,
            visible: false,
            order: normalized.length + idx,
            pinned: false
          }));
        
        columnsToSave = [...normalized, ...missingColumns];
      }
      
      console.log("[AdvancedTable] Columnas normalizadas a guardar:", columnsToSave);
      
      const result = await updateFilter(filterIdToUse!, {
        saveColumns: true,
        columns: columnsToSave
      });
      
      if (result) {
        pushToast("success", "Configuración de columnas guardada correctamente");
        console.log("[AdvancedTable] Columnas guardadas exitosamente");
      } else {
        pushToast("error", "Error al guardar la configuración de columnas");
      }
    } catch (error: any) {
      console.error("[AdvancedTable] Error al guardar columnas:", error);
      pushToast("error", error?.message || "Error al guardar configuración de columnas");
    } finally {
      setIsSaving(false);
      setIsColumnsOpen(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, field: string) => {
    if (!enableCRMFeatures) return;
    setDraggedColumn(field);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', field);
  };

  const handleDragOver = (e: React.DragEvent, field: string) => {
    if (!enableCRMFeatures || !draggedColumn || draggedColumn === field) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(field);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetField: string) => {
    if (!enableCRMFeatures || !draggedColumn || draggedColumn === targetField) return;
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
    <div className={`w-full h-full flex flex-col ${enableCRMFeatures ? 'gap-2' : 'gap-3'} ${enableCRMFeatures ? 'p-0' : 'p-4'} ${enableCRMFeatures ? '' : 'rounded-sm shadow-sm'}`} style={{ backgroundColor: enableCRMFeatures ? 'transparent' : '#FFFFFF', border: enableCRMFeatures ? 'none' : '1px solid #E5E7EB', borderRadius: enableCRMFeatures ? '0' : '2px', ...(enableCRMFeatures ? { minHeight: 0, maxHeight: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } : {}) }}>
      {!enableCRMFeatures && (
        <div className="flex items-center justify-between mb-1 flex-shrink-0">
          <h2 className="text-lg font-semibold" style={{ color: '#3B82F6' }}>{title}</h2>
        </div>
      )}
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
        selectedFilterId={selectedFilterId}
        onSelectFilter={setSelectedFilterId}
        onCreateFilter={onCreateFilter}
      />
      <div className={`w-full overflow-auto ${enableCRMFeatures ? 'flex-1 min-h-0 rounded-sm' : 'rounded-sm'}`} style={{ border: enableCRMFeatures ? '1px solid #E5E7EB' : '1px solid #E5E7EB', borderRadius: '2px', backgroundColor: enableCRMFeatures ? '#FFFFFF' : 'transparent' }}>
        <table className="min-w-full text-sm" style={{ tableLayout: enableCRMFeatures ? 'auto' : undefined, width: '100%' }}>
          <thead>
            <tr>
              {visibleColumns.map(col => (
                <th
                  key={col.field}
                  draggable={enableCRMFeatures}
                  onDragStart={(e) => handleDragStart(e, col.field)}
                  onDragOver={(e) => handleDragOver(e, col.field)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, col.field)}
                  onDragEnd={handleDragEnd}
                  className={`text-left ${enableCRMFeatures ? 'px-4 py-3' : 'px-3 py-2'} font-medium transition-colors whitespace-nowrap ${enableCRMFeatures ? 'cursor-move' : 'cursor-pointer'}`}
                  style={{ 
                    borderBottom: '1px solid #E5E7EB', 
                    backgroundColor: dragOverColumn === col.field ? '#DBEAFE' : draggedColumn === col.field ? '#E0E7FF' : enableCRMFeatures ? '#FAFAFA' : '#F9FAFB', 
                    color: '#111827',
                    fontSize: '13px',
                    ...(enableCRMFeatures ? {
                      width: 'auto',
                      minWidth: 'fit-content',
                      maxWidth: 'none'
                    } : {
                      minWidth: col.width ? `${col.width}px` : 'auto',
                      maxWidth: col.width ? `${col.width}px` : 'none'
                    })
                  }}
                  onMouseEnter={(e) => {
                    if (draggedColumn !== col.field && dragOverColumn !== col.field) {
                      e.currentTarget.style.backgroundColor = enableCRMFeatures ? '#F5F5F5' : '#F3F4F6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (draggedColumn !== col.field && dragOverColumn !== col.field) {
                      e.currentTarget.style.backgroundColor = enableCRMFeatures ? '#FAFAFA' : '#F9FAFB';
                    }
                  }}
                  title={enableCRMFeatures ? `${col.tooltip || col.label} (Arrastra para reordenar)` : (col.tooltip || col.label)}
                  onClick={(e) => {
                    if (!enableCRMFeatures) {
                      handleSort(col.field);
                    }
                  }}
                >
                  {enableCRMFeatures && (
                    <span className="inline-block mr-1" style={{ color: '#9CA3AF' }}>☰</span>
                  )}
                  {col.label}{sortBy.field === col.field ? (sortBy.order === "asc" ? " ↑" : " ↓") : ""}
                </th>
              ))}
              <th 
                className={`text-left ${enableCRMFeatures ? 'px-4 py-3' : 'px-3 py-2'} font-medium whitespace-nowrap`}
                style={{ 
                  borderBottom: '1px solid #E5E7EB', 
                  backgroundColor: enableCRMFeatures ? '#FAFAFA' : '#F9FAFB', 
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
                <th className="text-left px-3 py-2 font-medium whitespace-nowrap" style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: enableCRMFeatures ? '#FAFAFA' : '#F9FAFB', color: '#374151' }}>
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
                    <td key={`${c.field}-${i}`} className="px-3 py-3" style={{ borderBottom: '1px solid #E5E7EB' }}>
                      <div className="h-3 rounded w-3/4" style={{ backgroundColor: '#E5E7EB' }} />
                    </td>
                  ))}
                  {hasActions ? (
                    <td className="px-3 py-3" style={{ borderBottom: '1px solid #E5E7EB' }}>
                      <div className="h-3 rounded w-1/3" style={{ backgroundColor: '#E5E7EB' }} />
                    </td>
                  ) : null}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td
                  className="px-3 py-6 text-center"
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
                    borderBottom: enableCRMFeatures ? '1px solid #F3F4F6' : '1px solid #E5E7EB'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = enableCRMFeatures ? '#F5F5F5' : '#F9FAFB'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {visibleColumns.map(col => {
                    const cellValue = renderCell ? renderCell(row, col) : (row as any)?.[col.field];
                    // Si el valor es un ReactNode (badge, botón, etc.), renderizarlo directamente
                    if (React.isValidElement(cellValue) || (cellValue && typeof cellValue === 'object')) {
                      return (
                        <td 
                          key={col.field} 
                          className={`whitespace-nowrap ${enableCRMFeatures ? 'px-4 py-3' : 'px-3 py-2'}`}
                          style={{ 
                            borderBottom: enableCRMFeatures ? '1px solid #F3F4F6' : '1px solid #E5E7EB',
                            minWidth: col.width ? `${col.width}px` : 'auto',
                            maxWidth: col.width ? `${col.width}px` : 'none',
                            color: '#111827',
                            fontSize: '13px'
                          }}
                        >
                          {cellValue}
                        </td>
                      );
                    }
                    // Para strings y números, aplicar limitador de 7 caracteres solo si enableCRMFeatures está activo
                    const textValue = cellValue != null ? String(cellValue) : '';
                    const truncated = enableCRMFeatures && textValue.length > 7 ? textValue.substring(0, 7) + '...' : textValue;
                    return (
                      <td 
                        key={col.field} 
                        className={`whitespace-nowrap ${enableCRMFeatures ? 'px-4 py-3' : 'px-3 py-2'}`}
                        style={{ 
                          borderBottom: enableCRMFeatures ? '1px solid #F3F4F6' : '1px solid #E5E7EB',
                          color: '#111827',
                          fontSize: '13px',
                          ...(enableCRMFeatures ? {
                            width: 'auto',
                            minWidth: 'fit-content',
                            maxWidth: 'none'
                          } : {
                            minWidth: col.width ? `${col.width}px` : 'auto',
                            maxWidth: col.width ? `${col.width}px` : 'none'
                          })
                        }}
                        title={enableCRMFeatures && textValue.length > 7 ? textValue : undefined}
                      >
                        {enableCRMFeatures ? (
                          <span className="inline-block" style={{ maxWidth: '100px' }}>{truncated || ''}</span>
                        ) : (
                          cellValue
                        )}
                      </td>
                    );
                  })}
                  {hasActions ? (
                    <td className={enableCRMFeatures ? 'px-4 py-3' : 'px-3 py-2'} style={{ borderBottom: enableCRMFeatures ? '1px solid #F3F4F6' : '1px solid #E5E7EB' }}>
                      {renderActions ? renderActions(row) : null}
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className={`flex items-center justify-between mt-3 text-xs flex-shrink-0 ${enableCRMFeatures ? 'flex-wrap gap-2' : ''}`} style={{ color: '#4B5563' }}>
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
      <ColumnsConfigModal
        isOpen={isColumnsOpen}
        onClose={() => setIsColumnsOpen(false)}
        columns={columns}
        onChangeColumns={handleColumnsChange}
        onReset={() => setColumns(defaultColumns)}
        onSave={handleSaveColumns}
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


