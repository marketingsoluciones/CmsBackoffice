import { ArrowLeft, CorazonBodasICon } from "../../Icons/index"
import { useRouter } from "next/router"
import { EventContextProvider } from "../../../context/EventContext"
import { useToast } from "../../../hooks/useToast"

export const InfoListaInvitadosPage = ({ setState, state, setComponentState, idxComponent }) => {
    const { event } = EventContextProvider()
    const toast = useToast()
    const router = useRouter()
    const dataArry = [
        {
            incon: <CorazonBodasICon />,
            text: "Controla las asistencias confirmadas y si fue recibida la invitacion online al evento."
        },
        {
            incon: <CorazonBodasICon />,
            text: "Verifica el tipo de menú seleccionado por el invitado y si es alérgico a algún alimento. "
        },
        {
            incon: <CorazonBodasICon />,
            text: "Diseña y envía tu invitación al evento"
        },
        {
            incon: <CorazonBodasICon />,
            text: "Conoce la ubicación de cada uno de ellos en la mesa, para llevar un control del catering y protocolo."
        },
    ]
    return (
        <div className=" px-5 py-2">
            <div onClick={() => setComponentState(idxComponent)} className="w-5 h-5 absolute* z-10 top-2 left-3 text-gray-700 cursor-pointer">
                <ArrowLeft />
            </div>
            <p className=" mt-1 text-3xl text-rosa">
                Lista de invitados
            </p>
            <div className="bg-white rounded-xl  md:h-[calc(100vh-145px)] *h-[calc(100%-215px)] overflow-auto pb-16 md:pb-0  " >
                <div className="px-5 bg-gray-200 py-10 content-center rounded-t-lg flex flex-col items-center justify-center space-y-3 ">
                    <p>
                        <span className="text-rosa font-semibold">Lleva el control </span> de tu lista de invitados en un sólo lugar
                    </p>
                    <div>
                        <button onClick={() => event != null ? setState(!state) : toast("error", "Crea un evento para gestionar tu lista de invitados")} className="bg-rosa text-white text-base py-1 px-4 rounded-lg shadow-md">
                            Gestionar listas
                        </button>
                    </div>
                </div>
                <div className="md:grid md:grid-cols-3 mt-10">
                    <div className="flex flex-col items-center col-span-2 ">
                        <p className="text-rosa text-xl px-6">
                            ¿Qué me aporta la lista de invitados?
                        </p>
                        <div className="md:grid md:grid-cols-2 content-center h-full  px-6">
                            {
                                dataArry.map((item, idx) => {
                                    return (
                                        <div key={idx} className="flex p-3 space-x-2">
                                            <div className="text-rosa">
                                                {item.incon}
                                            </div>
                                            <p className="text-base">
                                                {item.text}
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="col-span-1 px-6 md:px-0">
                        <img src="/invitados.png" alt="alta" className="w-[95%] h-[95%]" />
                    </div>
                </div>
            </div>
        </div>
    )
}