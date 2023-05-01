import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import dynamic from 'next/dynamic'
import { useEffect } from "react";
import ClickAwayListener from "react-click-away-listener";
const AuthProvider = dynamic(() => import('../context/AuthContext').then(mod => mod.AuthProvider))
const Sidebar = dynamic(() => import('../components/Sidebar').then(mod => mod.Sidebar))
const Navigation = dynamic(() => import('../components/Navigation').then(mod => mod.Navigation))


export const DefaultLayout = ({ children }) => {
  const [show, setShow] = useState(true);
  const [valir, setValir] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setValir(true)
    }, 500);
  }, [])

  return (
    <AuthProvider>
      {valir && <Flex h={"100vh"} w={"100%"} overflow={"hidden"} position={"relative"} >

        {(() => {
          if (screen.width < 640) {
            return (<>
              <div onClick={() => setShow(!show)} className="absolute z-[100]">
                <Sidebar state={show} />
              </div>
            </>)
          } else {
            return (<>
              <div className=" ">
                <Sidebar state={show} />
              </div>
            </>)
          }
        })()}

        <Flex flexDir={"column"} w={show ? "calc(100%)" : "100%"} onClick={() => show ? setShow(!show) : null} >
          <Navigation set={setShow} state={show} />
          <Box as={"main"} p={"0.5rem"} /* bg={"gray.100"} */ h={"full"} w={"100%"} className="bg-bg">
            {children}
          </Box>
        </Flex>
      </Flex>}
    </AuthProvider>
  );
};

