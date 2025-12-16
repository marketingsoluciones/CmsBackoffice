import React from "react";
import { Formik, Form, Field } from "formik";
import { ToastContextProvider } from "../../context/ToastContext";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: { userIds?: string[]; teamIds?: string[]; permissions: "READ" | "WRITE" | "ADMIN"; sendNotification?: boolean; message?: string }) => Promise<void> | void;
  entityLabel: string;
}

export default function ShareModal({ isOpen, onClose, onSubmit, entityLabel }: ShareModalProps) {
  if (!isOpen) return null;
  const { dispatch } = ToastContextProvider();
  const pushToast = (type: string, message: string) => {
    dispatch({ type: "ADD_TOAST", payload: { id: `${Date.now()}-${Math.random()}`, type, message } } as any);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 10000 }}>
      <div className="w-full max-w-lg rounded-xl shadow-lg p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #F3F4F6' }}>
        <div className="flex items-center justify-between mb-4 pb-2" style={{ borderBottom: '1px solid #F3F4F6' }}>
          <h3 className="text-base font-semibold" style={{ color: '#3B82F6' }}>Compartir {entityLabel}</h3>
          <button className="text-sm transition-colors" style={{ color: '#6B7280' }} onMouseEnter={(e) => e.currentTarget.style.color = '#374151'} onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'} onClick={onClose}>✕</button>
        </div>
        <Formik
          initialValues={{ userIds: "", teamIds: "", permissions: "READ", sendNotification: false, message: "" }}
          validate={(vals) => {
            const errors: Record<string, string> = {};
            if (!vals.userIds && !vals.teamIds) {
              errors.userIds = "Proporciona al menos un usuario o equipo";
              errors.teamIds = "Proporciona al menos un usuario o equipo";
            }
            return errors;
          }}
          onSubmit={async (vals, { setSubmitting }) => {
            try {
              await onSubmit({
                userIds: vals.userIds ? vals.userIds.split(",").map(s => s.trim()).filter(Boolean) : undefined,
                teamIds: vals.teamIds ? vals.teamIds.split(",").map(s => s.trim()).filter(Boolean) : undefined,
                permissions: vals.permissions as any,
                sendNotification: vals.sendNotification,
                message: vals.message || undefined
              });
              pushToast("success", `El ${entityLabel} se ha compartido correctamente.`);
              onClose();
            } catch (e: any) {
              pushToast("error", e?.message || "Error al compartir");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium" style={{ color: '#4B5563' }} title="IDs de usuario, separados por coma">User IDs</label>
                <Field
                  name="userIds"
                  className="rounded-md px-2 py-1 text-sm focus:outline-none transition-colors"
                  style={{ border: `1px solid ${errors.userIds && touched.userIds ? '#EF4444' : '#E5E7EB'}` }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                  onBlur={(e) => e.currentTarget.style.borderColor = errors.userIds && touched.userIds ? '#EF4444' : '#E5E7EB'}
                  placeholder="uid1, uid2"
                />
                {errors.userIds && touched.userIds ? <span className="text-xs" style={{ color: '#DC2626' }}>{errors.userIds}</span> : null}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium" style={{ color: '#4B5563' }} title="IDs de equipo, separados por coma">Team IDs</label>
                <Field
                  name="teamIds"
                  className="rounded-md px-2 py-1 text-sm focus:outline-none transition-colors"
                  style={{ border: `1px solid ${errors.teamIds && touched.teamIds ? '#EF4444' : '#E5E7EB'}` }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                  onBlur={(e) => e.currentTarget.style.borderColor = errors.teamIds && touched.teamIds ? '#EF4444' : '#E5E7EB'}
                  placeholder="team1, team2"
                />
                {errors.teamIds && touched.teamIds ? <span className="text-xs" style={{ color: '#DC2626' }}>{errors.teamIds}</span> : null}
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium" style={{ color: '#4B5563' }}>Permisos</label>
                <Field
                  as="select"
                  name="permissions"
                  className="rounded-md px-2 py-1 text-sm focus:outline-none transition-colors"
                  style={{ border: '1px solid #E5E7EB' }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                  title="Nivel de permisos otorgados"
                >
                  <option value="READ">READ</option>
                  <option value="WRITE">WRITE</option>
                  <option value="ADMIN">ADMIN</option>
                </Field>
              </div>
              <div className="flex items-center gap-2">
                <Field type="checkbox" name="sendNotification" />
                <span className="text-sm" style={{ color: '#374151' }} title="Si está activo, se notificará a los destinatarios">Enviar notificación</span>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium" style={{ color: '#4B5563' }}>Mensaje</label>
                <Field
                  as="textarea"
                  name="message"
                  className="rounded-md px-2 py-1 text-sm focus:outline-none transition-colors"
                  style={{ border: '1px solid #E5E7EB' }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                  placeholder="Mensaje opcional"
                />
              </div>
              <div className="flex items-center justify-end gap-2 mt-2">
                <button
                  className="px-3 py-1 text-sm rounded-full transition-colors disabled:opacity-40"
                  style={{ border: '1px solid #E5E7EB', color: '#374151', backgroundColor: '#FFFFFF' }}
                  onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  className="px-3 py-1 text-sm rounded-full text-white transition-colors disabled:opacity-60"
                  style={{ border: '1px solid #3B82F6', backgroundColor: '#3B82F6' }}
                  onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#2563EB')}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3B82F6'}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Compartiendo..." : "Compartir"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}


