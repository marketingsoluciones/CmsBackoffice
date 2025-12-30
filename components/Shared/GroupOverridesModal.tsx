import React, { useState, useEffect } from "react";
import { ToastContextProvider } from "../../context/ToastContext";
import { CRM_MUTATIONS, CRM_QUERIES } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";

interface GroupOverridesModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityId: string;
  entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN";
  groupId: string;
  groupName: string;
  onSuccess?: () => void;
}

interface Override {
  user_id: string;
  name: string;
  email?: string;
  permission: string;
}

interface GroupMember {
  user_id: string;
  name: string;
  email?: string;
  permission?: string;
}

export default function GroupOverridesModal({
  isOpen,
  onClose,
  entityId,
  entityType,
  groupId,
  groupName,
  onSuccess,
}: GroupOverridesModalProps) {
  if (!isOpen) return null;

  const { dispatch } = ToastContextProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const [overrides, setOverrides] = useState<Override[]>([]);
  const [selectedUserForOverride, setSelectedUserForOverride] = useState<string>("");

  const pushToast = (type: string, message: string) => {
    dispatch({
      type: "ADD_TOAST",
      payload: { id: `${Date.now()}-${Math.random()}`, type, message },
    } as any);
  };

  useEffect(() => {
    if (isOpen && groupId) {
      loadGroupData();
    }
  }, [isOpen, groupId]);

  const loadGroupData = async () => {
    setIsLoading(true);
    try {
      // Cargar miembros del grupo
      const groupResponse = await fetchApiCRM({
        query: CRM_QUERIES.GET_CRM_GROUP_MEMBERS,
        variables: { group_id: groupId },
      });

      if (groupResponse?.getCRMGroupMembers?.success) {
        setGroupMembers(groupResponse.getCRMGroupMembers.members || []);
      }

      // TODO: Cargar overrides existentes de la entidad
      // Por ahora inicializamos vacío
      setOverrides([]);
    } catch (error: any) {
      pushToast("error", error?.message || "Error al cargar datos del grupo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddOverride = async (userId: string, permission: string) => {
    if (!userId || !permission) {
      pushToast("error", "Selecciona un usuario y un permiso");
      return;
    }

    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.UPDATE_CRM_GROUP_MEMBER_OVERRIDE_IN_ENTITY,
        variables: {
          input: {
            entity_id: entityId,
            entity_type: entityType.toUpperCase(),
            group_id: groupId,
            user_id: userId,
            permission: permission,
          },
        },
      });

      if (response?.updateCRMGroupMemberOverrideInEntity?.success) {
        const member = groupMembers.find((m) => m.user_id === userId);
        if (member) {
          setOverrides((prev) => {
            const existing = prev.find((o) => o.user_id === userId);
            if (existing) {
              return prev.map((o) =>
                o.user_id === userId ? { ...o, permission } : o
              );
            }
            return [
              ...prev,
              {
                user_id: userId,
                name: member.name,
                email: member.email,
                permission,
              },
            ];
          });
          pushToast("success", "Override agregado correctamente");
          setSelectedUserForOverride("");
          if (onSuccess) onSuccess();
        }
      } else {
        const errorMsg =
          response?.updateCRMGroupMemberOverrideInEntity?.errors?.[0]?.message ||
          "Error al agregar override";
        pushToast("error", errorMsg);
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al agregar override");
    }
  };

  const handleRemoveOverride = async (userId: string) => {
    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.REMOVE_CRM_GROUP_MEMBER_OVERRIDE_IN_ENTITY,
        variables: {
          entity_id: entityId,
          entity_type: entityType.toUpperCase(),
          group_id: groupId,
          user_id: userId,
        },
      });

      if (response?.removeCRMGroupMemberOverrideInEntity?.success) {
        setOverrides((prev) => prev.filter((o) => o.user_id !== userId));
        pushToast("success", "Override removido correctamente");
        if (onSuccess) onSuccess();
      } else {
        const errorMsg =
          response?.removeCRMGroupMemberOverrideInEntity?.errors?.[0]?.message ||
          "Error al remover override";
        pushToast("error", errorMsg);
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al remover override");
    }
  };

  const availableMembersForOverride = groupMembers.filter(
    (member) => !overrides.some((o) => o.user_id === member.user_id)
  );

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 10000 }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] rounded-sm shadow-xl flex flex-col"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #F3F4F6",
          position: "relative",
          overflow: "visible",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-2.5 flex-shrink-0"
          style={{ borderBottom: "1px solid #E5E7EB" }}
        >
          <div>
            <h3 className="text-sm font-semibold" style={{ color: "#111827" }}>
              Gestionar Overrides - {groupName}
            </h3>
            <p className="text-xs mt-1" style={{ color: "#6B7280" }}>
              Permisos específicos para miembros del grupo en esta entidad
            </p>
          </div>
          <button
            className="transition-colors p-1 rounded-sm"
            style={{ color: "#6B7280", borderRadius: "2px" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#374151";
              e.currentTarget.style.backgroundColor = "#F3F4F6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6B7280";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            onClick={onClose}
            title="Cerrar"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {isLoading ? (
            <div className="text-xs text-center py-8" style={{ color: "#6B7280" }}>
              Cargando datos del grupo...
            </div>
          ) : (
            <div className="space-y-4">
              {/* Agregar nuevo override */}
              {availableMembersForOverride.length > 0 && (
                <div className="p-3 rounded-sm" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "2px" }}>
                  <h4 className="text-xs font-semibold mb-2" style={{ color: "#111827" }}>
                    Agregar Override
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-[11px] font-medium block mb-1" style={{ color: "#6B7280" }}>
                        Seleccionar miembro del grupo
                      </label>
                      <select
                        value={selectedUserForOverride}
                        onChange={(e) => setSelectedUserForOverride(e.target.value)}
                        className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all w-full"
                        style={{
                          border: "1px solid #E5E7EB",
                          backgroundColor: "#FFFFFF",
                          minHeight: "32px",
                          borderRadius: "2px",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#3B82F6";
                          e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#D1D5DB";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <option value="">Seleccionar miembro...</option>
                        {availableMembersForOverride.map((member) => (
                          <option key={member.user_id} value={member.user_id}>
                            {member.name} {member.email ? `(${member.email})` : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                    {selectedUserForOverride && (
                      <div className="flex items-center gap-2">
                        <label className="text-[11px] font-medium" style={{ color: "#6B7280", minWidth: "80px" }}>
                          Permiso
                        </label>
                        <select
                          className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all flex-1"
                          style={{
                            border: "1px solid #E5E7EB",
                            backgroundColor: "#FFFFFF",
                            minHeight: "32px",
                            borderRadius: "2px",
                          }}
                          onChange={(e) => {
                            if (e.target.value) {
                              handleAddOverride(selectedUserForOverride, e.target.value);
                              e.target.value = "";
                              setSelectedUserForOverride("");
                            }
                          }}
                          defaultValue=""
                        >
                          <option value="">Seleccionar permiso...</option>
                          <option value="READ">READ - Solo lectura</option>
                          <option value="WRITE">WRITE - Lectura y edición</option>
                          <option value="ADMIN">ADMIN - Lectura, edición y eliminación</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Lista de overrides existentes */}
              {overrides.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold mb-2" style={{ color: "#111827" }}>
                    Overrides Activos ({overrides.length})
                  </h4>
                  <div className="space-y-1">
                    {overrides.map((override) => {
                      const member = groupMembers.find((m) => m.user_id === override.user_id);
                      return (
                        <div
                          key={override.user_id}
                          className="flex items-center justify-between p-2 rounded-sm"
                          style={{
                            backgroundColor: "#F3F4F6",
                            border: "1px solid #E5E7EB",
                            borderRadius: "2px",
                          }}
                        >
                          <div className="flex-1">
                            <div className="text-xs font-medium" style={{ color: "#111827" }}>
                              {override.name}
                            </div>
                            {override.email && (
                              <div className="text-[10px]" style={{ color: "#6B7280" }}>
                                {override.email}
                              </div>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] px-1.5 py-0.5 rounded-sm" style={{
                                backgroundColor: "#EFF6FF",
                                color: "#1D4ED8",
                                borderRadius: "2px"
                              }}>
                                Override: {override.permission}
                              </span>
                              {member?.permission && (
                                <span className="text-[10px] text-gray-500">
                                  (En grupo: {member.permission})
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveOverride(override.user_id)}
                            className="text-[10px] px-2 py-1 rounded-sm transition-colors"
                            style={{
                              color: "#DC2626",
                              backgroundColor: "transparent",
                              borderRadius: "2px",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor = "#FEF2F2")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor = "transparent")
                            }
                          >
                            Remover
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Información sobre overrides */}
              <div className="p-3 rounded-sm" style={{ backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "2px" }}>
                <p className="text-xs" style={{ color: "#1E40AF" }}>
                  <strong>Nota:</strong> Los overrides permiten asignar permisos específicos a miembros individuales del grupo para esta entidad. 
                  Estos permisos tienen prioridad sobre el permiso por defecto del grupo y los permisos individuales en el grupo.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="px-4 py-2 flex items-center justify-end gap-2 flex-shrink-0"
          style={{
            borderTop: "1px solid #E5E7EB",
            backgroundColor: "#F9FAFB",
          }}
        >
          <button
            className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors"
            style={{
              border: "1px solid #E5E7EB",
              color: "#374151",
              backgroundColor: "#FFFFFF",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#F3F4F6")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#FFFFFF")
            }
            type="button"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

