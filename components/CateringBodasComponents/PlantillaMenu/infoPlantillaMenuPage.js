import { CorazonIcon, DiamanteIcon } from "../../Icons/index"
import { useRouter } from "next/router"

export const InfoPlantillaMenuPage = ({actionButton, setActionButton}) => {
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
        <>
            <p className=" text-slate-600 mt-1 text-3xl text-rosa">
                Plantillas de Menú
            </p>
            <div className="bg-white rounded-lg">
                <div className="grid grid-cols-2 justify-items-center content-center py-8 px-10">
                    <div className="flex flex-col  justify-center pl-10 space-y-4 ">
                        <p>
                            <span className="text-rosa text-xl">Crea plantillas de menú </span> y distribuye de forma estratégica los platillos y bebidas.
                        </p>
                        <p className="text-base">
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
                                        producto: "weddingPlanner",
                                        plan: "premium"
                                    }
                                })}>PREMIUM</span>
                            </p>
                        </div>
                        <div>
                            <button onClick={()=>setActionButton(!actionButton)} className="bg-rosa rounded-lg px-5 py-0.5 text-base text-white ">
                                Empezar
                            </button>
                        </div>

                    </div>
                    <div>
                        <img src="PlantillaM.png" alt="Plantilla menu" />
                    </div>
                </div>
                <div className="bg-gray-200 flex flex-row px-14 py-4 space-x-5">
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
                    <p className="text-base">
                        La plantilla perfecta te facilita tener en cuenta las necesidades particulares de tus invitados.
                    </p>
                </div>
            </div>
        </>
    )
}