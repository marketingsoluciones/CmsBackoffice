import React, { useState, useEffect } from "react";
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
import { ContactsIcon } from "../Icons/index";
import ActionsMenu from "../Shared/ActionsMenu";
import { getFieldIcon } from "../Icons/ProfessionalIcons";
import VerificationBadge from "../Shared/VerificationBadge";
import DataQualityIndicator from "../Shared/DataQualityIndicator";
import ContactsStats from "./ContactsStats";
import { calculateDataQualityScore, calculateCompleteness } from "../../utils/contactDataQuality";

const defaultContactColumns: ColumnConfig[] = [
  { field: "fullName", label: "Nombre", visible: true, order: 0, width: 200, pinned: true, tooltip: "Nombre y apellido del contacto" },
  { field: "relationship", label: "Relación", visible: true, order: 1, width: 120, pinned: false, tooltip: "Tipo de relación" },
  { field: "email", label: "Email", visible: true, order: 2, width: 250, pinned: false, tooltip: "Correo electrónico" },
  { field: "phone", label: "Teléfono", visible: true, order: 3, width: 150, pinned: false, tooltip: "Número telefónico" },
  { field: "company", label: "Compañía", visible: true, order: 4, width: 200, pinned: false, tooltip: "Empresa asociada" },
  { field: "status", label: "Estado", visible: true, order: 5, width: 120, pinned: false, tooltip: "Estado del contacto" },
  { field: "dataQualityScore", label: "Calidad", visible: true, order: 6, width: 100, pinned: false, tooltip: "Score de calidad de datos" }
];

const GET_CRM_CONTACTS = CRM_QUERIES.GET_CONTACTS;

