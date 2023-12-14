import { ArrowLeft, CorazoncirculoIcon, DiamanteIcon } from "../../Icons/index"
import { useRouter } from "next/router"

export const InfoPlanoEventoPage = ({ actionButton, setActionButton, setComponentState }) => {
    const router = useRouter()
    return (
        <div className="h-[100vh] px-5 py-2 ">
            <div onClick={() => setComponentState(4)} className="w-5 h-5 absolute* z-10 top-2 left-3 text-gray-700 cursor-pointer">
                <ArrowLeft />
            </div>
            <p className="mt-1 text-3xl text-rosa">
                Plano Del Evento
            </p>
            <div className="bg-white rounded-xl flex flex-col  md:h-[calc(100%-130px)]  h-[calc(100%-230px)] overflow-auto   " >
                <div className="  flex items-center justify-center mt-3 ">
                    <img src="/PlanoEvento.png" alt="alta" className="w-[95%] h-full" />
                </div>

                <div className="md:grid md:grid-cols-3 px-5  py-5 content-center ">
                    <div className=" col-span-1 space-y-2  flex flex-col justify-center items-center ">
                        <p className="text-xl text-end ">
                            <span className="text-rosa font-semibold"> Asigna un plano </span> a tu <br /> evento y organízalo
                        </p>
                    </div>

                    <div className=" col-span-2 flex justify-center items-center px-6">
                        <p className="text-base">
                            Ordena la distribución de las mesas, el espacio para el funcionamiento de cada proveedor y sienta a los invitados de tu evento.
                        </p>
                    </div>
                </div>

                <div className="bg-gray-200 h-full md:grid md:grid-cols-3 md:justify-items-center md:content-center px-8 py-8 space-y-5 md:space-y-0 ">

                    <div className="col-span-2 flex justify-center items-center text-center md:text-end">
                        <p className="md:w-[70%] text-base">
                            <span className="text-rosa">
                                Además de facilitar el cálculo óptimo del salón,
                            </span>
                            tendrás a la mano el listado de invitados por mesa y ubicación para mantener el orden de tu evento.
                        </p>
                    </div>

                    <div className="md:col-span-1 flex flex-col justify-center items-center   ">
                        <button onClick={() => /* setActionButton(!actionButton) */ router.push({
                            pathname: "/facturacion",
                            query: {
                                state: 1,
                                producto: "12",
                                plan: "basic"
                            }
                        })} className="bg-rosa text-base text-white px-2 py-1 rounded-lg">
                            {/*  Inicia prueba gratis de 30 días */} Empezar
                        </button>

                        <div className=" flex items-center justify-center space-x-1 my-2 text-base cursor-default">
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
                                        producto: "12",
                                        plan: "basic"
                                    }
                                })}> BÁSICA</span> O<span className="font-semibold cursor-pointer text-amarillo" onClick={() => router.push({
                                    pathname: "/facturacion",
                                    query: {
                                        state: 1,
                                        producto: "12",
                                        plan: "premium"
                                    }
                                })}> PREMIUM </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex  items-center justify-center px-10 py-5 md:h-full h-48 ">
                    <p className="text-base text-center ">Enlaza tu plano de salón al evento y lleva el control de cada una de las piezas de tu celebración.  </p>
                </div>
            </div>
        </div>
    )
}