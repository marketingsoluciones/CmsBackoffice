import React from "react";

export default function WhitelabelStatsComponent() {
  return (
    <div className="w-full h-full p-4">
      <h2 className="text-lg font-semibold mb-3" style={{ color: '#111827' }}>Estadísticas Whitelabel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded p-3" style={{ border: '1px solid #E5E7EB' }}>
          <div className="text-sm" style={{ color: '#6B7280' }}>Usuarios activos</div>
          <div className="text-2xl font-semibold" style={{ color: '#111827' }}>—</div>
        </div>
        <div className="rounded p-3" style={{ border: '1px solid #E5E7EB' }}>
          <div className="text-sm" style={{ color: '#6B7280' }}>Eventos</div>
          <div className="text-2xl font-semibold" style={{ color: '#111827' }}>—</div>
        </div>
        <div className="rounded p-3" style={{ border: '1px solid #E5E7EB' }}>
          <div className="text-sm" style={{ color: '#6B7280' }}>Ingresos</div>
          <div className="text-2xl font-semibold" style={{ color: '#111827' }}>—</div>
        </div>
        <div className="rounded p-3" style={{ border: '1px solid #E5E7EB' }}>
          <div className="text-sm" style={{ color: '#6B7280' }}>Última actividad</div>
          <div className="text-2xl font-semibold" style={{ color: '#111827' }}>—</div>
        </div>
      </div>
    </div>
  );
}


