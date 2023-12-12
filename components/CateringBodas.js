import { useEffect, useState } from "react"
import { SubmenuComponent } from "./CateringBodasComponents/SubmenuComponent"
import { PlatillOpenCatering, MenuCatering, PlatilloCloseCatering, InvitadosCatering, ItinerarioCatering } from "./Icons/index"
import { CartaProducto } from "./CateringBodasComponents/CartaProcutos"
import { MenuEmpresa } from "./CateringBodasComponents/MenuEmpresa"
import { PlantillaMenu } from "./CateringBodasComponents/PlantillaMenu"
import { InvitadosC } from "./CateringBodasComponents/InvitadosC"
import { ItinerarioC } from "./CateringBodasComponents/ItinerarioC"
import { InfoCateringBodas } from "./CateringBodasComponents/InfoCateringBodas"
import { Modal } from "./modals/Modal"
import { ContactarGold } from "./formularios/ContactarGold"
import { EventsGroupContextProvider } from "../context/EventsGroupContext"
import { useRouter } from "next/router"


export const CateringBodas = () => {
    const [optionSelect, setOptionSelect] = useState(5)
    const [modalContacto, setModalContacto] = useState(false)
    const { eventsGroup } = EventsGroupContextProvider()
    const router = useRouter()
    const { stateOriginPath } = router?.query
    useEffect(() => {
        if (stateOriginPath) {
            setOptionSelect(stateOriginPath)
        }
    }, [])
    const dataComponents = [
        {
            icon: <PlatillOpenCatering />,
            title: "Carta de productos",
            component: <CartaProducto setComponentState={setOptionSelect} />
        },
        {
            icon: <MenuCatering />,
            title: "Plantillas de menú",
            component: <PlantillaMenu setComponentState={setOptionSelect} />
        },
        {
            icon: <PlatilloCloseCatering />,
            title: "Menú",
            component: <MenuEmpresa setComponentState={setOptionSelect} />
        },
        {
            icon: <InvitadosCatering />,
            title: "Lista de Invitados",
            component: <ListaInvitados setComponentState={setOptionSelect} eventsGroup={eventsGroup} />
        },
        {
            icon: <ItinerarioCatering />,
            title: "Itinerarios",
            component: <ItinerarioC setComponentState={setOptionSelect} />
        },
        {
            component: <InfoCateringBodas setOptionSelect={setOptionSelect} modalContacto={modalContacto} setModalContacto={setModalContacto} />
        }
    ]
    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };

    const newArryDataComponents = dataComponents.slice()
    newArryDataComponents.splice(5, 1)

    return (
        <>
            <div className="flex h-full w-full">
                <div className="md:grid md:grid-cols-6 h-full w-[100%] ">

                    {optionSelect > -1 && <SubmenuComponent dataComponents={newArryDataComponents} optionSelect={optionSelect} onClick={handleClickOption} />}

                    <div className="col-span-6 md:col-span-5 ">
                        {dataComponents[optionSelect]?.component}
                    </div>

                </div>
            </div >
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