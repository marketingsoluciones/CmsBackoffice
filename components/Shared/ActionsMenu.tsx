import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface ActionsMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
  isDeleting?: boolean;
  editLabel?: string;
  deleteLabel?: string;
  shareLabel?: string;
}

export default function ActionsMenu({
  onEdit,
  onDelete,
  onShare,
  isDeleting = false,
  editLabel = "Editar",
  deleteLabel = "Eliminar",
  shareLabel = "Compartir",
}: ActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Calcular posición del menú basándose en la posición del botón
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const menuWidth = 160; // minWidth del menú
        // Alinear el menú a la derecha del botón
        setMenuPosition({
          top: rect.bottom + 4,
          left: rect.right - menuWidth,
        });
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const menuWidth = 160; // minWidth del menú
        // Alinear el menú a la derecha del botón
        setMenuPosition({
          top: rect.bottom + 4,
          left: rect.right - menuWidth,
        });
      }
    };

    if (isOpen) {
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1.5 rounded transition-colors flex items-center justify-center"
        style={{
          backgroundColor: isOpen ? "#F3F4F6" : "transparent",
          color: "#6B7280",
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.backgroundColor = "#F9FAFB";
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }}
        title="Acciones"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="4" r="1.5" fill="currentColor" />
          <circle cx="8" cy="8" r="1.5" fill="currentColor" />
          <circle cx="8" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </button>

      {isOpen && mounted && typeof window !== "undefined" ? createPortal(
        <div
          ref={menuRef}
          className="fixed rounded-lg shadow-lg border"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E5E7EB",
            minWidth: "160px",
            zIndex: 9998,
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
          }}
        >
          {onEdit && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                onEdit();
              }}
              className="w-full px-4 py-2.5 text-sm text-left flex items-center gap-2 transition-colors"
              style={{ color: "#111827" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F9FAFB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M11.3333 2.00004C11.5084 1.82493 11.7163 1.68605 11.9444 1.59131C12.1726 1.49657 12.4163 1.44775 12.6625 1.44775C12.9087 1.44775 13.1524 1.49657 13.3806 1.59131C13.6087 1.68605 13.8166 1.82493 13.9917 2.00004C14.1668 2.17515 14.3057 2.38305 14.4004 2.61119C14.4952 2.83933 14.544 3.08301 14.544 3.32921C14.544 3.57541 14.4952 3.81909 14.4004 4.04723C14.3057 4.27537 14.1668 4.48327 13.9917 4.65838L5.32499 13.325L1.33333 14.6667L2.67499 10.675L11.3333 2.00004Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {editLabel}
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                onDelete();
              }}
              disabled={isDeleting}
              className="w-full px-4 py-2.5 text-sm text-left flex items-center gap-2 transition-colors disabled:opacity-50"
              style={{ color: isDeleting ? "#9CA3AF" : "#DC2626" }}
              onMouseEnter={(e) => {
                if (!isDeleting) {
                  e.currentTarget.style.backgroundColor = "#FEF2F2";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {isDeleting ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="animate-spin"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="12 24"
                  />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 4H14M5.33333 4V2.66667C5.33333 2.31305 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31305 1.33333 6.66667 1.33333H9.33333C9.68696 1.33333 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31305 10.6667 2.66667V4M12.6667 4V13.3333C12.6667 13.687 12.5262 14.0261 12.2761 14.2761C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66667C4.31305 14.6667 3.97391 14.5262 3.72386 14.2761C3.47381 14.0261 3.33333 13.687 3.33333 13.3333V4H12.6667Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {deleteLabel}
            </button>
          )}

          {onShare && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                onShare();
              }}
              className="w-full px-4 py-2.5 text-sm text-left flex items-center gap-2 transition-colors"
              style={{ color: "#111827" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F9FAFB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10.6667 5.33333L13.3333 8L10.6667 10.6667M6.66667 2.66667L3.33333 2.66667C2.97971 2.66667 2.64057 2.80714 2.39052 3.05719C2.14048 3.30724 2 3.64638 2 4V12C2 12.3536 2.14048 12.6928 2.39052 12.9428C2.64057 13.1929 2.97971 13.3333 3.33333 13.3333H6.66667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {shareLabel}
            </button>
          )}
        </div>,
        document.body
      ) : null}
    </div>
  );
}

