import React, { useState } from "react";
import { AdvancedTable, ColumnConfig } from "../Shared/AdvancedTable";
import PipedriveFormModal from "../Shared/PipedriveFormModal";
import PipedriveDetailModal from "../Shared/PipedriveDetailModal";
import EditableField from "../Shared/EditableField";
import NotesEditor from "../Shared/NotesEditor";
import { CRM_MUTATIONS, CRM_QUERIES } from "../../utils/crmQueries";
import ShareModal from "./ShareModal";
import { ToastContextProvider } from "../../context/ToastContext";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { EntitiesIcon } from "../Icons/index";
import ActionsMenu from "../Shared/ActionsMenu";
import { getFieldIcon } from "../Icons/ProfessionalIcons";

const defaultEntityColumns: ColumnConfig[] = [
  { field: "name", label: "Nombre", visible: true, order: 0, width: 200, pinned: false, tooltip: "Nombre de la entidad/empresa" },
  { field: "type", label: "Tipo", visible: true, order: 1, width: 150, pinned: false, tooltip: "Tipo de entidad" },
  { field: "industry", label: "Industria", visible: true, order: 2, width: 150, pinned: false, tooltip: "Sector/industria" },
  { field: "size", label: "Tamaño", visible: true, order: 3, width: 120, pinned: false, tooltip: "Tamaño de la empresa" },
];

const GET_CRM_ENTITIES = CRM_QUERIES.GET_ENTITIES;