export default function ContactsCRM() {
  const [openCreate, setOpenCreate] = useState(false);
  const [editRow, setEditRow] = useState<any | null>(null);
  const [shareRow, setShareRow] = useState<any | null>(null);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | undefined>(undefined);
  const [labels] = useState<Array<{ id: string; name: string; color: string }>>([
    { id: "customer", name: "CUSTOMER", color: "#10B981" },
    { id: "prospect", name: "PROSPECT", color: "#3B82F6" },
  ]);
  const [owners] = useState<Array<{ id: string; name: string }>>([
    { id: "all", name: "Bodas de Hoy (you)" },
  ]);
  const { dispatch } = ToastContextProvider();
  const pushToast = (type: string, message: string) => {
    dispatch({ type: "ADD_TOAST", payload: { id: `${Date.now()}-${Math.random()}`, type, message } } as any);
  };
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [stats, setStats] = useState<{ total: number; favorites: number; clients: number; providers: number } | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  // Función para mapear valores de verificación del backend
  const mapVerificationStatus = (status: string | undefined, type: "email" | "phone" | "whatsapp"): "verified" | "unverified" | "bounced" | "invalid" | "active" | "inactive" | "not_registered" => {
    if (!status) return type === "whatsapp" ? "not_registered" : "unverified";
    // Backend usa: ACTIVE, INACTIVE, BOUNCED, UNSUBSCRIBED, BLOCKED, INVALID
    // Frontend espera: verified, unverified, bounced, invalid, active, inactive, not_registered
    const statusUpper = status.toUpperCase();
    if (statusUpper === "ACTIVE") return type === "whatsapp" ? "active" : "verified";
    if (statusUpper === "INACTIVE") return type === "whatsapp" ? "inactive" : "unverified";
    if (statusUpper === "BOUNCED") return "bounced";
    if (statusUpper === "INVALID") return "invalid";
    if (statusUpper === "BLOCKED") return "inactive";
    if (statusUpper === "UNSUBSCRIBED") return "inactive";
    return type === "whatsapp" ? "not_registered" : "unverified";
  };

  // Cargar estadísticas
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoadingStats(true);
        const response = await fetchApiCRM({ 
          query: CRM_QUERIES.GET_CONTACTS_STATS,
          variables: {}
        });
        if (response?.getCRMContactsStats?.success) {
          const statsData = response.getCRMContactsStats;
          // Calcular clientes y proveedores desde byRelationship
          const clients = statsData.byRelationship?.find((r: any) => r.key === "CLIENTE")?.count || 0;
          const providers = statsData.byRelationship?.find((r: any) => r.key === "PROVEEDOR")?.count || 0;
          setStats({
            total: statsData.total || 0,
            favorites: statsData.favorites || 0,
            clients,
            providers
          });
        }
      } catch (e: any) {
        console.error("Error loading stats:", e);
      } finally {
        setLoadingStats(false);
      }
    };
    loadStats();
  }, []);

  // Función para toggle de favorito
  const handleToggleStar = async (contactId: string, currentStarred: boolean) => {
    try {
      await fetchApiCRM({
        query: CRM_MUTATIONS.TOGGLE_CONTACT_STAR,
        variables: { id: contactId }
      });
      // Actualizar el contacto en selectedRow si está abierto
      if (selectedRow && selectedRow.id === contactId) {
        setSelectedRow({ ...selectedRow, starred: !currentStarred });
      }
      pushToast("success", `Contacto ${!currentStarred ? "agregado a" : "removido de"} favoritos`);
      // Recargar estadísticas
      window.location.reload();
    } catch (e: any) {
      pushToast("error", e?.message || "Error al actualizar favorito");
    }
  };
  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ minHeight: 0, maxHeight: '100vh', padding: '16px', backgroundColor: '#F9FAFB' }}>
      {/* Header compacto estilo Pipedrive */}
      <div className="flex items-center justify-between gap-4 flex-shrink-0 mb-3" style={{ paddingBottom: '12px', borderBottom: '1px solid #E5E7EB' }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-md" style={{ width: '40px', height: '40px', backgroundColor: '#D1FAE5' }}>
            <ContactsIcon width={20} fill="#10B981" />
          </div>
          <div>
            <h1 className="font-semibold" style={{ fontSize: '22px', lineHeight: '28px', color: '#111827', margin: 0 }}>Contactos</h1>
            <p className="text-xs" style={{ color: '#9CA3AF', marginTop: '2px', lineHeight: '16px' }}>
              Personas clave en tu CRM
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
          Crear Contacto
        </button>
      </div>
      {/* Estadísticas */}
      <ContactsStats
        total={stats?.total}
        favorites={stats?.favorites}
        clients={stats?.clients}
        providers={stats?.providers}
        loading={loadingStats}
      />
      <AdvancedTable
        title="Listado"
        entityType="CONTACT"
        defaultColumns={defaultContactColumns}
        query={GET_CRM_CONTACTS}
        variables={{ pagination: { page: 1, limit: 50 } }}
        mapResponse={(resp: any) => resp?.getCRMContacts?.contacts ?? []}
        fetcher={fetchApiCRM}
        enableCRMFeatures={true}
        onRowClick={(row) => setSelectedRow(row)}
        getRowId={(r: any) => r.id}
        labels={labels}
        selectedLabels={selectedLabels}
        onSelectLabels={setSelectedLabels}
        onCreateLabel={(name, color) => {
          const newLabel = { id: `label-${Date.now()}`, name, color };
          // labels se actualizarían aquí si fuera un estado mutable
        }}
        owners={owners}
        selectedOwnerId={selectedOwnerId}
        onSelectOwner={setSelectedOwnerId}
        onCreateFilter={() => {}}
        renderCell={(row: any, col) => {
          if (col.field === "status") {
            const statusColors: Record<string, { bg: string; text: string }> = {
              "ACTIVE": { bg: "#D1FAE5", text: "#047857" },
              "INACTIVE": { bg: "#F3F4F6", text: "#374151" },
            };
            const colors = statusColors[row.status] || { bg: "#DBEAFE", text: "#1D4ED8" };
            return <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bg, color: colors.text }}>{row.status}</span>;
          }
          if (col.field === "relationship") {
            const relationshipColors: Record<string, { bg: string; text: string }> = {
              "CLIENTE": { bg: "#D1FAE5", text: "#047857" },
              "PROSPECTO": { bg: "#DBEAFE", text: "#1D4ED8" },
              "PROVEEDOR": { bg: "#FEF3C7", text: "#D97706" },
              "SOCIO": { bg: "#EDE9FE", text: "#7C3AED" },
              "REFERIDO": { bg: "#FCE7F3", text: "#BE185D" },
              "PARTNER": { bg: "#E0E7FF", text: "#4F46E5" },
              "OTRO": { bg: "#F3F4F6", text: "#374151" },
            };
            const colors = relationshipColors[row.relationship] || { bg: "#F3F4F6", text: "#374151" };
            return <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bg, color: colors.text }}>{row.relationship || "-"}</span>;
          }
          if (col.field === "dataQualityScore") {
            const score = row.dataQualityScore ?? calculateDataQualityScore(row);
            return <DataQualityIndicator score={score} size="sm" />;
          }
          if (col.field === "email" && row.email) {
            const emailText = String(row.email);
            const truncatedEmail = emailText.length > 7 ? emailText.substring(0, 7) + '...' : emailText;
            return (
              <div className="flex items-center gap-2" style={{ width: '100%', minWidth: 0 }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0 }} title={emailText}>
                  {truncatedEmail}
                </span>
                <VerificationBadge 
                  status={mapVerificationStatus(row.emailStatus, "email")} 
                  type="email" 
                  size="sm" 
                  showText={false}
                />
              </div>
            );
          }
          if (col.field === "phone" && row.phone) {
            const phoneText = String(row.phone);
            const truncatedPhone = phoneText.length > 7 ? phoneText.substring(0, 7) + '...' : phoneText;
            return (
              <div className="flex items-center gap-2" style={{ width: '100%', minWidth: 0 }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0 }} title={phoneText}>
                  {truncatedPhone}
                </span>
                <VerificationBadge 
                  status={mapVerificationStatus(row.phoneStatus, "phone")} 
                  type="phone" 
                  size="sm" 
                  showText={false}
                />
              </div>
            );
          }
          return (row as any)[col.field];
        }}
      />
      <PipedriveFormModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        title="Añadir contacto"
        fields={[
          { name: "firstName", label: "Nombre", required: true, placeholder: "Nombre", column: "left" },
          { name: "lastName", label: "Apellido", required: true, placeholder: "Apellido", column: "left" },
          { name: "company", label: "Empresa", placeholder: "Nombre de la empresa", column: "left" },
          { name: "position", label: "Cargo", placeholder: "Título del trabajo", column: "left" },
          { name: "relationship", label: "Relación", type: "select", options: [
            { value: "CLIENTE", label: "Cliente" },
            { value: "PROSPECTO", label: "Prospecto" },
            { value: "PROVEEDOR", label: "Proveedor" },
            { value: "SOCIO", label: "Socio" },
            { value: "REFERIDO", label: "Referido" },
            { value: "PARTNER", label: "Partner" },
            { value: "OTRO", label: "Otro" }
          ], placeholder: "Seleccionar relación", column: "left" },
          { name: "status", label: "Estado", type: "select", options: [
            { value: "ACTIVE", label: "Activo" },
            { value: "INACTIVE", label: "Inactivo" }
          ], placeholder: "Seleccionar estado", column: "left" },
          { name: "type", label: "Tipo", type: "select", options: [
            { value: "INDIVIDUAL", label: "Individual" },
            { value: "ENTITY_CONTACT", label: "Contacto de entidad" }
          ], placeholder: "Seleccionar tipo", column: "left" },
          { name: "department", label: "Departamento", placeholder: "Departamento", column: "left" },
          { name: "industry", label: "Industria", placeholder: "Industria", column: "left" },
          { name: "website", label: "Sitio web", type: "text", placeholder: "https://ejemplo.com", column: "left" },
          { name: "linkedin", label: "LinkedIn", type: "text", placeholder: "URL de perfil de LinkedIn", column: "left" },
          { name: "address", label: "Dirección", type: "textarea", placeholder: "Dirección completa", column: "left" },
          { name: "state", label: "Estado/Provincia", placeholder: "Estado o provincia", column: "left" },
          { name: "postalCode", label: "Código postal", placeholder: "Código postal", column: "left" },
          { name: "country", label: "País", placeholder: "País", column: "left" },
          { name: "city", label: "Ciudad", placeholder: "Ciudad", column: "left" },
          { name: "phone", label: "Teléfono", type: "phone", placeholder: "+34 600 000 000", column: "right" },
          { name: "whatsapp", label: "WhatsApp", type: "phone", placeholder: "+34 600 000 000", column: "right" },
          { name: "email", label: "Correo electrónico", type: "email", placeholder: "ejemplo@empresa.com", column: "right" },
          { name: "observations", label: "Observaciones", type: "textarea", placeholder: "Notas adicionales", column: "right" },
          { name: "nextAction", label: "Próxima acción", placeholder: "Próxima acción a realizar", column: "right" }
        ]}
        mutation={CRM_MUTATIONS.CREATE_CONTACT}
        fetcher={fetchApiCRM}
        variablesBuilder={(v) => ({
          input: {
            firstName: v.firstName?.trim() || "",
            lastName: v.lastName?.trim() || "",
            email: v.email?.trim() || undefined,
            phone: v.phone?.trim() || undefined,
            whatsapp: v.whatsapp?.trim() || undefined,
            company: v.company?.trim() || undefined,
            position: v.position?.trim() || undefined,
            department: v.department?.trim() || undefined,
            industry: v.industry?.trim() || undefined,
            website: v.website?.trim() || undefined,
            linkedin: v.linkedin?.trim() || undefined,
            relationship: v.relationship || undefined,
            status: v.status || undefined,
            type: v.type || "INDIVIDUAL",
            address: v.address?.trim() || undefined,
            state: v.state?.trim() || undefined,
            postalCode: v.postalCode?.trim() || undefined,
            country: v.country?.trim() || undefined,
            city: v.city?.trim() || undefined,
            observations: v.observations?.trim() || undefined,
            nextAction: v.nextAction?.trim() || undefined
          }
        })}
        onSuccess={() => {
          setOpenCreate(false);
        }}
      />
      <ShareModal
        isOpen={!!shareRow}
        onClose={() => setShareRow(null)}
        entityId={shareRow?.id || ""}
        entityType="CONTACT"
        entityLabel="contacto"
        onSuccess={() => {
          // Recargar datos si es necesario
        }}
      />
      <PipedriveDetailModal
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        title={selectedRow?.fullName || "Detalle del Contacto"}
        entityType="CONTACT"
        editFields={[
          { name: "firstName", label: "Nombre", required: true, placeholder: "Nombre", column: "left" },
          { name: "lastName", label: "Apellido", required: true, placeholder: "Apellido", column: "left" },
          { name: "company", label: "Empresa", placeholder: "Nombre de la empresa", column: "left" },
          { name: "position", label: "Cargo", placeholder: "Título del trabajo", column: "left" },
          { name: "relationship", label: "Relación", type: "select", options: [
            { value: "CLIENTE", label: "Cliente" },
            { value: "PROSPECTO", label: "Prospecto" },
            { value: "PROVEEDOR", label: "Proveedor" },
            { value: "SOCIO", label: "Socio" },
            { value: "REFERIDO", label: "Referido" },
            { value: "PARTNER", label: "Partner" },
            { value: "OTRO", label: "Otro" }
          ], placeholder: "Seleccionar relación", column: "left" },
          { name: "status", label: "Estado", type: "select", options: [
            { value: "ACTIVE", label: "Activo" },
            { value: "INACTIVE", label: "Inactivo" }
          ], placeholder: "Seleccionar estado", column: "left" },
          { name: "type", label: "Tipo", type: "select", options: [
            { value: "INDIVIDUAL", label: "Individual" },
            { value: "ENTITY_CONTACT", label: "Contacto de entidad" }
          ], placeholder: "Seleccionar tipo", column: "left" },
          { name: "department", label: "Departamento", placeholder: "Departamento", column: "left" },
          { name: "industry", label: "Industria", placeholder: "Industria", column: "left" },
          { name: "website", label: "Sitio web", type: "text", placeholder: "https://ejemplo.com", column: "left" },
          { name: "linkedin", label: "LinkedIn", type: "text", placeholder: "URL de perfil de LinkedIn", column: "left" },
          { name: "address", label: "Dirección", type: "textarea", placeholder: "Dirección completa", column: "left" },
          { name: "state", label: "Estado/Provincia", placeholder: "Estado o provincia", column: "left" },
          { name: "postalCode", label: "Código postal", placeholder: "Código postal", column: "left" },
          { name: "country", label: "País", placeholder: "País", column: "left" },
          { name: "city", label: "Ciudad", placeholder: "Ciudad", column: "left" },
          { name: "phone", label: "Teléfono", type: "phone", placeholder: "+34 600 000 000", column: "right" },
          { name: "whatsapp", label: "WhatsApp", type: "phone", placeholder: "+34 600 000 000", column: "right" },
          { name: "email", label: "Correo electrónico", type: "email", placeholder: "ejemplo@empresa.com", column: "right" },
          { name: "observations", label: "Observaciones", type: "textarea", placeholder: "Notas adicionales", column: "right" },
          { name: "nextAction", label: "Próxima acción", placeholder: "Próxima acción a realizar", column: "right" }
        ]}
        editMutation={CRM_MUTATIONS.UPDATE_CONTACT}
        editFetcher={fetchApiCRM}
        editVariablesBuilder={(v, id) => {
          // Construir input solo con campos presentes (actualización parcial)
          const input: Record<string, any> = {};
          
          if (v.firstName !== undefined) input.firstName = v.firstName?.trim() || "";
          if (v.lastName !== undefined) input.lastName = v.lastName?.trim() || "";
          if (v.email !== undefined) input.email = v.email?.trim() || undefined;
          if (v.phone !== undefined) input.phone = v.phone?.trim() || undefined;
          if (v.whatsapp !== undefined) input.whatsapp = v.whatsapp?.trim() || undefined;
          if (v.company !== undefined) input.company = v.company?.trim() || undefined;
          if (v.position !== undefined) input.position = v.position?.trim() || undefined;
          if (v.department !== undefined) input.department = v.department?.trim() || undefined;
          if (v.industry !== undefined) input.industry = v.industry?.trim() || undefined;
          if (v.website !== undefined) input.website = v.website?.trim() || undefined;
          if (v.linkedin !== undefined) input.linkedin = v.linkedin?.trim() || undefined;
          if (v.relationship !== undefined) input.relationship = v.relationship || undefined;
          if (v.status !== undefined) input.status = v.status || undefined;
          if (v.type !== undefined) input.type = v.type || "INDIVIDUAL";
          if (v.address !== undefined) input.address = v.address?.trim() || undefined;
          if (v.state !== undefined) input.state = v.state?.trim() || undefined;
          if (v.postalCode !== undefined) input.postalCode = v.postalCode?.trim() || undefined;
          if (v.country !== undefined) input.country = v.country?.trim() || undefined;
          if (v.city !== undefined) input.city = v.city?.trim() || undefined;
          if (v.observations !== undefined) input.observations = v.observations?.trim() || undefined;
          if (v.nextAction !== undefined) input.nextAction = v.nextAction?.trim() || undefined;
          
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
          if (confirm("¿Estás seguro de eliminar este contacto?")) {
            try {
              setDeletingId(selectedRow?.id);
              await fetchApiCRM({ query: CRM_MUTATIONS.DELETE_CONTACT, variables: { id: selectedRow?.id } });
              pushToast("success", "El contacto ha sido eliminado.");
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
                label="First name"
                value={selectedRow.firstName}
                type="text"
                fieldType="Text"
                placeholder="First name"
                icon={getFieldIcon("firstName", 14)}
                required
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CONTACT,
                      variables: { id: selectedRow.id, input: { firstName: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, firstName: value });
                  } catch (e: any) {
                    console.error("Error updating first name:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Last name"
                value={selectedRow.lastName}
                type="text"
                fieldType="Text"
                placeholder="Last name"
                icon={getFieldIcon("firstName", 14)}
                required
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CONTACT,
                      variables: { id: selectedRow.id, input: { lastName: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, lastName: value });
                  } catch (e: any) {
                    console.error("Error updating last name:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Company"
                value={selectedRow.company}
                type="text"
                fieldType="Text"
                placeholder="Company name"
                icon={getFieldIcon("company", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CONTACT,
                      variables: { id: selectedRow.id, input: { company: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, company: value });
                  } catch (e: any) {
                    console.error("Error updating company:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="Position"
                value={selectedRow.position}
                type="text"
                fieldType="Text"
                placeholder="Job title"
                icon={getFieldIcon("position", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CONTACT,
                      variables: { id: selectedRow.id, input: { position: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, position: value });
                  } catch (e: any) {
                    console.error("Error updating position:", e);
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
                  { value: "ACTIVE", label: "Active" },
                  { value: "INACTIVE", label: "Inactive" }
                ]}
                icon={getFieldIcon("status", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CONTACT,
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
                label="Type"
                value={selectedRow.type}
                type="select"
                fieldType="Type"
                options={[
                  { value: "INDIVIDUAL", label: "Individual" },
                  { value: "COMPANY", label: "Company" }
                ]}
                icon={getFieldIcon("type", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CONTACT,
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
                label="Relationship"
                value={selectedRow.relationship}
                type="select"
                fieldType="Relationship"
                options={[
                  { value: "CLIENTE", label: "Cliente" },
                  { value: "PROSPECTO", label: "Prospecto" },
                  { value: "PROVEEDOR", label: "Proveedor" },
                  { value: "SOCIO", label: "Socio" },
                  { value: "REFERIDO", label: "Referido" },
                  { value: "PARTNER", label: "Partner" },
                  { value: "OTRO", label: "Otro" }
                ]}
                icon={getFieldIcon("source", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CONTACT,
                      variables: { id: selectedRow.id, input: { relationship: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, relationship: value });
                  } catch (e: any) {
                    console.error("Error updating relationship:", e);
                    throw e;
                  }
                }}
              />
              {/* Calidad de datos */}
              {selectedRow && (
                <div className="mt-2 pt-2" style={{ borderTop: "1px solid #E5E7EB" }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium" style={{ color: "#6B7280" }}>Calidad de datos</span>
                    <DataQualityIndicator 
                      score={selectedRow.dataQualityScore ?? calculateDataQualityScore(selectedRow)} 
                      size="sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium" style={{ color: "#6B7280" }}>Completitud</span>
                    <DataQualityIndicator 
                      score={selectedRow.completeness ?? calculateCompleteness(selectedRow)} 
                      size="sm"
                    />
                  </div>
                </div>
              )}
              <EditableField
                label="Country"
                value={selectedRow.country}
                type="text"
                fieldType="Text"
                placeholder="Country"
                icon={getFieldIcon("country", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CONTACT,
                      variables: { id: selectedRow.id, input: { country: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, country: value });
                  } catch (e: any) {
                    console.error("Error updating country:", e);
                    throw e;
                  }
                }}
              />
              <EditableField
                label="City"
                value={selectedRow.city}
                type="text"
                fieldType="Text"
                placeholder="City"
                icon={getFieldIcon("city", 14)}
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CONTACT,
                      variables: { id: selectedRow.id, input: { city: String(value) } }
                    });
                    setSelectedRow({ ...selectedRow, city: value });
                  } catch (e: any) {
                    console.error("Error updating city:", e);
                    throw e;
                  }
                }}
              />
            </div>
          ) : null
        }
        personSection={
          selectedRow ? (
            <div className="space-y-1">
              <div>
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
                        query: CRM_MUTATIONS.UPDATE_CONTACT,
                        variables: { id: selectedRow.id, input: { phone: String(value) } }
                      });
                      setSelectedRow({ ...selectedRow, phone: value });
                    } catch (e: any) {
                      console.error("Error updating phone:", e);
                      throw e;
                    }
                  }}
                />
                {selectedRow.phone && (
                  <div className="mt-1 ml-6">
                    <VerificationBadge 
                      status={mapVerificationStatus(selectedRow.phoneStatus, "phone")} 
                      type="phone" 
                      size="sm" 
                    />
                  </div>
                )}
              </div>
              <div>
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
                        query: CRM_MUTATIONS.UPDATE_CONTACT,
                        variables: { id: selectedRow.id, input: { email: String(value) } }
                      });
                      setSelectedRow({ ...selectedRow, email: value });
                    } catch (e: any) {
                      console.error("Error updating email:", e);
                      throw e;
                    }
                  }}
                />
                {selectedRow.email && (
                  <div className="mt-1 ml-6">
                    <VerificationBadge 
                      status={mapVerificationStatus(selectedRow.emailStatus, "email")} 
                      type="email" 
                      size="sm" 
                    />
                  </div>
                )}
              </div>
              {selectedRow.whatsapp && (
                <div>
                  <EditableField
                    label="WhatsApp"
                    value={selectedRow.whatsapp}
                    type="phone"
                    fieldType="Phone"
                    placeholder="+34 600 000 000"
                    icon={getFieldIcon("phone", 14)}
                    onSave={async (value) => {
                      try {
                        await fetchApiCRM({
                          query: CRM_MUTATIONS.UPDATE_CONTACT,
                          variables: { id: selectedRow.id, input: { whatsapp: String(value) } }
                        });
                        setSelectedRow({ ...selectedRow, whatsapp: value });
                      } catch (e: any) {
                        console.error("Error updating whatsapp:", e);
                        throw e;
                      }
                    }}
                  />
                  <div className="mt-1 ml-6">
                    <VerificationBadge 
                      status={mapVerificationStatus(selectedRow.whatsappStatus, "whatsapp")} 
                      type="whatsapp" 
                      size="sm" 
                    />
                  </div>
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
                entityType="CONTACT"
                onSave={async (value) => {
                  try {
                    await fetchApiCRM({
                      query: CRM_MUTATIONS.UPDATE_CONTACT,
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
            <h3 className="font-semibold mb-2" style={{ color: "#111827" }}>Close deals faster with better email</h3>
            <p className="text-sm mb-4" style={{ color: "#6B7280" }}>Smart, secure, configurable Sales Inbox</p>
          </div>
        }
        filesContent={
          selectedRow ? (
            <div className="space-y-4">
              <FileUploadZone
                entityId={selectedRow.id}
                entityType="CONTACT"
                onUploadComplete={() => {
                  window.location.reload();
                }}
              />
              <FileGallery
                entityId={selectedRow.id}
                entityType="CONTACT"
              />
            </div>
          ) : null
        }
      />
    </div>
  );
}


