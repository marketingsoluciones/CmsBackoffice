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
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { BodyStaticAPP, CivitasStaticAPP } from "../utils/schemas";
import { AuthContextProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import { Tooltip } from "@chakra-ui/react";

export const Sidebar = ({ state }) => {
  const { user,development,setDevelopment } = AuthContextProvider()
  const { asPath } = useRouter()

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
        <div className={`flex  ${state ? "justify-star" : " justify-end "} items-center gap-2 w-full bg-gray-100 py-2 px-2 rounded-xl`}>
          <Avatar size={"sm"} />
          <div>
            <Text className={`${state ? "block" : "hidden"} ml-1 text-tituloPrimario`}>{user?.displayName ? user?.displayName : "Recarga Expres"}</Text>
            <select value={development} onChange={(e) => setDevelopment(e.target.value)} className={` ${state ? "block" : "hidden"} w-36 rounded py-1 truncate bg-transparent focus:outline-none cursor-pointer `}>
              <option value={"bodasdehoy"}>Bodasdehoy.com</option>
              <option value={"diario"}>DiarioCivitas.com</option>
              <option value={"atm"}>AlquilaTuMaquinaria.com</option>
            </select>

            {/* <Text className={`${state ? "block" : "hidden"} text-tituloSecundario text-sm`}>Admin</Text> */}
          </div>
        </div>
      </Flex>

      <Flex flexDir={"column"} className="overflow-y-auto overflow-x-hidden">
        {(() => {
          if (development === "bodasdehoy") {
            return (
              <>
                {
                  BodyStaticAPP.map((item, idx) => (
                    <Box key={idx} paddingBlock={"0.5rem"} paddingTop="">
                      <Menu>
                        <MenuGroup key={idx} title={item.title} fontSize={"sm"} className={` ${state ? "block" : "hidden"} text-tituloPrimario`}>
                          {item.children.map((item, idx) => (
                            <Link key={idx} href={item.route}>
                              <MenuItem
                                key={idx}
                                color={"#637381"}
                                padding={`${state ? "2" : ""}`}
                                marginLeft={"2"}
                                w={"95%"}
                                fontSize={"sm"}
                                className={` flex  ${state ? "justify-star" : "justify-end"} items-center w-full rounded-md `}
                              >
                                <Tooltip label={`${state ? "" : item.title}`} ml="14" top="-10">

                                  <div className={`flex justify-estar ${state ? "" : `relative`}`}
                                    data-tip={`${item.title}`}
                                  >
                                    <div className={` pr-2 `}>{item.icon}</div>
                                    <div className={
                                      `pt-0.5                         
                              ${state ? "block" : `hidden`}
                              `}
                                    >
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
          } else if (development === "diario") {
            return (
              <>
                {
                  CivitasStaticAPP.map((item, idx) => (
                    <Box key={idx} paddingBlock={"0.5rem"} paddingTop="">
                      <Menu>
                        <MenuGroup key={idx} title={item.title} fontSize={"sm"} className={` ${state ? "block" : "hidden"} text-tituloPrimario`}>
                          {item.children.map((item, idx) => (
                            <Link key={idx} href={item.route}>
                              <MenuItem
                                key={idx}
                                color={"#637381"}
                                padding={`${state ? "2" : ""}`}
                                marginLeft={"2"}
                                w={"95%"}
                                fontSize={"sm"}
                                className={` flex  ${state ? "justify-star" : "justify-end"} items-center w-full rounded-md `}
                              >
                                <Tooltip label={`${state ? "" : item.title}`} ml="14" top="-10">

                                  <div className={`flex justify-estar ${state ? "" : `relative`}`}
                                    data-tip={`${item.title}`}
                                  >
                                    <div className={` pr-2 `}>{item.icon}</div>
                                    <div className={
                                      `pt-0.5                         
                              ${state ? "block" : `hidden`}
                              `}
                                    >
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
          }else if (development === "atm"){
            return(
              <>estoy en atm</>
            )
          }
        })()}

      </Flex>

    </Flex>
  );
};

