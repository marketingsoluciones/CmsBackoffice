import React, { useState, useEffect } from "react";
import { CRM_QUERIES, CRM_MUTATIONS } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { ToastContextProvider } from "../../context/ToastContext";

interface SharedUser {
  userId: string;
  userName: string;
  permissionLevel: "READ" | "WRITE" | "ADMIN";
  sharedAt?: string;
}

interface ShareEntityModalERPProps {
  isOpen: boolean;
  onClose: () => void;
  entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN" | "BUSINESS";
  entityId: string;
  entityName?: string;
  onUpdate?: () => void;
}

export default function ShareEntityModalERP({
  isOpen,
  onClose,
  entityType,
  entityId,
  entityName,
  onUpdate,
}: ShareEntityModalERPProps) {
  const [permissions, setPermissions] = useState<SharedUser[]>([]);
  const [owner, setOwner] = useState<{ userId: string; userName: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedPermission, setSelectedPermission] = useState<"READ" | "WRITE" | "ADMIN">("READ");
  const [availableUsers, setAvailableUsers] = useState<Array<{ id: string; name: string }>>([]);
  const { dispatch } = ToastContextProvider();

  const pushToast = (type: string, message: string) => {
    dispatch({
      type: "ADD_TOAST",
      payload: { id: `${Date.now()}-${Math.random()}`, type, message }
    } as any);
  };

  useEffect(() => {
    if (isOpen && entityId) {
      loadPermissions();
      setAvailableUsers([]);
    }
  }, [isOpen, entityId]);

  const loadPermissions = async () => {
    setIsLoading(true);
    try {
      const response = await fetchApiCRM({
        query: CRM_QUERIES.GET_CRM_ENTITY_PERMISSIONS,
        variables: { entityType, entityId }
      });
      if (response?.getCRMEntityPermissions?.success) {
        setPermissions(response.getCRMEntityPermissions.permissions || []);
        setOwner(response.getCRMEntityPermissions.owner || null);
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al cargar permisos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!selectedUserId) {
      pushToast("error", "Selecciona un usuario");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.SHARE_CRM_ENTITY,
        variables: {
          input: {
            entityType,
            entityId,
            shareWith: [{
              userId: selectedUserId,
              userName: availableUsers.find(u => u.id === selectedUserId)?.name || "Usuario",
              permissionLevel: selectedPermission
            }]
          }
        }
      });
      if (response?.shareCRMEntity?.success) {
        pushToast("success", "Entidad compartida correctamente");
        await loadPermissions();
        if (onUpdate) onUpdate();
        setSelectedUserId("");
        setSelectedPermission("READ");
      } else {
        const errorMsg = response?.shareCRMEntity?.errors?.[0]?.message || "Error al compartir";
        pushToast("error", errorMsg);
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al compartir");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnshare = async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.UNSHARE_CRM_ENTITY,
        variables: { entityType, entityId, userId }
      });
      if (response?.unshareCRMEntity?.success) {
        pushToast("success", "Permiso eliminado correctamente");
        await loadPermissions();
        if (onUpdate) onUpdate();
      } else {
        const errorMsg = response?.unshareCRMEntity?.errors?.[0]?.message || "Error al eliminar permiso";
        pushToast("error", errorMsg);
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al eliminar permiso");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePermission = async (userId: string, newLevel: "READ" | "WRITE" | "ADMIN") => {
    setIsLoading(true);
    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.UPDATE_CRM_ENTITY_PERMISSIONS,
        variables: { entityType, entityId, userId, permissionLevel: newLevel }
      });
      if (response?.updateCRMEntityPermissions?.success) {
        pushToast("success", "Permiso actualizado correctamente");
        await loadPermissions();
        if (onUpdate) onUpdate();
      } else {
        const errorMsg = response?.updateCRMEntityPermissions?.errors?.[0]?.message || "Error al actualizar permiso";
        pushToast("error", errorMsg);
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al actualizar permiso");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(2px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col"
        style={{ borderRadius: "2px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "#E5E7EB" }}>
          <h2 className="text-lg font-semibold" style={{ color: "#111827" }}>
            Compartir {entityName || entityType}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-sm transition-colors"
            style={{ color: "#6B7280" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F3F4F6";
              e.currentTarget.style.color = "#374151";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#6B7280";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 5L5 15M5 5l10 10" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {owner && (
              <div>
                <p className="text-sm font-medium mb-2" style={{ color: "#4B5563" }}>
                  Propietario
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{ backgroundColor: "#D1FAE5", color: "#047857" }}
                  >
                    {owner.userName}
                  </span>
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>ADMIN</span>
                </div>
              </div>
            )}

            <div style={{ borderTop: "1px solid #E5E7EB" }}></div>

            <div>
              <p className="text-sm font-medium mb-2" style={{ color: "#4B5563" }}>
                Compartido con
              </p>
              {permissions.length === 0 ? (
                <p className="text-sm" style={{ color: "#9CA3AF" }}>No hay usuarios compartidos</p>
              ) : (
                <div className="space-y-2">
                  {permissions.map((perm) => (
                    <div
                      key={perm.userId}
                      className="flex items-center justify-between p-2 rounded"
                      style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium" style={{ color: "#111827" }}>{perm.userName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="px-2 py-0.5 rounded text-xs font-medium"
                            style={{
                              backgroundColor:
                                perm.permissionLevel === "ADMIN"
                                  ? "#FEE2E2"
                                  : perm.permissionLevel === "WRITE"
                                  ? "#DBEAFE"
                                  : "#F3F4F6",
                              color:
                                perm.permissionLevel === "ADMIN"
                                  ? "#DC2626"
                                  : perm.permissionLevel === "WRITE"
                                  ? "#1D4ED8"
                                  : "#374151",
                            }}
                          >
                            {perm.permissionLevel}
                          </span>
                          {perm.sharedAt && (
                            <span className="text-xs" style={{ color: "#9CA3AF" }}>
                              {new Date(perm.sharedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          className="px-2 py-1 text-xs rounded border"
                          style={{
                            borderColor: "#E5E7EB",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "2px",
                          }}
                          value={perm.permissionLevel}
                          onChange={(e) => handleUpdatePermission(perm.userId, e.target.value as any)}
                          disabled={isLoading}
                        >
                          <option value="READ">Lectura</option>
                          <option value="WRITE">Escritura</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                        <button
                          onClick={() => handleUnshare(perm.userId)}
                          disabled={isLoading}
                          className="p-1 rounded transition-colors"
                          style={{ color: "#DC2626" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#FEE2E2";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 5L5 15M5 5l10 10" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ borderTop: "1px solid #E5E7EB" }}></div>

            <div>
              <p className="text-sm font-medium mb-2" style={{ color: "#4B5563" }}>
                Compartir con nuevo usuario
              </p>
              <div className="space-y-2">
                <select
                  className="w-full px-3 py-2 rounded border text-sm"
                  style={{
                    borderColor: "#E5E7EB",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "2px",
                  }}
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  disabled={isLoading || availableUsers.length === 0}
                >
                  <option value="">Seleccionar usuario</option>
                  {availableUsers.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
                {availableUsers.length === 0 && (
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>
                    No hay usuarios disponibles. Esta funcionalidad requiere integración con el sistema de usuarios.
                  </p>
                )}
                <select
                  className="w-full px-3 py-2 rounded border text-sm"
                  style={{
                    borderColor: "#E5E7EB",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "2px",
                  }}
                  value={selectedPermission}
                  onChange={(e) => setSelectedPermission(e.target.value as any)}
                  disabled={isLoading}
                >
                  <option value="READ">Lectura</option>
                  <option value="WRITE">Escritura</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <button
                  className="w-full px-4 py-2 text-sm font-medium text-white rounded transition-colors disabled:opacity-50"
                  style={{ backgroundColor: "#3B82F6", borderRadius: "2px" }}
                  onClick={handleShare}
                  disabled={isLoading || !selectedUserId}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor = "#2563EB";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.backgroundColor = "#3B82F6";
                    }
                  }}
                >
                  {isLoading ? "Compartiendo..." : "Compartir"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 p-4 border-t" style={{ borderColor: "#E5E7EB" }}>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded transition-colors"
            style={{
              border: "1px solid #E5E7EB",
              color: "#374151",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F9FAFB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

