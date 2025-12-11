import React, { useEffect, useState } from "react";
import { Box, VStack, HStack, Text, Badge, Button, IconButton, useToast } from "@chakra-ui/react";
import { ReplyIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { CRM_QUERIES } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { useCRM } from "../../context/CRMContext";
import EmailComposer from "./EmailComposer";

interface EmailListProps {
  entityId: string;
  entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN";
  filters?: any;
  onEmailClick?: (emailId: string) => void;
}

export default function EmailList({
  entityId,
  entityType,
  filters,
  onEmailClick,
}: EmailListProps) {
  const [emails, setEmails] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [replyToEmailId, setReplyToEmailId] = useState<string | undefined>();
  const { entityEmails, setEntityEmails } = useCRM();
  const toast = useToast();

  useEffect(() => {
    loadEmails();
  }, [entityId, filters]);

  const loadEmails = async () => {
    const cached = entityEmails[entityId];
    if (cached && cached.length > 0) {
      setEmails(cached);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchApiCRM({
        query: CRM_QUERIES.GET_CRM_ENTITY_EMAILS,
        variables: {
          entityId,
          entityType,
          filters: filters || undefined,
          pagination: { page: 1, limit: 50 }
        }
      });
      if (response?.getCRMEntityEmails?.success) {
        const loadedEmails = response.getCRMEntityEmails.emails || [];
        setEmails(loadedEmails);
        setEntityEmails(entityId, loadedEmails);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Error al cargar emails",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SENT": return "green";
      case "DRAFT": return "gray";
      case "FAILED": return "red";
      case "SCHEDULED": return "blue";
      default: return "gray";
    }
  };

  if (showComposer) {
    return (
      <Box>
        <EmailComposer
          entityId={entityId}
          entityType={entityType}
          mode={replyToEmailId ? "reply" : "compose"}
          replyToEmailId={replyToEmailId}
          onSend={() => {
            setShowComposer(false);
            setReplyToEmailId(undefined);
            loadEmails();
          }}
          onCancel={() => {
            setShowComposer(false);
            setReplyToEmailId(undefined);
          }}
        />
      </Box>
    );
  }

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Text fontSize="lg" fontWeight="semibold">Emails</Text>
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => setShowComposer(true)}
        >
          Nuevo Email
        </Button>
      </HStack>

      {isLoading ? (
        <Text>Cargando emails...</Text>
      ) : emails.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Text color="gray.500">No hay emails</Text>
        </Box>
      ) : (
        <VStack spacing={2} align="stretch">
          {emails.map((email) => (
            <Box
              key={email.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              cursor="pointer"
              _hover={{ bg: "gray.50" }}
              onClick={() => onEmailClick && onEmailClick(email.id)}
            >
              <HStack justify="space-between" mb={2}>
                <HStack>
                  <Text fontSize="sm" fontWeight="medium">{email.subject}</Text>
                  <Badge colorScheme={getStatusColor(email.status)}>{email.status}</Badge>
                </HStack>
                <Text fontSize="xs" color="gray.500">
                  {new Date(email.sentAt || email.createdAt).toLocaleString()}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <VStack align="start" spacing={0}>
                  <Text fontSize="xs" color="gray.600">
                    De: {email.from}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Para: {email.to.join(", ")}
                  </Text>
                </VStack>
                <HStack>
                  {email.direction === "INBOUND" && (
                    <IconButton
                      aria-label="Responder"
                      icon={<ReplyIcon />}
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setReplyToEmailId(email.id);
                        setShowComposer(true);
                      }}
                    />
                  )}
                  <IconButton
                    aria-label="Reenviar"
                    icon={<ArrowForwardIcon />}
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Implementar forward
                    }}
                  />
                </HStack>
              </HStack>
              {email.tracking?.opened && (
                <HStack mt={2} spacing={2}>
                  <Badge fontSize="xs" colorScheme="green">
                    Abierto {email.tracking.openCount}x
                  </Badge>
                  {email.tracking.clicked && (
                    <Badge fontSize="xs" colorScheme="blue">
                      Clicked {email.tracking.clickCount}x
                    </Badge>
                  )}
                </HStack>
              )}
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}

