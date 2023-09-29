import Image from "next/image"
import { Eventos } from "../components/Eventos"
import { Calendario } from "../components/Calendario"
import { CateringBodas } from "../components/CateringBodas"
import { PublicacionesInfo } from "../components/Publicacones"
import { Marcas } from "../components/Marcas"
import { Contactos } from "../components/Contactos"


const Page404 = () => {
    return (
        <>
            {/* <div className="flex h-full justify-center  items-center">
                <img src={"/placeholder/illustration_404.png"} ></img>

            </div> */}

            {/* <Calendario/> */}
            {/* <CateringBodas/> */}
            {/* <PublicacionesInfo/> */}
            {/* <Marcas/> */}
            <Contactos/>
        </>
    )
}

export default Page404