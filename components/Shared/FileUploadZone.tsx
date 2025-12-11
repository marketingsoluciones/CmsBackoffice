import React, { useCallback, useState } from "react";
import { Box, Button, VStack, Text, useToast } from "@chakra-ui/react";
import { CRM_MUTATIONS } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { useCRM } from "../../context/CRMContext";

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
  const toast = useToast();
  const { addEntityFile } = useCRM();

  const handleFileUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const file = files[0];

    try {
      // Convertir archivo a base64 o FormData según lo que espere el backend
      // Por ahora asumimos que el backend acepta una URL o base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          // TODO: Implementar upload real según la API del backend
          // Por ahora simulamos la respuesta
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
                  // En producción, esto debería ser una URL del archivo subido a S3/R2
                  url: reader.result as string
                }
              }
            }
          });

          if (response?.uploadCRMEntityFile?.success) {
            const uploadedFile = response.uploadCRMEntityFile.file;
            addEntityFile(entityId, uploadedFile);
            toast({
              title: "Archivo subido",
              description: `${file.name} se subió correctamente`,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            if (onUploadComplete) onUploadComplete(uploadedFile);
          } else {
            throw new Error(response?.uploadCRMEntityFile?.errors?.[0]?.message || "Error al subir archivo");
          }
        } catch (error: any) {
          toast({
            title: "Error",
            description: error?.message || "Error al subir archivo",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Error al procesar archivo",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsUploading(false);
    }
  }, [entityId, entityType, category, addEntityFile, onUploadComplete, toast]);

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
    <Box
      borderWidth="2px"
      borderStyle="dashed"
      borderColor={isDragging ? "blue.400" : "gray.300"}
      borderRadius="md"
      p={8}
      textAlign="center"
      bg={isDragging ? "blue.50" : "gray.50"}
      transition="all 0.2s"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <VStack spacing={4}>
        <Text fontSize="sm" color="gray.600">
          Arrastra archivos aquí o haz clic para seleccionar
        </Text>
        <input
          type="file"
          id="file-upload"
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e.target.files)}
          disabled={isUploading}
        />
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => document.getElementById("file-upload")?.click()}
          isLoading={isUploading}
          loadingText="Subiendo..."
        >
          Seleccionar archivo
        </Button>
        <Text fontSize="xs" color="gray.500">
          Formatos soportados: PDF, imágenes, videos
        </Text>
      </VStack>
    </Box>
  );
}

