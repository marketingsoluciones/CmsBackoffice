import React from "react";
import {
  XMarkIcon,
  ClipboardDocumentListIcon,
  Bars3Icon,
  MapPinIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { ERPColumnConfig } from "./AdvancedTableERP";

interface ColumnsConfigModalERPProps {
  isOpen: boolean;
  onClose: () => void;
  columns: ERPColumnConfig[];
  onChangeColumns: (cols: ERPColumnConfig[]) => void;
  onReset?: () => void;
  onSave?: () => void;
}

export default function ColumnsConfigModalERP({
  isOpen,
  onClose,
  columns,
  onChangeColumns,
  onReset,
  onSave
}: ColumnsConfigModalERPProps) {
  if (!isOpen) return null;
  const handleToggle = (field: string) => {
    const next = columns.map(c => c.field === field ? { ...c, visible: !c.visible } : c);
    onChangeColumns(next);
  };
  const handleWidth = (field: string, width: number) => {
    const next = columns.map(c => c.field === field ? { ...c, width } : c);
    onChangeColumns(next);
  };
  const handlePinned = (field: string) => {
    const next = columns.map(c => c.field === field ? { ...c, pinned: !c.pinned } : c);
    onChangeColumns(next);
  };
  const move = (from: number, to: number) => {
    const arr = [...columns].sort((a, b) => a.order - b.order);
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    const normalized = arr.map((c, idx) => ({ ...c, order: idx }));
    onChangeColumns(normalized);
  };
  const ordered = [...columns].sort((a, b) => a.order - b.order);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(2px)" }}
          onClick={onClose}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col"
            style={{ borderRadius: "2px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "#E5E7EB" }}>
              <div className="flex items-center gap-2">
                <ClipboardDocumentListIcon width={20} height={20} style={{ color: "#6B7280" }} />
                <h2 className="text-lg font-semibold" style={{ color: "#111827" }}>
                  Configurar columnas
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-sm transition-colors"
                style={{ color: "#6B7280" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F3F4F6";
                  e.currentTarget.style.color = "#374151";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#6B7280";
                }}
              >
                <XMarkIcon width={20} height={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {ordered.map((col, idx) => (
                  <div
                    key={col.field}
                    className="flex items-center gap-3 p-3 rounded-sm border"
                    style={{
                      borderColor: "#E5E7EB",
                      backgroundColor: col.visible ? "#FFFFFF" : "#F9FAFB",
                    }}
                  >
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Bars3Icon width={16} height={16} style={{ color: "#9CA3AF", cursor: "move" }} />
                      {col.pinned && (
                        <MapPinIcon width={14} height={14} style={{ color: "#3B82F6" }} title="Fijada" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium" style={{ color: "#111827" }}>
                          {col.label}
                        </span>
                        {col.tooltip && (
                          <span className="text-xs" style={{ color: "#9CA3AF" }}>
                            ({col.tooltip})
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="number"
                          value={col.width || ""}
                          onChange={(e) => handleWidth(col.field, parseInt(e.target.value) || 0)}
                          placeholder="Ancho"
                          className="text-xs px-2 py-1 rounded border"
                          style={{
                            borderColor: "#E5E7EB",
                            width: "80px",
                            borderRadius: "2px",
                          }}
                        />
                        <span className="text-xs" style={{ color: "#6B7280" }}>px</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handlePinned(col.field)}
                        className={`p-1.5 rounded transition-colors ${
                          col.pinned ? "bg-blue-50" : "bg-transparent"
                        }`}
                        style={{
                          color: col.pinned ? "#3B82F6" : "#9CA3AF",
                          borderRadius: "2px",
                        }}
                        onMouseEnter={(e) => {
                          if (!col.pinned) {
                            e.currentTarget.style.backgroundColor = "#F3F4F6";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!col.pinned) {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }
                        }}
                        title={col.pinned ? "Desfijar columna" : "Fijar columna"}
                      >
                        <MapPinIcon width={16} height={16} />
                      </button>
                      <button
                        onClick={() => handleToggle(col.field)}
                        className={`p-1.5 rounded transition-colors ${
                          col.visible ? "bg-green-50" : "bg-transparent"
                        }`}
                        style={{
                          color: col.visible ? "#10B981" : "#9CA3AF",
                          borderRadius: "2px",
                        }}
                        onMouseEnter={(e) => {
                          if (!col.visible) {
                            e.currentTarget.style.backgroundColor = "#F3F4F6";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!col.visible) {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }
                        }}
                        title={col.visible ? "Ocultar columna" : "Mostrar columna"}
                      >
                        <EyeIcon width={16} height={16} />
                      </button>
                      {idx > 0 && (
                        <button
                          onClick={() => move(idx, idx - 1)}
                          className="p-1.5 rounded transition-colors"
                          style={{
                            color: "#6B7280",
                            borderRadius: "2px",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#F3F4F6";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                          title="Mover arriba"
                        >
                          <ChevronUpIcon width={16} height={16} />
                        </button>
                      )}
                      {idx < ordered.length - 1 && (
                        <button
                          onClick={() => move(idx, idx + 1)}
                          className="p-1.5 rounded transition-colors"
                          style={{
                            color: "#6B7280",
                            borderRadius: "2px",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#F3F4F6";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                          title="Mover abajo"
                        >
                          <ChevronDownIcon width={16} height={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-4 border-t" style={{ borderColor: "#E5E7EB" }}>
              {onReset && (
                <button
                  onClick={onReset}
                  className="px-4 py-2 text-sm rounded-sm transition-colors"
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
                  Restablecer
                </button>
              )}
              <button
                onClick={() => {
                  if (onSave) onSave();
                  onClose();
                }}
                className="px-4 py-2 text-sm font-medium text-white rounded-sm transition-colors"
                style={{
                  backgroundColor: "#3B82F6",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2563EB";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#3B82F6";
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

