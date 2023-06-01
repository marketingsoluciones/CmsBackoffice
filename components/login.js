import { Flex } from "@chakra-ui/react";
import React from "react";
import { AuthContextProvider } from "../context/AuthContext";
import Link from "next/link";

export const Login = () => {

  return (
    <Flex
      h={"100vh"}
      w={"100%"}
      pos={"fixed"}
      top={0}
      left={0}
      bg={"gray.100"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <FormLogin />
    </Flex>
  );
};

const FormLogin = () => {
  const { development } = AuthContextProvider()
  return (
    <>
      <div className="bg-red-500 w-screen fixed h-full top-0 left-0 md:grid z-30 grid-cols-5 ">
        <div className="bg-white w-full h-full col-span-3 relative flex items-center justify-center  ">
          {/* <ButtonClose onClick={() => {
            setTimeout(() => {
              router.push(!redirect ? "/" : redirect)
            }, 100);
          }} /> */}
          <div className="flex flex-col items-center gap-4 w-full px-10 md:px-0 sm:w-3/4 md:w-2/3  ">
            <Link href={`https://${development}.com/login?d=cms` ?? "/"} passHref >
              <div className="flex items-center justify-center h-[calc(100vh-300px)] w-[calc(100vw-10px)] cursor-pointer">
                <div className="md:pb-6 md:w-1/2 mx-auto ">
                  <h2 className="w-full text-2xl font-bold font-display text-center pb-3">Te invito a iniciar sesion en: </h2>

                  <samp className="flex justify-center">

                    {development === "diariocivitas" && <img alt="Logo civitas.com" src="/logoCivitas.png" className="sm:w-1/2  *object-contain hover:scale-105 transition transform duration-800 cursor-pointer" />}

                  </samp>

                  <p className="px-20 md:px-0 pt-3 md:text-sm  text-center">
                    para poder utilizar la aplicación
                  </p>
                </div>
              </div>
            </Link>          </div>
        </div>
        <div className="hidden md:block banner w-full h-full col-span-2 " />
      </div>
      <style jsx>
        {`
          .banner {
            background-image: url("/banner-login.webp");
            background-size: cover;
            background-position: top;
          }
        `}
      </style>
    </>
  );
};
