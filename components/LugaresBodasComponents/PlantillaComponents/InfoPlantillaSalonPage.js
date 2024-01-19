import { ArrowLeft, CorazonBodasICon, DiamanteIcon } from "../../Icons/index"
import { useRouter } from "next/router"

export const InfoPlantillaSalonPage = ({ componentState, setComponentState }) => {
    const router = useRouter()
    const dataArry = [
        {
            icon: <CorazonBodasICon />,
            text: "con diversas versiones de distribución.",
            textResaltado: "Crea cuantos planos desees "
        },
        {
            icon: <CorazonBodasICon />,
            text: "con los novios que realizarán el evento en tu lugar para bodas.",
            textResaltado: "Comparte tus plantillas "
        },
        {
            icon: <CorazonBodasICon />,
            text: "los planos que antes has creado en otros eventos. ",
            textResaltado: "Reutiliza"
        },
    ]

    return (
        <div className="h-[100%] ">
            <div onClick={() => setComponentState(4)} className="flex items-center space-x-3" >
                <div className="w-5 h-5 top-2 left-3 text-gray-700 cursor-pointer">

                    <ArrowLeft />
                </div>
                <p className="  mt-1 text-3xl text-rosa font-semibold">
                    Plantillas del Salón
                </p>
            </div>
            <div className="bg-white rounded-xl md:flex md:flex-col md:h-[calc(100%-50px)] h-[calc(100%-250px)] overflow-y-auto " >
                <div className="grid md:grid-cols-2 px-8  py-6 content-center ">
                    <div className=" col-span-1 space-y-2  flex flex-col justify-center ">
                        <p className="text-[22px] text-azulCorporativo text-center md:text-left">
                            <span className="text-rosa">Crear Plantilla </span>
                            para organizar tu salón
                        </p>
                        <p className="text-base text-azulCorporativo text-center md:text-left">
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
                                        product: "prod_PMUcvm8WKdtGkL",
                                        plan: "premium",
                                        originPath: "lugaresBodas",
                                        stateOriginPath: "0"

                                    }
                                })} >PREMIUM</span>
                            </p>
                        </div>
                        <div>
                            <button className="text-base text-white bg-rosa px-7 py-1 rounded-lg" onClick={() => router.push({
                                pathname: "/facturacion",
                                query: {
                                    state: 1,
                                    product: "prod_PMUcvm8WKdtGkL",
                                    plan: "premium",
                                    originPath: "lugaresBodas",
                                    stateOriginPath: "0"

                                }
                            })} >
                                Empezar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-grayInformativo grid md:grid-cols-3 ">
                    {
                        dataArry.map((item, idx) => {
                            return (
                                <div key={idx} className="flex px-7 py-4 md:py-10 ">
                                    <div className="text-rosa">
                                        {item.icon}
                                    </div>
                                    <p className="text-base px-3 text-azulCorporativo">
                                        <span className="font-semibold">  {item.textResaltado} </span> {item.text}
                                    </p>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="flex flex-col items-center justify-center h-[80px] px-8  ">
                    <p className="text-rosa font-semibold">Cada espacio es importante.</p>
                    <p className="text-base text-center text-azulCorporativo ">Activa tus plantillas para tener presencia en la versión app para novios.  </p>
                </div>
            </div>
        </div>
    )
}