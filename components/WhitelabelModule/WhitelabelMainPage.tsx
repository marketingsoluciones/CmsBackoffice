import React from "react";
import WhitelabelTable from "./WhitelabelTable";
import { ClusterIcon } from "../Icons/index";

export default function WhitelabelMainPage() {
  return (
    <div className="w-full h-full flex flex-col gap-6 overflow-hidden" style={{ minHeight: 0, maxHeight: '100vh', padding: '24px' }}>
      {/* Header mejorado estilo Pipedrive/ClickUp */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 flex-shrink-0" style={{ paddingBottom: '16px', borderBottom: '1px solid #E5E7EB' }}>
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center rounded-lg" style={{ width: '48px', height: '48px', backgroundColor: '#DBEAFE' }}>
            <ClusterIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-bold mb-2" style={{ fontSize: '28px', lineHeight: '36px', color: '#111827' }}>Whitelabel</h1>
            <p className="font-normal" style={{ fontSize: '15px', lineHeight: '22px', color: '#6B7280', maxWidth: '600px' }}>
              Gestión de marcas blancas y dominios personalizados. Crea y administra múltiples marcas con configuraciones independientes y branding personalizado.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <WhitelabelTable />
      </div>
    </div>
  );
}


