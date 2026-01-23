import React, { useState } from "react";
import { TrashIcon, EditIcon, ShareIcon, MoreVerticalIcon, TagIcon } from "../Icons/ProfessionalIcons";

interface BulkActionsProps {
  selectedCount: number;
  onBulkDelete?: () => void;
  onBulkEdit?: () => void;
  onBulkShare?: () => void;
  onBulkTag?: () => void;
  onClearSelection: () => void;
}

export default function BulkActions({
  selectedCount,
  onBulkDelete,
  onBulkEdit,
  onBulkShare,
  onBulkTag,
  onClearSelection,
}: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-6 py-3 flex items-center justify-between shadow-lg"
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #E5E7EB",
      }}
    >
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium" style={{ color: "#111827" }}>
          {selectedCount} {selectedCount === 1 ? "elemento seleccionado" : "elementos seleccionados"}
        </span>
        <button
          onClick={onClearSelection}
          className="text-xs font-medium transition-colors"
          style={{ color: "#6B7280" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#111827";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#6B7280";
          }}
        >
          Limpiar selección
        </button>
      </div>
      <div className="flex items-center gap-2">
        {onBulkEdit && (
          <button
            onClick={onBulkEdit}
            className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5"
            style={{ backgroundColor: "#F3F4F6", color: "#374151" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#E5E7EB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#F3F4F6";
            }}
          >
            <EditIcon size={14} />
            Editar
          </button>
        )}
        {onBulkTag && (
          <button
            onClick={onBulkTag}
            className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5"
            style={{ backgroundColor: "#F3F4F6", color: "#374151" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#E5E7EB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#F3F4F6";
            }}
          >
            <TagIcon size={14} />
            Etiquetar
          </button>
        )}
        {onBulkShare && (
          <button
            onClick={onBulkShare}
            className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5"
            style={{ backgroundColor: "#F3F4F6", color: "#374151" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#E5E7EB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#F3F4F6";
            }}
          >
            <ShareIcon size={14} />
            Compartir
          </button>
        )}
        {onBulkDelete && (
          <button
            onClick={onBulkDelete}
            className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5"
            style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#FECACA";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#FEE2E2";
            }}
          >
            <TrashIcon size={14} />
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}

