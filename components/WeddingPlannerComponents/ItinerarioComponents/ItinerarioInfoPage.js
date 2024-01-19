
import { useEffect, useState } from "react"
import { ArrowLeft, CorazonBodasICon, CorazoncirculoIcon, DiamanteIcon } from "../../Icons/index"
import { useRouter } from "next/router"



export const ItinerarioInfoPage = ({ setOptionSelect, setComponentState, idxComponent }) => {
    const router = useRouter()
    const pathname = router.pathname
    const pathnameReplace = pathname.replace("/", "")
    const [productID, setProductID] = useState()
    const [stateProduct, setStateProduct] = useState()


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

    useEffect(() => {
        if (pathnameReplace == "lugaresBodas") { setProductID("prod_OxRT3aFwljilTl"), setStateProduct("3") }
        if (pathnameReplace == "cateringBodas") { setProductID("prod_OxUsU7DJsvRwJ8"), setStateProduct("4") }
        if (pathnameReplace == "weddingPlanner") { setProductID("prod_OxUw2ZeAGaMqNe"), setStateProduct("3") }
    }, [pathname])



    return (
        <div className="h-[100vh]">
            <div onClick={() => setComponentState(idxComponent)} className="w-5 h-5 absolute* z-10 top-2 left-3 text-gray-700 cursor-pointer">
                <ArrowLeft />
            </div>
            <p className="mt-1 text-3xl text-rosa font-semibold">
                Intinerarios
            </p>
            <div className="bg-white rounded-lg  h-[calc(100%-245px)] md:h-[calc(100%-145px)] overflow-auto  ">
                <div className="flex flex-col items-center py-8 space-y-4 px-5">
                    <p className="text-xl text-center">
                        <span className="text-rosa">Crea tu itinerario </span> y gestiona con éxito la ejecución de tu evento.
                    </p>
                    <img src="itinerarioImg.png" alt="itinerario imagen" />
                </div>
                <div className="md:grid md:grid-cols-3 md:space-x-10 space-y-5 md:space-y-0  bg-gray-200 px-10 py-8">
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
                <div className="md:grid md:grid-cols-2 py-8 px-8 space-y-3 md:space-y-0">
                    <div className="flex flex-col items-center justify-center space-y-5" >
                        <img src="itinerarioImg2.png" alt="itinerario img 2" />
                        <p className="text-base text-center">
                            Organiza desde itinerarios para novios hasta itinerarios de prestación de servicios.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-3 md:space-y-0">
                        <button onClick={() => /* setOptionSelect(0) */ router.push({
                            pathname: "/facturacion",
                            query: {
                                state: 1,
                                product: productID,
                                plan: "basic",
                                originPath: pathnameReplace,
                                stateOriginPath: stateProduct
                            }
                        })} className="bg-rosa text-base text-white px-2 py-1 rounded-lg">
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
                                        product: productID,
                                        plan: "basic",
                                        originPath: pathnameReplace,
                                        stateOriginPath: stateProduct
                                    }
                                })}> BÁSICA</span> O <span className="font-semibold text-amarillo cursor-pointer " onClick={() => router.push({
                                    pathname: "/facturacion",
                                    query: {
                                        state: 1,
                                        product: productID,
                                        plan: "basic",
                                        originPath: pathnameReplace,
                                        stateOriginPath: stateProduct
                                    }
                                })}> PREMIUM </span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}