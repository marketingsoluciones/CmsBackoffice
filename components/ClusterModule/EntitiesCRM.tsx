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
import { EntitiesIcon } from "../Icons/index";
import ActionsMenu from "../Shared/ActionsMenu";
import { getFieldIcon } from "../Icons/ProfessionalIcons";
import VerificationBadge from "../Shared/VerificationBadge";
import DataQualityIndicator from "../Shared/DataQualityIndicator";
import EntitiesStats from "./EntitiesStats";
import { calculateEntityDataQualityScore, calculateEntityCompleteness } from "../../utils/entityDataQuality";

const defaultEntityColumns: ColumnConfig[] = [
  { field: "name", label: "Nombre", visible: true, order: 0, width: 200, pinned: true, tooltip: "Nombre de la entidad/empresa" },
  { field: "type", label: "Tipo", visible: true, order: 1, width: 150, pinned: false, tooltip: "Tipo de entidad" },
  { field: "industry", label: "Industria", visible: true, order: 2, width: 150, pinned: false, tooltip: "Sector/industria" },
  { field: "size", label: "Tamaño", visible: true, order: 3, width: 120, pinned: false, tooltip: "Tamaño de la empresa" },
  { field: "email", label: "Email", visible: true, order: 4, width: 200, pinned: false, tooltip: "Correo electrónico" },
  { field: "phone", label: "Teléfono", visible: true, order: 5, width: 150, pinned: false, tooltip: "Número telefónico" },
  { field: "dataQualityScore", label: "Calidad", visible: true, order: 6, width: 100, pinned: false, tooltip: "Score de calidad de datos" },
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
  // Filtros generales (etiquetas y propietario)
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | undefined>(undefined);
  const [owners] = useState<Array<{ id: string; name: string }>>([
    { id: "all", name: "Bodas de Hoy (you)" },
  ]);
  const [stats, setStats] = useState<{ total: number; companies: number; organizations: number; partners: number } | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  // Función para mapear valores de verificación del backend
  const mapVerificationStatus = (status: string | undefined, type: "email" | "phone" | "website"): "verified" | "unverified" | "bounced" | "invalid" | "active" | "inactive" => {
    if (!status) return type === "website" ? "unverified" : "unverified";
    const statusUpper = status.toUpperCase();
    if (statusUpper === "ACTIVE") return type === "website" ? "verified" : "verified";
    if (statusUpper === "INACTIVE") return "unverified";
    if (statusUpper === "BOUNCED") return "bounced";
    if (statusUpper === "INVALID") return "invalid";
    if (statusUpper === "UNSUBSCRIBED") return "inactive";
    return "unverified";
  };

  // Cargar estadísticas
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoadingStats(true);
        const response = await fetchApiCRM({ 
          query: CRM_QUERIES.GET_ENTITIES_STATS,
          variables: {}
        });
        if (response?.getCRMEntitiesStats?.success) {
          const statsData = response.getCRMEntitiesStats;
          // Calcular empresas, organizaciones y socios desde byType
          const companies = statsData.byType?.find((t: any) => t.key === "COMPANY")?.count || 0;
          const organizations = statsData.byType?.find((t: any) => t.key === "ORGANIZATION")?.count || 0;
          const partners = statsData.byType?.find((t: any) => t.key === "ASSOCIATION")?.count || 0;
          setStats({
            total: statsData.total || 0,
            companies,
            organizations,
            partners
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
      {/* Estadísticas */}
      <EntitiesStats
        total={stats?.total}
        companies={stats?.companies}
        organizations={stats?.organizations}
        partners={stats?.partners}
        loading={loadingStats}
      />
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
        selectedLabels={selectedLabels}
        onSelectLabels={setSelectedLabels}
        owners={owners}
        selectedOwnerId={selectedOwnerId}
        onSelectOwner={setSelectedOwnerId}
        onCreateFilter={() => {
          console.log("Create filter clicked");
        }}
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
          if (col.field === "type") {
            const typeColors: Record<string, { bg: string; text: string }> = {
              "COMPANY": { bg: "#DBEAFE", text: "#1D4ED8" },
              "ORGANIZATION": { bg: "#D1FAE5", text: "#047857" },
              "ASSOCIATION": { bg: "#FEF3C7", text: "#D97706" },
              "GOVERNMENT": { bg: "#E5E7EB", text: "#374151" },
              "NON_PROFIT": { bg: "#FCE7F3", text: "#BE185D" },
              "INDIVIDUAL": { bg: "#EDE9FE", text: "#7C3AED" },
            };
            const colors = typeColors[row.type] || { bg: "#F3F4F6", text: "#374151" };
            return <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: colors.bg, color: colors.text }}>{row.type || "-"}</span>;
          }
          if (col.field === "dataQualityScore") {
            const score = row.dataQualityScore ?? calculateEntityDataQualityScore(row);
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
              { value: "ASSOCIATION", label: "Asociación" },
              { value: "GOVERNMENT", label: "Gobierno" },
              { value: "NON_PROFIT", label: "Sin ánimo de lucro" },
              { value: "INDIVIDUAL", label: "Individual" }
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
        variablesBuilder={(v) => ({
          input: {
            name: v.name?.trim() || "",
            type: v.type || "COMPANY",
            website: v.website?.trim() || undefined,
            phone: v.phone?.trim() || undefined,
            email: v.email?.trim() || undefined,
            industry: v.industry?.trim() || undefined,
            size: v.size || undefined,
            description: v.description?.trim() || undefined,
            source: v.source?.trim() || undefined,
            address: (v.address_street || v.address_city || v.address_state || v.address_zipCode || v.address_country) ? {
              street: v.address_street?.trim() || undefined,
              city: v.address_city?.trim() || undefined,
              state: v.address_state?.trim() || undefined,
              zipCode: v.address_zipCode?.trim() || undefined,
              country: v.address_country?.trim() || undefined
            } : undefined
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
        entityType="ENTITY"
        entityLabel="entidad"
        onSuccess={() => {
          // Recargar datos si es necesario
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
              { value: "ASSOCIATION", label: "Asociación" },
              { value: "GOVERNMENT", label: "Gobierno" },
              { value: "NON_PROFIT", label: "Sin ánimo de lucro" },
              { value: "INDIVIDUAL", label: "Individual" }
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
        editVariablesBuilder={(v, id) => {
          // Construir input solo con campos presentes (actualización parcial)
          const input: Record<string, any> = {};
          
          if (v.name !== undefined) input.name = v.name?.trim() || "";
          if (v.type !== undefined) input.type = v.type || "COMPANY";
          if (v.website !== undefined) input.website = v.website?.trim() || undefined;
          if (v.phone !== undefined) input.phone = v.phone?.trim() || undefined;
          if (v.email !== undefined) input.email = v.email?.trim() || undefined;
          if (v.industry !== undefined) input.industry = v.industry?.trim() || undefined;
          if (v.size !== undefined) input.size = v.size || undefined;
          if (v.description !== undefined) input.description = v.description?.trim() || undefined;
          if (v.source !== undefined) input.source = v.source?.trim() || undefined;
          
          // Manejar address parcialmente - solo incluir si hay algún campo de address
          if (v.address_street !== undefined || v.address_city !== undefined || 
              v.address_state !== undefined || v.address_zipCode !== undefined || 
              v.address_country !== undefined) {
            input.address = {};
            if (v.address_street !== undefined) input.address.street = v.address_street?.trim() || undefined;
            if (v.address_city !== undefined) input.address.city = v.address_city?.trim() || undefined;
            if (v.address_state !== undefined) input.address.state = v.address_state?.trim() || undefined;
            if (v.address_zipCode !== undefined) input.address.zipCode = v.address_zipCode?.trim() || undefined;
            if (v.address_country !== undefined) input.address.country = v.address_country?.trim() || undefined;
          }
          
          return { id, input };
        }}
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
                  { value: "ASSOCIATION", label: "Association" },
                  { value: "GOVERNMENT", label: "Government" },
                  { value: "NON_PROFIT", label: "Non-profit" },
                  { value: "INDIVIDUAL", label: "Individual" }
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
              {selectedRow.website && (
                <div className="mt-1 ml-6">
                  <VerificationBadge 
                    status={mapVerificationStatus(selectedRow.websiteStatus, "website")} 
                    type="email" 
                    size="sm" 
                  />
                </div>
              )}
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
                        query: CRM_MUTATIONS.UPDATE_ENTITY,
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
                        query: CRM_MUTATIONS.UPDATE_ENTITY,
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
              {/* Calidad de datos */}
              {selectedRow && (
                <div className="mt-2 pt-2" style={{ borderTop: "1px solid #E5E7EB" }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium" style={{ color: "#6B7280" }}>Calidad de datos</span>
                    <DataQualityIndicator 
                      score={selectedRow.dataQualityScore ?? calculateEntityDataQualityScore(selectedRow)} 
                      size="sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium" style={{ color: "#6B7280" }}>Completitud</span>
                    <DataQualityIndicator 
                      score={selectedRow.completeness ?? calculateEntityCompleteness(selectedRow)} 
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
          selectedRow ? (
            <div className="space-y-4">
              <FileUploadZone
                entityId={selectedRow.id}
                entityType="ENTITY"
                onUploadComplete={() => {
                  window.location.reload();
                }}
              />
              <FileGallery
                entityId={selectedRow.id}
                entityType="ENTITY"
              />
            </div>
          ) : null
        }
      />
    </div>
  );
}


