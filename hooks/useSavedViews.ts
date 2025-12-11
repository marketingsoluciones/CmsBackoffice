import { useCallback, useState } from "react";
import { fetchApiCRM } from "../utils/CRMFetching";

const SAVED_VIEWS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_SAVED_VIEWS === "true";

export interface ColumnConfigInput {
  field: string;
  order: number;
}

export interface SavedViewInput {
  name: string;
  description?: string;
  entityType: "LEAD" | "CONTACT" | "COMPANY" | "BUSINESS" | "CAMPAIGN";
  columns: any[];
  filters?: any;
  sortBy?: { field: string; order: "asc" | "desc" };
  pageSize?: number;
  isDefault?: boolean;
  isFavorite?: boolean;
  isShared?: boolean;
}

const GET_SAVED_VIEWS = `
  query GetSavedViews($entityType: EntityTypeView!) {
    getSavedViews(entityType: $entityType) {
      success
      data { id name entityType isDefault isFavorite createdAt }
      errors { message code }
    }
  }
`;

const GET_SAVED_VIEW = `
  query GetSavedView($id: ID!) {
    getSavedView(id: $id) {
      success
      data {
        id name entityType
        columns { field label visible order width pinned }
        filters
        sortBy { field order }
        pageSize
      }
      errors { message code }
    }
  }
`;

const SAVE_VIEW = `
  mutation SaveView($input: SavedViewInput!) {
    saveView(input: $input) {
      success
      data { id name entityType }
      errors { message code }
    }
  }
`;

const UPDATE_VIEW_COLUMNS = `
  mutation UpdateViewColumns($id: ID!, $columns: [ColumnConfigInput!]!) {
    updateViewColumns(id: $id, columns: $columns) {
      success
      data { id columns { field order } }
      errors { message code }
    }
  }
`;

export function useSavedViews() {
  const [loading, setLoading] = useState(false);

  const getSavedViews = useCallback(async (entityType: SavedViewInput["entityType"]) => {
    if (!SAVED_VIEWS_ENABLED) return [];
    setLoading(true);
    try {
      const resp = await fetchApiCRM({ query: GET_SAVED_VIEWS, variables: { entityType } });
      // Si hay errores en la respuesta, devolver array vacío
      if (resp?.getSavedViews?.errors?.length) {
        console.debug("Error al obtener vistas guardadas:", resp.getSavedViews.errors);
        return [];
      }
      return resp?.getSavedViews?.data ?? [];
    } catch (e: any) {
      // Si el backend no soporta saved views todavía, devolver array vacío silenciosamente
      console.debug("Saved views no disponibles:", e?.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getSavedView = useCallback(async (id: string) => {
    if (!SAVED_VIEWS_ENABLED) return null;
    setLoading(true);
    try {
      const resp = await fetchApiCRM({ query: GET_SAVED_VIEW, variables: { id } });
      if (resp?.getSavedView?.errors?.length) {
        console.debug("Error al obtener vista guardada:", resp.getSavedView.errors);
        return null;
      }
      return resp?.getSavedView?.data ?? null;
    } catch (e: any) {
      console.debug("Saved view no disponible:", e?.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const saveView = useCallback(async (input: SavedViewInput) => {
    if (!SAVED_VIEWS_ENABLED) return null;
    setLoading(true);
    try {
      const resp = await fetchApiCRM({ query: SAVE_VIEW, variables: { input } });
      if (resp?.saveView?.errors?.length) {
        throw new Error(resp.saveView.errors[0]?.message || "Error al guardar vista");
      }
      return resp?.saveView?.data ?? null;
    } catch (e: any) {
      throw e; // Re-lanzar para que el componente maneje el error
    } finally {
      setLoading(false);
    }
  }, []);

  const updateViewColumns = useCallback(async (id: string, columns: ColumnConfigInput[]) => {
    if (!SAVED_VIEWS_ENABLED) return null;
    setLoading(true);
    try {
      const resp = await fetchApiCRM({ query: UPDATE_VIEW_COLUMNS, variables: { id, columns } });
      if (resp?.updateViewColumns?.errors?.length) {
        throw new Error(resp.updateViewColumns.errors[0]?.message || "Error al actualizar columnas");
      }
      return resp?.updateViewColumns?.data ?? null;
    } catch (e: any) {
      throw e; // Re-lanzar para que el componente maneje el error
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    enabled: SAVED_VIEWS_ENABLED,
    getSavedViews,
    getSavedView,
    saveView,
    updateViewColumns
  };
}


