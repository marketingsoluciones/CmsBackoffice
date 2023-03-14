import {
  Avatar,
  Text,
  Flex,
  Heading,
  Box,
  Divider,
  Menu,
  MenuItem,
  MenuGroup,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { BodyStaticAPP, CivitasStaticAPP } from "../utils/schemas";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import { Tooltip } from "@chakra-ui/react";
import { ArrowDownIcon } from "./../components/Icons/index";

export const Sidebar = ({ state }) => {
  const { user, development, setDevelopment } = AuthContextProvider()
  const { asPath } = useRouter()
  
  const Options = [
    {
      title: "Bodasdehoy.com",
      value: "bodasdehoy"
    },
    {
      title: "DiarioCivitas.com",
      value: "diariocivitas"
    },
    {
      title: "AlquilaTuMaquinaria.com",
      value: "alquilatumaquinaria"
    },

  ]

  return (
    <Flex
      pos={"relative"}
      w={"14rem"}
      h={"100vh"}
      shadow={"md"}
      bg={"white"}
      justifyContent={"start"}
      flexDir={"column"}
      marginLeft={`${state ? "" : "-9.5rem"}`}
      transitionProperty={"all"}
      transitionTimingFunction={"cubic-bezier(0.4, 0, 0.2, 1)"}
      transitionDuration={"150ms"}
    >

      <Flex alignItems={"center"} gap={"0.5rem"} p={"0.5rem"}>
        <Tooltip label={`${state ? "" : development}`} ml="14" top="-10">
          <div className={`flex  ${state ? "justify-star" : " justify-end "} items-center gap-2 w-full bg-gray-100 py-2 px-2 rounded-xl`}>
            <div className={`${state ? "hidden" : "block"}`} >
              <Menu autoSelect={false}  >
                <MenuButton pr={"0.3rem"}>
                  <Avatar size={"sm"} />
                </MenuButton>
                <MenuList p={"0"} fontSize={"sm"} ml={"8"}>
                  {Options.map((item, idx) => (
                    <div key={idx}>
                      <MenuItem style={item.value === development ? { backgroundColor: '#F3F3F3' } : { backgroundColor: '' }} color={"gray.500"} onClick={() => setDevelopment(item.value)}>{item.title}</MenuItem>
                    </div>
                  ))}
                </MenuList>
              </Menu>
            </div>

            <div className={`flex items-center justify-star w-full ${state ? "block" : "hidden"}`}>
              <Avatar size={"sm"} mr={"0.4rem"} />
              <div className={`w-full`}>
                <Text pl={"0.1rem"} className={` text-tituloPrimario`}>{"Consorcio J.C"}</Text>
                <div className="flex">
                  <Menu autoSelect={false} foc >
                    <MenuButton flex={"2"} w={"8rem"}>
                      <div className="flex justify-between w-full">
                        <Text noOfLines={1} textAlign={"start"} ml={"2px"} >{development}</Text>
                        <ArrowDownIcon h={2} w={3} />
                      </div>
                    </MenuButton>
                    <MenuList p={"0"} fontSize={"sm"} justifyItems={"start"}>
                      {Options.map((item, idx) => (

                        <MenuItem key={idx} style={item.value === development ? { backgroundColor: '#F3F4F6' } : { backgroundColor: '' }} color={"gray.500"} onClick={() => setDevelopment(item.value)}>{item.title}</MenuItem>

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
          if (development === "bodasdehoy") {
            return (
              <>
                {
                  BodyStaticAPP.map((item, idx) => {
                  
                    return(
                   
                    <Box key={idx} >
                      <Menu autoSelect={false}>
                        <MenuGroup key={idx} title={item.title} fontSize={"sm"} className={` ${state ? "block" : "hidden"} text-tituloPrimario`}>
                          {item.children.map((item, idx) => {
                            return (

                              <Link key={idx} href={item.route}>
                                <MenuItem
                                  _hover={{ bg: "#F3F3F3" }}
                                  key={idx}
                                  color={"#637381"}
                                  padding={`${state ? "2" : ""}`}
                                  marginLeft={"2"}
                                  w={"95%"}
                                  fontSize={"sm"}
                                  className={` flex  ${state ? "justify-star" : "justify-end"} items-center w-full rounded-md `}
                                  style={"/" + item.route === asPath ? { backgroundColor: '#F3F3F3' } : { backgroundColor: '' } && item.route === asPath ? { backgroundColor: '#F3F3F3' } : { backgroundColor: '' }}

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
                              </Link>
                            )
                          })}
                        </MenuGroup>
                      </Menu>
                    </Box>
                  )})
                }
              </>
            )
          } else if (development === "diariocivitas") {
            return (
              <>
                {
                  CivitasStaticAPP.map((item, idx) => (
                    <Box key={idx}  >
                      <Menu autoSelect={false}>
                        <MenuGroup key={idx} title={item.title} fontSize={"sm"} className={` ${state ? "block" : "hidden"} text-tituloPrimario`}>
                          {item.children.map((item, idx) => (
                            <Link key={idx} href={item.route}>
                              <MenuItem
                                _hover={{ bg: "#F3F3F3" }}
                                key={idx}
                                color={"#637381"}
                                padding={`${state ? "2" : ""}`}
                                marginLeft={"2"}
                                w={"95%"}
                                fontSize={"sm"}
                                className={` flex  ${state ? "justify-star" : "justify-end"} items-center w-full rounded-md `}
                                style={"/" + item.route === asPath ? { backgroundColor: '#F3F3F3' } : { backgroundColor: '' }}
                              >
                                <Tooltip label={`${state ? "" : item.title}`} ml="14" top="-10">
                                  <div className={`flex justify-estar ${state ? "" : `relative`}`} data-tip={`${item.title}`}>
                                    <div className={` pr-2 `}>{item.icon}</div>
                                    <div className={`pt-0.5 ${state ? "block" : `hidden`}`}>
                                      {item.title}
                                    </div>
                                  </div>
                                </Tooltip>

                              </MenuItem>
                            </Link>
                          ))}
                        </MenuGroup>
                      </Menu>
                    </Box>
                  ))
                }
              </>
            )
          } else if (development === "alquilatumaquinaria") {
            return (
              <>estoy en atm</>
            )
          }
        })()}

      </Flex>

    </Flex>
  );
};

