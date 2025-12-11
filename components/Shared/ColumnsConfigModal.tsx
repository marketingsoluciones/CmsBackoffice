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
import { ColumnConfig } from "./AdvancedTable";

interface ColumnsConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  columns: ColumnConfig[];
  onChangeColumns: (cols: ColumnConfig[]) => void;
  onReset?: () => void;
  onSave?: () => void;
}

export default function ColumnsConfigModal({
  isOpen,
  onClose,
  columns,
  onChangeColumns,
  onReset,
  onSave
}: ColumnsConfigModalProps) {
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
  const visible = ordered.filter(c => c.visible);
  const hidden = ordered.filter(c => !c.visible);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
      <div className="w-full max-w-3xl rounded-sm shadow-lg p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '2px' }}>
        <div className="flex items-center justify-between mb-4 pb-2" style={{ borderBottom: '1px solid #E5E7EB' }}>
          <h3 className="text-base font-semibold" style={{ color: '#3B82F6' }}>Configurar columnas</h3>
          <button 
            className="p-1 transition-colors rounded-sm" 
            style={{ color: '#6B7280', borderRadius: '2px' }} 
            onMouseEnter={(e) => { e.currentTarget.style.color = '#374151'; e.currentTarget.style.backgroundColor = '#F3F4F6'; }} 
            onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.backgroundColor = 'transparent'; }} 
            onClick={onClose}
          >
            <XMarkIcon width={20} height={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-auto">
          <div>
            <h4 className="text-xs font-semibold mb-2 flex items-center gap-1" style={{ color: '#4B5563' }}>
              <ClipboardDocumentListIcon width={14} height={14} style={{ color: '#4B5563' }} />
              Columnas visibles ({visible.length})
            </h4>
            <div className="flex flex-col gap-2">
              {visible.map((c, idx) => (
                <div key={c.field} className="flex items-center gap-2 rounded-sm px-2 py-1" style={{ border: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', borderRadius: '2px' }}>
                  <span className="cursor-grab" style={{ color: '#9CA3AF' }}>
                    <Bars3Icon width={16} height={16} />
                  </span>
                  <input
                    type="checkbox"
                    checked={c.visible}
                    onChange={() => handleToggle(c.field)}
                  />
                  <span className="text-xs truncate min-w-[120px]" style={{ color: '#374151' }} title={c.label}>
                    {c.label}
                  </span>
                  <button
                    className="px-2 py-0.5 text-[10px] rounded-sm transition-colors flex items-center gap-1"
                    style={{ border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', color: '#4B5563', borderRadius: '2px' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                    onClick={() => handlePinned(c.field)}
                  >
                    <MapPinIcon width={12} height={12} style={{ color: c.pinned ? '#3B82F6' : '#4B5563' }} />
                    {c.pinned ? "Fijada" : "Fijar"}
                  </button>
                  <div className="ml-auto flex items-center gap-1">
                    <button
                      className="px-2 py-0.5 text-[10px] rounded-sm transition-colors disabled:opacity-40 flex items-center justify-center"
                      style={{ border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', color: '#4B5563', borderRadius: '2px' }}
                      onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#F3F4F6')}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                      disabled={idx === 0}
                      onClick={() => move(idx, idx - 1)}
                      title="Mover arriba"
                    >
                      <ChevronUpIcon width={12} height={12} />
                    </button>
                    <button
                      className="px-2 py-0.5 text-[10px] rounded-sm transition-colors disabled:opacity-40 flex items-center justify-center"
                      style={{ border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', color: '#4B5563', borderRadius: '2px' }}
                      onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#F3F4F6')}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                      disabled={idx === visible.length - 1}
                      onClick={() => move(idx, idx + 1)}
                      title="Mover abajo"
                    >
                      <ChevronDownIcon width={12} height={12} />
                    </button>
                    <input
                      type="number"
                      className="w-20 rounded-sm px-2 py-1 text-xs transition-colors"
                      style={{ border: '1px solid #E5E7EB', borderRadius: '2px' }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                      placeholder="Ancho"
                      value={c.width || ""}
                      onChange={(e) => handleWidth(c.field, parseInt(e.target.value || "0"))}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold mb-2 flex items-center gap-1" style={{ color: '#4B5563' }}>
              <EyeIcon width={14} height={14} style={{ color: '#4B5563' }} />
              Columnas ocultas ({hidden.length})
            </h4>
            <div className="flex flex-col gap-2">
              {hidden.map(c => (
                <div key={c.field} className="flex items-center gap-2 rounded-sm px-2 py-1" style={{ border: '1px solid #E5E7EB', borderRadius: '2px' }}>
                  <span className="cursor-grab" style={{ color: '#9CA3AF' }}>
                    <Bars3Icon width={16} height={16} />
                  </span>
                  <span className="text-xs truncate min-w-[120px]" style={{ color: '#374151' }} title={c.label}>
                    {c.label}
                  </span>
                  <button
                    className="ml-auto px-3 py-0.5 text-[10px] rounded-sm text-white transition-colors"
                    style={{ border: '1px solid #3B82F6', backgroundColor: '#3B82F6', borderRadius: '2px' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3B82F6'}
                    onClick={() => handleToggle(c.field)}
                  >
                    Mostrar
                  </button>
                </div>
              ))}
              {hidden.length === 0 && (
                <p className="text-[11px]" style={{ color: '#9CA3AF' }}>No hay columnas ocultas.</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 mt-4">
          <button
            className="px-3 py-1 text-sm rounded-sm transition-colors"
            style={{ border: '1px solid #E5E7EB', color: '#374151', backgroundColor: '#FFFFFF', borderRadius: '2px' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F9FAFB'; e.currentTarget.style.borderColor = '#3B82F6'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#E5E7EB'; }}
            onClick={onReset}
          >
            Restaurar por defecto
          </button>
          <button
            className="px-3 py-1 text-sm rounded-sm transition-colors"
            style={{ border: '1px solid #E5E7EB', color: '#374151', backgroundColor: '#FFFFFF', borderRadius: '2px' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F9FAFB'; e.currentTarget.style.borderColor = '#3B82F6'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#E5E7EB'; }}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-3 py-1 text-sm rounded-sm text-white transition-colors"
            style={{ border: '1px solid #3B82F6', backgroundColor: '#3B82F6', borderRadius: '2px' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3B82F6'}
            onClick={onSave}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}


