import { useState } from "react"
import { SubmenuComponent } from "./CateringBodasComponents/SubmenuComponent";
import { InvitadosCatering, ItinerarioCatering, PresupuestoIcon } from "./Icons/index";
import { InvitadosWeddingPlanner } from "./WeddingPlannerComponents/InvitadosWeddinPlanner";
import { Presupuesto } from "./WeddingPlannerComponents/Presupuesto";
import { ItinerarioWeddingPlanner } from "./WeddingPlannerComponents/ItinerarioWeddinPlanner";

export const WeddingPlanner = () => {
    const [optionSelect, setOptionSelect] = useState(0)
    const dataComponents = [
        {
            icon: <InvitadosCatering />,
            title: "Lista de invitados",
            component: <InvitadosWeddingPlanner/>
        },
        {
            icon: <PresupuestoIcon/>,
            title: "Presupuesto",
            component: <Presupuesto/>
        },
        {
            icon: <ItinerarioCatering />,
            title: "Intinerarios",
            component: <ItinerarioWeddingPlanner/>
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