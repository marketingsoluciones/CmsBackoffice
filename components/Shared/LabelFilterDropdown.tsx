import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCRMLabels } from "../../hooks/useCRMLabels";

interface Label {
  id: string;
  name: string;
  color: string;
}

interface LabelFilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN";
  selectedLabels: string[];
  onSelectLabels: (labelIds: string[]) => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  // Props opcionales para compatibilidad con código existente
  labels?: Label[];
  onCreateLabel?: (name: string, color: string) => void;
}

export default function LabelFilterDropdown({
  isOpen,
  onClose,
  entityType,
  selectedLabels,
  onSelectLabels,
  buttonRef,
  labels: externalLabels,
  onCreateLabel: externalOnCreateLabel,
}: LabelFilterDropdownProps) {
  const { labels: backendLabels, createLabel: createLabelBackend, isLoading } = useCRMLabels(entityType);
  const [searchText, setSearchText] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Usar labels del backend si están disponibles, sino usar los externos
  const labels = backendLabels.length > 0 ? backendLabels : (externalLabels || []);
  
  // Función para crear etiqueta: intentar backend primero, luego externa
  const handleCreateLabel = async (name: string, color: string) => {
    if (backendLabels.length > 0) {
      const newLabel = await createLabelBackend(name, color);
      if (newLabel) {
        onSelectLabels([...selectedLabels, newLabel.id]);
      }
    } else if (externalOnCreateLabel) {
      externalOnCreateLabel(name, color);
    }
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef?.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Calcular posición del dropdown basándose en la posición del botón
      // Alineado a la derecha (de derecha a izquierda)
      if (buttonRef?.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const dropdownWidth = 280; // minWidth del dropdown
        setMenuPosition({
          top: rect.bottom + 4,
          left: rect.right - dropdownWidth,
        });
      }
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen && buttonRef?.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const dropdownWidth = 280; // minWidth del dropdown
        setMenuPosition({
          top: rect.bottom + 4,
          left: rect.right - dropdownWidth,
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
  }, [isOpen, buttonRef]);

  const filteredLabels = labels.filter((label) =>
    label.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // No retornar null si el modal está abierto, para que el modal siga visible
  if (!isOpen && !showCreateModal) return null;

  const handleLabelToggle = (labelId: string) => {
    if (selectedLabels.includes(labelId)) {
      onSelectLabels(selectedLabels.filter((id) => id !== labelId));
    } else {
      onSelectLabels([...selectedLabels, labelId]);
    }
  };

  const dropdownContent = (
    <div
      ref={dropdownRef}
      className="fixed rounded-lg shadow-lg"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        minWidth: "280px",
        maxWidth: "400px",
        zIndex: 9997,
        top: `${menuPosition.top}px`,
        left: `${menuPosition.left}px`,
      }}
    >
        {/* Search bar */}
        <div className="p-3 border-b" style={{ borderColor: "#E5E7EB" }}>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle cx="7" cy="7" r="5" stroke="#9CA3AF" strokeWidth="1.5" />
              <path
                d="M11 11L14 14"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              className="w-full pl-9 pr-3 py-2 rounded text-sm"
              style={{
                border: "1px solid #E5E7EB",
                backgroundColor: "#F9FAFB",
              }}
              placeholder="Buscar etiqueta"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        {/* All labels option */}
        <div className="p-2">
          <div
            className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-50"
            onClick={() => onSelectLabels([])}
          >
            <span className="text-sm font-medium" style={{ color: "#111827" }}>
              Todas las etiquetas
            </span>
            {selectedLabels.length === 0 && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13 4L6 11L3 8"
                  stroke="#1D4ED8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Labels list */}
        <div className="max-h-64 overflow-y-auto">
          {filteredLabels.length > 0 ? (
            filteredLabels.map((label) => (
              <div
                key={label.id}
                className="flex items-center justify-between p-2 mx-2 rounded cursor-pointer hover:bg-gray-50"
                onClick={() => handleLabelToggle(label.id)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: label.color }}
                  />
                  <span className="text-sm" style={{ color: "#111827" }}>
                    {label.name}
                  </span>
                </div>
                {selectedLabels.includes(label.id) && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13 4L6 11L3 8"
                      stroke="#1D4ED8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-sm" style={{ color: "#6B7280" }}>
              No se encontraron etiquetas
            </div>
          )}
        </div>

        {/* Add new label button */}
        <div className="p-2 border-t" style={{ borderColor: "#E5E7EB" }}>
          <button
            className="w-full flex items-center gap-2 p-2 rounded text-sm font-medium transition-colors"
            style={{ color: "#1D4ED8" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#EFF6FF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          onClick={() => {
            setShowCreateModal(true);
            onClose();
          }}
          disabled={isLoading}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 3V13M3 8H13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Añadir nueva etiqueta
          </button>
        </div>
      </div>
  );

  return (
    <>
      {mounted && typeof window !== "undefined" && isOpen && createPortal(dropdownContent, document.body)}

      {/* Create Label Modal */}
      {showCreateModal && (
        <CreateLabelModal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            // No llamar onClose() aquí porque el dropdown ya está cerrado
          }}
          onCreate={async (name, color) => {
            await handleCreateLabel(name, color);
            setShowCreateModal(false);
          }}
        />
      )}
    </>
  );
}

// Modal para crear etiqueta
interface CreateLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, color: string) => void;
}

