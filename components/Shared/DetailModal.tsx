import React, { useEffect } from "react";

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

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  entityType?: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN" | "WHITELABEL";
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
}

export default function DetailModal({
  isOpen,
  onClose,
  title,
  children,
  entityType,
  onEdit,
  onDelete,
  onShare,
}: DetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Agregar estilos de animación si no existen
      if (!document.getElementById('detail-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'detail-modal-styles';
        style.textContent = slideInRightStyle;
        document.head.appendChild(style);
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay con backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(2px)",
        }}
        onClick={onClose}
      />
      
      {/* Modal que se desliza desde la derecha */}
      <div
        className="fixed right-0 top-0 bottom-0 z-50"
        style={{
          width: "600px",
          maxWidth: "90vw",
          animation: "slideInRight 0.3s ease-out",
        }}
      >
        <div
          className="h-full flex flex-col shadow-2xl"
          style={{
            backgroundColor: "#FFFFFF",
            boxShadow: "-4px 0 24px rgba(0, 0, 0, 0.15)",
          }}
        >
          {/* Header con botones externos estilo Pipedrive */}
          <div className="relative flex-shrink-0" style={{ padding: "20px 24px", borderBottom: "1px solid #E5E7EB" }}>
            {/* Botones en la esquina superior izquierda, fuera del contenedor */}
            <div
              className="absolute flex gap-1"
              style={{
                left: "-44px",
                top: "20px",
                zIndex: 10,
              }}
            >
              {/* Botón cerrar (X) */}
              <button
                onClick={onClose}
                className="flex items-center justify-center rounded-full transition-all duration-200"
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
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

              {/* Botón editar */}
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="flex items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
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
              )}

              {/* Botón compartir */}
              {onShare && (
                <button
                  onClick={onShare}
                  className="flex items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
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
                  className="flex items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
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
            </div>

            {/* Título del modal */}
            <h2
              className="font-semibold"
              style={{
                fontSize: "20px",
                lineHeight: "28px",
                color: "#111827",
                margin: 0,
              }}
            >
              {title}
            </h2>
          </div>

          {/* Contenido scrollable */}
          <div
            className="flex-1 overflow-y-auto"
            style={{
              padding: "24px",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

