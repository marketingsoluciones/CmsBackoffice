import React, { useState } from "react";
import { ToastContextProvider } from "../../context/ToastContext";
import { CRM_MUTATIONS, CRM_QUERIES } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";
import GroupManagementModal from "../Shared/GroupManagementModal";
import GroupDetailsModal from "../Shared/GroupDetailsModal";
import AdvancedTable from "../Shared/AdvancedTable";

interface Group {
  group_id: string;
  name: string;
  description?: string;
  default_permission: string;
  member_count?: number;
  created_by?: {
    user_id: string;
    name: string;
  };
  created_at?: string;
}

export default function GroupsCRM() {
  const { dispatch } = ToastContextProvider();
  const [openCreate, setOpenCreate] = useState(false);
  const [editGroup, setEditGroup] = useState<Group | null>(null);
  const [viewingGroupId, setViewingGroupId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const pushToast = (type: string, message: string) => {
    dispatch({
      type: "ADD_TOAST",
      payload: { id: `${Date.now()}-${Math.random()}`, type, message },
    } as any);
  };

  const handleDelete = async (groupId: string, groupName: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar el grupo "${groupName}"?\n\nEsta acción no se puede deshacer.`)) {
      return;
    }

    try {
      setDeletingId(groupId);
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.DELETE_CRM_GROUP,
        variables: { group_id: groupId },
      });

      if (response?.deleteCRMGroup?.success) {
        pushToast("success", "Grupo eliminado correctamente");
        setRefreshKey((prev) => prev + 1);
      } else {
        const errorMsg =
          response?.deleteCRMGroup?.errors?.[0]?.message || "Error al eliminar grupo";
        pushToast("error", errorMsg);
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al eliminar grupo");
    } finally {
      setDeletingId(null);
    }
  };

  const defaultColumns = [
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "description", headerName: "Descripción", width: 250 },
    { field: "default_permission", headerName: "Permiso por Defecto", width: 150 },
    { field: "member_count", headerName: "Miembros", width: 100 },
    { field: "created_by", headerName: "Creado por", width: 150 },
    { field: "created_at", headerName: "Fecha de Creación", width: 150 },
  ];

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: "#F9FAFB" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E5E7EB" }}
      >
        <div>
          <h1 className="text-lg font-semibold" style={{ color: "#111827" }}>
            Grupos CRM
          </h1>
          <p className="text-xs mt-1" style={{ color: "#6B7280" }}>
            Gestiona grupos de usuarios para compartir entidades
          </p>
        </div>
        <button
          onClick={() => {
            setEditGroup(null);
            setOpenCreate(true);
          }}
          className="px-4 py-2 text-sm font-medium rounded-sm text-white transition-colors shadow-sm"
          style={{ backgroundColor: "#3B82F6", borderRadius: "2px" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563EB")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3B82F6")}
        >
          + Crear Grupo
        </button>
      </div>

      {/* Tabla de Grupos */}
      <div className="flex-1 overflow-hidden px-6 py-4">
        <AdvancedTable
          title="Grupos"
          entityType="GROUP"
          defaultColumns={defaultColumns}
          query={CRM_QUERIES.SEARCH_CRM_GROUPS}
          variables={{ search: "", limit: 1000 }}
          mapResponse={(resp: any) => resp?.searchCRMGroups?.groups ?? []}
          fetcher={fetchApiCRM}
          enableCRMFeatures={false}
          getRowId={(r: any) => r.group_id}
          key={refreshKey}
          renderCell={(row: any, col) => {
            if (col.field === "default_permission") {
              const permissionColors: Record<string, { bg: string; text: string }> = {
                READ: { bg: "#EFF6FF", text: "#1D4ED8" },
                WRITE: { bg: "#FEF3C7", text: "#92400E" },
                ADMIN: { bg: "#FEE2E2", text: "#991B1B" },
              };
              const colors = permissionColors[row.default_permission] || {
                bg: "#F3F4F6",
                text: "#374151",
              };
              return (
                <span
                  className="px-2 py-0.5 rounded-sm text-xs font-medium"
                  style={{ backgroundColor: colors.bg, color: colors.text, borderRadius: "2px" }}
                >
                  {row.default_permission}
                </span>
              );
            }
            if (col.field === "member_count") {
              return (
                <span className="text-sm" style={{ color: "#374151" }}>
                  {row.member_count || 0}
                </span>
              );
            }
            if (col.field === "created_by") {
              return (
                <span className="text-sm" style={{ color: "#6B7280" }}>
                  {row.created_by?.name || "N/A"}
                </span>
              );
            }
            if (col.field === "created_at") {
              return row.created_at ? (
                <span className="text-sm" style={{ color: "#6B7280" }}>
                  {new Date(row.created_at).toLocaleDateString()}
                </span>
              ) : (
                <span className="text-sm" style={{ color: "#9CA3AF" }}>N/A</span>
              );
            }
            if (col.field === "description") {
              return (
                <span className="text-sm" style={{ color: "#6B7280" }}>
                  {row.description || "-"}
                </span>
              );
            }
            return <span className="text-sm" style={{ color: "#111827" }}>{(row as any)[col.field]}</span>;
          }}
          renderActions={(row: any) => (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewingGroupId(row.group_id)}
                className="px-2 py-1 text-xs rounded-sm transition-colors"
                style={{
                  border: "1px solid #3B82F6",
                  color: "#3B82F6",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EFF6FF")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
                title="Ver detalles del grupo"
              >
                Ver Detalles
              </button>
              <button
                onClick={() => {
                  setEditGroup(row);
                  setOpenCreate(true);
                }}
                className="px-2 py-1 text-xs rounded-sm transition-colors"
                style={{
                  border: "1px solid #E5E7EB",
                  color: "#374151",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F3F4F6")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
                title="Editar grupo"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(row.group_id, row.name)}
                disabled={deletingId === row.group_id}
                className="px-2 py-1 text-xs rounded-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  border: "1px solid #EF4444",
                  color: "#DC2626",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) =>
                  !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = "#FEF2F2")
                }
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
                title="Eliminar grupo"
              >
                {deletingId === row.group_id ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          )}
        />
      </div>

      {/* Modal de Crear/Editar Grupo */}
      <GroupManagementModal
        isOpen={openCreate}
        onClose={() => {
          setOpenCreate(false);
          setEditGroup(null);
        }}
        groupId={editGroup?.group_id}
        onSuccess={() => {
          setRefreshKey((prev) => prev + 1);
          setOpenCreate(false);
          setEditGroup(null);
        }}
      />

      {/* Modal de Detalles del Grupo */}
      {viewingGroupId && (
        <GroupDetailsModal
          isOpen={!!viewingGroupId}
          onClose={() => setViewingGroupId(null)}
          groupId={viewingGroupId}
          onSuccess={() => {
            setRefreshKey((prev) => prev + 1);
          }}
        />
      )}
    </div>
  );
}

