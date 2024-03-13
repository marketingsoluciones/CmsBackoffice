import { useEffect, useState } from "react"
import { InvitadosCatering, ItinerarioCatering, MesasICon, PlanoEventoIcon } from "./Icons/index"
import { SubmenuComponent } from "./CateringBodasComponents/SubmenuComponent"
import { PlantillaSalon } from "./LugaresBodasComponents/PlantillasSalon"
import { ListaInvitados } from "./LugaresBodasComponents/ListaInvitados"
import { PlanoEvento } from "./LugaresBodasComponents/PlanoEvento"
import { ItinerarioLugaresBodas } from "./LugaresBodasComponents/ItinerarioLugaresBodas"
import { InfoLugaresBodas } from "./LugaresBodasComponents/InfoLugaresBodas"
import { Modal } from "./modals/Modal"
import { ContactarGold } from "./formularios/ContactarGold"
import { useRouter } from "next/router"
import { IframeApp } from "../layouts/IframeApp";


export const LugaresBodas = () => {
    const [optionSelect, setOptionSelect] = useState(4)
    const [modalContacto, setModalContacto] = useState(false)
    const router = useRouter()
    const { stateOriginPath } = router?.query
    useEffect(() => {
        if (stateOriginPath) {
            setOptionSelect(stateOriginPath)
        }
    }, [])
    const dataComponents = [
        {
            icon: <MesasICon />,
            title: "Plantillas del salón",
            component: <PlantillaSalon componentState={optionSelect} setComponentState={setOptionSelect} />
        },
        {
            icon: <PlanoEventoIcon />,
            title: "Plano del evento",
            component: <IframeApp route="mesas" />,//<PlanoEvento componentState={optionSelect} setComponentState={setOptionSelect} />
            type: "iframe",
        },
        {
            icon: <InvitadosCatering />,
            title: "Lista de invitados",
            component: <IframeApp route="invitados" />,//<ListaInvitados setComponentState={setOptionSelect} />
            type: "iframe",
        },
        {
            icon: <ItinerarioCatering />,
            title: "Intinerarios",
            component: <ItinerarioLugaresBodas setComponentState={setOptionSelect} />
        },
        {
            component: <InfoLugaresBodas setOptionSelect={setOptionSelect} modalContacto={modalContacto} setModalContacto={setModalContacto} />
        },
    ]
    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };

    const newArryDataComponents = dataComponents.slice()
    newArryDataComponents.splice(4, 1)

    return (
        <>
            <div className={`flex h-full ${dataComponents[optionSelect].type !== "iframe" && "w-full"}`}>
                <SubmenuComponent dataComponents={newArryDataComponents} optionSelect={optionSelect} onClick={handleClickOption} />
                <div className="flex-1">
                    {dataComponents[optionSelect].component}
                </div>
            </div>
            {
                modalContacto ? (
                    <Modal classe={"w-[28%] h-[86%]"}>
                        <ContactarGold openModal={modalContacto} setOpenModal={setModalContacto} />
                    </Modal>
                ) :
                    null
            }
        </>
    )
}