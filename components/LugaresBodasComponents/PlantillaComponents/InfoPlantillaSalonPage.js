import { CorazonBodasICon } from "../../Icons/index"

export const InfoPlantillaSalonPage = () => {
    const dataArry = [
        {
            icon: <CorazonBodasICon />,
            text: "Genera cuantos planos desees hasta que encuentres la distribución ideal para tu salón."
        },
        {
            icon: <CorazonBodasICon />,
            text: "Cada versión te aporta una nueva visión de tu celebración."
        },
        {
            icon: <CorazonBodasICon />,
            text: "Usa nuestras plantillas predeterminadas o desarrolla una propia."
        },
    ]

    return (
        <div className="h-full">
            <p className=" text-slate-600 mt-1 text-3xl text-rosa">
                Plantillas del Salón
            </p>
            <div className="bg-white rounded-xl flex flex-col h-[91%] " >
                <div className="grid grid-cols-2 px-5  py-8 content-center ">
                    <div className=" col-span-1 space-y-2  flex flex-col justify-center ">
                        <p className="text-xl">
                            <span className="text-rosa">Crear Plantilla </span>
                            para organizar tu salón
                        </p>
                        <p className="text-base">
                            Organiza cada milímetro, diseña la distribución de tu celebración con la libertad creativa que te facilita tu EventosOrganizador.
                        </p>
                        <div>

                            <button className="text-base text-white bg-rosa px-3 py-1 rounded-lg">
                                Crear plantilla
                            </button>
                        </div>
                    </div>
                    <div className=" cols-span-1 flex  justify-center">
                        <img src="/planomesa.png" alt="alta" className="w-[80%] md:w-[70%]" />
                    </div>
                </div>
                <div className="bg-gray-200 grid grid-cols-3 ">
                    {
                        dataArry.map((item, idx) => {
                            return (
                                <div key={idx} className="flex px-4 py-10 ">
                                    <div className="text-rosa">
                                        {item.icon}
                                    </div>
                                    <p className="text-base px-3">
                                        {item.text}
                                    </p>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="flex flex-col items-center justify-center h-full ">
                    <p className="text-rosa">Cada espacio es importante.</p>
                    <p className="text-base ">Con tu plantillas coordinas desde la distribución general hasta el más mínimo detalle. </p>
                </div>
            </div>
        </div>
    )
}