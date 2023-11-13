import { Icon } from "@chakra-ui/icons"
import { CoronaIcon } from "../Icons/index"

export const InfoCateringBodas = ({ setOptionSelect }) => {
    const dataArry = [
        {
            img: "CartaProductoP.png",
            title: "Carta de productos",
            text: "Genera tu propia carta de productos agregando platos y bebidas para utilizar luego en la creación de tus menús para eventos.",
            button: "Ver más",
            rout: "0",
        },
        {
            img: "PlantillaMenuP.png",
            title: "Plantilla de menú",
            text: "Crea plantillas de menú para reutilizar en tus eventos y añadir a la versión app novios.",
            button: "Ver más",
            rout: "1",
        },
        {
            img: "MenuP.png",
            title: "Menú",
            text: "Asigna el menú a un evento, para llevar el control de platos y presentarselo a novios e invitados.",
            button: "Ver más",
            rout: "2",
        },
        {
            img: "listaInvitados.png",
            title: "Lista de invitados",
            text: "Lleva el control de la lista de invitados de tus eventos, la mesa asignada, alérgenos y confirmación de asistencia.",
            button: "Ver más",
            rout: "3",
        },
        {
            img: "itinerario.png",
            title: "Intinerarios",
            text: "Visualiza el intinerario de cada evento asignado para conocer las horas de actividad de cada proveedor.",
            button: "Ver más",
            rout: "4",
        },
    ]

    return (
        <div className="h-[100vh] px-5 py-2 ">
            <p className=" text-slate-600 mt-1 text-3xl text-rosa">
                Catering de bodas
            </p>
            <div className="bg-white rounded-xl h-[calc(100%-110px)] overflow-auto">
                <div className="flex flex-col items-center justify-center space-y-3  px-10 py-14">
                    <p className="text-xl text-gray-600">
                        <span className="text-rosa">Crea el menú de cada evento </span> para presentar a tus clientes
                    </p>

                    <p className="text-base text-gray-600 px-10">
                        Con el
                        <span className="text-rosa"> Módulo Catering para Bodas </span>
                        organiza los detalles del menú según el tipo de evento y lleva el control de alérgenos por invitado y su selección de platos.
                    </p>
                </div>
                <div className="bg-gray-200 flex relative">

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
                    <div className="grid grid-cols-2  justify-items-center content-center  pb-3">
                        <div className="flex items-center space-x-2">
                            <div className="text-amarillo">
                                <CoronaIcon />
                            </div>
                            <div>

                                <p className="text-xl text-gray-600 font-semibold">
                                    Vende tickets
                                </p>
                                <p className="text-base text-gray-500">
                                    Para cenas o eventos prepagados
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="text-amarillo">
                                <CoronaIcon />
                            </div>
                            <div>

                                <p className="text-xl text-gray-600 font-semibold">
                                    QR para el menú
                                </p>
                                <p className="text-base text-gray-500">
                                    Comparte los menú con QR
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>
                            Óbtenla activando la <span className="text-amarillo font-semibold"> VERSIÓN GOLD </span>
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