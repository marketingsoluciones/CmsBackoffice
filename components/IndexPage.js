import { AuthContextProvider } from "../context/AuthContext"
import { SimpleGrid, Stat, StatLabel, StatNumber } from "@chakra-ui/react"
/* import { Mainet } from "./IndexPageComponents/PruebaIA" */


export const IndexPage = () => {
    const { development, user, domain } = AuthContextProvider()
    console.log(development)

    return (
        <>
            {(() => {
                if (development == "bodasdehoy") {
                    return (
                        <>
                            <div className=" w-full px-5 py-2">
                                {/* <Mainet /> */}
                            </div>
                        </>
                    )
                } else {
                    return (
                        <>
                            <SimpleGrid spacing={5} columns={{ sm: 1, md: 3 }} w={"100%"} >
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
                                <Stat border={"1px solid"} borderColor={"gray.300"} p={"1rem"} rounded={"xl"} w={{ sm: "50%", md: "100%" }} bg={"white"}>
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
            })()}


        </>
    )
}