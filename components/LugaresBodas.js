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
            component: <PlanoEvento componentState={optionSelect} setComponentState={setOptionSelect} />
        },
        {
            icon: <InvitadosCatering />,
            title: "Lista de invitados",
            component: <ListaInvitados setComponentState={setOptionSelect} />
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
    newArryDataComponents.splice(4,1)

    return (
        <>
            <div className="md:grid md:grid-cols-6 h-full w-[100%]">
                <SubmenuComponent dataComponents={newArryDataComponents} optionSelect={optionSelect} onClick={handleClickOption} />
                <div className="col-span-6 md:col-span-5">
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