export default function EntitiesCRM() {
  const [openCreate, setOpenCreate] = useState(false);
  const [editRow, setEditRow] = useState<any | null>(null);
  const [shareRow, setShareRow] = useState<any | null>(null);
  const { dispatch } = ToastContextProvider();
  const pushToast = (type: string, message: string) => {
    dispatch({ type: "ADD_TOAST", payload: { id: `${Date.now()}-${Math.random()}`, type, message } } as any);
  };
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ minHeight: 0, maxHeight: '100vh', padding: '16px', backgroundColor: '#F9FAFB' }}>
      {/* Header compacto estilo Pipedrive */}
      <div className="flex items-center justify-between gap-4 flex-shrink-0 mb-3" style={{ paddingBottom: '12px', borderBottom: '1px solid #E5E7EB' }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-md" style={{ width: '40px', height: '40px', backgroundColor: '#E9D5FF' }}>
            <EntitiesIcon width={20} fill="#8B5CF6" />
          </div>
          <div>
            <h1 className="font-semibold" style={{ fontSize: '22px', lineHeight: '28px', color: '#111827', margin: 0 }}>Entidades</h1>
            <p className="text-xs" style={{ color: '#9CA3AF', marginTop: '2px', lineHeight: '16px' }}>
              Empresas y organizaciones
            </p>
          </div>
        </div>
        <button
          className="px-3.5 py-1.5 rounded-sm text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
          style={{ backgroundColor: '#8B5CF6', borderRadius: '2px' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#7C3AED';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#8B5CF6';
          }}
          onClick={() => setOpenCreate(true)}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Crear Entidad
        </button>
      </div>
      <AdvancedTable
        title="Listado"
        entityType="COMPANY"
        defaultColumns={defaultEntityColumns}
        query={GET_CRM_ENTITIES}
        variables={{ pagination: { page: 1, limit: 50 } }}
        mapResponse={(resp: any) => resp?.getCRMEntities?.entities ?? []}
        fetcher={fetchApiCRM}
        enableCRMFeatures={true}
        onRowClick={(row) => setSelectedRow(row)}
        getRowId={(r: any) => r.id}
        renderCell={(row: any, col) => {
          if (col.field === "size") {
            const sizeColors: Record<string, { bg: string; text: string }> = {
              "ENTERPRISE": { bg: "#E9D5FF", text: "#7C3AED" },
              "LARGE": { bg: "#DBEAFE", text: "#1D4ED8" },
              "SMALL": { bg: "#F3F4F6", text: "#374151" },
              "MEDIUM": { bg: "#D1FAE5", text: "#047857" },
            };
            const colors = sizeColors[row.size] || { bg: "#D1FAE5", text: "#047857" };
            return <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bg, color: colors.text }}>{row.size}</span>;
          }
          return (row as any)[col.field];
        }}
        renderActions={(row: any) => (
          <ActionsMenu
            onEdit={() => setEditRow(row)}
            onDelete={async () => {
              try {
                setDeletingId(row.id);
                await fetchApiCRM({ query: CRM_MUTATIONS.DELETE_ENTITY, variables: { id: row.id } });
                pushToast("success", "La entidad ha sido eliminada.");
              } catch (e: any) {
                pushToast("error", e?.message || "Error al eliminar");
              } finally {
                setDeletingId(null);
              }
            }}
            onShare={() => setShareRow(row)}
            isDeleting={deletingId === row.id}
            editLabel="Editar entidad"
            deleteLabel="Eliminar entidad"
            shareLabel="Compartir entidad"
          />
        )}
      />
      <PipedriveFormModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        title="Añadir organización"
        fields={[
          { name: "name", label: "Nombre", required: true, placeholder: "Nombre de la organización", column: "left" },
          { 
            name: "type", 
            label: "Tipo", 
            type: "select",
            options: [
              { value: "COMPANY", label: "Empresa" },
              { value: "ORGANIZATION", label: "Organización" },
              { value: "PARTNER", label: "Socio" }
            ],
            placeholder: "Seleccionar tipo",
            column: "left"
          },
          { name: "website", label: "Sitio web", type: "text", placeholder: "https://ejemplo.com", column: "left" },
          { name: "industry", label: "Industria", placeholder: "Ej: TECNOLOGÍA", column: "left" },
          { 
            name: "size", 
            label: "Tamaño", 
            type: "select",
            options: [
              { value: "SMALL", label: "Pequeña" },
              { value: "MEDIUM", label: "Mediana" },
              { value: "LARGE", label: "Grande" },
              { value: "ENTERPRISE", label: "Empresarial" }
            ],
            placeholder: "Seleccionar tamaño",
            column: "left"
          },
          { name: "description", label: "Descripción", type: "textarea", placeholder: "Descripción...", column: "left" },
          { name: "address_street", label: "Dirección - Calle", placeholder: "Dirección", column: "left" },
          { name: "address_city", label: "Dirección - Ciudad", placeholder: "Ciudad", column: "left" },
          { name: "address_state", label: "Dirección - Estado/Provincia", placeholder: "Estado o provincia", column: "left" },
          { name: "address_zipCode", label: "Dirección - Código postal", placeholder: "Código postal", column: "left" },
          { name: "address_country", label: "Dirección - País", placeholder: "País", column: "left" }
        ]}
        mutation={CRM_MUTATIONS.CREATE_ENTITY}
        fetcher={fetchApiCRM}
        variablesBuilder={(v) => ({ input: {
          name: v.name?.trim() || "",
          type: v.type || "COMPANY",
          website: v.website?.trim() || undefined,
          industry: v.industry?.trim() || undefined,
          size: v.size || undefined,
          description: v.description?.trim() || undefined,
          address: (v.address_street || v.address_city || v.address_state || v.address_zipCode || v.address_country) ? {
            street: v.address_street?.trim() || undefined,
            city: v.address_city?.trim() || undefined,
            state: v.address_state?.trim() || undefined,
            zipCode: v.address_zipCode?.trim() || undefined,
            country: v.address_country?.trim() || undefined
          } : undefined
        } })}
        onSuccess={() => {
          setOpenCreate(false);
        }}
      />
      <ShareModal
        isOpen={!!shareRow}
        onClose={() => setShareRow(null)}
        entityLabel="entidad"
        onSubmit={async (payload) => {
          if (!shareRow?.id) return;
          await fetchApiCRM({ query: CRM_MUTATIONS.SHARE_ENTITY, variables: { entityId: shareRow.id, input: payload } });
        }}
      />
      <PipedriveDetailModal
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        title={selectedRow?.name || "Detalle de la Entidad"}
        entityType="ENTITY"
        editFields={[
          { name: "name", label: "Nombre", required: true, placeholder: "Nombre de la organización", column: "left" },
          { 
            name: "type", 
            label: "Tipo", 
            type: "select",
            options: [
              { value: "COMPANY", label: "Empresa" },
              { value: "ORGANIZATION", label: "Organización" },
              { value: "PARTNER", label: "Socio" }
            ],
            placeholder: "Seleccionar tipo",
            column: "left"
          },
          { name: "website", label: "Sitio web", type: "text", placeholder: "https://ejemplo.com", column: "left" },
          { name: "industry", label: "Industria", placeholder: "Ej: TECNOLOGÍA", column: "left" },
          { 
            name: "size", 
            label: "Tamaño", 
            type: "select",
            options: [
              { value: "SMALL", label: "Pequeña" },
              { value: "MEDIUM", label: "Mediana" },
              { value: "LARGE", label: "Grande" },
              { value: "ENTERPRISE", label: "Empresarial" }
            ],
            placeholder: "Seleccionar tamaño",
            column: "left"
          },
          { name: "description", label: "Descripción", type: "textarea", placeholder: "Descripción...", column: "left" },
          { name: "address_street", label: "Dirección - Calle", placeholder: "Dirección", column: "left" },
          { name: "address_city", label: "Dirección - Ciudad", placeholder: "Ciudad", column: "left" },
          { name: "address_state", label: "Dirección - Estado/Provincia", placeholder: "Estado o provincia", column: "left" },
          { name: "address_zipCode", label: "Dirección - Código postal", placeholder: "Código postal", column: "left" },
          { name: "address_country", label: "Dirección - País", placeholder: "País", column: "left" }
        ]}
        editMutation={CRM_MUTATIONS.UPDATE_ENTITY}
        editFetcher={fetchApiCRM}
        editVariablesBuilder={(v, id) => ({ 
          id,
          input: {
            name: v.name?.trim() || "",
            type: v.type || "COMPANY",
            website: v.website?.trim() || undefined,
            industry: v.industry?.trim() || undefined,
            size: v.size || undefined,
            description: v.description?.trim() || undefined,
            address: (v.address_street || v.address_city || v.address_state || v.address_zipCode || v.address_country) ? {
              street: v.address_street?.trim() || undefined,
              city: v.address_city?.trim() || undefined,
              state: v.address_state?.trim() || undefined,
              zipCode: v.address_zipCode?.trim() || undefined,
              country: v.address_country?.trim() || undefined
            } : undefined
          } 
        })}
        editInitialData={selectedRow ? {
          ...selectedRow,
          address_street: selectedRow.address?.street,
          address_city: selectedRow.address?.city,
          address_state: selectedRow.address?.state,
          address_zipCode: selectedRow.address?.zipCode,
          address_country: selectedRow.address?.country
        } : undefined}
        onEditSuccess={() => {
          setSelectedRow(null);
          window.location.reload();
        }}
        onShare={() => {
          setShareRow(selectedRow);
          setSelectedRow(null);
        }}
        onDelete={async () => {
          if (confirm("¿Estás seguro de eliminar esta entidad?")) {
            try {
              setDeletingId(selectedRow?.id);
              await fetchApiCRM({ query: CRM_MUTATIONS.DELETE_ENTITY, variables: { id: selectedRow?.id } });
              pushToast("success", "La entidad ha sido eliminada.");
              setSelectedRow(null);
            } catch (e: any) {
              pushToast("error", e?.message || "Error al eliminar");
            } finally {
              setDeletingId(null);
            }
          }
        }}
        detailsSection={
          selectedRow ? (
            <div className="space-y-1">
              <EditableField
                label="Name"
                value={selectedRow.name}
                type="text"
                fieldType="Text"
                placeholder="Organization name"
                icon={getFieldIcon("company", 14)}
                required
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_ENTITY,
                      variables: { id: selectedRow.id, input: { name: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, name: value });
                  } catch (e: any) {
                    console.error("Error updating name:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Type"
                value={selectedRow.type}
                type="select"
                fieldType="Type"
                options={[
                  { value: "COMPANY", label: "Company" },
                  { value: "ORGANIZATION", label: "Organization" },
                  { value: "PARTNER", label: "Partner" }
                ]}
                icon={getFieldIcon("type", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_ENTITY,
                      variables: { id: selectedRow.id, input: { type: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, type: value });
                  } catch (e: any) {
                    console.error("Error updating type:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Website"
                value={selectedRow.website}
                type="text"
                fieldType="URL"
                placeholder="https://example.com"
                icon={getFieldIcon("website", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_ENTITY,
                      variables: { id: selectedRow.id, input: { website: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, website: value });
                  } catch (e: any) {
                    console.error("Error updating website:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Industry"
                value={selectedRow.industry}
                type="text"
                fieldType="Text"
                placeholder="Industry"
                icon={getFieldIcon("industry", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_ENTITY,
                      variables: { id: selectedRow.id, input: { industry: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, industry: value });
                  } catch (e: any) {
                    console.error("Error updating industry:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Size"
                value={selectedRow.size}
                type="select"
                fieldType="Size"
                options={[
                  { value: "SMALL", label: "Small" },
                  { value: "MEDIUM", label: "Medium" },
                  { value: "LARGE", label: "Large" },
                  { value: "ENTERPRISE", label: "Enterprise" }
                ]}
                icon="📊"
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_ENTITY,
                      variables: { id: selectedRow.id, input: { size: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, size: value });
                  } catch (e: any) {
                    console.error("Error updating size:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Description"
                value={selectedRow.description}
                type="textarea"
                fieldType="Text"
                placeholder="Description..."
                icon={getFieldIcon("description", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_ENTITY,
                      variables: { id: selectedRow.id, input: { description: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, description: value });
                  } catch (e: any) {
                    console.error("Error updating description:", e);
                    throw e;
                  }
                }}
              />
              {selectedRow.address && (
                <>
                  <EditableField
                    label="Address - Street"
                    value={selectedRow.address.street}
                    type="text"
                    fieldType="Text"
                    placeholder="Street address"
                    icon={getFieldIcon("address", 14)}
                    onSave={async (value) => {
                      try {
                        await fetchApiCRM({
                          query: CRM_MUTATIONS.UPDATE_ENTITY,
                          variables: {
                            id: selectedRow.id,
                            input: {
                              address: {
                                ...selectedRow.address,
                                street: String(value)
                              }
                            }
                          }
                        });
                        setSelectedRow({
                          ...selectedRow,
                          address: { ...selectedRow.address, street: value }
                        });
                      } catch (e: any) {
                        console.error("Error updating address street:", e);
                        throw e;
                      }
                    }}
                  />
                  <EditableField
                    label="Address - City"
                    value={selectedRow.address.city}
                    type="text"
                    fieldType="Text"
                    placeholder="City"
                    icon={getFieldIcon("city", 14)}
                    onSave={async (value) => {
                      try {
                        await fetchApiCRM({
                          query: CRM_MUTATIONS.UPDATE_ENTITY,
                          variables: {
                            id: selectedRow.id,
                            input: {
                              address: {
                                ...selectedRow.address,
                                city: String(value)
                              }
                            }
                          }
                        });
                        setSelectedRow({
                          ...selectedRow,
                          address: { ...selectedRow.address, city: value }
                        });
                      } catch (e: any) {
                        console.error("Error updating address city:", e);
                        throw e;
                      }
                    }}
                  />
                </>
              )}
            </div>
          ) : null
        }
        notesContent={
          selectedRow ? (
            <div>
              <NotesEditor
                value={selectedRow.description}
                placeholder="Take a note, @name..."
                entityType="ENTITY"
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_ENTITY,
                      variables: { id: selectedRow.id, input: { description: value } }
                    });
                    setSelectedRow({ ...selectedRow, description: value });
                  } catch (e: any) {
                    console.error("Error updating notes:", e);
                    throw e;
                  }
                }}
              />
            </div>
          ) : null
        }
        activityContent={
          <div>
            <input
              type="text"
              className="w-full rounded-lg p-3 text-sm"
              style={{ border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF" }}
              placeholder="Click here to add an activity..."
            />
          </div>
        }
        emailContent={
          <div className="text-center py-12">
            <h3 className="font-semibold mb-2" style={{ color: "#111827" }}>
              Close deals faster with better email
            </h3>
            <p className="text-sm mb-4" style={{ color: "#6B7280" }}>
              Smart, secure, configurable Sales Inbox
            </p>
          </div>
        }
        filesContent={
          <div>
            <div
              className="w-full rounded-lg border-2 border-dashed p-8 text-center"
              style={{ borderColor: "#D1D5DB", backgroundColor: "#F9FAFB" }}
            >
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium text-white mb-2"
                style={{ backgroundColor: "#10B981" }}
              >
                Upload files
              </button>
              <p className="text-sm" style={{ color: "#6B7280" }}>
                or drag files here
              </p>
            </div>
          </div>
        }
      />
    </div>
  );
}


