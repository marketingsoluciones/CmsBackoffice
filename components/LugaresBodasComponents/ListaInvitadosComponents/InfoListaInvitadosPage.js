import { CorazonBodasICon } from "../../Icons/index"

export const InfoListaInvitadosPage = ({ actionButton, setActionButton }) => {
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
        <div className="h-full ">
            <p className=" text-slate-600 mt-1 text-3xl text-rosa">
                Lista de invitados
            </p>
            <div className="bg-white rounded-xl  h-[91%]   " >
                <div className="px-5 bg-gray-200 py-10 content-center rounded-t-lg flex flex-col items-center justify-center space-y-3 ">
                    <p>
                        <span className="text-rosa font-semibold">Lleva el control </span> de tu lista de invitados en un sólo lugar
                    </p>
                    <div>
                        <button onClick={() => setActionButton(!actionButton)} className="bg-rosa text-white text-base py-1 px-4 rounded-lg shadow-md">
                            Gestionar listas
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-3 mt-10">
                    <div className="flex flex-col items-center col-span-2 ">
                        <p className="text-rosa text-xl">
                            ¿Qué me aporta la lista de invitados?
                        </p>
                        <div className="grid grid-cols-2 content-center h-full  px-6">
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
                    <div className="col-span-1">
                        <img src="/invitados.png" alt="alta" className="w-[95%] h-[95%]" />
                    </div>
                </div>
            </div>
        </div>
    )
}