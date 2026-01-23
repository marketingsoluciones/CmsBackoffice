import { useQuery } from '@apollo/client';
import { CRM_QUERIES } from '../utils/crmQueries';
import { fetchApiCRM } from '../utils/CRMFetching';
import { useEffect, useState } from 'react';

interface PermissionData {
  has_permission: boolean;
  permission_level: 'READ' | 'WRITE' | 'ADMIN' | 'OWNER';
  is_owner: boolean;
}

interface UseEntityPermissionsReturn {
  canRead: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canShare: boolean;
  isOwner: boolean;
  permissionLevel: 'READ' | 'WRITE' | 'ADMIN' | 'OWNER' | null;
  loading: boolean;
  error: any;
}

/**
 * Hook para verificar permisos de una entidad CRM
 * 
 * @param entityId - ID de la entidad
 * @param entityType - Tipo de entidad (LEAD, CONTACT, ENTITY, CAMPAIGN)
 * @returns Objeto con los permisos del usuario actual sobre la entidad
 * 
 * @example
 * const { canEdit, canDelete, canShare } = useEntityPermissions(leadId, "LEAD");
 * 
 * return (
 *   <div>
 *     {canEdit && <EditButton />}
 *     {canDelete && <DeleteButton />}
 *     {canShare && <ShareButton />}
 *   </div>
 * );
 */
export function useEntityPermissions(
  entityId: string | null | undefined,
  entityType: 'LEAD' | 'CONTACT' | 'ENTITY' | 'CAMPAIGN'
): UseEntityPermissionsReturn {
  const [permissionData, setPermissionData] = useState<PermissionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!entityId) {
      setPermissionData(null);
      return;
    }

    const checkPermission = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchApiCRM({
          query: CRM_QUERIES.CHECK_CRM_ENTITY_PERMISSION,
          variables: {
            entity_id: entityId,
            entity_type: entityType.toUpperCase(),
          },
        });

        const permission = response?.checkCRMEntityPermission;
        if (permission) {
          setPermissionData({
            has_permission: permission.has_permission || false,
            permission_level: permission.permission_level || 'READ',
            is_owner: permission.is_owner || false,
          });
        } else {
          // Si no hay respuesta, asumir que el usuario es el owner (comportamiento por defecto)
          setPermissionData({
            has_permission: true,
            permission_level: 'OWNER',
            is_owner: true,
          });
        }
      } catch (err) {
        console.error('Error checking permissions:', err);
        setError(err);
        // En caso de error, asumir permisos completos (comportamiento por defecto)
        setPermissionData({
          has_permission: true,
          permission_level: 'OWNER',
          is_owner: true,
        });
      } finally {
        setLoading(false);
      }
    };

    checkPermission();
  }, [entityId, entityType]);

  const permissionLevel = permissionData?.permission_level || null;
  const isOwner = permissionData?.is_owner || false;

  return {
    canRead: permissionData?.has_permission || false,
    canEdit:
      permissionLevel === 'WRITE' ||
      permissionLevel === 'ADMIN' ||
      isOwner,
    canDelete: permissionLevel === 'ADMIN' || isOwner,
    canShare: permissionLevel === 'ADMIN' || isOwner,
    isOwner,
    permissionLevel,
    loading,
    error,
  };
}

