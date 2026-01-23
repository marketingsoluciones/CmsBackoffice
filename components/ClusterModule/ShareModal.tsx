import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { ToastContextProvider } from "../../context/ToastContext";
import { CRM_MUTATIONS, CRM_QUERIES } from "../../utils/crmQueries";
import { fetchApiCRM, getCRMContext } from "../../utils/CRMFetching";
import UserAutocomplete from "../Shared/UserAutocomplete";
import GroupOverridesModal from "../Shared/GroupOverridesModal";
import GroupDetailsModal from "../Shared/GroupDetailsModal";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityId: string;
  entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN";
  entityLabel: string;
  onSuccess?: () => void;
}

interface User {
  user_id: string;
  name: string;
  email?: string;
  permission?: string; // Permiso individual del usuario
}

interface Group {
  group_id: string;
  name: string;
  description?: string;
  default_permission: string;
  member_count?: number;
}

interface SharedUser {
  user_id: string;
  name: string;
  permission: string;
  shared_at?: string;
  shared_by?: { user_id: string; name: string };
  access_origin?: "DIRECT" | "GROUP" | "GROUP_OVERRIDE";
  origin_group_name?: string;
  is_owner?: boolean;
  effective_permission?: string;
  permission_reason?: string;
}

interface SharedGroup {
  group_id: string;
  name: string;
  description?: string;
  default_permission: string;
  shared_at?: string;
  shared_by?: { user_id: string; name: string };
  member_count?: number;
  member_overrides?: Array<{ user_id: string; name: string; permission: string }>;
}

