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
import DatosNegocios from "./AjustesComponents/DatosNegocio";
import ResumenDePrecios from "./ResumenDePrecios";
import EntradasInformes from "./EntradasInformes";
import PreguntasFrecu from "./PreguntasFrecu";
import ClientesInforme from "./ClientesInforme";
import CapacityControl from "./ComponentesE.C/ControlDeAforoComp";
import ControlAforoComp from "./ComponentesE.C/ControlDeAforoComp";
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
      component: <EntradaRecepcion componentState={optionSelect} setComponentState={setOptionSelect} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
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
        component: <Comision1 componentState={optionSelect} setComponentState={setOptionSelect} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
      },
              
      {
        page: 14,
        component: <Comision2 componentState={optionSelect} setComponentState={setOptionSelect} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      },

      {
        page: 15,
        component: <Liquidaciones componentState={optionSelect} setComponentState={setOptionSelect} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      },

      {
        page: 16,
        component: <ResumenDePrecios componentState={optionSelect} setComponentState={setOptionSelect} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      },
      {
        page: 17,
        component: <EntradasInformes componentState={optionSelect} setComponentState={setOptionSelect} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      },
      {
        page: 18,
        component: <PreguntasFrecu componentState={optionSelect} setComponentState={setOptionSelect} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      },
      {
        page: 19,
        component: <ClientesInforme componentState={optionSelect} setComponentState={setOptionSelect} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      },
      {
        page: 20,
        component: <ControlAforoComp componentState={optionSelect} setComponentState={setOptionSelect} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
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


