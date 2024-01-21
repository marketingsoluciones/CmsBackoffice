import { CoronaIcon } from "../Icons/index"

export const FotografoInfoPage = ({ modalContacto, setModalContacto, setOptionSelect }) => {
    const dataArry = [

        {
            img: "Modulo1Foto.png",
            title: "Colecciones",
            text: "Crea colecciones de las mejores fotos de tus eventos y comparte cada uno de sus momentos memorables.",
            button: "Ver más",
            rout: "0",
        },
        {
            img: "Modulo2Foto.png",
            title: "Proyectos",
            text: "Lleva el control de tus servicios profesionales.  Automatiza la gestión de tus contratos, facturas y datos de tus eventos. ",
            button: "Ver más",
            rout: "1",
        },
    ]

    return (
        <div className="  px-5">
            <p className=" mt-1 text-3xl text-rosa font-semibold">
                Fotógrafos
            </p>
          
            <div className="bg-white rounded-xl flex flex-col md:h-[calc(100%-10px)] h-[calc(100%-200px)] overflow-auto">
                <div className="flex flex-col items-center justify-center space-y-3  px-10 py-14">
                    <p className="text-[25px] text-azulCorporativo text-center font-semibold ">
                        <span className="text-rosa">Amplia tu exposición </span> y atrae más clientes
                    </p>

                    <p className="text-base text-azulCorporativo md:px-10 text-center md:text-left">
                        Con el
                        <span className="text-rosa"> Módulo Fotográfos  </span>
                        automatiza la gestión de tus proyectos, contratos y facturas con el módulo fotógrafos de tu EventosOrganizador.  Brinda a tus clientes una plataforma optima e intuitiva para descargar las fotografías de su eventos.
                    </p>
                </div>
                <div className="bg-grayInformativo flex justify-center  md:relative w-[100%]">
                    <div className="md:z-10 *flex items-center justify-stat md:block hidden  ">
                        <img src="/camaraBG.png " alt="Fotografo" className="absolute" />
                    </div>
                    <div className="flex flex-col items-center  justify-center space-y-10 md:space-y-5 py-14 md:z-20 w-full ">
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
                        <div className="flex items-center justify-center space-x-2 md:w-[80%]">
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
                        <div className="flex items-center justify-center space-x-2 md:w-[80%]">
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
                    <button onClick={() => setModalContacto(!modalContacto)} className="bg-amarillo px-4 py-1 rounded-lg text-white text-base">
                        Contactar
                    </button>
                </div>
            </div>
        </div>

    )
}