import { useState, useEffect, useCallback } from "react";
import { CRM_QUERIES, CRM_MUTATIONS } from "../utils/crmQueries";
import { fetchApiCRM } from "../utils/CRMFetching";
import { useCRM } from "../context/CRMContext";
import { ToastContextProvider } from "../context/ToastContext";

export interface CRMLabel {
  id: string;
  name: string;
  color: string;
  entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN";
  usageCount?: number;
}

export const useCRMLabels = (entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN") => {
  const [labels, setLabels] = useState<CRMLabel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addLabel, updateLabel, removeLabel } = useCRM();
  const { dispatch } = ToastContextProvider();

  const pushToast = (type: string, message: string) => {
    dispatch({
      type: "ADD_TOAST",
      payload: { id: `${Date.now()}-${Math.random()}`, type, message }
    } as any);
  };

  const loadLabels = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchApiCRM({
        query: CRM_QUERIES.GET_CRM_LABELS,
        variables: { entityType, pagination: { page: 1, limit: 100 } }
      });
      if (response?.getCRMLabels?.success) {
        const loadedLabels = response.getCRMLabels.labels || [];
        setLabels(loadedLabels);
        return loadedLabels;
      }
      return [];
    } catch (error: any) {
      pushToast("error", error?.message || "Error al cargar etiquetas");
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [entityType]);

  useEffect(() => {
    loadLabels();
  }, [loadLabels]);

  const createLabel = useCallback(async (name: string, color: string) => {
    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.CREATE_CRM_LABEL,
        variables: {
          input: {
            name: name.trim(),
            color,
            entityType
          }
        }
      });
      if (response?.createCRMLabel?.success) {
        const newLabel = response.createCRMLabel.label;
        setLabels(prev => [...prev, newLabel]);
        addLabel(newLabel);
        pushToast("success", "Etiqueta creada correctamente");
        return newLabel;
      } else {
        const errorMsg = response?.createCRMLabel?.errors?.[0]?.message || "Error al crear etiqueta";
        pushToast("error", errorMsg);
        return null;
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al crear etiqueta");
      return null;
    }
  }, [entityType, addLabel]);

  const updateLabelById = useCallback(async (id: string, updates: { name?: string; color?: string }) => {
    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.UPDATE_CRM_LABEL,
        variables: {
          id,
          input: updates
        }
      });
      if (response?.updateCRMLabel?.success) {
        const updatedLabel = response.updateCRMLabel.label;
        setLabels(prev => prev.map(l => l.id === id ? updatedLabel : l));
        updateLabel(id, updatedLabel);
        pushToast("success", "Etiqueta actualizada correctamente");
        return updatedLabel;
      } else {
        const errorMsg = response?.updateCRMLabel?.errors?.[0]?.message || "Error al actualizar etiqueta";
        pushToast("error", errorMsg);
        return null;
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al actualizar etiqueta");
      return null;
    }
  }, [updateLabel]);

  const deleteLabelById = useCallback(async (id: string) => {
    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.DELETE_CRM_LABEL,
        variables: { id }
      });
      if (response?.deleteCRMLabel?.success) {
        setLabels(prev => prev.filter(l => l.id !== id));
        removeLabel(id);
        pushToast("success", "Etiqueta eliminada correctamente");
        return true;
      } else {
        const errorMsg = response?.deleteCRMLabel?.errors?.[0]?.message || "Error al eliminar etiqueta";
        pushToast("error", errorMsg);
        return false;
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al eliminar etiqueta");
      return false;
    }
  }, [removeLabel]);

  const assignLabel = useCallback(async (entityId: string, labelId: string) => {
    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.ASSIGN_CRM_LABEL,
        variables: { entityType, entityId, labelId }
      });
      if (response?.assignCRMLabel?.success) {
        pushToast("success", "Etiqueta asignada correctamente");
        return true;
      } else {
        const errorMsg = response?.assignCRMLabel?.errors?.[0]?.message || "Error al asignar etiqueta";
        pushToast("error", errorMsg);
        return false;
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al asignar etiqueta");
      return false;
    }
  }, [entityType]);

  const unassignLabel = useCallback(async (entityId: string, labelId: string) => {
    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.UNASSIGN_CRM_LABEL,
        variables: { entityType, entityId, labelId }
      });
      if (response?.unassignCRMLabel?.success) {
        pushToast("success", "Etiqueta desasignada correctamente");
        return true;
      } else {
        const errorMsg = response?.unassignCRMLabel?.errors?.[0]?.message || "Error al desasignar etiqueta";
        pushToast("error", errorMsg);
        return false;
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al desasignar etiqueta");
      return false;
    }
  }, [entityType]);

  return {
    labels,
    isLoading,
    loadLabels,
    createLabel,
    updateLabel: updateLabelById,
    deleteLabel: deleteLabelById,
    assignLabel,
    unassignLabel
  };
};

