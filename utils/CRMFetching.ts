import Cookies from "js-cookie";
import { getAuth } from "firebase/auth";
import { parseJwt } from "./Authentication";

const CRM_ENDPOINT = (process.env.NEXT_PUBLIC_CRM_GRAPHQL || "https://api2.eventosorganizador.com/graphql").replace(/\/$/, "");
const DEFAULT_DEVELOPMENT = process.env.NEXT_PUBLIC_DEVELOPMENT || "bodasdehoy";

// Usar proxy de Next.js para evitar problemas CORS
// El proxy hace las peticiones desde el servidor, evitando restricciones CORS del navegador
const USE_PROXY = process.env.NEXT_PUBLIC_USE_CRM_PROXY !== 'false'; // Por defecto usar proxy
const PROXY_ENDPOINT = '/api/crm/graphql';

// Helper para obtener development y userId para las mutations CRM
export const getCRMContext = async (): Promise<{ development: string; userId: string }> => {
  const development = resolveDevelopment() || DEFAULT_DEVELOPMENT;
  const token = await ensureFirebaseToken();
  let userId = "";
  
  if (token) {
    try {
      const decoded = parseJwt(token);
      userId = decoded?.user_id || decoded?.uid || "";
    } catch (e) {
      console.error("Error parsing token for userId:", e);
    }
  }
  
  if (!userId) {
    // Intentar obtener desde Firebase Auth como fallback
    try {
      const auth = getAuth();
      if (auth?.currentUser?.uid) {
        userId = auth.currentUser.uid;
      }
    } catch (e) {
      console.error("Error getting userId from Firebase Auth:", e);
    }
  }
  
  if (!userId) {
    throw new Error("No se pudo obtener el userId. Por favor, inicia sesión nuevamente.");
  }
  
  return { development, userId };
};

