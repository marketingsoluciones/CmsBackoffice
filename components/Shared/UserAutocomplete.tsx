import React, { useState, useEffect, useRef, useCallback } from "react";

interface User {
  user_id: string;
  name: string;
  email?: string;
}

interface UserAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelectUser: (user: User) => void;
  selectedUsers: User[];
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

export default function UserAutocomplete({
  value,
  onChange,
  onSelectUser,
  selectedUsers,
  placeholder = "Buscar usuario por nombre o correo...",
  disabled = false,
  error,
}: UserAutocompleteProps) {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [hasLoadedUsers, setHasLoadedUsers] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cargar todos los usuarios al hacer focus
  const loadAllUsers = async () => {
    if (hasLoadedUsers) {
      const filtered = filterUsers(value, allUsers, selectedUsers);
      setFilteredUsers(filtered);
      return;
    }

    setIsLoading(true);
    try {
      const { fetchApiCRM } = await import("../../utils/CRMFetching");
      const { CRM_QUERIES } = await import("../../utils/crmQueries");
      
      try {
        // Cargar todos los usuarios (sin filtro de búsqueda o con búsqueda vacía)
        const response = await fetchApiCRM({
          query: CRM_QUERIES.SEARCH_CRM_USERS,
          variables: {
            search: "",
            limit: 1000, // Cargar muchos usuarios
          },
        });

        if (response?.searchCRMUsers?.users) {
          // Filtrar usuarios que ya están seleccionados
          const available = response.searchCRMUsers.users.filter(
            (user: User) => !selectedUsers.some((su) => su.user_id === user.user_id)
          );
          setAllUsers(available);
          setFilteredUsers(available);
          setHasLoadedUsers(true);
        } else {
          setAllUsers([]);
          setFilteredUsers([]);
        }
      } catch (error: any) {
        const errorMessage = error?.message || "Error desconocido";
        if (errorMessage.includes("Cannot query field") || errorMessage.includes("searchCRMUsers")) {
          console.error("❌ ERROR: La query 'searchCRMUsers' no está disponible en el backend.");
          console.error("📋 El backend necesita reiniciar el servidor después de implementar la query.");
          console.error("🔍 Error completo:", error);
          console.error("💡 Verificar: docs/troubleshooting-search-crm-users.md");
        } else {
          console.warn("⚠️ Error al buscar usuarios:", error);
        }
        setAllUsers([]);
        setFilteredUsers([]);
      }
    } catch (error) {
      console.error("Error loading users:", error);
      setAllUsers([]);
      setFilteredUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar usuarios localmente según el texto escrito
  const filterUsers = useCallback((searchTerm: string, users: User[], selected: User[]) => {
    if (!searchTerm || searchTerm.trim().length === 0) {
      // Si no hay texto, mostrar todos los usuarios disponibles
      const available = users.filter(
        (user) => !selected.some((su) => su.user_id === user.user_id)
      );
      return available;
    }

    const term = searchTerm.toLowerCase().trim();
    const filtered = users.filter((user) => {
      const nameMatch = user.name?.toLowerCase().includes(term);
      const emailMatch = user.email?.toLowerCase().includes(term);
      const isNotSelected = !selected.some((su) => su.user_id === user.user_id);
      return (nameMatch || emailMatch) && isNotSelected;
    });

    return filtered;
  }, []);

  // Filtrar cuando cambia el valor del input o los usuarios seleccionados
  useEffect(() => {
    if (hasLoadedUsers && allUsers.length > 0) {
      const filtered = filterUsers(value, allUsers, selectedUsers);
      setFilteredUsers(filtered);
    }
  }, [value, selectedUsers, allUsers, hasLoadedUsers, filterUsers]);

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

  const handleSelectUser = (user: User) => {
    onSelectUser(user);
    onChange("");
    setHighlightedIndex(-1);
    // Mantener el dropdown abierto para seleccionar más usuarios
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filteredUsers.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredUsers.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredUsers.length) {
          handleSelectUser(filteredUsers[highlightedIndex]);
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
    loadAllUsers();
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
              Cargando usuarios...
            </div>
          ) : filteredUsers.length > 0 ? (
            <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
              {filteredUsers.map((user, index) => (
                <div
                  key={user.user_id}
                  onClick={() => handleSelectUser(user)}
                  className="px-2.5 py-2 cursor-pointer transition-colors"
                  style={{
                    backgroundColor:
                      highlightedIndex === index ? "#F3F4F6" : "transparent",
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onMouseLeave={() => setHighlightedIndex(-1)}
                >
                  <div className="text-xs font-medium" style={{ color: "#111827" }}>
                    {user.name}
                  </div>
                  {user.email && (
                    <div className="text-[10px]" style={{ color: "#6B7280" }}>
                      {user.email}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : hasLoadedUsers && allUsers.length === 0 ? (
            <div className="p-3 text-xs text-center" style={{ color: "#6B7280" }}>
              No hay usuarios disponibles
            </div>
          ) : value.trim().length > 0 ? (
            <div className="p-3 text-xs text-center" style={{ color: "#6B7280" }}>
              No se encontraron usuarios
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

