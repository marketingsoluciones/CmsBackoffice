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
      w={"14rem"}
      h={"100vh"}
      shadow={"md"}
      bg={"white"}
      justifyContent={"start"}
      flexDir={"column"}
      /* marginLeft={`${state ? "" : "-9.5rem"}`} */
      transitionProperty={"all"}
      transitionTimingFunction={"cubic-bezier(0.4, 0, 0.2, 1)"}
      transitionDuration={"150ms"}
      className={`${state ? "" : "ml-[-15rem] md:ml-[-9.5rem]"}`}
    >
      {showModal && <Modal setShowModal={setShowModal} showModal={showModal} title={"Al salir perdera los cambios"} handle={handle} />}
      <Flex alignItems={"center"} gap={"0.5rem"} p={"0.5rem"}>
        <Tooltip label={`${state ? "" : development}`} ml="14" top="-10">
          <div className={`flex  ${state ? "justify-star" : " justify-end "} items-center gap-2 w-full bg-gray-100 py-2 px-2 rounded-xl`}>

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
                          <MenuGroup key={idx} title={item.title} fontSize={"sm"} className={` ${state ? "block" : "hidden"} text-tituloPrimario`}>
                            {item.children.map((item, idx) => {
                              if (hasRole(development, user, item.roles)) {
                                if (item.title != null) {
                                  return (
                                    <MenuItem
                                      _hover={{ bg: "#F3F3F3" }}
                                      key={idx}
                                      color={"#637381"}
                                      padding={`${state ? "2" : ""}`}
                                      marginLeft={"2"}
                                      w={"95%"}
                                      fontSize={"sm"}
                                      className={` flex  ${state ? "justify-star" : "justify-end"} items-center w-full rounded-md `}
                                      style={item.route === asPath.split("/")[1]
                                        ? { backgroundColor: '#F3F3F3', color: "#FF5887" }
                                        : { backgroundColor: '' } && item.route === asPath
                                          ? { backgroundColor: '#F3F3F3' }
                                          : { backgroundColor: '' }}
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
                                        <div className={`flex justify-estar items-center  ${state ? "" : `relative`}`} data-tip={`${item.title}`}>
                                          <div className={` pr-2 `}>
                                            {item.icon}
                                          </div>
                                          <div className={`${state ? "block " : "hidden"}`}>
                                            {item.title}
                                          </div>
                                        </div>
                                      </Tooltip>
                                    </MenuItem>
                                  )
                                }
                              }
                            })}
                          </MenuGroup>
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

