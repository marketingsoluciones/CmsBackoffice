import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface FilterCondition {
  entity: string;
  field: string;
  operator: string;
  value: string;
}

interface CreateFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (filter: { name: string; conditions: FilterCondition[]; visibility: "private" | "shared"; saveColumns: boolean }) => void;
}

const entities = [
  { value: "lead", label: "Lead", icon: "👁️", backendValue: "LEAD" },
  { value: "contact", label: "Contacto", icon: "👤", backendValue: "CONTACT" },
  { value: "entity", label: "Entidad", icon: "🏢", backendValue: "ENTITY" },
  { value: "campaign", label: "Campaña", icon: "📅", backendValue: "CAMPAIGN" },
];

// Mapeo de entidades del modal al formato del backend
const entityMapping: Record<string, string> = {
  "lead": "LEAD",
  "contact": "CONTACT",
  "entity": "ENTITY",
  "campaign": "CAMPAIGN",
  // Mantener compatibilidad con valores antiguos
  "activity": "CAMPAIGN",
  "organization": "ENTITY",
  "person": "CONTACT",
};

const fieldOptions: Record<string, Array<{ value: string; label: string }>> = {
  lead: [
    { value: "archiveTime", label: "Tiempo de archivo" },
    { value: "contactPerson", label: "Persona de contacto" },
    { value: "creator", label: "Creador" },
    { value: "currency", label: "Moneda" },
    { value: "leadCreated", label: "Lead creado" },
    { value: "nextActivityDate", label: "Próxima fecha de actividad" },
    { value: "nextActivityStatus", label: "Estado de próxima actividad" },
    { value: "organization", label: "Organización" },
    { value: "organizationName", label: "Nombre de organización" },
    { value: "owner", label: "Propietario" },
    { value: "personPhone", label: "Teléfono de persona" },
    { value: "seen", label: "Visto" },
  ],
  activity: [
    { value: "type", label: "Tipo" },
    { value: "dueDate", label: "Fecha de vencimiento" },
    { value: "person", label: "Persona" },
    { value: "organization", label: "Organización" },
  ],
  organization: [
    { value: "name", label: "Nombre" },
    { value: "industry", label: "Industria" },
    { value: "size", label: "Tamaño" },
  ],
  person: [
    { value: "name", label: "Nombre" },
    { value: "email", label: "Correo electrónico" },
    { value: "phone", label: "Teléfono" },
  ],
};

const operators = [
  { value: "equals", label: "es igual a" },
  { value: "not_equals", label: "no es igual a" },
  { value: "contains", label: "contiene" },
  { value: "greater_than", label: "es mayor que" },
  { value: "less_than", label: "es menor que" },
];

