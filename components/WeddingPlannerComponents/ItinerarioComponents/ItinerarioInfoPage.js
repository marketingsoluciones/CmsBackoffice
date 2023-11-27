
import { CorazonBodasICon, CorazoncirculoIcon, DiamanteIcon } from "../../Icons/index"
import { useRouter } from "next/router"


export const ItinerarioInfoPage = ({setOptionSelect}) => {
    const router = useRouter()

    const dataArry = [
        {
            icon: <CorazonBodasICon />,
            span: "Crea líneas de tiempo ",
            text: "con objetivos, tareas y acciones precisas."
        },
        {
            icon: <CorazonBodasICon />,
            span: "Asigna responsables ",
            text: " y escribe tips para el cumplimiento de la tarea."
        },
        {
            icon: <CorazonBodasICon />,
            span: "Verifica el cumplimiento",
            text: "de cada detalle antes, durante y después del evento."
        },
    ]

    return (
        <>
            <p className="mt-1 text-3xl text-rosa">
                Intinerarios
            </p>
            <div className="bg-white rounded-lg">
                <div className="flex flex-col items-center py-8 space-y-4">
                    <p className="text-xl">
                        <span className="text-rosa">Crea tu itinerario </span> y gestiona con éxito la ejecución de tu evento.
                    </p>
                    <img src="itinerarioImg.png" alt="itinerario imagen" />
                </div>
                <div className="grid grid-cols-3 space-x-10 bg-gray-200 px-10 py-8">
                    {dataArry.map((item, idx) => {
                        return (
                            <div key={idx} className="flex space-x-1 ">
                                <div className="text-rosa">
                                    {
                                        item.icon
                                    }
                                </div>
                                <p className="text-base">
                                    <span className="font-semibold">{item.span}</span> {item.text}
                                </p>
                            </div>
                        )
                    })}
                </div>
                <div className="grid grid-cols-2 py-8 px-8">
                    <div className="flex flex-col items-center justify-center space-y-5" >
                        <img src="itinerarioImg2.png" alt="itinerario img 2" />
                        <p className="text-base text-center">
                            Organiza desde itinerarios para novios hasta itinerarios de prestación de servicios.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <button onClick={() => /* setOptionSelect(0) */ router.push({
                                    pathname: "/facturacion",
                                    query: {
                                        state: 1,
                                        producto: "12",
                                        plan: "basic"
                                    }
                                }) } className="bg-rosa text-base text-white px-2 py-1 rounded-lg">
                            {/* Inicia prueba gratis de 30 días */} Empezar
                        </button>
                        <div className=" flex items-center justify-center space-x-1 my-2 text-base cursor-default">
                            <div className="text-amarillo">
                                <CorazoncirculoIcon />
                            </div>
                            <div className="text-amarillo">
                                <DiamanteIcon />
                            </div>
                            <p className="text-rosa">
                                Activa la versión  <span className="font-semibold cursor-pointer" onClick={() => router.push({
                                    pathname: "/facturacion",
                                    query: {
                                        state: 1,
                                        producto: "12",
                                        plan: "basic"
                                    }
                                })}> BÁSICA</span> O <span className="font-semibold text-amarillo cursor-pointer " onClick={() => router.push({
                                    pathname: "/facturacion",
                                    query: {
                                        state: 1,
                                        producto: "12",
                                        plan: "premium"
                                    }
                                })}> PREMIUM </span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}