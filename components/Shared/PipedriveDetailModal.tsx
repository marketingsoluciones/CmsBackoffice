import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Formik, Form, Field } from "formik";
import { ToastContextProvider } from "../../context/ToastContext";
import { getFieldIcon } from "../Icons/ProfessionalIcons";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ShareEntityModal from "./ShareEntityModal";
import FileUploadZone from "./FileUploadZone";
import FileGallery from "./FileGallery";
import EmailList from "./EmailList";
import ShareEntityModalERP from "./ShareEntityModalERP";
import FileUploadZoneERP from "./FileUploadZoneERP";
import FileGalleryERP from "./FileGalleryERP";
import EmailListERP from "./EmailListERP";

// Estilos para la animación del modal
const slideInRightStyle = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

interface FieldConfig {
  name: string;
  label: string;
  type?: "text" | "number" | "date" | "select" | "textarea" | "email" | "phone" | "datetime-local" | "currency";
  required?: boolean;
  tooltip?: string;
  options?: { value: string; label: string }[];
  placeholder?: string;
  icon?: string;
  column?: "left" | "right";
}

interface PipedriveDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  entityType?: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN" | "WHITELABEL" | "BUSINESS";
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
  // Props para contenido personalizado
  detailsSection?: React.ReactNode;
  personSection?: React.ReactNode;
  organizationSection?: React.ReactNode;
  // Props para tabs
  notesContent?: React.ReactNode;
  activityContent?: React.ReactNode;
  emailContent?: React.ReactNode;
  filesContent?: React.ReactNode;
  // Props para formulario de edición
  editFields?: FieldConfig[];
  editMutation?: string;
  editVariablesBuilder?: (values: Record<string, any>, entityId: string) => any | Promise<any>;
  editFetcher?: (args: { query: string; variables?: Record<string, any> }) => Promise<any>;
  editInitialData?: Record<string, any>;
  onEditSuccess?: () => void;
}