export default function CreateFilterModal({ isOpen, onClose, onCreate }: CreateFilterModalProps) {
  const [filterName, setFilterName] = useState("Lead");
  const [visibility, setVisibility] = useState<"private" | "shared">("private");
  const [saveColumns, setSaveColumns] = useState(false);
  const [allConditions, setAllConditions] = useState<FilterCondition[]>([
    { entity: "lead", field: "", operator: "", value: "" },
  ]);
  const [anyConditions, setAnyConditions] = useState<FilterCondition[]>([]);
  const [openEntityDropdown, setOpenEntityDropdown] = useState<number | null>(null);
  const [openFieldDropdown, setOpenFieldDropdown] = useState<number | null>(null);
  const [fieldSearch, setFieldSearch] = useState("");
  const entityDropdownRef = useRef<HTMLDivElement>(null);
  const fieldDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (entityDropdownRef.current && !entityDropdownRef.current.contains(event.target as Node)) {
        setOpenEntityDropdown(null);
      }
      if (fieldDropdownRef.current && !fieldDropdownRef.current.contains(event.target as Node)) {
        setOpenFieldDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  console.log("[CreateFilterModal] Render - isOpen:", isOpen, "mounted:", mounted);
  
  const addAllCondition = () => {
    setAllConditions([...allConditions, { entity: "lead", field: "", operator: "", value: "" }]);
  };

  const addAnyCondition = () => {
    setAnyConditions([...anyConditions, { entity: "lead", field: "", operator: "", value: "" }]);
  };

  const updateAllCondition = (index: number, updates: Partial<FilterCondition>) => {
    const updated = [...allConditions];
    updated[index] = { ...updated[index], ...updates };
    setAllConditions(updated);
  };

  const updateAnyCondition = (index: number, updates: Partial<FilterCondition>) => {
    const updated = [...anyConditions];
    updated[index] = { ...updated[index], ...updates };
    setAnyConditions(updated);
  };

  const removeAllCondition = (index: number) => {
    setAllConditions(allConditions.filter((_, i) => i !== index));
  };

  const removeAnyCondition = (index: number) => {
    setAnyConditions(anyConditions.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const allValid = allConditions.every((c) => c.entity && c.field && c.operator && c.value);
    const anyValid = anyConditions.length === 0 || anyConditions.every((c) => c.entity && c.field && c.operator && c.value);
    
    if (allValid && anyValid && filterName.trim()) {
      onCreate({
        name: filterName.trim(),
        conditions: [...allConditions, ...anyConditions],
        visibility,
        saveColumns,
      });
      // Reset
      setFilterName("Lead");
      setVisibility("private");
      setSaveColumns(false);
      setAllConditions([{ entity: "lead", field: "", operator: "", value: "" }]);
      setAnyConditions([]);
      onClose();
    }
  };

  const getFilteredFields = (entity: string) => {
    const fields = fieldOptions[entity] || [];
    if (!fieldSearch) return fields;
    return fields.filter(f => f.label.toLowerCase().includes(fieldSearch.toLowerCase()));
  };

  const renderEntityDropdown = (condition: FilterCondition, index: number, isAll: boolean) => {
    const isOpen = openEntityDropdown === index;
    return (
      <div className="relative" ref={entityDropdownRef}>
        <button
          type="button"
          onClick={() => {
            setOpenEntityDropdown(isOpen ? null : index);
            setOpenFieldDropdown(null);
          }}
          className="px-2.5 py-1.5 rounded-sm text-xs flex items-center gap-2 min-w-[140px] justify-between"
          style={{
            border: "1px solid #E5E7EB",
            backgroundColor: "#FFFFFF",
            color: "#111827",
            minHeight: "32px",
            borderRadius: "2px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#9CA3AF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#E5E7EB";
          }}
        >
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "16px" }}>{entities.find(e => e.value === condition.entity)?.icon || "👁️"}</span>
            <span>{entities.find(e => e.value === condition.entity)?.label || "Lead"}</span>
          </div>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {isOpen && (
          <div
            className="absolute z-50 mt-1 rounded-sm shadow-lg"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              minWidth: "200px",
              maxHeight: "300px",
              overflow: "auto",
              borderRadius: "2px",
            }}
          >
            {entities.map((entity) => (
              <button
                key={entity.value}
                type="button"
                onClick={() => {
                  if (isAll) {
                    updateAllCondition(index, { entity: entity.value, field: "" });
                  } else {
                    updateAnyCondition(index, { entity: entity.value, field: "" });
                  }
                  setOpenEntityDropdown(null);
                }}
                className="w-full px-2.5 py-2 text-xs text-left flex items-center gap-2"
                style={{
                  color: condition.entity === entity.value ? "#1D4ED8" : "#111827",
                  backgroundColor: condition.entity === entity.value ? "#EFF6FF" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (condition.entity !== entity.value) {
                    e.currentTarget.style.backgroundColor = "#F3F4F6";
                  }
                }}
                onMouseLeave={(e) => {
                  if (condition.entity !== entity.value) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <span>{entity.icon}</span>
                <span>{entity.label}</span>
                {condition.entity === entity.value && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-auto">
                    <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderFieldDropdown = (condition: FilterCondition, index: number, isAll: boolean) => {
    const isOpen = openFieldDropdown === index;
    const fields = getFilteredFields(condition.entity);
    return (
      <div className="relative flex-1" ref={fieldDropdownRef}>
        <button
          type="button"
          onClick={() => {
            setOpenFieldDropdown(isOpen ? null : index);
            setOpenEntityDropdown(null);
            setFieldSearch("");
          }}
          className="w-full px-2.5 py-1.5 rounded-sm text-xs text-left flex items-center justify-between"
          style={{
            border: "1px solid #E5E7EB",
            backgroundColor: "#FFFFFF",
            color: condition.field ? "#111827" : "#9CA3AF",
            minHeight: "32px",
            borderRadius: "2px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#9CA3AF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#E5E7EB";
          }}
        >
          <span>{condition.field ? fieldOptions[condition.entity]?.find(f => f.value === condition.field)?.label || "Seleccionar campo" : "Seleccionar campo"}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {isOpen && (
          <div
            className="absolute z-50 mt-1 rounded-sm shadow-lg w-full"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              maxHeight: "300px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              borderRadius: "2px",
            }}
          >
            <div className="p-2 border-b" style={{ borderColor: "#E5E7EB" }}>
              <input
                type="text"
                value={fieldSearch}
                onChange={(e) => setFieldSearch(e.target.value)}
                placeholder="Buscar..."
                className="w-full px-2.5 py-1.5 rounded-sm text-xs"
                style={{
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#FFFFFF",
                  minHeight: "32px",
                  borderRadius: "2px",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#3B82F6";
                  e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#D1D5DB";
                  e.currentTarget.style.boxShadow = "none";
                }}
                autoFocus
              />
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: "250px" }}>
              {fields.length > 0 ? (
                fields.map((field) => (
                  <button
                    key={field.value}
                    type="button"
                    onClick={() => {
                      if (isAll) {
                        updateAllCondition(index, { field: field.value });
                      } else {
                        updateAnyCondition(index, { field: field.value });
                      }
                      setOpenFieldDropdown(null);
                      setFieldSearch("");
                    }}
                    className="w-full px-2.5 py-2 text-xs text-left"
                    style={{
                      color: condition.field === field.value ? "#1D4ED8" : "#111827",
                      backgroundColor: condition.field === field.value ? "#EFF6FF" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (condition.field !== field.value) {
                        e.currentTarget.style.backgroundColor = "#F3F4F6";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (condition.field !== field.value) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {field.label}
                    {condition.field === field.value && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="float-right">
                        <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-sm" style={{ color: "#6B7280" }}>No se encontraron campos</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Usar portal para renderizar el modal directamente en el body
  if (typeof window === 'undefined') {
    return null;
  }

  if (!isOpen || !mounted) {
    return null;
  }

  const modalContent = (
    <div
      data-filter-modal
      className="fixed inset-0 flex items-center justify-center"
      style={{ 
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 10002,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onClick={onClose}
    >
      <div
        className="shadow-2xl"
        style={{
          backgroundColor: "#FFFFFF",
          width: "720px",
          maxWidth: "95vw",
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 10003,
          borderRadius: "2px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b flex-shrink-0" style={{ borderColor: "#E5E7EB" }}>
          <h3 className="text-sm font-semibold" style={{ color: "#111827" }}>
            Crear nuevo filtro
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-sm transition-colors"
            style={{ color: "#6B7280", borderRadius: "2px" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F3F4F6"; e.currentTarget.style.color = "#374151"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#6B7280"; }}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3" style={{ backgroundColor: "#FFFFFF" }}>
          {/* Match ALL conditions */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <h4 className="text-xs font-semibold" style={{ color: "#111827" }}>
                Coincidir TODAS estas condiciones
              </h4>
              <button
                type="button"
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#E5E7EB", color: "#6B7280" }}
                title="Las condiciones deben cumplirse todas"
              >
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" />
                  <text x="8" y="11" textAnchor="middle" fontSize="10" fill="currentColor">i</text>
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              {allConditions.map((condition, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index === 0 ? (
                    <span className="text-[10px] font-medium px-2 py-1.5 rounded-sm" style={{ backgroundColor: "#F3F4F6", color: "#6B7280", minWidth: "60px", textAlign: "center", borderRadius: "2px" }}>
                      DONDE
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium px-2 py-1.5 rounded-sm" style={{ backgroundColor: "#F3F4F6", color: "#6B7280", minWidth: "60px", textAlign: "center", borderRadius: "2px" }}>
                      Y
                    </span>
                  )}
                  {renderEntityDropdown(condition, index, true)}
                  {renderFieldDropdown(condition, index, true)}
                  <select
                    className="flex-1 px-2.5 py-1.5 rounded-sm text-xs"
                    style={{
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#FFFFFF",
                      color: condition.operator ? "#111827" : "#9CA3AF",
                      minHeight: "32px",
                      borderRadius: "2px",
                    }}
                    value={condition.operator}
                    onChange={(e) => updateAllCondition(index, { operator: e.target.value })}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#3B82F6";
                      e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#D1D5DB";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <option value="">Seleccionar operador</option>
                    {operators.map((op) => (
                      <option key={op.value} value={op.value}>
                        {op.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className="flex-1 px-2.5 py-1.5 rounded-sm text-xs"
                    style={{
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#FFFFFF",
                      color: "#111827",
                      minHeight: "32px",
                      borderRadius: "2px",
                    }}
                    placeholder="Valor"
                    value={condition.value}
                    onChange={(e) => updateAllCondition(index, { value: e.target.value })}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#3B82F6";
                      e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#D1D5DB";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeAllCondition(index)}
                    className="p-2 rounded-sm transition-colors"
                    style={{ color: "#6B7280", borderRadius: "2px" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FEE2E2"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    title="Eliminar condición"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4 4L12 12M12 4L4 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addAllCondition}
              className="text-xs font-medium mt-3 transition-colors flex items-center gap-1"
              style={{ color: "#3B82F6" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#2563EB"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#3B82F6"; }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Añadir condición
            </button>
          </div>

          {/* Match ANY conditions */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <h4 className="text-xs font-semibold" style={{ color: "#111827" }}>
                Y coincidir CUALQUIERA de estas condiciones
              </h4>
              <button
                type="button"
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#E5E7EB", color: "#6B7280" }}
                title="Al menos una de las condiciones debe cumplirse"
              >
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" />
                  <text x="8" y="11" textAnchor="middle" fontSize="10" fill="currentColor">i</text>
                </svg>
              </button>
            </div>
            {anyConditions.length === 0 ? (
              <button
                type="button"
                onClick={addAnyCondition}
                className="text-xs font-medium transition-colors flex items-center gap-1"
                style={{ color: "#3B82F6" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#2563EB"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#3B82F6"; }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Añadir condición
              </button>
            ) : (
              <>
                <div className="space-y-3">
                  {anyConditions.map((condition, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {index === 0 ? (
                        <span className="text-[10px] font-medium px-2 py-1.5 rounded-sm" style={{ backgroundColor: "#F3F4F6", color: "#6B7280", minWidth: "60px", textAlign: "center", borderRadius: "2px" }}>
                          DONDE
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium px-2 py-1.5 rounded-sm" style={{ backgroundColor: "#F3F4F6", color: "#6B7280", minWidth: "60px", textAlign: "center", borderRadius: "2px" }}>
                          O
                        </span>
                      )}
                      {renderEntityDropdown(condition, index + 1000, false)}
                      {renderFieldDropdown(condition, index + 1000, false)}
                      <select
                        className="flex-1 px-2.5 py-1.5 rounded-sm text-xs"
                        style={{
                          border: "1px solid #E5E7EB",
                          backgroundColor: "#FFFFFF",
                          color: condition.operator ? "#111827" : "#9CA3AF",
                          minHeight: "32px",
                          borderRadius: "2px",
                        }}
                        value={condition.operator}
                        onChange={(e) => updateAnyCondition(index, { operator: e.target.value })}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#3B82F6";
                          e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#D1D5DB";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <option value="">Seleccionar operador</option>
                        {operators.map((op) => (
                          <option key={op.value} value={op.value}>
                            {op.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="flex-1 px-2.5 py-1.5 rounded-sm text-xs"
                        style={{
                          border: "1px solid #E5E7EB",
                          backgroundColor: "#FFFFFF",
                          color: "#111827",
                          minHeight: "32px",
                          borderRadius: "2px",
                        }}
                        placeholder="Valor"
                        value={condition.value}
                        onChange={(e) => updateAnyCondition(index, { value: e.target.value })}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#3B82F6";
                          e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#D1D5DB";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeAnyCondition(index)}
                        className="p-2 rounded transition-colors"
                        style={{ color: "#6B7280" }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FEE2E2"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                        title="Eliminar condición"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M4 4L12 12M12 4L4 12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addAnyCondition}
                  className="text-sm font-medium mt-3 transition-colors flex items-center gap-1"
                  style={{ color: "#1D4ED8" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#1E40AF"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#1D4ED8"; }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Añadir condición
                </button>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="border-t my-6" style={{ borderColor: "#E5E7EB" }}></div>

          {/* Filter properties */}
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-medium mb-1" style={{ color: "#6B7280" }}>
                Nombre del filtro
              </label>
              <input
                type="text"
                className="w-full px-2.5 py-1.5 rounded-sm text-xs"
                style={{
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#FFFFFF",
                  color: "#111827",
                  minHeight: "32px",
                  borderRadius: "2px",
                }}
                placeholder="Ej: Leads calientes"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#3B82F6";
                  e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#D1D5DB";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium mb-1" style={{ color: "#6B7280" }}>
                Visibilidad
              </label>
              <div className="relative">
                <select
                  className="w-full px-2.5 py-1.5 rounded-sm text-xs appearance-none"
                  style={{
                    border: "1px solid #E5E7EB",
                    backgroundColor: "#FFFFFF",
                    color: "#111827",
                    minHeight: "32px",
                    borderRadius: "2px",
                  }}
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value as "private" | "shared")}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#3B82F6";
                    e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#D1D5DB";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <option value="private">Privado</option>
                  <option value="shared">Compartido</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  {visibility === "private" ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2C5.33333 2 3.33333 3.33333 2 5.33333L2.66667 6C3.33333 6.66667 4 7.33333 4.66667 8C4 8.66667 3.33333 9.33333 2.66667 10L2 10.6667C3.33333 12.6667 5.33333 14 8 14C10.6667 14 12.6667 12.6667 14 10.6667L13.3333 10C12.6667 9.33333 12 8.66667 11.3333 8C12 7.33333 12.6667 6.66667 13.3333 6L14 5.33333C12.6667 3.33333 10.6667 2 8 2Z" fill="#6B7280" />
                      <path d="M6 8L8 10L10 8" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 3H13V13H3V3Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 6H10M6 9H10" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
              </div>
              {visibility === "private" && (
                <p className="text-xs mt-1.5" style={{ color: "#6B7280" }}>Solo el creador puede ver este filtro</p>
              )}
              {visibility === "shared" && (
                <p className="text-xs mt-1.5" style={{ color: "#6B7280" }}>Todos los usuarios de la empresa pueden ver y usar este filtro</p>
              )}
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="saveColumns"
                checked={saveColumns}
                onChange={(e) => setSaveColumns(e.target.checked)}
                className="w-4 h-4 rounded mt-0.5"
                style={{ accentColor: "#1D4ED8" }}
              />
              <div className="flex-1">
                <label htmlFor="saveColumns" className="text-sm cursor-pointer" style={{ color: "#374151" }}>
                  Guardar columnas seleccionadas con el filtro
                </label>
                <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                  Las columnas visibles actualmente se guardarán con este filtro
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-4 py-2 border-t flex-shrink-0" style={{ borderColor: "#E5E7EB", backgroundColor: "#F9FAFB" }}>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-sm text-xs font-medium transition-colors"
            style={{
              color: "#374151",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F3F4F6";
              e.currentTarget.style.borderColor = "#9CA3AF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#FFFFFF";
              e.currentTarget.style.borderColor = "#E5E7EB";
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-3 py-1.5 rounded-sm text-xs font-semibold text-white transition-colors"
            style={{ backgroundColor: "#10B981", borderRadius: "2px" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#059669";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#10B981";
            }}
          >
            Guardar filtro
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
