import { useState } from "react"
import { SubmenuComponent } from "./CateringBodasComponents/SubmenuComponent"
import { PlatillOpenCatering, MenuCatering, PlatilloCloseCatering, InvitadosCatering, ItinerarioCatering } from "./Icons/index"
import { CartaProducto } from "./CateringBodasComponents/CartaProcutos"
import { MenuEmpresa } from "./CateringBodasComponents/MenuEmpresa"
import { PlantillaMenu } from "./CateringBodasComponents/PlantillaMenu"
import { InvitadosC } from "./CateringBodasComponents/InvitadosC"
import { ItinerarioC } from "./CateringBodasComponents/ItinerarioC"

export const CateringBodas = () => {
    const [optionSelect, setOptionSelect] = useState(0)
    const dataComponents = [
        {
            icon: <PlatillOpenCatering />,
            title: "Carta de productos",
            component: <CartaProducto/>
        },
        {
            icon: <MenuCatering />,
            title: "Plantillas de menú",
            component: <PlantillaMenu/>
        },
        {
            icon: <PlatilloCloseCatering />,
            title: "Menú",
            component: <MenuEmpresa/>
        },
        {
            icon: <InvitadosCatering />,
            title: "Lista de Invitados",
            component: <InvitadosC/>
        },
        {
            icon: <ItinerarioCatering />,
            title: "Itinerarios",
            component: <ItinerarioC/>
        },
    ]
    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };

    return (
        <>
            <div className="grid grid-cols-6 h-full">
                
                <SubmenuComponent dataComponents={dataComponents} optionSelect={optionSelect} onClick={handleClickOption} />
                
                <div className="col-span-6 md:col-span-5">
                    {dataComponents[optionSelect].component}
                </div>

            </div>
        </>
    )
}