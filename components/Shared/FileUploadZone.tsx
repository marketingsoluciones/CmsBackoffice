import React, { useCallback, useState, useRef } from "react";
import { CRM_QUERIES, CRM_MUTATIONS } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { useCRM } from "../../context/CRMContext";
import { ToastContextProvider } from "../../context/ToastContext";
import { CloudArrowUpIcon, DocumentIcon, PhotoIcon, VideoCameraIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface FileUploadZoneProps {
  entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN";
  entityId: string;
  category?: "documents" | "photos" | "videos" | "memories";
  onUploadComplete?: (file: any) => void;
}

export default function FileUploadZone({
  entityType,
  entityId,
  category = "documents",
  onUploadComplete,
}: FileUploadZoneProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addEntityFile } = useCRM();
  const { dispatch } = ToastContextProvider();
  
  const pushToast = (type: string, message: string) => {
    dispatch({ type: "ADD_TOAST", payload: { id: `${Date.now()}-${Math.random()}`, type, message } } as any);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <PhotoIcon className="w-5 h-5" style={{ color: "#3B82F6" }} />;
    } else if (file.type.startsWith("video/")) {
      return <VideoCameraIcon className="w-5 h-5" style={{ color: "#EF4444" }} />;
    } else {
      return <DocumentIcon className="w-5 h-5" style={{ color: "#6B7280" }} />;
    }
  };


  const handleFileUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);
    setIsUploading(true);
    setUploadProgress(0);

    // Procesar archivos uno por uno
    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      
      try {
        // Validar tamaño (50MB máximo)
        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
          pushToast("error", `El archivo ${file.name} excede el tamaño máximo de 50MB`);
          continue;
        }

        setUploadProgress(((i + 1) / fileArray.length) * 30); // 30% para lectura

        // SOLUCIÓN ALTERNATIVA: Usar base64 para evitar problemas con multipart en Apollo Server
        // Convertir archivo a base64
        const base64Promise = new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            // Remover el prefijo "data:image/...;base64," o "data:application/...;base64,"
            const base64Data = result.includes(',') ? result.split(',')[1] : result;
            resolve(base64Data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const base64Data = await base64Promise;
        setUploadProgress(((i + 1) / fileArray.length) * 60); // 60% después de lectura

        // Subir archivo usando GraphQL mutation normal (sin multipart)
        const response = await fetchApiCRM({
          query: CRM_MUTATIONS.UPLOAD_CRM_ENTITY_FILE,
          variables: {
            input: {
              entityId,
              entityType,
              category: category.toLowerCase(),
              file: {
                filename: file.name,
                fileSize: file.size,
                mimeType: file.type || "application/octet-stream",
                url: base64Data // Enviar base64 directamente
              }
            }
          }
        });

        setUploadProgress(((i + 1) / fileArray.length) * 90); // 90% después de upload

        if (response?.uploadCRMEntityFile?.success) {
          const uploadedFile = response.uploadCRMEntityFile.file;
          addEntityFile(entityId, uploadedFile);
          pushToast("success", `${file.name} se subió correctamente`);
          if (onUploadComplete) onUploadComplete(uploadedFile);
        } else {
          const errorMessage = response?.uploadCRMEntityFile?.errors?.[0]?.message || "Error al subir archivo";
          const errorCode = response?.uploadCRMEntityFile?.errors?.[0]?.code;
          
          // Mensajes específicos para diferentes tipos de errores
          if (errorMessage.includes("Development no especificado") || 
              (errorMessage.toLowerCase().includes("development") && !errorMessage.includes("Storage"))) {
            throw new Error("Error de configuración: El sistema no pudo identificar el entorno. Por favor, recarga la página e intenta nuevamente.");
          }
          
          if (errorMessage.includes("Storage no configurado") || 
              errorCode === "STORAGE_NOT_CONFIGURED" ||
              errorMessage.includes("storage no configurado")) {
            throw new Error("El sistema de almacenamiento no está configurado para este entorno. Contacta al administrador del sistema.");
          }
          
          throw new Error(errorMessage);
        }

        setUploadProgress(((i + 1) / fileArray.length) * 100);
      } catch (error: any) {
        console.error("Error uploading file:", error);
        const errorMessage = error?.message || error?.details?.message || `Error al subir ${file.name}`;
        
        // Mensajes de error más descriptivos
        if (errorMessage.includes("Storage no configurado") || 
            errorMessage.includes("storage no configurado") ||
            error?.details?.code === "STORAGE_NOT_CONFIGURED") {
          pushToast("error", "El sistema de almacenamiento no está configurado para este entorno. Contacta al administrador del sistema.");
        } else if (errorMessage.includes("Error de configuración")) {
          pushToast("error", errorMessage);
        } else {
          pushToast("error", errorMessage);
        }
      }
    }

    setIsUploading(false);
    setUploadProgress(0);
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [entityId, entityType, category, addEntityFile, onUploadComplete, pushToast]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files);
  }, [handleFileUpload]);

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Zona de subida */}
      <div
        className={`relative rounded-lg border-2 border-dashed transition-all duration-200 ${
          isDragging 
            ? "border-blue-500 bg-blue-50" 
            : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ padding: "32px" }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          disabled={isUploading}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp,.mp4,.webm,.mov"
        />
        
        <div className="flex flex-col items-center justify-center text-center">
          <div className={`mb-4 transition-transform duration-200 ${isDragging ? "scale-110" : ""}`}>
            <CloudArrowUpIcon 
              className="w-12 h-12" 
              style={{ color: isDragging ? "#3B82F6" : "#9CA3AF" }}
            />
          </div>
          
          <h3 className="text-sm font-semibold mb-1" style={{ color: "#111827" }}>
            {isUploading ? "Subiendo archivos..." : "Arrastra archivos aquí o haz clic para seleccionar"}
          </h3>
          
          <p className="text-xs mb-4" style={{ color: "#6B7280" }}>
            Formatos soportados: PDF, DOC, DOCX, JPG, PNG, GIF, MP4, WEBM
          </p>
          
          {!isUploading && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-sm text-sm font-medium text-white transition-colors"
              style={{ 
                backgroundColor: "#10B981",
                borderRadius: "2px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#059669";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#10B981";
              }}
            >
              Seleccionar archivos
            </button>
          )}
          
          {isUploading && (
            <div className="w-full max-w-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium" style={{ color: "#374151" }}>
                  Subiendo...
                </span>
                <span className="text-xs font-medium" style={{ color: "#6B7280" }}>
                  {Math.round(uploadProgress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lista de archivos seleccionados (antes de subir) */}
      {selectedFiles.length > 0 && !isUploading && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold" style={{ color: "#374151" }}>
            Archivos seleccionados ({selectedFiles.length})
          </h4>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-sm border"
                style={{ 
                  borderColor: "#E5E7EB",
                  backgroundColor: "#FFFFFF"
                }}
              >
                <div className="flex-shrink-0">
                  {getFileIcon(file)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "#111827" }}>
                    {file.name}
                  </p>
                  <p className="text-xs" style={{ color: "#6B7280" }}>
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeSelectedFile(index)}
                  className="flex-shrink-0 p-1 rounded-sm transition-colors"
                  style={{ color: "#EF4444" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FEF2F2";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
