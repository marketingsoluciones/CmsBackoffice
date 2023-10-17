import { Icon } from "@chakra-ui/icons"
import { CoronaIcon } from "../Icons/index"

export const InfoLugaresBodas = () => {
    const dataArry = [
        {
            img: "PlanSalon.png",
            title: "Plantilla del salón",
            text: "Crea plantillas de los planos de tus salones para reutilizar  en tus eventos y añadir a la versión app novios.",
            button: "Ver más",
            rout: "",
        },
        {
            img: "planEvento.png",
            title: "Plano del evento",
            text: "Asigna el plano a un evento, diseña la distribución del salón, ubicación de mobiliario, proveedores e invitados.",
            button: "Ver más",
            rout: "",
        },
        {
            img: "listaInvitados.png",
            title: "Lista de invitados",
            text: "Lleva el control de la lista de invitados de tus eventos, la mesa asignada, alérgenos y confirmación de asistencia.",
            button: "Ver más",
            rout: "",
        },
        {
            img: "itinerario.png",
            title: "Intinerarios",
            text: "Visualiza el intinerario de cada evento asignado para conocer las horas de actividad de cada proveedor.",
            button: "Ver más",
            rout: "",
        },
    ]
    const dataArry2 = [
        {
            img: "url.png",
            text: "Óbten tu dominio propio"
        },
        {
            img: "calendario.png",
            text: "Programa visitas a tu negocio"
        },
        {
            img: "persona.png",
            text: "Registra clientes para obtener LEAD MAGNET"
        },
        {
            img: "email.png",
            text: "Mantén el contacto con newsletter"
        },
    ]
    return (
        <div className="h-full px-5 py-2 ">
            <p className=" text-slate-600 mt-1 text-3xl text-rosa">
                Plano del evento
            </p>
            <div className="bg-white rounded-xl flex flex-col h-[34%] overflow-auto">
                <div className="flex flex-col items-center justify-center space-y-3  px-10 py-14">
                    <p className="text-xl text-gray-600">
                        <span className="text-rosa">
                            El lugar de celebración
                        </span>
                        es una de las piedras angulares de todo evento
                    </p>

                    <p className="text-base text-gray-600 px-10">
                        Con el
                        <span className="text-rosa"> Módulo Lugares para Bodas </span>
                        organiza de forma óptima e intuitiva los detalles para presentarlos a tus clientes, controla desde la distribución de los salones hasta la lista de invitados de cada evento.
                    </p>
                </div>
                <div className="bg-gray-200 flex relative">
                    <div className="z-10 flex items-center  ">
                        <img src="/lugarBoda.png" alt="alta" className="absolute" />
                    </div>
                    <div className="flex flex-col items-center space-y-5 py-14 z-20 ">
                        {
                            dataArry.map((item, idx) => {
                                return (
                                    <div key={idx} className="flex w-full justify-center items-center space-x-5 ">
                                        <div className="w-72 flex items-center justify-center">
                                            <img src={item.img} alt="s" />
                                        </div>
                                        <div className="flex flex-col space-y-2 justify-center w-[40%]">
                                            <p className="text-rosa text-xl">
                                                {item.title}
                                            </p>
                                            <p className="text-base">
                                                {item.text}
                                            </p>
                                            <div>
                                                <button className="bg-rosa text-base text-white px-7 py-1 rounded-lg">
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
                <div className="flex flex-col items-center justify-center space-y-3  px-10 py-14">
                    <div className="flex items-center space-x-2">
                        <div className="text-amarillo">
                            <CoronaIcon  />
                        </div>
                        <p className="text-xl text-gray-600 font-semibold">
                            ¿Te gustaría tener una landing page de tu empresa?
                        </p>
                    </div>

                    <div className="grid grid-cols-2  justify-items-center space-y-3">
                        {dataArry2.map((item, idx) => {
                            return (
                                <div key={idx} className="flex items-center  w-[70%]">
                                    <img src={item.img}/>
                                    <p className="text-base">
                                        {item.text}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <p>
                            Óbtenla activando la <span className="text-amarillo"> VERSIÓN GOLD </span>
                        </p>
                    </div>
                    <button className="bg-amarillo px-4 py-1 rounded-lg text-white text-base">
                        Contactar
                    </button>
                </div>
            </div>
        </div>
    )
}