// Queries y Mutations alineadas con issues backend adjuntos
// Notas clave:
// - Contact: no enviar/consultar avatar; no enviar notes en input create
// - Entity: no consultar email/phone/status; address es objeto (omitir hasta schema oficial)
// - Campaign: input requiere settings: {}; no enviar status/templateType en input

export const CRM_QUERIES = {
  // Lists - Versión compatible con el backend actual
  GET_LEADS: `
    query GetLeads($pagination: CRM_PaginationInput!, $filters: CRM_LeadFilters) {
      getCRMLeads(pagination: $pagination, filters: $filters) {
        success
        leads {
          id
          name
          email
          phone
          company
          position
          source
          status
          priority
          value
          notes
          createdAt
          updatedAt
        }
        total
        pagination {
          page
          limit
          totalPages
        }
        errors { field message code }
      }
    }
  `,
  // GET_CONTACTS: Versión compatible con el backend actual
  GET_CONTACTS: `
    query GetContacts($pagination: CRM_PaginationInput!) {
      getCRMContacts(pagination: $pagination) {
        contacts {
          id
          firstName
          lastName
          fullName
          email
          phone
          company
          position
          relationship
          status
          type
          starred
          sentiment
          country
          city
          emailStatus
          whatsappStatus
          createdAt
        }
        total
        pagination {
          page
          limit
          totalPages
        }
      }
    }
  `,
  // GET_ENTITIES: Versión compatible con el backend actual
  GET_ENTITIES: `
    query GetEntities($pagination: CRM_PaginationInput!) {
      getCRMEntities(pagination: $pagination) {
        entities {
          id
          name
          type
          website
          industry
          size
          description
          sentiment
          tags
          createdAt
          updatedAt
        }
        total
        pagination {
          page
          limit
          totalPages
        }
      }
    }
  `,
  // GET_CAMPAIGNS: Versión compatible con el backend actual
  GET_CAMPAIGNS: `
    query GetCampaigns($pagination: CRM_PaginationInput!) {
      getCRMCampaigns(pagination: $pagination) {
        campaigns {
          id
          name
          type
          templateId
          status
          scheduledAt
          notes
          tags
          createdAt
          updatedAt
        }
        total
        pagination {
          page
          limit
          totalPages
        }
      }
    }
  `,
  // GET_WHITELABELS: La query getWhitelabels no acepta pagination según el error
  GET_WHITELABELS: `
    query GetWhitelabels {
      getWhitelabels {
        whitelabels {
          id
          name
          slug
          domain
          isActive
        }
      }
    }
  `,

  // ========== FASE 1.1: SISTEMA DE ETIQUETAS (LABELS) ==========
  GET_CRM_LABELS: `
    query GetCRMLabels($entityType: CRM_LabelEntityType, $search: String) {
      getCRMLabels(entityType: $entityType, search: $search) {
        success
        labels {
          id
          name
          color
          entityType
          description
          usageCount
          createdAt
        }
        total
        errors { field message code }
      }
    }
  `,
  GET_CRM_LABEL_BY_ID: `
    query GetCRMLabelById($id: ID!) {
      getCRMLabelById(id: $id) {
        success
        label {
          id
          name
          color
          entityType
          description
          usageCount
          created_by {
            user_id
            name
          }
          createdAt
          updatedAt
        }
        errors { field message code }
      }
    }
  `,
  GET_CRM_ENTITY_LABELS: `
    query GetEntityLabels($entityId: ID!, $entityType: CRM_LabelEntityType!) {
      getCRMEntityLabels(entityId: $entityId, entityType: $entityType) {
        success
        labels {
          id
          name
          color
          entityType
          usageCount
        }
        total
        errors { field message code }
      }
    }
  `,
  GET_MOST_USED_CRM_LABELS: `
    query GetMostUsedLabels($entityType: CRM_LabelEntityType!, $limit: Int) {
      getMostUsedCRMLabels(entityType: $entityType, limit: $limit) {
        success
        labels {
          id
          name
          color
          usageCount
        }
        total
        errors { field message code }
      }
    }
  `,
  SEARCH_CRM_LABELS: `
    query SearchCRMLabels($query: String!, $entityType: CRM_LabelEntityType!) {
      searchCRMLabels(query: $query, entityType: $entityType) {
        success
        labels {
          id
          name
          color
          entityType
        }
        total
        errors { field message code }
      }
    }
  `,

  // ========== FASE 1.3: SISTEMA DE COMPARTIR (SHARING) ==========
  CHECK_CRM_ENTITY_PERMISSION: `
    query CheckPermission($entity_id: ID!, $entity_type: String!) {
      checkCRMEntityPermission(entity_id: $entity_id, entity_type: $entity_type) {
        has_permission
        permission_level
        is_owner
      }
    }
  `,
  GET_CRM_ENTITY_SHARED_USERS: `
    query GetSharedUsers($entity_id: ID!, $entity_type: String!) {
      getCRMEntitySharedUsers(entity_id: $entity_id, entity_type: $entity_type) {
        user_id
        name
        permission
        shared_at
      }
    }
  `,
  GET_CRM_ENTITY_SHARED_GROUPS: `
    query GetSharedGroups($entity_id: ID!, $entity_type: String!) {
      getCRMEntitySharedGroups(entity_id: $entity_id, entity_type: $entity_type) {
        group_id
        name
        description
        default_permission
        shared_at
        member_overrides {
          user_id
          name
          permission
        }
      }
    }
  `,
  SEARCH_CRM_USERS: `
    query SearchCRMUsers($search: String, $limit: Int) {
      searchCRMUsers(search: $search, limit: $limit) {
        users {
          user_id
          name
          email
        }
        total
        errors { field message code }
      }
    }
  `,
  SEARCH_CRM_GROUPS: `
    query SearchCRMGroups($search: String, $limit: Int) {
      searchCRMGroups(search: $search, limit: $limit) {
        groups {
          group_id
          name
          description
          default_permission
          member_count
          created_by {
            user_id
            name
          }
        }
        total
        errors { field message code }
      }
    }
  `,
  GET_CRM_GROUP: `
    query GetCRMGroup($group_id: ID!) {
      getCRMGroup(group_id: $group_id) {
        success
        group {
          group_id
          name
          description
          default_permission
          members {
            user_id
            name
            email
            permission
          }
          member_count
          created_by {
            user_id
            name
          }
          created_at
          updated_at
        }
        errors { field message code }
      }
    }
  `,
  GET_CRM_GROUP_MEMBERS: `
    query GetCRMGroupMembers($group_id: ID!) {
      getCRMGroupMembers(group_id: $group_id) {
        success
        members {
          user_id
          name
          email
          permission
          added_by {
            user_id
            name
          }
          added_at
        }
        errors { field message code }
      }
    }
  `,
  GET_CRM_ENTITY_PERMISSIONS: `
    query GetCRMEntityPermissions($entityType: CRM_EntityType!, $entityId: ID!) {
      getCRMEntityPermissions(entityType: $entityType, entityId: $entityId) {
        success
        permissions {
          userId
          userName
          permissionLevel
          sharedAt
        }
        owner {
          userId
          userName
        }
        errors { field message code }
      }
    }
  `,
  GET_CRM_SHARED_WITH_ME: `
    query GetCRMSharedWithMe($entityType: CRM_EntityType!, $pagination: PaginationInput) {
      getCRMSharedWithMe(entityType: $entityType, pagination: $pagination) {
        success
        entities {
          id
          name
          sharedBy {
            userId
            userName
          }
          permissionLevel
          sharedAt
        }
        total
        pagination {
          page
          limit
          totalPages
        }
        errors { field message code }
      }
    }
  `,
  GET_CRM_MY_SHARED: `
    query GetCRMMyShared($entityType: CRM_EntityType!, $pagination: PaginationInput) {
      getCRMMyShared(entityType: $entityType, pagination: $pagination) {
        success
        entities {
          id
          name
          sharedWith {
            userId
            userName
            permissionLevel
            sharedAt
          }
        }
        total
        pagination {
          page
          limit
          totalPages
        }
        errors { field message code }
      }
    }
  `,

  // ========== FASE 2.1: FILTROS PERSONALIZADOS (SAVED FILTERS) ==========
  GET_MY_SAVED_FILTERS: `
    query GetCRMSavedFilters($entityType: CRM_LabelEntityType!) {
      getCRMSavedFilters(entityType: $entityType) {
        success
        filters {
          id
          name
          entityType
          conditions {
            entity
            field
            operator
            value
            group
          }
          visibility
          isFavorite
          saveColumns
          columns {
            field
            visible
            order
            width
            pinned
          }
          usageCount
          createdAt
          updatedAt
        }
        errors { field message code }
      }
    }
  `,
  GET_SAVED_FILTER_BY_ID: `
    query GetCRMSavedFilter($id: ID!) {
      getCRMSavedFilter(id: $id) {
        success
        filter {
          id
          name
          entityType
          conditions {
            entity
            field
            operator
            value
            group
          }
          visibility
          isFavorite
          saveColumns
          columns {
            field
            visible
            order
            width
            pinned
          }
          usageCount
          createdAt
          updatedAt
        }
        errors { field message code }
      }
    }
  `,
  GET_SHARED_SAVED_FILTERS: `
    query GetSharedCRMSavedFilters($entityType: CRM_LabelEntityType!) {
      getSharedCRMSavedFilters(entityType: $entityType) {
        success
        filters {
          id
          name
          entityType
          conditions {
            entity
            field
            operator
            value
            group
          }
          visibility
          isFavorite
          usageCount
          createdAt
        }
        errors { field message code }
      }
    }
  `,

  // ========== FASE 2.3: GESTIÓN DE ARCHIVOS CRM ==========
  GET_CRM_ENTITY_FILES: `
    query GetCRMEntityFiles($entityId: ID!, $entityType: CRM_FileEntityType!, $category: CRM_FileCategory) {
      getCRMEntityFiles(entityId: $entityId, entityType: $entityType, category: $category) {
        success
        files {
          id
          filename
          originalFilename
          fileType
          mimeType
          fileSize
          relatedTo {
            entityType
            entityId
          }
          uploadedBy
          uploadedAt
          category
          visibility
          storagePaths {
            original
            optimized800w
            optimized400w
            thumbnail
          }
          publicUrls {
            original
            optimized800w
            optimized400w
            thumbnail
          }
          metadata {
            description
            tags
            taken_at
            location
          }
          downloadCount
          lastDownloaded
        }
        total
        errors { field message code }
      }
    }
  `,
  GET_CRM_FILE_BY_ID: `
    query GetCRMFileById($id: ID!) {
      getCRMFileById(id: $id) {
        success
        file {
          id
          filename
          originalFilename
          fileType
          mimeType
          fileSize
          relatedTo {
            entityType
            entityId
          }
          uploadedBy
          uploadedAt
          category
          visibility
          publicUrls {
            original
            thumbnail
          }
          metadata {
            description
            tags
          }
          downloadCount
        }
        errors { field message code }
      }
    }
  `,
  GET_CRM_FILE_DOWNLOAD_URL: `
    query GetCRMFileDownloadUrl($fileId: ID!, $expiresIn: Int) {
      getCRMFileDownloadUrl(fileId: $fileId, expiresIn: $expiresIn) {
        success
        downloadUrl
        expiresAt
        errors { field message code }
      }
    }
  `,
  GET_MY_CRM_FILES: `
    query GetMyCRMFiles($entityType: CRM_FileEntityType, $category: CRM_FileCategory, $limit: Int) {
      getMyCRMFiles(entityType: $entityType, category: $category, limit: $limit) {
        success
        files {
          id
          filename
          fileSize
          category
          uploadedAt
          publicUrls {
            thumbnail
            original
          }
        }
        total
        errors { field message code }
      }
    }
  `,

  // ========== FASE 2.4: TAB DE EMAIL EN MODAL ==========
  GET_CRM_ENTITY_EMAILS: `
    query GetCRMEntityEmails($entityId: ID!, $entityType: CRM_EmailEntityType!, $filters: CRM_EmailFiltersInput, $pagination: CRM_PaginationInput) {
      getCRMEntityEmails(entityId: $entityId, entityType: $entityType, filters: $filters, pagination: $pagination) {
        success
        emails {
          id
          relatedTo {
            entityType
            entityId
          }
          from
          to
          cc
          bcc
          subject
          body
          bodyHtml
          attachments {
            filename
            url
            size
            mimeType
          }
          status
          direction
          sentAt
          receivedAt
          failedAt
          failureReason
          threadId
          inReplyTo
          references
          metadata {
            messageId
            provider
            externalId
          }
          tracking {
            opened
            openedAt
            openCount
            clicked
            clickedAt
            clickCount
            bounced
            bouncedReason
          }
          scheduledFor
          createdBy {
            userId
            name
          }
          createdAt
          updatedAt
        }
        total
        pagination {
          page
          limit
          totalPages
        }
        errors { field message code }
      }
    }
  `,
  GET_CRM_EMAIL_BY_ID: `
    query GetCRMEmailById($id: ID!) {
      getCRMEmailById(id: $id) {
        success
        email {
          id
          subject
          from
          to
          cc
          bcc
          body
          bodyHtml
          attachments {
            filename
            url
            size
            mimeType
          }
          status
          direction
          sentAt
          receivedAt
          threadId
          tracking {
            opened
            openCount
            clicked
            clickCount
            bounced
          }
          createdAt
        }
        errors { field message code }
      }
    }
  `,
  GET_CRM_EMAIL_THREADS: `
    query GetCRMEmailThreads($entityId: ID!, $entityType: CRM_EmailEntityType!, $pagination: CRM_PaginationInput) {
      getCRMEmailThreads(entityId: $entityId, entityType: $entityType, pagination: $pagination) {
        success
        threads {
          threadId
          subject
          participants
          emailCount
          lastEmailAt
          emails {
            id
            subject
            from
            to
            body
            sentAt
            direction
            status
          }
        }
        total
        errors { field message code }
      }
    }
  `,
  GET_MY_CRM_EMAILS: `
    query GetMyCRMEmails($filters: CRM_EmailFiltersInput, $pagination: CRM_PaginationInput) {
      getMyCRMEmails(filters: $filters, pagination: $pagination) {
        success
        emails {
          id
          subject
          from
          to
          status
          direction
          sentAt
          tracking {
            opened
            clicked
          }
        }
        total
        errors { field message code }
      }
    }
  `,
  GET_CRM_EMAIL_STATS: `
    query GetCRMEmailStats($entityId: ID, $entityType: CRM_EmailEntityType, $dateFrom: DateTime, $dateTo: DateTime) {
      getCRMEmailStats(entityId: $entityId, entityType: $entityType, dateFrom: $dateFrom, dateTo: $dateTo) {
        success
        stats {
          totalSent
          totalReceived
          totalDrafts
          totalFailed
          totalScheduled
          openRate
          clickRate
          bounceRate
        }
        errors { field message code }
      }
    }
  `,
  GET_CRM_EMAIL_DRAFTS: `
    query GetCRMEmailDrafts($entityId: ID, $entityType: CRM_EmailEntityType, $pagination: CRM_PaginationInput) {
      getCRMEmailDrafts(entityId: $entityId, entityType: $entityType, pagination: $pagination) {
        success
        emails {
          id
          subject
          to
          status
          createdAt
          updatedAt
        }
        total
        errors { field message code }
      }
    }
  `,
  GET_CRM_SCHEDULED_EMAILS: `
    query GetCRMScheduledEmails($entityId: ID, $entityType: CRM_EmailEntityType, $pagination: CRM_PaginationInput) {
      getCRMScheduledEmails(entityId: $entityId, entityType: $entityType, pagination: $pagination) {
        success
        emails {
          id
          subject
          to
          scheduledFor
          status
          createdAt
        }
        total
        errors { field message code }
      }
    }
  `,
};

