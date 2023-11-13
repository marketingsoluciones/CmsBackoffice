import { CorazoncirculoIcon, DiamanteIcon } from "../../Icons/index"
import { useRouter } from "next/router"

export const InfoInvitaciones = () => {
    const router = useRouter()
    return (
        <>
            <p className=" text-slate-600 mt-1 text-3xl text-rosa">
                Invitaciones
            </p>
            <div className="bg-white rounded-t-lg flex flex-col items-center py-10 space-y-5">
                <h1 className="text-xl"><span className="text-rosa"> Las Invitaciones </span> son tu red de conexión con tus invitados.</h1>
                <div className="grid grid-cols-2 justify-items-center content-center">
                    <div>
                        <img src="/InvitacionesInfo.png" alt="Invitaciones informacion" />
                    </div>
                    <div className="space-y-2 flex flex-col items-center justify-center pr-20">
                        <p className="text-base">Eleva el confort en la comunicación con tu lista de invitados. Ahora tus invitaciones te brindan el canal perfecto <span className="text-rosa"> para que tus invitados confirmen su asistencia o comenten a través de ellas. </span></p>
                        <div className="w-full">
                            <button onClick={() => ""} className="bg-rosa text-base text-white px-2 py-1 rounded-lg">
                                Inicia prueba gratis de 30 días
                            </button>
                        </div>
                        <div className=" flex items-center space-x-1 my-2 text-base cursor-default w-full">
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
                                        producto: "weddingPlanner",
                                        plan: "basic"
                                    }
                                })} > BÁSICA O </span> <span className="text-amarillo cursor-pointer" onClick={() => router.push({
                                    pathname: "/facturacion",
                                    query: {
                                        state: 1,
                                        producto: "weddingPlanner",
                                        plan: "premium"
                                    }
                                })} >PREMIUM </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-200 rounded-b-lg px-28 py-8">
                <p className="text-base text-center ">
                    Agrega ubicaciones de Google, crea cuentas regresivas, añade listas de regalo y cuanta idea creativa tengas para interactuar de forma divertida con tus invitados.
                </p>
            </div>

        </>
    )
}