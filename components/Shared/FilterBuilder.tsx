import React, { useState } from "react";

export type Operator = "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_CONTAINS" | "GREATER_THAN" | "LESS_THAN" | "IN" | "NOT_IN";

export interface FilterField {
  field: string;
  label: string;
  type?: "string" | "number" | "date";
}

export interface BuiltFilter {
  field: string;
  operator: Operator;
  value: string;
}

interface FilterBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  fields: FilterField[];
  value: BuiltFilter[];
  onChange: (filters: BuiltFilter[]) => void;
  onApply: () => void;
}

export default function FilterBuilder({
  isOpen,
  onClose,
  fields,
  value,
  onChange,
  onApply
}: FilterBuilderProps) {
  const [local, setLocal] = useState<BuiltFilter[]>(value);
  if (!isOpen) return null;

  const add = () => setLocal([...local, { field: fields[0]?.field || "", operator: "EQUALS", value: "" }]);
  const remove = (idx: number) => setLocal(local.filter((_, i) => i !== idx));
  const update = (idx: number, patch: Partial<BuiltFilter>) => {
    const next = local.slice();
    next[idx] = { ...next[idx], ...patch };
    setLocal(next);
  };
  const apply = () => {
    onChange(local);
    onApply();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
      <div className="w-full max-w-2xl rounded shadow p-4" style={{ backgroundColor: '#FFFFFF', border: '1px solid #F3F4F6' }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold" style={{ color: '#111827' }}>Filtros avanzados</h3>
          <button className="text-sm transition-colors" style={{ color: '#6B7280' }} onMouseEnter={(e) => e.currentTarget.style.color = '#374151'} onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'} onClick={onClose}>✕</button>
        </div>
        <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-auto">
          {local.map((f, idx) => (
            <div key={idx} className="flex items-center gap-2 rounded px-2 py-1" style={{ border: '1px solid #E5E7EB' }}>
              <select className="rounded px-2 py-1 text-sm transition-colors" style={{ border: '1px solid #E5E7EB' }} onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'} value={f.field} onChange={(e) => update(idx, { field: e.target.value })}>
                {fields.map(ff => <option key={ff.field} value={ff.field}>{ff.label}</option>)}
              </select>
              <select className="rounded px-2 py-1 text-sm transition-colors" style={{ border: '1px solid #E5E7EB' }} onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'} value={f.operator} onChange={(e) => update(idx, { operator: e.target.value as Operator })}>
                {["EQUALS","NOT_EQUALS","CONTAINS","NOT_CONTAINS","GREATER_THAN","LESS_THAN","IN","NOT_IN"].map(op => <option key={op} value={op}>{op}</option>)}
              </select>
              <input className="rounded px-2 py-1 text-sm flex-1 transition-colors" style={{ border: '1px solid #E5E7EB' }} onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'} placeholder="Valor" value={f.value} onChange={(e) => update(idx, { value: e.target.value })} />
              <button className="px-2 py-0.5 rounded text-xs transition-colors" style={{ border: '1px solid #E5E7EB', color: '#374151', backgroundColor: '#FFFFFF' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F9FAFB'; e.currentTarget.style.borderColor = '#3B82F6'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#E5E7EB'; }} onClick={() => remove(idx)}>Eliminar</button>
            </div>
          ))}
          <button className="px-3 py-1 text-sm rounded transition-colors w-fit" style={{ border: '1px solid #E5E7EB', color: '#374151', backgroundColor: '#FFFFFF' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F9FAFB'; e.currentTarget.style.borderColor = '#3B82F6'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#E5E7EB'; }} onClick={add}>Añadir filtro</button>
        </div>
        <div className="flex items-center justify-end gap-2 mt-3">
          <button className="px-3 py-1 text-sm rounded transition-colors" style={{ border: '1px solid #E5E7EB', color: '#374151', backgroundColor: '#FFFFFF' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F9FAFB'; e.currentTarget.style.borderColor = '#3B82F6'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.borderColor = '#E5E7EB'; }} onClick={onClose}>Cancelar</button>
          <button className="px-3 py-1 text-sm rounded text-white transition-colors" style={{ border: '1px solid #3B82F6', backgroundColor: '#3B82F6' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563EB'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3B82F6'} onClick={apply}>Aplicar</button>
        </div>
      </div>
    </div>
  );
}


