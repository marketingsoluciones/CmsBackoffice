import { ArrowLeft, CorazonIcon, DiamanteIcon } from "../../Icons/index"
import { useRouter } from "next/router"

export const InfoPlantillaMenuPage = ({ actionButton, setActionButton, setComponentState }) => {
    const router = useRouter()
    const dataArry = [
        {
            icon: <CorazonIcon />,
            text: "Crea todos los menús que desees con diversas versiones.",
        },
        {
            icon: <CorazonIcon />,
            text: "Gana tiempo al no tener que empezar de cero el menú de tu evento.",
        },
        {
            icon: <CorazonIcon />,
            text: "Reutiliza los menú que antes has creado.",
        },
    ]
    return (
        <div className="">
            <div onClick={() => setComponentState(5)} className="w-5 h-5 z-10 top-2 left-3 text-gray-700 cursor-pointer">
                <ArrowLeft />
            </div>
            <p className="  mt-1 text-3xl text-rosa">
                Plantillas de Menú
            </p>
            <div className="bg-white rounded-lg  h-[calc(100%-245px)] md:h-[calc(100vh-145px)] overflow-auto">
                <div className="md:grid md:grid-cols-2 justify-items-center content-center py-8 px-10 space-y-5 md:space-y-5 ">
                    <div className="flex flex-col  justify-center items-center md:items-start md:pl-10 space-y-4 ">
                        <p className="md:text-left text-center">
                            <span className="text-rosa text-xl ">Crea plantillas de menú </span> y distribuye de forma estratégica los platillos y bebidas.
                        </p>
                        <p className="text-base md:text-left text-center">
                            Da rienda suelta a tu creatividad gastronómica y refléjalo de forma creativa en tu menú.
                        </p>

                        <div className="text-yellow-500 flex items-center space-x-1 my-2  text-base cursor-default">
                            <div>
                                <DiamanteIcon />
                            </div>
                            <p>
                                Activar la versión <span className="font-semibold cursor-pointer" onClick={() => router.push({
                                    pathname: "/facturacion",
                                    query: {
                                        state: 1,
                                        product: "prod_PMUcMPf9xFhKM4",
                                        plan: "premium",
                                        originPath: "cateringBodas",
                                        stateOriginPath: "1"
                                    }
                                })}>PREMIUM</span>
                            </p>
                        </div>

                        <div className="">
                            <button onClick={() =>/* setActionButton(!actionButton) */ router.push({
                                pathname: "/facturacion",
                                query: {
                                    state: 1,
                                    product: "prod_PMUcMPf9xFhKM4",
                                    plan: "premium",
                                    originPath: "cateringBodas",
                                    stateOriginPath: "1"
                                }
                            })} className="bg-rosa rounded-lg px-5 py-0.5 text-base text-white ">
                                Empezar
                            </button>
                        </div>
                    </div>
                    <div>
                        <img src="PlantillaM.png" alt="Plantilla menu" />
                    </div>
                </div>
                <div className="bg-gray-200 md:flex flex-row px-14 py-4 md:space-x-5 md:space-y-0 space-y-5">
                    {dataArry.map((item, idx) => {
                        return (
                            <div key={idx} className="flex space-x-1">
                                <div className="text-rosa">
                                    {item.icon}
                                </div>
                                <p className="text-base">
                                    {
                                        item.text
                                    }
                                </p>
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-center py-5">
                    <p className="text-base text-center">
                        La plantilla perfecta te facilita tener en cuenta las necesidades particulares de tus invitados.
                    </p>
                </div>
            </div>
        </div>
    )
}