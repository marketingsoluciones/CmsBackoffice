import { useRouter } from "next/router"
import { ArrowLeft } from "../../Icons/index"
import { EventContextProvider } from "../../../context/EventContext"
import { useToast } from "../../../hooks/useToast"
export const InfoPresupuestoPage = ({ actionButton, setActionButton, setComponentState }) => {
    const router = useRouter()
    const { event } = EventContextProvider()
    const toast = useToast()


    return (
        <div className="h-[100vh] px-5 py-2">
            <div onClick={() => setComponentState(4)} className="w-5 h-5 absolute* z-10 top-2 left-3 text-gray-700 cursor-pointer">
                <ArrowLeft />
            </div>
            <p className=" mt-1 text-3xl text-rosa">
                Presupuestos
            </p>
            <div className="bg-white rounded-lg md:h-[calc(100%-130px)] h-[calc(100%-220px)]  overflow-auto">
                <div className="md:grid md:grid-cols-2 py-8 px-5 md:px-12 justify-items-center content-center" >
                    <div className="flex flex-col justify-center items-center md:items-start space-y-3 mb-3 md:mb-0">
                        <p className="text-xl text-center md:text-left">
                            <span className="text-rosa">Calcula y controla el presupuesto </span> de tu evento con facilidad
                        </p>
                        <p className="text-base text-center md:text-left">
                            Maximiza tu presupuesto y optimiza tus recursos con la ayuda del EventosOrganizador.
                        </p>
                        <div className="text-base">
                            <button onClick={() => event != null ? setState(!state) : toast("error", "Crea un evento para gestionar tu lista de invitados")} className="bg-rosa rounded-lg text-white px-3 py-0.5">
                                Gestionar presupuestos
                            </button>
                        </div>
                    </div>
                    <div>
                        <img src="presupuestoPage.png" alt="presupuesto page" />
                    </div>
                </div>
                <div className="bg-gray-200 flex items-center justify-center py-5">
                    <p className="text-base px-5 md:px-0 text-center ">
                        Aquí crear y<span className="text-rosa"> hacer el seguimiento de los gastos </span> de tu evento es más sencillo.
                    </p>
                </div>
                <div className="md:grid md:grid-cols-2 justify-items-center py-7 px-8">
                    <div>
                        <img src="presupuesto.png" alt="presupuesto" />
                    </div>
                    <div className="flex items-center" >
                        <p className="text-base">
                            Con el gestor de presupuestos <span className="text-rosa">puedes añadir o eliminar elementos a tu lista. </span> Todo pensado para que llevar  el control de los gastos de tu evento con agilidad y menos estrés en el proceso.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}