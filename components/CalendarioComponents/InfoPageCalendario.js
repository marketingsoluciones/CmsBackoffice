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
            <div className="bg-white space-y-2 rounded-xl  flex flex-col items-center justify-center h-[calc(100vh-120px)] pt-10 pb-5">

                <img src="/photoCalendari.png" alt="alta" className="w-[80%] md:w-[30%]" />

                <p className="md:text-3xl text-xl text-rosa font-semibold">Calendario empresarial</p>

                <div className="grid md:grid-cols-3 md:px-10 px-2 md:space-x-5  space-y-5 md:space-y-0 ">
                    {dataArry.map((item, idx) => {
                        return (
                            <div key={idx} className="flex space-x-3 items-center px-5 md:px-0 ">
                                <div className="">
                                    {item.icon}
                                </div>
                                <div className="text-base text-azulCorporativo ">
                                    {item.text}
                                </div>
                            </div>
                        )
                    })}

                </div>

                <div className=" space-y-3 md:space-y-0 py-2 flex flex-col items-center  " >
                    <button className="text-yellow-500 flex items-center justify-center space-x-1 mb-4 ">
                        <div>
                            <DiamanteIcon />
                        </div>
                        <p>
                            Activar la versión <span onClick={() => router.push({
                                pathname: "/facturacion",
                                query: {
                                    state: 1,
                                }
                            })} className="font-semibold cursor-pointer">PREMIUM</span>
                        </p>
                    </button>
                    <button onClick={() => router.push({
                        pathname: "/facturacion",
                        query: {
                            state: 1,
                        }
                    })} className="py-2 px-5 bg-rosa rounded-lg text-white  text-[20px] md:text-[14px] ">
                        Crear Calendario
                    </button>
                </div>

            </div>
        </>
    )
}