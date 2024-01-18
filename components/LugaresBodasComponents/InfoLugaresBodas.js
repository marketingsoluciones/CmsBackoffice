import { Icon } from "@chakra-ui/icons"
import { CoronaIcon } from "../Icons/index"

export const InfoLugaresBodas = ({ setOptionSelect, setModalContacto, modalContacto }) => {
    const dataArry = [
        {
            img: "PlanSalon.png",
            title: "Plantilla del salón",
            text: "Crea plantillas de los planos de tus salones para reutilizar  en tus eventos y añadir a la versión app novios.",
            button: "Ver más",
            rout: "0",
        },
        {
            img: "planEvento.png",
            title: "Plano del evento",
            text: "Asigna el plano a un evento, diseña la distribución del salón, ubicación de mobiliario, proveedores e invitados.",
            button: "Ver más",
            rout: "1",
        },
        {
            img: "listaInvitados.png",
            title: "Lista de invitados",
            text: "Lleva el control de la lista de invitados de tus eventos, la mesa asignada, alérgenos y confirmación de asistencia.",
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
        <div className="px-5">
            <p className=" mt-1 text-3xl text-rosa font-semibold">
                Lugares para bodas
            </p>
            <div className="bg-white rounded-xl flex flex-col md:h-[calc(100%-10px)] h-[calc(100%-200px)] overflow-auto">
                <div className="flex flex-col items-center justify-center space-y-3  px-10 py-14">
                    <p className="text-[23px] text-azulCorporativo text-center md:text-left">
                        <span className="text-rosa">El lugar de celebración </span> es una de las piedras angulares de todo evento
                    </p>

                    <p className="text-[13px] text-azulCorporativo md:px-16 text-center md:text-left">
                        Con el
                        <span className="text-rosa"> Módulo Lugares para Bodas </span>
                        organiza de forma óptima e intuitiva los detalles para presentarlos a tus clientes, controla desde la distribución de los salones hasta la lista de invitados de cada evento.
                    </p>
                </div>
                <div className="bg-gray-200 flex items-center  md:relative w-[100%]">
                    <div className="md:z-10 flex items-center justify-stat *md:block *hidden  ">
                        <img src="/lugarBoda.png" alt="alta" className="absolute" />
                    </div>
                    <div className="flex flex-col items-center  justify-center space-y-10 md:space-y-5 py-14 md:z-20 w-full">
                        {
                            dataArry.map((item, idx) => {
                                return (
                                    <div key={idx} className="flex md:flex-row flex-col w-full justify-center items-center space-x-5 ">
                                        <div className="w-72 flex items-center justify-center">
                                            <img src={item.img} alt={item.title} />
                                        </div>
                                        <div className="flex flex-col space-y-2 items-center md:items-start justify-center px-5 md:w-[40%]">
                                            <p className="text-rosa text-3xl">
                                                {item.title}
                                            </p>
                                            <p className="text-base text-azulCorporativo text-center md:text-start">
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
                    <div className="flex items-center space-x-2">
                        <div className="text-amarillo">
                            <CoronaIcon />
                        </div>
                        <p className="text-xl text-azulCorporativo font-semibold">
                            ¿Te gustaría tener una landing page de tu empresa?
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 grid-cols-1  md:justify-items-center space-y-3 pb-10">
                        {dataArry2.map((item, idx) => {
                            return (
                                <div key={idx} className="flex items-center md:w-[70%] space-x-2">
                                    <img src={item.img} />
                                    <p className="text-base text-azulCorporativo ">
                                        {item.text}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="cursor-default text-center text-azulCorporativo">
                            Óbtenla activando la <span className="text-amarillo font-semibold "> VERSIÓN GOLD </span>
                    </div>
                    <button onClick={()=>setModalContacto(!modalContacto)} className="bg-amarillo px-4 py-1 rounded-lg text-white text-[20px]">
                        Contactar
                    </button>
                </div>
            </div>
        </div>
    )
}