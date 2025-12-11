import { Text, Flex, Box, Menu, MenuItem, MenuGroup, MenuButton, MenuList } from "@chakra-ui/react";
import { BodyStaticAPP } from "../utils/schemas";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import { Tooltip } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowLeft, IconFolderOpenOutline } from "./../components/Icons/index";
import { hasRole } from "../utils/auth";
import { useState } from "react";
import { Modal } from "./modals/Alert";

export const Sidebar = ({ state, setState }) => {
  const { user, development, setDevelopment, dispatch, changedForm, setChangedForm } = AuthContextProvider()
  const { asPath } = useRouter()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [handle, setHandle] = useState()

  return (
    <Flex
      pos={"relative"}
      w={"220px"}
      h={"100vh"}
      shadow={"sm"}
      bg={"#F9FAFB"}
      justifyContent={"start"}
      flexDir={"column"}
      /* marginLeft={`${state ? "" : "-9.5rem"}`} */
      transitionProperty={"all"}
      transitionTimingFunction={"cubic-bezier(0.4, 0, 0.2, 1)"}
      transitionDuration={"150ms"}
      className={`${state ? "" : "ml-[-15rem] md:ml-[-9.5rem]"}`}
      style={{ borderRight: '1px solid #E5E7EB' }}
    >
      {showModal && <Modal setShowModal={setShowModal} showModal={showModal} title={"Al salir perdera los cambios"} handle={handle} />}
      <Flex alignItems={"center"} gap={"0.5rem"} p={"12px"} style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#FFFFFF', borderRadius: '0' }}>
        <Tooltip label={`${state ? "" : development}`} ml="14" top="-10">
          <div className={`flex  ${state ? "justify-star" : " justify-end "} items-center gap-2 w-full py-2 px-2`}>

            <div className={`${state ? "hidden" : "block"}`} >
              <Menu autoSelect={false}  >
                <MenuButton pr={"0.3rem"}>
                  {<IconFolderOpenOutline className="w-8 h-8 text-gray-600" />}
                </MenuButton>
                <MenuList p={"0"} fontSize={"sm"} ml={"8"}>
                  {user?.authDevelopments?.map((item, idx) => (
                    <div key={idx}>
                      <MenuItem style={item.title === development ? { backgroundColor: '#F3F3F3' } : { backgroundColor: '' }} color={"gray.500"} onClick={() => setDevelopment(item.title)}>{`${item.title}.com`}</MenuItem>
                    </div>
                  ))}
                </MenuList>
              </Menu>
            </div>

            <div className={`flex items-center justify-star w-full ${state ? "block" : "hidden"}`}>
              {screen.width < 640 ?
                <ArrowLeft className="w-8 h-8 mr-2 text-gray-600" onClick={() => setState(!state)} />
                : <IconFolderOpenOutline className="w-8 h-8 mr-2 text-gray-600" />}
              <div className={`w-full`}>
                <div className={`flex gap-4 `}>
                  <Text pl={"0.1rem"} className={`text-gray-500 font-semibold`}>{"Portal:"}</Text>
                </div>
                <div className="flex">
                  <Menu autoSelect={false} foc >
                    <MenuButton flex={"2"} w={"8rem"}>
                      <div className="flex justify-between w-full">
                        <Text noOfLines={1} textAlign={"start"} ml={"2px"} className={"font-semibold text-gray-500"} >{development?.toUpperCase()}</Text>
                        <ArrowDownIcon h={2} w={3} />
                      </div>
                    </MenuButton>
                    <MenuList p={"0"} fontSize={"sm"} justifyItems={"start"}>
                      {user?.authDevelopments?.map((item, idx) => (
                        <MenuItem key={idx} style={item.title === development ? { backgroundColor: '#F3F4F6' } : { backgroundColor: '' }} color={"gray.500"}
                          onClick={() => {
                            if (changedForm) {
                              setHandle(() => () => {
                                router.push("/").then(
                                  () => {
                                    setDevelopment(item.title)
                                    setChangedForm(false)
                                  }
                                )
                              }
                              )
                              setShowModal(true)
                            } else {
                              router.push("/").then(
                                () => {
                                  setDevelopment(item.title)
                                }
                              )
                            }
                          }}>{`${item.title}.com`}</MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </div>
              </div>

            </div>
          </div>
        </Tooltip>
      </Flex>

      <Flex flexDir={"column"} className="overflow-y-auto overflow-x-hidden">
        {(() => {
          return (
            <>
              {
                BodyStaticAPP.map((item, idx) => {
                  if (hasRole(development, user, item.roles)) {
                    return (
                      <Box key={idx} >
                        <Menu autoSelect={false}>
                          {item.title && (
                            <div className={`${state ? "block" : "hidden"} px-3 py-2.5`}>
                              <Text 
                                fontSize={"10px"} 
                                fontWeight={"600"} 
                                letterSpacing={"0.05em"}
                                textTransform={"uppercase"}
                                color={"#6B7280"}
                                className="text-tituloPrimario"
                                style={{ marginBottom: '4px' }}
                              >
                                {item.title}
                              </Text>
                            </div>
                          )}
                          {item.children.map((item, idx) => {
                            if (hasRole(development, user, item.roles)) {
                              if (!item.hidden) {
                                const isActive = item.route === asPath.split("/")[1] || item.route === asPath;
                                return (
                                  <MenuItem
                                    key={idx}
                                    padding={`${state ? "8px 12px" : "8px"}`}
                                    marginLeft={"0"}
                                    marginRight={"0"}
                                    w={"100%"}
                                    fontSize={"14px"}
                                    className={`flex ${state ? "justify-start" : "justify-end"} items-center w-full`}
                                    style={{
                                      backgroundColor: isActive ? '#3B82F6' : 'transparent',
                                      color: isActive ? '#FFFFFF' : '#374151',
                                      borderRadius: '2px',
                                      margin: '2px 8px',
                                      minHeight: '36px',
                                      transition: 'all 0.15s ease',
                                      paddingLeft: state ? '12px' : '8px',
                                      paddingRight: state ? '12px' : '8px'
                                    }}
                                    _hover={{ 
                                      bg: isActive ? '#2563EB' : '#F3F4F6',
                                      color: isActive ? '#FFFFFF' : '#111827'
                                    }}
                                    onClick={() => {
                                      if (changedForm) {
                                        setHandle(() => () => {
                                          screen.width < 640 ? setState(!state) : null
                                          dispatch({ type: "VIEW", payload: {} });
                                          router.push("/" + item.route)
                                          setChangedForm(false)
                                        }
                                        )
                                        setShowModal(true)
                                      } else {
                                        screen.width < 640 ? setState(!state) : null
                                        dispatch({ type: "VIEW", payload: {} });
                                        router.push("/" + item.route)
                                      }
                                    }}
                                  >
                                    <Tooltip label={`${state ? "" : item.title}`} ml="14" top="-10">
                                      <div className={`flex justify-start items-center gap-2 ${state ? "" : `relative`}`} data-tip={`${item.title}`}>
                                        <div style={{ 
                                          display: 'flex', 
                                          alignItems: 'center', 
                                          justifyContent: 'center',
                                          width: '20px',
                                          height: '20px',
                                          flexShrink: 0
                                        }}>
                                          {item.icon}
                                        </div>
                                        <div className={`${state ? "block " : "hidden"} font-medium`} style={{ fontSize: '14px' }}>
                                          {item.title}
                                        </div>
                                      </div>
                                    </Tooltip>
                                  </MenuItem>
                                )
                              }
                            }
                          })}
                        </Menu>
                      </Box>
                    )
                  }
                })
              }
            </>
          )
        })()}
      </Flex>
    </Flex>
  );
};

