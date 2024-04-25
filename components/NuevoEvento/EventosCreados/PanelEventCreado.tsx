import { FC, useState } from "react";
import ListasRecepcion from "./ComponentesE.C/ListasRecepcion";
import { DataGeneral } from "./DataGeneral";
import EntradaRecepcion from "./ComponentesE.C/EntradaRecepcion";
import RrPpRecepcion from "./ComponentesE.C/RrPpRecepcion";
import Comision1 from "./ComponentesE.C/Comision1";
import Comision2 from "./ComponentesE.C/Comision2";
import Liquidaciones from "./ComponentesE.C/Liquidaciones";
import ReservasRecepcion from "./ComponentesE.C/ReservasRecepcion";
import AsisUsuRecepcion from "./ComponentesE.C/AsisUsuRecepcion";
import ControlAforoRecepcion from "./ComponentesE.C/ControlAforoRecepcion";
import UsuariosEquipos from "./ComponentesE.C/UsuariosEquipos";
interface propsDescripcionEvento {
  componentState: any;
  setComponentState: any;

}

const DescripcionEvento: FC<propsDescripcionEvento> = ({ componentState, setComponentState }) => {
  const [optionSelect, setOptionSelect] = useState(0);
  const [selectedOption, setSelectedOption] = useState(12);
  const dataComponents = [
    {
      page: 1,
      component: <ListasRecepcion componentState={optionSelect} setComponentState={setSelectedOption} />

    },
    {
      page: 2,
      component: <EntradaRecepcion componentState={optionSelect} setComponentState={setSelectedOption} />
    },
    {
      page: 3,
      component: <RrPpRecepcion componentState={optionSelect} setComponentState={setSelectedOption} />

    },
    {
      page: 4,
      component: <ReservasRecepcion componentState={optionSelect} setComponentState={setSelectedOption} />

    },
    {
      page: 5,
      component: <AsisUsuRecepcion componentState={optionSelect} setComponentState={setSelectedOption} />

    },
    {
      page: 6,
      component: <ControlAforoRecepcion componentState={optionSelect} setComponentState={setSelectedOption} />

    },
    {
      page: 7,
      component: <UsuariosEquipos componentState={optionSelect} setComponentState={setSelectedOption} />

    },
    {
      page: 8,
      component: <ListasRecepcion componentState={optionSelect} setComponentState={setSelectedOption} />

    },
    {
      page: 9,
      component: <ListasRecepcion componentState={optionSelect} setComponentState={setSelectedOption} />

    },
    {
      page: 10,
      component: <ListasRecepcion componentState={optionSelect} setComponentState={setSelectedOption} />
    },
    {
      page: 11,
      component: <ListasRecepcion componentState={optionSelect} setComponentState={setSelectedOption} />

    },

    { 
      page: 12,
      component: <DataGeneral  selectedOption={selectedOption} setSelectedOption={setSelectedOption} setComponentState={setComponentState} /> },
      
      {
        page: 13,
        component: <Comision1 componentState={optionSelect} setComponentState={setOptionSelect} />
      },
               /* 19 */
      {
        page: 14,
        component: <Comision2 componentState={optionSelect} setComponentState={setOptionSelect} />
      },
                /* 20 */
      {
        page: 15,
        component: <Liquidaciones componentState={optionSelect} setComponentState={setOptionSelect} />
      },
      

  ]
  const FindComponents = dataComponents.find((element)=>element.page==selectedOption);
  return (
    <div className="w-[100%] h-[100%]">
      <div id="rootElement"/>
      {FindComponents.component}
    </div>
  );
};

export default DescripcionEvento;


