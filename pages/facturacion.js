import { ModulosFacturacion } from "../components/FacturacionComponents/ModulosFacturacion"
import { SocketContextProvider } from "../context"

const Facturacion = () => {
    const { fatherID } = SocketContextProvider()

    const path = window?.origin?.includes("://testcms.") ? process.env.NEXT_PUBLIC_EVENTSAPP?.replace("//", "//test") ?? "" : process.env.NEXT_PUBLIC_EVENTSAPP ?? ""

    return (
        <div className="px-5 py-2 ">
            {/* <ModulosFacturacion /> */}
            <iframe src={`${path}/facturacion/?show=iframe&father=${fatherID}`} width={"100%"} className="h-[89vh] md:h-[100%]"></iframe>
        </div>
    )
}

export default Facturacion