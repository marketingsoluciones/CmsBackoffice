import { ArrowLeft, CorazonBodasICon, DiamanteIcon } from "../../Icons/index"
import { useRouter } from "next/router"

export const InfoPlantillaSalonPage = ({ componentState, setComponentState }) => {
    const router = useRouter()
        const dataArry = [
        {
            icon: <CorazonBodasICon />,
            text: "Genera cuantos planos desees hasta que encuentres la distribución ideal para tu salón."
        },
        {
            icon: <CorazonBodasICon />,
            text: "Cada versión te aporta una nueva visión de tu celebración."
        },
        {
            icon: <CorazonBodasICon />,
            text: "Usa nuestras plantillas predeterminadas o desarrolla una propia."
        },
    ]

    return (
        <div className="h-[100vh]">
            <div onClick={() => setComponentState(4)} className="w-5 h-5 absolute* z-10 top-2 left-3 text-gray-700 cursor-pointer">
                <ArrowLeft />
            </div>
            <p className="  mt-1 text-3xl text-rosa">
                Plantillas del Salón
            </p>
            <div className="bg-white rounded-xl md:flex md:flex-col md:h-[91%] h-[calc(100%-100px)] overflow-auto " >
                <div className="grid md:grid-cols-2 px-5  py-6 content-center ">
                    <div className=" col-span-1 space-y-2  flex flex-col justify-center ">
                        <p className="text-xl">
                            <span className="text-rosa">Crear Plantilla </span>
                            para organizar tu salón
                        </p>
                        <p className="text-base">
                            Diseña la distribución de tu celebración con la libertad creativa que te facilita tu EventosOrganizador.
                        </p>

                    </div>
                    <div className=" cols-span-1 flex flex-col items-center  justify-center">
                        <img src="/PlantillaSalon.png" alt="alta" className="w-[80%] md:w-[70%]" />
                        <div className="text-yellow-500 flex items-center justify-center space-x-1 my-2  text-base cursor-default">
                            <div>
                                <DiamanteIcon />
                            </div>
                            <p>
                                Activar la versión <span className="font-semibold cursor-pointer" onClick={() => router.push({
                                    pathname: "/facturacion",
                                    query: {
                                        state: 1,
                                        product: "prod_OxUmSZo7LlM1hq",
                                        plan: "premium",
                                        originPath:"lugaresBodas",
                                        stateOriginPath:"0"

                                    }
                                })} >PREMIUM</span>
                            </p>
                        </div>
                        <div>
                            <button  className="text-base text-white bg-rosa px-7 py-1 rounded-lg" onClick={() => router.push({
                                    pathname: "/facturacion",
                                    query: {
                                        state: 1,
                                        product: "prod_OxUmSZo7LlM1hq",
                                        plan: "premium",
                                        originPath:"lugaresBodas",
                                        stateOriginPath:"0"

                                    }
                                })} >
                                Empezar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 grid md:grid-cols-3 ">
                    {
                        dataArry.map((item, idx) => {
                            return (
                                <div key={idx} className="flex px-4 py-4 md:py-10 ">
                                    <div className="text-rosa">
                                        {item.icon}
                                    </div>
                                    <p className="text-base px-3">
                                        {item.text}
                                    </p>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="flex flex-col items-center justify-center h-full ">
                    <p className="text-rosa">Cada espacio es importante.</p>
                    <p className="text-base ">Con tu plantillas coordinas desde la distribución general hasta el más mínimo detalle. </p>
                </div>
            </div>
        </div>
        )
}