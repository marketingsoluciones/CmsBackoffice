import React, { useState } from "react";
import { FilterIcon, XIcon } from "../Icons/ProfessionalIcons";

interface QuickFilter {
  id: string;
  label: string;
  value: string;
  color?: string;
}

interface QuickFiltersProps {
  filters: QuickFilter[];
  activeFilters: string[];
  onToggleFilter: (filterId: string) => void;
  onClearAll: () => void;
}

export default function QuickFilters({
  filters,
  activeFilters,
  onToggleFilter,
  onClearAll,
}: QuickFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#6B7280" }}>
        <FilterIcon size={14} />
        <span>Filtros rápidos:</span>
      </div>
      {filters.map((filter) => {
        const isActive = activeFilters.includes(filter.id);
        return (
          <button
            key={filter.id}
            onClick={() => onToggleFilter(filter.id)}
            className="px-2.5 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5"
            style={{
              backgroundColor: isActive ? (filter.color || "#3B82F6") : "#F3F4F6",
              color: isActive ? "#FFFFFF" : "#374151",
              border: isActive ? "none" : "1px solid #E5E7EB",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "#E5E7EB";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "#F3F4F6";
              }
            }}
          >
            {filter.label}
            {isActive && (
              <XIcon size={12} style={{ color: "#FFFFFF" }} />
            )}
          </button>
        );
      })}
      {activeFilters.length > 0 && (
        <button
          onClick={onClearAll}
          className="px-2.5 py-1 rounded-md text-xs font-medium transition-colors"
          style={{ color: "#6B7280", backgroundColor: "transparent" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#111827";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#6B7280";
          }}
        >
          Limpiar todos
        </button>
      )}
    </div>
  );
}