function CreateLabelModal({ isOpen, onClose, onCreate }: CreateLabelModalProps) {
  const [labelName, setLabelName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#6B7280");

  const colors = [
    "#EF4444", // Red
    "#F59E0B", // Orange
    "#EAB308", // Yellow
    "#10B981", // Green
    "#3B82F6", // Blue
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#6B7280", // Gray
    "#F97316", // Orange-2
    "#84CC16", // Lime
  ];

  if (!isOpen) return null;

  const handleCreate = () => {
    if (labelName.trim()) {
      onCreate(labelName.trim(), selectedColor);
      setLabelName("");
      setSelectedColor("#6B7280");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={onClose}
    >
      <div
        className="rounded-lg shadow-xl"
        style={{
          backgroundColor: "#FFFFFF",
          width: "400px",
          maxWidth: "90vw",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "#E5E7EB" }}>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-gray-100"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="#374151"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <h3 className="font-semibold text-base" style={{ color: "#111827" }}>
              Crear etiqueta
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Label name */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>
              Nombre de la etiqueta
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded text-sm"
              style={{
                border: "1px solid #D1D5DB",
                backgroundColor: "#FFFFFF",
              }}
              placeholder="Nombre de la etiqueta"
              value={labelName}
              onChange={(e) => setLabelName(e.target.value)}
              autoFocus
            />
          </div>

          {/* Color selector */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>
              Color de la etiqueta
            </label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className="w-8 h-8 rounded-full transition-all"
                  style={{
                    backgroundColor: color,
                    border: selectedColor === color ? "3px solid #1D4ED8" : "2px solid transparent",
                    boxShadow: selectedColor === color ? "0 0 0 2px #FFFFFF" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t" style={{ borderColor: "#E5E7EB" }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-sm font-medium transition-colors"
            style={{
              color: "#374151",
              backgroundColor: "#F9FAFB",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#F3F4F6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#F9FAFB";
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 rounded text-sm font-medium text-white transition-colors"
            style={{
              backgroundColor: labelName.trim() ? "#10B981" : "#D1D5DB",
            }}
            disabled={!labelName.trim()}
            onMouseEnter={(e) => {
              if (labelName.trim()) {
                e.currentTarget.style.backgroundColor = "#059669";
              }
            }}
            onMouseLeave={(e) => {
              if (labelName.trim()) {
                e.currentTarget.style.backgroundColor = "#10B981";
              }
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

