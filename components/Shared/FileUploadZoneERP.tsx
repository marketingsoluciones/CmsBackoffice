import React, { useCallback, useState } from "react";
import { CRM_MUTATIONS } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { useCRM } from "../../context/CRMContext";
import { ToastContextProvider } from "../../context/ToastContext";

interface FileUploadZoneERPProps {
  entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN" | "BUSINESS";
  entityId: string;
  category?: "documents" | "photos" | "videos" | "memories";
  onUploadComplete?: (file: any) => void;
}

export default function FileUploadZoneERP({
  entityType,
  entityId,
  category = "documents",
  onUploadComplete,
}: FileUploadZoneERPProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { dispatch } = ToastContextProvider();
  const { addEntityFile } = useCRM();

  const pushToast = (type: string, message: string) => {
    dispatch({
      type: "ADD_TOAST",
      payload: { id: `${Date.now()}-${Math.random()}`, type, message }
    } as any);
  };

  const handleFileUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const file = files[0];

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const response = await fetchApiCRM({
            query: CRM_MUTATIONS.UPLOAD_CRM_ENTITY_FILE,
            variables: {
              input: {
                entityId,
                entityType,
                category,
                file: {
                  filename: file.name,
                  fileSize: file.size,
                  mimeType: file.type,
                  url: reader.result as string
                }
              }
            }
          });

          if (response?.uploadCRMEntityFile?.success) {
            const uploadedFile = response.uploadCRMEntityFile.file;
            addEntityFile(entityId, uploadedFile);
            pushToast("success", `${file.name} se subió correctamente`);
            if (onUploadComplete) onUploadComplete(uploadedFile);
          } else {
            throw new Error(response?.uploadCRMEntityFile?.errors?.[0]?.message || "Error al subir archivo");
          }
        } catch (error: any) {
          pushToast("error", error?.message || "Error al subir archivo");
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error: any) {
      pushToast("error", error?.message || "Error al procesar archivo");
      setIsUploading(false);
    }
  }, [entityId, entityType, category, addEntityFile, onUploadComplete]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  return (
    <div
      className="border-2 border-dashed rounded-lg p-8 text-center transition-colors"
      style={{
        borderColor: isDragging ? "#60A5FA" : "#D1D5DB",
        backgroundColor: isDragging ? "#DBEAFE" : "#F9FAFB",
        borderRadius: "2px",
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm" style={{ color: "#4B5563" }}>
          Arrastra archivos aquí o haz clic para seleccionar
        </p>
        <input
          type="file"
          id="file-upload-erp"
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e.target.files)}
          disabled={isUploading}
        />
        <button
          className="px-4 py-2 text-sm font-medium text-white rounded transition-colors disabled:opacity-50"
          style={{ backgroundColor: "#3B82F6", borderRadius: "2px" }}
          onClick={() => document.getElementById("file-upload-erp")?.click()}
          disabled={isUploading}
          onMouseEnter={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.backgroundColor = "#2563EB";
            }
          }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.backgroundColor = "#3B82F6";
            }
          }}
        >
          {isUploading ? "Subiendo..." : "Seleccionar archivo"}
        </button>
        <p className="text-xs" style={{ color: "#9CA3AF" }}>
          Formatos soportados: PDF, imágenes, videos
        </p>
      </div>
    </div>
  );
}