const readDocumentCookie = (key: string) => {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.split("; ").find(row => row.startsWith(`${key}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : undefined;
};

export const resolveDevelopment = () => {
  if (typeof window === "undefined") return DEFAULT_DEVELOPMENT;
  return (
    Cookies.get("development") ||
    readDocumentCookie("development") ||
    localStorage.getItem("development") ||
    DEFAULT_DEVELOPMENT
  );
};

const ensureFirebaseToken = async (): Promise<string | undefined> => {
  if (typeof window === "undefined") return undefined;
  let idToken = Cookies.get("idTokenV0.1.0");
  if (!idToken) {
    const auth = getAuth();
    if (auth?.currentUser) {
      idToken = await auth.currentUser.getIdToken(true);
      try {
        const exp = parseJwt(idToken ?? "")?.exp;
        const expires = exp ? new Date(exp * 1000) : undefined;
        Cookies.set("idTokenV0.1.0", idToken ?? "", expires ? { expires } : undefined);
      } catch {
        // ignore parse failures
      }
    }
  }
  return idToken;
};

// Función helper para uploads de archivos via GraphQL
// Usa el protocolo GraphQL multipart request specification
export const fetchApiCRMUpload = async ({
  query = ``,
  variables = {},
  file,
  fileVariablePath = "input.file",
}: {
  query: string;
  variables?: Record<string, any>;
  file: File;
  fileVariablePath?: string;
}) => {
  // Usar proxy para uploads para evitar problemas CORS
  const useProxy = USE_PROXY && typeof window !== 'undefined';
  const endpoint = useProxy ? '/api/crm/upload' : CRM_ENDPOINT;
  
  const token = await ensureFirebaseToken();
  const dev = resolveDevelopment();
  
  // Crear FormData para multipart request según GraphQL multipart spec
  const formData = new FormData();
  
  // Preparar variables (sin el archivo)
  const variablesWithoutFile = { ...variables };
  // Establecer el archivo como null en variables (se mapeará después)
  const pathParts = fileVariablePath.split('.');
  let current: any = variablesWithoutFile;
  for (let i = 0; i < pathParts.length - 1; i++) {
    if (!current[pathParts[i]]) {
      current[pathParts[i]] = {};
    }
    current = current[pathParts[i]];
  }
  current[pathParts[pathParts.length - 1]] = null;
  
  // Operations (query + variables sin archivo)
  const operations = {
    query,
    variables: variablesWithoutFile,
  };
  
  // Map (mapeo del archivo a la variable)
  // El formato es: { "0": ["variables.input.file"] }
  const map: Record<string, string[]> = {
    "0": [fileVariablePath],
  };
  
  formData.append("operations", JSON.stringify(operations));
  formData.append("map", JSON.stringify(map));
  formData.append("0", file);
  
  // Headers (NO incluir Content-Type, el navegador lo establecerá automáticamente con el boundary)
  const headers: Record<string, string> = {};
  
  // Header para Apollo Server v4 CSRF protection (si es necesario)
  // Apollo Server v4 puede requerir este header para multipart requests
  headers["Apollo-Require-Preflight"] = "true";
  
  if (dev) {
    headers["X-Development"] = dev;
  }
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  if (process.env.NEXT_PUBLIC_PRODUCTION) {
    headers["IsProduction"] = String(process.env.NEXT_PUBLIC_PRODUCTION);
  }
  
  const fetchOptions: RequestInit = {
    method: "POST",
    headers,
    body: formData,
  };
  
  if (!useProxy) {
    fetchOptions.mode = "cors";
    fetchOptions.credentials = "omit";
  }
  
  const res = await fetch(endpoint, fetchOptions);
  
  if (!res.ok) {
    const text = await res.text();
    let errorMessage = `HTTP ${res.status}: ${res.statusText}`;
    let errorDetails: any = null;
    try {
      const json = JSON.parse(text);
      
      // Prioridad 1: Error directo del backend (ej: "Content-Type debe ser application/json")
      if (json?.error) {
        errorMessage = json.error;
        if (json.received) {
          errorMessage += ` (recibido: ${json.received})`;
        }
        errorDetails = json;
      }
      // Prioridad 2: Errores GraphQL
      else if (json?.errors?.length) {
        const firstError = json.errors[0];
        errorMessage = firstError?.message || errorMessage;
        errorDetails = firstError;
      }
      // Prioridad 3: Errores en la mutation
      else if (json?.data?.uploadCRMEntityFile?.errors?.length) {
        const firstError = json.data.uploadCRMEntityFile.errors[0];
        errorMessage = firstError?.message || errorMessage;
        errorDetails = firstError;
      }
    } catch {
      // Si no es JSON, usar el texto como mensaje
      errorMessage = text || errorMessage;
    }
    
    // Mensaje más descriptivo para errores de Content-Type
    if (errorMessage.includes("Content-Type debe ser application/json")) {
      errorMessage = "El backend no está configurado para aceptar multipart/form-data. Contacta al administrador.";
    }
    
    const error = new Error(errorMessage);
    (error as any).details = errorDetails;
    throw error;
  }
  
  const json = await res.json();
  
  if (json.errors && json.errors.length > 0) {
    const firstError = json.errors[0];
    const error = new Error(firstError?.message || "Error en la petición GraphQL");
    (error as any).details = firstError;
    throw error;
  }
  
  return json.data;
};

export const fetchApiCRM = async ({
  query = ``,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}) => {
  // Usar proxy de Next.js si está disponible (evita problemas CORS)
  const useProxy = USE_PROXY && typeof window !== 'undefined';
  const endpoint = useProxy ? PROXY_ENDPOINT : CRM_ENDPOINT;
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  const dev = resolveDevelopment();
  if (dev) {
    headers["X-Development"] = dev;
  }

  const token = await ensureFirebaseToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Agregar header IsProduction si está definido
  if (process.env.NEXT_PUBLIC_PRODUCTION) {
    headers["IsProduction"] = String(process.env.NEXT_PUBLIC_PRODUCTION);
  }

  // Si usamos el proxy, no necesitamos mode: "cors" porque es same-origin
  const fetchOptions: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables })
  };

  if (!useProxy) {
    // Solo para peticiones directas al backend
    fetchOptions.mode = "cors";
    fetchOptions.credentials = "omit";
  }

  const res = await fetch(endpoint, fetchOptions);

  if (!res.ok) {
    const text = await res.text();
    let errorMessage = `HTTP ${res.status}: ${res.statusText}`;
    let errorDetails: any = null;
    try {
      const json = JSON.parse(text);
      if (json?.errors?.length) {
        // Extraer el mensaje de error más descriptivo
        const firstError = json.errors[0];
        errorMessage = firstError?.message || errorMessage;
        errorDetails = firstError;
        // Si el error menciona un tipo desconocido, agregar contexto
        if (errorMessage.includes("Unknown type") || errorMessage.includes("Cannot query field")) {
          const typeName = errorMessage.match(/Unknown type "([^"]+)"/)?.[1] || 
                          errorMessage.match(/Cannot query field "([^"]+)"/)?.[1] || "";
          errorMessage = `${errorMessage}\n\n🚨 PROBLEMA DEL BACKEND: El schema GraphQL no incluye este tipo o mutación.\n\n📋 El backend necesita implementar:\n${typeName ? `- Tipo: "${typeName}"\n` : ""}- La mutación/query correspondiente\n\n💡 Acciones:\n1. Usa la sección "🔍 Diagnóstico del Schema" para verificar qué está disponible\n2. Contacta al equipo de backend con el documento: docs/crm-backend-schema-errors-complete.md\n3. Verifica que el backend esté desplegado y el servidor reiniciado`;
          if (typeName) {
            errorMessage += `\n\n🔍 Tipo/Mutación buscada: "${typeName}"`;
            if (typeName.includes("Input")) {
              errorMessage += `\n\n💡 Este es un tipo de INPUT. El backend debe definirlo en su schema GraphQL.`;
            } else if (typeName.includes("CRM_")) {
              errorMessage += `\n\n💡 Este es un tipo del módulo CRM. Verifica que el módulo esté completamente implementado en el backend.`;
            }
          }
        }
      } else if (json?.message) {
        errorMessage = json.message;
      }
    } catch {
      errorMessage = text || errorMessage;
    }
    const error = new Error(errorMessage);
    (error as any).details = errorDetails;
    throw error;
  }

  const json = await res.json();
  
  // Verificar errores de GraphQL primero (aunque el status sea 200)
  if (json?.errors?.length) {
    const firstError = json.errors[0];
    let errorMessage = firstError?.message || "Error en la API CRM";
    // Si el error menciona un tipo desconocido, agregar contexto
    if (errorMessage.includes("Unknown type") || errorMessage.includes("Cannot query field")) {
      const typeName = errorMessage.match(/Unknown type "([^"]+)"/)?.[1] || 
                      errorMessage.match(/Cannot query field "([^"]+)"/)?.[1] || "";
      errorMessage = `${errorMessage}\n\n🚨 PROBLEMA DEL BACKEND: El schema GraphQL no incluye este tipo o mutación.\n\n📋 El backend necesita implementar:\n${typeName ? `- Tipo: "${typeName}"\n` : ""}- La mutación/query correspondiente\n\n💡 Acciones:\n1. Usa la sección "🔍 Diagnóstico del Schema" para verificar qué está disponible\n2. Contacta al equipo de backend con el documento: docs/crm-backend-schema-errors-complete.md\n3. Verifica que el backend esté desplegado y el servidor reiniciado`;
      if (typeName) {
        errorMessage += `\n\n🔍 Tipo/Mutación buscada: "${typeName}"`;
        if (typeName.includes("Input")) {
          errorMessage += `\n\n💡 Este es un tipo de INPUT. El backend debe definirlo en su schema GraphQL.`;
        } else if (typeName.includes("CRM_")) {
          errorMessage += `\n\n💡 Este es un tipo del módulo CRM. Verifica que el módulo esté completamente implementado en el backend.`;
        }
      }
    }
    const error = new Error(errorMessage);
    (error as any).details = firstError;
    throw error;
  }
  
  // Si hay datos exitosos, devolverlos aunque haya errores (el backend puede tener errores secundarios)
  if (json?.data) {
    const dataValues = Object.values(json.data);
    // Verificar si hay algún valor válido en los datos
    for (const val of dataValues) {
      if (val !== null && val !== undefined) {
        // Si es un objeto, verificar si tiene propiedades válidas (no es un error)
        if (typeof val === "object" && !Array.isArray(val)) {
          const objKeys = Object.keys(val);
          // Si tiene al menos una propiedad que no sea "errors" o "error", considerarlo válido
          if (objKeys.length > 0 && !objKeys.every(k => k === "errors" || k === "error")) {
            return json.data;
          }
        } else if (Array.isArray(val) && val.length > 0) {
          return json.data;
        } else if (typeof val !== "object") {
          return json.data;
        }
      }
    }
    
    // Verificación adicional: buscar específicamente campos comunes de éxito en mutaciones
    const mutationKeys = ["lead", "contact", "entity", "campaign", "whitelabel", "label", "filter", "savedFilter", "file", "email", "success"];
    for (const key of mutationKeys) {
      const mutationData = json.data[`createCRM${key.charAt(0).toUpperCase() + key.slice(1)}`] || 
                          json.data[`updateCRM${key.charAt(0).toUpperCase() + key.slice(1)}`] ||
                          json.data[`deleteCRM${key.charAt(0).toUpperCase() + key.slice(1)}`] ||
                          json.data[`toggleCRM${key.charAt(0).toUpperCase() + key.slice(1)}`] ||
                          json.data[`create${key.charAt(0).toUpperCase() + key.slice(1)}`] ||
                          json.data[`update${key.charAt(0).toUpperCase() + key.slice(1)}`] ||
                          json.data[`delete${key.charAt(0).toUpperCase() + key.slice(1)}`];
      // Para savedFilter, también buscar "filter" (nuevo nombre del campo)
      const dataKey = key === "savedFilter" ? "filter" : key;
      if (mutationData && (mutationData[dataKey] || mutationData[key] || mutationData.success !== undefined)) {
        return json.data;
      }
    }
  }

  return json;
};

