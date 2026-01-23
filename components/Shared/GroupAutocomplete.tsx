import React, { useState, useEffect, useRef, useCallback } from "react";

interface Group {
  group_id: string;
  name: string;
  description?: string;
  default_permission: string;
  member_count?: number;
}

interface GroupAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelectGroup: (group: Group) => void;
  selectedGroups: Group[];
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

export default function GroupAutocomplete({
  value,
  onChange,
  onSelectGroup,
  selectedGroups,
  placeholder = "Buscar grupo por nombre...",
  disabled = false,
  error,
}: GroupAutocompleteProps) {
  const [allGroups, setAllGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [hasLoadedGroups, setHasLoadedGroups] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cargar todos los grupos al hacer focus
  const loadAllGroups = async () => {
    if (hasLoadedGroups) {
      const filtered = filterGroups(value, allGroups, selectedGroups);
      setFilteredGroups(filtered);
      return;
    }

    setIsLoading(true);
    try {
      const { fetchApiCRM } = await import("../../utils/CRMFetching");
      const { CRM_QUERIES } = await import("../../utils/crmQueries");
      
      try {
        // Cargar todos los grupos (sin filtro de búsqueda o con búsqueda vacía)
        const response = await fetchApiCRM({
          query: CRM_QUERIES.SEARCH_CRM_GROUPS,
          variables: {
            search: "",
            limit: 1000, // Cargar muchos grupos
          },
        });

        if (response?.searchCRMGroups?.groups) {
          // Filtrar grupos que ya están seleccionados
          const available = response.searchCRMGroups.groups.filter(
            (group: Group) => !selectedGroups.some((sg) => sg.group_id === group.group_id)
          );
          setAllGroups(available);
          setFilteredGroups(available);
          setHasLoadedGroups(true);
        } else {
          setAllGroups([]);
          setFilteredGroups([]);
        }
      } catch (error: any) {
        const errorMessage = error?.message || "Error desconocido";
        if (errorMessage.includes("Cannot query field") || errorMessage.includes("searchCRMGroups")) {
          console.error("❌ ERROR: La query 'searchCRMGroups' no está disponible en el backend.");
          console.error("📋 El backend necesita reiniciar el servidor después de implementar la query.");
          console.error("🔍 Error completo:", error);
          console.error("💡 Verificar: docs/troubleshooting-search-crm-users.md");
        } else {
          console.warn("⚠️ Error al buscar grupos:", error);
        }
        setAllGroups([]);
        setFilteredGroups([]);
      }
    } catch (error) {
      console.error("Error loading groups:", error);
      setAllGroups([]);
      setFilteredGroups([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar grupos localmente según el texto escrito
  const filterGroups = useCallback((searchTerm: string, groups: Group[], selected: Group[]) => {
    if (!searchTerm || searchTerm.trim().length === 0) {
      // Si no hay texto, mostrar todos los grupos disponibles
      const available = groups.filter(
        (group) => !selected.some((sg) => sg.group_id === group.group_id)
      );
      return available;
    }

    const term = searchTerm.toLowerCase().trim();
    const filtered = groups.filter((group) => {
      const nameMatch = group.name?.toLowerCase().includes(term);
      const descMatch = group.description?.toLowerCase().includes(term);
      const isNotSelected = !selected.some((sg) => sg.group_id === group.group_id);
      return (nameMatch || descMatch) && isNotSelected;
    });

    return filtered;
  }, []);

  // Filtrar cuando cambia el valor del input o los grupos seleccionados
  useEffect(() => {
    if (hasLoadedGroups && allGroups.length > 0) {
      const filtered = filterGroups(value, allGroups, selectedGroups);
      setFilteredGroups(filtered);
    }
  }, [value, selectedGroups, allGroups, hasLoadedGroups, filterGroups]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectGroup = (group: Group) => {
    onSelectGroup(group);
    onChange("");
    setHighlightedIndex(-1);
    // Mantener el dropdown abierto para seleccionar más grupos
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filteredGroups.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredGroups.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredGroups.length) {
          handleSelectGroup(filteredGroups[highlightedIndex]);
        }
        break;
      case "Escape":
        setShowDropdown(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleFocus = () => {
    setShowDropdown(true);
    loadAllGroups();
  };

  return (
    <div className="relative w-full" style={{ position: 'relative', zIndex: 1 }}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-sm px-2.5 py-1.5 text-xs focus:outline-none transition-all"
        style={{
          border: `1px solid ${error ? '#EF4444' : '#E5E7EB'}`,
          backgroundColor: disabled ? '#F9FAFB' : '#FFFFFF',
          position: 'relative',
          minHeight: '32px',
          borderRadius: '2px',
        }}
        onFocusCapture={(e) => {
          if (e.currentTarget) {
            e.currentTarget.style.borderColor = '#3B82F6';
            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
          }
        }}
        onBlurCapture={() => {
          // Delay para permitir click en dropdown
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.style.borderColor = error ? '#EF4444' : '#D1D5DB';
              inputRef.current.style.boxShadow = 'none';
            }
          }, 200);
        }}
      />

      {/* Dropdown de resultados */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute mt-1 rounded-sm shadow-lg w-full"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            maxHeight: "300px",
            overflow: "hidden",
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 10001, // Mayor que el z-index del modal (10000)
            borderRadius: "2px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          {isLoading ? (
            <div className="p-3 text-xs text-center" style={{ color: "#6B7280" }}>
              Cargando grupos...
            </div>
          ) : filteredGroups.length > 0 ? (
            <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
              {filteredGroups.map((group, index) => (
                <div
                  key={group.group_id}
                  onClick={() => handleSelectGroup(group)}
                  className="px-2.5 py-2 cursor-pointer transition-colors"
                  style={{
                    backgroundColor:
                      highlightedIndex === index ? "#F3F4F6" : "transparent",
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onMouseLeave={() => setHighlightedIndex(-1)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-xs font-medium" style={{ color: "#111827" }}>
                        {group.name}
                      </div>
                      {group.description && (
                        <div className="text-[10px]" style={{ color: "#6B7280" }}>
                          {group.description}
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px]" style={{ color: "#9CA3AF" }}>
                          {group.member_count || 0} miembros
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-sm" style={{ 
                          backgroundColor: '#EFF6FF', 
                          color: '#1D4ED8',
                          borderRadius: '2px'
                        }}>
                          {group.default_permission}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : hasLoadedGroups && allGroups.length === 0 ? (
            <div className="p-3 text-xs text-center" style={{ color: "#6B7280" }}>
              No hay grupos disponibles
            </div>
          ) : value.trim().length > 0 ? (
            <div className="p-3 text-xs text-center" style={{ color: "#6B7280" }}>
              No se encontraron grupos
            </div>
          ) : null}
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <span className="text-[10px] mt-1 block" style={{ color: "#DC2626" }}>
          {error}
        </span>
      )}
    </div>
  );
}

