import { CoronaIcon } from "../Icons/index"

export const InfoWeddinPlannrePage = ({ setOptionSelect, modalContacto, setModalContacto }) => {
    const dataArry = [

        {
            img: "listaInvitados.png",
            title: "Lista de invitados",
            text: "Lleva el control de la lista de invitados de tus eventos, la mesa asignada, alérgenos y confirmación de asistencia.",
            button: "Ver más",
            rout: "0",
        },
        {
            img: "presupuesto.png",
            title: "Presupuestos",
            text: "Gestiona el presupuesto de cada evento, indicando gastos por pagar y llevando un control de los pagos realizados. ",
            button: "Ver más",
            rout: "1",
        },
        {
            img: "invitaciones.png",
            title: "Invitaciones",
            text: "Envia a la los invitados de cada evento la invitacion digital via email, SMS o Whatsapp para confirmar su asistencia",
            button: "Ver más",
            rout: "2",
        },

        {
            img: "itinerario.png",
            title: "Intinerarios",
            text: "Visualiza el intinerario de cada evento asignado para conocer las horas de actividad de cada proveedor.",
            button: "Ver más",
            rout: "3",
        },
    ]
    
    return (
        <div className="h-[100vh] px-5 py-2 ">
            <p className="  mt-1 text-3xl text-rosa">
                wedding Planner
            </p>
            <div className="bg-white rounded-xl md:h-[calc(100%-110px)] h-[calc(100%-200px)] overflow-auto">
                <div className="flex flex-col items-center justify-center space-y-3  px-10 py-14">
                    <p className="text-xl text-gray-600">
                        <span className="text-rosa">Organizar un evento </span> es una tarea minusiosa
                    </p>

                    <p className="text-base text-gray-600 px-10">
                        Con el
                        <span className="text-rosa"> Módulo Wedding Planner </span>
                        óbten funcionalidades para automatizar tareas como gestionar la lista de invitados, presupuestos, envio de invitaciones y crear intinerarios para compartir con tus clientes.
                    </p>
                </div>
                <div className="bg-gray-200 flex relative">
                    <div className="z-10 flex items-center  ">
                        <img src="/CorazonDoble.png" alt="weddin planner" className="absolute" />
                    </div>
                    <div className="flex flex-col items-center space-y-5 py-14 z-20 ">
                        {
                            dataArry.map((item, idx) => {
                                return (
                                    <div key={idx} className="flex flex-col md:flex-row w-full justify-center items-center space-x-5 ">
                                        <div className="w-72 flex items-center justify-center">
                                            <img src={item.img} alt="s" />
                                        </div>
                                        <div className="flex flex-col space-y-2 justify-center md:w-[40%]">
                                            <p className="text-rosa text-xl">
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
                    <div className="md:grid md:grid-cols-2  justify-items-center content-center  pb-3">
                        <div className="flex items-center justify-center space-x-2 w-[80%]">
                            <div className="text-amarillo">
                                <CoronaIcon />
                            </div>
                            <div className="">
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
                            <div>

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
                        <p>
                            Óbtenla activando la <span className="text-amarillo font-semibold"> VERSIÓN GOLD </span>
                        </p>
                    </div>
                    <button onClick={()=>setModalContacto(!modalContacto)} className="bg-amarillo px-4 py-1 rounded-lg text-white text-base">
                        Contactar
                    </button>
                </div>
            </div>
        </div>
    )
}