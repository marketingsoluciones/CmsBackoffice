import React, { useState, useEffect } from "react";

interface EditLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
  label: {
    id: string;
    name: string;
    color: string;
  };
  onUpdate: (id: string, name: string, color: string) => void;
}

function EditLabelModal({ isOpen, onClose, label, onUpdate }: EditLabelModalProps) {
  const [labelName, setLabelName] = useState(label.name);
  const [selectedColor, setSelectedColor] = useState(label.color);

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

  // Actualizar estado cuando cambia el label
  useEffect(() => {
    if (isOpen && label) {
      setLabelName(label.name);
      setSelectedColor(label.color);
    }
  }, [isOpen, label]);

  if (!isOpen) return null;

  const handleUpdate = () => {
    if (labelName.trim()) {
      onUpdate(label.id, labelName.trim(), selectedColor);
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
              Editar etiqueta
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
            onClick={handleUpdate}
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
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditLabelModal;

