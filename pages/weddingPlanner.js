import { useState } from "react";
import { IframeApp } from "../layouts/IframeApp";
import { InfoWeddinPlannrePage, ItinerarioWeddingPlanner } from "../components/WeddingPlannerComponents";
import { CustomWebsTable } from "../components/ModuloMarcas/WeddingCustomWebs";
import { CorreoIcon, InvitadosCatering, ItinerarioCatering, PresupuestoIcon, Webs } from "../components/Icons/index";
import { SubmenuComponent } from "../components/CateringBodasComponents/SubmenuComponent";
import { Modal } from "../components/modals/Modal";
import { ContactarGold } from "../components/formularios/ContactarGold";

const weddingPlannerPage = () => {
  const [optionSelect, setOptionSelect] = useState(5);
  const [modalContacto, setModalContacto] = useState(false);
  const dataComponents = [
    {
      icon: <InvitadosCatering />,
      title: "Lista de invitados",
      component: <IframeApp route="invitados" />,
      type: "iframe",
    },
    {
      icon: <PresupuestoIcon />,
      title: "Presupuesto",
      component: <IframeApp route="presupuesto" />,
      type: "iframe",
    },
    {
      icon: <CorreoIcon />,
      title: "Invitaciones",
      component: <IframeApp route="invitaciones" />,
      type: "iframe",
    },
    {
      icon: <ItinerarioCatering />,
      title: "Intinerarios",
      component: <ItinerarioWeddingPlanner setComponentState={setOptionSelect} />,
    },
    {
      icon: <Webs />,
      title: "MisWebs",
      component: <CustomWebsTable setComponentState={setOptionSelect} />,
    },
    {
      component: <InfoWeddinPlannrePage
        setOptionSelect={setOptionSelect}
        modalContacto={modalContacto}
        setModalContacto={setModalContacto}
      />,
    },
  ];
  const handleClickOption = (idx) => {
    setOptionSelect(idx);
  };
  const newArryDataComponents = dataComponents.slice();
  newArryDataComponents.splice(5, 1);
  return (
    <>
      <div className={`md:flex h-full ${dataComponents[optionSelect].type !== "iframe" && "w-full"}`}>
        <SubmenuComponent
          dataComponents={newArryDataComponents}
          optionSelect={optionSelect}
          onClick={handleClickOption}
        />
        <div className="md:flex-1">
          {dataComponents[optionSelect].component}
        </div>
      </div>
      {modalContacto &&
        <Modal classe={"w-[28%] h-[86%]"}>
          <ContactarGold
            openModal={modalContacto}
            setOpenModal={setModalContacto}
          />
        </Modal>
      }
    </>
  )
}

export default weddingPlannerPage