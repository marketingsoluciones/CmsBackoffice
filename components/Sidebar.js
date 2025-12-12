import { Text, Flex, Box, Menu, MenuItem, MenuGroup, MenuButton, MenuList } from "@chakra-ui/react";
import { BodyStaticAPP } from "../utils/schemas";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import { Tooltip } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowLeft, IconFolderOpenOutline } from "./../components/Icons/index";
import { hasRole } from "../utils/auth";
import { useState, useEffect } from "react";
import { Modal } from "./modals/Alert";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

export const Sidebar = ({ state, setState }) => {
  const { user, development, setDevelopment, dispatch, changedForm, setChangedForm } = AuthContextProvider()
  const { asPath } = useRouter()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [handle, setHandle] = useState()
  const [expandedGroups, setExpandedGroups] = useState(new Set(['Mis Empresas', 'Módulos', 'Chat en línea', 'Formacion Enterprice']))
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Expandir automáticamente los grupos que contienen el item activo
  useEffect(() => {
    if (!user || !development) return;
    
    setExpandedGroups(prev => {
      const newExpanded = new Set(prev);
      BodyStaticAPP.forEach((group) => {
        if (group.children && group.title) {
          const hasActiveChild = group.children.some(child => {
            if (!hasRole(development, user, child.roles) || child.hidden) return false;
            const isActive = child.route === asPath.split("/")[1] || asPath === "/" + child.route || asPath.startsWith("/" + child.route + "/");
            return isActive;
          });
          if (hasActiveChild) {
            newExpanded.add(group.title);
          }
        }
      });
      return newExpanded;
    });
  }, [asPath, development, user])

  const toggleGroup = (groupName) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName);
    } else {
      newExpanded.add(groupName);
    }
    setExpandedGroups(newExpanded);
  };

  const isGroupActive = (group) => {
    return group.children?.some(child => {
      if (!hasRole(development, user, child.roles) || child.hidden) return false;
      return child.route === asPath.split("/")[1] || asPath === "/" + child.route || asPath.startsWith("/" + child.route + "/");
    });
  };

  const isItemActive = (item) => {
    return item.route === asPath.split("/")[1] || asPath === "/" + item.route || asPath.startsWith("/" + item.route + "/");
  };

  return (
    <div className={clsx(
      "flex h-full w-full flex-col bg-white shadow-sm border-r border-gray-200",
      !state && "ml-[-15rem] md:ml-[-9.5rem]"
    )}
    style={{
      width: state ? '220px' : 'auto',
      transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {showModal && <Modal setShowModal={setShowModal} showModal={showModal} title={"Al salir perdera los cambios"} handle={handle} />}
      
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-gray-200">
        {state && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <IconFolderOpenOutline className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">CMS Portal</h1>
              <p className="text-xs text-gray-500">Sistema Completo</p>
            </div>
          </div>
        )}
        
        {!state && (
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
            <IconFolderOpenOutline className="w-5 h-5 text-white" />
          </div>
        )}
        
        {state && (
          <div className="flex items-center gap-2">
            {isMobile && (
              <button
                onClick={() => setState(!state)}
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <Menu autoSelect={false}>
              <MenuButton className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-500">{development?.toUpperCase()}</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </div>
              </MenuButton>
              <MenuList p="0" fontSize="sm">
                {user?.authDevelopments?.map((item, idx) => (
                  <MenuItem 
                    key={idx} 
                    style={item.title === development ? { backgroundColor: '#F3F4F6' } : { backgroundColor: '' }} 
                    color="gray.500"
                    onClick={() => {
                      if (changedForm) {
                        setHandle(() => () => {
                          router.push("/").then(() => {
                            setDevelopment(item.title)
                            setChangedForm(false)
                          })
                        })
                        setShowModal(true)
                      } else {
                        router.push("/").then(() => {
                          setDevelopment(item.title)
                        })
                      }
                    }}
                  >
                    {`${item.title}.com`}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            {!isMobile && (
              <button
                onClick={() => setState(!state)}
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {!state && (
          <Menu autoSelect={false}>
            <MenuButton className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <IconFolderOpenOutline className="w-5 h-5 text-gray-600" />
            </MenuButton>
            <MenuList p="0" fontSize="sm" ml="8">
              {user?.authDevelopments?.map((item, idx) => (
                <MenuItem 
                  key={idx} 
                  style={item.title === development ? { backgroundColor: '#F3F3F3' } : { backgroundColor: '' }} 
                  color="gray.500" 
                  onClick={() => setDevelopment(item.title)}
                >
                  {`${item.title}.com`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {BodyStaticAPP.map((group, groupIdx) => {
          if (!hasRole(development, user, group.roles)) return null;

          // Si el grupo tiene children, renderizar como grupo expandible
          if (group.children && group.children.length > 0) {
            const isGroupOpen = expandedGroups.has(group.title || `group-${groupIdx}`);
            const isActive = isGroupActive(group);

            if (!state) {
              // Cuando está colapsado, mostrar todos los items visibles como iconos
              const visibleChildren = group.children.filter(child => 
                hasRole(development, user, child.roles) && !child.hidden
              );
              
              if (visibleChildren.length === 0) return null;

              return (
                <div key={groupIdx} className="space-y-1">
                  {visibleChildren.map((child, childIdx) => {
                    const childIsActive = isItemActive(child);
                    return (
                      <div key={childIdx} className="relative">
                        <Tooltip label={child.title} ml="14" top="-10">
                          <button
                            className={clsx(
                              childIsActive
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50',
                              'group flex items-center justify-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                              'relative'
                            )}
                            title={child.title}
                            onClick={() => {
                              if (changedForm) {
                                setHandle(() => () => {
                                  dispatch({ type: "VIEW", payload: {} });
                                  router.push("/" + child.route)
                                  setChangedForm(false)
                                })
                                setShowModal(true)
                              } else {
                                dispatch({ type: "VIEW", payload: {} });
                                router.push("/" + child.route)
                              }
                            }}
                          >
                            <div className="h-5 w-5 flex items-center justify-center">
                              {child.icon}
                            </div>
                          </button>
                        </Tooltip>
                      </div>
                    );
                  })}
                </div>
              );
            }

            return (
              <div key={groupIdx}>
                {group.title ? (
                  <>
                    <button
                      onClick={() => toggleGroup(group.title || `group-${groupIdx}`)}
                      className={clsx(
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50',
                        'group flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 justify-between'
                      )}
                    >
                      <div className="flex items-center">
                        <span className="truncate text-xs font-semibold uppercase tracking-wider text-gray-500">
                          {group.title}
                        </span>
                      </div>
                      <ChevronDownIcon
                        className={clsx(
                          'h-4 w-4 text-gray-400 transition-transform duration-200',
                          isGroupOpen ? 'transform rotate-180' : ''
                        )}
                      />
                    </button>
                    
                    {/* Subitems */}
                    {isGroupOpen && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                        {group.children.map((child, childIdx) => {
                          if (!hasRole(development, user, child.roles) || child.hidden) return null;
                          
                          const childIsActive = isItemActive(child);
                          
                          return (
                            <button
                              key={childIdx}
                              onClick={() => {
                                if (changedForm) {
                                  setHandle(() => () => {
                                    isMobile ? setState(!state) : null
                                    dispatch({ type: "VIEW", payload: {} });
                                    router.push("/" + child.route)
                                    setChangedForm(false)
                                  })
                                  setShowModal(true)
                                } else {
                                  isMobile ? setState(!state) : null
                                  dispatch({ type: "VIEW", payload: {} });
                                  router.push("/" + child.route)
                                }
                              }}
                              className={clsx(
                                childIsActive
                                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                  : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50',
                                'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer w-full'
                              )}
                            >
                              <div className="h-4 w-4 shrink-0 mr-2 flex items-center justify-center">
                                {child.icon}
                              </div>
                              <span className="truncate">{child.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  // Si no tiene título, mostrar los items directamente sin expandir/colapsar
                  <div className="space-y-1">
                    {group.children.map((child, childIdx) => {
                      if (!hasRole(development, user, child.roles) || child.hidden) return null;
                      
                      const childIsActive = isItemActive(child);
                      
                      return (
                        <button
                          key={childIdx}
                          onClick={() => {
                            if (changedForm) {
                              setHandle(() => () => {
                                isMobile ? setState(!state) : null
                                dispatch({ type: "VIEW", payload: {} });
                                router.push("/" + child.route)
                                setChangedForm(false)
                              })
                              setShowModal(true)
                            } else {
                              isMobile ? setState(!state) : null
                              dispatch({ type: "VIEW", payload: {} });
                              router.push("/" + child.route)
                            }
                          }}
                          className={clsx(
                            childIsActive
                              ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                              : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50',
                            'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer w-full'
                          )}
                        >
                          <div className="h-4 w-4 shrink-0 mr-2 flex items-center justify-center">
                            {child.icon}
                          </div>
                          <span className="truncate">{child.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // Si no tiene children, no renderizar nada (no debería pasar según la estructura)
          return null;
        })}
      </nav>
      
      {/* User Profile */}
      {state && user && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center rounded-lg bg-gray-50 p-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-white">
                {user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.email?.split('@')[0] || 'Usuario'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || ''}
              </p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