export default function PipedriveDetailModal({
  isOpen,
  onClose,
  title,
  entityType,
  onEdit,
  onDelete,
  onShare,
  detailsSection,
  personSection,
  organizationSection,
  notesContent,
  activityContent,
  emailContent,
  filesContent,
  editFields,
  editMutation,
  editVariablesBuilder,
  editFetcher,
  editInitialData,
  onEditSuccess,
}: PipedriveDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"notes" | "activity" | "email" | "files">("notes");
  const [isEditing, setIsEditing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const { dispatch } = ToastContextProvider();
  const pushToast = (type: string, message: string) => {
    dispatch({ type: "ADD_TOAST", payload: { id: `${Date.now()}-${Math.random()}`, type, message } } as any);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (!document.getElementById('detail-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'detail-modal-styles';
        style.textContent = slideInRightStyle;
        document.head.appendChild(style);
      }
    } else {
      document.body.style.overflow = "unset";
      setIsEditing(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleEditClick = () => {
    if (editFields && editFields.length > 0) {
      setIsEditing(true);
    } else if (onEdit) {
      onEdit();
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (!isOpen) return null;

  // Separar campos por columna para el formulario
  const leftFields = editFields?.filter((f) => !f.column || f.column === "left") || [];
  const rightFields = editFields?.filter((f) => f.column === "right") || [];

  return (
    <>
      {/* Overlay con backdrop */}
      <div
        className="fixed inset-0 transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(2px)",
          zIndex: 9998,
        }}
        onClick={onClose}
      />
      
      {/* Modal que se desliza desde la derecha */}
      <div
        className="fixed right-0 top-0 bottom-0"
        style={{
          width: "650px",
          maxWidth: "90vw",
          animation: "slideInRight 0.3s ease-out",
          zIndex: 9999,
        }}
      >
        <div
          className="h-full flex flex-col shadow-2xl rounded-sm"
          style={{
            backgroundColor: "#FFFFFF",
            boxShadow: "-4px 0 24px rgba(0, 0, 0, 0.15)",
            borderRadius: "2px",
          }}
        >
          {/* Header con botones externos en vertical */}
          <div className="relative flex-shrink-0" style={{ padding: "20px 24px", borderBottom: "1px solid #E5E7EB" }}>
            {/* Botones en la esquina superior izquierda, fuera del contenedor, en vertical */}
            <div
              className="absolute flex flex-col gap-1"
              style={{
                left: "-38px",
                top: "20px",
                zIndex: 10,
              }}
            >
              {/* Botón editar/atrás - Cambia según el estado */}
              {isEditing ? (
                // Estado 2: Modo edición - Solo botón de regresar
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center justify-center rounded-sm transition-all duration-200"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "2px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#F9FAFB";
                    e.currentTarget.style.borderColor = "#D1D5DB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFFFFF";
                    e.currentTarget.style.borderColor = "#E5E7EB";
                  }}
                  title="Volver a detalles"
                >
                  <ArrowLeftIcon width={16} height={16} style={{ color: "#374151" }} />
                </button>
              ) : (
                // Estado 1: Modo normal - Botones de editar, compartir y eliminar
                <>
                  {/* Botón editar - Aparece si hay editFields o si hay onEdit */}
                  {(editFields && editFields.length > 0) || onEdit ? (
                    <button
                      onClick={handleEditClick}
                      className="flex items-center justify-center rounded-sm transition-all duration-200"
                      style={{
                        width: "36px",
                        height: "36px",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        borderRadius: "2px",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#F9FAFB";
                        e.currentTarget.style.borderColor = "#D1D5DB";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#FFFFFF";
                        e.currentTarget.style.borderColor = "#E5E7EB";
                      }}
                      title="Editar"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.333 2.00001C11.5084 1.82445 11.7163 1.68607 11.9447 1.59331C12.1731 1.50054 12.4173 1.45557 12.6637 1.46119C12.9101 1.46682 13.1523 1.52292 13.3759 1.62623C13.5995 1.72954 13.7998 1.87781 13.9657 2.06286C14.1316 2.24792 14.2595 2.46559 14.3418 2.70294C14.4241 2.94029 14.4591 3.19229 14.4447 3.44369C14.4303 3.69509 14.3667 3.94074 14.2581 4.16568C14.1495 4.39061 13.9983 4.59015 13.8133 4.75334L6.08 12.4867L2.66667 13.3333L3.51333 9.92001L11.333 2.00001Z"
                      stroke="#374151"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                  ) : null}

              {/* Botón compartir */}
              {(onShare || entityType) && (
                <button
                  onClick={() => {
                    if (onShare) {
                      // Ejecutar onShare primero (esto establecerá el estado del modal de compartir)
                      // onShare debe manejar el cierre del modal de detalles internamente
                      onShare();
                    } else if (entityType && editInitialData?.id) {
                      // Si no hay onShare prop, usar el estado interno
                      // Cerrar el modal de detalles primero
                      onClose();
                      // Luego abrir el modal de compartir (se renderizará fuera del modal de detalles usando Portal)
                      setTimeout(() => {
                        setShowShareModal(true);
                      }, 100);
                    }
                  }}
                      className="flex items-center justify-center rounded-sm transition-all duration-200"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        borderRadius: "2px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#F9FAFB";
                    e.currentTarget.style.borderColor = "#D1D5DB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFFFFF";
                    e.currentTarget.style.borderColor = "#E5E7EB";
                  }}
                  title="Compartir"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 8.66667C12.9205 8.66667 13.6667 7.92048 13.6667 7C13.6667 6.07953 12.9205 5.33334 12 5.33334C11.0795 5.33334 10.3333 6.07953 10.3333 7C10.3333 7.92048 11.0795 8.66667 12 8.66667Z"
                      stroke="#374151"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 10.6667C4.92047 10.6667 5.66667 9.92048 5.66667 9C5.66667 8.07953 4.92047 7.33334 4 7.33334C3.07953 7.33334 2.33333 8.07953 2.33333 9C2.33333 9.92048 3.07953 10.6667 4 10.6667Z"
                      stroke="#374151"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 7.33334C4.92047 7.33334 5.66667 6.58715 5.66667 5.66667C5.66667 4.7462 4.92047 4 4 4C3.07953 4 2.33333 4.7462 2.33333 5.66667C2.33333 6.58715 3.07953 7.33334 4 7.33334Z"
                      stroke="#374151"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.66667 5.66667L10.3333 6.66667M5.66667 9L10.3333 8"
                      stroke="#374151"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}

              {/* Botón eliminar */}
              {onDelete && (
                <button
                  onClick={onDelete}
                      className="flex items-center justify-center rounded-sm transition-all duration-200"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        borderRadius: "2px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FEF2F2";
                    e.currentTarget.style.borderColor = "#FCA5A5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFFFFF";
                    e.currentTarget.style.borderColor = "#E5E7EB";
                  }}
                  title="Eliminar"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 4H14M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3333 14.6667H4.66667C4 14.6667 3.33333 14 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 2 6 1.33334 6.66667 1.33334H9.33333C10 1.33334 10.6667 2 10.6667 2.66667V4"
                      stroke="#EF4444"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                  )}
                </>
              )}

              {/* Botón cerrar (X) */}
              <button
                onClick={onClose}
                className="flex items-center justify-center rounded-sm transition-all duration-200"
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F9FAFB";
                  e.currentTarget.style.borderColor = "#D1D5DB";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                  e.currentTarget.style.borderColor = "#E5E7EB";
                }}
                title="Cerrar (Esc)"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Título del modal - Cambia según el estado */}
            <h2
              className="font-semibold"
              style={{
                fontSize: "20px",
                lineHeight: "28px",
                color: "#111827",
                margin: 0,
              }}
            >
              {isEditing ? `Editar ${title}` : title}
            </h2>
          </div>

          {/* Contenido: Formulario de edición o vista de detalles */}
          {isEditing && editFields && editFields.length > 0 ? (
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <Formik
                enableReinitialize={true}
                initialValues={(() => {
                  const defaults: Record<string, any> = {};
                  editFields.forEach((f) => {
                    const initialValue = editInitialData?.[f.name];
                    if (f.type === "date" || f.type === "datetime-local") {
                      if (initialValue) {
                        try {
                          const date = new Date(initialValue);
                          if (!isNaN(date.getTime())) {
                            if (f.type === "datetime-local") {
                              const year = date.getFullYear();
                              const month = String(date.getMonth() + 1).padStart(2, "0");
                              const day = String(date.getDate()).padStart(2, "0");
                              const hours = String(date.getHours()).padStart(2, "0");
                              const minutes = String(date.getMinutes()).padStart(2, "0");
                              defaults[f.name] = `${year}-${month}-${day}T${hours}:${minutes}`;
                            } else {
                              defaults[f.name] = date.toISOString().split("T")[0];
                            }
                          } else {
                            defaults[f.name] = "";
                          }
                        } catch {
                          defaults[f.name] = "";
                        }
                      } else {
                        defaults[f.name] = "";
                      }
                    } else {
                      defaults[f.name] = initialValue !== undefined && initialValue !== null ? String(initialValue) : "";
                    }
                  });
                  return defaults;
                })()}
                validate={(vals) => {
                  const errors: Record<string, string> = {};
                  editFields.forEach((f) => {
                    if (f.required && !vals[f.name]) {
                      errors[f.name] = "Requerido";
                    }
                    if (f.type === "number" && vals[f.name] && isNaN(Number(vals[f.name]))) {
                      errors[f.name] = "Debe ser numérico";
                    }
                    if (f.type === "email" && vals[f.name] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals[f.name])) {
                      errors[f.name] = "Email inválido";
                    }
                  });
                  return errors;
                }}
                onSubmit={async (vals, { setSubmitting }) => {
                  try {
                    if (!editMutation || !editVariablesBuilder || !editInitialData?.id) {
                      throw new Error("Configuración de edición incompleta");
                    }
                    
                    // Comparar valores iniciales con valores actuales para enviar solo campos modificados
                    const initialValues: Record<string, any> = {};
                    editFields?.forEach((f) => {
                      const initialValue = editInitialData?.[f.name];
                      if (f.type === "date" || f.type === "datetime-local") {
                        if (initialValue) {
                          try {
                            const date = new Date(initialValue);
                            if (!isNaN(date.getTime())) {
                              if (f.type === "datetime-local") {
                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, "0");
                                const day = String(date.getDate()).padStart(2, "0");
                                const hours = String(date.getHours()).padStart(2, "0");
                                const minutes = String(date.getMinutes()).padStart(2, "0");
                                initialValues[f.name] = `${year}-${month}-${day}T${hours}:${minutes}`;
                              } else {
                                initialValues[f.name] = date.toISOString().split("T")[0];
                              }
                            }
                          } catch {}
                        }
                      } else {
                        initialValues[f.name] = initialValue !== undefined && initialValue !== null ? String(initialValue) : "";
                      }
                    });
                    
                    // Filtrar solo los campos que cambiaron
                    const changedFields: Record<string, any> = {};
                    Object.keys(vals).forEach(key => {
                      const currentValue = vals[key];
                      const initialValue = initialValues[key];
                      // Comparar valores (normalizar strings)
                      const currentNormalized = currentValue?.toString().trim() || "";
                      const initialNormalized = initialValue?.toString().trim() || "";
                      if (currentNormalized !== initialNormalized) {
                        changedFields[key] = currentValue;
                      }
                    });
                    
                    // Si no hay campos modificados, no hacer nada
                    if (Object.keys(changedFields).length === 0) {
                      pushToast("info", "No hay cambios para guardar");
                      setIsEditing(false);
                      return;
                    }
                    
                    // Construir variables solo con campos modificados
                    const variables = await Promise.resolve(editVariablesBuilder(changedFields, editInitialData.id));
                    
                    if (editFetcher) {
                      await editFetcher({ query: editMutation, variables });
                    } else {
                      const { fetchApi } = await import("../../utils/Fetching");
                      await fetchApi({
                        query: editMutation,
                        variables,
                        type: "json",
                        development: undefined as any,
                      });
                    }
                    pushToast("success", "Cambios guardados correctamente.");
                    if (onEditSuccess) {
                      onEditSuccess();
                    }
                    setIsEditing(false);
                  } catch (e: any) {
                    pushToast("error", e?.message || "Error al guardar");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting, errors, touched, values, setFieldValue, handleSubmit }) => (
                  <Form className="space-y-2" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Columna izquierda */}
                      <div className="space-y-2">
                        {leftFields.map((f) => {
                          const icon = f.icon ? <span>{f.icon}</span> : getFieldIcon(f.name, 12);
                          return (
                            <div key={f.name} className="flex flex-col gap-0.5">
                              <label
                                className="text-[11px] font-medium flex items-center gap-1"
                                style={{ color: "#6B7280" }}
                                title={f.tooltip || ""}
                              >
                                <span className="flex-shrink-0" style={{ color: "#9CA3AF" }}>{icon}</span>
                                {f.label}
                                {f.required && <span style={{ color: "#EF4444" }}>*</span>}
                              </label>
                              {f.type === "select" && f.options ? (
                                <Field
                                  name={f.name}
                                  as="select"
                                  className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all"
                                  style={{
                                    border: `1px solid ${errors[f.name] && touched[f.name] ? "#EF4444" : "#E5E7EB"}`,
                                    backgroundColor: "#FFFFFF",
                                    minHeight: "32px",
                                    borderRadius: "2px",
                                  }}
                                  onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "#3B82F6";
                                    e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)";
                                  }}
                                  onBlur={(e) => {
                                    e.currentTarget.style.borderColor =
                                      errors[f.name] && touched[f.name] ? "#EF4444" : "#D1D5DB";
                                    e.currentTarget.style.boxShadow = "none";
                                  }}
                                >
                                  <option value="">{f.placeholder || "Seleccionar..."}</option>
                                  {f.options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </option>
                                  ))}
                                </Field>
                              ) : f.type === "date" || f.type === "datetime-local" ? (
                                <Field
                                  name={f.name}
                                  type={f.type}
                                  value={(() => {
                                    const val = values[f.name];
                                    if (!val) return "";
                                    if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}/.test(val)) {
                                      return val;
                                    }
                                    try {
                                      const date = new Date(val);
                                      if (!isNaN(date.getTime())) {
                                        if (f.type === "datetime-local") {
                                          const year = date.getFullYear();
                                          const month = String(date.getMonth() + 1).padStart(2, "0");
                                          const day = String(date.getDate()).padStart(2, "0");
                                          const hours = String(date.getHours()).padStart(2, "0");
                                          const minutes = String(date.getMinutes()).padStart(2, "0");
                                          return `${year}-${month}-${day}T${hours}:${minutes}`;
                                        }
                                        return date.toISOString().split("T")[0];
                                      }
                                    } catch {}
                                    return "";
                                  })()}
                                  onChange={(e: any) => {
                                    setFieldValue(f.name, e.target.value || "");
                                  }}
                                  className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all"
                                  style={{
                                    border: `1px solid ${errors[f.name] && touched[f.name] ? "#EF4444" : "#E5E7EB"}`,
                                    backgroundColor: "#FFFFFF",
                                    minHeight: "32px",
                                    borderRadius: "2px",
                                  }}
                                  onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "#3B82F6";
                                    e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)";
                                  }}
                                  onBlur={(e) => {
                                    e.currentTarget.style.borderColor =
                                      errors[f.name] && touched[f.name] ? "#EF4444" : "#D1D5DB";
                                    e.currentTarget.style.boxShadow = "none";
                                  }}
                                />
                              ) : f.type === "textarea" ? (
                                <Field
                                  name={f.name}
                                  as="textarea"
                                  rows={2}
                                  placeholder={f.placeholder}
                                  className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all resize-none"
                                  style={{
                                    border: `1px solid ${errors[f.name] && touched[f.name] ? "#EF4444" : "#E5E7EB"}`,
                                    backgroundColor: "#FFFFFF",
                                    borderRadius: "2px",
                                  }}
                                  onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "#3B82F6";
                                    e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)";
                                  }}
                                  onBlur={(e) => {
                                    e.currentTarget.style.borderColor =
                                      errors[f.name] && touched[f.name] ? "#EF4444" : "#D1D5DB";
                                    e.currentTarget.style.boxShadow = "none";
                                  }}
                                />
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Field
                                    name={f.name}
                                    type={
                                      f.type === "email"
                                        ? "email"
                                        : f.type === "phone"
                                        ? "tel"
                                        : f.type === "number" || f.type === "currency"
                                        ? "number"
                                        : "text"
                                    }
                                    placeholder={f.placeholder}
                                    className="flex-1 rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all"
                                    style={{
                                      border: `1px solid ${errors[f.name] && touched[f.name] ? "#EF4444" : "#E5E7EB"}`,
                                      backgroundColor: "#FFFFFF",
                                      minHeight: "32px",
                                      borderRadius: "2px",
                                    }}
                                    onFocus={(e) => {
                                      e.currentTarget.style.borderColor = "#3B82F6";
                                      e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)";
                                    }}
                                    onBlur={(e) => {
                                      e.currentTarget.style.borderColor =
                                        errors[f.name] && touched[f.name] ? "#EF4444" : "#D1D5DB";
                                      e.currentTarget.style.boxShadow = "none";
                                    }}
                                  />
                                  {f.name === "value" && (
                                    <Field
                                      name="currency"
                                      as="select"
                                      className="rounded-sm px-2 py-1.5 text-xs focus:outline-none transition-all"
                                      style={{
                                        border: "1px solid #D1D5DB",
                                        backgroundColor: "#FFFFFF",
                                        width: "100px",
                                        borderRadius: "2px",
                                      }}
                                    >
                                      <option value="EUR">EUR</option>
                                      <option value="USD">USD</option>
                                      <option value="RON">RON</option>
                                    </Field>
                                  )}
                                </div>
                              )}
                              {touched[f.name] && typeof (errors as any)[f.name] === "string" ? (
                                <span className="text-[10px]" style={{ color: "#DC2626" }}>
                                  {(errors as any)[f.name]}
                                </span>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>

                      {/* Columna derecha */}
                      {rightFields.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium mb-2 uppercase text-[10px] tracking-wider" style={{ color: "#9CA3AF", letterSpacing: "0.05em" }}>
                            PERSONA
                          </h4>
                          {rightFields.map((f) => {
                            const icon = f.icon ? <span>{f.icon}</span> : getFieldIcon(f.name, 12);
                            return (
                              <div key={f.name} className="flex flex-col gap-0.5">
                                <label
                                  className="text-[11px] font-medium flex items-center gap-1"
                                  style={{ color: "#6B7280" }}
                                  title={f.tooltip || ""}
                                >
                                  <span className="flex-shrink-0" style={{ color: "#9CA3AF" }}>{icon}</span>
                                  {f.label}
                                  {f.required && <span style={{ color: "#EF4444" }}>*</span>}
                                </label>
                                <div className="flex items-center gap-1.5">
                                  <Field
                                    name={f.name}
                                    type={f.type === "email" ? "email" : f.type === "phone" ? "tel" : "text"}
                                    placeholder={f.placeholder}
                                    className="flex-1 rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all"
                                    style={{
                                      border: `1px solid ${errors[f.name] && touched[f.name] ? "#EF4444" : "#E5E7EB"}`,
                                      backgroundColor: "#FFFFFF",
                                      minHeight: "32px",
                                      borderRadius: "2px",
                                    }}
                                    onFocus={(e) => {
                                      e.currentTarget.style.borderColor = "#3B82F6";
                                      e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)";
                                    }}
                                    onBlur={(e) => {
                                      e.currentTarget.style.borderColor =
                                        errors[f.name] && touched[f.name] ? "#EF4444" : "#D1D5DB";
                                      e.currentTarget.style.boxShadow = "none";
                                    }}
                                  />
                                  <Field
                                    name={`${f.name}_type`}
                                    as="select"
                                    className="rounded-sm px-2 py-1.5 text-[10px] focus:outline-none transition-all"
                                    style={{
                                      border: "1px solid #E5E7EB",
                                      backgroundColor: "#FFFFFF",
                                      width: "80px",
                                      minHeight: "32px",
                                      borderRadius: "2px",
                                    }}
                                  >
                                    <option value="Work">Trabajo</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Other">Otro</option>
                                  </Field>
                                </div>
                                {touched[f.name] && typeof (errors as any)[f.name] === "string" ? (
                                  <span className="text-[10px]" style={{ color: "#DC2626" }}>
                                    {(errors as any)[f.name]}
                                  </span>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Footer del formulario */}
                    <div
                      className="mt-4 pt-3 flex items-center justify-end gap-1.5"
                      style={{ borderTop: "1px solid #E5E7EB" }}
                    >
                      <button
                        className="px-3 py-1 text-[11px] font-medium rounded-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ border: "1px solid #E5E7EB", color: "#6B7280", backgroundColor: "#FFFFFF", borderRadius: "2px" }}
                        onMouseEnter={(e) => {
                          if (!e.currentTarget.disabled) {
                            e.currentTarget.style.backgroundColor = "#F3F4F6";
                            e.currentTarget.style.color = "#374151";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#FFFFFF";
                          e.currentTarget.style.color = "#6B7280";
                        }}
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={isSubmitting}
                      >
                        Cancelar
                      </button>
                      <button
                        className="px-3 py-1 text-[11px] font-semibold rounded-sm text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ backgroundColor: "#10B981", borderRadius: "2px" }}
                        onMouseEnter={(e) => {
                          if (!e.currentTarget.disabled) {
                            e.currentTarget.style.backgroundColor = "#059669";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#10B981";
                        }}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-1">
                            <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Guardando...
                          </span>
                        ) : (
                          "Guardar"
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          ) : (
            /* Vista de detalles normal */
          <div className="flex-1 flex overflow-hidden">
            {/* Panel izquierdo - Detalles */}
            <div
              className="flex-shrink-0 overflow-y-auto"
              style={{
                width: "280px",
                borderRight: "1px solid #E5E7EB",
                padding: "16px",
              }}
            >
                {/* Sección DETALLES */}
              {detailsSection && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2 uppercase text-xs tracking-wider" style={{ color: "#9CA3AF", letterSpacing: "0.05em" }}>
                      DETALLES
                  </h3>
                  {detailsSection}
                </div>
              )}

                {/* Sección PERSONA */}
              {personSection && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2 uppercase text-xs tracking-wider" style={{ color: "#9CA3AF", letterSpacing: "0.05em" }}>
                      PERSONA
                  </h3>
                  {personSection}
                </div>
              )}

                {/* Sección ORGANIZACIÓN */}
              {organizationSection && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2 uppercase text-xs tracking-wider" style={{ color: "#9CA3AF", letterSpacing: "0.05em" }}>
                      ORGANIZACIÓN
                  </h3>
                  {organizationSection}
                </div>
              )}
            </div>

            {/* Panel derecho - Tabs */}
              <div className="flex-1 flex flex-col overflow-hidden" style={{ paddingRight: "16px" }}>
              {/* Tabs */}
              <div className="flex-shrink-0 border-b" style={{ borderColor: "#E5E7EB" }}>
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("notes")}
                    className="px-3 py-2.5 text-xs font-medium transition-colors relative"
                    style={{
                      color: activeTab === "notes" ? "#1D4ED8" : "#6B7280",
                      borderBottom: activeTab === "notes" ? "2px solid #1D4ED8" : "2px solid transparent",
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M2 3H14V13H2V3Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 6H11M5 9H11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      Notas
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("activity")}
                    className="px-3 py-2.5 text-xs font-medium transition-colors relative"
                    style={{
                      color: activeTab === "activity" ? "#1D4ED8" : "#6B7280",
                      borderBottom: activeTab === "activity" ? "2px solid #1D4ED8" : "2px solid transparent",
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <rect
                          x="2"
                          y="2"
                          width="12"
                          height="12"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M5 2V6M11 2V6M2 8H14"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      Actividad
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("email")}
                    className="px-3 py-2.5 text-xs font-medium transition-colors relative"
                    style={{
                      color: activeTab === "email" ? "#1D4ED8" : "#6B7280",
                      borderBottom: activeTab === "email" ? "2px solid #1D4ED8" : "2px solid transparent",
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <rect
                          x="2"
                          y="3"
                          width="12"
                          height="10"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M2 5L8 9L14 5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Email
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("files")}
                    className="px-3 py-2.5 text-xs font-medium transition-colors relative"
                    style={{
                      color: activeTab === "files" ? "#1D4ED8" : "#6B7280",
                      borderBottom: activeTab === "files" ? "2px solid #1D4ED8" : "2px solid transparent",
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 2V10M8 10L5 7M8 10L11 7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 12H14"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      Archivos
                    </div>
                  </button>
                </div>
              </div>

              {/* Contenido de tabs */}
              <div className="flex-1 overflow-y-auto" style={{ padding: "16px" }}>
                {activeTab === "notes" && (
                  <div>
                    {notesContent || (
                      <div>
                        <textarea
                            className="w-full rounded-sm p-3 text-sm resize-none"
                          style={{
                            backgroundColor: "#FEF9C3",
                            border: "1px solid #FDE047",
                            minHeight: "120px",
                              borderRadius: "2px",
                          }}
                            placeholder="Escribe una nota, @nombre..."
                        />
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm" style={{ color: "#111827" }}>
                                Enfoque
                            </h4>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M4 6L8 10L12 6"
                                stroke="#6B7280"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <p className="text-sm" style={{ color: "#6B7280" }}>
                              Aún no hay elementos de enfoque
                          </p>
                          <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>
                              Las actividades programadas, notas fijadas, borradores de email y emails programados aparecerán aquí.
                          </p>
                        </div>
                        <div className="mt-6">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm" style={{ color: "#111827" }}>
                                Historial
                            </h4>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M4 6L8 10L12 6"
                                stroke="#6B7280"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div className="text-sm" style={{ color: "#6B7280" }}>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: "#6B7280" }} />
                              <div>
                                  <div>Lead creado</div>
                                <div className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
                                    3 noviembre 2025 a las 13:03 · Bodas de Hoy
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === "activity" && (
                  <div>
                    {activityContent || (
                      <div>
                        <div className="text-sm" style={{ color: "#6B7280" }}>
                          <input
                            type="text"
                              className="w-full rounded-sm p-3 text-sm"
                            style={{
                              border: "1px solid #E5E7EB",
                                borderRadius: "2px",
                            }}
                              placeholder="Haz clic aquí para añadir una actividad..."
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === "email" && (
                  <div>
                    {emailContent || (entityType && editInitialData?.id ? (
                      entityType === "BUSINESS" ? (
                        <EmailListERP
                          entityId={editInitialData.id}
                          entityType={entityType}
                        />
                      ) : (
                        <EmailList
                          entityId={editInitialData.id}
                          entityType={entityType}
                        />
                      )
                    ) : (
                      <div className="text-center py-12">
                        <h3 className="font-semibold mb-2" style={{ color: "#111827" }}>
                            Cierra tratos más rápido con mejor email
                        </h3>
                        <p className="text-sm mb-4" style={{ color: "#6B7280" }}>
                            Bandeja de entrada de ventas inteligente, segura y configurable
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "files" && (
                  <div>
                    {filesContent || (entityType && editInitialData?.id ? (
                      entityType === "BUSINESS" ? (
                        <div className="space-y-4">
                          <FileUploadZoneERP
                            entityId={editInitialData.id}
                            entityType={entityType}
                          />
                          <FileGalleryERP
                            entityId={editInitialData.id}
                            entityType={entityType}
                          />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <FileUploadZone
                            entityId={editInitialData.id}
                            entityType={entityType}
                          />
                          <FileGallery
                            entityId={editInitialData.id}
                            entityType={entityType}
                          />
                        </div>
                      )
                    ) : (
                      <div>
                        <div
                            className="w-full rounded-sm border-2 border-dashed p-8 text-center"
                          style={{
                            borderColor: "#D1D5DB",
                            backgroundColor: "#F9FAFB",
                              borderRadius: "2px",
                          }}
                        >
                          <button
                              className="px-4 py-2 rounded-sm text-sm font-medium text-white mb-2"
                              style={{ backgroundColor: "#10B981", borderRadius: "2px" }}
                          >
                              Subir archivos
                          </button>
                          <p className="text-sm" style={{ color: "#6B7280" }}>
                              o arrastra archivos aquí
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Share Modal - Renderizado fuera del modal de detalles usando Portal */}
      {/* Solo se renderiza si NO hay prop onShare (para casos donde el componente padre no maneja el estado) */}
      {!onShare && showShareModal && entityType && editInitialData?.id && typeof window !== "undefined" && createPortal(
        entityType === "BUSINESS" ? (
          <ShareEntityModalERP
            isOpen={showShareModal}
            onClose={() => {
              setShowShareModal(false);
            }}
            entityType={entityType}
            entityId={editInitialData.id}
            entityName={title}
            onUpdate={() => {
              // Recargar datos si es necesario
            }}
          />
        ) : (
          <ShareEntityModal
            isOpen={showShareModal}
            onClose={() => {
              setShowShareModal(false);
            }}
            entityType={entityType}
            entityId={editInitialData.id}
            entityName={title}
            onUpdate={() => {
              // Recargar datos si es necesario
            }}
          />
        ),
        document.body
      )}
    </>
  );
}
