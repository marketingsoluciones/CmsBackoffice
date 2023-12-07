import { useState } from "react"
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

export const CateringBodas = () => {
    const [optionSelect, setOptionSelect] = useState(5)
    const [modalContacto, setModalContacto] = useState(false)

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
            component: <InvitadosC setComponentState={setOptionSelect} />
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

    return (
        <>
            <div className="flex h-full w-full">
                <div className="grid grid-cols-6 h-full w-full ">

                    {optionSelect > -1 && <SubmenuComponent dataComponents={dataComponents} optionSelect={optionSelect} onClick={handleClickOption} />}

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