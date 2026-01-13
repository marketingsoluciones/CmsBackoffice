import React, { useState } from 'react';
import { useTemplates, useDeleteTemplate, useDuplicateTemplate } from '../../hooks/useTemplates';
import { Template, TemplateType } from '../../types/campaigns';
import {
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  ListBulletIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ToastContextProvider } from '../../context/ToastContext';
import TemplateEditorModal from './TemplateEditorModal';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate?: (templateId: string) => void;
  type?: TemplateType;
}

type ViewMode = 'gallery' | 'list';

export default function TemplatesModal({
  isOpen,
  onClose,
  onSelectTemplate,
  type,
}: TemplatesModalProps) {
  const { dispatch } = ToastContextProvider();
  const [viewMode, setViewMode] = useState<ViewMode>('gallery');
  const [selectedType, setSelectedType] = useState<TemplateType | 'ALL'>(type || 'ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [creatingTemplate, setCreatingTemplate] = useState(false);

  const { data, loading, error, refetch } = useTemplates(
    selectedType !== 'ALL' ? selectedType : undefined,
    1,
    100,
    { search: searchQuery }
  );

  const { deleteTemplate } = useDeleteTemplate();
  const { duplicateTemplate } = useDuplicateTemplate();

  const pushToast = (type: string, message: string) => {
    dispatch({ type: 'ADD_TOAST', payload: { id: `${Date.now()}-${Math.random()}`, type, message } } as any);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar la plantilla "${name}"?`)) return;

    try {
      await deleteTemplate(id);
      pushToast('success', 'Plantilla eliminada correctamente');
      refetch();
    } catch (err: any) {
      pushToast('error', err?.message || 'Error al eliminar la plantilla');
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      await duplicateTemplate(id);
      pushToast('success', 'Plantilla duplicada correctamente');
      refetch();
    } catch (err: any) {
      pushToast('error', err?.message || 'Error al duplicar la plantilla');
    }
  };

  const handleEdit = (id: string) => {
    setEditingTemplateId(id);
  };

  const handleCreate = (templateType?: TemplateType) => {
    setCreatingTemplate(true);
    setEditingTemplateId(null);
  };

  const handleEditorClose = () => {
    setEditingTemplateId(null);
    setCreatingTemplate(false);
    refetch();
  };

  const handleSelect = (templateId: string) => {
    if (onSelectTemplate) {
      onSelectTemplate(templateId);
    }
    onClose();
  };

  if (!isOpen) return null;

  const templates = data?.items || [];

  const getTypeIcon = (type: TemplateType) => {
    switch (type) {
      case 'EMAIL':
        return <DocumentTextIcon className="w-5 h-5" />;
      case 'WHATSAPP':
      case 'SMS':
        return <ChatBubbleLeftRightIcon className="w-5 h-5" />;
      default:
        return <DocumentTextIcon className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: TemplateType) => {
    switch (type) {
      case 'EMAIL':
        return { bg: '#DBEAFE', text: '#1D4ED8' };
      case 'WHATSAPP':
        return { bg: '#D1FAE5', text: '#047857' };
      case 'SMS':
        return { bg: '#FEF3C7', text: '#B45309' };
      default:
        return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  // Si está editando o creando, mostrar el editor modal
  if (editingTemplateId || creatingTemplate) {
    return (
      <TemplateEditorModal
        isOpen={true}
        onClose={handleEditorClose}
        templateId={editingTemplateId}
        initialType={creatingTemplate ? selectedType !== 'ALL' ? selectedType : undefined : undefined}
        onSave={handleEditorClose}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl max-h-[90vh] rounded-sm shadow-xl flex flex-col"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #F3F4F6',
          borderRadius: '2px',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}
        >
          <div>
            <h3 className="text-lg font-semibold" style={{ color: '#111827' }}>
              Plantillas de Campañas
            </h3>
            <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
              Gestiona tus plantillas de email, WhatsApp y SMS
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCreate()}
              className="px-4 py-2 text-sm font-medium rounded-sm text-white transition-colors flex items-center gap-2"
              style={{ backgroundColor: '#3B82F6', borderRadius: '2px' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3B82F6')}
            >
              <PlusIcon className="w-4 h-4" />
              Nueva Plantilla
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-sm transition-colors"
              style={{ color: '#6B7280' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="flex items-center gap-4 px-6 py-3 flex-shrink-0 flex-wrap" style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#FFFFFF' }}>
          {/* Búsqueda */}
          <div className="relative flex-1 min-w-[200px]">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#9CA3AF' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar plantillas..."
              className="w-full pl-10 pr-3 py-2 text-sm rounded-sm focus:outline-none"
              style={{
                border: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
                borderRadius: '2px',
              }}
            />
          </div>

          {/* Filtro por tipo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedType('ALL')}
              className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                selectedType === 'ALL' ? 'text-white' : 'text-gray-700'
              }`}
              style={{
                backgroundColor: selectedType === 'ALL' ? '#3B82F6' : '#F3F4F6',
                borderRadius: '2px',
              }}
            >
              Todas
            </button>
            <button
              onClick={() => setSelectedType('EMAIL')}
              className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                selectedType === 'EMAIL' ? 'text-white' : 'text-gray-700'
              }`}
              style={{
                backgroundColor: selectedType === 'EMAIL' ? '#3B82F6' : '#F3F4F6',
                borderRadius: '2px',
              }}
            >
              Email
            </button>
            <button
              onClick={() => setSelectedType('WHATSAPP')}
              className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                selectedType === 'WHATSAPP' ? 'text-white' : 'text-gray-700'
              }`}
              style={{
                backgroundColor: selectedType === 'WHATSAPP' ? '#3B82F6' : '#F3F4F6',
                borderRadius: '2px',
              }}
            >
              WhatsApp
            </button>
            <button
              onClick={() => setSelectedType('SMS')}
              className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                selectedType === 'SMS' ? 'text-white' : 'text-gray-700'
              }`}
              style={{
                backgroundColor: selectedType === 'SMS' ? '#3B82F6' : '#F3F4F6',
                borderRadius: '2px',
              }}
            >
              SMS
            </button>
          </div>

          {/* Modo de vista */}
          <div className="flex items-center gap-1 border rounded-sm" style={{ borderColor: '#E5E7EB', borderRadius: '2px' }}>
            <button
              onClick={() => setViewMode('gallery')}
              className={`p-1.5 transition-colors ${
                viewMode === 'gallery' ? 'bg-blue-50' : 'bg-transparent'
              }`}
              style={{ borderRadius: '2px' }}
              title="Vista galería"
            >
              <Squares2X2Icon className="w-4 h-4" style={{ color: viewMode === 'gallery' ? '#3B82F6' : '#6B7280' }} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 transition-colors ${
                viewMode === 'list' ? 'bg-blue-50' : 'bg-transparent'
              }`}
              style={{ borderRadius: '2px' }}
              title="Vista lista"
            >
              <ListBulletIcon className="w-4 h-4" style={{ color: viewMode === 'list' ? '#3B82F6' : '#6B7280' }} />
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-sm" style={{ color: '#6B7280' }}>Cargando plantillas...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-sm" style={{ color: '#DC2626' }}>Error: {error.message}</div>
            </div>
          ) : templates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <DocumentTextIcon className="w-16 h-16 mb-4" style={{ color: '#9CA3AF' }} />
              <h3 className="text-lg font-medium mb-2" style={{ color: '#111827' }}>
                No hay plantillas
              </h3>
              <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
                Crea tu primera plantilla para comenzar
              </p>
              <button
                onClick={() => handleCreate()}
                className="px-4 py-2 text-sm font-medium rounded-sm text-white"
                style={{ backgroundColor: '#3B82F6', borderRadius: '2px' }}
              >
                Crear Plantilla
              </button>
            </div>
          ) : viewMode === 'gallery' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {templates.map((template: Template) => {
                const colors = getTypeColor(template.type);
                return (
                  <div
                    key={template.id}
                    className="flex flex-col rounded-sm shadow-sm transition-shadow hover:shadow-md cursor-pointer"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}
                    onClick={() => onSelectTemplate && handleSelect(template.id)}
                  >
                    {/* Preview/Thumbnail */}
                    <div
                      className="h-32 flex items-center justify-center"
                      style={{ backgroundColor: '#F9FAFB' }}
                    >
                      {template.thumbnail ? (
                        <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center gap-2" style={{ color: '#9CA3AF' }}>
                          {getTypeIcon(template.type)}
                          <span className="text-xs">{template.type}</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-3 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-sm font-medium flex-1 truncate" style={{ color: '#111827' }}>
                          {template.name}
                        </h3>
                        <span
                          className="px-2 py-0.5 text-xs rounded-sm ml-2 flex-shrink-0"
                          style={{ backgroundColor: colors.bg, color: colors.text, borderRadius: '2px' }}
                        >
                          {template.type}
                        </span>
                      </div>

                      {template.category && (
                        <div className="text-xs mb-2" style={{ color: '#6B7280' }}>
                          {template.category}
                        </div>
                      )}

                      {template.subject && (
                        <div className="text-xs mb-2 truncate" style={{ color: '#9CA3AF' }}>
                          {template.subject}
                        </div>
                      )}

                      {template.variables && template.variables.length > 0 && (
                        <div className="text-xs mb-2" style={{ color: '#6B7280' }}>
                          {template.variables.length} variable(s)
                        </div>
                      )}

                      {/* Acciones */}
                      <div
                        className="flex items-center gap-1 mt-auto pt-2 border-t"
                        style={{ borderColor: '#E5E7EB' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {onSelectTemplate && (
                          <button
                            onClick={() => handleSelect(template.id)}
                            className="flex-1 px-2 py-1 text-xs font-medium rounded-sm transition-colors flex items-center justify-center gap-1"
                            style={{
                              color: '#FFFFFF',
                              backgroundColor: '#10B981',
                              borderRadius: '2px',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#059669')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#10B981')}
                          >
                            Seleccionar
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(template.id)}
                          className="px-2 py-1 text-xs font-medium rounded-sm transition-colors flex items-center justify-center gap-1"
                          style={{
                            color: '#3B82F6',
                            backgroundColor: 'transparent',
                            borderRadius: '2px',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#EFF6FF')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <PencilIcon className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(template.id)}
                          className="px-2 py-1 text-xs font-medium rounded-sm transition-colors"
                          style={{
                            color: '#10B981',
                            backgroundColor: 'transparent',
                            borderRadius: '2px',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F0FDF4')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          title="Duplicar"
                        >
                          <DocumentDuplicateIcon className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(template.id, template.name)}
                          className="px-2 py-1 text-xs font-medium rounded-sm transition-colors"
                          style={{
                            color: '#DC2626',
                            backgroundColor: 'transparent',
                            borderRadius: '2px',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEF2F2')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          title="Eliminar"
                        >
                          <TrashIcon className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {templates.map((template: Template) => {
                const colors = getTypeColor(template.type);
                return (
                  <div
                    key={template.id}
                    className="flex items-center gap-4 p-3 rounded-sm transition-colors hover:bg-gray-50 cursor-pointer"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '2px',
                    }}
                    onClick={() => onSelectTemplate && handleSelect(template.id)}
                  >
                    <div className="flex-shrink-0" style={{ color: colors.text }}>
                      {getTypeIcon(template.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium truncate" style={{ color: '#111827' }}>
                          {template.name}
                        </h3>
                        <span
                          className="px-2 py-0.5 text-xs rounded-sm flex-shrink-0"
                          style={{ backgroundColor: colors.bg, color: colors.text, borderRadius: '2px' }}
                        >
                          {template.type}
                        </span>
                        {template.category && (
                          <span className="text-xs" style={{ color: '#6B7280' }}>
                            {template.category}
                          </span>
                        )}
                      </div>
                      {template.subject && (
                        <div className="text-xs truncate" style={{ color: '#9CA3AF' }}>
                          {template.subject}
                        </div>
                      )}
                    </div>
                    <div
                      className="flex items-center gap-2 flex-shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {onSelectTemplate && (
                        <button
                          onClick={() => handleSelect(template.id)}
                          className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors"
                          style={{
                            color: '#FFFFFF',
                            backgroundColor: '#10B981',
                            borderRadius: '2px',
                          }}
                        >
                          Seleccionar
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(template.id)}
                        className="px-3 py-1.5 text-xs font-medium rounded-sm transition-colors flex items-center gap-1"
                        style={{
                          color: '#3B82F6',
                          backgroundColor: '#EFF6FF',
                          borderRadius: '2px',
                        }}
                      >
                        <PencilIcon className="w-3 h-3" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDuplicate(template.id)}
                        className="p-1.5 rounded-sm transition-colors"
                        style={{
                          color: '#10B981',
                          backgroundColor: 'transparent',
                          borderRadius: '2px',
                        }}
                        title="Duplicar"
                      >
                        <DocumentDuplicateIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(template.id, template.name)}
                        className="p-1.5 rounded-sm transition-colors"
                        style={{
                          color: '#DC2626',
                          backgroundColor: 'transparent',
                          borderRadius: '2px',
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
          )}
        </div>
      </div>
    </div>
  );
}

