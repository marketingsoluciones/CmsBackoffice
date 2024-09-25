import { Box, Flex } from "@chakra-ui/react";
import { StrictMode, useState } from "react";
import dynamic from 'next/dynamic'
import { useEffect } from "react";
import ClickAwayListener from "react-click-away-listener";
import { ToastProvider } from "../context/ToastContext";
import { IframeLayout } from "./IframeLayout";
import Head from "next/head";
const AuthProvider = dynamic(() => import('../context/AuthContext').then(mod => mod.AuthProvider))
const SocketProvider = dynamic(() => import('../context/SocketContext').then(mod => mod.SocketProvider))
const Sidebar = dynamic(() => import('../components/Sidebar').then(mod => mod.Sidebar))
const Navigation = dynamic(() => import('../components/Navigation').then(mod => mod.Navigation))
const EventsGroupProvider = dynamic(() => import('../context/EventsGroupContext').then(mod => mod.EventsGroupProvider))
const EventProvider = dynamic(() => import('../context/EventContext').then(mod => mod.EventProvider))



export const DefaultLayout = ({ children }) => {
  const [show, setShow] = useState(false);
  const [valir, setValir] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setValir(true)
      setShow(screen?.width < 640 ? false : true)
    }, 500);
  }, [])

  return (
    <>
      <Head>
        {/* <title>Bodas de hoy - Organizador de Bodas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="¡Bodas de Hoy Organizador! Organiza tu boda en un sólo click., user-scalable=no, width=device-width, initial-scale=1" /> */}
      </Head>
      <AuthProvider>
        <SocketProvider>
          <EventsGroupProvider>
            <EventProvider>
              <ToastProvider>
                {valir && <Flex h={"100vh"} w={"100%"} overflow={"hidden"} position={"relative"} >
                  {screen.width < 640
                    ? <div className="absolute z-[100]">
                      <Sidebar state={show} setState={setShow} />
                    </div>

                    : <div className=" ">
                      <Sidebar state={show} />
                    </div>
                  }
                  <Flex flexDir={"column"} w={show ? "calc(100%)" : "100%"} onClick={() => screen.width < 640 ? show ? setShow(!show) : null : null} >
                    <Navigation set={setShow} state={show} />
                    <Box id="rootElementMain" as={"main"} className="bg-bg w-full h-[calc(100%-56px)] flex">
                      {children}
                      <IframeLayout />
                    </Box>
                  </Flex>
                </Flex>}
              </ToastProvider>
            </EventProvider>
          </EventsGroupProvider>
        </SocketProvider>
      </AuthProvider>
    </>
  );
};

