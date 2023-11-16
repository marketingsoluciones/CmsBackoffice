import { CoronaIcon } from "../Icons/index"

export const FotografoInfoPage = ({modalContacto, setModalContacto, setOptionSelect}) => {
    const dataArry = [

        {
            img: "Modulo1Foto.png",
            title: "Colecciones",
            text: "Crea colecciones de cada uno de tus eventos, añadido a tus usuarios al agregar un enlace de descarga a las fotos o videos para ellos.",
            button: "Ver más",
            rout: "0",
        },
        {
            img: "Modulo2Foto.png",
            title: "Proyectos",
            text: "Lleva el control de tus servicios profesionales automatizando facturas, contratos y datos de cada evento. ",
            button: "Ver más",
            rout: "1",
        },
    ]

    return (
        <div className="h-[100vh] px-5 py-2 ">
            <p className=" mt-1 text-3xl text-rosa">
                Fotógrafos
            </p>
            <div className="bg-white rounded-xl flex flex-col h-[calc(100%-110px)] overflow-auto">
                <div className="flex flex-col items-center justify-center space-y-3  px-10 py-14">
                    <p className="text-xl text-gray-600">
                        <span className="text-rosa">Amplia tu exposición </span> y atrae más clientes
                    </p>

                    <p className="text-base text-gray-600 px-10">
                        Con el
                        <span className="text-rosa"> Módulo Fotográfos  </span>
                        automatiza tus proyectos, contratos y facturas además de brindarle a tus clientes una forma óptima e intuitiva para descargar las fotografias de su evento.
                    </p>
                </div>
                <div className="bg-gray-200 flex relative">
                    <div className="z-10 flex items-center  ">
                        <img src="/CamaraBG.png" alt="weddin planner" className="absolute" />
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
                        <div className="flex items-center justify-center space-x-2 w-[80%]">
                            <div className="text-amarillo">
                                <CoronaIcon />
                            </div>
                            <div className="">
                                <p className="text-xl text-gray-600 font-semibold">
                                    Sistema de Proofing
                                </p>
                                <p className="text-base text-gray-500 ">
                                    Brindale a tus clientes la opción de ver y autorizar fotos y video antes de entregar el trabajo.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center space-x-2 w-[80%]">
                            <div className="text-amarillo">
                                <CoronaIcon />
                            </div>
                            <div>

                                <p className="text-xl text-gray-600 font-semibold">
                                    Reservas en linea
                                </p>
                                <p className="text-base text-gray-500 ">
                                    Sistema moderno de reservas en línea y software de programación de sesiones de fotos.
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