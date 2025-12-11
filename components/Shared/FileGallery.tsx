import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Image, VStack, HStack, Text, IconButton, Badge, useToast } from "@chakra-ui/react";
import { DownloadIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import { CRM_QUERIES, CRM_MUTATIONS } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { useCRM } from "../../context/CRMContext";

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
  viewMode = "grid",
}: FileGalleryProps) {
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { entityFiles, setEntityFiles, removeEntityFile } = useCRM();
  const toast = useToast();

  useEffect(() => {
    loadFiles();
  }, [entityId, category]);

  const loadFiles = async () => {
    // Primero verificar cache
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
      toast({
        title: "Error",
        description: error?.message || "Error al cargar archivos",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
        toast({
          title: "Archivo eliminado",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Error al eliminar archivo",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
      toast({
        title: "Error",
        description: error?.message || "Error al obtener URL de descarga",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return <Text>Cargando archivos...</Text>;
  }

  if (files.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">No hay archivos</Text>
      </Box>
    );
  }

  if (viewMode === "list") {
    return (
      <VStack spacing={2} align="stretch">
        {files.map((file) => (
          <HStack
            key={file.id}
            p={3}
            bg="gray.50"
            borderRadius="md"
            justify="space-between"
          >
            <HStack spacing={3}>
              {file.publicUrls?.thumbnail && (
                <Image
                  src={file.publicUrls.thumbnail}
                  alt={file.filename}
                  boxSize="40px"
                  objectFit="cover"
                  borderRadius="md"
                />
              )}
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" fontWeight="medium">{file.filename}</Text>
                <HStack spacing={2}>
                  <Badge fontSize="xs">{file.category}</Badge>
                  <Text fontSize="xs" color="gray.500">
                    {(file.fileSize / 1024).toFixed(2)} KB
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <HStack>
              <IconButton
                aria-label="Ver"
                icon={<ViewIcon />}
                size="sm"
                onClick={() => window.open(file.publicUrls?.original, "_blank")}
              />
              <IconButton
                aria-label="Descargar"
                icon={<DownloadIcon />}
                size="sm"
                onClick={() => handleDownload(file.id)}
              />
              <IconButton
                aria-label="Eliminar"
                icon={<DeleteIcon />}
                size="sm"
                colorScheme="red"
                onClick={() => handleDelete(file.id)}
              />
            </HStack>
          </HStack>
        ))}
      </VStack>
    );
  }

  return (
    <SimpleGrid columns={3} spacing={4}>
      {files.map((file) => (
        <Box
          key={file.id}
          borderWidth="1px"
          borderRadius="md"
          overflow="hidden"
          position="relative"
          _hover={{
            boxShadow: "md",
          }}
        >
          {file.publicUrls?.thumbnail ? (
            <Image
              src={file.publicUrls.thumbnail}
              alt={file.filename}
              width="100%"
              height="150px"
              objectFit="cover"
            />
          ) : (
            <Box
              width="100%"
              height="150px"
              bg="gray.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="xs" color="gray.500">{file.fileType}</Text>
            </Box>
          )}
          <Box p={2}>
            <Text fontSize="xs" fontWeight="medium" noOfLines={1}>
              {file.filename}
            </Text>
            <HStack spacing={2} mt={1}>
              <Badge fontSize="xs">{file.category}</Badge>
              <Text fontSize="xs" color="gray.500">
                {(file.fileSize / 1024).toFixed(2)} KB
              </Text>
            </HStack>
            <HStack spacing={1} mt={2}>
              <IconButton
                aria-label="Ver"
                icon={<ViewIcon />}
                size="xs"
                onClick={() => window.open(file.publicUrls?.original, "_blank")}
              />
              <IconButton
                aria-label="Descargar"
                icon={<DownloadIcon />}
                size="xs"
                onClick={() => handleDownload(file.id)}
              />
              <IconButton
                aria-label="Eliminar"
                icon={<DeleteIcon />}
                size="xs"
                colorScheme="red"
                onClick={() => handleDelete(file.id)}
              />
            </HStack>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}

