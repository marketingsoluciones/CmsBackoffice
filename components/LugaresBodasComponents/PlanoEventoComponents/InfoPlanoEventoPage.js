import { CorazoncirculoIcon, DiamanteIcon } from "../../Icons/index"

export const InfoPlanoEventoPage = ({ actionButton, setActionButton }) => {
    return (
        <div className="h-full ">
            <p className=" text-slate-600 mt-1 text-3xl text-rosa">
                Plano Del Evento
            </p>
            <div className="bg-white rounded-xl flex flex-col h-[91%]   " >
                <div className="  flex items-center justify-center mt-3 ">
                    <img src="/PlanoEvento.png" alt="alta" className="w-[95%] h-full" />
                </div>

                <div className="grid grid-cols-3 px-5  py-5 content-center ">
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

                <div className="bg-gray-200 h-full grid grid-cols-3 justify-items-center content-center px-8 py-8 ">

                    <div className="col-span-2 flex justify-center items-center text-end">
                        <p className="w-[70%] text-base">
                            <span className="text-rosa">
                                Además de facilitar el cálculo óptimo del salón,
                            </span>
                            tendrás a la mano el listado de invitados por mesa y ubicación para mantener el orden de tu evento.
                        </p>
                    </div>

                    <div className="col-span-1 flex flex-col justify-center items-center">
                        <button onClick={() => setActionButton(!actionButton)} className="bg-rosa text-base text-white px-2 py-1 rounded-lg">
                            Inicia prueba gratis de 30 días
                        </button>
                        <div className=" flex items-center justify-center space-x-1 my-2 text-base cursor-default">
                        <div className="text-amarillo">
                                <CorazoncirculoIcon/>
                            </div>
                            <div className="text-amarillo">
                                <DiamanteIcon />
                            </div>
                            <p className="text-rosa">
                                Activa la versión  <span className="font-semibold"> BÁSICA O PREMIUM </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex  items-center justify-center px-10 h-full ">
                    <p className="text-base text-center ">Enlaza tu plano de salón al evento y lleva el control de cada una de las piezas de tu celebración.  </p>
                </div>
            </div>
        </div>
    )
}