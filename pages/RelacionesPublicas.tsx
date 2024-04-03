import { FC, useState } from "react";
import PrincipalDE from "../components/NuevoEvento/RRPP/PrincipalDE";
import VentasEntradas from "../components/NuevoEvento/RRPP/VentasEntradas";
import EntradasGratis from "../components/NuevoEvento/RRPP/EntradasGratis";
import RegistroEntradasUser from "../components/NuevoEvento/RRPP/RegistroEntradasUser";
import ReciboEntradas from "../components/NuevoEvento/RRPP/ReciboEntradas";
import ReservaCantidad from "../components/NuevoEvento/RRPP/ReservaCantidad";
import ReservaDatos from "../components/NuevoEvento/RRPP/ReservaDatos";
import CancelarReserva from "../components/NuevoEvento/RRPP/CancelarReserva";

const RelacionesPublicas: FC = () => {
  const [optionSelect, setOptionSelect] = useState(0)
  const handleClickOption = (idx) => {
    setOptionSelect(idx);
  };

  const dataComponents = [
    {
      component: <PrincipalDE componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    {
      component: <VentasEntradas componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    {
      component: <EntradasGratis componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    {
      component: <RegistroEntradasUser componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    {
      component: <ReciboEntradas componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    {
      component: <ReservaCantidad componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    {
      component: <ReservaDatos componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    {
      component: <CancelarReserva componentState={optionSelect} setComponentState={setOptionSelect} />
    },
  ]

  return (
    <div className="w-[100%] h-[100%] items-center justify-center">
      <div id="rootElement" />
      {dataComponents[optionSelect].component}
    </div>
  );
};

export default RelacionesPublicas;
