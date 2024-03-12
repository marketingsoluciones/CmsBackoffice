import { CoronaIcon } from "../Icons/index"

export const InfoCateringBodas = ({ setOptionSelect, modalContacto, setModalContacto }) => {
    const dataArry = [
        {
            img: "CartaProductoP.png",
            title: "Carta de productos",
            text: "Diseña la carta de productos que se identifique el tema de tu evento y tu buen paladar. Añadiendo todos tus platos y bebidas.",
            button: "Ver más",
            rout: "0",
        },
        {
            img: "PlantillaMenuP.png",
            title: "Plantilla de menú",
            text: "Crea tus propias plantillas de menú y genera tu propia base adaptable para todos tus eventos.  Añade tus plantillas en tu app novios.",
            button: "Ver más",
            rout: "1",
        },
        {
            img: "MenuP.png",
            title: "Menú",
            text: "Asigna el menú de tu evento y lleva el control de los platos más su presentación a los novios e invitados.",
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
        <div className=" px-5 py-2 ">
            <p className="  mt-1 text-3xl text-rosa">
                Catering de Bodas
            </p>
            <div className="bg-white rounded-xl md:h-[calc(100vh-125px)] h-[calc(100%-200px)] overflow-auto">
                <div className="flex flex-col items-center justify-center space-y-3  px-10 py-14">
                    <p className="md:text-[23px] text-[20px] text-azulCorporativo text-center md:text-left">
                        <span className="text-rosa font-semibold">Armar una experiencia de degustación </span> a la altura de tu evento
                    </p>

                    <p className="text-base text-azulCorporativo md:px-16 text-center">
                        Con el
                        <span className="text-rosa font-semibold"> Módulo Catering para Bodas </span>
                        garantiza el servicio profesional de todo lo que incluye y lleva el control de cada parte del catering de tu evento en nuestro planificador digital.
                    </p>
                </div>
                <div className="bg-grayInformativo md:relative flex flex-col items-center justify-center space-y-10 md:space-y-5 py-14 md:z-20 ">
                    {dataArry.map((item, idx) => {
                        return (
                            <div key={idx} className="md:flex flex-cols md:flex-row w-full justify-center items-center md:space-x-5 ">
                                <div className="md:w-72 flex items-center justify-center">
                                    <img src={item.img} alt="s" />
                                </div>
                                <div className="flex flex-col space-y-2 justify-center  md:w-[40%] text-center md:text-left px-5 md:px-0">
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
                    })}
                </div>
                <div className="flex flex-col items-center justify-center space-y-3  px-10 py-10">
                    <div className="md:grid md:grid-cols-2  justify-items-center content-center pb-3 md:space-y-0 space-y-5">
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
                        <p className="text-center md:text-left">
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