import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { ToastContextProvider } from "../../context/ToastContext";
import { CRM_MUTATIONS, CRM_QUERIES } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";
import UserAutocomplete from "./UserAutocomplete";

interface GroupManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId?: string; // Si se proporciona, es edición; si no, es creación
  onSuccess?: () => void;
}

interface User {
  user_id: string;
  name: string;
  email?: string;
}

interface GroupMember {
  user_id: string;
  name: string;
  email?: string;
  permission?: string;
}

export default function GroupManagementModal({
  isOpen,
  onClose,
  groupId,
  onSuccess,
}: GroupManagementModalProps) {
  if (!isOpen) return null;

  const { dispatch } = ToastContextProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [newMemberPermission, setNewMemberPermission] = useState<string>("READ");

  const pushToast = (type: string, message: string) => {
    dispatch({
      type: "ADD_TOAST",
      payload: { id: `${Date.now()}-${Math.random()}`, type, message },
    } as any);
  };

  const isEditing = !!groupId;

  useEffect(() => {
    if (isOpen && groupId) {
      loadGroup();
    } else if (isOpen) {
      setMembers([]);
    }
  }, [isOpen, groupId]);

  const [initialGroupData, setInitialGroupData] = useState<{
    name: string;
    description: string;
    default_permission: string;
  } | null>(null);

  const loadGroup = async () => {
    if (!groupId) return;
    setIsLoading(true);
    try {
      const response = await fetchApiCRM({
        query: CRM_QUERIES.GET_CRM_GROUP,
        variables: { group_id: groupId },
      });

      if (response?.getCRMGroup?.success && response?.getCRMGroup?.group) {
        const group = response.getCRMGroup.group;
        setInitialGroupData({
          name: group.name,
          description: group.description || "",
          default_permission: group.default_permission,
        });
        setMembers(
          group.members?.map((m: any) => ({
            user_id: m.user_id,
            name: m.name,
            email: m.email,
            permission: m.permission || group.default_permission,
          })) || []
        );
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al cargar grupo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMember = async (user: User) => {
    if (!members.some((m) => m.user_id === user.user_id)) {
      const permissionToUse = newMemberPermission || "READ";
      
      // Si estamos editando, usar la mutation del backend
      if (isEditing && groupId) {
        try {
          const response = await fetchApiCRM({
            query: CRM_MUTATIONS.ADD_CRM_GROUP_MEMBER,
            variables: {
              input: {
                group_id: groupId,
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                permission: permissionToUse,
              },
            },
          });

          if (response?.addCRMGroupMember?.success) {
            // Agregar a la lista local
            setMembers((prev) => [
              ...prev,
              {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                permission: response.addCRMGroupMember.member?.permission || permissionToUse,
              },
            ]);
            setSearchValue("");
            setNewMemberPermission("READ"); // Resetear a READ después de agregar
            pushToast("success", "Miembro agregado correctamente");
          } else {
            const errorMsg =
              response?.addCRMGroupMember?.errors?.[0]?.message || "Error al agregar miembro";
            pushToast("error", errorMsg);
          }
        } catch (error: any) {
          pushToast("error", error?.message || "Error al agregar miembro");
        }
      } else {
        // Si estamos creando, solo agregar a la lista local
        setMembers((prev) => [
          ...prev,
          {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            permission: permissionToUse,
          },
        ]);
        setSearchValue("");
        setNewMemberPermission("READ"); // Resetear a READ después de agregar
      }
    } else {
      pushToast("warning", "Este usuario ya está en el grupo");
    }
  };

  const handleRemoveMember = async (userId: string) => {
    // Si estamos editando, usar la mutation del backend
    if (isEditing && groupId) {
      try {
        const response = await fetchApiCRM({
          query: CRM_MUTATIONS.REMOVE_CRM_GROUP_MEMBER,
          variables: {
            group_id: groupId,
            user_id: userId,
          },
        });

        if (response?.removeCRMGroupMember?.success) {
          setMembers((prev) => prev.filter((m) => m.user_id !== userId));
          pushToast("success", "Miembro removido correctamente");
        } else {
          const errorMsg =
            response?.removeCRMGroupMember?.errors?.[0]?.message || "Error al remover miembro";
          pushToast("error", errorMsg);
        }
      } catch (error: any) {
        pushToast("error", error?.message || "Error al remover miembro");
      }
    } else {
      // Si estamos creando, solo remover de la lista local
      setMembers((prev) => prev.filter((m) => m.user_id !== userId));
    }
  };

  const handleUpdateMemberPermission = async (userId: string, permission: string) => {
    // Si estamos editando, usar la mutation del backend
    if (isEditing && groupId) {
      try {
        const response = await fetchApiCRM({
          query: CRM_MUTATIONS.UPDATE_CRM_GROUP_MEMBER_PERMISSION,
          variables: {
            group_id: groupId,
            user_id: userId,
            permission: permission,
          },
        });

        if (response?.updateCRMGroupMemberPermission?.success) {
          setMembers((prev) =>
            prev.map((m) =>
              m.user_id === userId ? { ...m, permission } : m
            )
          );
          pushToast("success", "Permiso actualizado correctamente");
        } else {
          const errorMsg =
            response?.updateCRMGroupMemberPermission?.errors?.[0]?.message ||
            "Error al actualizar permiso";
          pushToast("error", errorMsg);
        }
      } catch (error: any) {
        pushToast("error", error?.message || "Error al actualizar permiso");
      }
    } else {
      // Si estamos creando, solo actualizar en la lista local
      setMembers((prev) =>
        prev.map((m) =>
          m.user_id === userId ? { ...m, permission } : m
        )
      );
    }
  };

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
          <h3 className="text-sm font-semibold" style={{ color: "#111827" }}>
            {isEditing ? "Editar Grupo" : "Crear Grupo"}
          </h3>
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
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: initialGroupData?.name || "",
            description: initialGroupData?.description || "",
            default_permission: (initialGroupData?.default_permission || "READ") as "READ" | "WRITE" | "ADMIN",
          }}
          validate={(vals) => {
            const errors: Record<string, string> = {};
            if (!vals.name || vals.name.trim().length === 0) {
              errors.name = "El nombre es requerido";
            }
            if (members.length === 0) {
              errors.members = "Debes agregar al menos un miembro";
            }
            return errors;
          }}
          onSubmit={async (vals, { setSubmitting }) => {
            try {
              if (isEditing && groupId) {
                // Actualizar grupo existente
                const response = await fetchApiCRM({
                  query: CRM_MUTATIONS.UPDATE_CRM_GROUP,
                  variables: {
                    input: {
                      group_id: groupId,
                      name: vals.name,
                      description: vals.description,
                      default_permission: vals.default_permission,
                    },
                  },
                });

                if (response?.updateCRMGroup?.success) {
                  pushToast("success", "Grupo actualizado correctamente");
                  if (onSuccess) onSuccess();
                  onClose();
                } else {
                  const errorMsg =
                    response?.updateCRMGroup?.errors?.[0]?.message ||
                    "Error al actualizar grupo";
                  pushToast("error", errorMsg);
                }
              } else {
                // Crear nuevo grupo
                const response = await fetchApiCRM({
                  query: CRM_MUTATIONS.CREATE_CRM_GROUP,
                  variables: {
                    input: {
                      name: vals.name,
                      description: vals.description,
                      default_permission: vals.default_permission,
                      members: members.map((m) => ({
                        user_id: m.user_id,
                        name: m.name,
                        email: m.email,
                        permission: m.permission || vals.default_permission,
                      })),
                    },
                  },
                });

                if (response?.createCRMGroup?.success) {
                  pushToast("success", "Grupo creado correctamente");
                  if (onSuccess) onSuccess();
                  onClose();
                } else {
                  const errorMsg =
                    response?.createCRMGroup?.errors?.[0]?.message ||
                    "Error al crear grupo";
                  pushToast("error", errorMsg);
                }
              }
            } catch (e: any) {
              pushToast("error", e?.message || "Error al guardar grupo");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched, values }) => (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-3">
                <Form className="grid grid-cols-1 gap-3" style={{ position: 'relative', overflow: 'visible' }}>
                  {/* Nombre del grupo */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-medium" style={{ color: "#6B7280" }}>
                      Nombre del grupo *
                    </label>
                    <Field
                      name="name"
                      type="text"
                      className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all"
                      style={{
                        border: `1px solid ${
                          errors.name && touched.name ? "#EF4444" : "#E5E7EB"
                        }`,
                        backgroundColor: "#FFFFFF",
                        minHeight: "32px",
                        borderRadius: "2px",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#3B82F6";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(59, 130, 246, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor =
                          errors.name && touched.name ? "#EF4444" : "#D1D5DB";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    {errors.name && touched.name ? (
                      <span className="text-[10px] mt-1" style={{ color: "#DC2626" }}>
                        {errors.name}
                      </span>
                    ) : null}
                  </div>

                  {/* Descripción */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-medium" style={{ color: "#6B7280" }}>
                      Descripción
                    </label>
                    <Field
                      name="description"
                      as="textarea"
                      rows={2}
                      className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all resize-none"
                      style={{
                        border: "1px solid #E5E7EB",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "2px",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#3B82F6";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(59, 130, 246, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#D1D5DB";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  {/* Permiso por defecto */}
                  <div className="flex items-center gap-2">
                    <label
                      className="text-[11px] font-medium"
                      style={{ color: "#6B7280", minWidth: "120px" }}
                    >
                      Permiso por defecto
                    </label>
                    <Field
                      as="select"
                      name="default_permission"
                      className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all flex-1"
                      style={{
                        border: "1px solid #E5E7EB",
                        backgroundColor: "#FFFFFF",
                        minHeight: "32px",
                        borderRadius: "2px",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#3B82F6";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(59, 130, 246, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#D1D5DB";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <option value="READ">READ - Solo lectura</option>
                      <option value="WRITE">WRITE - Lectura y edición</option>
                      <option value="ADMIN">ADMIN - Lectura, edición y eliminación</option>
                    </Field>
                  </div>

                  {/* Agregar miembros */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-medium" style={{ color: "#6B7280" }}>
                        {isEditing ? "Agregar nuevos miembros al grupo" : "Agregar miembros"}
                      </label>
                      {isEditing && (
                        <span className="text-[10px] px-2 py-0.5 rounded-sm" style={{ 
                          backgroundColor: "#EFF6FF", 
                          color: "#1D4ED8",
                          borderRadius: "2px"
                        }}>
                          Puedes agregar más miembros
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <UserAutocomplete
                          value={searchValue}
                          onChange={setSearchValue}
                          onSelectUser={handleAddMember}
                          selectedUsers={members.map((m) => ({
                            user_id: m.user_id,
                            name: m.name,
                            email: m.email,
                          }))}
                          placeholder={isEditing ? "Buscar usuario para agregar al grupo..." : "Buscar usuario para agregar..."}
                        />
                      </div>
                      <div className="w-36">
                        <label className="text-[10px] font-medium block mb-1" style={{ color: "#6B7280" }}>
                          Permiso:
                        </label>
                        <select
                          value={newMemberPermission}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setNewMemberPermission(e.target.value)
                          }
                          className="rounded-sm px-2 py-1.5 text-[10px] focus:outline-none w-full font-medium"
                          style={{
                            border: "1px solid #E5E7EB",
                            backgroundColor: "#FFFFFF",
                            minHeight: "32px",
                            borderRadius: "2px",
                            cursor: "pointer",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#3B82F6";
                            e.currentTarget.style.boxShadow =
                              "0 0 0 2px rgba(59, 130, 246, 0.1)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#D1D5DB";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                          title="Selecciona el permiso que tendrá el nuevo miembro"
                        >
                          <option value="READ">READ - Solo lectura</option>
                          <option value="WRITE">WRITE - Lectura y edición</option>
                          <option value="ADMIN">ADMIN - Control total</option>
                        </select>
                      </div>
                    </div>
                    <p className="text-[10px]" style={{ color: "#9CA3AF" }}>
                      {isEditing 
                        ? "Busca un usuario y selecciona su permiso antes de agregarlo. El permiso se aplicará solo a este miembro."
                        : "Selecciona el permiso que tendrá el nuevo miembro al agregarlo"}
                    </p>
                  </div>

                  {/* Lista de miembros */}
                  {members.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-medium" style={{ color: "#6B7280" }}>
                          Miembros del grupo ({members.length})
                        </label>
                        <span className="text-[10px]" style={{ color: "#9CA3AF" }}>
                          Puedes editar permisos individuales
                        </span>
                      </div>
                      <div className="space-y-1">
                        {members.map((member) => {
                          const permissionColors: Record<string, { bg: string; text: string }> = {
                            READ: { bg: "#EFF6FF", text: "#1D4ED8" },
                            WRITE: { bg: "#FEF3C7", text: "#92400E" },
                            ADMIN: { bg: "#FEE2E2", text: "#991B1B" },
                          };
                          const colors = permissionColors[member.permission || values.default_permission] || {
                            bg: "#F3F4F6",
                            text: "#374151",
                          };
                          
                          return (
                          <div
                            key={member.user_id}
                            className="flex items-center justify-between p-2.5 rounded-sm"
                            style={{
                              backgroundColor: "#FFFFFF",
                              border: "1px solid #E5E7EB",
                              borderRadius: "2px",
                            }}
                          >
                            <div className="flex-1">
                              <div
                                className="text-xs font-medium"
                                style={{ color: "#111827" }}
                              >
                                {member.name}
                              </div>
                              {member.email && (
                                <div className="text-[10px]" style={{ color: "#6B7280" }}>
                                  {member.email}
                                </div>
                              )}
                              <div className="mt-1">
                                <span 
                                  className="text-[10px] px-1.5 py-0.5 rounded-sm font-medium"
                                  style={{
                                    backgroundColor: colors.bg,
                                    color: colors.text,
                                    borderRadius: "2px",
                                  }}
                                >
                                  Permiso actual: {member.permission || values.default_permission}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <span className="text-[10px] font-medium" style={{ color: "#6B7280" }}>
                                  Permiso:
                                </span>
                                <select
                                  value={member.permission || values.default_permission}
                                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                    handleUpdateMemberPermission(
                                      member.user_id,
                                      e.target.value
                                    )
                                  }
                                  className="rounded-sm px-2 py-1 text-[10px] focus:outline-none font-medium"
                                  style={{
                                    border: "1px solid #E5E7EB",
                                    backgroundColor: "#FFFFFF",
                                    borderRadius: "2px",
                                    minWidth: "90px",
                                    cursor: "pointer",
                                  }}
                                  onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "#3B82F6";
                                    e.currentTarget.style.boxShadow =
                                      "0 0 0 2px rgba(59, 130, 246, 0.1)";
                                  }}
                                  onBlur={(e) => {
                                    e.currentTarget.style.borderColor = "#D1D5DB";
                                    e.currentTarget.style.boxShadow = "none";
                                  }}
                                  title="Click para cambiar el permiso de este miembro"
                                >
                                  <option value="READ">READ</option>
                                  <option value="WRITE">WRITE</option>
                                  <option value="ADMIN">ADMIN</option>
                                </select>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveMember(member.user_id)}
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
                                title="Remover miembro del grupo"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {errors.members && touched.members ? (
                    <span className="text-[10px]" style={{ color: "#DC2626" }}>
                      {errors.members}
                    </span>
                  ) : null}
                </Form>
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
                  className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    border: "1px solid #E5E7EB",
                    color: "#374151",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "2px",
                  }}
                  onMouseEnter={(e) =>
                    !e.currentTarget.disabled &&
                    (e.currentTarget.style.backgroundColor = "#F3F4F6")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#FFFFFF")
                  }
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  className="px-3 py-1.5 text-xs font-semibold rounded-sm text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#3B82F6", borderRadius: "2px" }}
                  onMouseEnter={(e) =>
                    !e.currentTarget.disabled &&
                    (e.currentTarget.style.backgroundColor = "#2563EB")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#3B82F6")
                  }
                  type="submit"
                  disabled={isSubmitting || members.length === 0}
                >
                  {isSubmitting
                    ? isEditing
                      ? "Guardando..."
                      : "Creando..."
                    : isEditing
                    ? "Guardar"
                    : "Crear Grupo"}
                </button>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}

