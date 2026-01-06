import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { ToastContextProvider } from "../../context/ToastContext";
import { CRM_QUERIES, CRM_MUTATIONS } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";
import UserAutocomplete from "./UserAutocomplete";

interface GroupDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  onSuccess?: () => void;
}

interface GroupMember {
  user_id: string;
  name: string;
  email?: string;
  permission: string;
  added_by?: {
    user_id: string;
    name: string;
  };
  added_at?: string;
}

interface GroupDetails {
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
  updated_at?: string;
  members?: GroupMember[];
}

export default function GroupDetailsModal({
  isOpen,
  onClose,
  groupId,
  onSuccess,
}: GroupDetailsModalProps) {
  if (!isOpen) return null;

  const { dispatch } = ToastContextProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [groupDetails, setGroupDetails] = useState<GroupDetails | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberPermission, setNewMemberPermission] = useState<string>("READ");
  const [editingPermission, setEditingPermission] = useState<{ userId: string; permission: string } | null>(null);
  const [isEditingGroup, setIsEditingGroup] = useState(false);
  const [editGroupData, setEditGroupData] = useState<{ name: string; description: string; default_permission: string } | null>(null);

  const pushToast = (type: string, message: string) => {
    dispatch({
      type: "ADD_TOAST",
      payload: { id: `${Date.now()}-${Math.random()}`, type, message },
    } as any);
  };

  useEffect(() => {
    if (isOpen && groupId) {
      loadGroupDetails();
    }
  }, [isOpen, groupId]);

  const loadGroupDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetchApiCRM({
        query: CRM_QUERIES.GET_CRM_GROUP,
        variables: { group_id: groupId },
      });

        if (response?.getCRMGroup?.success && response?.getCRMGroup?.group) {
        const group = response.getCRMGroup.group;
        const groupData = {
          group_id: group.group_id,
          name: group.name,
          description: group.description,
          default_permission: group.default_permission,
          member_count: group.member_count,
          created_by: group.created_by,
          created_at: group.created_at,
          updated_at: group.updated_at,
        };
        setGroupDetails(groupData);
        setEditGroupData({
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
            added_by: m.added_by,
            added_at: m.added_at,
          })) || []
        );
      } else {
        pushToast("error", "Error al cargar los detalles del grupo");
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al cargar grupo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMember = async (user: { user_id: string; name: string; email?: string }) => {
    if (members.some((m) => m.user_id === user.user_id)) {
      pushToast("warning", "Este usuario ya está en el grupo");
      return;
    }

    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.ADD_CRM_GROUP_MEMBER,
        variables: {
          group_id: groupId,
          input: {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            permission: newMemberPermission,
          },
        },
      });

      if (response?.addCRMGroupMember?.success) {
        pushToast("success", response?.addCRMGroupMember?.message || "Miembro agregado correctamente");
        setSearchValue("");
        setShowAddMember(false);
        setNewMemberPermission("READ");
        await loadGroupDetails();
        if (onSuccess) onSuccess();
      } else {
        const errorMsg =
          response?.addCRMGroupMember?.errors?.[0]?.message || "Error al agregar miembro";
        pushToast("error", errorMsg);
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al agregar miembro");
    }
  };

  const handleRemoveMember = async (userId: string) => {
    if (!confirm("¿Estás seguro de que deseas remover este miembro del grupo?")) {
      return;
    }

    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.REMOVE_CRM_GROUP_MEMBER,
        variables: {
          group_id: groupId,
          user_id: userId,
        },
      });

      if (response?.removeCRMGroupMember?.success) {
        pushToast("success", "Miembro removido correctamente");
        await loadGroupDetails();
        if (onSuccess) onSuccess();
      } else {
        const errorMsg =
          response?.removeCRMGroupMember?.errors?.[0]?.message || "Error al remover miembro";
        pushToast("error", errorMsg);
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al remover miembro");
    }
  };

  const handleUpdateMemberPermission = async (userId: string, permission: string) => {
    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.UPDATE_CRM_GROUP_MEMBER_PERMISSION,
        variables: {
          input: {
            group_id: groupId,
            user_id: userId,
            permission: permission,
          },
        },
      });

      if (response?.updateCRMGroupMemberPermission?.success) {
        pushToast("success", response?.updateCRMGroupMemberPermission?.message || "Permiso actualizado correctamente");
        setEditingPermission(null);
        await loadGroupDetails();
        if (onSuccess) onSuccess();
      } else {
        const errorMsg =
          response?.updateCRMGroupMemberPermission?.errors?.[0]?.message ||
          "Error al actualizar permiso";
        pushToast("error", errorMsg);
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al actualizar permiso");
    }
  };

  const handleUpdateGroup = async (values: { name: string; description: string; default_permission: string }) => {
    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.UPDATE_CRM_GROUP,
        variables: {
          input: {
            group_id: groupId,
            name: values.name,
            description: values.description,
            default_permission: values.default_permission,
          },
        },
      });

      if (response?.updateCRMGroup?.success) {
        pushToast("success", response?.updateCRMGroup?.message || "Grupo actualizado correctamente");
        setIsEditingGroup(false);
        await loadGroupDetails();
        if (onSuccess) onSuccess();
      } else {
        const errorMsg =
          response?.updateCRMGroup?.errors?.[0]?.message || "Error al actualizar grupo";
        pushToast("error", errorMsg);
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al actualizar grupo");
    }
  };

  const getPermissionColor = (permission: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      READ: { bg: "#EFF6FF", text: "#1D4ED8" },
      WRITE: { bg: "#FEF3C7", text: "#92400E" },
      ADMIN: { bg: "#FEE2E2", text: "#991B1B" },
    };
    return colors[permission] || { bg: "#F3F4F6", text: "#374151" };
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 10000 }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] rounded-sm shadow-xl flex flex-col"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #F3F4F6",
          position: "relative",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid #E5E7EB", backgroundColor: "#F9FAFB" }}
        >
          <div>
            <h3 className="text-base font-semibold" style={{ color: "#111827" }}>
              {isEditingGroup ? "Editar Grupo" : "Detalles del Grupo"}
            </h3>
            {groupDetails && !isEditingGroup && (
              <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                {groupDetails.name}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!isEditingGroup && groupDetails && (
              <button
                onClick={() => setIsEditingGroup(true)}
                className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors"
                style={{
                  border: "1px solid #3B82F6",
                  color: "#3B82F6",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EFF6FF")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
                title="Editar grupo"
              >
                Editar Grupo
              </button>
            )}
            <button
              className="transition-colors p-1.5 rounded-sm"
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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm" style={{ color: "#6B7280" }}>Cargando...</div>
            </div>
          ) : groupDetails ? (
            <div className="space-y-4">
              {/* Información del Grupo */}
              {isEditingGroup && editGroupData ? (
                <Formik
                  enableReinitialize
                  initialValues={{
                    name: editGroupData.name,
                    description: editGroupData.description,
                    default_permission: editGroupData.default_permission as "READ" | "WRITE" | "ADMIN",
                  }}
                  validate={(vals) => {
                    const errors: Record<string, string> = {};
                    if (!vals.name || vals.name.trim().length === 0) {
                      errors.name = "El nombre es requerido";
                    }
                    return errors;
                  }}
                  onSubmit={async (vals, { setSubmitting }) => {
                    await handleUpdateGroup(vals);
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting, errors, touched, values }) => (
                    <Form className="space-y-3">
                      <div
                        className="p-3 rounded-sm"
                        style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "2px" }}
                      >
                        <h4 className="text-xs font-semibold mb-3" style={{ color: "#111827" }}>
                          Editar Información del Grupo
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <label className="text-[11px] font-medium block mb-1" style={{ color: "#6B7280" }}>
                              Nombre del grupo *
                            </label>
                            <Field
                              name="name"
                              type="text"
                              className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none w-full"
                              style={{
                                border: `1px solid ${errors.name && touched.name ? "#EF4444" : "#E5E7EB"}`,
                                backgroundColor: "#FFFFFF",
                                minHeight: "32px",
                                borderRadius: "2px",
                              }}
                            />
                            {errors.name && touched.name && (
                              <span className="text-[10px] mt-1 block" style={{ color: "#DC2626" }}>
                                {errors.name}
                              </span>
                            )}
                          </div>
                          <div>
                            <label className="text-[11px] font-medium block mb-1" style={{ color: "#6B7280" }}>
                              Descripción
                            </label>
                            <Field
                              name="description"
                              as="textarea"
                              rows={2}
                              className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none w-full resize-none"
                              style={{
                                border: "1px solid #E5E7EB",
                                backgroundColor: "#FFFFFF",
                                borderRadius: "2px",
                              }}
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-medium block mb-1" style={{ color: "#6B7280" }}>
                              Permiso del Grupo
                            </label>
                            <Field
                              as="select"
                              name="default_permission"
                              className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none w-full"
                              style={{
                                border: "1px solid #E5E7EB",
                                backgroundColor: "#FFFFFF",
                                minHeight: "32px",
                                borderRadius: "2px",
                              }}
                            >
                              <option value="READ">READ - Solo lectura</option>
                              <option value="WRITE">WRITE - Lectura y edición</option>
                              <option value="ADMIN">ADMIN - Control total</option>
                            </Field>
                            <p className="text-[10px] mt-1" style={{ color: "#9CA3AF" }}>
                              Este permiso se aplicará al grupo. Los miembros pueden tener permisos individuales diferentes.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsEditingGroup(false)}
                          className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors"
                          style={{
                            border: "1px solid #E5E7EB",
                            color: "#374151",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "2px",
                          }}
                          disabled={isSubmitting}
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-3 py-1.5 text-xs font-semibold rounded-sm text-white transition-colors disabled:opacity-60"
                          style={{ backgroundColor: "#3B82F6", borderRadius: "2px" }}
                        >
                          {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              ) : (
                <div
                  className="p-3 rounded-sm"
                  style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "2px" }}
                >
                  <h4 className="text-xs font-semibold mb-2" style={{ color: "#111827" }}>
                    Información del Grupo
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-medium" style={{ color: "#6B7280" }}>
                        Nombre:
                      </span>
                      <span className="ml-2" style={{ color: "#111827" }}>
                        {groupDetails.name}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium" style={{ color: "#6B7280" }}>
                        Permiso del grupo:
                      </span>
                      <span
                        className="ml-2 px-2 py-0.5 rounded-sm text-xs font-medium"
                        style={{
                          ...getPermissionColor(groupDetails.default_permission),
                          borderRadius: "2px",
                        }}
                      >
                        {groupDetails.default_permission}
                      </span>
                    </div>
                    {groupDetails.description && (
                      <div className="col-span-2">
                        <span className="font-medium" style={{ color: "#6B7280" }}>
                          Descripción:
                        </span>
                        <span className="ml-2" style={{ color: "#111827" }}>
                          {groupDetails.description}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium" style={{ color: "#6B7280" }}>
                        Miembros:
                      </span>
                      <span className="ml-2" style={{ color: "#111827" }}>
                        {members.length}
                      </span>
                    </div>
                    {groupDetails.created_by && (
                      <div>
                        <span className="font-medium" style={{ color: "#6B7280" }}>
                          Creado por:
                        </span>
                        <span className="ml-2" style={{ color: "#111827" }}>
                          {groupDetails.created_by.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Miembros del Grupo */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold" style={{ color: "#111827" }}>
                    Miembros del Grupo ({members.length})
                  </h4>
                  <button
                    onClick={() => {
                      setShowAddMember(!showAddMember);
                      setSearchValue("");
                    }}
                    className="px-2.5 py-1 text-xs font-medium rounded-sm text-white transition-colors"
                    style={{ backgroundColor: "#3B82F6", borderRadius: "2px" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563EB")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3B82F6")}
                  >
                    {showAddMember ? "Cancelar" : "+ Agregar Miembro"}
                  </button>
                </div>

                {/* Formulario para agregar miembro */}
                {showAddMember && (
                  <div
                    className="mb-3 p-3 rounded-sm"
                    style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "2px" }}
                  >
                    <div className="mb-2">
                      <label className="text-[11px] font-medium mb-1 block" style={{ color: "#6B7280" }}>
                        Buscar usuario
                      </label>
                      <UserAutocomplete
                        value={searchValue}
                        onChange={setSearchValue}
                        onSelectUser={handleAddMember}
                        selectedUsers={members.map((m) => ({
                          user_id: m.user_id,
                          name: m.name,
                          email: m.email,
                        }))}
                        placeholder="Buscar usuario para agregar..."
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium mb-1 block" style={{ color: "#6B7280" }}>
                        Permiso inicial
                      </label>
                      <select
                        value={newMemberPermission}
                        onChange={(e) => setNewMemberPermission(e.target.value)}
                        className="w-full rounded-sm px-2.5 py-1.5 text-xs focus:outline-none"
                        style={{
                          border: "1px solid #E5E7EB",
                          backgroundColor: "#FFFFFF",
                          borderRadius: "2px",
                        }}
                      >
                        <option value="READ">READ - Solo lectura</option>
                        <option value="WRITE">WRITE - Lectura y edición</option>
                        <option value="ADMIN">ADMIN - Lectura, edición y eliminación</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Lista de miembros */}
                {members.length === 0 ? (
                  <div
                    className="p-4 text-center rounded-sm"
                    style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "2px" }}
                  >
                    <p className="text-xs" style={{ color: "#6B7280" }}>
                      No hay miembros en este grupo
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {members.map((member) => (
                      <div
                        key={member.user_id}
                        className="flex items-center justify-between p-3 rounded-sm"
                        style={{
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #E5E7EB",
                          borderRadius: "2px",
                        }}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <div
                              className="text-xs font-medium truncate"
                              style={{ color: "#111827" }}
                              title={member.name}
                            >
                              {member.name}
                            </div>
                            {editingPermission?.userId === member.user_id ? (
                              <select
                                value={editingPermission.permission}
                                onChange={(e) =>
                                  setEditingPermission({
                                    userId: member.user_id,
                                    permission: e.target.value,
                                  })
                                }
                                className="text-[10px] px-2 py-0.5 rounded-sm focus:outline-none"
                                style={{
                                  border: "1px solid #3B82F6",
                                  backgroundColor: "#FFFFFF",
                                  borderRadius: "2px",
                                }}
                                autoFocus
                              >
                                <option value="READ">READ</option>
                                <option value="WRITE">WRITE</option>
                                <option value="ADMIN">ADMIN</option>
                              </select>
                            ) : (
                              <div className="flex items-center gap-1">
                                <span
                                  className="px-2 py-0.5 rounded-sm text-[10px] font-medium cursor-pointer"
                                  style={{
                                    ...getPermissionColor(member.permission),
                                    borderRadius: "2px",
                                  }}
                                  onClick={() =>
                                    setEditingPermission({
                                      userId: member.user_id,
                                      permission: member.permission,
                                    })
                                  }
                                  title="Click para editar permiso individual"
                                >
                                  Individual: {member.permission}
                                </span>
                                {groupDetails && member.permission !== groupDetails.default_permission && (
                                  <span
                                    className="px-2 py-0.5 rounded-sm text-[10px] font-medium"
                                    style={{
                                      ...getPermissionColor(groupDetails.default_permission),
                                      borderRadius: "2px",
                                    }}
                                    title="Permiso del grupo (diferente al individual)"
                                  >
                                    Grupo: {groupDetails.default_permission}
                                  </span>
                                )}
                                {groupDetails && member.permission === groupDetails.default_permission && (
                                  <span
                                    className="text-[10px] px-1.5 py-0.5 rounded-sm"
                                    style={{
                                      backgroundColor: "#F3F4F6",
                                      color: "#6B7280",
                                      borderRadius: "2px",
                                    }}
                                    title="Usa el permiso del grupo"
                                  >
                                    (igual al grupo)
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          {member.email && (
                            <div className="text-[10px] mt-0.5" style={{ color: "#6B7280" }}>
                              {member.email}
                            </div>
                          )}
                          {member.added_by && (
                            <div className="text-[10px] mt-0.5" style={{ color: "#9CA3AF" }}>
                              Agregado por {member.added_by.name}
                              {member.added_at &&
                                ` el ${new Date(member.added_at).toLocaleDateString()}`}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          {editingPermission?.userId === member.user_id && (
                            <>
                              <button
                                onClick={() =>
                                  handleUpdateMemberPermission(
                                    member.user_id,
                                    editingPermission.permission
                                  )
                                }
                                className="px-2 py-1 text-[10px] font-medium rounded-sm text-white transition-colors"
                                style={{ backgroundColor: "#10B981", borderRadius: "2px" }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#059669")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#10B981")}
                              >
                                Guardar
                              </button>
                              <button
                                onClick={() => setEditingPermission(null)}
                                className="px-2 py-1 text-[10px] font-medium rounded-sm transition-colors"
                                style={{
                                  border: "1px solid #E5E7EB",
                                  color: "#374151",
                                  backgroundColor: "#FFFFFF",
                                  borderRadius: "2px",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F3F4F6")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
                              >
                                Cancelar
                              </button>
                            </>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveMember(member.user_id)}
                            className="text-[10px] px-2 py-1 rounded-sm transition-colors"
                            style={{
                              color: "#DC2626",
                              backgroundColor: "transparent",
                              borderRadius: "2px",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FEF2F2")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            title="Remover miembro"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm" style={{ color: "#6B7280" }}>
                No se pudo cargar la información del grupo
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="px-4 py-3 flex items-center justify-end gap-2 flex-shrink-0"
          style={{
            borderTop: "1px solid #E5E7EB",
            backgroundColor: "#F9FAFB",
          }}
        >
          <button
            className="px-4 py-2 text-xs font-medium rounded-sm transition-colors"
            style={{
              border: "1px solid #E5E7EB",
              color: "#374151",
              backgroundColor: "#FFFFFF",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F3F4F6")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

