import React, { useEffect, useState } from "react";
import { CRM_QUERIES, CRM_MUTATIONS } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { useCRM } from "../../context/CRMContext";
import { ToastContextProvider } from "../../context/ToastContext";
import {
  DocumentIcon,
  PhotoIcon,
  VideoCameraIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  EyeIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

interface FileGalleryProps {
  entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN";
  entityId: string;
  category?: "documents" | "photos" | "videos" | "memories";
  viewMode?: "grid" | "list";
}

export default function FileGallery({
  entityType,
  entityId,
  category,
  viewMode: initialViewMode = "grid",
}: FileGalleryProps) {
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">(initialViewMode);
  const { entityFiles, setEntityFiles, removeEntityFile } = useCRM();
  const { dispatch } = ToastContextProvider();

  const pushToast = (type: string, message: string) => {
    dispatch({ type: "ADD_TOAST", payload: { id: `${Date.now()}-${Math.random()}`, type, message } } as any);
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
          category: category ? category.toUpperCase() : undefined,
        },
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

  const handleDelete = async (fileId: string, filename: string) => {
    if (!confirm(`¿Estás seguro de eliminar "${filename}"?`)) return;

    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.DELETE_CRM_ENTITY_FILE,
        variables: { fileId },
      });
      if (response?.deleteCRMEntityFile?.success) {
        setFiles((prev) => prev.filter((f) => f.id !== fileId));
        removeEntityFile(entityId, fileId);
        pushToast("success", "Archivo eliminado correctamente");
      } else {
        throw new Error(response?.deleteCRMEntityFile?.errors?.[0]?.message || "Error al eliminar archivo");
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al eliminar archivo");
    }
  };

  const handleDownload = async (fileId: string, filename: string) => {
    try {
      const response = await fetchApiCRM({
        query: CRM_QUERIES.GET_CRM_FILE_DOWNLOAD_URL,
        variables: { fileId, expiresIn: 3600 },
      });
      if (response?.getCRMFileDownloadUrl?.success) {
        const link = document.createElement("a");
        link.href = response.getCRMFileDownloadUrl.downloadUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        pushToast("success", "Descarga iniciada");
      } else {
        throw new Error(response?.getCRMFileDownloadUrl?.errors?.[0]?.message || "Error al obtener URL de descarga");
      }
    } catch (error: any) {
      pushToast("error", error?.message || "Error al descargar archivo");
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getFileIcon = (file: any) => {
    if (file.mimeType?.startsWith("image/")) {
      return <PhotoIcon className="w-6 h-6" style={{ color: "#3B82F6" }} />;
    } else if (file.mimeType?.startsWith("video/")) {
      return <VideoCameraIcon className="w-6 h-6" style={{ color: "#EF4444" }} />;
    } else {
      return <DocumentIcon className="w-6 h-6" style={{ color: "#6B7280" }} />;
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat?.toUpperCase()) {
      case "DOCUMENTS":
        return { bg: "#DBEAFE", text: "#1E40AF" };
      case "PHOTOS":
        return { bg: "#FEF3C7", text: "#92400E" };
      case "VIDEOS":
        return { bg: "#FEE2E2", text: "#991B1B" };
      case "MEMORIES":
        return { bg: "#E9D5FF", text: "#6B21A8" };
      default:
        return { bg: "#F3F4F6", text: "#374151" };
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
          <p className="text-sm" style={{ color: "#6B7280" }}>Cargando archivos...</p>
        </div>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <DocumentIcon className="w-12 h-12 mx-auto mb-3" style={{ color: "#D1D5DB" }} />
        <p className="text-sm font-medium mb-1" style={{ color: "#374151" }}>
          No hay archivos
        </p>
        <p className="text-xs" style={{ color: "#9CA3AF" }}>
          Sube archivos usando la zona de arriba
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header con toggle de vista */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold" style={{ color: "#111827" }}>
          Archivos ({files.length})
        </h4>
        <div className="flex items-center gap-1 border rounded-sm" style={{ borderColor: "#E5E7EB" }}>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`p-1.5 transition-colors ${
              viewMode === "grid" ? "bg-blue-50" : "bg-transparent"
            }`}
            style={{ color: viewMode === "grid" ? "#3B82F6" : "#6B7280" }}
            title="Vista de cuadrícula"
          >
            <Squares2X2Icon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`p-1.5 transition-colors ${
              viewMode === "list" ? "bg-blue-50" : "bg-transparent"
            }`}
            style={{ color: viewMode === "list" ? "#3B82F6" : "#6B7280" }}
            title="Vista de lista"
          >
            <ListBulletIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Vista de lista */}
      {viewMode === "list" ? (
        <div className="space-y-2">
          {files.map((file) => {
            const categoryColor = getCategoryColor(file.category);
            return (
              <div
                key={file.id}
                className="flex items-center gap-3 p-3 rounded-sm border transition-all hover:shadow-sm"
                style={{
                  borderColor: "#E5E7EB",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div className="flex-shrink-0">{getFileIcon(file)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "#111827" }}>
                    {file.filename || file.originalFilename}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{
                        backgroundColor: categoryColor.bg,
                        color: categoryColor.text,
                      }}
                    >
                      {file.category || "DOCUMENTS"}
                    </span>
                    <span className="text-xs" style={{ color: "#6B7280" }}>
                      {formatFileSize(file.fileSize)}
                    </span>
                    {file.uploadedAt && (
                      <span className="text-xs" style={{ color: "#9CA3AF" }}>
                        • {formatDate(file.uploadedAt)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {file.publicUrls?.original && (
                    <button
                      type="button"
                      onClick={() => window.open(file.publicUrls.original, "_blank")}
                      className="p-2 rounded-sm transition-colors"
                      style={{ color: "#3B82F6" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#DBEAFE";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                      title="Ver archivo"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDownload(file.id, file.filename || file.originalFilename)}
                    className="p-2 rounded-sm transition-colors"
                    style={{ color: "#10B981" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#D1FAE5";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                    title="Descargar"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(file.id, file.filename || file.originalFilename)}
                    className="p-2 rounded-sm transition-colors"
                    style={{ color: "#EF4444" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#FEE2E2";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                    title="Eliminar"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Vista de cuadrícula */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => {
            const categoryColor = getCategoryColor(file.category);
            return (
              <div
                key={file.id}
                className="group relative rounded-sm border overflow-hidden transition-all hover:shadow-md"
                style={{
                  borderColor: "#E5E7EB",
                  backgroundColor: "#FFFFFF",
                }}
              >
                {/* Preview/Thumbnail */}
                <div className="relative aspect-square bg-gray-100">
                  {file.publicUrls?.thumbnail ? (
                    <img
                      src={file.publicUrls.thumbnail}
                      alt={file.filename || file.originalFilename}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {getFileIcon(file)}
                    </div>
                  )}
                  {/* Overlay con acciones (visible en hover) */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    {file.publicUrls?.original && (
                      <button
                        type="button"
                        onClick={() => window.open(file.publicUrls.original, "_blank")}
                        className="p-2 rounded-full bg-white transition-transform hover:scale-110"
                        style={{ color: "#3B82F6" }}
                        title="Ver"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDownload(file.id, file.filename || file.originalFilename)}
                      className="p-2 rounded-full bg-white transition-transform hover:scale-110"
                      style={{ color: "#10B981" }}
                      title="Descargar"
                    >
                      <ArrowDownTrayIcon className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(file.id, file.filename || file.originalFilename)}
                      className="p-2 rounded-full bg-white transition-transform hover:scale-110"
                      style={{ color: "#EF4444" }}
                      title="Eliminar"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {/* Información del archivo */}
                <div className="p-3">
                  <p className="text-xs font-medium truncate mb-1" style={{ color: "#111827" }}>
                    {file.filename || file.originalFilename}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                      style={{
                        backgroundColor: categoryColor.bg,
                        color: categoryColor.text,
                      }}
                    >
                      {file.category || "DOC"}
                    </span>
                    <span className="text-[10px]" style={{ color: "#6B7280" }}>
                      {formatFileSize(file.fileSize)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
