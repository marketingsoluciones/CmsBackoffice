import React from "react";

export default function WhitelabelConfigComponent() {
  return (
    <div className="w-full h-full p-4">
      <h2 className="text-lg font-semibold mb-3">Configuración Whitelabel</h2>
      <div className="grid grid-cols-1 gap-3 max-w-xl">
        <div className="border rounded p-3">
          <div className="text-sm mb-1">Nombre de la compañía</div>
          <input className="border rounded px-2 py-1 w-full" placeholder="Nombre" />
        </div>
        <div className="border rounded p-3">
          <div className="text-sm mb-1">Color primario</div>
          <input type="color" className="w-10 h-10 p-0" />
        </div>
        <div className="border rounded p-3">
          <div className="text-sm mb-1">Logo (URL)</div>
          <input className="border rounded px-2 py-1 w-full" placeholder="https://..." />
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm rounded border">Cancelar</button>
          <button className="px-3 py-1 text-sm rounded border">Guardar</button>
        </div>
      </div>
    </div>
  );
}


