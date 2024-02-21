import { CarpetasIcon, DiamanteIcon, FacturaIcon, MensajeIcon, TodoIcon,ArrowLeft } from "../../Icons/index"
import { useRouter } from "next/router"

export const ProyectoInfoPage = ({ setComponentState }) => {
    const router = useRouter()
    const dataArry = [
        {
            icon: <CarpetasIcon />,
            text: "Describe tus proyectos"
        },
        {
            icon: <MensajeIcon />,
            text: "Gestiona tus contratos"
        },
        {
            icon: <TodoIcon />,
            text: "Envia cuestionarios a tus usuarios"
        },
        {
            icon: <FacturaIcon />,
            text: "Lleva el control de tus facturas"
        },
    ]
    return (
        <div  className="">
            <div onClick={() => setComponentState(2)} className="w-5 h-5 absolute* z-10 top-2 left-3 text-gray-700 cursor-pointer">
                <ArrowLeft />
            </div>
            <p className=" mt-1 text-3xl text-rosa">
                Proyectos
            </p>
            <div className="bg-white rounded-lg md:relative md:h-[calc(100vh-145px)] h-[calc(100vh-220px)] overflow-auto pt-16 md:pt-0">
            <img src="proyectoImg.png" alt="proyect Img" className="md:absolute  md:top-24 md:right-0 h-[65%] pl-10 md:pl-0" />

                <div className="md:px-10 px-5 py-8 space-y-3">
                    <p className="text-[25px] text-azulCorporativo" >
                        <span className="text-rosa"> Domina tu agenda y mantén el control  </span> sobre tus proyectos
                    </p>
                    <p className="text-base* md:w-[50%] text-[15px] text-azulCorporativo">
                        Llevar el control de tus servicios profesionales como proveedor para eventos puede ser complicado.<span className="text-rosa font-semibold"> Cuando gestionas tus proyectos de manera profesional sacas el máximo provecho a tu tiempo y habilidades.</span>
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
                                    product: "prod_PMUYQSBgRHL79y",
                                    plan: "Premium",
                                    originPath: "fotografo",
                                    stateOriginPath: "1"
                                }
                            })}>PREMIUM</span>
                        </p>
                    </div>
                    <button onClick={() => router.push({
                        pathname: "/facturacion",
                        query: {
                            state: 1,
                            product: "prod_PMUYQSBgRHL79y",
                            plan: "Premium",
                            originPath: "fotografo",
                            stateOriginPath: "1"
                        }
                    })} className="bg-rosa rounded-lg px-4 py-0.5 text-white text-base">
                        Crear Proyectos
                    </button>
                </div>
                <div className="bg-grayInformativo px-10 py-5">
                    <p className="text-base text-azulCorporativo">
                        Concentra el registro de las acciones de tus proyectos en una sola herramienta.
                    </p>
                </div>
                <div className="md:grid md:grid-cols-5 space-y-3 px-10 py-8">
                    {
                        dataArry.map((item, idx) => {
                            return (
                                <div key={idx} className="col-span-2 flex items-center space-x-2 ">
                                    <div>
                                        {item.icon}
                                    </div>
                                    <p className="text-base w-[50%]">
                                        {item.text}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
                
            </div>
        </div>
    )
}