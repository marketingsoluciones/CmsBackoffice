import React, { useEffect, useState } from "react";
import { CRM_QUERIES, CRM_MUTATIONS } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { useCRM } from "../../context/CRMContext";
import { ToastContextProvider } from "../../context/ToastContext";

interface FileGalleryERPProps {
  entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN" | "BUSINESS";
  entityId: string;
  category?: "documents" | "photos" | "videos" | "memories";
  viewMode?: "grid" | "list";
}

export default function FileGalleryERP({
  entityType,
  entityId,
  category,
  viewMode = "grid",
}: FileGalleryERPProps) {
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { entityFiles, setEntityFiles, removeEntityFile } = useCRM();
  const { dispatch } = ToastContextProvider();

  const pushToast = (type: string, message: string) => {
    dispatch({
      type: "ADD_TOAST",
      payload: { id: `${Date.now()}-${Math.random()}`, type, message }
    } as any);
  };

  useEffect(() => {
    loadFiles();
  }, [entityId, category]);

  const loadFiles = async () => {
    const cached = entityFiles[entityId];
    if (cached && cached.length > 0) {
      setFiles(cached);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchApiCRM({
        query: CRM_QUERIES.GET_CRM_ENTITY_FILES,
        variables: {
          entityId,
          entityType,
          category: category || undefined
        }
      });
      if (response?.getCRMEntityFiles?.success) {
        const loadedFiles = response.getCRMEntityFiles.files || [];
        setFiles(loadedFiles);
        setEntityFiles(entityId, loadedFiles);
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al cargar archivos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (fileId: string) => {
    if (!confirm("¿Estás seguro de eliminar este archivo?")) return;

    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.DELETE_CRM_ENTITY_FILE,
        variables: { fileId }
      });
      if (response?.deleteCRMEntityFile?.success) {
        setFiles(prev => prev.filter(f => f.id !== fileId));
        removeEntityFile(entityId, fileId);
        pushToast("success", "Archivo eliminado");
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al eliminar archivo");
    }
  };

  const handleDownload = async (fileId: string) => {
    try {
      const response = await fetchApiCRM({
        query: CRM_QUERIES.GET_CRM_FILE_DOWNLOAD_URL,
        variables: { fileId, expiresIn: 3600 }
      });
      if (response?.getCRMFileDownloadUrl?.success) {
        window.open(response.getCRMFileDownloadUrl.downloadUrl, "_blank");
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al obtener URL de descarga");
    }
  };

  if (isLoading) {
    return <p style={{ color: "#6B7280" }}>Cargando archivos...</p>;
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-8">
        <p style={{ color: "#9CA3AF" }}>No hay archivos</p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-2">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-3 rounded"
            style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}
          >
            <div className="flex items-center gap-3">
              {file.publicUrls?.thumbnail && (
                <img
                  src={file.publicUrls.thumbnail}
                  alt={file.filename}
                  className="w-10 h-10 rounded object-cover"
                />
              )}
              <div>
                <p className="text-sm font-medium" style={{ color: "#111827" }}>{file.filename}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="px-2 py-0.5 rounded text-xs"
                    style={{ backgroundColor: "#F3F4F6", color: "#374151" }}
                  >
                    {file.category}
                  </span>
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>
                    {(file.fileSize / 1024).toFixed(2)} KB
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => window.open(file.publicUrls?.original, "_blank")}
                className="p-1.5 rounded transition-colors"
                style={{ color: "#6B7280" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F3F4F6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                title="Ver"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
              <button
                onClick={() => handleDownload(file.id)}
                className="p-1.5 rounded transition-colors"
                style={{ color: "#6B7280" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F3F4F6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                title="Descargar"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(file.id)}
                className="p-1.5 rounded transition-colors"
                style={{ color: "#DC2626" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FEE2E2";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                title="Eliminar"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="border rounded overflow-hidden relative transition-shadow"
          style={{
            borderColor: "#E5E7EB",
            borderRadius: "2px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {file.publicUrls?.thumbnail ? (
            <img
              src={file.publicUrls.thumbnail}
              alt={file.filename}
              className="w-full h-36 object-cover"
            />
          ) : (
            <div
              className="w-full h-36 flex items-center justify-center"
              style={{ backgroundColor: "#E5E7EB" }}
            >
              <p className="text-xs" style={{ color: "#9CA3AF" }}>{file.fileType}</p>
            </div>
          )}
          <div className="p-2">
            <p className="text-xs font-medium truncate" style={{ color: "#111827" }}>
              {file.filename}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="px-2 py-0.5 rounded text-xs"
                style={{ backgroundColor: "#F3F4F6", color: "#374151" }}
              >
                {file.category}
              </span>
              <span className="text-xs" style={{ color: "#9CA3AF" }}>
                {(file.fileSize / 1024).toFixed(2)} KB
              </span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <button
                onClick={() => window.open(file.publicUrls?.original, "_blank")}
                className="p-1 rounded transition-colors"
                style={{ color: "#6B7280" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F3F4F6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                title="Ver"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
              <button
                onClick={() => handleDownload(file.id)}
                className="p-1 rounded transition-colors"
                style={{ color: "#6B7280" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F3F4F6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                title="Descargar"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(file.id)}
                className="p-1 rounded transition-colors"
                style={{ color: "#DC2626" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FEE2E2";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                title="Eliminar"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

