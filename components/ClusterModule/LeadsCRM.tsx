import React, { useState } from "react";
import { AdvancedTable, ColumnConfig } from "../Shared/AdvancedTable";
import PipedriveFormModal from "../Shared/PipedriveFormModal";
import PipedriveDetailModal from "../Shared/PipedriveDetailModal";
import EditableField from "../Shared/EditableField";
import NotesEditor from "../Shared/NotesEditor";
import ShareModal from "./ShareModal";
import FileUploadZone from "../Shared/FileUploadZone";
import FileGallery from "../Shared/FileGallery";
import { CRM_MUTATIONS, CRM_QUERIES } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { LeadsIcon } from "../Icons/index";
import { getFieldIcon } from "../Icons/ProfessionalIcons";

const defaultLeadColumns: ColumnConfig[] = [
  { field: "name", label: "Nombre", visible: true, order: 0, width: 200, pinned: false, tooltip: "Nombre del lead" },
  { field: "email", label: "Email", visible: true, order: 1, width: 250, pinned: false, tooltip: "Correo electrónico" },
  { field: "company", label: "Compañía", visible: true, order: 2, width: 200, pinned: false, tooltip: "Empresa asociada" },
  { field: "status", label: "Estado", visible: true, order: 3, width: 150, pinned: false, tooltip: "Estado del lead" },
  { field: "priority", label: "Prioridad", visible: true, order: 4, width: 120, pinned: false, tooltip: "Nivel de prioridad" },
  { field: "value", label: "Valor", visible: true, order: 5, width: 120, pinned: false, tooltip: "Valor estimado de la oportunidad" }
];

const GET_CRM_LEADS = CRM_QUERIES.GET_LEADS;

