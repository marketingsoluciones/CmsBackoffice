import React, { useState, useRef, useEffect } from "react";
import { EditIcon, CheckIcon, XIcon, PlusIcon } from "../Icons/ProfessionalIcons";
import { getFieldIcon } from "../Icons/ProfessionalIcons";

interface EditableFieldProps {
  label: string;
  value: string | number | null | undefined;
  type?: "text" | "number" | "date" | "select" | "textarea" | "email" | "phone" | "currency";
  fieldType?: string; // Tipo de dato para mostrar en hover (ej: "Email", "Phone", "Text")
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  icon?: React.ReactNode;
  onSave: (value: string | number) => Promise<void> | void;
  required?: boolean;
  formatValue?: (value: string | number | null | undefined) => string;
  parseValue?: (value: string) => string | number;
}

export default function EditableField({
  label,
  value,
  type = "text",
  fieldType,
  placeholder,
  options,
  icon,
  onSave,
  required = false,
  formatValue,
  parseValue,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);

  const hasValue = value !== null && value !== undefined && value !== "";

  // Formatear valor para mostrar
  const displayValue = formatValue
    ? formatValue(value)
    : value !== null && value !== undefined
    ? String(value)
    : "";

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement || inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleClick = () => {
    if (!isEditing) {
      // Para campos de fecha, convertir el valor a formato yyyy-MM-dd si es necesario
      let initialEditValue = displayValue;
      if (type === "date" && value) {
        try {
          // Si el valor es una fecha ISO o un string de fecha, convertir a yyyy-MM-dd
          if (typeof value === "string") {
            // Si ya está en formato yyyy-MM-dd, usarlo directamente
            if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
              initialEditValue = value;
            } else {
              // Intentar parsear como fecha ISO y convertir
              const date = new Date(value);
              if (!isNaN(date.getTime())) {
                initialEditValue = date.toISOString().split('T')[0];
              }
            }
          } else if (value instanceof Date) {
            initialEditValue = value.toISOString().split('T')[0];
          }
        } catch (e) {
          // Si falla la conversión, usar el displayValue
          initialEditValue = displayValue;
        }
      }
      setEditValue(initialEditValue);
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (required && !editValue.trim()) {
      return;
    }
    setIsSaving(true);
    try {
      const finalValue = parseValue ? parseValue(editValue) : editValue;
      await onSave(finalValue);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving field:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditValue(displayValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && type !== "textarea") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    if (fieldType) return `Agregar ${fieldType}`;
    return `Agregar ${label.toLowerCase()}`;
  };

  const renderInput = () => {
    if (type === "select" && options) {
      return (
        <select
          ref={inputRef as React.RefObject<HTMLSelectElement>}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-2 rounded text-sm focus:outline-none"
          style={{
            border: "1px solid #3B82F6",
            backgroundColor: "#FFFFFF",
            color: "#111827",
          }}
        >
          <option value="">{placeholder || "Seleccionar..."}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === "textarea") {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          rows={3}
          className="w-full px-3 py-2 rounded text-sm focus:outline-none resize-none"
          style={{
            border: "1px solid #3B82F6",
            backgroundColor: "#FFFFFF",
            color: "#111827",
          }}
          placeholder={getPlaceholder()}
        />
      );
    }

    const inputType =
      type === "email"
        ? "email"
        : type === "phone"
        ? "tel"
        : type === "number" || type === "currency"
        ? "number"
        : type === "date"
        ? "date"
        : "text";

    // Para inputs de tipo date, asegurar que el valor esté en formato yyyy-MM-dd
    const inputValue = type === "date" && editValue ? (() => {
      try {
        // Si ya está en formato yyyy-MM-dd, usarlo directamente
        if (/^\d{4}-\d{2}-\d{2}$/.test(editValue)) {
          return editValue;
        }
        // Intentar convertir fecha ISO a yyyy-MM-dd
        const date = new Date(editValue);
        if (!isNaN(date.getTime())) {
          return date.toISOString().split('T')[0];
        }
      } catch (e) {
        // Si falla, usar el valor original
      }
      return editValue;
    })() : editValue;

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type={inputType}
        value={inputValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        className="w-full px-3 py-2 rounded text-sm focus:outline-none"
        style={{
          border: "1px solid #3B82F6",
          backgroundColor: "#FFFFFF",
          color: "#111827",
        }}
        placeholder={getPlaceholder()}
      />
    );
  };

  // Estado: Editando
  if (isEditing) {
    const fieldIcon = icon || getFieldIcon(label.toLowerCase(), 14);
    return (
      <div className="mb-2">
        <div className="flex items-center gap-1.5 mb-1">
          <span style={{ color: "#9CA3AF", display: "flex", alignItems: "center" }}>{fieldIcon}</span>
          <label className="text-xs font-medium" style={{ color: "#6B7280" }}>
            {label}
            {required && <span style={{ color: "#EF4444", marginLeft: "2px" }}>*</span>}
          </label>
        </div>
        <div className="flex items-center gap-1.5">
          {renderInput()}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-2 py-1.5 rounded-md text-xs font-medium transition-colors disabled:opacity-50 flex items-center justify-center"
            style={{ backgroundColor: "#10B981", color: "#FFFFFF", minWidth: "32px", height: "32px" }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = "#059669";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#10B981";
            }}
            title="Guardar"
          >
            {isSaving ? (
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <CheckIcon size={14} />
            )}
          </button>
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="px-2 py-1.5 rounded-md text-xs font-medium transition-colors disabled:opacity-50 flex items-center justify-center"
            style={{ backgroundColor: "#F3F4F6", color: "#374151", minWidth: "32px", height: "32px" }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = "#E5E7EB";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#F3F4F6";
            }}
            title="Cancelar"
          >
            <XIcon size={14} />
          </button>
        </div>
      </div>
    );
  }

  // Estado: Sin valor
  if (!hasValue) {
    const fieldIcon = icon || getFieldIcon(label.toLowerCase(), 14);
    return (
      <div
        className="mb-2 cursor-pointer transition-all"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        style={{
          padding: "6px 10px",
          borderRadius: "6px",
          backgroundColor: isHovered ? "#F3F4F6" : "transparent",
        }}
      >
        <div className="flex items-center gap-1.5 mb-0.5">
          <span style={{ color: "#9CA3AF", display: "flex", alignItems: "center" }}>{fieldIcon}</span>
          <label className="text-xs font-medium" style={{ color: "#6B7280" }}>
            {label}
            {required && <span style={{ color: "#EF4444", marginLeft: "2px" }}>*</span>}
          </label>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs" style={{ color: "#9CA3AF" }}>
            {isHovered ? (
              <span className="flex items-center gap-1">
                <PlusIcon size={12} />
                {fieldType ? `Agregar ${fieldType}` : `Agregar ${label.toLowerCase()}`}
              </span>
            ) : (
              getPlaceholder()
            )}
          </span>
        </div>
      </div>
    );
  }

  // Estado: Con valor
  const fieldIcon = icon || getFieldIcon(label.toLowerCase(), 14);
  return (
    <div
      className="mb-2 cursor-pointer transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        padding: "6px 10px",
        borderRadius: "6px",
        backgroundColor: isHovered ? "#EFF6FF" : "transparent",
      }}
    >
      <div className="flex items-center gap-1.5 mb-0.5">
        <span style={{ color: isHovered ? "#3B82F6" : "#6B7280", display: "flex", alignItems: "center", transition: "color 0.2s" }}>{fieldIcon}</span>
        <label className="text-xs font-medium" style={{ color: "#6B7280" }}>
          {label}
          {required && <span style={{ color: "#EF4444", marginLeft: "2px" }}>*</span>}
        </label>
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className="text-sm font-medium"
          style={{
            color: isHovered ? "#1D4ED8" : "#111827",
            transition: "color 0.2s",
          }}
        >
          {displayValue}
        </span>
        {isHovered && (
          <EditIcon size={12} style={{ color: "#1D4ED8", flexShrink: 0 }} />
        )}
      </div>
    </div>
  );
}

