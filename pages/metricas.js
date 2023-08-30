import { Flex } from "@chakra-ui/react"
import { MetricasSuscripcion } from "../components/Suscripcion/MetricasSuscripcion"
import {Itinerario} from "../components/Itinerario/Itinerario.tsx"

const metricas = () => {
    return (
        <>
            <Flex as={"section"} flexDir={"column"} overflow={"auto"} h={"100%"} >
                {/* <MetricasSuscripcion /> */}
                <Itinerario/>
            </Flex >
        </>
    )
}

export default metricas