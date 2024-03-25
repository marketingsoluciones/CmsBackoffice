import { useEffect, useState } from "react"
import { EventsGroupContextProvider } from "../context/EventsGroupContext"
import { useRouter } from "next/router"
import { InvitadosCatering, ItinerarioCatering, MenuCatering, PlatillOpenCatering, PlatilloCloseCatering } from "../components/Icons/index"
import { CartaProducto, InfoCateringBodas, ItinerarioC, MenuEmpresa, PlantillaMenu, SubmenuComponent } from "../components/CateringBodasComponents"
import { IframeApp } from "../layouts/IframeApp"
import { Modal } from "../components/modals/Modal"
import { ContactarGold } from "../components/formularios/ContactarGold"

const cateringBodasPage = () => {
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
            component: <IframeApp route="invitados" />,//<ListaInvitados setComponentState={setOptionSelect} eventsGroup={eventsGroup} />
            type: "iframe",
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
            <div className={`md:flex h-full ${dataComponents[optionSelect].type !== "iframe" && "w-full"}`}>
                {optionSelect > -1 &&
                    <SubmenuComponent dataComponents={newArryDataComponents} optionSelect={optionSelect} onClick={handleClickOption} />
                }
                <div className="md:flex-1">
                    {dataComponents[optionSelect]?.component}
                </div>
            </div >
            {modalContacto &&
                <Modal classe={"w-[28%] h-[86%]"}>
                    <ContactarGold openModal={modalContacto} setOpenModal={setModalContacto} />
                </Modal>
            }
        </>
    )
}

export default cateringBodasPage