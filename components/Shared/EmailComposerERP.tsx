import React, { useState, useEffect } from "react";
import { CRM_MUTATIONS } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { useCRM } from "../../context/CRMContext";
import { ToastContextProvider } from "../../context/ToastContext";

interface EmailComposerERPProps {
  entityId: string;
  entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN" | "BUSINESS";
  mode?: "compose" | "reply" | "forward";
  replyToEmailId?: string;
  onSend?: () => void;
  onSaveDraft?: () => void;
  onCancel?: () => void;
}

export default function EmailComposerERP({
  entityId,
  entityType,
  mode = "compose",
  replyToEmailId,
  onSend,
  onSaveDraft,
  onCancel,
}: EmailComposerERPProps) {
  const [to, setTo] = useState<string[]>([]);
  const [toInput, setToInput] = useState("");
  const [cc, setCc] = useState<string[]>([]);
  const [ccInput, setCcInput] = useState("");
  const [bcc, setBcc] = useState<string[]>([]);
  const [bccInput, setBccInput] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [bodyHtml, setBodyHtml] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledFor, setScheduledFor] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { dispatch } = ToastContextProvider();
  const { addEntityEmail } = useCRM();

  const pushToast = (type: string, message: string) => {
    dispatch({
      type: "ADD_TOAST",
      payload: { id: `${Date.now()}-${Math.random()}`, type, message }
    } as any);
  };

  useEffect(() => {
    if (mode === "reply" && replyToEmailId) {
      setSubject(`Re: [Subject del email original]`);
    } else if (mode === "forward") {
      setSubject(`Fwd: [Subject del email original]`);
    }
  }, [mode, replyToEmailId]);

  const addEmailToList = (list: string[], setList: (emails: string[]) => void, email: string) => {
    const trimmed = email.trim();
    if (trimmed && !list.includes(trimmed)) {
      setList([...list, trimmed]);
    }
  };

  const removeEmailFromList = (list: string[], setList: (emails: string[]) => void, email: string) => {
    setList(list.filter(e => e !== email));
  };

  const handleSend = async () => {
    if (!to.length) {
      pushToast("error", "Debes agregar al menos un destinatario");
      return;
    }

    if (!subject.trim()) {
      pushToast("error", "El asunto es requerido");
      return;
    }

    setIsSending(true);
    try {
      const input: any = {
        entityId,
        entityType,
        to,
        cc: cc.length > 0 ? cc : undefined,
        bcc: bcc.length > 0 ? bcc : undefined,
        subject: subject.trim(),
        body: body.trim(),
        bodyHtml: bodyHtml.trim() || undefined,
      };

      if (isScheduled && scheduledFor) {
        input.scheduledFor = scheduledFor;
      }

      if (mode === "reply" && replyToEmailId) {
        const response = await fetchApiCRM({
          query: CRM_MUTATIONS.REPLY_CRM_EMAIL,
          variables: {
            emailId: replyToEmailId,
            body: body.trim(),
            bodyHtml: bodyHtml.trim() || undefined,
          }
        });
        if (response?.replyCRMEmail?.success) {
          addEntityEmail(entityId, response.replyCRMEmail.email);
          pushToast("success", "Email enviado");
          if (onSend) onSend();
        } else {
          throw new Error(response?.replyCRMEmail?.errors?.[0]?.message || "Error al enviar email");
        }
      } else {
        const response = await fetchApiCRM({
          query: CRM_MUTATIONS.SEND_CRM_EMAIL,
          variables: { input }
        });
        if (response?.sendCRMEmail?.success) {
          addEntityEmail(entityId, response.sendCRMEmail.email);
          pushToast("success", isScheduled ? "Email programado" : "Email enviado");
          if (onSend) onSend();
        } else {
          throw new Error(response?.sendCRMEmail?.errors?.[0]?.message || "Error al enviar email");
        }
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al enviar email");
    } finally {
      setIsSending(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.CREATE_CRM_EMAIL_DRAFT,
        variables: {
          input: {
            entityId,
            entityType,
            to,
            cc: cc.length > 0 ? cc : undefined,
            bcc: bcc.length > 0 ? bcc : undefined,
            subject: subject.trim(),
            body: body.trim(),
            bodyHtml: bodyHtml.trim() || undefined,
          }
        }
      });
      if (response?.createCRMEmailDraft?.success) {
        pushToast("success", "Borrador guardado");
        if (onSaveDraft) onSaveDraft();
      } else {
        throw new Error(response?.createCRMEmailDraft?.errors?.[0]?.message || "Error al guardar borrador");
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al guardar borrador");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        {/* To */}
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: "#374151" }}>Para</p>
          <div className="flex items-center gap-2 flex-wrap">
            {to.map((email) => (
              <span
                key={email}
                className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium"
                style={{ backgroundColor: "#DBEAFE", color: "#1D4ED8" }}
              >
                {email}
                <button
                  onClick={() => removeEmailFromList(to, setTo, email)}
                  className="p-0.5 rounded transition-colors"
                  style={{ color: "#1D4ED8" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#BFDBFE";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="email"
              className="px-3 py-1.5 text-sm rounded border flex-1 min-w-[200px]"
              style={{
                borderColor: "#E5E7EB",
                borderRadius: "2px",
              }}
              placeholder="email@ejemplo.com"
              value={toInput}
              onChange={(e) => setToInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addEmailToList(to, setTo, toInput);
                  setToInput("");
                }
              }}
              onBlur={() => {
                if (toInput.trim()) {
                  addEmailToList(to, setTo, toInput);
                  setToInput("");
                }
              }}
            />
          </div>
        </div>

        {/* CC */}
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: "#374151" }}>CC</p>
          <div className="flex items-center gap-2 flex-wrap">
            {cc.map((email) => (
              <span
                key={email}
                className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium"
                style={{ backgroundColor: "#F3F4F6", color: "#374151" }}
              >
                {email}
                <button
                  onClick={() => removeEmailFromList(cc, setCc, email)}
                  className="p-0.5 rounded transition-colors"
                  style={{ color: "#374151" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#E5E7EB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="email"
              className="px-3 py-1.5 text-sm rounded border flex-1 min-w-[200px]"
              style={{
                borderColor: "#E5E7EB",
                borderRadius: "2px",
              }}
              placeholder="email@ejemplo.com"
              value={ccInput}
              onChange={(e) => setCcInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addEmailToList(cc, setCc, ccInput);
                  setCcInput("");
                }
              }}
              onBlur={() => {
                if (ccInput.trim()) {
                  addEmailToList(cc, setCc, ccInput);
                  setCcInput("");
                }
              }}
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: "#374151" }}>Asunto</p>
          <input
            type="text"
            className="w-full px-3 py-2 rounded border text-sm"
            style={{
              borderColor: "#E5E7EB",
              borderRadius: "2px",
            }}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Asunto del email"
          />
        </div>

        {/* Body */}
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: "#374151" }}>Mensaje</p>
          <textarea
            className="w-full px-3 py-2 rounded border text-sm"
            style={{
              borderColor: "#E5E7EB",
              borderRadius: "2px",
            }}
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              setBodyHtml(e.target.value.replace(/\n/g, "<br/>"));
            }}
            placeholder="Escribe tu mensaje aquí..."
            rows={10}
          />
        </div>

        {/* Schedule */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isScheduled}
              onChange={(e) => setIsScheduled(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm" style={{ color: "#374151" }}>Programar envío</span>
          </label>
          {isScheduled && (
            <input
              type="datetime-local"
              className="w-full px-3 py-2 rounded border text-sm mt-2"
              style={{
                borderColor: "#E5E7EB",
                borderRadius: "2px",
              }}
              value={scheduledFor}
              onChange={(e) => setScheduledFor(e.target.value)}
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 justify-end">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium rounded transition-colors"
              style={{
                border: "1px solid #E5E7EB",
                color: "#374151",
                borderRadius: "2px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F9FAFB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Cancelar
            </button>
          )}
          <button
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="px-4 py-2 text-sm font-medium rounded transition-colors disabled:opacity-50"
            style={{
              border: "1px solid #E5E7EB",
              color: "#374151",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = "#F9FAFB";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {isSaving ? "Guardando..." : "Guardar borrador"}
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white rounded transition-colors disabled:opacity-50"
            style={{ backgroundColor: "#3B82F6", borderRadius: "2px" }}
            onClick={handleSend}
            disabled={isSending}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = "#2563EB";
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = "#3B82F6";
              }
            }}
          >
            {isSending ? (isScheduled ? "Programando..." : "Enviando...") : (isScheduled ? "Programar envío" : "Enviar")}
          </button>
        </div>
      </div>
    </div>
  );
}

