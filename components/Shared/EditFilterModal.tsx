import React, { useState, useRef, useEffect } from "react";

interface FilterCondition {
  entity: string;
  field: string;
  operator: string;
  value: string;
  group?: string;
}

interface EditFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filter: {
    id: string;
    name: string;
    conditions: Array<{
      entity: string;
      field: string;
      operator: string;
      value: any;
      group?: string;
    }>;
    visibility: "PRIVATE" | "SHARED";
    saveColumns?: boolean;
  };
  onUpdate: (filter: {
    id: string;
    name: string;
    conditions: Array<{
      entity: string;
      field: string;
      operator: string;
      value: any;
      group?: string;
    }>;
    visibility: "PRIVATE" | "SHARED";
    saveColumns: boolean;
  }) => void;
}

const entities = [
  { value: "lead", label: "Lead", icon: "👁️", backendValue: "LEAD" },
  { value: "contact", label: "Contacto", icon: "👤", backendValue: "CONTACT" },
  { value: "entity", label: "Entidad", icon: "🏢", backendValue: "ENTITY" },
  { value: "campaign", label: "Campaña", icon: "📅", backendValue: "CAMPAIGN" },
];

// Mapeo de entidades del backend al formato del modal
const backendToModalEntity: Record<string, string> = {
  "LEAD": "lead",
  "CONTACT": "contact",
  "ENTITY": "entity",
  "CAMPAIGN": "campaign",
};

// Mapeo de entidades del modal al formato del backend
const entityMapping: Record<string, string> = {
  "lead": "LEAD",
  "contact": "CONTACT",
  "entity": "ENTITY",
  "campaign": "CAMPAIGN",
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
    { value: "status", label: "Estado" },
    { value: "priority", label: "Prioridad" },
    { value: "source", label: "Origen" },
  ],
  contact: [
    { value: "name", label: "Nombre" },
    { value: "email", label: "Correo electrónico" },
    { value: "phone", label: "Teléfono" },
    { value: "company", label: "Empresa" },
    { value: "status", label: "Estado" },
  ],
  entity: [
    { value: "name", label: "Nombre" },
    { value: "industry", label: "Industria" },
    { value: "size", label: "Tamaño" },
    { value: "type", label: "Tipo" },
  ],
  campaign: [
    { value: "name", label: "Nombre" },
    { value: "type", label: "Tipo" },
    { value: "status", label: "Estado" },
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
  { value: "not_contains", label: "no contiene" },
  { value: "greater_than", label: "es mayor que" },
  { value: "less_than", label: "es menor que" },
  { value: "greater_or_equal", label: "es mayor o igual que" },
  { value: "less_or_equal", label: "es menor o igual que" },
  { value: "in", label: "está en" },
  { value: "not_in", label: "no está en" },
  { value: "is_empty", label: "está vacío" },
  { value: "is_not_empty", label: "no está vacío" },
  { value: "starts_with", label: "comienza con" },
  { value: "ends_with", label: "termina con" },
];

