import { SimpleGrid, Stat, StatLabel, StatNumber } from "@chakra-ui/react"
import { PagesWithAuth } from "../HOC/PageWithAuth"
import { AuthContextProvider } from "../context/AuthContext";
import { Login } from "../components/login";
import { useEffect } from "react";

function HomePage() {
  const { user, verificandoCookie } = AuthContextProvider();
  if (verificandoCookie) {

    if (!user) {
      return <Login />
    }
    return (
      <>
        <SimpleGrid spacing={5} columns={{sm:1, md:3}} w={"100%"} >
          <Stat border={"1px solid"} borderColor={"gray.300"} p={"1rem"} rounded={"xl"} w={"100%"} bg={"white"}>
            <StatLabel className="" >Empresas</StatLabel>
            <StatNumber fontSize={"2xl"}>102</StatNumber>
          </Stat>
          <Stat border={"1px solid"} borderColor={"gray.300"} p={"1rem"} rounded={"xl"} w={"100%"} bg={"white"}>
            <StatLabel >Categorias de empresas</StatLabel>
            <StatNumber fontSize={"2xl"}>75</StatNumber>
          </Stat>
          <Stat border={"1px solid"} borderColor={"gray.300"} p={"1rem"} rounded={"xl"} w={"100%"} bg={"white"}>
            <StatLabel>Articulos Blog</StatLabel>
            <StatNumber fontSize={"2xl"}>68</StatNumber>
          </Stat>
          <Stat border={"1px solid"} borderColor={"gray.300"} p={"1rem"} rounded={"xl"} w={{sm:"50%", md:"100%"}} bg={"white"}>
            <StatLabel>Categorias Blog</StatLabel>
            <StatNumber fontSize={"2xl"}>12</StatNumber>
          </Stat>
          <Stat border={"1px solid"} borderColor={"gray.300"} p={"1rem"} rounded={"xl"} w={"100%"} bg={"white"}>
            <StatLabel>Usuarios Registrados</StatLabel>
            <StatNumber fontSize={"2xl"}>1002</StatNumber>
          </Stat>
          <Stat border={"1px solid"} borderColor={"gray.300"} p={"1rem"} rounded={"xl"} w={"100%"} bg={"white"}>
            <StatLabel>Administradores</StatLabel>
            <StatNumber fontSize={"2xl"}>100</StatNumber>
          </Stat>

        </SimpleGrid>

      </>
    )
  }
  return <></>
}
export default HomePage