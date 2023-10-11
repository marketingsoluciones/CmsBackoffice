import { AuthContextProvider } from "../context/AuthContext"
import { SimpleGrid, Stat, StatLabel, StatNumber } from "@chakra-ui/react"
import { InfoPage } from "./IndexPageComponents/InfoPage.js"
import { ModulosEspeciales } from "./IndexPageComponents/ModulosEspeciales.js"
import { CategoriasIcon, FotografoMenu, LugaresBodas, WeddingPlanner } from "./Icons/index"


export const IndexPage = () => {
    const { development, user, domain } = AuthContextProvider()

    const DataArry = [
        {
            img: "/photoIndex/directorio.png",
            title: "Publica tus servicios",
            texto: "Crea tu ficha y promociona tus servicios",
            button: "Ver más",
            route: "business"
        },
        {
            img: "/photoIndex/calendario.png",
            title: "Comunicación directa",
            texto: "vincula tu cronograma con tus eventos y mantén comunicación con los novios",
            button: "Ver más",
            route: "calendario"
        },
        {
            img: "/photoIndex/app.png",
            title: "Gestiona tus eventos",
            texto: "de forma simultánea y con la diversidad que necesites",
            button: "Ver más",
            route: "/"
        },
    ]

    const DataModulos = [
        {
            icon: <LugaresBodas />,
            texto: "Lugares para bodas",
            route: "lugaresBodas"
        },
        {
            icon: <CategoriasIcon />,
            texto: "Catering para bodas",
            route: "cateringBodas"
        },
        {
            icon: <WeddingPlanner />,
            texto: "Wedding Planner",
            route:"weddingPlanner"
        },
        {
            icon: <FotografoMenu />,
            texto: "Fotógrafos",
            route: "fotografo"
        },
    ]

    return (
        <>
            {(() => {
                if (development == "bodasdehoy") {
                    return (
                        <>
                            <p className=" hidden md:block text-slate-600 mt-1 px-5 text-3xl text-rosa">
                                Panel De Gestión Para Empresas
                            </p>
                            <p className=" md:hidden  text-slate-600 mt-1 px-5 text-3xl text-rosa">
                                Panel De Gestión 
                            </p>
                            <div className=" w-full px-5 py-2 space-y-2 ">
                                <InfoPage DataArry={DataArry} />
                                <ModulosEspeciales DataModulos={DataModulos} />
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