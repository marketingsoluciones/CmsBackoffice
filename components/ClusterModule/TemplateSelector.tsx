import React, { useState, useRef, useEffect } from "react";
import {
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  CheckIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export type TemplateType = "EMAIL" | "WHATSAPP" | "SMS";

interface Template {
  id: string;
  name: string;
  type: TemplateType;
  category?: string;
  subject?: string;
  variables?: string[];
}

interface TemplateSelectorProps {
  value?: string; // templateId
  onChange: (templateId: string) => void;
  type: TemplateType;
  whitelabelId?: string;
  onCreateNew?: () => void;
  templates?: Template[]; // Lista de templates disponibles
}

export default function TemplateSelector({
  value,
  onChange,
  type,
  whitelabelId,
  onCreateNew,
  templates = [],
}: TemplateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const filteredTemplates = templates.filter(
    (template) =>
      template.type === type &&
      (template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedTemplate = templates.find((t) => t.id === value);

  const getTypeIcon = (templateType: string) => {
    switch (templateType) {
      case "EMAIL":
        return <DocumentTextIcon className="w-4 h-4" />;
      case "WHATSAPP":
      case "SMS":
        return <ChatBubbleLeftRightIcon className="w-4 h-4" />;
      default:
        return <DocumentTextIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selector */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none flex items-center justify-between"
        style={{
          border: "1px solid #E5E7EB",
          backgroundColor: "#FFFFFF",
          borderRadius: "2px",
        }}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {selectedTemplate ? (
            <>
              {getTypeIcon(selectedTemplate.type)}
              <span className="truncate" style={{ color: "#111827" }}>
                {selectedTemplate.name}
              </span>
              {selectedTemplate.category && (
                <span
                  className="text-xs px-1.5 py-0.5 rounded-sm"
                  style={{ backgroundColor: "#F3F4F6", color: "#6B7280", borderRadius: "2px" }}
                >
                  {selectedTemplate.category}
                </span>
              )}
            </>
          ) : (
            <span style={{ color: "#9CA3AF" }}>Seleccionar plantilla...</span>
          )}
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
          style={{ color: "#6B7280" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 rounded-sm shadow-lg"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "2px",
            maxHeight: "400px",
            overflow: "hidden",
          }}
        >
          {/* Búsqueda */}
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: "#9CA3AF" }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar plantilla..."
                className="w-full pl-8 pr-3 py-2 text-sm rounded-sm focus:outline-none"
                style={{
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#F9FAFB",
                  borderRadius: "2px",
                }}
              />
            </div>
          </div>

          {/* Lista de templates */}
          <div className="max-h-64 overflow-y-auto">
            {filteredTemplates.length === 0 ? (
              <div className="p-4 text-center text-sm" style={{ color: "#6B7280" }}>
                No hay plantillas disponibles
              </div>
            ) : (
              filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => {
                    onChange(template.id);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(template.type)}
                      <span className="text-sm font-medium truncate" style={{ color: "#111827" }}>
                        {template.name}
                      </span>
                      {value === template.id && (
                        <CheckIcon className="w-4 h-4 flex-shrink-0" style={{ color: "#10B981" }} />
                      )}
                    </div>
                    {template.category && (
                      <div className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                        {template.category}
                      </div>
                    )}
                    {template.subject && (
                      <div className="text-xs mt-0.5 truncate" style={{ color: "#9CA3AF" }}>
                        {template.subject}
                      </div>
                    )}
                    {template.variables && template.variables.length > 0 && (
                      <div className="text-xs mt-1 flex flex-wrap gap-1">
                        {template.variables.slice(0, 3).map((variable) => (
                          <span
                            key={variable}
                            className="px-1.5 py-0.5 rounded-sm"
                            style={{ backgroundColor: "#EFF6FF", color: "#1D4ED8", borderRadius: "2px" }}
                          >
                            {variable}
                          </span>
                        ))}
                        {template.variables.length > 3 && (
                          <span className="text-xs" style={{ color: "#6B7280" }}>
                            +{template.variables.length - 3} más
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Botón crear nuevo */}
          {onCreateNew && (
            <div className="p-2 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onCreateNew();
                }}
                className="w-full px-3 py-2 text-sm font-medium rounded-sm transition-colors flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "#F3F4F6",
                  color: "#374151",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#E5E7EB")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F3F4F6")}
              >
                <SparklesIcon className="w-4 h-4" />
                Crear nueva plantilla
              </button>
            </div>
          )}
        </div>
      )}

      {/* Info del template seleccionado */}
      {selectedTemplate && (
        <div
          className="mt-2 p-3 rounded-sm"
          style={{ backgroundColor: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: "2px" }}
        >
          <div className="text-xs font-medium mb-1" style={{ color: "#166534" }}>
            Plantilla seleccionada
          </div>
          <div className="text-xs space-y-1" style={{ color: "#15803D" }}>
            {selectedTemplate.subject && (
              <div>
                <span className="font-medium">Asunto:</span> {selectedTemplate.subject}
              </div>
            )}
            {selectedTemplate.variables && selectedTemplate.variables.length > 0 && (
              <div>
                <span className="font-medium">Variables:</span> {selectedTemplate.variables.join(", ")}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

