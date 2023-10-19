import { CorazoncirculoIcon, DiamanteIcon, GanaTiempoIcon, MenusIcon } from "../../Icons/index"

export const InfoMenuPage = () => {

    const dataArry = [
        {
            icon: <GanaTiempoIcon />,
            textM: "Gana tiempo ",
            text: "en la creación del menú que se acople a lo que cada cliente quiere.",
        },
        {
            icon: <MenusIcon />,
            textM: "Genera diversos menú ",
            text: "para un mismo evento de forma rápida y organizada."
        }
    ]
    return (
        <>
            <p className=" text-slate-600 mt-1 text-3xl text-rosa">
                Menú
            </p>
            <div className="bg-white rounded-lg" >
                <div className="grid grid-cols-2 py-8 px-8">
                    <div className="space-y-3 pl-10">
                        <p className="text-xl">
                            <span className="text-rosa"> Gestiona el menú </span>y asignalo al evento que organizas
                        </p>
                        <p className="text-base w-[80%]">
                            Añade uno a uno los platos y bebidas para crear el menú de tu evento, compartir con clientes y organizadores.
                        </p>
                    </div>
                    <div>
                        <img src="Menu.png" alt="Gestiona tu menu" />
                    </div>
                </div>
                <div className="grid grid-cols-2 py-8 px-8 bg-gray-200">
                    <div className="pl-10* w-[95%] flex items-center justify-center">

                        <p className="text-end text-base">
                            <span className="text-rosa"> Planificar el menú </span> es una tarea meticulosa que implica al proveedor, el propósito del evento, los gustos de los asistentes, temática, temporada ¡hazlo fácil!
                        </p>
                    </div>
                    <div className="col-span-1 flex flex-col justify-center items-center">
                        <button onClick={() => setActionButton(!actionButton)} className="bg-rosa text-base text-white px-2 py-1 rounded-lg">
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
                                Activa la versión  <span className="font-semibold"> BÁSICA O PREMIUM </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 py-8 px-8">
                    {
                        dataArry.map((item, idx) => {
                            return (
                                <div key={idx} className="flex items-center space-x-4 justify-center">
                                    <div>
                                        {item.icon}
                                    </div>
                                    <p className="text-base"><span className="text-rosa font-semibold">{item.textM}</span> {item.text}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}