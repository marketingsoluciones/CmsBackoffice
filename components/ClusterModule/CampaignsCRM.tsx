import React, { useState, useEffect } from "react";
import { AdvancedTable, ColumnConfig } from "../Shared/AdvancedTable";
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
import CampaignForm from "./CampaignForm";
import CampaignsStats from "./CampaignsStats";

const defaultCampaignColumns: ColumnConfig[] = [
  { field: "name", label: "Nombre", visible: true, order: 0, width: undefined, pinned: false, tooltip: "Nombre de la campaña" },
  { field: "type", label: "Tipo", visible: true, order: 1, width: undefined, pinned: false, tooltip: "Canal (Email/SMS/WhatsApp)" },
  { field: "status", label: "Estado", visible: true, order: 2, width: undefined, pinned: false, tooltip: "Estado de envío" },
  { field: "objective", label: "Objetivo", visible: true, order: 3, width: undefined, pinned: false, tooltip: "Objetivo de la campaña" },
  { field: "budget", label: "Presupuesto", visible: true, order: 4, width: undefined, pinned: false, tooltip: "Presupuesto asignado" },
  { field: "scheduledAt", label: "Programada", visible: true, order: 5, width: undefined, pinned: false, tooltip: "Fecha programada" }
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
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // Filtros generales (etiquetas y propietario)
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | undefined>(undefined);
  const [owners] = useState<Array<{ id: string; name: string }>>([
    { id: "all", name: "Bodas de Hoy (you)" },
  ]);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const response = await fetchApiCRM({
        query: GET_CRM_CAMPAIGNS,
        variables: { pagination: { page: 1, limit: 1000 } },
      });
      const campaignsList = response?.getCRMCampaigns?.campaigns || [];
      setCampaigns(campaignsList);
    } catch (error) {
      console.error("Error loading campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

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
          onClick={() => setEditRow(null) || setOpenCreate(true)}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Crear Campaña
        </button>
      </div>
      <CampaignsStats campaigns={campaigns} loading={loading} />
      <AdvancedTable
        title="Listado"
        entityType="CAMPAIGN"
        defaultColumns={defaultCampaignColumns}
        query={GET_CRM_CAMPAIGNS}
        variables={{ pagination: { page: 1, limit: 50 } }}
        mapResponse={(resp: any) => {
          const campaignsList = resp?.getCRMCampaigns?.campaigns ?? [];
          setCampaigns(campaignsList);
          return campaignsList;
        }}
        fetcher={fetchApiCRM}
        enableCRMFeatures={true}
        onRowClick={(row) => setSelectedRow(row)}
        getRowId={(r: any) => r.id}
        selectedLabels={selectedLabels}
        onSelectLabels={setSelectedLabels}
        owners={owners}
        selectedOwnerId={selectedOwnerId}
        onSelectOwner={setSelectedOwnerId}
        onCreateFilter={() => {
          console.log("Create filter clicked");
        }}
        renderCell={(row: any, col) => {
          const isLastColumn = col.field === defaultCampaignColumns[defaultCampaignColumns.length - 1].field;
          const actionsMenu = isLastColumn ? (
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
          ) : null;

          // Función helper para truncar texto a 7 caracteres
          const truncateText = (text: string, maxLength: number = 7): string => {
            if (!text) return "-";
            const str = String(text);
            return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
          };

          // Función helper para obtener el texto completo para el tooltip
          const getFullText = (text: any): string => {
            if (!text) return "";
            return String(text);
          };

          if (col.field === "status") {
            const statusColors: Record<string, { bg: string; text: string }> = {
              "SENT": { bg: "#D1FAE5", text: "#047857" },
              "PAUSED": { bg: "#FEF3C7", text: "#B45309" },
              "CANCELLED": { bg: "#FEE2E2", text: "#DC2626" },
              "DRAFT": { bg: "#DBEAFE", text: "#1D4ED8" },
              "SCHEDULED": { bg: "#DBEAFE", text: "#1D4ED8" },
              "SENDING": { bg: "#DBEAFE", text: "#1D4ED8" },
              "RUNNING": { bg: "#D1FAE5", text: "#047857" },
              "COMPLETED": { bg: "#E9D5FF", text: "#6B21A8" },
            };
            const colors = statusColors[row.status] || { bg: "#DBEAFE", text: "#1D4ED8" };
            const statusText = truncateText(row.status || "-");
            return (
              <div className="flex items-center justify-between gap-2" style={{ width: '100%' }}>
                <span 
                  className="px-2 py-0.5 rounded text-xs whitespace-nowrap" 
                  style={{ backgroundColor: colors.bg, color: colors.text, borderRadius: "2px" }}
                  title={getFullText(row.status)}
                >
                  {statusText}
                </span>
                {actionsMenu}
              </div>
            );
          }
          if (col.field === "type") {
            const typeColors: Record<string, { bg: string; text: string }> = {
              "EMAIL": { bg: "#DBEAFE", text: "#1D4ED8" },
              "WHATSAPP": { bg: "#D1FAE5", text: "#047857" },
              "SMS": { bg: "#FEF3C7", text: "#B45309" },
            };
            const colors = typeColors[row.type] || { bg: "#F3F4F6", text: "#374151" };
            const typeText = truncateText(row.type || "-");
            return (
              <div className="flex items-center justify-between gap-2" style={{ width: '100%' }}>
                <span 
                  className="px-2 py-0.5 rounded text-xs whitespace-nowrap" 
                  style={{ backgroundColor: colors.bg, color: colors.text, borderRadius: "2px" }}
                  title={getFullText(row.type)}
                >
                  {typeText}
                </span>
                {actionsMenu}
              </div>
            );
          }
          if (col.field === "budget" && row.budget) {
            const budgetText = `€${parseFloat(row.budget).toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
            const truncatedBudget = truncateText(budgetText, 7);
            return (
              <div className="flex items-center justify-between gap-2" style={{ width: '100%' }}>
                <span className="whitespace-nowrap" title={budgetText}>{truncatedBudget}</span>
                {actionsMenu}
              </div>
            );
          }
          if (col.field === "scheduledAt" && row.scheduledAt) {
            const dateText = new Date(row.scheduledAt).toLocaleDateString('es-ES');
            const truncatedDate = truncateText(dateText, 7);
            return (
              <div className="flex items-center justify-between gap-2" style={{ width: '100%' }}>
                <span className="whitespace-nowrap" title={new Date(row.scheduledAt).toLocaleString()}>{truncatedDate}</span>
                {actionsMenu}
              </div>
            );
          }
          if (col.field === "objective" && row.objective) {
            const truncatedObjective = truncateText(row.objective, 7);
            return (
              <div className="flex items-center justify-between gap-2" style={{ width: '100%' }}>
                <span className="truncate whitespace-nowrap" title={getFullText(row.objective)}>{truncatedObjective}</span>
                {actionsMenu}
              </div>
            );
          }
          // Para otras columnas (name)
          const cellContent = (row as any)[col.field] || "-";
          const truncatedContent = truncateText(cellContent, 7);
          return (
            <div className="flex items-center justify-between gap-2" style={{ width: '100%' }}>
              <span className="truncate whitespace-nowrap" title={getFullText(cellContent)}>{truncatedContent}</span>
              {actionsMenu}
            </div>
          );
        }}
        renderActions={undefined}
      />
      <CampaignForm
        isOpen={openCreate || !!editRow}
        onClose={() => {
          setOpenCreate(false);
          setEditRow(null);
        }}
        campaignId={editRow?.id}
        initialData={editRow}
        onSuccess={() => {
          setOpenCreate(false);
          setEditRow(null);
          loadCampaigns();
        }}
      />
      <ShareModal
        isOpen={!!shareRow}
        onClose={() => setShareRow(null)}
        entityId={shareRow?.id || ""}
        entityType="CAMPAIGN"
        entityLabel="campaña"
        onSuccess={() => {
          // Recargar datos si es necesario
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
              { value: "SMS", label: "SMS" },
              { value: "SOCIAL", label: "Social Media" },
              { value: "SCRAPING", label: "Scraping" }
            ],
            placeholder: "Seleccionar tipo",
            column: "left"
          },
          { 
            name: "status", 
            label: "Estado", 
            type: "select",
            options: [
              { value: "DRAFT", label: "Borrador" },
              { value: "SCHEDULED", label: "Programada" },
              { value: "RUNNING", label: "En ejecución" },
              { value: "PAUSED", label: "Pausada" },
              { value: "COMPLETED", label: "Completada" },
              { value: "SENT", label: "Enviada" },
              { value: "CANCELLED", label: "Cancelada" }
            ],
            placeholder: "Seleccionar estado",
            column: "left"
          },
          { name: "objective", label: "Objetivo", type: "textarea", placeholder: "Objetivo de la campaña", column: "left" },
          { name: "budget", label: "Presupuesto (€)", type: "number", placeholder: "0", column: "left" },
          { name: "targetAudience", label: "Audiencia Objetivo", placeholder: "Ej: Novias 2025", column: "left" },
          { name: "startDate", label: "Fecha de Inicio", type: "date", placeholder: "YYYY-MM-DD", column: "left" },
          { name: "endDate", label: "Fecha de Fin", type: "date", placeholder: "YYYY-MM-DD", column: "left" },
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
          if (v.status !== undefined) input.status = v.status;
          if (v.objective !== undefined) input.objective = v.objective?.trim() || undefined;
          if (v.budget !== undefined) input.budget = parseFloat(v.budget) || 0;
          if (v.targetAudience !== undefined) input.targetAudience = v.targetAudience?.trim() || undefined;
          if (v.startDate !== undefined) input.startDate = v.startDate ? new Date(v.startDate).toISOString().split('T')[0] : undefined;
          if (v.endDate !== undefined) input.endDate = v.endDate ? new Date(v.endDate).toISOString().split('T')[0] : undefined;
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
          loadCampaigns();
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
                label="Nombre"
                value={selectedRow.name}
                type="text"
                fieldType="Text"
                placeholder="Nombre de la campaña"
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
                label="Tipo"
                value={selectedRow.type}
                type="select"
                fieldType="Type"
                options={[
                  { value: "EMAIL", label: "Email" },
                  { value: "WHATSAPP", label: "WhatsApp" },
                  { value: "SMS", label: "SMS" },
                  { value: "SOCIAL", label: "Social Media" },
                  { value: "SCRAPING", label: "Scraping" }
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
                label="Estado"
                value={selectedRow.status}
                type="select"
                fieldType="Status"
                options={[
                  { value: "DRAFT", label: "Borrador" },
                  { value: "SCHEDULED", label: "Programada" },
                  { value: "RUNNING", label: "En ejecución" },
                  { value: "PAUSED", label: "Pausada" },
                  { value: "COMPLETED", label: "Completada" },
                  { value: "SENT", label: "Enviada" },
                  { value: "CANCELLED", label: "Cancelada" }
                ]}
                icon={getFieldIcon("status", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CAMPAIGN,
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
                label="Objetivo"
                value={selectedRow.objective}
                type="textarea"
                fieldType="Text"
                placeholder="Objetivo de la campaña"
                icon={getFieldIcon("objective", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CAMPAIGN,
                      variables: { id: selectedRow.id, input: { objective: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, objective: value });
                  } catch (e: any) {
                    console.error("Error updating objective:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Presupuesto (€)"
                value={selectedRow.budget}
                type="number"
                fieldType="Currency"
                placeholder="0"
                icon={getFieldIcon("budget", 14)}
                formatValue={(val) => {
                  if (!val && val !== 0) return "";
                  return `€${parseFloat(String(val)).toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
                }}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CAMPAIGN,
                      variables: { id: selectedRow.id, input: { budget: parseFloat(String(value)) || 0 } }
                    });
                    setSelectedRow({ ...selectedRow, budget: parseFloat(String(value)) || 0 });
                  } catch (e: any) {
                    console.error("Error updating budget:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Audiencia Objetivo"
                value={selectedRow.targetAudience}
                type="text"
                fieldType="Text"
                placeholder="Ej: Novias 2025"
                icon={getFieldIcon("targetAudience", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CAMPAIGN,
                      variables: { id: selectedRow.id, input: { targetAudience: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, targetAudience: value });
                  } catch (e: any) {
                    console.error("Error updating targetAudience:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Fecha de Inicio"
                value={selectedRow.startDate ? (() => {
                  try {
                    const dateStr = String(selectedRow.startDate);
                    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                      return dateStr;
                    }
                    const date = new Date(dateStr);
                    if (!isNaN(date.getTime())) {
                      return date.toISOString().split('T')[0];
                    }
                  } catch (e) {}
                  return selectedRow.startDate;
                })() : undefined}
                type="date"
                fieldType="Date"
                placeholder="Fecha de inicio"
                icon={getFieldIcon("startDate", 14)}
                formatValue={(val) => {
                  if (!val) return "";
                  try {
                    if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
                      return new Date(val + "T00:00:00").toLocaleDateString('es-ES');
                    }
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
                        input: { startDate: value ? new Date(String(value)).toISOString().split('T')[0] : undefined }
                      }
                    });
                    setSelectedRow({ ...selectedRow, startDate: value });
                  } catch (e: any) {
                    console.error("Error updating startDate:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Fecha de Fin"
                value={selectedRow.endDate ? (() => {
                  try {
                    const dateStr = String(selectedRow.endDate);
                    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                      return dateStr;
                    }
                    const date = new Date(dateStr);
                    if (!isNaN(date.getTime())) {
                      return date.toISOString().split('T')[0];
                    }
                  } catch (e) {}
                  return selectedRow.endDate;
                })() : undefined}
                type="date"
                fieldType="Date"
                placeholder="Fecha de fin"
                icon={getFieldIcon("endDate", 14)}
                formatValue={(val) => {
                  if (!val) return "";
                  try {
                    if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
                      return new Date(val + "T00:00:00").toLocaleDateString('es-ES');
                    }
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
                        input: { endDate: value ? new Date(String(value)).toISOString().split('T')[0] : undefined }
                      }
                    });
                    setSelectedRow({ ...selectedRow, endDate: value });
                  } catch (e: any) {
                    console.error("Error updating endDate:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Programado"
                value={selectedRow.scheduledAt ? (() => {
                  try {
                    const dateStr = String(selectedRow.scheduledAt);
                    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                      return dateStr;
                    }
                    const date = new Date(dateStr);
                    if (!isNaN(date.getTime())) {
                      return date.toISOString().split('T')[0];
                    }
                  } catch (e) {}
                  return selectedRow.scheduledAt;
                })() : undefined}
                type="date"
                fieldType="Date"
                placeholder="Fecha programada"
                icon={getFieldIcon("scheduledAt", 14)}
                formatValue={(val) => {
                  if (!val) return "";
                  try {
                    if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
                      return new Date(val + "T00:00:00").toLocaleDateString('es-ES');
                    }
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
              <EditableField
                label="ID de Plantilla"
                value={selectedRow.templateId}
                type="text"
                fieldType="Text"
                placeholder="Ej: plantilla-123"
                icon={getFieldIcon("templateId", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CAMPAIGN,
                      variables: { id: selectedRow.id, input: { templateId: String(value) || undefined } }
                    });
                    setSelectedRow({ ...selectedRow, templateId: value });
                  } catch (e: any) {
                    console.error("Error updating template ID:", e);
                    throw e;
                  }
                }}
              />
              {selectedRow.tags && selectedRow.tags.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span style={{ color: "#6B7280", display: "flex", alignItems: "center" }}>{getFieldIcon("tags", 14)}</span>
                    <label className="text-xs font-medium" style={{ color: "#6B7280" }}>
                      Etiquetas
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(selectedRow.tags) ? selectedRow.tags.map((tag: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-sm text-xs font-medium"
                        style={{ backgroundColor: "#EFF6FF", color: "#1D4ED8", borderRadius: "2px" }}
                      >
                        {tag}
                      </span>
                    )) : (
                      <span className="text-xs" style={{ color: "#6B7280" }}>
                        {String(selectedRow.tags)}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {selectedRow.recipient_selection && (
                <div className="mb-2 p-2 rounded-sm" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "2px" }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span style={{ color: "#6B7280", display: "flex", alignItems: "center" }}>{getFieldIcon("recipient_selection", 14)}</span>
                    <label className="text-xs font-medium" style={{ color: "#6B7280" }}>
                      Selección de Destinatarios
                    </label>
                  </div>
                  {selectedRow.recipient_selection.events && selectedRow.recipient_selection.events.length > 0 && (
                    <div className="mb-1">
                      <span className="text-[10px] font-medium" style={{ color: "#9CA3AF" }}>Eventos: </span>
                      <span className="text-[10px]" style={{ color: "#6B7280" }}>
                        {selectedRow.recipient_selection.events.length} evento(s)
                      </span>
                    </div>
                  )}
                  {selectedRow.recipient_selection.lists && selectedRow.recipient_selection.lists.length > 0 && (
                    <div className="mb-1">
                      <span className="text-[10px] font-medium" style={{ color: "#9CA3AF" }}>Listas: </span>
                      <span className="text-[10px]" style={{ color: "#6B7280" }}>
                        {selectedRow.recipient_selection.lists.length} lista(s)
                      </span>
                    </div>
                  )}
                  {selectedRow.recipient_selection.tags && (
                    <div className="mb-1">
                      <span className="text-[10px] font-medium" style={{ color: "#9CA3AF" }}>Etiquetas: </span>
                      {selectedRow.recipient_selection.tags.include_tags && selectedRow.recipient_selection.tags.include_tags.length > 0 && (
                        <span className="text-[10px]" style={{ color: "#6B7280" }}>
                          Incluir: {selectedRow.recipient_selection.tags.include_tags.join(", ")}
                        </span>
                      )}
                      {selectedRow.recipient_selection.tags.exclude_tags && selectedRow.recipient_selection.tags.exclude_tags.length > 0 && (
                        <span className="text-[10px] ml-1" style={{ color: "#6B7280" }}>
                          Excluir: {selectedRow.recipient_selection.tags.exclude_tags.join(", ")}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
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