export const CRM_MUTATIONS = {
  // Leads
  CREATE_LEAD: `
    mutation CreateLead($input: CRM_LeadInput!) {
      createCRMLead(input: $input) {
        success
        errors {
          field
          message
          code
        }
        lead { id name email phone company position source status priority value notes createdAt updatedAt }
      }
    }
  `,
  UPDATE_LEAD: `
    mutation UpdateLead($id: ID!, $input: CRM_LeadUpdateInput!) {
      updateCRMLead(id: $id, input: $input) {
        success
        lead { id name email phone company position source status priority value notes updatedAt }
        errors { field message code }
      }
    }
  `,
  DELETE_LEAD: `
    mutation DeleteLead($id: ID!) {
      deleteCRMLead(id: $id) {
        success
      }
    }
  `,
  // Contacts (sin notes en create por issue)
  CREATE_CONTACT: `
    mutation CreateContact($input: CRM_ContactInput!) {
      createCRMContact(input: $input) {
        success
        errors {
          field
          message
          code
        }
        contact { id firstName lastName fullName email phone company position relationship status type starred sentiment country city createdAt }
      }
    }
  `,
  UPDATE_CONTACT: `
    mutation UpdateContact($id: ID!, $input: CRM_ContactUpdateInput!) {
      updateCRMContact(id: $id, input: $input) {
        success
        contact { id firstName lastName fullName email phone company position relationship status type starred sentiment country city updatedAt }
        errors { field message code }
      }
    }
  `,
  DELETE_CONTACT: `
    mutation DeleteContact($id: ID!) {
      deleteCRMContact(id: $id) {
        success
      }
    }
  `,
  // Entities (no email/phone/status en selection set; address omitida)
  CREATE_ENTITY: `
    mutation CreateEntity($input: CRM_EntityInput!) {
      createCRMEntity(input: $input) {
        success
        errors {
          field
          message
          code
        }
        entity { id name type website industry size description sentiment tags createdAt updatedAt }
      }
    }
  `,
  UPDATE_ENTITY: `
    mutation UpdateEntity($id: ID!, $input: CRM_EntityUpdateInput!) {
      updateCRMEntity(id: $id, input: $input) {
        success
        entity { id name type website industry size description sentiment tags updatedAt }
        errors { field message code }
      }
    }
  `,
  DELETE_ENTITY: `
    mutation DeleteEntity($id: ID!) {
      deleteCRMEntity(id: $id) {
        success
      }
    }
  `,
  // Campaigns (input requiere settings: {}; no status/templateType en input)
  CREATE_CAMPAIGN: `
    mutation CreateCampaign($input: CRM_CampaignInput!) {
      createCRMCampaign(input: $input) {
        success
        errors {
          field
          message
          code
        }
        campaign { id name type templateId status scheduledAt notes tags createdAt updatedAt }
      }
    }
  `,
  UPDATE_CAMPAIGN: `
    mutation UpdateCampaign($id: ID!, $input: CRM_CampaignUpdateInput!) {
      updateCRMCampaign(id: $id, input: $input) {
        success
        campaign { id name type templateId status scheduledAt notes tags updatedAt }
        errors { field message code }
      }
    }
  `,
  DELETE_CAMPAIGN: `
    mutation DeleteCampaign($id: ID!) {
      deleteCRMCampaign(id: $id) {
        success
        errors { message code }
      }
    }
  `,
  CREATE_WHITELABEL: `
    mutation CreateWhitelabel($input: WhitelabelInput!) {
      createWhitelabel(input: $input) {
        success
        whitelabel { id name slug domain isActive createdAt }
        errors { message code }
      }
    }
  `,
  // ========== FASE 1.1: SISTEMA DE ETIQUETAS (LABELS) - MUTATIONS ==========
  CREATE_CRM_LABEL: `
    mutation CreateCRMLabel($input: CRM_CreateLabelInput!) {
      createCRMLabel(input: $input) {
        success
        label {
          id
          name
          color
          entityType
          description
          usageCount
          createdAt
          updatedAt
        }
        errors { field message code }
      }
    }
  `,
  UPDATE_CRM_LABEL: `
    mutation UpdateCRMLabel($id: ID!, $input: CRM_UpdateLabelInput!) {
      updateCRMLabel(id: $id, input: $input) {
        success
        label {
          id
          name
          color
          description
        }
        errors { field message code }
      }
    }
  `,
  DELETE_CRM_LABEL: `
    mutation DeleteCRMLabel($id: ID!) {
      deleteCRMLabel(id: $id) {
        success
        label {
          id
          name
          color
          description
          entityType
          usageCount
          createdAt
          updatedAt
        }
        errors { field message code }
      }
    }
  `,
  ASSIGN_CRM_LABEL: `
    mutation AssignLabelToEntity($labelId: ID!, $entityId: ID!, $entityType: CRM_LabelEntityType!) {
      assignCRMLabelToEntity(labelId: $labelId, entityId: $entityId, entityType: $entityType) {
        success
        label {
          id
          name
          usageCount
        }
        errors { field message code }
      }
    }
  `,
  UNASSIGN_CRM_LABEL: `
    mutation RemoveLabelFromEntity($labelId: ID!, $entityId: ID!, $entityType: CRM_LabelEntityType!) {
      removeCRMLabelFromEntity(labelId: $labelId, entityId: $entityId, entityType: $entityType) {
        success
        errors { field message code }
      }
    }
  `,

  // ========== FASE 1.3: SISTEMA DE COMPARTIR (SHARING) - MUTATIONS ==========
  SHARE_CRM_ENTITY: `
    mutation ShareEntity($input: CRM_ShareEntityInput!) {
      shareCRMEntity(input: $input) {
        success
        message
        errors { field message code }
      }
    }
  `,
  // Mutaciones específicas de compartir (wrappers de SHARE_CRM_ENTITY)
  // Nota: Estas mutaciones requieren que el código que las usa construya el input completo
  // con entityType, entityId y shareWith (array de objetos con userId, userName, permissionLevel)
  SHARE_ENTITY: `
    mutation ShareEntity($entityId: ID!, $input: CRM_ShareEntityInput!) {
      shareCRMEntity(input: $input) {
        success
        message
        sharedWith {
          userId
          userName
          permissionLevel
          sharedAt
        }
        errors { field message code }
      }
    }
  `,
  SHARE_CONTACT: `
    mutation ShareContact($contactId: ID!, $input: CRM_ShareEntityInput!) {
      shareCRMEntity(input: $input) {
        success
        message
        sharedWith {
          userId
          userName
          permissionLevel
          sharedAt
        }
        errors { field message code }
      }
    }
  `,
  SHARE_CAMPAIGN: `
    mutation ShareCampaign($campaignId: ID!, $input: CRM_ShareEntityInput!) {
      shareCRMEntity(input: $input) {
        success
        message
        sharedWith {
          userId
          userName
          permissionLevel
          sharedAt
        }
        errors { field message code }
      }
    }
  `,
  UNSHARE_CRM_ENTITY: `
    mutation UnshareEntity($entity_id: ID!, $entity_type: String!, $user_id: ID!) {
      unshareCRMEntity(entity_id: $entity_id, entity_type: $entity_type, user_id: $user_id) {
        success
      }
    }
  `,
  UPDATE_CRM_ENTITY_PERMISSION: `
    mutation UpdatePermission($input: CRM_UpdatePermissionInput!) {
      updateCRMEntityPermission(input: $input) {
        success
      }
    }
  `,
  UPDATE_CRM_ENTITY_PERMISSIONS: `
    mutation UpdateCRMEntityPermissions($entityType: CRM_EntityType!, $entityId: ID!, $userId: ID!, $permissionLevel: CRM_PermissionLevel!) {
      updateCRMEntityPermissions(entityType: $entityType, entityId: $entityId, userId: $userId, permissionLevel: $permissionLevel) {
        success
        message
        errors { field message code }
      }
    }
  `,
  TRANSFER_CRM_OWNERSHIP: `
    mutation TransferOwnership($entity_id: ID!, $entity_type: String!, $new_owner_id: ID!, $new_owner_name: String!) {
      transferCRMEntityOwnership(entity_id: $entity_id, entity_type: $entity_type, new_owner_id: $new_owner_id, new_owner_name: $new_owner_name) {
        success
      }
    }
  `,

  // ========== FASE 1.4: SISTEMA DE GRUPOS (GROUPS) - MUTATIONS ==========
  CREATE_CRM_GROUP: `
    mutation CreateCRMGroup($input: CRM_CreateGroupInput!) {
      createCRMGroup(input: $input) {
        success
        group {
          group_id
          name
          description
          default_permission
          members {
            user_id
            name
            email
            permission
          }
          member_count
          created_by {
            user_id
            name
          }
        }
        errors { field message code }
      }
    }
  `,
  UPDATE_CRM_GROUP: `
    mutation UpdateCRMGroup($input: CRM_UpdateGroupInput!) {
      updateCRMGroup(input: $input) {
        success
        message
        group {
          group_id
          name
          description
          default_permission
        }
        errors { field message code }
      }
    }
  `,
  DELETE_CRM_GROUP: `
    mutation DeleteCRMGroup($group_id: ID!) {
      deleteCRMGroup(group_id: $group_id) {
        success
        message
        errors { field message code }
      }
    }
  `,
  ADD_CRM_GROUP_MEMBER: `
    mutation AddCRMGroupMember($input: CRM_AddGroupMemberInput!) {
      addCRMGroupMember(input: $input) {
        success
        message
        member {
          user_id
          name
          email
          permission
        }
        errors { field message code }
      }
    }
  `,
  REMOVE_CRM_GROUP_MEMBER: `
    mutation RemoveCRMGroupMember($group_id: ID!, $user_id: ID!) {
      removeCRMGroupMember(group_id: $group_id, user_id: $user_id) {
        success
        message
        errors { field message code }
      }
    }
  `,
  UPDATE_CRM_GROUP_MEMBER_PERMISSION: `
    mutation UpdateCRMGroupMemberPermission($group_id: ID!, $user_id: ID!, $permission: CRM_PermissionLevel!) {
      updateCRMGroupMemberPermission(group_id: $group_id, user_id: $user_id, permission: $permission) {
        success
        message
        member {
          user_id
          name
          permission
        }
        errors { field message code }
      }
    }
  `,
  SHARE_CRM_ENTITY_WITH_GROUP: `
    mutation ShareCRMEntityWithGroup($input: CRM_ShareEntityWithGroupInput!) {
      shareCRMEntityWithGroup(input: $input) {
        success
        message
        errors { field message code }
      }
    }
  `,
  UPDATE_CRM_GROUP_MEMBER_OVERRIDE_IN_ENTITY: `
    mutation UpdateGroupMemberOverrideInEntity($input: CRM_UpdateGroupMemberOverrideInput!) {
      updateCRMGroupMemberOverrideInEntity(input: $input) {
        success
        message
        errors { field message code }
      }
    }
  `,
  REMOVE_CRM_GROUP_MEMBER_OVERRIDE_IN_ENTITY: `
    mutation RemoveGroupMemberOverrideInEntity($entity_id: ID!, $entity_type: String!, $group_id: ID!, $user_id: ID!) {
      removeCRMGroupMemberOverrideInEntity(entity_id: $entity_id, entity_type: $entity_type, group_id: $group_id, user_id: $user_id) {
        success
        message
        errors { field message code }
      }
    }
  `,
  UNSHARE_CRM_ENTITY_FROM_GROUP: `
    mutation UnshareCRMEntityFromGroup($entity_id: ID!, $entity_type: String!, $group_id: ID!) {
      unshareCRMEntityFromGroup(entity_id: $entity_id, entity_type: $entity_type, group_id: $group_id) {
        success
        message
        errors { field message code }
      }
    }
  `,

  // ========== FASE 2.1: FILTROS PERSONALIZADOS (SAVED FILTERS) - MUTATIONS ==========
  CREATE_SAVED_FILTER: `
    mutation CreateCRMSavedFilter($input: CRM_CreateSavedFilterInput!) {
      createCRMSavedFilter(input: $input) {
        success
        filter {
          id
          name
          entityType
          conditions {
            entity
            field
            operator
            value
            group
          }
          visibility
          isFavorite
          saveColumns
          columns {
            field
            visible
            order
            width
            pinned
          }
          usageCount
          createdAt
          updatedAt
        }
        errors { field message code }
      }
    }
  `,
  UPDATE_SAVED_FILTER: `
    mutation UpdateCRMSavedFilter($id: ID!, $input: CRM_UpdateSavedFilterInput!) {
      updateCRMSavedFilter(id: $id, input: $input) {
        success
        filter {
          id
          name
          entityType
          conditions {
            entity
            field
            operator
            value
            group
          }
          visibility
          isFavorite
          saveColumns
          columns {
            field
            visible
            order
            width
            pinned
          }
          usageCount
          updatedAt
        }
        errors { field message code }
      }
    }
  `,
  DELETE_SAVED_FILTER: `
    mutation DeleteCRMSavedFilter($id: ID!) {
      deleteCRMSavedFilter(id: $id) {
        success
        filter {
          id
          name
          entityType
          conditions {
            entity
            field
            operator
            value
            group
          }
          visibility
          isFavorite
          createdAt
          updatedAt
        }
        errors { field message code }
      }
    }
  `,
  TOGGLE_SAVED_FILTER_FAVORITE: `
    mutation ToggleCRMSavedFilterFavorite($id: ID!) {
      toggleCRMSavedFilterFavorite(id: $id) {
        success
        filter {
          id
          isFavorite
        }
        errors { field message code }
      }
    }
  `,
  APPLY_SAVED_FILTER: `
    mutation ApplySavedFilter($filterId: ID!, $entityType: CRM_EntityType!) {
      applySavedFilter(filterId: $filterId, entityType: $entityType) {
        success
        message
        errors { field message code }
      }
    }
  `,

  // ========== FASE 2.3: GESTIÓN DE ARCHIVOS CRM - MUTATIONS ==========
  UPLOAD_CRM_ENTITY_FILE: `
    mutation UploadCRMEntityFile($input: CRM_UploadFileInput!) {
      uploadCRMEntityFile(input: $input) {
        success
        file {
          id
          filename
          originalFilename
          fileSize
          mimeType
          category
          publicUrls {
            original
            thumbnail
          }
          uploadedAt
        }
        errors { field message code }
      }
    }
  `,
  UPDATE_CRM_FILE_METADATA: `
    mutation UpdateCRMFileMetadata($fileId: ID!, $input: CRM_UpdateFileMetadataInput!) {
      updateCRMFileMetadata(fileId: $fileId, input: $input) {
        success
        file {
          id
          metadata {
            description
            tags
            location
          }
          updatedAt
        }
        errors { field message code }
      }
    }
  `,
  DELETE_CRM_ENTITY_FILE: `
    mutation DeleteCRMEntityFile($fileId: ID!) {
      deleteCRMEntityFile(fileId: $fileId) {
        success
        message
        errors { field message code }
      }
    }
  `,
  SHARE_CRM_FILE: `
    mutation ShareCRMFile($fileId: ID!, $userIds: [ID!]!, $canDownload: Boolean, $canDelete: Boolean) {
      shareCRMFile(fileId: $fileId, userIds: $userIds, canDownload: $canDownload, canDelete: $canDelete) {
        success
        file {
          id
        }
        errors { field message code }
      }
    }
  `,
  UNSHARE_CRM_FILE: `
    mutation UnshareCRMFile($fileId: ID!, $userId: ID!) {
      unshareCRMFile(fileId: $fileId, userId: $userId) {
        success
        file {
          id
        }
        errors { field message code }
      }
    }
  `,

  // ========== FASE 2.4: TAB DE EMAIL EN MODAL - MUTATIONS ==========
  SEND_CRM_EMAIL: `
    mutation SendCRMEmail($input: CRM_SendEmailInput!) {
      sendCRMEmail(input: $input) {
        success
        email {
          id
          subject
          status
          sentAt
          tracking {
            opened
            clicked
          }
        }
        errors { field message code }
      }
    }
  `,
  CREATE_CRM_EMAIL_DRAFT: `
    mutation CreateCRMEmailDraft($input: CRM_EmailDraftInput!) {
      createCRMEmailDraft(input: $input) {
        success
        email {
          id
          subject
          status
          createdAt
        }
        errors { field message code }
      }
    }
  `,
  UPDATE_CRM_EMAIL_DRAFT: `
    mutation UpdateCRMEmailDraft($id: ID!, $input: CRM_UpdateEmailDraftInput!) {
      updateCRMEmailDraft(id: $id, input: $input) {
        success
        email {
          id
          subject
          body
          updatedAt
        }
        errors { field message code }
      }
    }
  `,
  DELETE_CRM_EMAIL_DRAFT: `
    mutation DeleteCRMEmailDraft($id: ID!) {
      deleteCRMEmailDraft(id: $id) {
        success
        message
        errors { field message code }
      }
    }
  `,
  SEND_CRM_EMAIL_DRAFT: `
    mutation SendCRMEmailDraft($id: ID!, $scheduledFor: DateTime) {
      sendCRMEmailDraft(id: $id, scheduledFor: $scheduledFor) {
        success
        email {
          id
          status
          sentAt
          scheduledFor
        }
        errors { field message code }
      }
    }
  `,
  REPLY_CRM_EMAIL: `
    mutation ReplyCRMEmail($emailId: ID!, $body: String!, $bodyHtml: String, $attachments: [CRM_EmailAttachmentInput!]) {
      replyCRMEmail(emailId: $emailId, body: $body, bodyHtml: $bodyHtml, attachments: $attachments) {
        success
        email {
          id
          subject
          inReplyTo
          threadId
        }
        errors { field message code }
      }
    }
  `,
  FORWARD_CRM_EMAIL: `
    mutation ForwardCRMEmail($emailId: ID!, $to: [String!]!, $cc: [String!], $message: String) {
      forwardCRMEmail(emailId: $emailId, to: $to, cc: $cc, message: $message) {
        success
        email {
          id
          subject
          to
        }
        errors { field message code }
      }
    }
  `,
  TRACK_CRM_EMAIL_OPEN: `
    mutation TrackCRMEmailOpen($emailId: ID!) {
      trackCRMEmailOpen(emailId: $emailId) {
        success
        message
        errors { field message code }
      }
    }
  `,
  TRACK_CRM_EMAIL_CLICK: `
    mutation TrackCRMEmailClick($emailId: ID!) {
      trackCRMEmailClick(emailId: $emailId) {
        success
        message
        errors { field message code }
      }
    }
  `,
  CANCEL_CRM_SCHEDULED_EMAIL: `
    mutation CancelCRMScheduledEmail($id: ID!) {
      cancelCRMScheduledEmail(id: $id) {
        success
        email {
          id
          status
          scheduledFor
        }
        errors { field message code }
      }
    }
  `,
  RESCHEDULE_CRM_EMAIL: `
    mutation RescheduleCRMEmail($id: ID!, $scheduledFor: DateTime!) {
      rescheduleCRMEmail(id: $id, scheduledFor: $scheduledFor) {
        success
        email {
          id
          scheduledFor
        }
        errors { field message code }
      }
    }
  `,
};

// Enums frontend consistentes (referencia)
export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST';
export type LeadPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type LeadSource = 'WEBSITE' | 'REFERRAL' | 'SOCIAL' | 'EVENT' | 'COLD_OUTREACH' | 'ADVERTISEMENT' | 'PARTNER' | 'OTHER';
export type ContactType = 'INDIVIDUAL' | 'ENTITY_CONTACT';
export type ContactRelationship = 'CLIENTE' | 'PROSPECTO' | 'PROVEEDOR' | 'SOCIO' | 'REFERIDO' | 'OTRO';
export type CampaignType = 'EMAIL' | 'WHATSAPP' | 'SMS';
export type CampaignStatus = 'DRAFT' | 'SCHEDULED' | 'SENDING' | 'SENT' | 'PAUSED' | 'CANCELLED';


