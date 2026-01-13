import React, { useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export interface SearchTerm {
  id: string;
  term: string;
  enabled: boolean;
  category?: string;
  priority?: number;
  resultsCount?: number;
  lastUsed?: string;
}

interface SearchTermsEditorProps {
  terms: SearchTerm[];
  onChange: (terms: SearchTerm[]) => void;
  readOnly?: boolean;
  showStats?: boolean;
}

export default function SearchTermsEditor({
  terms,
  onChange,
  readOnly = false,
  showStats = false,
}: SearchTermsEditorProps) {
  const [newTerm, setNewTerm] = useState("");
  const [bulkTerms, setBulkTerms] = useState("");
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const activeTerms = terms.filter((t) => t.enabled).length;
  const totalResults = terms.reduce((sum, t) => sum + (t.resultsCount || 0), 0);

  const generateId = () => `term_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const handleAddTerm = () => {
    if (!newTerm.trim()) return;

    const newSearchTerm: SearchTerm = {
      id: generateId(),
      term: newTerm.trim(),
      enabled: true,
      priority: terms.length + 1,
    };

    onChange([...terms, newSearchTerm]);
    setNewTerm("");
  };

  const handleBulkAdd = () => {
    if (!bulkTerms.trim()) return;

    const lines = bulkTerms
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const newSearchTerms: SearchTerm[] = lines.map((line, index) => ({
      id: generateId(),
      term: line,
      enabled: true,
      priority: terms.length + index + 1,
    }));

    onChange([...terms, ...newSearchTerms]);
    setBulkTerms("");
    setIsBulkMode(false);
  };

  const handleToggleEnabled = (id: string) => {
    if (readOnly) return;
    onChange(
      terms.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
  };

  const handleDelete = (id: string) => {
    if (readOnly) return;
    onChange(terms.filter((t) => t.id !== id));
  };

  const handleStartEdit = (term: SearchTerm) => {
    if (readOnly) return;
    setEditingId(term.id);
    setEditValue(term.term);
  };

  const handleSaveEdit = (id: string) => {
    if (!editValue.trim()) {
      setEditingId(null);
      return;
    }

    onChange(
      terms.map((t) => (t.id === id ? { ...t, term: editValue.trim() } : t))
    );
    setEditingId(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleActivateAll = () => {
    if (readOnly) return;
    onChange(terms.map((t) => ({ ...t, enabled: true })));
  };

  const handleDeactivateAll = () => {
    if (readOnly) return;
    onChange(terms.map((t) => ({ ...t, enabled: false })));
  };

  const handleDeleteAll = () => {
    if (readOnly) return;
    if (confirm("¿Estás seguro de eliminar todos los términos?")) {
      onChange([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="space-y-4">
      {/* Header con estadísticas */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-semibold" style={{ color: "#111827" }}>
            Términos de Búsqueda
          </h4>
          {showStats && (
            <div className="flex items-center gap-4 mt-1">
              <span className="text-[10px]" style={{ color: "#6B7280" }}>
                {activeTerms} activos de {terms.length} total
              </span>
              {totalResults > 0 && (
                <span className="text-[10px]" style={{ color: "#6B7280" }}>
                  {totalResults.toLocaleString()} resultados encontrados
                </span>
              )}
            </div>
          )}
        </div>
        {!readOnly && terms.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsBulkMode(!isBulkMode)}
              className="px-2 py-1 text-[10px] font-medium rounded-sm transition-colors"
              style={{
                backgroundColor: isBulkMode ? "#3B82F6" : "#F3F4F6",
                color: isBulkMode ? "#FFFFFF" : "#374151",
                borderRadius: "2px",
              }}
            >
              {isBulkMode ? "Entrada simple" : "Agregar múltiples"}
            </button>
          </div>
        )}
      </div>

      {/* Agregar término */}
      {!readOnly && (
        <div className="space-y-2">
          {!isBulkMode ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={newTerm}
                onChange={(e) => setNewTerm(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleAddTerm)}
                placeholder="Escribe un término de búsqueda..."
                className="flex-1 px-3 py-2 text-sm rounded-sm focus:outline-none"
                style={{
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "2px",
                }}
              />
              <button
                type="button"
                onClick={handleAddTerm}
                disabled={!newTerm.trim()}
                className="px-3 py-2 text-sm font-medium rounded-sm text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                style={{
                  backgroundColor: "#3B82F6",
                  borderRadius: "2px",
                }}
              >
                <PlusIcon className="w-4 h-4" />
                Agregar
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <textarea
                value={bulkTerms}
                onChange={(e) => setBulkTerms(e.target.value)}
                placeholder="Escribe un término por línea..."
                rows={4}
                className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none"
                style={{
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "2px",
                  fontFamily: "monospace",
                }}
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsBulkMode(false);
                    setBulkTerms("");
                  }}
                  className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors"
                  style={{
                    color: "#6B7280",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "2px",
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleBulkAdd}
                  disabled={!bulkTerms.trim()}
                  className="px-3 py-1.5 text-xs font-medium rounded-sm text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#10B981",
                    borderRadius: "2px",
                  }}
                >
                  Agregar todos
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Lista de términos */}
      {terms.length === 0 ? (
        <div
          className="p-4 rounded-sm text-center"
          style={{
            backgroundColor: "#F9FAFB",
            border: "1px solid #E5E7EB",
            borderRadius: "2px",
          }}
        >
          <p className="text-xs" style={{ color: "#6B7280" }}>
            No hay términos de búsqueda. Agrega uno para comenzar.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Acciones en lote */}
          {!readOnly && (
            <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
              <button
                type="button"
                onClick={handleActivateAll}
                className="px-2 py-1 text-[10px] font-medium rounded-sm transition-colors"
                style={{
                  backgroundColor: "#D1FAE5",
                  color: "#047857",
                  borderRadius: "2px",
                }}
              >
                Activar todos
              </button>
              <button
                type="button"
                onClick={handleDeactivateAll}
                className="px-2 py-1 text-[10px] font-medium rounded-sm transition-colors"
                style={{
                  backgroundColor: "#FEF3C7",
                  color: "#B45309",
                  borderRadius: "2px",
                }}
              >
                Desactivar todos
              </button>
              <button
                type="button"
                onClick={handleDeleteAll}
                className="px-2 py-1 text-[10px] font-medium rounded-sm transition-colors"
                style={{
                  backgroundColor: "#FEE2E2",
                  color: "#DC2626",
                  borderRadius: "2px",
                }}
              >
                Eliminar todos
              </button>
            </div>
          )}

          {/* Términos */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {terms.map((term, index) => {
              const isEditing = editingId === term.id;

              return (
                <div
                  key={term.id}
                  className="flex items-center gap-2 p-2 rounded-sm transition-colors"
                  style={{
                    backgroundColor: term.enabled ? "#F0FDF4" : "#F9FAFB",
                    border: `1px solid ${term.enabled ? "#86EFAC" : "#E5E7EB"}`,
                    borderRadius: "2px",
                  }}
                >
                  {/* Número */}
                  <span
                    className="text-xs font-medium flex-shrink-0 w-6 text-center"
                    style={{ color: "#6B7280" }}
                  >
                    {index + 1}
                  </span>

                  {/* Toggle activar/desactivar */}
                  {!readOnly && (
                    <button
                      type="button"
                      onClick={() => handleToggleEnabled(term.id)}
                      className={`w-10 h-5 rounded-full transition-colors flex-shrink-0 ${
                        term.enabled ? "bg-green-500" : "bg-gray-300"
                      }`}
                      style={{
                        position: "relative",
                      }}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                          term.enabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  )}

                  {/* Término editable */}
                  <div className="flex-1 min-w-0">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleSaveEdit(term.id);
                            } else if (e.key === "Escape") {
                              handleCancelEdit();
                            }
                          }}
                          className="flex-1 px-2 py-1 text-xs rounded-sm focus:outline-none"
                          style={{
                            border: "1px solid #3B82F6",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "2px",
                          }}
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(term.id)}
                          className="p-1 rounded-sm transition-colors"
                          style={{
                            color: "#10B981",
                            backgroundColor: "transparent",
                          }}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="p-1 rounded-sm transition-colors"
                          style={{
                            color: "#DC2626",
                            backgroundColor: "transparent",
                          }}
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs flex-1 ${
                            term.enabled ? "text-gray-900" : "text-gray-400"
                          }`}
                        >
                          {term.term}
                        </span>
                        {showStats && term.resultsCount !== undefined && (
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded-sm flex-shrink-0"
                            style={{
                              backgroundColor: "#EFF6FF",
                              color: "#1D4ED8",
                              borderRadius: "2px",
                            }}
                          >
                            {term.resultsCount.toLocaleString()} resultados
                          </span>
                        )}
                        {showStats && term.lastUsed && (
                          <span
                            className="text-[10px] flex-shrink-0"
                            style={{ color: "#6B7280" }}
                          >
                            {new Date(term.lastUsed).toLocaleDateString("es-ES")}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Acciones */}
                  {!readOnly && !isEditing && (
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(term)}
                        className="p-1 rounded-sm transition-colors"
                        style={{
                          color: "#3B82F6",
                          backgroundColor: "transparent",
                        }}
                        title="Editar"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(term.id)}
                        className="p-1 rounded-sm transition-colors"
                        style={{
                          color: "#DC2626",
                          backgroundColor: "transparent",
                        }}
                        title="Eliminar"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

