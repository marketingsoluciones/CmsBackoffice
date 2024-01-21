import { CorazonCirculoIcon, CorazoncirculoIcon, DiamanteIcon, DiamanteSinFondoIcon } from "../Icons/index"
import { useRouter } from "next/router"

export const InfoContactosPage = () => {
    const router = useRouter()
    return (
        <div className=" px-5 py-2 h-[calc(100%)] ">
            <div className="flex items-center space-x-1 ">
                <p className=" mt-1 text-3xl text-rosa">
                    wedding Planner
                </p>
                <div className="flex items-center space-x-1">
                    <CorazonCirculoIcon />
                    <DiamanteSinFondoIcon className="text-acento"/>
                </div>
            </div>
            <div className="bg-white rounded-lg  md:h-[calc(100%-50px)] overflow-auto">
                <div className="md:grid md:grid-cols-2 justify-content-center px-10 py-8">
                    <div className="flex items-center justify-center md:px-14">
                        <p className="text-xl text-azulCorporativo text-center md:text-left"><span className="text-rosa font-semibold"> Coordina los datos </span> de todos quienes forman parte y hacen posible tu evento.</p>
                    </div>
                    <div>
                        <img src="infoContactos.png" alt="infoContactos" />
                    </div>
                </div>
                <div className="md:grid md:grid-cols-2 bg-gray-100 px-10 py-8" >
                    <div className="pl">
                        <p className="text-base text-center md:text-left">
                            <span className="text-rosa  " >Concentrar todos los detalles en un mismo lugar es clave </span> para tengas el control de las comunicaciones y las acciones programadas con cada persona en tu lista.
                        </p>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center items-center">
                        {/*  <button  className="bg-rosa text-base text-white px-2 py-1 rounded-lg">
                            Inicia prueba gratis de 30 días
                        </button> */}
                        <div className=" flex items-center justify-center space-x-1 my-2 text-base cursor-default ">
                            <div className="text-amarillo">
                                <CorazoncirculoIcon />
                            </div>
                            <div className="text-amarillo">
                                <DiamanteIcon />
                            </div>
                            <p className="text-rosa">
                                Activa la versión  <span className="font-semibold cursor-pointer" onClick={() => router.push({
                                    pathname: "/facturacion",
                                    query: {
                                        state: 1,
                                    }
                                })}> BÁSICA </span>O <span className="text-amarillo font-semibold cursor-pointer" onClick={() => router.push({
                                    pathname: "/facturacion",
                                    query: {
                                        state: 1,
                                    }
                                })}> PREMIUM </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="px-10 py-8">
                    <p className="text-center text-base">
                        También puedes sincronizar o etiquetar a quien necesites en tu lista sin limitaciones en las diferentes fases de tu evento.<span className="text-rosa"> Todo pensado para la gestión eficiente de tu agenda.</span>
                    </p>
                </div>
            </div>
        </div >
    )
}