import { useState, useEffect, useCallback } from "react";
import { CRM_QUERIES, CRM_MUTATIONS } from "../utils/crmQueries";
import { fetchApiCRM } from "../utils/CRMFetching";
import { useCRM } from "../context/CRMContext";
import { ToastContextProvider } from "../context/ToastContext";

export interface CRMSavedFilter {
  id: string;
  name: string;
  entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN";
  conditions: Array<{
    entity: string;
    field: string;
    operator: string;
    value: any;
    group?: string;
  }>;
  visibility: "PRIVATE" | "SHARED";
  isFavorite: boolean;
  saveColumns?: boolean;
  columns?: Array<{
    field: string;
    visible: boolean;
    order: number;
    width?: number;
    pinned?: boolean;
  }>;
  usageCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const useSavedFilters = (entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN") => {
  const [filters, setFilters] = useState<CRMSavedFilter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addSavedFilter, updateSavedFilter, removeSavedFilter } = useCRM();
  const { dispatch } = ToastContextProvider();

  const pushToast = (type: string, message: string) => {
    dispatch({
      type: "ADD_TOAST",
      payload: { id: `${Date.now()}-${Math.random()}`, type, message }
    } as any);
  };

  const loadFilters = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchApiCRM({
        query: CRM_QUERIES.GET_MY_SAVED_FILTERS,
        variables: { entityType }
      });
      if (response?.getCRMSavedFilters?.success) {
        const loadedFilters = response.getCRMSavedFilters.filters || [];
        setFilters(loadedFilters);
        return loadedFilters;
      }
      return [];
    } catch (error: any) {
      pushToast("error", error?.message || "Error al cargar filtros");
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [entityType]);

  useEffect(() => {
    loadFilters();
  }, [loadFilters]);

  const createFilter = useCallback(async (
    name: string,
    conditions: Array<{
      entity: string;
      field: string;
      operator: string;
      value: any;
      group?: string;
    }>,
    visibility: "PRIVATE" | "SHARED" = "PRIVATE",
    isFavorite: boolean = false,
    saveColumns: boolean = false,
    columns?: Array<{
      field: string;
      visible: boolean;
      order: number;
      width?: number;
      pinned?: boolean;
    }>
  ) => {
    try {
      // Transformar condiciones: agregar group "all" si no está presente
      const transformedConditions = conditions.map(cond => ({
        ...cond,
        entity: cond.entity.toUpperCase(), // Asegurar formato correcto
        group: cond.group || "all"
      }));

      // Transformar columns si se proporcionan
      const transformedColumns = columns?.map((col, index) => ({
        field: col.field,
        visible: col.visible ?? true,
        order: col.order ?? index,
        width: col.width ?? 200,
        pinned: col.pinned ?? false
      }));

      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.CREATE_SAVED_FILTER,
        variables: {
          input: {
            name: name.trim(),
            entityType,
            conditions: transformedConditions,
            visibility,
            isFavorite,
            saveColumns,
            ...(transformedColumns && transformedColumns.length > 0 && { columns: transformedColumns })
          }
        }
      });

      if (response?.createCRMSavedFilter?.success) {
        const newFilter = response.createCRMSavedFilter.filter;
        setFilters(prev => [...prev, newFilter]);
        addSavedFilter(newFilter);
        pushToast("success", "Filtro creado correctamente");
        return newFilter;
      } else {
        const errorMsg = response?.createCRMSavedFilter?.errors?.[0]?.message || "Error al crear filtro";
        pushToast("error", errorMsg);
        return null;
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al crear filtro");
      return null;
    }
  }, [entityType, addSavedFilter]);

  const updateFilterById = useCallback(async (
    id: string,
    updates: {
      name?: string;
      conditions?: Array<{
        entity: string;
        field: string;
        operator: string;
        value: any;
        group?: string;
      }>;
      visibility?: "PRIVATE" | "SHARED";
      isFavorite?: boolean;
      saveColumns?: boolean;
      columns?: Array<{
        field: string;
        visible: boolean;
        order: number;
        width?: number;
        pinned?: boolean;
      }>;
    }
  ) => {
    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.UPDATE_SAVED_FILTER,
        variables: {
          id,
          input: updates
        }
      });
      if (response?.updateCRMSavedFilter?.success) {
        const updatedFilter = response.updateCRMSavedFilter.filter;
        setFilters(prev => prev.map(f => f.id === id ? updatedFilter : f));
        updateSavedFilter(id, updatedFilter);
        pushToast("success", "Filtro actualizado correctamente");
        return updatedFilter;
      } else {
        const errorMsg = response?.updateCRMSavedFilter?.errors?.[0]?.message || "Error al actualizar filtro";
        pushToast("error", errorMsg);
        return null;
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al actualizar filtro");
      return null;
    }
  }, [updateSavedFilter]);

  const deleteFilterById = useCallback(async (id: string) => {
    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.DELETE_SAVED_FILTER,
        variables: { id }
      });
      if (response?.deleteCRMSavedFilter?.success) {
        setFilters(prev => prev.filter(f => f.id !== id));
        removeSavedFilter(id);
        pushToast("success", "Filtro eliminado correctamente");
        return true;
      } else {
        const errorMsg = response?.deleteCRMSavedFilter?.errors?.[0]?.message || "Error al eliminar filtro";
        pushToast("error", errorMsg);
        return false;
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al eliminar filtro");
      return false;
    }
  }, [removeSavedFilter]);

  const toggleFavorite = useCallback(async (id: string) => {
    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.TOGGLE_SAVED_FILTER_FAVORITE,
        variables: { id }
      });
      if (response?.toggleCRMSavedFilterFavorite?.success) {
        const updatedFilter = response.toggleCRMSavedFilterFavorite.filter;
        setFilters(prev => prev.map(f => f.id === id ? updatedFilter : f));
        updateSavedFilter(id, updatedFilter);
        pushToast("success", updatedFilter.isFavorite ? "Filtro marcado como favorito" : "Filtro desmarcado como favorito");
        return updatedFilter;
      } else {
        const errorMsg = response?.toggleCRMSavedFilterFavorite?.errors?.[0]?.message || "Error al actualizar favorito";
        pushToast("error", errorMsg);
        return null;
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al actualizar favorito");
      return null;
    }
  }, [updateSavedFilter]);

  return {
    filters,
    isLoading,
    loadFilters,
    createFilter,
    updateFilter: updateFilterById,
    deleteFilter: deleteFilterById,
    toggleFavorite
  };
};

