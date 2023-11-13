import { CalendarioCheck, CalendarioArrow, CalendarioDispositivos, DiamanteIcon } from "../Icons/index"
import { useRouter } from "next/router"

export const InfoPageCalendario = () => {
    const router = useRouter()

    const dataArry = [
        {
            icon: <CalendarioCheck />,
            text: "Agenda tus citas, programa tus reuniones y mantén tu itinerario actualizado en tu calendario. "
        },
        {

            icon: <CalendarioArrow />,
            text: "Incrementa la eficiencia en el cumplimiento de la agenda para lograr eventos profesionales exitosos."
        },
        {
            icon: <CalendarioDispositivos />,
            text: "Sácale mayor provecho a tu tiempo desde cualquier lugar y en cualquier dispositivo."
        },
    ]

    return (
        <>
            <div className="bg-white space-y-2 rounded-xl h-full flex flex-col items-center justify-center h-full pt-10 pb-5">

                <img src="/photoCalendari.png" alt="alta" className="w-[80%] md:w-[40%]" />

                <p className="md:text-3xl text-xl text-rosa font-semibold">Calendario empresarial</p>

                <div className="grid md:grid-cols-3 md:px-10 px-2 space-x-5  ">
                    {dataArry.map((item, idx) => {
                        return (
                            <>
                                <div key={idx} className="flex space-x-3 items-center ">
                                    <div className="">

                                        {item.icon}
                                    </div>
                                    <div className="text-base">
                                        {item.text}
                                    </div>

                                </div>
                            </>
                        )
                    })}

                </div>

                <div className=" space-y-3 md:space-y-0 py-2  " >
                    <button className="text-yellow-500 flex items-center justify-center space-x-1 mb-4 ">
                        <div>
                            <DiamanteIcon />
                        </div>
                        <p>
                            Activar la versión <span onClick={() => router.push({
                                    pathname: "/facturacion",
                                    query: {
                                        state: 1,
                                        producto: "weddingPlanner",
                                        plan: "premium"
                                    }
                                })} className="font-semibold cursor-pointer">PREMIUM</span>
                        </p>
                    </button>
                    {/* <button className="py-2 px-7 bg-rosa rounded-lg text-white w-full text-base">
                        Crear Calendario
                    </button> */}
                </div>

            </div>
        </>
    )
}