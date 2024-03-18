import { FC, useState } from "react";
import PrincipalDE from "../components/NuevoEvento/DemoEnterprice/PrincipalDE";
import VentasEntradas from "../components/NuevoEvento/DemoEnterprice/VentasEntradas";
import EntradasGratis from "../components/NuevoEvento/DemoEnterprice/EntradasGratis";

const Prueba1: FC = () => {
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
  ]

  return (
    <div className="w-[100%] h-[100%]">
      <div id="rootElement" />
      {dataComponents[optionSelect].component}
    </div>
  );
};

export default Prueba1;
