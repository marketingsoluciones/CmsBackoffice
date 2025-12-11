import { createContext, useContext, useState, useCallback, ReactNode } from "react";

// Tipos para el estado global del CRM
export interface CRMLabel {
  id: string;
  name: string;
  color: string;
  entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN";
  usageCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SavedFilter {
  id: string;
  name: string;
  entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN";
  conditions: any[];
  visibility: "PRIVATE" | "SHARED";
  isFavorite: boolean;
  saveColumns?: boolean;
  columns?: any[];
  usageCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SharedUser {
  userId: string;
  userName: string;
  permissionLevel: "READ" | "WRITE" | "ADMIN";
  sharedAt?: string;
}

export interface CRMFile {
  id: string;
  filename: string;
  originalFilename: string;
  fileType: string;
  mimeType: string;
  fileSize: number;
  relatedTo: {
    entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN" | "ACTIVITY" | "NOTE";
    entityId: string;
  };
  uploadedBy: string;
  uploadedAt: string;
  category: "documents" | "photos" | "videos" | "memories";
  visibility: "private" | "event" | "public";
  publicUrls: {
    original: string;
    optimized800w?: string;
    optimized400w?: string;
    thumbnail?: string;
  };
  metadata?: {
    description?: string;
    tags?: string[];
    taken_at?: string;
    location?: string;
  };
  downloadCount?: number;
  lastDownloaded?: string;
}

export interface CRMEmail {
  id: string;
  relatedTo: {
    entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN";
    entityId: string;
  };
  from: string;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
  bodyHtml?: string;
  attachments: any[];
  status: "DRAFT" | "SENT" | "RECEIVED" | "FAILED" | "SCHEDULED";
  direction: "INBOUND" | "OUTBOUND";
  sentAt?: string;
  receivedAt?: string;
  failedAt?: string;
  failureReason?: string;
  threadId?: string;
  inReplyTo?: string;
  references: string[];
  metadata: {
    messageId: string;
    provider: "SMTP" | "GMAIL" | "OUTLOOK" | "SENDGRID" | "RESEND";
    externalId?: string;
  };
  tracking: {
    opened: boolean;
    openedAt?: string;
    openCount: number;
    clicked: boolean;
    clickedAt?: string;
    clickCount: number;
    bounced: boolean;
    bouncedReason?: string;
  };
  scheduledFor?: string;
  createdBy: {
    userId: string;
    name: string;
  };
  development: string;
  createdAt: string;
  updatedAt: string;
}

interface CRMContextType {
  // Labels
  labels: Record<string, CRMLabel[]>;
  loadLabels: (entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN") => Promise<void>;
  addLabel: (label: CRMLabel) => void;
  updateLabel: (labelId: string, updates: Partial<CRMLabel>) => void;
  removeLabel: (labelId: string) => void;
  
  // Saved Filters
  savedFilters: Record<string, SavedFilter[]>;
  loadSavedFilters: (entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN") => Promise<void>;
  addSavedFilter: (filter: SavedFilter) => void;
  updateSavedFilter: (filterId: string, updates: Partial<SavedFilter>) => void;
  removeSavedFilter: (filterId: string) => void;
  
  // Files cache
  entityFiles: Record<string, CRMFile[]>;
  setEntityFiles: (entityId: string, files: CRMFile[]) => void;
  addEntityFile: (entityId: string, file: CRMFile) => void;
  removeEntityFile: (entityId: string, fileId: string) => void;
  
  // Emails cache
  entityEmails: Record<string, CRMEmail[]>;
  setEntityEmails: (entityId: string, emails: CRMEmail[]) => void;
  addEntityEmail: (entityId: string, email: CRMEmail) => void;
  updateEntityEmail: (entityId: string, emailId: string, updates: Partial<CRMEmail>) => void;
  
  // Permissions cache
  entityPermissions: Record<string, SharedUser[]>;
  setEntityPermissions: (entityId: string, permissions: SharedUser[]) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider = ({ children }: { children: ReactNode }) => {
  const [labels, setLabels] = useState<Record<string, CRMLabel[]>>({});
  const [savedFilters, setSavedFilters] = useState<Record<string, SavedFilter[]>>({});
  const [entityFiles, setEntityFilesState] = useState<Record<string, CRMFile[]>>({});
  const [entityEmails, setEntityEmailsState] = useState<Record<string, CRMEmail[]>>({});
  const [entityPermissions, setEntityPermissionsState] = useState<Record<string, SharedUser[]>>({});

  const loadLabels = useCallback(async (entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN") => {
    // Esta función será implementada cuando conectemos con el backend
    // Por ahora solo mantiene el estado
  }, []);

  const addLabel = useCallback((label: CRMLabel) => {
    setLabels(prev => ({
      ...prev,
      [label.entityType]: [...(prev[label.entityType] || []), label]
    }));
  }, []);

  const updateLabel = useCallback((labelId: string, updates: Partial<CRMLabel>) => {
    setLabels(prev => {
      const newLabels = { ...prev };
      Object.keys(newLabels).forEach(entityType => {
        newLabels[entityType] = newLabels[entityType].map(l =>
          l.id === labelId ? { ...l, ...updates } : l
        );
      });
      return newLabels;
    });
  }, []);

  const removeLabel = useCallback((labelId: string) => {
    setLabels(prev => {
      const newLabels = { ...prev };
      Object.keys(newLabels).forEach(entityType => {
        newLabels[entityType] = newLabels[entityType].filter(l => l.id !== labelId);
      });
      return newLabels;
    });
  }, []);

  const loadSavedFilters = useCallback(async (entityType: "LEAD" | "CONTACT" | "ENTITY" | "CAMPAIGN") => {
    // Implementar cuando conectemos con el backend
  }, []);

  const addSavedFilter = useCallback((filter: SavedFilter) => {
    setSavedFilters(prev => ({
      ...prev,
      [filter.entityType]: [...(prev[filter.entityType] || []), filter]
    }));
  }, []);

  const updateSavedFilter = useCallback((filterId: string, updates: Partial<SavedFilter>) => {
    setSavedFilters(prev => {
      const newFilters = { ...prev };
      Object.keys(newFilters).forEach(entityType => {
        newFilters[entityType] = newFilters[entityType].map(f =>
          f.id === filterId ? { ...f, ...updates } : f
        );
      });
      return newFilters;
    });
  }, []);

  const removeSavedFilter = useCallback((filterId: string) => {
    setSavedFilters(prev => {
      const newFilters = { ...prev };
      Object.keys(newFilters).forEach(entityType => {
        newFilters[entityType] = newFilters[entityType].filter(f => f.id !== filterId);
      });
      return newFilters;
    });
  }, []);

  const setEntityFiles = useCallback((entityId: string, files: CRMFile[]) => {
    setEntityFilesState(prev => ({ ...prev, [entityId]: files }));
  }, []);

  const addEntityFile = useCallback((entityId: string, file: CRMFile) => {
    setEntityFilesState(prev => ({
      ...prev,
      [entityId]: [...(prev[entityId] || []), file]
    }));
  }, []);

  const removeEntityFile = useCallback((entityId: string, fileId: string) => {
    setEntityFilesState(prev => ({
      ...prev,
      [entityId]: (prev[entityId] || []).filter(f => f.id !== fileId)
    }));
  }, []);

  const setEntityEmails = useCallback((entityId: string, emails: CRMEmail[]) => {
    setEntityEmailsState(prev => ({ ...prev, [entityId]: emails }));
  }, []);

  const addEntityEmail = useCallback((entityId: string, email: CRMEmail) => {
    setEntityEmailsState(prev => ({
      ...prev,
      [entityId]: [...(prev[entityId] || []), email]
    }));
  }, []);

  const updateEntityEmail = useCallback((entityId: string, emailId: string, updates: Partial<CRMEmail>) => {
    setEntityEmailsState(prev => ({
      ...prev,
      [entityId]: (prev[entityId] || []).map(e =>
        e.id === emailId ? { ...e, ...updates } : e
      )
    }));
  }, []);

  const setEntityPermissions = useCallback((entityId: string, permissions: SharedUser[]) => {
    setEntityPermissionsState(prev => ({ ...prev, [entityId]: permissions }));
  }, []);

  return (
    <CRMContext.Provider
      value={{
        labels,
        loadLabels,
        addLabel,
        updateLabel,
        removeLabel,
        savedFilters,
        loadSavedFilters,
        addSavedFilter,
        updateSavedFilter,
        removeSavedFilter,
        entityFiles,
        setEntityFiles,
        addEntityFile,
        removeEntityFile,
        entityEmails,
        setEntityEmails,
        addEntityEmail,
        updateEntityEmail,
        entityPermissions,
        setEntityPermissions,
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error("useCRM must be used within CRMProvider");
  }
  return context;
};

