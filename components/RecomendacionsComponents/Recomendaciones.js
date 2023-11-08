import { useState } from "react"
import { CorreoIcon, SmsIcon, CompartirIcon, FacebookIcon, InAzulIcon } from "../Icons/index"
import { RecomendacionRecompensas } from "./RecomendacionRecompensas"
import { HistorialActividad } from "./HistorialActividad"
import { Modal } from "../modals/Modal"
import { CompartirPorEmail } from "../formularios/CompartirPorEmail"
import { CompartirPorSms } from "../formularios/CompartirPorSms"
export const ModuloRecomendaciones = () => {
    const [optionSelect, setOptionSelect] = useState(0)
    const [openModalFCorre, setOpenModalFCorre] = useState(false)
    const [openModalFSms, setOpenModalFSms] = useState(false)



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
        {
            icono: <FacebookIcon />,
            texto: null,
            rout: null,
            style: "flex items-center bg-white rounded-md p-1",
        },
        {
            icono: <FacebookIcon />,
            texto: null,
            rout: null,
            style: "flex items-center bg-white rounded-md p-1",
        },
    ]

    const Components = [
        {
            component: <RecomendacionRecompensas />,
        },
        {

            component: <HistorialActividad />,
        }
    ]

    return (

        <div>
            <p className=" text-slate-600 mt-1 text-3xl text-rosa">
                Programa de recomendación
            </p>
            <div className="bg-white text-base py-2 rounded-lg px-2 text-gray-500">
                Haz que tu red conozca Bodas de Hoy y EventosOrganizador. Recibirán una prueba ampliada de 30 días, y puedes recibir increíbles recompensas.
            </div>
            <div className="flex justify-end space-x-2 py-2">
                {
                    DataButtons.map((item, idx) => {
                        return (
                            <button key={idx} onClick={item?.function} className={`${item.style}`}>
                                <div >
                                    {item?.icono}
                                </div>
                                <p>
                                    {item?.texto}
                                </p>
                            </button>
                        )
                    })
                }
            </div>
            <div className="bg-white rounded-lg">
                <div className="text-base pl-3 py-3">
                    <button onClick={() => setOptionSelect(0)} className={`px-3 ${optionSelect == 0 ? "border-b border-rosa text-rosa transition duration-100 " : ""}`}>
                        Recomendaciones y recompensas
                    </button>
                    <button onClick={() => setOptionSelect(1)} className={`px-3 ${optionSelect == 1 ? "border-b border-rosa text-rosa transition duration-100" : ""}`}>
                        Historial de actividad
                    </button>
                </div>
                {Components[optionSelect].component}
            </div>
            {
                openModalFCorre ? (
                    <Modal openIcon={openModalFCorre} setOpenIcon={setOpenModalFCorre} classe={"w-[25%] h-[86%]"} >
                        <CompartirPorEmail openModal={openModalFCorre} setOpenModal={setOpenModalFCorre} />
                    </Modal>
                ) : null
            }
            {
                openModalFSms ? (
                    <Modal openIcon={openModalFCorre} setOpenIcon={setOpenModalFCorre} classe={"w-[25%] h-[86%]"} >
                        <CompartirPorSms openModal={openModalFSms} setOpenModal={setOpenModalFSms} />
                    </Modal>
                ) : null
            }
        </div>
    )
}