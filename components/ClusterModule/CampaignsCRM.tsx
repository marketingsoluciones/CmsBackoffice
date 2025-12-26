import React, { useState } from "react";
import { AdvancedTable, ColumnConfig } from "../Shared/AdvancedTable";
import PipedriveFormModal from "../Shared/PipedriveFormModal";
import PipedriveDetailModal from "../Shared/PipedriveDetailModal";
import EditableField from "../Shared/EditableField";
import NotesEditor from "../Shared/NotesEditor";
import FileUploadZone from "../Shared/FileUploadZone";
import FileGallery from "../Shared/FileGallery";
import { CRM_MUTATIONS, CRM_QUERIES } from "../../utils/crmQueries";
import ShareModal from "./ShareModal";
import { ToastContextProvider } from "../../context/ToastContext";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { CampaignsIcon } from "../Icons/index";
import ActionsMenu from "../Shared/ActionsMenu";
import { getFieldIcon } from "../Icons/ProfessionalIcons";

const defaultCampaignColumns: ColumnConfig[] = [
  { field: "name", label: "Nombre", visible: true, order: 0, width: 200, pinned: false, tooltip: "Nombre de la campaña" },
  { field: "type", label: "Tipo", visible: true, order: 1, width: 120, pinned: false, tooltip: "Canal (Email/SMS/WhatsApp)" },
  { field: "status", label: "Estado", visible: true, order: 2, width: 120, pinned: false, tooltip: "Estado de envío" },
  { field: "scheduledAt", label: "Programada", visible: true, order: 4, width: 180, pinned: false, tooltip: "Fecha programada" }
];

const GET_CRM_CAMPAIGNS = CRM_QUERIES.GET_CAMPAIGNS;

