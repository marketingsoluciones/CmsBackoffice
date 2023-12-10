import { useState } from "react"
import { SubmenuComponent } from "./CateringBodasComponents/SubmenuComponent";
import { CorreoIcon, InvitadosCatering, ItinerarioCatering, PresupuestoIcon } from "./Icons/index";
import { InvitadosWeddingPlanner } from "./WeddingPlannerComponents/InvitadosWeddinPlanner";
import { Presupuesto } from "./WeddingPlannerComponents/Presupuesto";
import { ItinerarioWeddingPlanner } from "./WeddingPlannerComponents/ItinerarioWeddinPlanner";
import { InfoWeddinPlannrePage } from "./WeddingPlannerComponents/InfoWeddinPlannerPage";
import { InvitacionesWeddinPlanner } from "./WeddingPlannerComponents/InvitacionesWeddinPlanner";
import { Modal } from "./modals/Modal";
import { ContactarGold } from "./formularios/ContactarGold";

export const WeddingPlanner = () => {
    const [optionSelect, setOptionSelect] = useState(4)
    const [modalContacto, setModalContacto] = useState(false)

    const dataComponents = [
        {
            icon: <InvitadosCatering />,
            title: "Lista de invitados",
            component: <InvitadosWeddingPlanner  setComponentState={setOptionSelect}/>
        },
        {
            icon: <PresupuestoIcon />,
            title: "Presupuesto",
            component: <Presupuesto  setComponentState={setOptionSelect} />
        },
        {
            icon: <CorreoIcon />,
            title: "Invitaciones",
            component: <InvitacionesWeddinPlanner  setComponentState={setOptionSelect} />
        },
        {
            icon: <ItinerarioCatering />,
            title: "Intinerarios",
            component: <ItinerarioWeddingPlanner   setComponentState={setOptionSelect}/>
        },
        {
            component: <InfoWeddinPlannrePage setOptionSelect={setOptionSelect} modalContacto={modalContacto} setModalContacto={setModalContacto}  />
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