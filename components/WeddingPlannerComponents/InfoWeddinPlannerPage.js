import { CoronaIcon } from "../Icons/index"

export const InfoWeddinPlannrePage = ({ setOptionSelect, modalContacto, setModalContacto }) => {
    const dataArry = [

        {
            img: "listaInvitados.png",
            title: "Lista de invitados",
            text: "Sigue la evolución de las lista de invitados. Desde el primer borrador de asistentes, hasta el momento de su despedida de la boda.",
            button: "Ver más",
            rout: "0",
        },
        {
            img: "presupuesto.png",
            title: "Presupuestos",
            text: "Gestiona paso a paso tu presupuesto para llevar un control eficiente de las finanzas de cada evento.",
            button: "Ver más",
            rout: "1",
        },
        {
            img: "invitaciones.png",
            title: "Invitaciones",
            text: "Facilita el seguimiento de tu lista de invitados.  Diseña y envía tus invitaciones. Confirma la asistencia y más.",
            button: "Ver más",
            rout: "2",
        },

        {
            img: "itinerario.png",
            title: "Intinerarios",
            text: "Crea el itinerario y asignalo a cada evento. Organiza las tareas y mantén comunicación con los responsables en tiempo real.",
            button: "Ver más",
            rout: "3",
        },
    ]

    return (
        <div className="px-5 py-2">
            <p className="mt-1 text-3xl text-rosa">
                Wedding Planner
            </p>
            <div className="bg-white rounded-xl md:h-[calc(100vh-125px)] h-[calc(100%-200px)] overflow-auto">
                <div className="flex flex-col items-center justify-center space-y-3  px-10 py-14">
                    <p className="text-[23px] font-semibold text-azulCorporativo text-center md:text-left">
                        <span className="text-rosa"> Perfeccionar tus eventos </span> con menos esfuerzo
                    </p>

                    <p className="text-base text-azulCorporativo md:px-20 text-center md:text-left">
                        Con el
                        <span className="text-rosa"> Módulo Wedding Planner </span>
                        automatiza tareas, gestiona las listas de invitados, crear presupuestos, envía las invitaciones, coordina las actividades entre los distintos proveedores y más. Lleva el control de cada movimiento en tiempo real desde tu móvil.
                    </p>
                </div>

                <div className="bg-grayInformativo flex md:relative">
                    <div className="md:z-10 flex items-center  ">
                        <img src="/CorazonDoble.png" alt="weddin planner" className="absolute" />
                    </div>
                    <div className="flex flex-col items-center md:space-y-5 space-y-10 py-14 md:z-20 w-full">
                        {
                            dataArry.map((item, idx) => {
                                return (
                                    <div key={idx} className="flex flex-col md:flex-row w-full justify-center items-center space-x-5  ">
                                        <div className="w-72 flex items-center justify-center">
                                            <img src={item.img} alt="s" />
                                        </div>
                                        <div className="flex flex-col space-y-2 justify-center md:w-[40%] items-center md:items-start">
                                            <p className="text-rosa text-xl font-semibold">
                                                {item.title}
                                            </p>
                                            <p className="text-base">
                                                {item.text}
                                            </p>
                                            <div>
                                                <button type="button" onClick={() => setOptionSelect(item.rout)} className="bg-rosa text-base text-white px-7 py-1 rounded-lg">
                                                    {item.button}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-3  px-10 py-10">
                    <div className="md:grid md:grid-cols-2  justify-items-center content-center pb-3 md:space-y-0 space-y-4">
                        <div className="flex items-center justify-center space-x-2 w-[80%]">
                            <div className="text-amarillo">
                                <CoronaIcon />
                            </div>
                            <div className="text-center md:text-left">
                                <p className="text-xl text-gray-600 font-semibold">
                                    Moodboard colaborativo
                                </p>
                                <p className="text-base text-gray-500 ">
                                    Crea el moodboard del evento, para expresar tus ideas de decoración y compartir con tus clientes
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center space-x-2 w-[80%]">
                            <div className="text-amarillo">
                                <CoronaIcon />
                            </div>
                            <div className="text-center md:text-left">

                                <p className="text-xl text-gray-600 font-semibold">
                                    Checklist de tareas
                                </p>
                                <p className="text-base text-gray-500 ">
                                    Personaliza cualquier flujo de trabajo según tus necesidades para aumentar la eficiencia y productividad de tu equipo.
                                </p>
                            </div>
                        </div>
                    </div>


                    <div>
                        <p className="text-center ">
                            Óbtenla activando la <span className="text-amarillo font-semibold"> VERSIÓN GOLD </span>
                        </p>
                    </div>
                    <button onClick={() => setModalContacto(!modalContacto)} className="bg-amarillo px-4 py-1 rounded-lg text-white text-base">
                        Contactar
                    </button>
                </div>
            </div>
        </div>
    )
}