export default function LeadsCRM() {
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [shareRow, setShareRow] = useState<any | null>(null);
  const [editRow, setEditRow] = useState<any | null>(null);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | undefined>(undefined);
  // Las etiquetas ahora se cargan desde el backend a través de LabelFilterDropdown
  const [owners] = useState<Array<{ id: string; name: string }>>([
    { id: "all", name: "Bodas de Hoy (you)" },
  ]);

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ minHeight: 0, maxHeight: '100vh', padding: '16px', backgroundColor: '#F9FAFB' }}>
      {/* Header compacto estilo Pipedrive */}
      <div className="flex items-center justify-between gap-4 flex-shrink-0 mb-3" style={{ paddingBottom: '12px', borderBottom: '1px solid #E5E7EB' }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-md" style={{ width: '40px', height: '40px', backgroundColor: '#DBEAFE' }}>
            <LeadsIcon width={20} fill="#3B82F6" />
          </div>
          <div>
            <h1 className="font-semibold" style={{ fontSize: '22px', lineHeight: '28px', color: '#111827', margin: 0 }}>Leads</h1>
            <p className="text-xs" style={{ color: '#9CA3AF', marginTop: '2px', lineHeight: '16px' }}>
              Gestiona tus oportunidades comerciales
            </p>
          </div>
        </div>
        <button
          className="px-3.5 py-1.5 rounded-sm text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
          style={{ backgroundColor: '#10B981', borderRadius: '2px' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#059669';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#10B981';
          }}
          onClick={() => setOpenCreate(true)}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Crear Lead
        </button>
      </div>
      <AdvancedTable
        title="Listado"
        entityType="LEAD"
        defaultColumns={defaultLeadColumns}
        query={GET_CRM_LEADS}
        variables={{ pagination: { page: 1, limit: 50 } }}
        mapResponse={(resp: any) => resp?.getCRMLeads?.leads ?? []}
        fetcher={fetchApiCRM}
        enableCRMFeatures={true}
        onRowClick={(row) => setSelectedRow(row)}
        selectedLabels={selectedLabels}
        onSelectLabels={setSelectedLabels}
        owners={owners}
        selectedOwnerId={selectedOwnerId}
        onSelectOwner={setSelectedOwnerId}
        onCreateFilter={() => {
          console.log("Create filter clicked");
        }}
        renderCell={(row: any, col) => {
          if (col.field === "status") {
            const statusColors: Record<string, { bg: string; text: string }> = {
              "NEW": { bg: "#D1FAE5", text: "#047857" },
              "WON": { bg: "#DBEAFE", text: "#1D4ED8" },
              "LOST": { bg: "#FEE2E2", text: "#DC2626" },
            };
            const colors = statusColors[row.status] || { bg: "#F3F4F6", text: "#374151" };
            return <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bg, color: colors.text }}>{row.status}</span>;
          }
          if (col.field === "priority") {
            const priorityColors: Record<string, { bg: string; text: string }> = {
              "URGENT": { bg: "#FEE2E2", text: "#DC2626" },
              "HIGH": { bg: "#FFEDD5", text: "#C2410C" },
              "LOW": { bg: "#F3F4F6", text: "#374151" },
              "MEDIUM": { bg: "#DBEAFE", text: "#1D4ED8" },
            };
            const colors = priorityColors[row.priority] || { bg: "#DBEAFE", text: "#1D4ED8" };
            return <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bg, color: colors.text }}>{row.priority}</span>;
          }
          if (col.field === "value" && typeof row.value === "number") {
            return <span title="Valor estimado">{row.value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>;
          }
          return (row as any)[col.field];
        }}
      />
      <PipedriveFormModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        title="Añadir lead"
        alertMessage={{
          icon: "🎓",
          text: "No añadimos la palabra 'lead' al título de tu lead",
          subtext: "Puedes habilitarlo si es necesario.",
          actionText: "Abrir configuración",
        }}
        fields={[
          { 
            name: "name", 
            label: "Nombre", 
            required: true, 
            placeholder: "Nombre del lead",
            column: "left"
          },
          { 
            name: "company", 
            label: "Empresa", 
            placeholder: "Nombre de la empresa",
            column: "left"
          },
          { 
            name: "position", 
            label: "Cargo", 
            placeholder: "Título del trabajo",
            column: "left"
          },
          { 
            name: "source", 
            label: "Origen", 
            type: "select",
            options: [
              { value: "WEBSITE", label: "Sitio web" },
              { value: "REFERRAL", label: "Referido" },
              { value: "SOCIAL", label: "Redes sociales" },
              { value: "EVENT", label: "Evento" },
              { value: "COLD_OUTREACH", label: "Contacto frío" },
              { value: "ADVERTISEMENT", label: "Publicidad" },
              { value: "PARTNER", label: "Socio" },
              { value: "OTHER", label: "Otro" }
            ],
            placeholder: "Seleccionar origen",
            column: "left"
          },
          { 
            name: "status", 
            label: "Estado", 
            type: "select",
            required: true,
            options: [
              { value: "NEW", label: "Nuevo" },
              { value: "CONTACTED", label: "Contactado" },
              { value: "QUALIFIED", label: "Calificado" },
              { value: "PROPOSAL", label: "Propuesta" },
              { value: "NEGOTIATION", label: "Negociación" },
              { value: "WON", label: "Ganado" },
              { value: "LOST", label: "Perdido" }
            ],
            placeholder: "Seleccionar estado",
            column: "left"
          },
          { 
            name: "priority", 
            label: "Prioridad", 
            type: "select",
            options: [
              { value: "URGENT", label: "Urgente" },
              { value: "HIGH", label: "Alta" },
              { value: "MEDIUM", label: "Media" },
              { value: "LOW", label: "Baja" }
            ],
            placeholder: "Seleccionar prioridad",
            column: "left"
          },
          { 
            name: "value", 
            label: "Valor", 
            type: "currency",
            placeholder: "0",
            column: "left"
          },
          { 
            name: "notes", 
            label: "Notas", 
            type: "textarea",
            placeholder: "Notas adicionales...",
            column: "left"
          },
          { 
            name: "phone", 
            label: "Teléfono", 
            type: "phone",
            placeholder: "+34 600 000 000",
            column: "right"
          },
          { 
            name: "email", 
            label: "Correo electrónico", 
            type: "email",
            placeholder: "ejemplo@empresa.com",
            column: "right"
          }
        ]}
        mutation={CRM_MUTATIONS.CREATE_LEAD}
        fetcher={fetchApiCRM}
        variablesBuilder={(v) => ({
          input: {
            name: v.name?.trim() || "",
            email: v.email?.trim() || undefined,
            phone: v.phone?.trim() || undefined,
            company: v.company?.trim() || undefined,
            position: v.position?.trim() || undefined,
            source: v.source || undefined,
            status: v.status || "NEW",
            priority: v.priority || "MEDIUM",
            value: v.value ? Number(v.value) : undefined,
            notes: v.notes?.trim() || undefined
          }
        })}
        onSuccess={() => {
          setOpenCreate(false);
        }}
      />
      <ShareModal
        isOpen={!!shareRow}
        onClose={() => setShareRow(null)}
        entityLabel="lead"
        onSubmit={async (payload) => {
          if (!shareRow?.id) return;
          await fetchApiCRM({ 
            query: CRM_MUTATIONS.SHARE_CRM_ENTITY, 
            variables: { 
              input: {
                entityType: "LEAD",
                entityId: shareRow.id,
                shareWith: payload.userIds?.map((uid: string) => ({
                  userId: uid,
                  userName: uid, // TODO: Obtener nombre real del usuario
                  permissionLevel: payload.permissions
                })) || []
              }
            } 
          });
        }}
      />
      <PipedriveDetailModal
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        title={selectedRow?.name || "Detalle del Lead"}
        entityType="LEAD"
        onShare={() => {
          setShareRow(selectedRow);
          setSelectedRow(null);
        }}
        editFields={[
          { 
            name: "name", 
            label: "Nombre", 
            required: true, 
            placeholder: "Nombre del lead",
            column: "left"
          },
          { 
            name: "company", 
            label: "Empresa", 
            placeholder: "Nombre de la empresa",
            column: "left"
          },
          { 
            name: "position", 
            label: "Cargo", 
            placeholder: "Título del trabajo",
            column: "left"
          },
          { 
            name: "source", 
            label: "Origen", 
            type: "select",
            options: [
              { value: "WEBSITE", label: "Sitio web" },
              { value: "REFERRAL", label: "Referido" },
              { value: "SOCIAL", label: "Redes sociales" },
              { value: "EVENT", label: "Evento" },
              { value: "COLD_OUTREACH", label: "Contacto frío" },
              { value: "ADVERTISEMENT", label: "Publicidad" },
              { value: "PARTNER", label: "Socio" },
              { value: "OTHER", label: "Otro" }
            ],
            placeholder: "Seleccionar origen",
            column: "left"
          },
          { 
            name: "status", 
            label: "Estado", 
            type: "select",
            required: true,
            options: [
              { value: "NEW", label: "Nuevo" },
              { value: "CONTACTED", label: "Contactado" },
              { value: "QUALIFIED", label: "Calificado" },
              { value: "PROPOSAL", label: "Propuesta" },
              { value: "NEGOTIATION", label: "Negociación" },
              { value: "WON", label: "Ganado" },
              { value: "LOST", label: "Perdido" }
            ],
            placeholder: "Seleccionar estado",
            column: "left"
          },
          { 
            name: "priority", 
            label: "Prioridad", 
            type: "select",
            options: [
              { value: "URGENT", label: "Urgente" },
              { value: "HIGH", label: "Alta" },
              { value: "MEDIUM", label: "Media" },
              { value: "LOW", label: "Baja" }
            ],
            placeholder: "Seleccionar prioridad",
            column: "left"
          },
          { 
            name: "value", 
            label: "Valor", 
            type: "currency",
            placeholder: "0",
            column: "left"
          },
          { 
            name: "notes", 
            label: "Notas", 
            type: "textarea",
            placeholder: "Notas adicionales...",
            column: "left"
          },
          { 
            name: "phone", 
            label: "Teléfono", 
            type: "phone",
            placeholder: "+34 600 000 000",
            column: "right"
          },
          { 
            name: "email", 
            label: "Correo electrónico", 
            type: "email",
            placeholder: "ejemplo@empresa.com",
            column: "right"
          }
        ]}
        editMutation={CRM_MUTATIONS.UPDATE_LEAD}
        editFetcher={fetchApiCRM}
        editVariablesBuilder={(v, id) => {
          // Construir input solo con campos presentes (actualización parcial)
          const input: Record<string, any> = {};
          
          if (v.name !== undefined) input.name = v.name?.trim() || "";
          if (v.email !== undefined) input.email = v.email?.trim() || undefined;
          if (v.phone !== undefined) input.phone = v.phone?.trim() || undefined;
          if (v.company !== undefined) input.company = v.company?.trim() || undefined;
          if (v.position !== undefined) input.position = v.position?.trim() || undefined;
          if (v.source !== undefined) input.source = v.source || undefined;
          if (v.status !== undefined) input.status = v.status || "NEW";
          if (v.priority !== undefined) input.priority = v.priority || "MEDIUM";
          if (v.value !== undefined) input.value = v.value ? Number(v.value) : undefined;
          if (v.notes !== undefined) input.notes = v.notes?.trim() || undefined;
          
          return { id, input };
        }}
        editInitialData={selectedRow || undefined}
        onEditSuccess={() => {
          window.location.reload();
        }}
        onDelete={async () => {
          if (confirm("¿Estás seguro de eliminar este lead?")) {
            try {
              await fetchApiCRM({ query: CRM_MUTATIONS.DELETE_LEAD, variables: { id: selectedRow?.id } });
              setSelectedRow(null);
              window.location.reload();
            } catch (e: any) {
              alert(e?.message || "Error al eliminar");
            }
          }
        }}
        detailsSection={
          selectedRow ? (
            <div className="space-y-1">
              <EditableField
                label="Title"
                value={selectedRow.name || selectedRow.title}
                type="text"
                fieldType="Text"
                placeholder="Lead title"
                icon={getFieldIcon("title", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_LEAD,
                      variables: { id: selectedRow.id, input: { name: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, name: value });
                  } catch (e: any) {
                    console.error("Error updating title:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Value"
                value={selectedRow.value}
                type="currency"
                fieldType="Currency"
                placeholder="0"
                icon={getFieldIcon("value", 14)}
                formatValue={(val) => {
                  if (!val) return "";
                  return typeof val === "number" 
                    ? val.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
                    : String(val);
                }}
                parseValue={(val) => Number(val) || 0}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_LEAD,
                      variables: { id: selectedRow.id, input: { value: Number(value) } }
                    });
                    setSelectedRow({ ...selectedRow, value: Number(value) });
                  } catch (e: any) {
                    console.error("Error updating value:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Status"
                value={selectedRow.status}
                type="select"
                fieldType="Status"
                options={[
                  { value: "NEW", label: "New" },
                  { value: "CONTACTED", label: "Contacted" },
                  { value: "QUALIFIED", label: "Qualified" },
                  { value: "PROPOSAL", label: "Proposal" },
                  { value: "NEGOTIATION", label: "Negotiation" },
                  { value: "WON", label: "Won" },
                  { value: "LOST", label: "Lost" }
                ]}
                icon={getFieldIcon("status", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_LEAD,
                      variables: { id: selectedRow.id, input: { status: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, status: value });
                  } catch (e: any) {
                    console.error("Error updating status:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Priority"
                value={selectedRow.priority}
                type="select"
                fieldType="Priority"
                options={[
                  { value: "URGENT", label: "Urgent" },
                  { value: "HIGH", label: "High" },
                  { value: "MEDIUM", label: "Medium" },
                  { value: "LOW", label: "Low" }
                ]}
                icon={getFieldIcon("priority", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_LEAD,
                      variables: { id: selectedRow.id, input: { priority: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, priority: value });
                  } catch (e: any) {
                    console.error("Error updating priority:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Source"
                value={selectedRow.source}
                type="select"
                fieldType="Source"
                options={[
                  { value: "WEBSITE", label: "Website" },
                  { value: "REFERRAL", label: "Referral" },
                  { value: "SOCIAL", label: "Social Media" },
                  { value: "EVENT", label: "Event" },
                  { value: "COLD_OUTREACH", label: "Cold Outreach" },
                  { value: "ADVERTISEMENT", label: "Advertisement" },
                  { value: "PARTNER", label: "Partner" },
                  { value: "OTHER", label: "Other" }
                ]}
                icon={getFieldIcon("source", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_LEAD,
                      variables: { id: selectedRow.id, input: { source: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, source: value });
                  } catch (e: any) {
                    console.error("Error updating source:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Expected close date"
                value={selectedRow.expectedCloseDate}
                type="date"
                fieldType="Date"
                placeholder="MM/DD/YYYY"
                icon={getFieldIcon("date", 14)}
                formatValue={(val) => {
                  if (!val) return "";
                  try {
                    return new Date(val).toLocaleDateString('es-ES');
                  } catch {
                    return String(val);
                  }
                }}
                onSave={async (value) => {
                  // TODO: Implementar cuando el backend lo soporte
                  console.log("Saving expected close date:", value);
                }}
              />
            </div>
          ) : null
        }
        personSection={
          selectedRow ? (
            <div className="space-y-1">
              <EditableField
                label="Phone"
                value={selectedRow.phone}
                type="phone"
                fieldType="Phone"
                placeholder="+34 600 000 000"
                icon={getFieldIcon("phone", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_LEAD,
                      variables: { id: selectedRow.id, input: { phone: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, phone: value });
                  } catch (e: any) {
                    console.error("Error updating phone:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Email"
                value={selectedRow.email}
                type="email"
                fieldType="Email"
                placeholder="ejemplo@empresa.com"
                icon={getFieldIcon("email", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_LEAD,
                      variables: { id: selectedRow.id, input: { email: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, email: value });
                  } catch (e: any) {
                    console.error("Error updating email:", e);
                    throw e;
                  }
                }}
              />
            </div>
          ) : null
        }
        notesContent={
          selectedRow ? (
            <div>
              <NotesEditor
                value={selectedRow.notes}
                placeholder="Take a note, @name..."
                entityType="LEAD"
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_LEAD,
                      variables: { id: selectedRow.id, input: { notes: value } }
                    });
                    setSelectedRow({ ...selectedRow, notes: value });
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
              style={{
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
              }}
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
          selectedRow ? (
            <div className="space-y-4">
              <FileUploadZone
                entityId={selectedRow.id}
                entityType="LEAD"
                onUploadComplete={() => {
                  // Recargar archivos después de subir
                  window.location.reload();
                }}
              />
              <FileGallery
                entityId={selectedRow.id}
                entityType="LEAD"
              />
            </div>
          ) : null
        }
      />
    </div>
  );
}


