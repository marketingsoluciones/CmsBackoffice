import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { CRM_MUTATIONS, CRM_QUERIES } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { ToastContextProvider } from "../../context/ToastContext";
import EventSelector from "./EventSelector";
import ListSelector from "./ListSelector";
import TagSelector from "./TagSelector";
import TemplateSelector from "./TemplateSelector";
import SearchTermsEditor, { SearchTerm } from "./SearchTermsEditor";
import TemplatesModal from "./TemplatesModal";
import { useCRMLabels } from "../../hooks/useCRMLabels";

interface CampaignFormProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId?: string;
  initialData?: any;
  onSuccess?: () => void;
}

export default function CampaignForm({
  isOpen,
  onClose,
  campaignId,
  initialData,
  onSuccess,
}: CampaignFormProps) {
  const [activeTab, setActiveTab] = useState<"basic" | "scraping" | "recipients" | "settings">("basic");
  const { dispatch } = ToastContextProvider();
  const pushToast = (type: string, message: string) => {
    dispatch({ type: "ADD_TOAST", payload: { id: `${Date.now()}-${Math.random()}`, type, message } } as any);
  };

  // Estado para selección de destinatarios
  const [selectedEvents, setSelectedEvents] = useState<any[]>(initialData?.recipient_selection?.events || []);
  const [selectedLists, setSelectedLists] = useState<any[]>(initialData?.recipient_selection?.lists || []);
  const [includeTags, setIncludeTags] = useState<string[]>(initialData?.recipient_selection?.tags?.include_tags || []);
  const [excludeTags, setExcludeTags] = useState<string[]>(initialData?.recipient_selection?.tags?.exclude_tags || []);
  const [matchAllTags, setMatchAllTags] = useState<boolean>(initialData?.recipient_selection?.tags?.match_all || false);

  // Cargar tags disponibles
  const { labels } = useCRMLabels("CAMPAIGN");
  const availableTags = labels.map((l) => l.name);

  // Estado para templates
  const [templates, setTemplates] = useState<any[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [templatesModalOpen, setTemplatesModalOpen] = useState(false);

  // Estado para scraping
  const [searchTerms, setSearchTerms] = useState<SearchTerm[]>(
    initialData?.searchTerms || []
  );
  const [selectedCountries, setSelectedCountries] = useState<string[]>(
    initialData?.searchConfig?.countries || []
  );

  // Lista de países disponibles
  const availableCountries = [
    { code: "ES", name: "España" },
    { code: "MX", name: "México" },
    { code: "AR", name: "Argentina" },
    { code: "CO", name: "Colombia" },
    { code: "CL", name: "Chile" },
    { code: "PE", name: "Perú" },
    { code: "EC", name: "Ecuador" },
    { code: "VE", name: "Venezuela" },
    { code: "GT", name: "Guatemala" },
    { code: "CU", name: "Cuba" },
    { code: "BO", name: "Bolivia" },
    { code: "DO", name: "República Dominicana" },
    { code: "HN", name: "Honduras" },
    { code: "PY", name: "Paraguay" },
    { code: "SV", name: "El Salvador" },
    { code: "NI", name: "Nicaragua" },
    { code: "CR", name: "Costa Rica" },
    { code: "PA", name: "Panamá" },
    { code: "UY", name: "Uruguay" },
    { code: "PR", name: "Puerto Rico" },
    { code: "US", name: "Estados Unidos" },
    { code: "PT", name: "Portugal" },
    { code: "BR", name: "Brasil" },
    { code: "FR", name: "Francia" },
    { code: "IT", name: "Italia" },
    { code: "DE", name: "Alemania" },
    { code: "GB", name: "Reino Unido" },
  ];

  // Definir initialValues antes de usarlo en useEffect
  const initialValues = {
    name: initialData?.name || "",
    type: initialData?.type || "EMAIL",
    status: initialData?.status || "DRAFT",
    objective: initialData?.objective || "",
    budget: initialData?.budget || 0,
    targetAudience: initialData?.targetAudience || "",
    startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split("T")[0] : "",
    endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().split("T")[0] : "",
    scheduledAt: initialData?.scheduledAt ? new Date(initialData.scheduledAt).toISOString().slice(0, 16) : "",
    templateId: initialData?.templateId || "",
    notes: initialData?.notes || "",
    tags: initialData?.tags?.join(", ") || "",
  };

  const loadTemplates = async () => {
    try {
      setLoadingTemplates(true);
      const response = await fetchApiCRM({
        query: CRM_QUERIES.GET_CAMPAIGN_TEMPLATES,
        variables: {
          type: initialValues.type, // EMAIL, WHATSAPP, SMS
          pagination: { page: 1, limit: 100 },
        },
      });
      if (response?.getCampaignTemplates?.success) {
        setTemplates(response.getCampaignTemplates.templates || []);
      } else {
        console.error("Error loading templates:", response?.getCampaignTemplates?.errors);
        setTemplates([]);
      }
    } catch (error) {
      console.error("Error loading templates:", error);
      setTemplates([]);
    } finally {
      setLoadingTemplates(false);
    }
  };

  useEffect(() => {
    if (isOpen && initialValues.type) {
      loadTemplates();
    }
  }, [isOpen, initialData?.type]);

  if (!isOpen) return null;

  const handleSubmit = async (values: any) => {
    try {
      const input: any = {
        name: values.name.trim(),
        type: values.type,
        settings: {},
      };

      if (values.objective) input.objective = values.objective.trim();
      if (values.budget) input.budget = parseFloat(values.budget) || 0;
      if (values.targetAudience) input.targetAudience = values.targetAudience.trim();
      if (values.startDate) input.startDate = new Date(values.startDate).toISOString();
      if (values.endDate) input.endDate = new Date(values.endDate).toISOString();
      if (values.scheduledAt) input.scheduledAt = new Date(values.scheduledAt).toISOString();
      
      // Template es requerido para EMAIL, WHATSAPP y SMS según el backend
      if (values.type === "EMAIL" || values.type === "WHATSAPP" || values.type === "SMS") {
        if (!values.templateId || values.templateId.trim() === "") {
          pushToast("error", "El template es requerido para este tipo de campaña");
          return;
        }
        input.templateId = values.templateId.trim();
      } else if (values.templateId) {
        input.templateId = values.templateId.trim();
      }
      
      if (values.notes) input.notes = values.notes.trim();
      if (values.tags) {
        input.tags = values.tags
          .split(",")
          .map((t: string) => t.trim())
          .filter((t: string) => t.length > 0);
      }

      // Agregar selección de destinatarios si hay alguna seleccionada (solo para campañas de envío)
      if (
        values.type !== "SCRAPING" &&
        (selectedEvents.length > 0 ||
          selectedLists.length > 0 ||
          includeTags.length > 0 ||
          excludeTags.length > 0)
      ) {
        input.recipient_selection = {
          events: selectedEvents,
          lists: selectedLists,
          tags: {
            include_tags: includeTags,
            exclude_tags: excludeTags,
            match_all: matchAllTags,
          },
        };
      }

      // Agregar configuración de scraping si es campaña de scraping
      if (values.type === "SCRAPING") {
        if (searchTerms.length === 0) {
          pushToast("error", "Debes agregar al menos un término de búsqueda");
          return;
        }
        if (selectedCountries.length === 0) {
          pushToast("error", "Debes seleccionar al menos un país objetivo");
          return;
        }
        input.searchTerms = searchTerms;
        input.searchConfig = {
          countries: selectedCountries,
        };
      }

      if (campaignId) {
        await fetchApiCRM({
          query: CRM_MUTATIONS.UPDATE_CAMPAIGN,
          variables: { id: campaignId, input },
        });
        pushToast("success", "Campaña actualizada correctamente");
      } else {
        await fetchApiCRM({
          query: CRM_MUTATIONS.CREATE_CAMPAIGN,
          variables: { input },
        });
        pushToast("success", "Campaña creada correctamente");
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      pushToast("error", error?.message || "Error al guardar la campaña");
    }
  };

  const tabs = [
    { id: "basic", label: "Información Básica" },
    ...(initialValues.type === "SCRAPING"
      ? [{ id: "scraping" as const, label: "Scraping" }]
      : []),
    ...(initialValues.type !== "SCRAPING"
      ? [{ id: "recipients" as const, label: "Destinatarios" }]
      : []),
    { id: "settings", label: "Configuración" },
  ];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] rounded-sm shadow-xl flex flex-col"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #F3F4F6",
          borderRadius: "2px",
          position: "relative",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid #E5E7EB", backgroundColor: "#F9FAFB" }}
        >
          <h3 className="text-base font-semibold" style={{ color: "#111827" }}>
            {campaignId ? "Editar Campaña" : "Nueva Campaña"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-sm transition-colors"
            style={{ color: "#6B7280" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-4" style={{ backgroundColor: "#FFFFFF" }}>
          {tabs.map((tab) => {
            // Mostrar pestaña scraping solo si el tipo es SCRAPING
            if (tab.id === "scraping" && initialValues.type !== "SCRAPING") return null;
            // Mostrar pestaña recipients solo si el tipo NO es SCRAPING
            if (tab.id === "recipients" && initialValues.type === "SCRAPING") return null;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="px-4 py-2 text-xs font-medium transition-colors relative"
                style={{
                  color: activeTab === tab.id ? "#3B82F6" : "#6B7280",
                  borderBottom: activeTab === tab.id ? "2px solid #3B82F6" : "2px solid transparent",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, handleChange, handleBlur, errors, touched, isSubmitting, setFieldValue }) => {
            // Escuchar evento de selección de template desde el modal
            useEffect(() => {
              const handleTemplateSelected = (e: any) => {
                setFieldValue('templateId', e.detail.templateId);
                // Recargar templates para que aparezca el seleccionado
                loadTemplates();
              };
              if (typeof window !== 'undefined') {
                window.addEventListener('templateSelected', handleTemplateSelected as any);
                return () => window.removeEventListener('templateSelected', handleTemplateSelected as any);
              }
            }, [setFieldValue]);

            // Actualizar tabs cuando cambia el tipo
            const currentTabs = [
              { id: "basic", label: "Información Básica" },
              ...(values.type === "SCRAPING"
                ? [{ id: "scraping" as const, label: "Scraping" }]
                : []),
              ...(values.type !== "SCRAPING"
                ? [{ id: "recipients" as const, label: "Destinatarios" }]
                : []),
              { id: "settings", label: "Configuración" },
            ];

            // Si cambia el tipo y la pestaña actual no es válida, cambiar a basic
            if (
              activeTab === "recipients" &&
              values.type === "SCRAPING"
            ) {
              setTimeout(() => setActiveTab("basic"), 0);
            }
            if (activeTab === "scraping" && values.type !== "SCRAPING") {
              setTimeout(() => setActiveTab("basic"), 0);
            }

            // Limpiar templateId si cambia el tipo y no es compatible
            if (
              values.type === "SCRAPING" &&
              values.templateId &&
              !["EMAIL", "WHATSAPP", "SMS"].includes(values.type)
            ) {
              setTimeout(() => setFieldValue("templateId", ""), 0);
            }

            return (
              <Form className="flex-1 overflow-y-auto px-4 py-4">
                {activeTab === "basic" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium block mb-1" style={{ color: "#6B7280" }}>
                      Nombre de la Campaña *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none"
                      style={{
                        border: "1px solid #E5E7EB",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "2px",
                      }}
                      placeholder="Ej: Promoción Verano 2025"
                    />
                    {errors.name && touched.name && (
                      <p className="text-xs mt-1" style={{ color: "#DC2626" }}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium block mb-1" style={{ color: "#6B7280" }}>
                        Tipo *
                      </label>
                      <select
                        name="type"
                        value={values.type}
                        onChange={(e) => {
                          handleChange(e);
                          // Limpiar templateId si cambia a SCRAPING
                          if (e.target.value === "SCRAPING") {
                            setFieldValue("templateId", "");
                          }
                        }}
                        className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none"
                        style={{
                          border: "1px solid #E5E7EB",
                          backgroundColor: "#FFFFFF",
                          borderRadius: "2px",
                        }}
                      >
                        <option value="EMAIL">Correo electrónico</option>
                        <option value="WHATSAPP">WhatsApp</option>
                        <option value="SMS">SMS</option>
                        <option value="SOCIAL">Social Media</option>
                        <option value="SCRAPING">Scraping</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium block mb-1" style={{ color: "#6B7280" }}>
                        Estado
                      </label>
                      <select
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none"
                        style={{
                          border: "1px solid #E5E7EB",
                          backgroundColor: "#FFFFFF",
                          borderRadius: "2px",
                        }}
                      >
                        <option value="DRAFT">Borrador</option>
                        <option value="SCHEDULED">Programada</option>
                        <option value="RUNNING">En ejecución</option>
                        <option value="PAUSED">Pausada</option>
                        <option value="COMPLETED">Completada</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium block mb-1" style={{ color: "#6B7280" }}>
                      Objetivo
                    </label>
                    <textarea
                      name="objective"
                      value={values.objective}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={3}
                      className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none"
                      style={{
                        border: "1px solid #E5E7EB",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "2px",
                      }}
                      placeholder="Describe el objetivo de esta campaña..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium block mb-1" style={{ color: "#6B7280" }}>
                        Presupuesto (€)
                      </label>
                      <input
                        type="number"
                        name="budget"
                        value={values.budget}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none"
                        style={{
                          border: "1px solid #E5E7EB",
                          backgroundColor: "#FFFFFF",
                          borderRadius: "2px",
                        }}
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium block mb-1" style={{ color: "#6B7280" }}>
                        Audiencia Objetivo
                      </label>
                      <input
                        type="text"
                        name="targetAudience"
                        value={values.targetAudience}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none"
                        style={{
                          border: "1px solid #E5E7EB",
                          backgroundColor: "#FFFFFF",
                          borderRadius: "2px",
                        }}
                        placeholder="Ej: Clientes VIP, Nuevos leads..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium block mb-1" style={{ color: "#6B7280" }}>
                        Fecha de Inicio
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={values.startDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none"
                        style={{
                          border: "1px solid #E5E7EB",
                          backgroundColor: "#FFFFFF",
                          borderRadius: "2px",
                        }}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium block mb-1" style={{ color: "#6B7280" }}>
                        Fecha de Fin
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={values.endDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min={values.startDate}
                        className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none"
                        style={{
                          border: "1px solid #E5E7EB",
                          backgroundColor: "#FFFFFF",
                          borderRadius: "2px",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium block mb-1" style={{ color: "#6B7280" }}>
                      Programado para
                    </label>
                    <input
                      type="datetime-local"
                      name="scheduledAt"
                      value={values.scheduledAt}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none"
                      style={{
                        border: "1px solid #E5E7EB",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "2px",
                      }}
                    />
                  </div>
                </div>
              )}

              {activeTab === "scraping" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold mb-3" style={{ color: "#111827" }}>
                      Configuración de Scraping
                    </h4>
                    <p className="text-xs mb-4" style={{ color: "#6B7280" }}>
                      Configura los países objetivo y los términos de búsqueda para esta campaña de scraping.
                    </p>
                  </div>

                  {/* Países objetivo */}
                  <div>
                    <label className="text-xs font-medium block mb-2" style={{ color: "#6B7280" }}>
                      Países Objetivo *
                    </label>
                    <div
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-64 overflow-y-auto p-2 rounded-sm"
                      style={{
                        border: "1px solid #E5E7EB",
                        backgroundColor: "#F9FAFB",
                        borderRadius: "2px",
                      }}
                    >
                      {availableCountries.map((country) => {
                        const isSelected = selectedCountries.includes(country.code);
                        return (
                          <label
                            key={country.code}
                            className="flex items-center gap-2 p-2 rounded-sm cursor-pointer transition-colors"
                            style={{
                              backgroundColor: isSelected ? "#EFF6FF" : "transparent",
                              borderRadius: "2px",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedCountries([...selectedCountries, country.code]);
                                } else {
                                  setSelectedCountries(
                                    selectedCountries.filter((c) => c !== country.code)
                                  );
                                }
                              }}
                              className="w-4 h-4 rounded-sm"
                              style={{ accentColor: "#3B82F6" }}
                            />
                            <span className="text-xs" style={{ color: "#374151" }}>
                              {country.name}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {selectedCountries.length > 0 && (
                      <div className="mt-2 text-[10px]" style={{ color: "#047857" }}>
                        {selectedCountries.length} país(es) seleccionado(s)
                      </div>
                    )}
                  </div>

                  {/* Términos de búsqueda */}
                  <div>
                    <label className="text-xs font-medium block mb-2" style={{ color: "#6B7280" }}>
                      Términos de Búsqueda *
                    </label>
                    <SearchTermsEditor
                      terms={searchTerms}
                      onChange={setSearchTerms}
                      showStats={false}
                    />
                  </div>

                  {/* Resumen */}
                  {searchTerms.length > 0 && selectedCountries.length > 0 && (
                    <div
                      className="p-3 rounded-sm"
                      style={{
                        backgroundColor: "#EFF6FF",
                        border: "1px solid #BFDBFE",
                        borderRadius: "2px",
                      }}
                    >
                      <div className="text-xs font-medium mb-1" style={{ color: "#1E40AF" }}>
                        Resumen de Configuración
                      </div>
                      <div className="text-[10px] space-y-1" style={{ color: "#3B82F6" }}>
                        <div>
                          • {searchTerms.filter((t) => t.enabled).length} término(s) activo(s) de{" "}
                          {searchTerms.length} total
                        </div>
                        <div>• {selectedCountries.length} país(es) objetivo</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "recipients" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold mb-3" style={{ color: "#111827" }}>
                      Seleccionar Destinatarios
                    </h4>
                    <p className="text-xs mb-4" style={{ color: "#6B7280" }}>
                      Elige una o más fuentes de destinatarios para tu campaña. Puedes combinar eventos, listas y tags.
                    </p>
                  </div>

                  {/* Selector de Eventos */}
                  <div>
                    <h5 className="text-xs font-medium mb-2" style={{ color: "#374151" }}>
                      Eventos
                    </h5>
                    <EventSelector
                      selectedEvents={selectedEvents}
                      onChange={setSelectedEvents}
                    />
                  </div>

                  {/* Selector de Listas */}
                  <div>
                    <h5 className="text-xs font-medium mb-2" style={{ color: "#374151" }}>
                      Listas Guardadas
                    </h5>
                    <ListSelector
                      selectedLists={selectedLists}
                      onChange={setSelectedLists}
                      entityType="CONTACT"
                    />
                  </div>

                  {/* Selector de Tags */}
                  <div>
                    <h5 className="text-xs font-medium mb-2" style={{ color: "#374151" }}>
                      Tags
                    </h5>
                    <TagSelector
                      includeTags={includeTags}
                      excludeTags={excludeTags}
                      matchAll={matchAllTags}
                      onChange={({ include_tags, exclude_tags, match_all }) => {
                        setIncludeTags(include_tags);
                        setExcludeTags(exclude_tags);
                        setMatchAllTags(match_all);
                      }}
                      availableTags={availableTags}
                    />
                  </div>

                  {/* Resumen */}
                  {(selectedEvents.length > 0 || selectedLists.length > 0 || includeTags.length > 0 || excludeTags.length > 0) && (
                    <div className="p-3 rounded-sm" style={{ backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "2px" }}>
                      <div className="text-xs font-medium mb-1" style={{ color: "#1E40AF" }}>
                        Resumen de Destinatarios
                      </div>
                      <div className="text-[10px] space-y-1" style={{ color: "#3B82F6" }}>
                        {selectedEvents.length > 0 && (
                          <div>• {selectedEvents.length} evento(s) seleccionado(s)</div>
                        )}
                        {selectedLists.length > 0 && (
                          <div>• {selectedLists.length} lista(s) seleccionada(s)</div>
                        )}
                        {includeTags.length > 0 && (
                          <div>• {includeTags.length} tag(s) a incluir</div>
                        )}
                        {excludeTags.length > 0 && (
                          <div>• {excludeTags.length} tag(s) a excluir</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-4">
                  {['EMAIL', 'WHATSAPP', 'SMS'].includes(values.type) && (
                    <div>
                      <label className="text-xs font-medium block mb-1" style={{ color: "#6B7280" }}>
                        Plantilla *
                      </label>
                      <TemplateSelector
                        value={values.templateId}
                        onChange={(templateId) => setFieldValue('templateId', templateId)}
                        type={values.type as "EMAIL" | "WHATSAPP" | "SMS"}
                        templates={templates}
                        onOpenModal={() => {
                          setTemplatesModalOpen(true);
                        }}
                        onCreateNew={() => {
                          setTemplatesModalOpen(true);
                        }}
                      />
                      {errors.templateId && touched.templateId && (
                        <p className="text-xs mt-1" style={{ color: "#DC2626" }}>
                          {errors.templateId}
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-medium block mb-1" style={{ color: "#6B7280" }}>
                      Etiquetas (separadas por comas)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={values.tags}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none"
                      style={{
                        border: "1px solid #E5E7EB",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "2px",
                      }}
                      placeholder="Ej: marketing, promoción, verano"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium block mb-1" style={{ color: "#6B7280" }}>
                      Notas
                    </label>
                    <textarea
                      name="notes"
                      value={values.notes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={4}
                      className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none"
                      style={{
                        border: "1px solid #E5E7EB",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "2px",
                      }}
                      placeholder="Notas adicionales sobre la campaña..."
                    />
                  </div>
                </div>
              )}

              {/* Footer */}
              <div
                className="flex items-center justify-end gap-2 mt-6 pt-4 flex-shrink-0"
                style={{ borderTop: "1px solid #E5E7EB" }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium rounded-sm transition-colors"
                  style={{
                    color: "#6B7280",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "2px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFFFFF";
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !values.name.trim()}
                  className="px-4 py-2 text-xs font-medium rounded-sm text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#3B82F6",
                    borderRadius: "2px",
                  }}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "#2563EB";
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "#3B82F6";
                  }}
                >
                  {isSubmitting ? "Guardando..." : campaignId ? "Actualizar" : "Crear Campaña"}
                </button>
              </div>
              </Form>
            );
          }}
        </Formik>
      </div>

      {/* Modal de Templates */}
      <TemplatesModal
        isOpen={templatesModalOpen}
        onClose={() => setTemplatesModalOpen(false)}
        onSelectTemplate={(templateId) => {
          // Disparar evento para que el form lo capture
          if (typeof window !== 'undefined') {
            const event = new CustomEvent('templateSelected', { detail: { templateId } });
            window.dispatchEvent(event);
          }
          setTemplatesModalOpen(false);
          pushToast('success', 'Plantilla seleccionada');
        }}
        type={initialValues.type as any}
      />
    </div>
  );
}

