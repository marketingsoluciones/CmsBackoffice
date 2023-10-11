import { CalendarioCheck, CalendarioArrow, CalendarioDispositivos } from "../Icons/index"

export const InfoPageCalendario = () => {

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
            <div className="bg-white  space-y-5 rounded-xl h-full flex flex-col items-center justify-center h-full pt-10 pb-5">

                <img src="/photoCalendari.png" alt="alta" className="w-[80%] md:w-[40%]" />

                <p className="md:text-3xl text-xl text-rosa font-semibold">Calendario empresarial</p>

                <div className="grid md:grid-cols-3 md:px-10  px-2 space-x-5  ">
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

                <div className=" space-y-3 md:space-y-0 pt-3 pb-2  " >
                    <button className="py-2 px-7 bg-rosa rounded-lg text-white w-full">
                        Crear Calendario
                    </button>
                </div>

            </div>
        </>
    )
}