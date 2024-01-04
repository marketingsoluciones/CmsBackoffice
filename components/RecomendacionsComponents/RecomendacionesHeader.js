import { useRouter } from "next/router"
import { CompartirIcon, CorreoIcon, FacebookIcon, InAzulIcon, SmsIcon } from "../Icons/index"

export const RecomendacionesHeader = () => {
    const router = useRouter()
    const handleChange = (e) => {
        const stateButton = e.target.checked
        if (stateButton === true) {
            router.push("/facturacion")
        }
    }
    const DataButtons = [
        {
            icono: <CorreoIcon />,
            texto: "Compartir por correo electrónico",
            rout: null,
            style: "flex items-center text-base space-x-2 bg-rosa rounded-md text-white p-1",
            function: () => { setOpenModalFCorre(!openModalFCorre) }
        },
        {
            icono: <SmsIcon />,
            texto: "Compartir por SMS",
            rout: null,
            style: "flex items-center text-base space-x-2 bg-rosa rounded-md text-white p-1",
            function: () => { setOpenModalFSms(!openModalFSms) }
        },
        {
            icono: <CompartirIcon />,
            texto: "Copiar invitación link",
            rout: null,
            style: " flex items-center text-base space-x-2 bg-white rounded-md p-1 border border-gray-200",
        },
        {
            icono: <InAzulIcon />,
            texto: null,
            rout: null,
            style: "flex items-center bg-white rounded-md p-1",
        },
        /* {
            icono: <FacebookIcon />,
            texto: null,
            rout: null,
            style: "flex items-center bg-white rounded-md p-1",
        }, */
        {
            icono: <FacebookIcon />,
            texto: null,
            rout: null,
            style: "flex items-center bg-white rounded-md p-1",
        },
    ]


    return (
        <>
            <p className="  mt-1 text-3xl text-rosa flex items-canter space-x-3">
                <span>
                    Programa de recomendación
                </span>
                <div className="flex items-center space-x-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" onChange={(e) => { handleChange(e) }} />
                        <div className="w-11 h-6 bg-gray-400 border rounded-full peer:bg-rosa dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rosa"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 ml-3">Modo Demo</span>
                    </label>
                </div>
            </p>
            <div className="bg-white text-base py-2 rounded-lg px-2 text-gray-500">
                Haz que tu red conozca Bodas de Hoy y EventosOrganizador. Recibirán una prueba ampliada de 30 días, y puedes recibir increíbles recompensas.
            </div>
            <div className="flex justify-end space-x-2 py-2  overflow-y-auto">
                {
                    DataButtons.map((item, idx) => {
                        return (
                            <button key={idx} onClick={item?.function} className={`${item.style}`}>
                                <div >
                                    {item?.icono}
                                </div>
                                <p className="hidden md:block">
                                    {item?.texto}
                                </p>
                            </button>
                        )
                    })
                }
            </div>

        </>
    )
}