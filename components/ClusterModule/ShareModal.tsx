import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { ToastContextProvider } from "../../context/ToastContext";
import { CRM_MUTATIONS, CRM_QUERIES } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";
import UserAutocomplete from "../Shared/UserAutocomplete";
import GroupOverridesModal from "../Shared/GroupOverridesModal";

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
}

interface Group {
  group_id: string;
  name: string;
  description?: string;
  default_permission: string;
  member_count?: number;
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
  const [availableGroups, setAvailableGroups] = useState<Group[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [sharedUsers, setSharedUsers] = useState<Array<{ user_id: string; name: string; permission: string; shared_at?: string }>>([]);
  const [sharedGroups, setSharedGroups] = useState<Array<{ 
    group_id: string; 
    name: string; 
    description?: string;
    default_permission: string; 
    shared_at?: string;
    member_overrides?: Array<{ user_id: string; name: string; permission: string }>;
  }>>([]);
  const [loadingShared, setLoadingShared] = useState(false);
  const [overridesModalOpen, setOverridesModalOpen] = useState(false);
  const [selectedGroupForOverrides, setSelectedGroupForOverrides] = useState<{ groupId: string; groupName: string } | null>(null);

  const pushToast = (type: string, message: string) => {
    dispatch({ type: "ADD_TOAST", payload: { id: `${Date.now()}-${Math.random()}`, type, message } } as any);
  };

  useEffect(() => {
    if (isOpen && entityId) {
      loadSharedData();
      loadAvailableGroups();
      setSelectedUsers([]);
      setSelectedGroups([]);
      setSearchValue("");
      setShowCreateGroupForm(false);
      setNewGroupName("");
      setNewGroupDescription("");
    }
  }, [isOpen, entityId]);

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
        // Filtrar grupos que ya están seleccionados
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
        // Si la query no está disponible aún, intentamos desde permissions
        try {
          const permissionsResponse = await fetchApiCRM({
            query: CRM_QUERIES.GET_CRM_ENTITY_PERMISSIONS,
            variables: {
              entityType: entityType.toUpperCase(),
              entityId: entityId,
            },
          });
          // Si el backend devuelve grupos en permissions, los procesamos aquí
          setSharedGroups([]);
        } catch (permError) {
          // Si ninguna query está disponible, dejamos vacío
          setSharedGroups([]);
        }
      }
    } catch (error: any) {
      console.error("Error loading shared data:", error);
    } finally {
      setLoadingShared(false);
    }
  };

  const handleCreateGroupFromUsers = async (permission: string) => {
    if (!newGroupName.trim()) {
      pushToast("error", "El nombre del grupo es requerido");
      return;
    }

    if (selectedUsers.length < 2) {
      pushToast("error", "Se necesitan al menos 2 usuarios para crear un grupo");
      return;
    }

    setCreatingGroup(true);
    try {
      // Crear el grupo con los usuarios seleccionados
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.CREATE_CRM_GROUP,
        variables: {
          input: {
            name: newGroupName.trim(),
            description: newGroupDescription.trim() || undefined,
            default_permission: permission,
            members: selectedUsers.map((user) => ({
              user_id: user.user_id,
              name: user.name,
              email: user.email,
              permission: permission, // Todos con el mismo permiso inicial
            })),
          },
        },
      });

      if (response?.createCRMGroup?.success && response?.createCRMGroup?.group) {
        const newGroup = response.createCRMGroup.group;
        pushToast("success", `Grupo "${newGroup.name}" creado correctamente`);
        
        // Agregar el grupo a la lista de grupos seleccionados
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

        // Limpiar usuarios seleccionados y el formulario
        setSelectedUsers([]);
        setShowCreateGroupForm(false);
        setNewGroupName("");
        setNewGroupDescription("");
        
        // Recargar grupos disponibles
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
      pushToast("success", `Grupo "${group.name}" agregado`);
    } else {
      pushToast("warning", "Este grupo ya está seleccionado");
    }
  };

  const handleUnshare = async (userId: string) => {
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
      } else {
        const errorMsg = response?.unshareCRMEntity?.errors?.[0]?.message || "Error al remover usuario";
        pushToast("error", errorMsg);
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al remover usuario");
    }
  };

  const handleUnshareGroup = async (groupId: string) => {
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
      } else {
        const errorMsg = response?.unshareCRMEntityFromGroup?.errors?.[0]?.message || "Error al remover grupo";
        pushToast("error", errorMsg);
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al remover grupo");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 10000 }} onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[90vh] shadow-2xl flex flex-col" style={{ backgroundColor: '#FFFFFF', borderRadius: '2px', position: 'relative', overflow: 'visible' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-2.5 flex-shrink-0" style={{ borderBottom: '1px solid #E5E7EB' }}>
          <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>Compartir {entityLabel}</h3>
          <button 
            className="transition-colors p-1 rounded-sm" 
            style={{ color: '#6B7280', borderRadius: '2px' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#374151'; e.currentTarget.style.backgroundColor = '#F3F4F6'; }} 
            onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.backgroundColor = 'transparent'; }} 
            onClick={onClose}
            title="Cerrar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <Formik
          initialValues={{ 
            permission: "READ" as "READ" | "WRITE" | "ADMIN",
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
            // Validar antes de enviar
            const validationErrors = await validateForm();
            if (validationErrors.selectedItems) {
              setSubmitting(false);
              return;
            }
            
            // Validación adicional por si acaso
            if (selectedUsers.length === 0 && selectedGroups.length === 0) {
              pushToast("error", "Debes seleccionar al menos un usuario o grupo");
              setSubmitting(false);
              return;
            }

            try {
              const promises: Promise<any>[] = [];

              // Compartir con usuarios individuales
              if (selectedUsers.length > 0) {
                const shareWithUsers = selectedUsers.map(user => ({
                  user_id: user.user_id,
                  name: user.name,
                  permission: vals.permission,
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

              // Compartir con grupos
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
                          default_permission: vals.permission,
                          member_overrides: [],
                        },
                      },
                    })
                  );
                });
              }

              const responses = await Promise.all(promises);
              const allSuccess = responses.every(r => {
                if (r?.shareCRMEntity) return r.shareCRMEntity.success;
                if (r?.shareCRMEntityWithGroup) return r.shareCRMEntityWithGroup.success;
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
                  if (r?.shareCRMEntity && !r.shareCRMEntity.success) return true;
                  if (r?.shareCRMEntityWithGroup && !r.shareCRMEntityWithGroup.success) return true;
                  return false;
                });
                const errorMsg = firstError?.shareCRMEntity?.errors?.[0]?.message || 
                                firstError?.shareCRMEntityWithGroup?.errors?.[0]?.message || 
                                "Error al compartir";
                pushToast("error", errorMsg);
              }
            } catch (e: any) {
              pushToast("error", e?.message || "Error al compartir");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched, values, setFieldError, setFieldTouched, validateForm }) => {
            // Forzar validación cuando cambien los usuarios/grupos seleccionados
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
                          if (!selectedUsers.some(u => u.user_id === user.user_id)) {
                            setSelectedUsers(prev => {
                              const newUsers = [...prev, user];
                              // Limpiar error después de agregar usuario
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
                            >
                              + Crear grupo con estos usuarios
                            </button>
                          )}
                        </div>
                        <div className="space-y-1">
                          {selectedUsers.map((user) => (
                            <div
                              key={user.user_id}
                              className="flex items-center justify-between p-2 rounded-sm"
                              style={{ backgroundColor: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '2px' }}
                            >
                              <div>
                                <div className="text-xs font-medium" style={{ color: '#111827' }}>
                                  {user.name}
                                </div>
                                {user.email && (
                                  <div className="text-[10px]" style={{ color: '#6B7280' }}>
                                    {user.email}
                                  </div>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedUsers(prev => {
                                    const newUsers = prev.filter(u => u.user_id !== user.user_id);
                                    // Actualizar validación después de remover
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
                                  // Si solo queda 1 usuario, ocultar formulario de grupo
                                  if (selectedUsers.length === 2) {
                                    setShowCreateGroupForm(false);
                                  }
                                }}
                                className="text-[10px] px-2 py-1 rounded-sm transition-colors"
                                style={{ color: '#DC2626', backgroundColor: 'transparent', borderRadius: '2px' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Formulario para crear grupo con usuarios seleccionados */}
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
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCreateGroupFromUsers(values.permission)}
                            disabled={creatingGroup || !newGroupName.trim()}
                            className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{ 
                              backgroundColor: '#3B82F6', 
                              color: '#FFFFFF',
                              borderRadius: '2px'
                            }}
                            onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#2563EB')}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3B82F6'}
                          >
                            {creatingGroup ? "Creando..." : "Crear grupo y agregar"}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Separador: Grupos disponibles */}
                    {(selectedUsers.length > 0 || selectedGroups.length > 0 || availableGroups.length > 0) && (
                      <div className="my-2" style={{ borderTop: '1px solid #E5E7EB' }}></div>
                    )}

                    {/* Lista de grupos disponibles */}
                    {availableGroups.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-medium" style={{ color: '#6B7280' }}>
                          Grupos disponibles ({availableGroups.length})
                        </label>
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                          {availableGroups.map((group) => (
                            <div
                              key={group.group_id}
                              className="flex items-center justify-between p-2 rounded-sm cursor-pointer transition-colors"
                              style={{ 
                                backgroundColor: selectedGroups.some(g => g.group_id === group.group_id) ? '#EFF6FF' : '#F9FAFB',
                                border: `1px solid ${selectedGroups.some(g => g.group_id === group.group_id) ? '#3B82F6' : '#E5E7EB'}`,
                                borderRadius: '2px'
                              }}
                              onClick={() => handleSelectGroup(group)}
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
                              {selectedGroups.some(g => g.group_id === group.group_id) && (
                                <div className="text-[10px] px-2 py-0.5 rounded-sm" style={{ 
                                  backgroundColor: '#3B82F6', 
                                  color: '#FFFFFF',
                                  borderRadius: '2px'
                                }}>
                                  ✓ Seleccionado
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
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
                                    // Actualizar validación después de remover
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
                                  // Recargar grupos disponibles
                                  loadAvailableGroups();
                                }}
                                className="text-[10px] px-2 py-1 rounded-sm transition-colors"
                                style={{ color: '#DC2626', backgroundColor: 'transparent', borderRadius: '2px' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
              </div>
                    )}

                    {/* Permisos */}
              <div className="flex items-center gap-2">
                      <label className="text-[11px] font-medium" style={{ color: '#6B7280', minWidth: '80px' }}>Permisos</label>
                <Field
                  as="select"
                        name="permission"
                        className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all flex-1"
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
                      >
                        <option value="READ">READ - Solo lectura</option>
                        <option value="WRITE">WRITE - Lectura y edición</option>
                        <option value="ADMIN">ADMIN - Lectura, edición y eliminación</option>
                </Field>
              </div>

                    {/* Notificar */}
              <div className="flex items-center gap-2">
                      <Field type="checkbox" name="notify" />
                      <span className="text-xs" style={{ color: '#374151' }}>
                        Notificar a los usuarios
                      </span>
                    </div>

                    {/* Lista de usuarios y grupos compartidos */}
                    {loadingShared ? (
                      <div className="text-xs" style={{ color: '#6B7280' }}>Cargando datos compartidos...</div>
                    ) : (sharedUsers.length > 0 || sharedGroups.length > 0) ? (
                      <div className="mt-2 pt-2" style={{ borderTop: '1px solid #E5E7EB' }}>
                        {sharedUsers.length > 0 && (
                          <div className="mb-3">
                            <h4 className="text-[11px] font-semibold mb-2" style={{ color: '#6B7280' }}>
                              Usuarios compartidos ({sharedUsers.length})
                            </h4>
                            <div className="space-y-1">
                              {sharedUsers.map((sharedUser) => (
                                <div
                                  key={sharedUser.user_id}
                                  className="flex items-center justify-between p-2 rounded-sm"
                                  style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '2px' }}
                                >
                                  <div>
                                    <div className="text-xs font-medium" style={{ color: '#111827' }}>
                                      {sharedUser.name}
                                    </div>
                                    <div className="text-[10px]" style={{ color: '#6B7280' }}>
                                      {sharedUser.permission}
                                      {sharedUser.shared_at && ` • ${new Date(sharedUser.shared_at).toLocaleDateString()}`}
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleUnshare(sharedUser.user_id)}
                                    className="text-[10px] px-2 py-1 rounded-sm transition-colors"
                                    style={{ color: '#DC2626', backgroundColor: 'transparent', borderRadius: '2px' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                  >
                                    Remover
                                  </button>
                                </div>
                              ))}
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
                                    <div className="text-[10px]" style={{ color: '#6B7280' }}>
                                      Permiso por defecto: {sharedGroup.default_permission}
                                      {sharedGroup.shared_at && ` • ${new Date(sharedGroup.shared_at).toLocaleDateString()}`}
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
                                      onClick={() => {
                                        setSelectedGroupForOverrides({
                                          groupId: sharedGroup.group_id,
                                          groupName: sharedGroup.name,
                                        });
                                        setOverridesModalOpen(true);
                                      }}
                                      className="text-[10px] px-2 py-1 rounded-sm transition-colors"
                                      style={{ color: '#3B82F6', backgroundColor: 'transparent', borderRadius: '2px' }}
                                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EFF6FF'}
                                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                      title="Gestionar overrides"
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
                                    >
                                      Remover
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
              </div>
                    ) : null}
                  </Form>
              </div>

                {/* Footer */}
                <div className="px-4 py-2 flex items-center justify-end gap-2 flex-shrink-0" style={{ borderTop: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
                <button
                    className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ border: '1px solid #E5E7EB', color: '#374151', backgroundColor: '#FFFFFF', borderRadius: '2px' }}
                    onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#F3F4F6')}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
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
                >
                  {isSubmitting ? "Compartiendo..." : "Compartir"}
                </button>
              </div>
              </>
            );
          }}
        </Formik>
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
    </div>
  );
}
