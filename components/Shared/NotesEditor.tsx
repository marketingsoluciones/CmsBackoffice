import React, { useState, useRef, useEffect, useCallback } from "react";
import { EditIcon, CheckIcon, XIcon } from "../Icons/ProfessionalIcons";

interface NotesEditorProps {
  value: string | null | undefined;
  placeholder?: string;
  onSave: (value: string) => Promise<void> | void;
  entityType?: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN";
}

export default function NotesEditor({
  value,
  placeholder = "Take a note, @name...",
  onSave,
  entityType,
}: NotesEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayValue = value || "";

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [isEditing]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      await onSave(editValue);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving notes:", error);
    } finally {
      setIsSaving(false);
    }
  }, [editValue, onSave]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        isEditing
      ) {
        handleSave();
      }
    };

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isEditing, handleSave]);

  const handleClick = () => {
    if (!isEditing) {
      setEditValue(displayValue);
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditValue(displayValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCancel();
    }
    // Ctrl/Cmd + Enter para guardar
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  const insertText = (before: string, after: string = "") => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = editValue.substring(start, end);
    const newText =
      editValue.substring(0, start) +
      before +
      selectedText +
      after +
      editValue.substring(end);
    setEditValue(newText);
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // Estado: Editando
  if (isEditing) {
    return (
      <div ref={containerRef} className="w-full">
        {/* Toolbar de formato */}
        <div
          className="flex items-center gap-1 p-2 rounded-t-lg border-b"
          style={{
            backgroundColor: "#F9FAFB",
            borderColor: "#E5E7EB",
            borderWidth: "2px 2px 1px 2px",
          }}
        >
          <button
            type="button"
            onClick={() => insertText("**", "**")}
            className="p-1.5 rounded transition-colors"
            style={{ color: "#374151" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#E5E7EB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            title="Negrita"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M5.33333 2.66667V7.33333M5.33333 7.33333H8.66667C9.40305 7.33333 10 6.73638 10 6C10 5.26362 9.40305 4.66667 8.66667 4.66667H5.33333M5.33333 7.33333V13.3333M5.33333 7.33333H10C10.7364 7.33333 11.3333 7.93029 11.3333 8.66667C11.3333 9.40305 10.7364 10 10 10H5.33333"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => insertText("*", "*")}
            className="p-1.5 rounded transition-colors"
            style={{ color: "#374151" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#E5E7EB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            title="Cursiva"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 2.66667L10 13.3333M2.66667 13.3333H13.3333"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div
            className="w-px h-4"
            style={{ backgroundColor: "#D1D5DB" }}
          />
          <button
            type="button"
            onClick={() => insertText("- ", "")}
            className="p-1.5 rounded transition-colors"
            style={{ color: "#374151" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#E5E7EB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            title="Lista"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="3" cy="4" r="1" fill="currentColor" />
              <circle cx="3" cy="8" r="1" fill="currentColor" />
              <circle cx="3" cy="12" r="1" fill="currentColor" />
              <path
                d="M6 4H14M6 8H14M6 12H14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => insertText("1. ", "")}
            className="p-1.5 rounded transition-colors"
            style={{ color: "#374151" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#E5E7EB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            title="Lista numerada"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 2V4H4V3H5V2H3ZM3 6V8H5V6H3ZM3 10V12H4V11H5V10H3ZM6 4H14M6 8H14M6 12H14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div
            className="w-px h-4"
            style={{ backgroundColor: "#D1D5DB" }}
          />
          <button
            type="button"
            onClick={() => insertText("@", "")}
            className="p-1.5 rounded transition-colors"
            style={{ color: "#374151" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#E5E7EB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            title="Mencionar"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M4 6V10C4 12.2091 5.79086 14 8 14C10.2091 14 12 12.2091 12 10V6"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
        <textarea
          ref={textareaRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={6}
          className="w-full rounded-b-lg px-4 py-3 text-sm focus:outline-none resize-none transition-all"
          style={{
            border: "2px solid #3B82F6",
            borderTop: "none",
            backgroundColor: "#FFFFFF",
            color: "#111827",
            fontFamily: "inherit",
            lineHeight: "1.5",
          }}
          placeholder={placeholder}
        />
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1"
              style={{
                backgroundColor: "#F3F4F6",
                color: "#374151",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#E5E7EB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#F3F4F6";
              }}
              onClick={handleCancel}
              disabled={isSaving}
            >
              <XIcon size={12} />
              Cancelar
            </button>
            <span className="text-xs" style={{ color: "#9CA3AF" }}>
              Ctrl+Enter para guardar
            </span>
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-1.5 rounded-md text-xs font-medium transition-colors disabled:opacity-50 flex items-center gap-1.5"
            style={{
              backgroundColor: "#10B981",
              color: "#FFFFFF",
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = "#059669";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#10B981";
            }}
          >
            {isSaving ? (
              <>
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Guardando...
              </>
            ) : (
              <>
                <CheckIcon size={12} />
                Guardar
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Estado: Mostrando valor o placeholder
  return (
    <div
      ref={containerRef}
      className="w-full cursor-pointer transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div
        className="w-full rounded-lg px-4 py-3 text-sm transition-all"
        style={{
          border: `1px solid ${isHovered ? "#3B82F6" : "#E5E7EB"}`,
          backgroundColor: isHovered ? "#F0F9FF" : "#FFFFFF",
          color: displayValue ? "#111827" : "#9CA3AF",
          cursor: "text",
          minHeight: "80px",
          display: "flex",
          alignItems: displayValue ? "flex-start" : "center",
          position: "relative",
        }}
      >
        {displayValue ? (
          <div
            className="w-full whitespace-pre-wrap break-words"
            style={{
              lineHeight: "1.5",
              fontFamily: "inherit",
            }}
          >
            {displayValue}
          </div>
        ) : (
          <span>{placeholder}</span>
        )}
        {isHovered && (
          <div
            className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium"
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              color: "#3B82F6",
            }}
          >
            <EditIcon size={12} />
            <span>Editar</span>
          </div>
        )}
      </div>
    </div>
  );
}

