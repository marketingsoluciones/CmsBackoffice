import { ArrowLeft, CorazoncirculoIcon, DiamanteIcon, GanaTiempoIcon, MenusIcon } from "../../Icons/index"
import { useRouter } from "next/router"

export const InfoMenuPage = ({ setComponentState }) => {
    const router = useRouter()
    const dataArry = [
        {
            icon: <GanaTiempoIcon />,
            textM: "Gana tiempo ",
            text: "y ahorra esfuerzo en la creación del menú que deseas ofrecer.",
        },
        {
            icon: <MenusIcon />,
            textM: "Genera cuantas propuestas de menú quieras",
            text: "de forma rápida para cada evento."
        }
    ]
    return (
        <div >
            <div onClick={() => setComponentState(5)} className="w-5 h-5 absolute* z-10 top-2 left-3 text-gray-700 cursor-pointer">
                <ArrowLeft />
            </div>
            <p className="  mt-1 text-3xl text-rosa">
                Menú
            </p>
            <div className="bg-white rounded-lg h-[calc(100%-245px)] md:h-[calc(100vh-145px)] overflow-auto flex flex-col items-center justify-center " >
                <div className="md:grid md:grid-cols-2 py-8 px-8">
                    {/* titulo de la pagina informativa */}
                    <div className="space-y-3 md:pl-5 md:pr-4 md:pb-0 pb-5">
                        <p className="md:text-[23px] text-[20px] text-center md:text-start text-azulCorporativo ">
                            <span className="text-rosa font-semibold"> Gestiona paso a paso el menú</span> de cada evento que organizas.
                        </p>
                        <p className="text-base md:w-[90%] text-azulCorporativo text-center md:text-left">
                            Añade tu lista de platillos y bebidas. Puedes diseñar el menú de forma conjunta con tus clientes y proveedores de servicios desde nuestra plataforma.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <img src="Menu.png" alt="Gestiona tu menu" className="object-none" />
                    </div>
                </div>
                <div className="md:grid md:grid-cols-2 py-8 px-8 bg-grayInformativo space-y-5 md:space-y-0">
                    <div className="pl-10* w-[95%] flex items-center justify-center">
                        <p className="md:text-end text-base text-azulCorporativo text-center ">
                            <span className="text-rosa"> Planificar el menú </span> es una tarea meticulosa que articula el propósito de tu evento con las preferencias gastronómicas de tus clientes, la temática, temporada, proveedores de servicio y más
                        </p>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center items-center">
                        <button onClick={() => /* setActionButton(!actionButton) */ router.push({
                            pathname: "/facturacion",
                            query: {
                                state: 1,
                                product: "prod_PMUcDPRC5C7vJk",
                                plan: "basic",
                                originPath: "cateringBodas",
                                stateOriginPath: "1"
                            }
                        })} className="bg-rosa text-base text-white px-2 py-1 rounded-lg">
                            Inicia prueba gratis de 30 días
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
                                        product: "prod_PMUcDPRC5C7vJk",
                                        plan: "basic",
                                        originPath: "cateringBodas",
                                        stateOriginPath: "1"
                                    }
                                })}> BÁSICA</span> O <span className="font-semibold  cursor-pointer" onClick={() => router.push({
                                    pathname: "/facturacion",
                                    query: {
                                        state: 1,
                                        product: "prod_PMUcMPf9xFhKM4",
                                        plan: "premium",
                                        originPath: "cateringBodas",
                                        stateOriginPath: "1"
                                    }
                                })}>PREMIUM </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="md:grid md:grid-cols-2 py-8 px-8 md:space-y-0 space-y-5 ">
                    {
                        dataArry.map((item, idx) => {
                            return (
                                <div key={idx} className="flex items-center space-x-4 justify-center">
                                    <div>
                                        {item.icon}
                                    </div>
                                    <p className="text-base w-[55%] "><span className="text-rosa font-semibold">{item.textM}</span> {item.text}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}