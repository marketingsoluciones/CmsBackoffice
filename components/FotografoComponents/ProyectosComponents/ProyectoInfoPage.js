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
        <>
            <div onClick={() => setComponentState(2)} className="w-5 h-5 absolute* z-10 top-2 left-3 text-gray-700 cursor-pointer">
                <ArrowLeft />
            </div>
            <p className=" mt-1 text-3xl text-rosa">
                Proyectos
            </p>
            <div className="bg-white rounded-lg relative">
                <div className="px-10 py-8 space-y-3">
                    <p className="text-xl">
                        <span className="text-rosa"> Domina tu agenda y mantén el control  </span> sobre tus proyectos
                    </p>
                    <p className="text-base w-[50%]">
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
                                    producto: "78",
                                    plan: "premium"
                                }
                            })}>PREMIUM</span>
                        </p>
                    </div>
                    <button onClick={() => router.push({
                        pathname: "/facturacion",
                        query: {
                            state: 1,
                            producto: "78",
                            plan: "premium"
                        }
                    })} className="bg-rosa rounded-lg px-4 py-0.5 text-white text-base">
                        Crear Proyectos
                    </button>
                </div>
                <div className="bg-gray-100 px-10 py-5">
                    <p className="text-base">
                        Concentra el registro de las acciones de tus proyectos en una sola herramienta.
                    </p>
                </div>
                <div className="grid grid-cols-5 space-y-3 px-10 py-8">
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
                <img src="proyectoImg.png" alt="proyect Img" className="absolute top-24 right-0 h-[65%]" />
            </div>
        </>
    )
}