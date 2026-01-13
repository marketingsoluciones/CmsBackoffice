import React, { useState, useEffect } from 'react';
import { useTemplate, useCreateTemplate, useUpdateTemplate, useTemplatePreview } from '../../hooks/useTemplates';
import { Template, TemplateType } from '../../types/campaigns';
import {
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon,
  SparklesIcon,
  ArrowLeftIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ToastContextProvider } from '../../context/ToastContext';

interface TemplateEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateId: string | null;
  initialType?: TemplateType;
  onSave?: () => void;
}

export default function TemplateEditorModal({
  isOpen,
  onClose,
  templateId,
  initialType,
  onSave,
}: TemplateEditorModalProps) {
  const { dispatch } = ToastContextProvider();
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'variables'>('editor');
  const [templateType, setTemplateType] = useState<TemplateType>(initialType || 'EMAIL');
  const [formData, setFormData] = useState<Partial<Template>>({
    name: '',
    description: '',
    category: '',
    subject: '',
    htmlContent: '',
    textContent: '',
    variables: [],
  });

  const { data: existingTemplate, loading: loadingTemplate } = useTemplate(templateId);
  const { createTemplate, loading: creating } = useCreateTemplate();
  const { updateTemplate, loading: updating } = useUpdateTemplate();
  const { previewTemplate, loading: previewing } = useTemplatePreview();
  const [previewContent, setPreviewContent] = useState<string>('');

  const pushToast = (type: string, message: string) => {
    dispatch({ type: 'ADD_TOAST', payload: { id: `${Date.now()}-${Math.random()}`, type, message } } as any);
  };

  useEffect(() => {
    if (existingTemplate) {
      setFormData({
        name: existingTemplate.name || '',
        description: existingTemplate.description || '',
        category: existingTemplate.category || '',
        subject: existingTemplate.subject || '',
        htmlContent: existingTemplate.htmlContent || '',
        textContent: existingTemplate.textContent || '',
        variables: existingTemplate.variables || [],
      });
      setTemplateType(existingTemplate.type);
    } else if (initialType) {
      setTemplateType(initialType);
    }
  }, [existingTemplate, initialType]);

  const handleSave = async () => {
    if (!formData.name?.trim()) {
      pushToast('error', 'El nombre es requerido');
      return;
    }

    try {
      if (templateId) {
        await updateTemplate(templateId, {
          ...formData,
          type: templateType,
        });
        pushToast('success', 'Plantilla actualizada correctamente');
      } else {
        await createTemplate({
          ...formData,
          type: templateType,
        });
        pushToast('success', 'Plantilla creada correctamente');
      }
      if (onSave) onSave();
      onClose();
    } catch (err: any) {
      pushToast('error', err?.message || 'Error al guardar la plantilla');
    }
  };

  const handlePreview = async () => {
    try {
      const content = templateType === 'EMAIL' ? formData.htmlContent : formData.textContent;
      if (!content) {
        pushToast('error', 'No hay contenido para previsualizar');
        return;
      }
      const preview = await previewTemplate(content || '', {});
      setPreviewContent(preview);
      setActiveTab('preview');
    } catch (err: any) {
      pushToast('error', err?.message || 'Error al generar preview');
    }
  };

  const availableVariables = [
    { name: 'nombre_contacto', label: 'Nombre del contacto', type: 'contact' },
    { name: 'firstName', label: 'Nombre', type: 'contact' },
    { name: 'lastName', label: 'Apellido', type: 'contact' },
    { name: 'email', label: 'Email', type: 'contact' },
    { name: 'phone', label: 'Teléfono', type: 'contact' },
    { name: 'empresa', label: 'Empresa', type: 'contact' },
    { name: 'ciudad', label: 'Ciudad', type: 'contact' },
    { name: 'pais', label: 'País', type: 'contact' },
    { name: 'nombre_negocio', label: 'Nombre del negocio', type: 'business' },
    { name: 'website', label: 'Website', type: 'business' },
    { name: 'categoria', label: 'Categoría', type: 'business' },
    { name: 'fecha_hoy', label: 'Fecha de hoy', type: 'system' },
    { name: 'mes_actual', label: 'Mes actual', type: 'system' },
    { name: 'anio', label: 'Año', type: 'system' },
    { name: 'mi_nombre', label: 'Mi nombre', type: 'sender' },
    { name: 'mi_email', label: 'Mi email', type: 'sender' },
  ];

  const insertVariable = (variableName: string) => {
    const variable = `{{${variableName}}}`;
    const contentField = templateType === 'EMAIL' ? 'htmlContent' : 'textContent';
    const currentContent = formData[contentField] || '';
    setFormData({
      ...formData,
      [contentField]: currentContent + variable,
    });
  };

  if (!isOpen) return null;

  if (loadingTemplate) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        onClick={onClose}
      >
        <div
          className="p-6 rounded-sm"
          style={{ backgroundColor: '#FFFFFF', borderRadius: '2px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-sm" style={{ color: '#6B7280' }}>Cargando plantilla...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[90vh] rounded-sm shadow-xl flex flex-col"
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
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 rounded-sm transition-colors"
              style={{ color: '#6B7280' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <div>
              <h3 className="text-lg font-semibold" style={{ color: '#111827' }}>
                {templateId ? 'Editar Plantilla' : 'Nueva Plantilla'}
              </h3>
              {templateId && existingTemplate && (
                <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
                  {existingTemplate.name}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreview}
              disabled={previewing}
              className="px-4 py-2 text-sm font-medium rounded-sm transition-colors flex items-center gap-2 disabled:opacity-50"
              style={{
                color: '#6B7280',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '2px',
              }}
            >
              <EyeIcon className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={handleSave}
              disabled={creating || updating}
              className="px-4 py-2 text-sm font-medium rounded-sm text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#3B82F6', borderRadius: '2px' }}
            >
              {creating || updating ? 'Guardando...' : 'Guardar'}
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

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6" style={{ backgroundColor: '#FFFFFF' }}>
          {['editor', 'preview', 'variables'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className="px-4 py-2 text-sm font-medium transition-colors relative capitalize"
              style={{
                color: activeTab === tab ? '#3B82F6' : '#6B7280',
                borderBottom: activeTab === tab ? '2px solid #3B82F6' : '2px solid transparent',
              }}
            >
              {tab === 'editor' && 'Editor'}
              {tab === 'preview' && 'Vista Previa'}
              {tab === 'variables' && 'Variables'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {activeTab === 'editor' && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Tipo de plantilla (solo si es nueva) */}
              {!templateId && (
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: '#6B7280' }}>
                    Tipo de Plantilla *
                  </label>
                  <div className="flex gap-2">
                    {(['EMAIL', 'WHATSAPP', 'SMS'] as TemplateType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setTemplateType(type)}
                        className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors flex items-center gap-2 ${
                          templateType === type ? 'text-white' : 'text-gray-700'
                        }`}
                        style={{
                          backgroundColor: templateType === type ? '#3B82F6' : '#F3F4F6',
                          borderRadius: '2px',
                        }}
                      >
                        {type === 'EMAIL' && <DocumentTextIcon className="w-4 h-4" />}
                        {(type === 'WHATSAPP' || type === 'SMS') && <ChatBubbleLeftRightIcon className="w-4 h-4" />}
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Información básica */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: '#6B7280' }}>
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none"
                    style={{
                      border: '1px solid #E5E7EB',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '2px',
                    }}
                    placeholder="Ej: Plantilla de Bienvenida"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: '#6B7280' }}>
                    Categoría
                  </label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none"
                    style={{
                      border: '1px solid #E5E7EB',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '2px',
                    }}
                    placeholder="Ej: WELCOME, PROMOTION"
                  />
                </div>
              </div>

              {/* Asunto (solo para EMAIL) */}
              {templateType === 'EMAIL' && (
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: '#6B7280' }}>
                    Asunto
                  </label>
                  <input
                    type="text"
                    value={formData.subject || ''}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none"
                    style={{
                      border: '1px solid #E5E7EB',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '2px',
                    }}
                    placeholder="Ej: Bienvenido a {{mi_nombre}}"
                  />
                </div>
              )}

              {/* Editor de contenido */}
              <div>
                <label className="text-sm font-medium block mb-2" style={{ color: '#6B7280' }}>
                  Contenido {templateType === 'EMAIL' ? '(HTML)' : '(Texto)'} *
                </label>
                {templateType === 'EMAIL' ? (
                  <textarea
                    value={formData.htmlContent || ''}
                    onChange={(e) => setFormData({ ...formData, htmlContent: e.target.value })}
                    rows={20}
                    className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none font-mono"
                    style={{
                      border: '1px solid #E5E7EB',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '2px',
                    }}
                    placeholder="<html><body><h1>Hola {{nombre_contacto}}</h1><p>Bienvenido...</p></body></html>"
                  />
                ) : (
                  <textarea
                    value={formData.textContent || ''}
                    onChange={(e) => setFormData({ ...formData, textContent: e.target.value })}
                    rows={15}
                    className="w-full px-3 py-2 text-sm rounded-sm focus:outline-none"
                    style={{
                      border: '1px solid #E5E7EB',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '2px',
                    }}
                    placeholder="Hola {{nombre_contacto}}, Bienvenido a {{mi_nombre}}..."
                  />
                )}
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="max-w-4xl mx-auto">
              {previewContent ? (
                <div
                  className="p-6 rounded-sm"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '2px',
                  }}
                  dangerouslySetInnerHTML={{ __html: previewContent }}
                />
              ) : (
                <div className="text-center py-12">
                  <EyeIcon className="w-12 h-12 mx-auto mb-4" style={{ color: '#9CA3AF' }} />
                  <p className="text-sm" style={{ color: '#6B7280' }}>
                    Haz clic en "Preview" para generar una vista previa
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'variables' && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2" style={{ color: '#111827' }}>
                  Variables Disponibles
                </h3>
                <p className="text-xs" style={{ color: '#6B7280' }}>
                  Haz clic en una variable para insertarla en el contenido. Usa el formato {'{{variable}}'}.
                </p>
              </div>

              <div className="space-y-4">
                {['contact', 'business', 'system', 'sender'].map((category) => {
                  const categoryVars = availableVariables.filter((v) => v.type === category);
                  if (categoryVars.length === 0) return null;

                  return (
                    <div
                      key={category}
                      className="p-4 rounded-sm"
                      style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '2px' }}
                    >
                      <h4 className="text-xs font-semibold mb-3 capitalize" style={{ color: '#374151' }}>
                        {category === 'contact' && 'Contacto'}
                        {category === 'business' && 'Negocio'}
                        {category === 'system' && 'Sistema'}
                        {category === 'sender' && 'Remitente'}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {categoryVars.map((variable) => (
                          <button
                            key={variable.name}
                            onClick={() => insertVariable(variable.name)}
                            className="px-3 py-2 text-xs text-left rounded-sm transition-colors hover:bg-white"
                            style={{
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #E5E7EB',
                              borderRadius: '2px',
                            }}
                          >
                            <div className="font-mono text-xs mb-1" style={{ color: '#3B82F6' }}>
                              {'{{' + variable.name + '}}'}
                            </div>
                            <div className="text-xs" style={{ color: '#6B7280' }}>
                              {variable.label}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