export default function ShareModal({ 
  isOpen, 
  onClose, 
  entityId, 
  entityType, 
  entityLabel,
  onSuccess 
}: ShareModalProps) {
  if (!isOpen) return null;
  
  const { dispatch } = ToastContextProvider();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<Group[]>([]);
  const [userPermissions, setUserPermissions] = useState<Record<string, string>>({}); // Permisos individuales por user_id
  const [availableGroups, setAvailableGroups] = useState<Group[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [newGroupPermission, setNewGroupPermission] = useState<string>("READ");
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>([]);
  const [sharedGroups, setSharedGroups] = useState<SharedGroup[]>([]);
  const [loadingShared, setLoadingShared] = useState(false);
  const [overridesModalOpen, setOverridesModalOpen] = useState(false);
  const [selectedGroupForOverrides, setSelectedGroupForOverrides] = useState<{ groupId: string; groupName: string } | null>(null);
  const [viewingGroupId, setViewingGroupId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [confirmUnshare, setConfirmUnshare] = useState<{ type: "user" | "group"; id: string; name: string; impact?: string } | null>(null);
  const [tooltipData, setTooltipData] = useState<{ userId: string; x: number; y: number } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const pushToast = (type: string, message: string) => {
    dispatch({ type: "ADD_TOAST", payload: { id: `${Date.now()}-${Math.random()}`, type, message } } as any);
  };

  // Obtener usuario actual
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const context = await getCRMContext();
        setCurrentUserId(context.userId);
      } catch (error) {
        console.error("Error getting current user:", error);
      }
    };
    if (isOpen) {
      getCurrentUser();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && entityId) {
      loadSharedData();
      loadAvailableGroups();
      setSelectedUsers([]);
      setSelectedGroups([]);
      setUserPermissions({});
      setSearchValue("");
      setShowCreateGroupForm(false);
      setNewGroupName("");
      setNewGroupDescription("");
      setNewGroupPermission("READ");
      setConfirmUnshare(null);
      setTooltipData(null);
    }
  }, [isOpen, entityId]);

  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        if (confirmUnshare) {
          setConfirmUnshare(null);
        } else if (overridesModalOpen) {
          setOverridesModalOpen(false);
        } else {
          onClose();
        }
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, confirmUnshare, overridesModalOpen, onClose]);

  const loadAvailableGroups = async () => {
    setLoadingGroups(true);
    try {
      const response = await fetchApiCRM({
        query: CRM_QUERIES.SEARCH_CRM_GROUPS,
        variables: {
          search: "",
          limit: 1000,
        },
      });

      if (response?.searchCRMGroups?.groups) {
        const available = response.searchCRMGroups.groups.filter(
          (group: Group) => !selectedGroups.some((sg) => sg.group_id === group.group_id)
        );
        setAvailableGroups(available);
      } else {
        setAvailableGroups([]);
      }
    } catch (error) {
      console.error("Error loading groups:", error);
      setAvailableGroups([]);
    } finally {
      setLoadingGroups(false);
    }
  };

  const loadSharedData = async () => {
    setLoadingShared(true);
    try {
      // Cargar usuarios compartidos
      try {
        const usersResponse = await fetchApiCRM({
          query: CRM_QUERIES.GET_CRM_ENTITY_SHARED_USERS,
          variables: {
            entity_id: entityId,
            entity_type: entityType.toUpperCase(),
          },
        });

        if (usersResponse?.getCRMEntitySharedUsers) {
          setSharedUsers(usersResponse.getCRMEntitySharedUsers || []);
        }
      } catch (error) {
        console.error("Error loading shared users:", error);
      }

      // Cargar grupos compartidos
      try {
        const groupsResponse = await fetchApiCRM({
          query: CRM_QUERIES.GET_CRM_ENTITY_SHARED_GROUPS,
          variables: {
            entity_id: entityId,
            entity_type: entityType.toUpperCase(),
          },
        });

        if (groupsResponse?.getCRMEntitySharedGroups) {
          setSharedGroups(groupsResponse.getCRMEntitySharedGroups || []);
        }
      } catch (error) {
        setSharedGroups([]);
      }
    } catch (error: any) {
      console.error("Error loading shared data:", error);
    } finally {
      setLoadingShared(false);
    }
  };

  // Validar si se está compartiendo consigo mismo
  const validateSelfShare = (user: User): boolean => {
    if (user.user_id === currentUserId) {
      pushToast("error", "No puedes compartir contigo mismo");
      return false;
    }
    return true;
  };

  // Validar nombre de grupo duplicado
  const validateGroupName = (name: string): boolean => {
    const trimmedName = name.trim();
    if (availableGroups.some(g => g.name.toLowerCase() === trimmedName.toLowerCase())) {
      pushToast("error", "Ya existe un grupo con ese nombre");
      return false;
    }
    if (selectedGroups.some(g => g.name.toLowerCase() === trimmedName.toLowerCase())) {
      pushToast("error", "Ya has seleccionado un grupo con ese nombre");
      return false;
    }
    return true;
  };

  // Validar emails de usuarios
  const validateUserEmails = (users: User[]): boolean => {
    const invalidUsers = users.filter(u => u.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u.email));
    if (invalidUsers.length > 0) {
      pushToast("error", `Algunos usuarios tienen emails inválidos: ${invalidUsers.map(u => u.name).join(", ")}`);
      return false;
    }
    return true;
  };

  const handleCreateGroupFromUsers = async () => {
    if (!newGroupName.trim()) {
      pushToast("error", "El nombre del grupo es requerido");
      return;
    }

    if (selectedUsers.length < 2) {
      pushToast("error", "Se necesitan al menos 2 usuarios para crear un grupo");
      return;
    }

    if (!validateGroupName(newGroupName)) {
      return;
    }

    if (!validateUserEmails(selectedUsers)) {
      return;
    }

    setCreatingGroup(true);
    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.CREATE_CRM_GROUP,
        variables: {
          input: {
            name: newGroupName.trim(),
            description: newGroupDescription.trim() || undefined,
            default_permission: newGroupPermission,
            members: selectedUsers.map((user) => ({
              user_id: user.user_id,
              name: user.name,
              email: user.email,
              permission: userPermissions[user.user_id] || user.permission || "READ",
            })),
          },
        },
      });

      if (response?.createCRMGroup?.success && response?.createCRMGroup?.group) {
        const newGroup = response.createCRMGroup.group;
        pushToast("success", `Grupo "${newGroup.name}" creado correctamente`);
        
        setSelectedGroups((prev) => [
          ...prev,
          {
            group_id: newGroup.group_id,
            name: newGroup.name,
            description: newGroup.description,
            default_permission: newGroup.default_permission,
            member_count: newGroup.member_count,
          },
        ]);

        setSelectedUsers([]);
        setShowCreateGroupForm(false);
        setNewGroupName("");
        setNewGroupDescription("");
        
        await loadAvailableGroups();
      } else {
        const errorMsg = response?.createCRMGroup?.errors?.[0]?.message || "Error al crear grupo";
        pushToast("error", errorMsg);
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al crear grupo");
    } finally {
      setCreatingGroup(false);
    }
  };

  const handleSelectGroup = (group: Group) => {
    if (!selectedGroups.some((g) => g.group_id === group.group_id)) {
      setSelectedGroups((prev) => [...prev, group]);
    } else {
      pushToast("warning", "Este grupo ya está seleccionado");
    }
  };

  const handleUnshare = async (userId: string, skipConfirm = false) => {
    const user = sharedUsers.find(u => u.user_id === userId);
    if (!user) return;

    // Verificar si es propietario (si el campo existe)
    if (user.is_owner) {
      pushToast("error", "No puedes remover al propietario de la entidad");
      return;
    }

    // Confirmación para usuarios con ADMIN
    if (!skipConfirm && user.permission === "ADMIN") {
      setConfirmUnshare({
        type: "user",
        id: userId,
        name: user.name,
        impact: `Este usuario tiene permisos de ADMIN. Al removerlo perderá todos los accesos.`
      });
      return;
    }

    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.UNSHARE_CRM_ENTITY,
        variables: {
          entity_id: entityId,
          entity_type: entityType.toUpperCase(),
          user_id: userId,
        },
      });

      if (response?.unshareCRMEntity?.success) {
        pushToast("success", "Usuario removido correctamente");
        await loadSharedData();
        if (onSuccess) onSuccess();
        setConfirmUnshare(null);
      } else {
        const errorMsg = response?.unshareCRMEntity?.errors?.[0]?.message || "Error al remover usuario";
        pushToast("error", errorMsg);
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al remover usuario");
    }
  };

  const handleUnshareGroup = async (groupId: string, skipConfirm = false) => {
    const group = sharedGroups.find(g => g.group_id === groupId);
    if (!group) return;

    // Confirmación para grupos con más de 3 miembros
    if (!skipConfirm && (group.member_count || 0) > 3) {
      setConfirmUnshare({
        type: "group",
        id: groupId,
        name: group.name,
        impact: `Este grupo tiene ${group.member_count} miembros. Al removerlo, todos perderán el acceso.`
      });
      return;
    }

    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.UNSHARE_CRM_ENTITY_FROM_GROUP,
        variables: {
          entity_id: entityId,
          entity_type: entityType.toUpperCase(),
          group_id: groupId,
        },
      });

      if (response?.unshareCRMEntityFromGroup?.success) {
        pushToast("success", "Grupo removido correctamente");
        await loadSharedData();
        if (onSuccess) onSuccess();
        setConfirmUnshare(null);
      } else {
        const errorMsg = response?.unshareCRMEntityFromGroup?.errors?.[0]?.message || "Error al remover grupo";
        pushToast("error", errorMsg);
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al remover grupo");
    }
  };

  // Obtener badge de origen de acceso
  const getAccessOriginBadge = (user: SharedUser) => {
    // Si el backend no proporciona estos campos, usar valores por defecto
    if (user.is_owner) {
      return { text: "Propietario", color: "#F59E0B", bgColor: "#FEF3C7" };
    }
    // Por defecto, asumimos acceso directo si no hay información
    return { text: "Acceso directo", color: "#6B7280", bgColor: "#F3F4F6" };
  };

  // Calcular permiso efectivo y razón
  const getEffectivePermission = (user: SharedUser): { permission: string; reason: string } => {
    // Si tiene permiso efectivo del backend, usarlo
    if (user.effective_permission && user.permission_reason) {
      return { permission: user.effective_permission, reason: user.permission_reason };
    }

    // Usar el permiso que viene del backend
    const permission = user.permission || "READ";
    const reason = `Permiso ${permission}`;

    return { permission, reason };
  };

  return (
    <>
      <div 
        className="fixed inset-0 flex items-center justify-center" 
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 10000 }} 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
      >
        <div 
          className="w-full max-w-2xl max-h-[90vh] shadow-2xl flex flex-col" 
          style={{ backgroundColor: '#FFFFFF', borderRadius: '2px', position: 'relative', overflow: 'visible' }} 
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-2.5 flex-shrink-0" style={{ borderBottom: '1px solid #E5E7EB' }}>
            <h3 id="share-modal-title" className="text-sm font-semibold" style={{ color: '#111827' }}>Compartir {entityLabel}</h3>
            <button 
              className="transition-colors p-1 rounded-sm" 
              style={{ color: '#6B7280', borderRadius: '2px' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#374151'; e.currentTarget.style.backgroundColor = '#F3F4F6'; }} 
              onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.backgroundColor = 'transparent'; }} 
              onClick={onClose}
              title="Cerrar"
              aria-label="Cerrar modal"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>

        <Formik
            initialValues={{ 
              notify: true,
            }}
            enableReinitialize={false}
            validateOnChange={true}
            validateOnBlur={true}
          validate={(vals) => {
            const errors: Record<string, string> = {};
              if (selectedUsers.length === 0 && selectedGroups.length === 0) {
                errors.selectedItems = "Debes seleccionar al menos un usuario o grupo";
            }
            return errors;
          }}
            onSubmit={async (vals, { setSubmitting, validateForm }) => {
              const validationErrors = await validateForm();
              if (validationErrors.selectedItems) {
                setSubmitting(false);
                return;
              }
              
              if (selectedUsers.length === 0 && selectedGroups.length === 0) {
                pushToast("error", "Debes seleccionar al menos un usuario o grupo");
                setSubmitting(false);
                return;
              }

              // Validar que no se comparta consigo mismo
              const selfShare = selectedUsers.find(u => u.user_id === currentUserId);
              if (selfShare) {
                pushToast("error", "No puedes compartir contigo mismo");
                setSubmitting(false);
                return;
              }

              try {
                const promises: Promise<any>[] = [];

                if (selectedUsers.length > 0) {
                  const shareWithUsers = selectedUsers.map(user => ({
                    user_id: user.user_id,
                    name: user.name,
                    permission: userPermissions[user.user_id] || user.permission || "READ",
                  }));

                  promises.push(
                    fetchApiCRM({
                      query: CRM_MUTATIONS.SHARE_CRM_ENTITY,
                      variables: {
                        input: {
                          entity_id: entityId,
                          entity_type: entityType.toUpperCase(),
                          share_with_users: shareWithUsers,
                          notify: vals.notify,
                        },
                      },
                    })
                  );
                }

                if (selectedGroups.length > 0) {
                  selectedGroups.forEach(group => {
                    promises.push(
                      fetchApiCRM({
                        query: CRM_MUTATIONS.SHARE_CRM_ENTITY_WITH_GROUP,
                        variables: {
                          input: {
                            entity_id: entityId,
                            entity_type: entityType.toUpperCase(),
                            group_id: group.group_id,
                            default_permission: group.default_permission || "READ",
                            member_overrides: [],
                          },
                        },
                      })
                    );
                  });
                }

                const responses = await Promise.all(promises);
                
                // Verificar errores de GraphQL primero
                const graphQLErrors = responses.filter(r => r?.errors && r.errors.length > 0);
                if (graphQLErrors.length > 0) {
                  const firstError = graphQLErrors[0];
                  const errorMsg = firstError.errors?.[0]?.message || "Error al compartir";
                  console.error("Error GraphQL al compartir:", firstError);
                  pushToast("error", errorMsg);
                  setSubmitting(false);
                  return;
                }

                // Verificar si alguna respuesta es null (error del backend)
                const nullResponses = responses.filter(r => {
                  if (r?.shareCRMEntity === null) return true;
                  if (r?.shareCRMEntityWithGroup === null) return true;
                  return false;
                });
                
                if (nullResponses.length > 0) {
                  console.error("El backend retornó null para la mutación:", nullResponses);
                  pushToast("error", "Error del servidor: La operación no se completó correctamente. Por favor, contacta al administrador.");
                  setSubmitting(false);
                  return;
                }

                const allSuccess = responses.every(r => {
                  if (r?.shareCRMEntity) return r.shareCRMEntity?.success === true;
                  if (r?.shareCRMEntityWithGroup) return r.shareCRMEntityWithGroup?.success === true;
                  return false;
                });

                if (allSuccess) {
                  const userCount = selectedUsers.length;
                  const groupCount = selectedGroups.length;
                  let message = `${entityLabel} compartido correctamente`;
                  if (userCount > 0 && groupCount > 0) {
                    message = `${entityLabel} compartido con ${userCount} usuario(s) y ${groupCount} grupo(s)`;
                  } else if (userCount > 0) {
                    message = `${entityLabel} compartido con ${userCount} usuario(s)`;
                  } else if (groupCount > 0) {
                    message = `${entityLabel} compartido con ${groupCount} grupo(s)`;
                  }
                  pushToast("success", message);
                  await loadSharedData();
                  setSelectedUsers([]);
                  setSelectedGroups([]);
                  setSearchValue("");
                  setShowCreateGroupForm(false);
                  if (onSuccess) onSuccess();
              onClose();
                } else {
                  const firstError = responses.find(r => {
                    if (r?.shareCRMEntity && r.shareCRMEntity.success === false) return true;
                    if (r?.shareCRMEntityWithGroup && r.shareCRMEntityWithGroup.success === false) return true;
                    return false;
                  });
                  const errorMsg = firstError?.shareCRMEntity?.errors?.[0]?.message || 
                                  firstError?.shareCRMEntityWithGroup?.errors?.[0]?.message || 
                                  "Error al compartir";
                  pushToast("error", errorMsg);
                }
            } catch (e: any) {
              console.error("Error al compartir:", e);
              let errorMsg = e?.message || e?.errors?.[0]?.message || "Error al compartir";
              
              // Mensaje específico para el error de null en shareCRMEntityWithGroup
              if (errorMsg.includes("Cannot return null for non-nullable field Mutation.shareCRMEntityWithGroup")) {
                errorMsg = "Error del servidor: La mutación shareCRMEntityWithGroup no está implementada correctamente. Por favor, contacta al administrador del sistema. El backend debe retornar siempre un objeto válido, nunca null.";
                console.error("🚨 PROBLEMA DEL BACKEND:", {
                  error: "shareCRMEntityWithGroup retorna null",
                  mensaje: "El resolver shareCRMEntityWithGroup debe retornar siempre un objeto CRM_ShareEntityResponse, nunca null",
                  accion: "El equipo de backend debe verificar que la implementación del resolver esté completa y reiniciar el servidor"
                });
              }
              
              pushToast("error", errorMsg);
            } finally {
              setSubmitting(false);
            }
          }}
        >
            {({ isSubmitting, errors, touched, values, setFieldError, setFieldTouched, validateForm, setFieldValue }) => {
              useEffect(() => {
                validateForm();
              }, [selectedUsers.length, selectedGroups.length, validateForm]);
              
              return (
                <>
                  <div className="flex-1 overflow-y-auto px-4 py-3">
                    <Form className="grid grid-cols-1 gap-3" style={{ position: 'relative', overflow: 'visible' }}>
                      {/* Búsqueda de usuarios */}
              <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-medium" style={{ color: '#6B7280' }}>
                          Buscar usuarios
                        </label>
                        <UserAutocomplete
                          value={searchValue}
                          onChange={setSearchValue}
                          onSelectUser={(user) => {
                            if (!validateSelfShare(user)) return;
                            if (!selectedUsers.some(u => u.user_id === user.user_id)) {
                              // Agregar usuario con permiso por defecto READ
                              const newUser: User = { ...user, permission: "READ" };
                              setSelectedUsers(prev => {
                                const newUsers = [...prev, newUser];
                                setUserPermissions(prev => ({ ...prev, [user.user_id]: "READ" }));
                                setTimeout(() => {
                                  setFieldTouched("selectedItems", true);
                                  setFieldError("selectedItems", undefined);
                                  validateForm();
                                }, 0);
                                return newUsers;
                              });
                            } else {
                              pushToast("warning", "Este usuario ya está seleccionado");
                            }
                          }}
                          selectedUsers={selectedUsers}
                          placeholder="Escribe nombre o correo del usuario..."
                          error={errors.selectedItems && touched.selectedItems ? errors.selectedItems : undefined}
                        />
                        {errors.selectedItems && touched.selectedItems ? (
                          <span className="text-[10px] mt-1" style={{ color: '#DC2626' }}>{errors.selectedItems}</span>
                        ) : null}
                      </div>

                      {/* Lista de usuarios seleccionados */}
                      {selectedUsers.length > 0 && (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <label className="text-[11px] font-medium" style={{ color: '#6B7280' }}>
                              Usuarios seleccionados ({selectedUsers.length})
                            </label>
                            {selectedUsers.length >= 2 && !showCreateGroupForm && (
                              <button
                                type="button"
                                onClick={() => setShowCreateGroupForm(true)}
                                className="text-[10px] px-2 py-1 rounded-sm transition-colors"
                                style={{ 
                                  color: '#3B82F6', 
                                  backgroundColor: '#EFF6FF', 
                                  borderRadius: '2px',
                                  border: '1px solid #BFDBFE'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DBEAFE'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#EFF6FF'}
                                aria-label="Crear grupo con estos usuarios"
                              >
                                + Crear grupo con estos usuarios
                              </button>
                            )}
                          </div>
                          <div className="space-y-1">
                            {selectedUsers.map((user) => (
                              <div
                                key={user.user_id}
                                className="flex items-center justify-between p-2 rounded-sm transition-colors"
                                style={{ backgroundColor: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '2px' }}
                              >
                                <div className="flex-1">
                                  <div className="text-xs font-medium" style={{ color: '#111827' }}>
                                    {user.name}
                                  </div>
                                  {user.email && (
                                    <div className="text-[10px]" style={{ color: '#6B7280' }}>
                                      {user.email}
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <select
                                    value={userPermissions[user.user_id] || user.permission || "READ"}
                                    onChange={(e) => {
                                      const newPermission = e.target.value;
                                      setUserPermissions(prev => ({ ...prev, [user.user_id]: newPermission }));
                                      setSelectedUsers(prev => prev.map(u => 
                                        u.user_id === user.user_id ? { ...u, permission: newPermission } : u
                                      ));
                                    }}
                                    className="text-[10px] px-2 py-1 rounded-sm focus:outline-none"
                                    style={{
                                      border: "1px solid #E5E7EB",
                                      backgroundColor: "#FFFFFF",
                                      borderRadius: "2px",
                                      minWidth: "90px",
                                    }}
                                    onFocus={(e) => {
                                      e.currentTarget.style.borderColor = "#3B82F6";
                                      e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)";
                                    }}
                                    onBlur={(e) => {
                                      e.currentTarget.style.borderColor = "#D1D5DB";
                                      e.currentTarget.style.boxShadow = "none";
                                    }}
                                    title="Permiso individual para este usuario"
                                  >
                                    <option value="READ">READ</option>
                                    <option value="WRITE">WRITE</option>
                                    <option value="ADMIN">ADMIN</option>
                                  </select>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedUsers(prev => {
                                        const newUsers = prev.filter(u => u.user_id !== user.user_id);
                                        const newPermissions = { ...userPermissions };
                                        delete newPermissions[user.user_id];
                                        setUserPermissions(newPermissions);
                                        setTimeout(() => {
                                          setFieldTouched("selectedItems", true);
                                          if (newUsers.length === 0 && selectedGroups.length === 0) {
                                            setFieldError("selectedItems", "Debes seleccionar al menos un usuario o grupo");
                                          } else {
                                            setFieldError("selectedItems", undefined);
                                          }
                                          validateForm();
                                        }, 0);
                                        return newUsers;
                                      });
                                      if (selectedUsers.length === 2) {
                                        setShowCreateGroupForm(false);
                                      }
                                    }}
                                    className="text-[10px] px-2 py-1 rounded-sm transition-colors"
                                    style={{ color: '#DC2626', backgroundColor: 'transparent', borderRadius: '2px' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    aria-label={`Remover ${user.name}`}
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Formulario para crear grupo */}
                      {showCreateGroupForm && selectedUsers.length >= 2 && (
                        <div className="p-3 rounded-sm" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xs font-semibold" style={{ color: '#111827' }}>
                              Crear grupo con {selectedUsers.length} usuarios
                            </h4>
                            <button
                              type="button"
                              onClick={() => {
                                setShowCreateGroupForm(false);
                                setNewGroupName("");
                                setNewGroupDescription("");
                              }}
                              className="text-[10px] px-1.5 py-0.5 rounded-sm transition-colors"
                              style={{ color: '#6B7280', backgroundColor: 'transparent', borderRadius: '2px' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              aria-label="Cerrar formulario de grupo"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <label className="text-[11px] font-medium block mb-1" style={{ color: '#6B7280' }}>
                                Nombre del grupo *
                              </label>
                              <input
                                type="text"
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                                placeholder="Ej: Equipo Ventas Madrid"
                                className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all w-full"
                                style={{
                                  border: '1px solid #E5E7EB',
                                  backgroundColor: '#FFFFFF',
                                  minHeight: '32px',
                                  borderRadius: '2px'
                                }}
                                onFocus={(e) => {
                                  e.currentTarget.style.borderColor = '#3B82F6';
                                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
                                }}
                                onBlur={(e) => {
                                  e.currentTarget.style.borderColor = '#D1D5DB';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                                aria-label="Nombre del grupo"
                                aria-required="true"
                              />
              </div>
                            <div>
                              <label className="text-[11px] font-medium block mb-1" style={{ color: '#6B7280' }}>
                                Descripción (opcional)
                              </label>
                              <textarea
                                value={newGroupDescription}
                                onChange={(e) => setNewGroupDescription(e.target.value)}
                                placeholder="Descripción del grupo..."
                                rows={2}
                                className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all w-full resize-none"
                                style={{
                                  border: '1px solid #E5E7EB',
                                  backgroundColor: '#FFFFFF',
                                  borderRadius: '2px'
                                }}
                                onFocus={(e) => {
                                  e.currentTarget.style.borderColor = '#3B82F6';
                                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
                                }}
                                onBlur={(e) => {
                                  e.currentTarget.style.borderColor = '#D1D5DB';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                                aria-label="Descripción del grupo"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-medium block mb-1" style={{ color: '#6B7280' }}>
                                Permiso del Grupo *
                              </label>
                              <select
                                value={newGroupPermission}
                                onChange={(e) => setNewGroupPermission(e.target.value)}
                                className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all w-full"
                                style={{
                                  border: '1px solid #E5E7EB',
                                  backgroundColor: '#FFFFFF',
                                  minHeight: '32px',
                                  borderRadius: '2px'
                                }}
                                onFocus={(e) => {
                                  e.currentTarget.style.borderColor = '#3B82F6';
                                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
                                }}
                                onBlur={(e) => {
                                  e.currentTarget.style.borderColor = '#D1D5DB';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                                aria-label="Permiso del grupo"
                              >
                                <option value="READ">READ - Solo lectura</option>
                                <option value="WRITE">WRITE - Lectura y edición</option>
                                <option value="ADMIN">ADMIN - Control total</option>
                              </select>
                              <p className="text-[10px] mt-1" style={{ color: '#9CA3AF' }}>
                                Este permiso se aplicará al grupo. Los miembros pueden tener permisos individuales diferentes.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCreateGroupFromUsers()}
                              disabled={creatingGroup || !newGroupName.trim()}
                              className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                              style={{ 
                                backgroundColor: '#3B82F6', 
                                color: '#FFFFFF',
                                borderRadius: '2px'
                              }}
                              onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#2563EB')}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3B82F6'}
                              aria-label="Crear grupo y agregar"
                            >
                              {creatingGroup ? "Creando..." : "Crear grupo y agregar"}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Separador */}
                      {(selectedUsers.length > 0 || selectedGroups.length > 0 || availableGroups.length > 0) && (
                        <div className="my-2" style={{ borderTop: '1px solid #E5E7EB' }}></div>
                      )}

                      {/* Lista de grupos disponibles */}
                      {availableGroups.length > 0 ? (
                        <div className="flex flex-col gap-2">
                          <label className="text-[11px] font-medium" style={{ color: '#6B7280' }}>
                            Grupos disponibles ({availableGroups.length})
                          </label>
                          <div className="space-y-1 max-h-48 overflow-y-auto" role="listbox" aria-label="Grupos disponibles">
                            {availableGroups.map((group) => (
                              <div
                                key={group.group_id}
                                className="flex items-center justify-between p-2 rounded-sm transition-colors"
                                style={{ 
                                  backgroundColor: selectedGroups.some(g => g.group_id === group.group_id) ? '#EFF6FF' : '#F9FAFB',
                                  border: `1px solid ${selectedGroups.some(g => g.group_id === group.group_id) ? '#3B82F6' : '#E5E7EB'}`,
                                  borderRadius: '2px'
                                }}
                                onMouseEnter={(e) => {
                                  if (!selectedGroups.some(g => g.group_id === group.group_id)) {
                                    e.currentTarget.style.backgroundColor = '#F3F4F6';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!selectedGroups.some(g => g.group_id === group.group_id)) {
                                    e.currentTarget.style.backgroundColor = '#F9FAFB';
                                  }
                                }}
                                role="option"
                                aria-selected={selectedGroups.some(g => g.group_id === group.group_id)}
                              >
                                <div 
                                  className="flex-1 cursor-pointer"
                                  onClick={() => handleSelectGroup(group)}
                                >
                                  <div className="text-xs font-medium" style={{ color: '#111827' }}>
                                    {group.name}
                                  </div>
                                  {group.description && (
                                    <div className="text-[10px]" style={{ color: '#6B7280' }}>
                                      {group.description}
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px]" style={{ color: '#9CA3AF' }}>
                                      {group.member_count || 0} miembros
                                    </span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-sm" style={{ 
                                      backgroundColor: '#EFF6FF', 
                                      color: '#1D4ED8',
                                      borderRadius: '2px'
                                    }}>
                                      Permiso: {group.default_permission}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 ml-2">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setViewingGroupId(group.group_id);
                                    }}
                                    className="text-[10px] px-2 py-1 rounded-sm transition-colors"
                                    style={{ 
                                      color: '#3B82F6', 
                                      backgroundColor: 'transparent',
                                      border: '1px solid #3B82F6',
                                      borderRadius: '2px'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EFF6FF'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    title="Ver detalles del grupo"
                                  >
                                    Ver
                                  </button>
                                  {selectedGroups.some(g => g.group_id === group.group_id) && (
                                    <div className="text-[10px] px-2 py-0.5 rounded-sm" style={{ 
                                      backgroundColor: '#3B82F6', 
                                      color: '#FFFFFF',
                                      borderRadius: '2px'
                                    }}>
                                      ✓
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : !loadingGroups && (
                        <div className="p-4 text-center rounded-sm" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
                          <p className="text-xs" style={{ color: '#6B7280' }}>
                            No hay grupos creados todavía.
                          </p>
                          <p className="text-[10px] mt-1" style={{ color: '#9CA3AF' }}>
                            Puedes crear uno seleccionando varios usuarios.
                          </p>
                        </div>
                      )}

                      {/* Lista de grupos seleccionados */}
                      {selectedGroups.length > 0 && (
                        <div className="flex flex-col gap-2">
                          <label className="text-[11px] font-medium" style={{ color: '#6B7280' }}>
                            Grupos seleccionados ({selectedGroups.length})
                          </label>
                          <div className="space-y-1">
                            {selectedGroups.map((group) => (
                              <div
                                key={group.group_id}
                                className="flex items-center justify-between p-2 rounded-sm"
                                style={{ backgroundColor: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '2px' }}
                              >
                                <div className="flex-1">
                                  <div className="text-xs font-medium" style={{ color: '#111827' }}>
                                    {group.name}
                                  </div>
                                  {group.description && (
                                    <div className="text-[10px]" style={{ color: '#6B7280' }}>
                                      {group.description}
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px]" style={{ color: '#9CA3AF' }}>
                                      {group.member_count || 0} miembros
                                    </span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-sm" style={{ 
                                      backgroundColor: '#EFF6FF', 
                                      color: '#1D4ED8',
                                      borderRadius: '2px'
                                    }}>
                                      Default: {group.default_permission}
                                    </span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedGroups(prev => {
                                      const newGroups = prev.filter(g => g.group_id !== group.group_id);
                                      setTimeout(() => {
                                        setFieldTouched("selectedItems", true);
                                        if (newGroups.length === 0 && selectedUsers.length === 0) {
                                          setFieldError("selectedItems", "Debes seleccionar al menos un usuario o grupo");
                                        } else {
                                          setFieldError("selectedItems", undefined);
                                        }
                                        validateForm();
                                      }, 0);
                                      return newGroups;
                                    });
                                    loadAvailableGroups();
                                  }}
                                  className="text-[10px] px-2 py-1 rounded-sm transition-colors"
                                  style={{ color: '#DC2626', backgroundColor: 'transparent', borderRadius: '2px' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                  aria-label={`Remover grupo ${group.name}`}
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
              </div>
                      )}


                      {/* Notificar */}
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Field type="checkbox" name="notify" id="notify-checkbox" aria-label="Notificar a los usuarios" />
                          <label htmlFor="notify-checkbox" className="text-xs" style={{ color: '#374151', cursor: 'pointer' }}>
                            Notificar a los usuarios
                          </label>
                        </div>
                        <p className="text-[10px]" style={{ color: '#9CA3AF', marginLeft: '24px' }}>
                          Se enviará una notificación por email
                        </p>
                      </div>

                      {/* Lista de usuarios y grupos compartidos */}
                      {loadingShared ? (
                        <div className="text-xs text-center py-4" style={{ color: '#6B7280' }}>Cargando datos compartidos...</div>
                      ) : (sharedUsers.length > 0 || sharedGroups.length > 0) ? (
                        <div className="mt-2 pt-2" style={{ borderTop: '1px solid #E5E7EB' }}>
                          {sharedUsers.length > 0 && (
                            <div className="mb-3">
                              <h4 className="text-[11px] font-semibold mb-2" style={{ color: '#6B7280' }}>
                                Usuarios compartidos ({sharedUsers.length})
                              </h4>
                              <div className="space-y-1">
                                {sharedUsers.map((sharedUser) => {
                                  const badge = getAccessOriginBadge(sharedUser);
                                  const effective = getEffectivePermission(sharedUser);
                                  const isOwner = sharedUser.is_owner;
                                  
                                  return (
                                    <div
                                      key={sharedUser.user_id}
                                      className="flex items-center justify-between p-2 rounded-sm transition-colors"
                                      style={{ 
                                        backgroundColor: isOwner ? '#FEF3C7' : '#F9FAFB', 
                                        border: `1px solid ${isOwner ? '#FCD34D' : '#E5E7EB'}`, 
                                        borderRadius: '2px' 
                                      }}
                                    >
                                      <div className="flex-1">
              <div className="flex items-center gap-2">
                                          {isOwner && (
                                            <span style={{ fontSize: '14px' }} title="Propietario">👑</span>
                                          )}
                                          <div className="text-xs font-medium" style={{ color: '#111827' }}>
                                            {sharedUser.name}
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                                          <span 
                                            className="text-[10px] px-1.5 py-0.5 rounded-sm cursor-help"
                                            style={{ 
                                              backgroundColor: '#EFF6FF', 
                                              color: '#1D4ED8',
                                              borderRadius: '2px'
                                            }}
                                            title={effective.reason}
                                            onMouseEnter={(e) => {
                                              const rect = e.currentTarget.getBoundingClientRect();
                                              setTooltipData({ userId: sharedUser.user_id, x: rect.left, y: rect.top - 5 });
                                            }}
                                            onMouseLeave={() => setTooltipData(null)}
                                          >
                                            {effective.permission}
                                          </span>
                                          <span 
                                            className="text-[10px] px-1.5 py-0.5 rounded-sm"
                                            style={{ 
                                              backgroundColor: badge.bgColor, 
                                              color: badge.color,
                                              borderRadius: '2px'
                                            }}
                                          >
                                            {badge.text}
                                          </span>
                                          {sharedUser.shared_at && (
                                            <span className="text-[10px]" style={{ color: '#9CA3AF' }}>
                                              {new Date(sharedUser.shared_at).toLocaleDateString()}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                      {!isOwner && (
                                        <button
                                          type="button"
                                          onClick={() => handleUnshare(sharedUser.user_id)}
                                          className="text-[10px] px-2 py-1 rounded-sm transition-colors"
                                          style={{ color: '#DC2626', backgroundColor: 'transparent', borderRadius: '2px' }}
                                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                          aria-label={`Remover acceso de ${sharedUser.name}`}
                                        >
                                          Remover
                                        </button>
                                      )}
                                      {isOwner && (
                                        <span className="text-[10px] px-2 py-1 rounded-sm" style={{ 
                                          color: '#92400E', 
                                          backgroundColor: '#FEF3C7',
                                          borderRadius: '2px'
                                        }}>
                                          (No editable)
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {sharedGroups.length > 0 && (
                            <div>
                              <h4 className="text-[11px] font-semibold mb-2" style={{ color: '#6B7280' }}>
                                Grupos compartidos ({sharedGroups.length})
                              </h4>
                              <div className="space-y-1">
                                {sharedGroups.map((sharedGroup) => (
                                  <div
                                    key={sharedGroup.group_id}
                                    className="flex items-center justify-between p-2 rounded-sm"
                                    style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '2px' }}
                                  >
                                    <div className="flex-1">
                                      <div className="text-xs font-medium" style={{ color: '#111827' }}>
                                        {sharedGroup.name}
                                      </div>
                                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                                        <span className="text-[10px]" style={{ color: '#6B7280' }}>
                                          Permiso por defecto: {sharedGroup.default_permission}
                                        </span>
                                        {sharedGroup.shared_at && (
                                          <span className="text-[10px]" style={{ color: '#9CA3AF' }}>
                                            {new Date(sharedGroup.shared_at).toLocaleDateString()}
                                          </span>
                                        )}
                                      </div>
                                      {sharedGroup.member_overrides && sharedGroup.member_overrides.length > 0 && (
                                        <div className="text-[10px] mt-1" style={{ color: '#3B82F6' }}>
                                          {sharedGroup.member_overrides.length} override(s) activo(s)
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <button
                                        type="button"
                                        onClick={() => setViewingGroupId(sharedGroup.group_id)}
                                        className="text-[10px] px-2 py-1 rounded-sm transition-colors"
                                        style={{ color: '#3B82F6', backgroundColor: 'transparent', borderRadius: '2px' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EFF6FF'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        title="Ver detalles y gestionar miembros"
                                        aria-label={`Ver detalles del grupo ${sharedGroup.name}`}
                                      >
                                        Gestionar
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setSelectedGroupForOverrides({
                                            groupId: sharedGroup.group_id,
                                            groupName: sharedGroup.name,
                                          });
                                          setOverridesModalOpen(true);
                                        }}
                                        className="text-[10px] px-2 py-1 rounded-sm transition-colors"
                                        style={{ color: '#F97316', backgroundColor: 'transparent', borderRadius: '2px' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFEDD5'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        title="Gestionar overrides de permisos"
                                        aria-label={`Gestionar overrides del grupo ${sharedGroup.name}`}
                                      >
                                        Overrides
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleUnshareGroup(sharedGroup.group_id)}
                                        className="text-[10px] px-2 py-1 rounded-sm transition-colors"
                                        style={{ color: '#DC2626', backgroundColor: 'transparent', borderRadius: '2px' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        aria-label={`Remover grupo ${sharedGroup.name}`}
                                      >
                                        Remover
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <p className="text-[10px] mt-2" style={{ color: '#9CA3AF' }}>
                                Un override tiene prioridad sobre el permiso del grupo
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="mt-2 pt-2 p-4 text-center rounded-sm" style={{ borderTop: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', borderRadius: '2px' }}>
                          <p className="text-xs" style={{ color: '#6B7280' }}>
                            Aún no se ha compartido esta entidad.
                          </p>
                          <p className="text-[10px] mt-1" style={{ color: '#9CA3AF' }}>
                            Agrega usuarios o grupos para otorgar acceso.
                          </p>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="px-4 py-2 flex items-center justify-end gap-2 flex-shrink-0 mt-3" style={{ borderTop: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
                        <button
                          className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          style={{ border: '1px solid #E5E7EB', color: '#374151', backgroundColor: '#FFFFFF', borderRadius: '2px' }}
                          onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#F3F4F6')}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                          type="button"
                          onClick={onClose}
                          disabled={isSubmitting}
                          aria-label="Cancelar"
                        >
                          Cancelar
                        </button>
                        <button
                          className="px-3 py-1.5 text-xs font-semibold rounded-sm text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                          style={{ backgroundColor: '#10B981', borderRadius: '2px' }}
                          onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#059669')}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10B981'}
                          type="submit"
                          disabled={isSubmitting || (selectedUsers.length === 0 && selectedGroups.length === 0)}
                          aria-label="Compartir entidad"
                        >
                          {isSubmitting ? "Compartiendo..." : "Compartir"}
                        </button>
                      </div>
                    </Form>
                  </div>
                </>
              );
            }}
          </Formik>
        </div>

        {/* Tooltip de permiso efectivo */}
        {tooltipData && (
          <div
            ref={tooltipRef}
            className="absolute z-50 px-2 py-1 rounded-sm shadow-lg"
            style={{
              backgroundColor: '#1F2937',
              color: '#FFFFFF',
              fontSize: '10px',
              left: `${tooltipData.x}px`,
              top: `${tooltipData.y}px`,
              transform: 'translateY(-100%)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              borderRadius: '2px'
            }}
          >
            {sharedUsers.find(u => u.user_id === tooltipData.userId)?.permission_reason || "Permiso efectivo"}
          </div>
        )}

        {/* Modal de confirmación para acciones destructivas */}
        {confirmUnshare && (
          <div 
            className="fixed inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 10001 }}
            onClick={() => setConfirmUnshare(null)}
          >
            <div
              className="w-full max-w-md rounded-sm shadow-xl flex flex-col"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #F3F4F6' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #E5E7EB' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ fontSize: '20px' }}>⚠️</span>
                  <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>Quitar acceso</h3>
              </div>
                <p className="text-xs" style={{ color: '#6B7280' }}>
                  Estás a punto de remover el acceso de:
                </p>
                <p className="text-xs font-medium mt-1" style={{ color: '#111827' }}>
                  {confirmUnshare.name}
                </p>
                {confirmUnshare.impact && (
                  <p className="text-[10px] mt-2" style={{ color: '#DC2626' }}>
                    {confirmUnshare.impact}
                  </p>
                )}
              </div>
              <div className="px-4 py-3 flex items-center justify-end gap-2 flex-shrink-0" style={{ borderTop: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
                <button
                  type="button"
                  onClick={() => setConfirmUnshare(null)}
                  className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors"
                  style={{ border: '1px solid #E5E7EB', color: '#374151', backgroundColor: '#FFFFFF', borderRadius: '2px' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                  aria-label="Cancelar"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirmUnshare.type === "user") {
                      handleUnshare(confirmUnshare.id, true);
                    } else {
                      handleUnshareGroup(confirmUnshare.id, true);
                    }
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded-sm text-white transition-colors"
                  style={{ backgroundColor: '#DC2626', borderRadius: '2px' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B91C1C'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#DC2626'}
                  aria-label="Confirmar remover acceso"
                >
                  Quitar acceso
                </button>
              </div>
            </div>
          </div>
          )}
      </div>

      {/* Modal de Overrides */}
      {overridesModalOpen && selectedGroupForOverrides && (
        <GroupOverridesModal
          isOpen={overridesModalOpen}
          onClose={() => {
            setOverridesModalOpen(false);
            setSelectedGroupForOverrides(null);
          }}
          entityId={entityId}
          entityType={entityType}
          groupId={selectedGroupForOverrides.groupId}
          groupName={selectedGroupForOverrides.groupName}
          onSuccess={() => {
            loadSharedData();
            if (onSuccess) onSuccess();
          }}
        />
      )}

      {/* Modal de Detalles del Grupo */}
      {viewingGroupId && (
        <GroupDetailsModal
          isOpen={!!viewingGroupId}
          onClose={() => setViewingGroupId(null)}
          groupId={viewingGroupId}
          onSuccess={() => {
            loadSharedData();
            loadAvailableGroups();
            if (onSuccess) onSuccess();
          }}
        />
      )}
    </>
  );
}
