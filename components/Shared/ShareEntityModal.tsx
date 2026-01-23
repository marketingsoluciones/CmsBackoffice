import React, { useState, useEffect } from "react";
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, VStack, HStack, Text, Select, IconButton, Badge, Divider } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { CRM_QUERIES, CRM_MUTATIONS } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { ToastContextProvider } from "../../context/ToastContext";

interface SharedUser {
  userId: string;
  userName: string;
  permissionLevel: "READ" | "WRITE" | "ADMIN";
  sharedAt?: string;
}

interface ShareEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN";
  entityId: string;
  entityName?: string;
  onUpdate?: () => void;
}

export default function ShareEntityModal({
  isOpen,
  onClose,
  entityType,
  entityId,
  entityName,
  onUpdate,
}: ShareEntityModalProps) {
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
      // TODO: Cargar lista de usuarios disponibles desde el backend
      // Por ahora usar lista vacía
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

  const getPermissionColor = (level: string) => {
    switch (level) {
      case "ADMIN": return "red";
      case "WRITE": return "blue";
      case "READ": return "gray";
      default: return "gray";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="lg" fontWeight="semibold">
            Compartir {entityName || entityType}
          </Text>
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {owner && (
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600">
                  Propietario
                </Text>
                <HStack>
                  <Badge colorScheme="green">{owner.userName}</Badge>
                  <Text fontSize="xs" color="gray.500">ADMIN</Text>
                </HStack>
              </Box>
            )}

            <Divider />

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600">
                Compartido con
              </Text>
              {permissions.length === 0 ? (
                <Text fontSize="sm" color="gray.500">No hay usuarios compartidos</Text>
              ) : (
                <VStack spacing={2} align="stretch">
                  {permissions.map((perm) => (
                    <HStack key={perm.userId} justify="space-between" p={2} bg="gray.50" borderRadius="md">
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" fontWeight="medium">{perm.userName}</Text>
                        <HStack spacing={2}>
                          <Badge colorScheme={getPermissionColor(perm.permissionLevel)}>
                            {perm.permissionLevel}
                          </Badge>
                          {perm.sharedAt && (
                            <Text fontSize="xs" color="gray.500">
                              {new Date(perm.sharedAt).toLocaleDateString()}
                            </Text>
                          )}
                        </HStack>
                      </VStack>
                      <HStack>
                        <Select
                          size="sm"
                          value={perm.permissionLevel}
                          onChange={(e) => handleUpdatePermission(perm.userId, e.target.value as any)}
                          disabled={isLoading}
                          width="100px"
                        >
                          <option value="READ">Lectura</option>
                          <option value="WRITE">Escritura</option>
                          <option value="ADMIN">Admin</option>
                        </Select>
                        <IconButton
                          aria-label="Eliminar"
                          icon={<CloseIcon />}
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleUnshare(perm.userId)}
                          disabled={isLoading}
                        />
                      </HStack>
                    </HStack>
                  ))}
                </VStack>
              )}
            </Box>

            <Divider />

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.600">
                Compartir con nuevo usuario
              </Text>
              <VStack spacing={2} align="stretch">
                <Select
                  placeholder="Seleccionar usuario"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  disabled={isLoading || availableUsers.length === 0}
                >
                  {availableUsers.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </Select>
                {availableUsers.length === 0 && (
                  <Text fontSize="xs" color="gray.500">
                    No hay usuarios disponibles. Esta funcionalidad requiere integración con el sistema de usuarios.
                  </Text>
                )}
                <Select
                  value={selectedPermission}
                  onChange={(e) => setSelectedPermission(e.target.value as any)}
                  disabled={isLoading}
                >
                  <option value="READ">Lectura</option>
                  <option value="WRITE">Escritura</option>
                  <option value="ADMIN">Admin</option>
                </Select>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={handleShare}
                  disabled={isLoading || !selectedUserId}
                  isLoading={isLoading}
                >
                  Compartir
                </Button>
              </VStack>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cerrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

