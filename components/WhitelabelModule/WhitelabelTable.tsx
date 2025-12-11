import React, { useState } from "react";
import { AdvancedTable, ColumnConfig } from "../Shared/AdvancedTable";
import DetailModal from "../Shared/DetailModal";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { CRM_QUERIES } from "../../utils/crmQueries";

const defaultColumns: ColumnConfig[] = [
  { field: "name", label: "Nombre", visible: true, order: 0, width: 220, pinned: false },
  { field: "slug", label: "Slug", visible: true, order: 1, width: 180, pinned: false },
  { field: "domain", label: "Dominio", visible: true, order: 2, width: 220, pinned: false },
  { field: "isActive", label: "Activo", visible: true, order: 3, width: 120, pinned: false }
];

const GET_WHITELABELS = CRM_QUERIES.GET_WHITELABELS;

export default function WhitelabelTable() {
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  return (
    <>
      <AdvancedTable
        title="Listado"
        entityType="BUSINESS"
        defaultColumns={defaultColumns}
        query={GET_WHITELABELS}
        variables={{}}
        mapResponse={(resp: any) => resp?.getWhitelabels?.whitelabels ?? []}
        fetcher={fetchApiCRM}
        enableCRMFeatures={true}
        onRowClick={(row) => setSelectedRow(row)}
        getRowId={(r: any) => r.id}
      />
      <DetailModal
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        title={selectedRow?.name || "Detalle de la Marca Blanca"}
        entityType="WHITELABEL"
      >
        {selectedRow && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3" style={{ fontSize: '16px', color: '#111827' }}>Información General</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium" style={{ color: '#6B7280' }}>Nombre</label>
                  <p className="mt-1" style={{ color: '#111827' }}>{selectedRow.name || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-medium" style={{ color: '#6B7280' }}>Slug</label>
                  <p className="mt-1" style={{ color: '#111827' }}>{selectedRow.slug || '-'}</p>
                </div>
                <div>
                  <label className="text-xs font-medium" style={{ color: '#6B7280' }}>Dominio</label>
                  <p className="mt-1" style={{ color: '#111827' }}>
                    {selectedRow.domain ? (
                      <a href={`https://${selectedRow.domain}`} target="_blank" rel="noopener noreferrer" style={{ color: '#3B82F6' }}>
                        {selectedRow.domain}
                      </a>
                    ) : '-'}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium" style={{ color: '#6B7280' }}>Estado</label>
                  <p className="mt-1">
                    <span className="px-2 py-1 rounded text-xs" style={{ 
                      backgroundColor: selectedRow.isActive ? "#D1FAE5" : "#F3F4F6",
                      color: selectedRow.isActive ? "#047857" : "#374151"
                    }}>
                      {selectedRow.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </DetailModal>
    </>
  );
}


