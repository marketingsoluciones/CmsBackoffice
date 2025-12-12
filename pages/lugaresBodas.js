import { useRouter } from "next/router"
import { InvitadosCatering, ItinerarioCatering, MesasICon, PlanoEventoIcon } from "../components/Icons/index"
import { useEffect, useState } from "react"
import { InfoLugaresBodas, ItinerarioLugaresBodas, PlantillaSalon } from "../components/LugaresBodasComponents"
import { IframeApp } from "../layouts/IframeApp"
import { SubmenuComponent } from "../components/CateringBodasComponents/SubmenuComponent"
import { Modal } from "../components/modals/Modal"
import { ContactarGold } from "../components/formularios/ContactarGold"

const LugaresBodasPage = () => {
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
            component: <IframeApp route="mesas" />,
            type: "iframe",
        },
        {
            icon: <InvitadosCatering />,
            title: "Lista de invitados",
            component: <IframeApp route="invitados" />,
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
            <div className={`md:flex h-full ${dataComponents[optionSelect].type !== "iframe" && "w-full"}`}>
                <SubmenuComponent dataComponents={newArryDataComponents} optionSelect={optionSelect} onClick={handleClickOption} />
                <div className="md:flex-1">
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

export default LugaresBodasPage