import React, { useEffect, useState } from "react";
import { CRM_QUERIES } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { useCRM } from "../../context/CRMContext";
import { ToastContextProvider } from "../../context/ToastContext";
import EmailComposerERP from "./EmailComposerERP";

interface EmailListERPProps {
  entityId: string;
  entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN" | "BUSINESS";
  filters?: any;
  onEmailClick?: (emailId: string) => void;
}

export default function EmailListERP({
  entityId,
  entityType,
  filters,
  onEmailClick,
}: EmailListERPProps) {
  const [emails, setEmails] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [replyToEmailId, setReplyToEmailId] = useState<string | undefined>();
  const { entityEmails, setEntityEmails } = useCRM();
  const { dispatch } = ToastContextProvider();

  const pushToast = (type: string, message: string) => {
    dispatch({
      type: "ADD_TOAST",
      payload: { id: `${Date.now()}-${Math.random()}`, type, message }
    } as any);
  };

  useEffect(() => {
    loadEmails();
  }, [entityId, filters]);

  const loadEmails = async () => {
    const cached = entityEmails[entityId];
    if (cached && cached.length > 0) {
      setEmails(cached);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchApiCRM({
        query: CRM_QUERIES.GET_CRM_ENTITY_EMAILS,
        variables: {
          entityId,
          entityType,
          filters: filters || undefined,
          pagination: { page: 1, limit: 50 }
        }
      });
      if (response?.getCRMEntityEmails?.success) {
        const loadedEmails = response.getCRMEntityEmails.emails || [];
        setEmails(loadedEmails);
        setEntityEmails(entityId, loadedEmails);
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al cargar emails");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SENT": return { bg: "#D1FAE5", text: "#047857" };
      case "DRAFT": return { bg: "#F3F4F6", text: "#374151" };
      case "FAILED": return { bg: "#FEE2E2", text: "#DC2626" };
      case "SCHEDULED": return { bg: "#DBEAFE", text: "#1D4ED8" };
      default: return { bg: "#F3F4F6", text: "#374151" };
    }
  };

  if (showComposer) {
    return (
      <div>
        <EmailComposerERP
          entityId={entityId}
          entityType={entityType}
          mode={replyToEmailId ? "reply" : "compose"}
          replyToEmailId={replyToEmailId}
          onSend={() => {
            setShowComposer(false);
            setReplyToEmailId(undefined);
            loadEmails();
          }}
          onCancel={() => {
            setShowComposer(false);
            setReplyToEmailId(undefined);
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: "#111827" }}>Emails</h3>
        <button
          className="px-3 py-1.5 text-sm font-medium text-white rounded transition-colors"
          style={{ backgroundColor: "#3B82F6", borderRadius: "2px" }}
          onClick={() => setShowComposer(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#2563EB";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#3B82F6";
          }}
        >
          Nuevo Email
        </button>
      </div>

      {isLoading ? (
        <p style={{ color: "#6B7280" }}>Cargando emails...</p>
      ) : emails.length === 0 ? (
        <div className="text-center py-8">
          <p style={{ color: "#9CA3AF" }}>No hay emails</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {emails.map((email) => {
            const statusColors = getStatusColor(email.status);
            return (
              <div
                key={email.id}
                className="p-4 border rounded cursor-pointer transition-colors"
                style={{
                  borderColor: "#E5E7EB",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F9FAFB";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                onClick={() => onEmailClick && onEmailClick(email.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium" style={{ color: "#111827" }}>{email.subject}</p>
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{ backgroundColor: statusColors.bg, color: statusColors.text }}
                    >
                      {email.status}
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>
                    {new Date(email.sentAt || email.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0">
                    <p className="text-xs" style={{ color: "#4B5563" }}>
                      De: {email.from}
                    </p>
                    <p className="text-xs" style={{ color: "#4B5563" }}>
                      Para: {email.to.join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {email.direction === "INBOUND" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setReplyToEmailId(email.id);
                          setShowComposer(true);
                        }}
                        className="p-1.5 rounded transition-colors"
                        style={{ color: "#6B7280" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#F3F4F6";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                        title="Responder"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9 10 4 15 9 20" />
                          <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Implementar forward
                      }}
                      className="p-1.5 rounded transition-colors"
                      style={{ color: "#6B7280" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#F3F4F6";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                      title="Reenviar"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 17 20 12 15 7" />
                        <path d="M4 18v-5a4 4 0 0 1 4-4h12" />
                      </svg>
                    </button>
                  </div>
                </div>
                {email.tracking?.opened && (
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{ backgroundColor: "#D1FAE5", color: "#047857" }}
                    >
                      Abierto {email.tracking.openCount}x
                    </span>
                    {email.tracking.clicked && (
                      <span
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{ backgroundColor: "#DBEAFE", color: "#1D4ED8" }}
                      >
                        Clicked {email.tracking.clickCount}x
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

