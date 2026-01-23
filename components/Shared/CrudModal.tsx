import React from "react";
import { fetchApi } from "../../utils/Fetching";
import { Formik, Form, Field } from "formik";
import { ToastContextProvider } from "../../context/ToastContext";

interface CrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: { 
    name: string; 
    label: string; 
    type?: "text" | "number" | "date" | "select" | "textarea"; 
    required?: boolean; 
    tooltip?: string;
    options?: { value: string; label: string }[];
    placeholder?: string;
  }[];
  initial?: Record<string, any>;
  mutation: string;
  variablesBuilder: (values: Record<string, any>) => any;
  onSuccess: () => void;
  fetcher?: (args: { query: string; variables?: Record<string, any> }) => Promise<any>;
}

export default function CrudModal({
  isOpen,
  onClose,
  title,
  fields,
  initial,
  mutation,
  variablesBuilder,
  onSuccess,
  fetcher
}: CrudModalProps) {
  if (!isOpen) return null;
  const { dispatch } = ToastContextProvider();
  const pushToast = (type: string, message: string) => {
    dispatch({ type: "ADD_TOAST", payload: { id: `${Date.now()}-${Math.random()}`, type, message } } as any);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[90vh] shadow-2xl flex flex-col" style={{ backgroundColor: '#FFFFFF', borderRadius: '2px' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-2.5 flex-shrink-0" style={{ borderBottom: '1px solid #E5E7EB' }}>
          <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>{title}</h3>
          <button 
            className="transition-colors p-1 rounded-sm" 
            style={{ color: '#6B7280', borderRadius: '2px' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#374151'; e.currentTarget.style.backgroundColor = '#F3F4F6'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.backgroundColor = 'transparent'; }}
            onClick={onClose}
            title="Cerrar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <Formik
          enableReinitialize={true}
          initialValues={(() => {
            // Asegurar que todos los campos tengan un valor inicial (no undefined)
            const defaults: Record<string, any> = {};
            fields.forEach(f => {
              const initialValue = initial?.[f.name];
              if (f.type === "date") {
                // Convertir ISO string a formato yyyy-MM-dd para inputs de tipo date
                if (initialValue) {
                  try {
                    const date = new Date(initialValue);
                    if (!isNaN(date.getTime())) {
                      defaults[f.name] = date.toISOString().split('T')[0];
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
            fields.forEach(f => {
              if (f.required && !vals[f.name]) {
                errors[f.name] = "Requerido";
              }
              if (f.type === "number" && vals[f.name] && isNaN(Number(vals[f.name]))) {
                errors[f.name] = "Debe ser numérico";
              }
            });
            return errors;
          }}
          onSubmit={async (vals, { setSubmitting }) => {
            try {
              if (fetcher) {
                await fetcher({ query: mutation, variables: variablesBuilder(vals) });
              } else {
                await fetchApi({ query: mutation, variables: variablesBuilder(vals), type: "json", development: undefined as any });
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
                  {fields.map(f => (
                    <div key={f.name} className="flex flex-col gap-0.5">
                      <label className="text-[11px] font-medium" style={{ color: '#6B7280' }} title={f.tooltip || ""}>
                        {f.label}{f.required ? <span className="ml-0.5" style={{ color: '#EF4444' }}>*</span> : ""}
                      </label>
                      {f.type === "select" && f.options ? (
                        <Field
                          name={f.name}
                          as="select"
                          className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all"
                          style={{ 
                            border: `1px solid ${errors[f.name] && touched[f.name] ? '#EF4444' : '#E5E7EB'}`,
                            backgroundColor: '#FFFFFF',
                            minHeight: '32px',
                            borderRadius: '2px'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#3B82F6';
                            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = errors[f.name] && touched[f.name] ? '#EF4444' : '#D1D5DB';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <option value="">{f.placeholder || "Seleccionar..."}</option>
                          {f.options.map(opt => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </Field>
                      ) : f.type === "date" ? (
                        <Field
                          name={f.name}
                          type="date"
                          value={(() => {
                            const val = values[f.name];
                            if (!val) return "";
                            if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
                              return val;
                            }
                            try {
                              const date = new Date(val);
                              if (!isNaN(date.getTime())) {
                                return date.toISOString().split('T')[0];
                              }
                            } catch {}
                            return "";
                          })()}
                          onChange={(e: any) => {
                            setFieldValue(f.name, e.target.value || "");
                          }}
                          className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all"
                          style={{ 
                            border: `1px solid ${errors[f.name] && touched[f.name] ? '#EF4444' : '#E5E7EB'}`,
                            backgroundColor: '#FFFFFF',
                            minHeight: '32px',
                            borderRadius: '2px'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#3B82F6';
                            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = errors[f.name] && touched[f.name] ? '#EF4444' : '#D1D5DB';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      ) : f.type === "textarea" ? (
                        <Field
                          name={f.name}
                          as="textarea"
                          rows={4}
                          placeholder={f.placeholder}
                          className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all resize-none"
                          style={{ 
                            border: `1px solid ${errors[f.name] && touched[f.name] ? '#EF4444' : '#E5E7EB'}`,
                            backgroundColor: '#FFFFFF',
                            borderRadius: '2px'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#3B82F6';
                            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = errors[f.name] && touched[f.name] ? '#EF4444' : '#D1D5DB';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      ) : (
                        <Field
                          name={f.name}
                          type={f.type === "number" ? "number" : "text"}
                          placeholder={f.placeholder}
                          className="rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all"
                          style={{ 
                            border: `1px solid ${errors[f.name] && touched[f.name] ? '#EF4444' : '#E5E7EB'}`,
                            backgroundColor: '#FFFFFF',
                            minHeight: '32px',
                            borderRadius: '2px'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#3B82F6';
                            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = errors[f.name] && touched[f.name] ? '#EF4444' : '#D1D5DB';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      )}
                      {touched[f.name] && typeof (errors as any)[f.name] === "string" ? (
                        <span className="text-[10px]" style={{ color: '#DC2626' }}>{(errors as any)[f.name]}</span>
                      ) : null}
                    </div>
                  ))}
                </Form>
              </div>
              <div className="px-4 py-2 flex items-center justify-end gap-2 flex-shrink-0" style={{ borderTop: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
                <button
                  className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ border: '1px solid #E5E7EB', color: '#374151', backgroundColor: '#FFFFFF', borderRadius: '2px' }}
                  onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#F3F4F6')}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  className="px-3 py-1.5 text-xs font-semibold rounded-sm text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#10B981', borderRadius: '2px' }}
                  onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#059669')}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10B981'}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSubmit()}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Guardando...
                    </span>
                  ) : (
                    "Guardar"
                  )}
                </button>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}


