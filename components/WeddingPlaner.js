import { useState } from "react";
import { SubmenuComponent } from "./CateringBodasComponents/SubmenuComponent";
import {
  CorreoIcon,
  InvitadosCatering,
  ItinerarioCatering,
  PresupuestoIcon,
  Webs,
} from "./Icons/index";
import { InvitadosWeddingPlanner } from "./WeddingPlannerComponents/InvitadosWeddinPlanner";
import { Presupuesto } from "./WeddingPlannerComponents/Presupuesto";
import { ItinerarioWeddingPlanner } from "./WeddingPlannerComponents/ItinerarioWeddinPlanner";
import { InfoWeddinPlannrePage } from "./WeddingPlannerComponents/InfoWeddinPlannerPage";
import { InvitacionesWeddinPlanner } from "./WeddingPlannerComponents/InvitacionesWeddinPlanner";
import { Modal } from "./modals/Modal";
import { ContactarGold } from "./formularios/ContactarGold";
import { ListaInvitados } from "./LugaresBodasComponents/ListaInvitados";

export const WeddingPlanner = () => {
  const [optionSelect, setOptionSelect] = useState(5);
  const [modalContacto, setModalContacto] = useState(false);

  const dataComponents = [
    {
      icon: <InvitadosCatering />,
      title: "Lista de invitados",
      component: <ListaInvitados setComponentState={setOptionSelect} />,
    },
    {
      icon: <PresupuestoIcon />,
      title: "Presupuesto",
      component: <Presupuesto setComponentState={setOptionSelect} />,
    },
    {
      icon: <CorreoIcon />,
      title: "Invitaciones",
      component: (
        <InvitacionesWeddinPlanner setComponentState={setOptionSelect} />
      ),
    },
    {
      icon: <ItinerarioCatering />,
      title: "Intinerarios",
      component: (
        <ItinerarioWeddingPlanner setComponentState={setOptionSelect} />
      ),
    },
    {
      icon: <Webs />,
      title: "Tus Paginas Web",
      component: (
        <ItinerarioWeddingPlanner setComponentState={setOptionSelect} />
      ),
    },
    {
      component: (
        <InfoWeddinPlannrePage
          setOptionSelect={setOptionSelect}
          modalContacto={modalContacto}
          setModalContacto={setModalContacto}
        />
      ),
    },
  ];
  const handleClickOption = (idx) => {
    setOptionSelect(idx);
  };

  const newArryDataComponents = dataComponents.slice();
  newArryDataComponents.splice(5, 1);

  return (
    <>
      <div className="md:grid md:grid-cols-6 h-full w-[100%]">
        <SubmenuComponent
          dataComponents={newArryDataComponents}
          optionSelect={optionSelect}
          onClick={handleClickOption}
        />

        <div className="col-span-6 md:col-span-5 z-10">
          {dataComponents[optionSelect].component}
        </div>
      </div>
      {modalContacto ? (
        <Modal classe={"w-[28%] h-[86%]"}>
          <ContactarGold
            openModal={modalContacto}
            setOpenModal={setModalContacto}
          />
        </Modal>
      ) : null}
    </>
  );
};