export default function CampaignsCRM() {
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
          <div className="flex items-center justify-center rounded-md" style={{ width: '40px', height: '40px', backgroundColor: '#FEF3C7' }}>
            <CampaignsIcon width={20} fill="#F59E0B" />
          </div>
          <div>
            <h1 className="font-semibold" style={{ fontSize: '22px', lineHeight: '28px', color: '#111827', margin: 0 }}>Campañas</h1>
            <p className="text-xs" style={{ color: '#9CA3AF', marginTop: '2px', lineHeight: '16px' }}>
              Marketing y comunicación
            </p>
          </div>
        </div>
        <button
          className="px-3.5 py-1.5 rounded-sm text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
          style={{ backgroundColor: '#F59E0B', borderRadius: '2px' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#D97706';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#F59E0B';
          }}
          onClick={() => setOpenCreate(true)}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Crear Campaña
        </button>
      </div>
      <AdvancedTable
        title="Listado"
        entityType="CAMPAIGN"
        defaultColumns={defaultCampaignColumns}
        query={GET_CRM_CAMPAIGNS}
        variables={{ pagination: { page: 1, limit: 50 } }}
        mapResponse={(resp: any) => resp?.getCRMCampaigns?.campaigns ?? []}
        fetcher={fetchApiCRM}
        enableCRMFeatures={true}
        onRowClick={(row) => setSelectedRow(row)}
        getRowId={(r: any) => r.id}
        renderCell={(row: any, col) => {
          if (col.field === "status") {
            const statusColors: Record<string, { bg: string; text: string }> = {
              "SENT": { bg: "#D1FAE5", text: "#047857" },
              "PAUSED": { bg: "#FEF3C7", text: "#B45309" },
              "CANCELLED": { bg: "#FEE2E2", text: "#DC2626" },
              "DRAFT": { bg: "#DBEAFE", text: "#1D4ED8" },
              "SCHEDULED": { bg: "#DBEAFE", text: "#1D4ED8" },
              "SENDING": { bg: "#DBEAFE", text: "#1D4ED8" },
            };
            const colors = statusColors[row.status] || { bg: "#DBEAFE", text: "#1D4ED8" };
            return <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bg, color: colors.text }}>{row.status}</span>;
          }
          if (col.field === "scheduledAt" && row.scheduledAt) {
            return <span title={new Date(row.scheduledAt).toLocaleString()}>{new Date(row.scheduledAt).toLocaleDateString('es-ES')}</span>;
          }
          return (row as any)[col.field];
        }}
        renderActions={(row: any) => (
          <ActionsMenu
            onEdit={() => setEditRow(row)}
            onDelete={async () => {
              try {
                setDeletingId(row.id);
                await fetchApiCRM({ query: CRM_MUTATIONS.DELETE_CAMPAIGN, variables: { id: row.id } });
                pushToast("success", "La campaña ha sido eliminada.");
              } catch (e: any) {
                pushToast("error", e?.message || "Error al eliminar");
              } finally {
                setDeletingId(null);
              }
            }}
            onShare={() => setShareRow(row)}
            isDeleting={deletingId === row.id}
            editLabel="Editar campaña"
            deleteLabel="Eliminar campaña"
            shareLabel="Compartir campaña"
          />
        )}
      />
      <PipedriveFormModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        title="Añadir campaña"
        fields={[
          { name: "name", label: "Nombre", required: true, placeholder: "Nombre de la campaña", column: "left" },
          { 
            name: "type", 
            label: "Tipo", 
            type: "select",
            options: [
              { value: "EMAIL", label: "Correo electrónico" },
              { value: "WHATSAPP", label: "WhatsApp" },
              { value: "SMS", label: "SMS" }
            ],
            placeholder: "Seleccionar tipo",
            column: "left"
          },
          { name: "templateId", label: "ID de plantilla", placeholder: "Ej: plantilla-123", column: "left" },
          { name: "scheduledAt", label: "Programado", type: "datetime-local", placeholder: "Fecha y hora programada", column: "left" },
          { name: "notes", label: "Notas", type: "textarea", placeholder: "Notas adicionales...", column: "left" },
          { name: "tags", label: "Etiquetas (separadas por comas)", placeholder: "Ej: marketing, promoción", column: "left" }
        ]}
        mutation={CRM_MUTATIONS.CREATE_CAMPAIGN}
        fetcher={fetchApiCRM}
        variablesBuilder={(v) => ({
          input: {
            name: v.name?.trim() || "",
            type: v.type || "EMAIL",
            templateId: v.templateId?.trim() || undefined,
            settings: {}, // Requerido según backend
            scheduledAt: v.scheduledAt ? new Date(v.scheduledAt).toISOString() : undefined,
            notes: v.notes?.trim() || undefined,
            tags: v.tags ? v.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0) : undefined
          }
        })}
        onSuccess={() => {
          setOpenCreate(false);
        }}
      />
      <ShareModal
        isOpen={!!shareRow}
        onClose={() => setShareRow(null)}
        entityLabel="campaña"
        onSubmit={async (payload) => {
          if (!shareRow?.id) return;
          await fetchApiCRM({ query: CRM_MUTATIONS.SHARE_CAMPAIGN, variables: { campaignId: shareRow.id, input: payload } });
        }}
      />
      <PipedriveDetailModal
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        title={selectedRow?.name || "Detalle de la Campaña"}
        entityType="CAMPAIGN"
        editFields={[
          { name: "name", label: "Nombre", required: true, placeholder: "Nombre de la campaña", column: "left" },
          { 
            name: "type", 
            label: "Tipo", 
            type: "select",
            options: [
              { value: "EMAIL", label: "Correo electrónico" },
              { value: "WHATSAPP", label: "WhatsApp" },
              { value: "SMS", label: "SMS" }
            ],
            placeholder: "Seleccionar tipo",
            column: "left"
          },
          { name: "templateId", label: "ID de plantilla", placeholder: "Ej: plantilla-123", column: "left" },
          { name: "scheduledAt", label: "Programado", type: "datetime-local", placeholder: "Fecha y hora programada", column: "left" },
          { name: "notes", label: "Notas", type: "textarea", placeholder: "Notas adicionales...", column: "left" },
          { name: "tags", label: "Etiquetas (separadas por comas)", placeholder: "Ej: marketing, promoción", column: "left" }
        ]}
        editMutation={CRM_MUTATIONS.UPDATE_CAMPAIGN}
        editFetcher={fetchApiCRM}
        editVariablesBuilder={(v, id) => {
          // Construir input solo con campos presentes (actualización parcial)
          const input: Record<string, any> = {};
          
          if (v.name !== undefined) input.name = v.name?.trim() || "";
          if (v.type !== undefined) input.type = v.type || "EMAIL";
          if (v.templateId !== undefined) input.templateId = v.templateId?.trim() || undefined;
          if (v.scheduledAt !== undefined) input.scheduledAt = v.scheduledAt ? new Date(v.scheduledAt).toISOString() : undefined;
          if (v.notes !== undefined) input.notes = v.notes?.trim() || undefined;
          if (v.tags !== undefined) {
            input.tags = v.tags ? v.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0) : undefined;
          }
          // settings solo se incluye si se está modificando explícitamente
          // Si no se envía, el backend mantendrá el settings actual
          
          return { id, input };
        }}
        editInitialData={selectedRow || undefined}
        onEditSuccess={() => {
          setSelectedRow(null);
          window.location.reload();
        }}
        onShare={() => {
          setShareRow(selectedRow);
          setSelectedRow(null);
        }}
        onDelete={async () => {
          if (confirm("¿Estás seguro de eliminar esta campaña?")) {
            try {
              setDeletingId(selectedRow?.id);
              await fetchApiCRM({ query: CRM_MUTATIONS.DELETE_CAMPAIGN, variables: { id: selectedRow?.id } });
              pushToast("success", "La campaña ha sido eliminada.");
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
                placeholder="Campaign name"
                icon={getFieldIcon("name", 14)}
                required
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CAMPAIGN,
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
                  { value: "EMAIL", label: "Email" },
                  { value: "SMS", label: "SMS" },
                  { value: "PUSH", label: "Push Notification" }
                ]}
                icon={getFieldIcon("type", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CAMPAIGN,
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
                label="Template ID"
                value={selectedRow.templateId}
                type="text"
                fieldType="Text"
                placeholder="Template ID"
                icon={getFieldIcon("title", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CAMPAIGN,
                      variables: { id: selectedRow.id, input: { templateId: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, templateId: value });
                  } catch (e: any) {
                    console.error("Error updating template ID:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Scheduled"
                value={selectedRow.scheduledAt}
                type="date"
                fieldType="Date"
                placeholder="Scheduled date"
                icon={getFieldIcon("scheduledAt", 14)}
                formatValue={(val) => {
                  if (!val) return "";
                  try {
                    return new Date(val).toLocaleDateString('es-ES');
                  } catch {
                    return String(val);
                  }
                }}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CAMPAIGN,
                      variables: {
                        id: selectedRow.id,
                        input: { scheduledAt: value ? new Date(String(value)).toISOString() : undefined }
                      }
                    });
                    setSelectedRow({ ...selectedRow, scheduledAt: value });
                  } catch (e: any) {
                    console.error("Error updating scheduled date:", e);
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
                entityType="CAMPAIGN"
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CAMPAIGN,
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
          selectedRow ? (
            <div className="space-y-4">
              <FileUploadZone
                entityId={selectedRow.id}
                entityType="CAMPAIGN"
                onUploadComplete={() => {
                  window.location.reload();
                }}
              />
              <FileGallery
                entityId={selectedRow.id}
                entityType="CAMPAIGN"
              />
            </div>
          ) : null
        }
      />
    </div>
  );
}


