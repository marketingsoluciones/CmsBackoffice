import React, { useMemo, useState } from "react";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { CRM_MUTATIONS, CRM_QUERIES } from "../../utils/crmQueries";
import { CRM_LeadSource, CRM_LeadStatus, CRM_Priority } from "../../utils/crmTypes";

const formatJson = (value: any) => JSON.stringify(value, null, 2);

// Configuración de operaciones agrupadas por funcionalidad
const testSections = [
  // ========== ENTIDADES BÁSICAS ==========
  {
    title: "Leads",
    key: "leads",
    operations: [
      {
        key: "create",
        label: "Crear Lead",
        type: "mutation",
        query: CRM_MUTATIONS.CREATE_LEAD,
        variables: {
      input: {
            name: "Lead Demo Test",
            email: "lead.test@example.com",
        phone: "+34 600 000 000",
        company: "Empresa Demo",
        position: "Director Comercial",
        source: CRM_LeadSource.WEBSITE,
        status: CRM_LeadStatus.NEW,
        priority: CRM_Priority.MEDIUM,
        value: 15000,
            notes: "Lead generado desde playground CRM."
          }
        }
      },
      {
        key: "update",
        label: "Actualizar Lead",
        type: "mutation",
        query: CRM_MUTATIONS.UPDATE_LEAD,
        variables: {
          id: "REPLACE_WITH_LEAD_ID",
          input: {
            name: "Lead Actualizado",
            status: CRM_LeadStatus.CONTACTED,
            priority: CRM_Priority.HIGH
          }
        }
      },
      {
        key: "delete",
        label: "Eliminar Lead",
        type: "mutation",
        query: CRM_MUTATIONS.DELETE_LEAD,
        variables: {
          id: "REPLACE_WITH_LEAD_ID"
        }
      },
      {
        key: "list",
        label: "Listar Leads",
        type: "query",
        query: CRM_QUERIES.GET_LEADS,
        variables: {
          pagination: { page: 1, limit: 10 },
          filters: null
        }
      }
    ]
  },
  {
    title: "Contactos",
    key: "contacts",
    operations: [
      {
        key: "create",
        label: "Crear Contacto",
        type: "mutation",
        query: CRM_MUTATIONS.CREATE_CONTACT,
        variables: {
      input: {
        firstName: "Ana",
        lastName: "García",
        email: "ana.garcia@example.com",
        phone: "+34 611 222 333",
        company: "Empresa Demo",
        position: "CMO",
        relationship: "CLIENTE",
        status: "ACTIVE",
        type: "INDIVIDUAL",
        country: "España",
        city: "Madrid"
          }
        }
      },
      {
        key: "update",
        label: "Actualizar Contacto",
        type: "mutation",
        query: CRM_MUTATIONS.UPDATE_CONTACT,
        variables: {
          id: "REPLACE_WITH_CONTACT_ID",
          input: {
            firstName: "Ana María",
            status: "ACTIVE"
          }
        }
      },
      {
        key: "delete",
        label: "Eliminar Contacto",
        type: "mutation",
        query: CRM_MUTATIONS.DELETE_CONTACT,
        variables: {
          id: "REPLACE_WITH_CONTACT_ID"
        }
      },
      {
        key: "list",
        label: "Listar Contactos",
        type: "query",
        query: CRM_QUERIES.GET_CONTACTS,
        variables: {
      pagination: { page: 1, limit: 10 }
    }
      }
    ]
  },
  {
    title: "Entidades",
    key: "entities",
    operations: [
      {
        key: "create",
        label: "Crear Entidad",
        type: "mutation",
        query: CRM_MUTATIONS.CREATE_ENTITY,
        variables: {
      input: {
        name: "Compañía Demo S.A.",
        type: "COMPANY",
        website: "https://demo-company.com",
        industry: "EVENTS",
        size: "MEDIUM",
            description: "Entidad creada desde playground CRM.",
        sentiment: "POSITIVE",
            tags: ["crm", "demo"]
          }
        }
      },
      {
        key: "update",
        label: "Actualizar Entidad",
        type: "mutation",
        query: CRM_MUTATIONS.UPDATE_ENTITY,
        variables: {
          id: "REPLACE_WITH_ENTITY_ID",
          input: {
            name: "Compañía Actualizada",
            sentiment: "POSITIVE"
          }
        }
      },
      {
        key: "delete",
        label: "Eliminar Entidad",
        type: "mutation",
        query: CRM_MUTATIONS.DELETE_ENTITY,
        variables: {
          id: "REPLACE_WITH_ENTITY_ID"
        }
      },
      {
        key: "list",
        label: "Listar Entidades",
        type: "query",
        query: CRM_QUERIES.GET_ENTITIES,
        variables: {
      pagination: { page: 1, limit: 10 }
    }
      }
    ]
  },
  {
    title: "Campañas",
    key: "campaigns",
    operations: [
      {
        key: "create",
        label: "Crear Campaña",
        type: "mutation",
        query: CRM_MUTATIONS.CREATE_CAMPAIGN,
        variables: {
      input: {
        name: "Campaña Demo Email",
        type: "EMAIL",
        templateId: "template-demo",
        scheduledAt: new Date().toISOString(),
            notes: "Campaña de prueba creada desde playground.",
        tags: ["demo"],
        settings: {}
          }
        }
      },
      {
        key: "update",
        label: "Actualizar Campaña",
        type: "mutation",
        query: CRM_MUTATIONS.UPDATE_CAMPAIGN,
        variables: {
          id: "REPLACE_WITH_CAMPAIGN_ID",
          input: {
            name: "Campaña Actualizada",
            notes: "Notas actualizadas"
          }
        }
      },
      {
        key: "delete",
        label: "Eliminar Campaña",
        type: "mutation",
        query: CRM_MUTATIONS.DELETE_CAMPAIGN,
        variables: {
          id: "REPLACE_WITH_CAMPAIGN_ID"
        }
      },
      {
        key: "list",
        label: "Listar Campañas",
        type: "query",
        query: CRM_QUERIES.GET_CAMPAIGNS,
        variables: {
      pagination: { page: 1, limit: 10 }
    }
      }
    ]
  },
  {
    title: "Marcas Blancas",
    key: "whitelabels",
    operations: [
      {
        key: "create",
        label: "Crear Marca Blanca",
        type: "mutation",
        query: CRM_MUTATIONS.CREATE_WHITELABEL,
        variables: {
      input: {
        name: "Marca Blanca Demo",
        slug: `whitelabel-demo-${Date.now()}`,
        domain: "demo.bodasdehoy.com",
        status: true,
        development: "bodasdehoy",
        userUid: "upSETrmXc7ZnsIhrjDjbHd7u2up1",
        authorUsername: "crm-playground",
        settings: {}
      }
        }
      },
      {
        key: "list",
        label: "Listar Marcas Blancas",
        type: "query",
        query: CRM_QUERIES.GET_WHITELABELS,
        variables: {}
      }
    ]
  },

  // ========== SISTEMA DE ETIQUETAS (LABELS) ==========
  {
    title: "Etiquetas (Labels)",
    key: "labels",
    operations: [
      {
        key: "create",
        label: "Crear Etiqueta",
        type: "mutation",
        query: CRM_MUTATIONS.CREATE_CRM_LABEL,
        variables: {
          input: {
            name: "Etiqueta Demo",
            color: "#FF5733",
            entityType: "LEAD",
            description: "Descripción opcional de la etiqueta"
          }
        }
      },
      {
        key: "update",
        label: "Actualizar Etiqueta",
        type: "mutation",
        query: CRM_MUTATIONS.UPDATE_CRM_LABEL,
        variables: {
          id: "REPLACE_WITH_LABEL_ID",
          input: {
            name: "Etiqueta Actualizada",
            color: "#33FF57"
          }
        }
      },
      {
        key: "delete",
        label: "Eliminar Etiqueta",
        type: "mutation",
        query: CRM_MUTATIONS.DELETE_CRM_LABEL,
        variables: {
          id: "REPLACE_WITH_LABEL_ID"
        }
      },
      {
        key: "assign",
        label: "Asignar Etiqueta",
        type: "mutation",
        query: CRM_MUTATIONS.ASSIGN_CRM_LABEL,
        variables: {
          labelId: "REPLACE_WITH_LABEL_ID",
          entityId: "REPLACE_WITH_ENTITY_ID",
          entityType: "LEAD"
        }
      },
      {
        key: "unassign",
        label: "Desasignar Etiqueta",
        type: "mutation",
        query: CRM_MUTATIONS.UNASSIGN_CRM_LABEL,
        variables: {
          labelId: "REPLACE_WITH_LABEL_ID",
          entityId: "REPLACE_WITH_ENTITY_ID",
          entityType: "LEAD"
        }
      },
      {
        key: "list",
        label: "Listar Etiquetas",
        type: "query",
        query: CRM_QUERIES.GET_CRM_LABELS,
        variables: {
          entityType: "LEAD",
          search: null
        }
      },
      {
        key: "getEntityLabels",
        label: "Obtener Etiquetas de Entidad",
        type: "query",
        query: CRM_QUERIES.GET_CRM_ENTITY_LABELS,
        variables: {
          entityId: "REPLACE_WITH_ENTITY_ID",
          entityType: "LEAD"
        }
      },
      {
        key: "getMostUsed",
        label: "Obtener Etiquetas Más Usadas",
        type: "query",
        query: CRM_QUERIES.GET_MOST_USED_CRM_LABELS,
        variables: {
          entityType: "LEAD",
          limit: 10
        }
      },
      {
        key: "getById",
        label: "Obtener Etiqueta por ID",
        type: "query",
        query: CRM_QUERIES.GET_CRM_LABEL_BY_ID,
        variables: {
          id: "REPLACE_WITH_LABEL_ID"
        }
      },
      {
        key: "search",
        label: "Buscar Etiquetas",
        type: "query",
        query: CRM_QUERIES.SEARCH_CRM_LABELS,
        variables: {
          query: "demo",
          entityType: "LEAD"
        }
      }
    ]
  },

  // ========== SISTEMA DE COMPARTIR (SHARING) ==========
  {
    title: "Compartir (Sharing)",
    key: "sharing",
    operations: [
      {
        key: "share",
        label: "Compartir Entidad",
        type: "mutation",
        query: CRM_MUTATIONS.SHARE_CRM_ENTITY,
        variables: {
          input: {
            entityType: "LEAD",
            entityId: "REPLACE_WITH_ENTITY_ID",
            userIds: ["REPLACE_WITH_USER_ID"],
            permissionLevel: "VIEW"
          }
        }
      },
      {
        key: "unshare",
        label: "Dejar de Compartir",
        type: "mutation",
        query: CRM_MUTATIONS.UNSHARE_CRM_ENTITY,
        variables: {
          entityType: "LEAD",
          entityId: "REPLACE_WITH_ENTITY_ID",
          userId: "REPLACE_WITH_USER_ID"
        }
      },
      {
        key: "updatePermissions",
        label: "Actualizar Permisos",
        type: "mutation",
        query: CRM_MUTATIONS.UPDATE_CRM_ENTITY_PERMISSIONS,
        variables: {
          entityType: "LEAD",
          entityId: "REPLACE_WITH_ENTITY_ID",
          userId: "REPLACE_WITH_USER_ID",
          permissionLevel: "EDIT"
        }
      },
      {
        key: "transferOwnership",
        label: "Transferir Propiedad",
        type: "mutation",
        query: CRM_MUTATIONS.TRANSFER_CRM_OWNERSHIP,
        variables: {
          entityType: "LEAD",
          entityId: "REPLACE_WITH_ENTITY_ID",
          newOwnerId: "REPLACE_WITH_USER_ID"
        }
      },
      {
        key: "getPermissions",
        label: "Obtener Permisos",
        type: "query",
        query: CRM_QUERIES.GET_CRM_ENTITY_PERMISSIONS,
        variables: {
          entityType: "LEAD",
          entityId: "REPLACE_WITH_ENTITY_ID"
        }
      },
      {
        key: "sharedWithMe",
        label: "Compartido Conmigo",
        type: "query",
        query: CRM_QUERIES.GET_CRM_SHARED_WITH_ME,
        variables: {
          entityType: "LEAD",
          pagination: { page: 1, limit: 10 }
        }
      },
      {
        key: "myShared",
        label: "Mis Compartidos",
        type: "query",
        query: CRM_QUERIES.GET_CRM_MY_SHARED,
        variables: {
          entityType: "LEAD",
          pagination: { page: 1, limit: 10 }
        }
      }
    ]
  },

  // ========== FILTROS PERSONALIZADOS (SAVED FILTERS) ==========
  {
    title: "Filtros Personalizados",
    key: "filters",
    operations: [
      {
        key: "create",
        label: "Crear Filtro",
        type: "mutation",
        query: CRM_MUTATIONS.CREATE_SAVED_FILTER,
        variables: {
          input: {
            name: "Filtro Demo",
            entityType: "LEAD",
            conditions: {
              status: { operator: "equals", value: CRM_LeadStatus.NEW }
            },
            visibility: "PRIVATE",
            isFavorite: false,
            saveColumns: true,
            columns: ["name", "email", "status"]
          }
        }
      },
      {
        key: "update",
        label: "Actualizar Filtro",
        type: "mutation",
        query: CRM_MUTATIONS.UPDATE_SAVED_FILTER,
        variables: {
          id: "REPLACE_WITH_FILTER_ID",
          input: {
            name: "Filtro Actualizado",
            isFavorite: true
          }
        }
      },
      {
        key: "delete",
        label: "Eliminar Filtro",
        type: "mutation",
        query: CRM_MUTATIONS.DELETE_SAVED_FILTER,
        variables: {
          id: "REPLACE_WITH_FILTER_ID"
        }
      },
      {
        key: "toggleFavorite",
        label: "Alternar Favorito",
        type: "mutation",
        query: CRM_MUTATIONS.TOGGLE_SAVED_FILTER_FAVORITE,
        variables: {
          id: "REPLACE_WITH_FILTER_ID"
        }
      },
      {
        key: "apply",
        label: "Aplicar Filtro",
        type: "mutation",
        query: CRM_MUTATIONS.APPLY_SAVED_FILTER,
        variables: {
          filterId: "REPLACE_WITH_FILTER_ID",
          entityType: "LEAD"
        }
      },
      {
        key: "myFilters",
        label: "Mis Filtros",
        type: "query",
        query: CRM_QUERIES.GET_MY_SAVED_FILTERS,
        variables: {
          entityType: "LEAD"
        }
      },
      {
        key: "getById",
        label: "Obtener Filtro por ID",
        type: "query",
        query: CRM_QUERIES.GET_SAVED_FILTER_BY_ID,
        variables: {
          id: "REPLACE_WITH_FILTER_ID"
        }
      },
      {
        key: "sharedFilters",
        label: "Filtros Compartidos",
        type: "query",
        query: CRM_QUERIES.GET_SHARED_SAVED_FILTERS,
        variables: {
          entityType: "LEAD"
        }
      }
    ]
  },

  // ========== GESTIÓN DE ARCHIVOS CRM ==========
  {
    title: "Archivos (Files)",
    key: "files",
    operations: [
      {
        key: "upload",
        label: "Subir Archivo",
        type: "mutation",
        query: CRM_MUTATIONS.UPLOAD_CRM_ENTITY_FILE,
        variables: {
          input: {
            entityType: "LEAD",
            entityId: "REPLACE_WITH_ENTITY_ID",
            file: null, // Se debe subir un archivo real
            category: "DOCUMENT",
            visibility: "PRIVATE",
            metadata: {
              description: "Archivo de prueba",
              tags: ["demo"]
            }
          }
        }
      },
      {
        key: "updateMetadata",
        label: "Actualizar Metadatos",
        type: "mutation",
        query: CRM_MUTATIONS.UPDATE_CRM_FILE_METADATA,
        variables: {
          fileId: "REPLACE_WITH_FILE_ID",
          input: {
            description: "Descripción actualizada",
            tags: ["actualizado"]
          }
        }
      },
      {
        key: "delete",
        label: "Eliminar Archivo",
        type: "mutation",
        query: CRM_MUTATIONS.DELETE_CRM_ENTITY_FILE,
        variables: {
          fileId: "REPLACE_WITH_FILE_ID"
        }
      },
      {
        key: "share",
        label: "Compartir Archivo",
        type: "mutation",
        query: CRM_MUTATIONS.SHARE_CRM_FILE,
        variables: {
          fileId: "REPLACE_WITH_FILE_ID",
          userIds: ["REPLACE_WITH_USER_ID"],
          canDownload: true,
          canDelete: false
        }
      },
      {
        key: "unshare",
        label: "Dejar de Compartir Archivo",
        type: "mutation",
        query: CRM_MUTATIONS.UNSHARE_CRM_FILE,
        variables: {
          fileId: "REPLACE_WITH_FILE_ID",
          userId: "REPLACE_WITH_USER_ID"
        }
      },
      {
        key: "getEntityFiles",
        label: "Archivos de Entidad",
        type: "query",
        query: CRM_QUERIES.GET_CRM_ENTITY_FILES,
        variables: {
          entityId: "REPLACE_WITH_ENTITY_ID",
          entityType: "LEAD",
          category: null
        }
      },
      {
        key: "getById",
        label: "Obtener Archivo por ID",
        type: "query",
        query: CRM_QUERIES.GET_CRM_FILE_BY_ID,
        variables: {
          id: "REPLACE_WITH_FILE_ID"
        }
      },
      {
        key: "getDownloadUrl",
        label: "URL de Descarga",
        type: "query",
        query: CRM_QUERIES.GET_CRM_FILE_DOWNLOAD_URL,
        variables: {
          fileId: "REPLACE_WITH_FILE_ID",
          expiresIn: 3600
        }
      },
      {
        key: "myFiles",
        label: "Mis Archivos",
        type: "query",
        query: CRM_QUERIES.GET_MY_CRM_FILES,
        variables: {
          entityType: "LEAD",
          category: null,
          limit: 20
        }
      }
    ]
  },

  // ========== GESTIÓN DE EMAILS ==========
  {
    title: "Emails",
    key: "emails",
    operations: [
      {
        key: "send",
        label: "Enviar Email",
        type: "mutation",
        query: CRM_MUTATIONS.SEND_CRM_EMAIL,
        variables: {
          input: {
            entityType: "LEAD",
            entityId: "REPLACE_WITH_ENTITY_ID",
            to: ["destinatario@example.com"],
            cc: [],
            bcc: [],
            subject: "Email de Prueba",
            body: "Cuerpo del email de prueba",
            bodyHtml: "<p>Cuerpo del email de prueba</p>",
            attachments: []
          }
        }
      },
      {
        key: "createDraft",
        label: "Crear Borrador",
        type: "mutation",
        query: CRM_MUTATIONS.CREATE_CRM_EMAIL_DRAFT,
        variables: {
          input: {
            entityType: "LEAD",
            entityId: "REPLACE_WITH_ENTITY_ID",
            to: ["destinatario@example.com"],
            subject: "Borrador de Prueba",
            body: "Cuerpo del borrador"
          }
        }
      },
      {
        key: "updateDraft",
        label: "Actualizar Borrador",
        type: "mutation",
        query: CRM_MUTATIONS.UPDATE_CRM_EMAIL_DRAFT,
        variables: {
          id: "REPLACE_WITH_EMAIL_ID",
          input: {
            subject: "Borrador Actualizado",
            body: "Cuerpo actualizado"
          }
        }
      },
      {
        key: "deleteDraft",
        label: "Eliminar Borrador",
        type: "mutation",
        query: CRM_MUTATIONS.DELETE_CRM_EMAIL_DRAFT,
        variables: {
          id: "REPLACE_WITH_EMAIL_ID"
        }
      },
      {
        key: "sendDraft",
        label: "Enviar Borrador",
        type: "mutation",
        query: CRM_MUTATIONS.SEND_CRM_EMAIL_DRAFT,
        variables: {
          id: "REPLACE_WITH_EMAIL_ID",
          scheduledFor: null
        }
      },
      {
        key: "reply",
        label: "Responder Email",
        type: "mutation",
        query: CRM_MUTATIONS.REPLY_CRM_EMAIL,
        variables: {
          emailId: "REPLACE_WITH_EMAIL_ID",
          body: "Respuesta de prueba",
          bodyHtml: "<p>Respuesta de prueba</p>",
          attachments: []
        }
      },
      {
        key: "forward",
        label: "Reenviar Email",
        type: "mutation",
        query: CRM_MUTATIONS.FORWARD_CRM_EMAIL,
        variables: {
          emailId: "REPLACE_WITH_EMAIL_ID",
          to: ["nuevo-destinatario@example.com"],
          cc: [],
          message: "Mensaje adicional"
        }
      },
      {
        key: "trackOpen",
        label: "Registrar Apertura",
        type: "mutation",
        query: CRM_MUTATIONS.TRACK_CRM_EMAIL_OPEN,
        variables: {
          emailId: "REPLACE_WITH_EMAIL_ID"
        }
      },
      {
        key: "trackClick",
        label: "Registrar Clic",
        type: "mutation",
        query: CRM_MUTATIONS.TRACK_CRM_EMAIL_CLICK,
        variables: {
          emailId: "REPLACE_WITH_EMAIL_ID"
        }
      },
      {
        key: "cancelScheduled",
        label: "Cancelar Email Programado",
        type: "mutation",
        query: CRM_MUTATIONS.CANCEL_CRM_SCHEDULED_EMAIL,
        variables: {
          id: "REPLACE_WITH_EMAIL_ID"
        }
      },
      {
        key: "reschedule",
        label: "Reprogramar Email",
        type: "mutation",
        query: CRM_MUTATIONS.RESCHEDULE_CRM_EMAIL,
        variables: {
          id: "REPLACE_WITH_EMAIL_ID",
          scheduledFor: new Date(Date.now() + 86400000).toISOString()
        }
      },
      {
        key: "getEntityEmails",
        label: "Emails de Entidad",
        type: "query",
        query: CRM_QUERIES.GET_CRM_ENTITY_EMAILS,
        variables: {
          entityId: "REPLACE_WITH_ENTITY_ID",
          entityType: "LEAD",
          filters: null,
          pagination: { page: 1, limit: 10 }
        }
      },
      {
        key: "getById",
        label: "Obtener Email por ID",
        type: "query",
        query: CRM_QUERIES.GET_CRM_EMAIL_BY_ID,
        variables: {
          id: "REPLACE_WITH_EMAIL_ID"
        }
      },
      {
        key: "getThreads",
        label: "Obtener Hilos de Email",
        type: "query",
        query: CRM_QUERIES.GET_CRM_EMAIL_THREADS,
        variables: {
          entityId: "REPLACE_WITH_ENTITY_ID",
          entityType: "LEAD",
          pagination: { page: 1, limit: 10 }
        }
      },
      {
        key: "myEmails",
        label: "Mis Emails",
        type: "query",
        query: CRM_QUERIES.GET_MY_CRM_EMAILS,
        variables: {
          filters: null,
          pagination: { page: 1, limit: 10 }
        }
      },
      {
        key: "getStats",
        label: "Estadísticas de Email",
        type: "query",
        query: CRM_QUERIES.GET_CRM_EMAIL_STATS,
        variables: {
          entityId: null,
          entityType: "LEAD",
          dateFrom: null,
          dateTo: null
        }
      },
      {
        key: "getDrafts",
        label: "Borradores",
        type: "query",
        query: CRM_QUERIES.GET_CRM_EMAIL_DRAFTS,
        variables: {
          entityId: null,
          entityType: "LEAD",
          pagination: { page: 1, limit: 10 }
        }
      },
      {
        key: "getScheduled",
        label: "Emails Programados",
        type: "query",
        query: CRM_QUERIES.GET_CRM_SCHEDULED_EMAILS,
        variables: {
          entityId: null,
          entityType: "LEAD",
          pagination: { page: 1, limit: 10 }
        }
      }
    ]
  },

  // ========== DIAGNÓSTICO Y VERIFICACIÓN ==========
  {
    title: "🔍 Diagnóstico del Schema",
    key: "diagnostics",
    operations: [
      {
        key: "checkLeadInput",
        label: "Verificar Tipo CRM_LeadInput",
        type: "query",
        query: `
          query CheckLeadInput {
            __type(name: "CRM_LeadInput") {
              name
              kind
              inputFields {
                name
                type {
                  name
                  kind
                }
              }
            }
          }
        `,
        variables: {}
      },
      {
        key: "checkLabelTypes",
        label: "Verificar Tipos de Labels Disponibles",
        type: "query",
        query: `
          query CheckLabelTypes {
            __type(name: "CRM_CreateLabelInput") {
              name
              kind
              inputFields {
                name
                type {
                  name
                  kind
                }
              }
            }
          }
        `,
        variables: {}
      },
      {
        key: "checkAllCRMInputs",
        label: "Listar Todos los Tipos Input CRM (filtrado)",
        type: "query",
        query: `
          query ListAllCRMInputs {
            __schema {
              types {
                name
                kind
                inputFields {
                  name
                  type {
                    name
                    kind
                  }
                }
              }
            }
          }
        `,
        variables: {}
      },
      {
        key: "checkLabelMutation",
        label: "Verificar Mutation createCRMLabel",
        type: "query",
        query: `
          query CheckLabelMutation {
            __schema {
              mutationType {
                fields {
                  name
                  args {
                    name
                    type {
                      name
                      kind
                      ofType {
                        name
                        kind
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {}
      },
      {
        key: "listAllInputTypes",
        label: "Listar Todos los Tipos Input CRM",
        type: "query",
        query: `
          query ListCRMInputTypes {
            __schema {
              types {
                name
                kind
                inputFields {
                  name
                  type {
                    name
                    kind
                  }
                }
              }
            }
          }
        `,
        variables: {}
      },
      {
        key: "searchLabelTypes",
        label: "Buscar Tipos Relacionados con Label",
        type: "query",
        query: `
          query SearchLabelTypes {
            __schema {
              types {
                name
                kind
              }
            }
          }
        `,
        variables: {}
      }
    ]
  }
];

type SectionKey = typeof testSections[number]["key"];
type OperationKey = string;

export default function CRMPlayground() {
  // Inicializar payloads para todas las operaciones
  const initialPayloads = useMemo(() => {
    const payloads: Record<string, Record<string, string>> = {};
    testSections.forEach(section => {
      payloads[section.key] = {};
      section.operations.forEach(op => {
        payloads[section.key][op.key] = formatJson(op.variables);
      });
    });
    return payloads;
  }, []);

  const [payloads, setPayloads] = useState(initialPayloads);
  const [results, setResults] = useState<Record<string, Record<string, string>>>({});
  const [isRunning, setIsRunning] = useState<Record<string, boolean>>({});

  const handleChange = (sectionKey: string, operationKey: string, value: string) => {
    setPayloads(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [operationKey]: value
      }
    }));
  };

  const runRequest = async (sectionKey: string, operationKey: string, query: string) => {
    const requestKey = `${sectionKey}-${operationKey}`;
    try {
      setIsRunning(prev => ({ ...prev, [requestKey]: true }));
      const body = payloads[sectionKey]?.[operationKey] || "{}";
      const variables = body ? JSON.parse(body) : {};
      
      console.groupCollapsed(`[CRM Playground] ${sectionKey.toUpperCase()} :: ${operationKey.toUpperCase()}`);
      console.log("📤 Request", { sectionKey, operationKey, query, variables });
      
      const data = await fetchApiCRM({ query, variables });
      
      console.log("📥 Response", data);
      console.groupEnd();
      
      setResults(prev => ({
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          [operationKey]: formatJson(data)
        }
      }));
    } catch (error: any) {
      console.error(`[CRM Playground] ${sectionKey.toUpperCase()} :: ${operationKey.toUpperCase()} FAILED`, error);
      setResults(prev => ({
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          [operationKey]: `❌ ${error?.message || "Error desconocido"}`
        }
      }));
    } finally {
      setIsRunning(prev => ({ ...prev, [requestKey]: false }));
    }
  };

  return (
    <div className="w-full h-full overflow-auto bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 flex flex-col gap-6 min-h-full">
        <header className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h1 className="text-2xl font-semibold text-primary mb-2">Playground CRM (QA manual)</h1>
          <p className="text-sm text-gray-600">
            Usa este panel para probar directamente las mutaciones y queries del CRM. Las peticiones se hacen a través del 
            <span className="font-semibold"> proxy de Next.js (/api/crm/graphql)</span> que reenvía las peticiones a 
            <span className="font-semibold"> https://api2.eventosorganizador.com/graphql</span>. 
            El proxy evita problemas de CORS haciendo las peticiones desde el servidor. Cada sección incluye
            operaciones agrupadas por funcionalidad con botones individuales para cada query y mutation.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Recuerda actualizar los valores (IDs, dominios, usuarios) antes de ejecutar en producción.
          </p>
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-800">
              <strong>⚠️ Advertencia Crítica:</strong> El backend está reportando errores de tipos desconocidos para múltiples entidades (Leads, Labels, etc.). 
              Esto indica que el <strong>schema GraphQL del backend no está sincronizado</strong> con lo que el frontend espera.
            </p>
            <p className="text-xs text-red-700 mt-2">
              <strong>Acción requerida:</strong> Usa la sección <strong>"🔍 Diagnóstico del Schema"</strong> para verificar qué tipos están realmente disponibles en el backend.
            </p>
          </div>
        </header>

        {testSections.map((section) => (
          <section key={section.key} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-primary border-b border-gray-200 pb-2">
              {section.title}
            </h2>

            <div className="grid gap-4">
              {section.operations.map((op) => {
                const requestKey = `${section.key}-${op.key}`;
                const isRunningOp = isRunning[requestKey] || false;
                const result = results[section.key]?.[op.key] || "";

                return (
                  <div key={op.key} className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          op.type === "mutation" 
                            ? "bg-blue-100 text-blue-700" 
                            : "bg-green-100 text-green-700"
                        }`}>
                          {op.type === "mutation" ? "MUTATION" : "QUERY"}
                        </span>
                        <h3 className="text-sm font-medium text-gray-800">{op.label}</h3>
                      </div>
                <button
                  style={{
                          padding: "0.4rem 1.2rem",
                    fontSize: "0.75rem",
                          borderRadius: "6px",
                          backgroundColor: op.type === "mutation" ? "#1C64F2" : "#10B981",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    border: "none",
                          boxShadow: op.type === "mutation" 
                            ? "0 2px 6px rgba(28,100,242,0.35)" 
                            : "0 2px 6px rgba(16,185,129,0.35)",
                          opacity: isRunningOp ? 0.6 : 1,
                          cursor: isRunningOp ? "not-allowed" : "pointer",
                          transition: "all 0.2s"
                        }}
                        onClick={() => runRequest(section.key, op.key, op.query)}
                        disabled={isRunningOp}
                        onMouseEnter={(e) => {
                          if (!isRunningOp) {
                            e.currentTarget.style.transform = "scale(1.02)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        {isRunningOp ? "⏳ Ejecutando..." : `▶ Ejecutar ${op.type === "mutation" ? "Mutación" : "Query"}`}
                </button>
            </div>

                    <div className="grid md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-600">
                          Variables (JSON)
                </label>
                <textarea
                          className="border border-gray-200 rounded-lg p-3 text-xs font-mono min-h-[120px] focus:outline-none focus:border-primary resize-y"
                          value={payloads[section.key]?.[op.key] || ""}
                          onChange={(e) => handleChange(section.key, op.key, e.target.value)}
                          placeholder="{}"
                />
              </div>
              <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-gray-600">Resultado</label>
                        <pre className={`border rounded-lg p-3 text-xs font-mono min-h-[120px] max-h-[300px] overflow-auto whitespace-pre-wrap ${
                          result?.startsWith("❌") 
                            ? "border-red-200 bg-red-50 text-red-800" 
                            : "border-gray-200 bg-gray-50"
                        }`}>
                          {result || "Ejecuta la operación para ver el resultado..."}
                        </pre>
                      </div>
              </div>
            </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