export default function EditFilterModal({ isOpen, onClose, filter, onUpdate }: EditFilterModalProps) {
  // Inicializar con los datos del filtro
  const [filterName, setFilterName] = useState(filter.name);
  const [visibility, setVisibility] = useState<"private" | "shared">(
    filter.visibility === "PRIVATE" ? "private" : "shared"
  );
  const [saveColumns, setSaveColumns] = useState(filter.saveColumns || false);
  
  // Transformar condiciones del backend al formato del modal
  const transformConditions = (conditions: Array<{ entity: string; field: string; operator: string; value: any; group?: string }>) => {
    return conditions.map(cond => ({
      entity: backendToModalEntity[cond.entity] || cond.entity.toLowerCase(),
      field: cond.field,
      operator: cond.operator,
      value: String(cond.value || ""),
      group: cond.group || "all"
    }));
  };

  const [allConditions, setAllConditions] = useState<FilterCondition[]>(
    filter.conditions.length > 0 
      ? transformConditions(filter.conditions)
      : [{ entity: "lead", field: "", operator: "", value: "" }]
  );
  const [anyConditions, setAnyConditions] = useState<FilterCondition[]>([]);
  const [openEntityDropdown, setOpenEntityDropdown] = useState<number | null>(null);
  const [openFieldDropdown, setOpenFieldDropdown] = useState<number | null>(null);
  const [fieldSearch, setFieldSearch] = useState("");
  const entityDropdownRef = useRef<HTMLDivElement>(null);
  const fieldDropdownRef = useRef<HTMLDivElement>(null);

  // Actualizar estado cuando cambia el filtro
  useEffect(() => {
    if (isOpen && filter) {
      setFilterName(filter.name);
      setVisibility(filter.visibility === "PRIVATE" ? "private" : "shared");
      setSaveColumns(filter.saveColumns || false);
      setAllConditions(
        filter.conditions.length > 0 
          ? transformConditions(filter.conditions)
          : [{ entity: "lead", field: "", operator: "", value: "" }]
      );
      setAnyConditions([]);
    }
  }, [isOpen, filter]);

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
      // Transformar condiciones al formato del backend
      const transformedConditions = [...allConditions, ...anyConditions]
        .filter(c => c.entity && c.field && c.operator && c.value)
        .map(cond => {
          const mappedEntity = entityMapping[cond.entity.toLowerCase()] || cond.entity.toUpperCase();
          return {
            entity: mappedEntity,
            field: cond.field,
            operator: cond.operator,
            value: cond.value,
            group: cond.group || "all"
          };
        });

      onUpdate({
        id: filter.id,
        name: filterName.trim(),
        conditions: transformedConditions,
        visibility: visibility.toUpperCase() as "PRIVATE" | "SHARED",
        saveColumns,
      });
    }
  };

  const getFilteredFields = (entity: string) => {
    const fields = fieldOptions[entity] || [];
    if (!fieldSearch) return fields;
    return fields.filter(f => f.label.toLowerCase().includes(fieldSearch.toLowerCase()));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={onClose}
    >
      <div
        className="rounded-lg shadow-xl"
        style={{
          backgroundColor: "#FFFFFF",
          width: "600px",
          maxWidth: "90vw",
          maxHeight: "90vh",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "#E5E7EB" }}>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-gray-100"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="#374151"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <h3 className="font-semibold text-base" style={{ color: "#111827" }}>
              Editar filtro
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Filter name */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>
              Nombre del filtro
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded text-sm"
              style={{
                border: "1px solid #D1D5DB",
                backgroundColor: "#FFFFFF",
              }}
              placeholder="Nombre del filtro"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              autoFocus
            />
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>
              Visibilidad
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setVisibility("private")}
                className="flex-1 px-4 py-2 rounded text-sm font-medium transition-colors"
                style={{
                  backgroundColor: visibility === "private" ? "#1D4ED8" : "#F9FAFB",
                  color: visibility === "private" ? "#FFFFFF" : "#374151",
                }}
              >
                Privado
              </button>
              <button
                onClick={() => setVisibility("shared")}
                className="flex-1 px-4 py-2 rounded text-sm font-medium transition-colors"
                style={{
                  backgroundColor: visibility === "shared" ? "#1D4ED8" : "#F9FAFB",
                  color: visibility === "shared" ? "#FFFFFF" : "#374151",
                }}
              >
                Compartido
              </button>
            </div>
          </div>

          {/* Save columns */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="saveColumns"
              checked={saveColumns}
              onChange={(e) => setSaveColumns(e.target.checked)}
              className="w-4 h-4 rounded"
              style={{ accentColor: "#1D4ED8" }}
            />
            <label htmlFor="saveColumns" className="text-sm" style={{ color: "#374151" }}>
              Guardar configuración de columnas
            </label>
          </div>

          {/* Conditions - Simplified version */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>
              Condiciones
            </label>
            <div className="space-y-2">
              {allConditions.map((condition, index) => (
                <div key={index} className="flex gap-2 items-center p-2 border rounded" style={{ borderColor: "#E5E7EB" }}>
                  <select
                    value={condition.entity}
                    onChange={(e) => updateAllCondition(index, { entity: e.target.value, field: "", value: "" })}
                    className="px-2 py-1 rounded text-sm border"
                    style={{ borderColor: "#D1D5DB" }}
                  >
                    {entities.map((ent) => (
                      <option key={ent.value} value={ent.value}>
                        {ent.label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={condition.field}
                    onChange={(e) => updateAllCondition(index, { field: e.target.value })}
                    className="px-2 py-1 rounded text-sm border flex-1"
                    style={{ borderColor: "#D1D5DB" }}
                  >
                    <option value="">Seleccionar campo</option>
                    {getFilteredFields(condition.entity).map((field) => (
                      <option key={field.value} value={field.value}>
                        {field.label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={condition.operator}
                    onChange={(e) => updateAllCondition(index, { operator: e.target.value })}
                    className="px-2 py-1 rounded text-sm border"
                    style={{ borderColor: "#D1D5DB" }}
                  >
                    <option value="">Operador</option>
                    {operators.map((op) => (
                      <option key={op.value} value={op.value}>
                        {op.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={condition.value}
                    onChange={(e) => updateAllCondition(index, { value: e.target.value })}
                    placeholder="Valor"
                    className="px-2 py-1 rounded text-sm border flex-1"
                    style={{ borderColor: "#D1D5DB" }}
                  />
                  <button
                    onClick={() => removeAllCondition(index)}
                    className="p-1 rounded hover:bg-red-50"
                    style={{ color: "#EF4444" }}
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
              <button
                onClick={addAllCondition}
                className="w-full px-4 py-2 rounded text-sm font-medium border border-dashed"
                style={{ borderColor: "#D1D5DB", color: "#6B7280" }}
              >
                + Agregar condición
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t" style={{ borderColor: "#E5E7EB" }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-sm font-medium transition-colors"
            style={{
              color: "#374151",
              backgroundColor: "#F9FAFB",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F3F4F6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#F9FAFB";
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded text-sm font-medium text-white transition-colors"
            style={{
              backgroundColor: filterName.trim() ? "#10B981" : "#D1D5DB",
            }}
            disabled={!filterName.trim()}
            onMouseEnter={(e) => {
              if (filterName.trim()) {
                e.currentTarget.style.backgroundColor = "#059669";
              }
            }}
            onMouseLeave={(e) => {
              if (filterName.trim()) {
                e.currentTarget.style.backgroundColor = "#10B981";
              }
            }}
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}

