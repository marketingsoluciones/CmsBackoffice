import React from "react";
import { Formik, Form, Field } from "formik";
import { ToastContextProvider } from "../../context/ToastContext";
import { getFieldIcon } from "../Icons/ProfessionalIcons";

interface FieldConfig {
  name: string;
  label: string;
  type?: "text" | "number" | "date" | "select" | "textarea" | "email" | "phone" | "datetime-local" | "currency";
  required?: boolean;
  tooltip?: string;
  options?: { value: string; label: string }[];
  placeholder?: string;
  icon?: string; // Emoji o código de icono
  column?: "left" | "right"; // En qué columna mostrar
}

interface PipedriveFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: FieldConfig[];
  initial?: Record<string, any>;
  mutation: string;
  variablesBuilder: (values: Record<string, any>) => any;
  onSuccess: () => void;
  fetcher?: (args: { query: string; variables?: Record<string, any> }) => Promise<any>;
  alertMessage?: {
    icon: string;
    text: string;
    subtext?: string;
    actionText?: string;
    onAction?: () => void;
  };
}


export default function PipedriveFormModal({
  isOpen,
  onClose,
  title,
  fields,
  initial,
  mutation,
  variablesBuilder,
  onSuccess,
  fetcher,
  alertMessage,
}: PipedriveFormModalProps) {
  if (!isOpen) return null;
  const { dispatch } = ToastContextProvider();
  const pushToast = (type: string, message: string) => {
    dispatch({ type: "ADD_TOAST", payload: { id: `${Date.now()}-${Math.random()}`, type, message } } as any);
  };

  // Separar campos por columna
  const leftFields = fields.filter((f) => !f.column || f.column === "left");
  const rightFields = fields.filter((f) => f.column === "right");

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 10000 }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] rounded-sm shadow-2xl flex flex-col"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "2px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-2.5 flex-shrink-0"
          style={{ borderBottom: "1px solid #E5E7EB" }}
        >
          <h3 className="text-sm font-semibold" style={{ color: "#111827" }}>
            {title}
          </h3>
          <button
            className="transition-colors p-1 rounded-sm hover:bg-gray-100"
            style={{ color: "#6B7280", borderRadius: "2px" }}
            onClick={onClose}
            title="Cerrar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Alert Message (opcional) */}
        {alertMessage && (
          <div
            className="mx-4 mt-2 p-2.5 rounded-sm flex items-start gap-2"
            style={{ backgroundColor: "#F3E8FF", border: "1px solid #C084FC", borderRadius: "2px" }}
          >
            <span style={{ fontSize: "16px" }}>{alertMessage.icon}</span>
            <div className="flex-1">
              <p className="text-xs font-medium" style={{ color: "#6B21A8" }}>
                {alertMessage.text}
              </p>
              {alertMessage.subtext && (
                <p className="text-[10px] mt-0.5" style={{ color: "#7C3AED" }}>
                  {alertMessage.subtext}
                </p>
              )}
              {alertMessage.actionText && alertMessage.onAction && (
                <button
                  onClick={alertMessage.onAction}
                  className="text-[10px] font-medium mt-1"
                  style={{ color: "#7C3AED" }}
                >
                  {alertMessage.actionText} →
                </button>
              )}
            </div>
            <button
              onClick={() => {}}
              className="text-gray-500 hover:text-gray-700"
              style={{ fontSize: "14px" }}
            >
              ×
            </button>
          </div>
        )}

        <Formik
          enableReinitialize={true}
          initialValues={(() => {
            const defaults: Record<string, any> = {};
            fields.forEach((f) => {
              const initialValue = initial?.[f.name];
              if (f.type === "date" || f.type === "datetime-local") {
                if (initialValue) {
                  try {
                    const date = new Date(initialValue);
                    if (!isNaN(date.getTime())) {
                      if (f.type === "datetime-local") {
                        // Formato para datetime-local: YYYY-MM-DDTHH:mm
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
            fields.forEach((f) => {
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
              if (fetcher) {
                await fetcher({ query: mutation, variables: variablesBuilder(vals) });
              } else {
                const { fetchApi } = await import("../../utils/Fetching");
                await fetchApi({
                  query: mutation,
                  variables: variablesBuilder(vals),
                  type: "json",
                  development: undefined as any,
                });
              }
              pushToast("success", "Cambios guardados correctamente.");
              onSuccess();
              onClose();
            } catch (e: any) {
              pushToast("error", e?.message || "Error al guardar");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched, values, setFieldValue, handleSubmit }) => (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-3">
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
                              {f.tooltip && (
                                <svg
                                  width="10"
                                  height="10"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  style={{ color: "#9CA3AF" }}
                                  className="ml-0.5"
                                >
                                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" />
                                  <text x="8" y="11" textAnchor="middle" fontSize="9" fill="currentColor">
                                    i
                                  </text>
                                </svg>
                              )}
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
                                {/* Campo adicional para currency o select secundario */}
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
                              <button
                                type="button"
                                className="text-[10px] font-medium flex items-center gap-1 self-start mt-0.5"
                                style={{ color: "#3B82F6" }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = "#2563EB";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = "#3B82F6";
                                }}
                              >
                                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                                  <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                {f.name === "phone" ? "Añadir teléfono" : "Añadir email"}
                              </button>
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
                </Form>
              </div>

              {/* Footer */}
              <div
                className="px-4 py-2 flex items-center justify-between flex-shrink-0"
                style={{ borderTop: "1px solid #E5E7EB", backgroundColor: "#F9FAFB" }}
              >
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium rounded-sm transition-colors"
                    style={{ color: "#6B7280", backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "2px" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#F3F4F6";
                      e.currentTarget.style.color = "#374151";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#FFFFFF";
                      e.currentTarget.style.color = "#6B7280";
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 2V10M8 10L5 7M8 10L11 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Importar
                  </button>
                  <span className="text-[10px]" style={{ color: "#9CA3AF" }}>
                    8/15,000
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{ display: "inline", marginLeft: "2px", verticalAlign: "middle" }}
                    >
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" />
                      <text x="8" y="11" textAnchor="middle" fontSize="8" fill="currentColor">
                        i
                      </text>
                    </svg>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
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
                    onClick={onClose}
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
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleSubmit()}
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
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}

