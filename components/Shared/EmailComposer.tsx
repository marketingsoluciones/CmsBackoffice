import React, { useState, useEffect } from "react";
import { Box, Button, VStack, HStack, Input, Textarea, Text, Select, Checkbox, useToast, Badge } from "@chakra-ui/react";
import { CRM_MUTATIONS } from "../../utils/crmQueries";
import { fetchApiCRM } from "../../utils/CRMFetching";
import { useCRM } from "../../context/CRMContext";

interface EmailComposerProps {
  entityId: string;
  entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN";
  mode?: "compose" | "reply" | "forward";
  replyToEmailId?: string;
  onSend?: () => void;
  onSaveDraft?: () => void;
  onCancel?: () => void;
}

export default function EmailComposer({
  entityId,
  entityType,
  mode = "compose",
  replyToEmailId,
  onSend,
  onSaveDraft,
  onCancel,
}: EmailComposerProps) {
  const [to, setTo] = useState<string[]>([]);
  const [toInput, setToInput] = useState("");
  const [cc, setCc] = useState<string[]>([]);
  const [ccInput, setCcInput] = useState("");
  const [bcc, setBcc] = useState<string[]>([]);
  const [bccInput, setBccInput] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [bodyHtml, setBodyHtml] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledFor, setScheduledFor] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();
  const { addEntityEmail } = useCRM();

  useEffect(() => {
    if (mode === "reply" && replyToEmailId) {
      // TODO: Cargar email original para reply
      // Por ahora solo prellenar el subject
      setSubject(`Re: [Subject del email original]`);
    } else if (mode === "forward") {
      setSubject(`Fwd: [Subject del email original]`);
    }
  }, [mode, replyToEmailId]);

  const addEmailToList = (list: string[], setList: (emails: string[]) => void, email: string) => {
    const trimmed = email.trim();
    if (trimmed && !list.includes(trimmed)) {
      setList([...list, trimmed]);
    }
  };

  const removeEmailFromList = (list: string[], setList: (emails: string[]) => void, email: string) => {
    setList(list.filter(e => e !== email));
  };

  const handleSend = async () => {
    if (!to.length) {
      toast({
        title: "Error",
        description: "Debes agregar al menos un destinatario",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!subject.trim()) {
      toast({
        title: "Error",
        description: "El asunto es requerido",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSending(true);
    try {
      const input: any = {
        entityId,
        entityType,
        to,
        cc: cc.length > 0 ? cc : undefined,
        bcc: bcc.length > 0 ? bcc : undefined,
        subject: subject.trim(),
        body: body.trim(),
        bodyHtml: bodyHtml.trim() || undefined,
      };

      if (isScheduled && scheduledFor) {
        input.scheduledFor = scheduledFor;
      }

      if (mode === "reply" && replyToEmailId) {
        // Usar mutation de reply
        const response = await fetchApiCRM({
          query: CRM_MUTATIONS.REPLY_CRM_EMAIL,
          variables: {
            emailId: replyToEmailId,
            body: body.trim(),
            bodyHtml: bodyHtml.trim() || undefined,
          }
        });
        if (response?.replyCRMEmail?.success) {
          addEntityEmail(entityId, response.replyCRMEmail.email);
          toast({
            title: "Email enviado",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          if (onSend) onSend();
        } else {
          throw new Error(response?.replyCRMEmail?.errors?.[0]?.message || "Error al enviar email");
        }
      } else {
        const response = await fetchApiCRM({
          query: CRM_MUTATIONS.SEND_CRM_EMAIL,
          variables: { input }
        });
        if (response?.sendCRMEmail?.success) {
          addEntityEmail(entityId, response.sendCRMEmail.email);
          toast({
            title: isScheduled ? "Email programado" : "Email enviado",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          if (onSend) onSend();
        } else {
          throw new Error(response?.sendCRMEmail?.errors?.[0]?.message || "Error al enviar email");
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Error al enviar email",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      const response = await fetchApiCRM({
        query: CRM_MUTATIONS.CREATE_CRM_EMAIL_DRAFT,
        variables: {
          input: {
            entityId,
            entityType,
            to,
            cc: cc.length > 0 ? cc : undefined,
            bcc: bcc.length > 0 ? bcc : undefined,
            subject: subject.trim(),
            body: body.trim(),
            bodyHtml: bodyHtml.trim() || undefined,
          }
        }
      });
      if (response?.createCRMEmailDraft?.success) {
        toast({
          title: "Borrador guardado",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        if (onSaveDraft) onSaveDraft();
      } else {
        throw new Error(response?.createCRMEmailDraft?.errors?.[0]?.message || "Error al guardar borrador");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Error al guardar borrador",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        {/* To */}
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>Para</Text>
          <HStack spacing={2} flexWrap="wrap">
            {to.map((email) => (
              <Badge key={email} colorScheme="blue">
                {email}
                <Button
                  size="xs"
                  variant="ghost"
                  ml={1}
                  onClick={() => removeEmailFromList(to, setTo, email)}
                >
                  ×
                </Button>
              </Badge>
            ))}
            <Input
              size="sm"
              placeholder="email@ejemplo.com"
              value={toInput}
              onChange={(e) => setToInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addEmailToList(to, setTo, toInput);
                  setToInput("");
                }
              }}
              onBlur={() => {
                if (toInput.trim()) {
                  addEmailToList(to, setTo, toInput);
                  setToInput("");
                }
              }}
            />
          </HStack>
        </Box>

        {/* CC */}
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>CC</Text>
          <HStack spacing={2} flexWrap="wrap">
            {cc.map((email) => (
              <Badge key={email} colorScheme="gray">
                {email}
                <Button
                  size="xs"
                  variant="ghost"
                  ml={1}
                  onClick={() => removeEmailFromList(cc, setCc, email)}
                >
                  ×
                </Button>
              </Badge>
            ))}
            <Input
              size="sm"
              placeholder="email@ejemplo.com"
              value={ccInput}
              onChange={(e) => setCcInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addEmailToList(cc, setCc, ccInput);
                  setCcInput("");
                }
              }}
              onBlur={() => {
                if (ccInput.trim()) {
                  addEmailToList(cc, setCc, ccInput);
                  setCcInput("");
                }
              }}
            />
          </HStack>
        </Box>

        {/* Subject */}
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>Asunto</Text>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Asunto del email"
          />
        </Box>

        {/* Body */}
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>Mensaje</Text>
          <Textarea
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              // Simple conversión a HTML (en producción usar un editor rich text)
              setBodyHtml(e.target.value.replace(/\n/g, "<br/>"));
            }}
            placeholder="Escribe tu mensaje aquí..."
            rows={10}
          />
        </Box>

        {/* Schedule */}
        <Box>
          <Checkbox
            isChecked={isScheduled}
            onChange={(e) => setIsScheduled(e.target.checked)}
          >
            Programar envío
          </Checkbox>
          {isScheduled && (
            <Input
              type="datetime-local"
              value={scheduledFor}
              onChange={(e) => setScheduledFor(e.target.value)}
              mt={2}
            />
          )}
        </Box>

        {/* Actions */}
        <HStack spacing={2} justify="flex-end">
          {onCancel && (
            <Button onClick={onCancel} variant="ghost">
              Cancelar
            </Button>
          )}
          <Button
            onClick={handleSaveDraft}
            isLoading={isSaving}
            loadingText="Guardando..."
            variant="outline"
          >
            Guardar borrador
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSend}
            isLoading={isSending}
            loadingText={isScheduled ? "Programando..." : "Enviando..."}
          >
            {isScheduled ? "Programar envío" : "Enviar"}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}

