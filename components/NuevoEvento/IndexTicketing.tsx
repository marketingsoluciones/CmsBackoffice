/* import { FC } from "react";
import Inicio from "../NuevoEvento/Principal/Inicio"
import { useState } from "react"
import EventosCreados from "../NuevoEvento/EventosCreados/PrincipalEventos";
import InicioCE from "../NuevoEvento/CrearEvento/InicioCE";
import ConfigurarEvento from "../NuevoEvento/CrearEvento/ConfigurarEvento";
import DatoEvento from "../NuevoEvento/CrearEvento/DatosEvento";
import Asistencia from "../NuevoEvento/CrearEvento/Asistencia";
import Permisos from "../NuevoEvento/CrearEvento/Permisos";
import DescripcionEvento from "../NuevoEvento/EventosCreados/PanelEventCreado";

const EventosOri: FC = () => {

  const [optionSelect, setOptionSelect] = useState(0)

  const handleClickOption = (idx) => {
    setOptionSelect(idx);
};

  const dataComponents = [
    {
      component: <Inicio componentState={optionSelect} setComponentState={setOptionSelect} />
  },
  {
    component: <EventosCreados componentState={optionSelect} setComponentState={setOptionSelect} />
},
{
  component: <InicioCE componentState={optionSelect} setComponentState={setOptionSelect} />
},
{
  component: <ConfigurarEvento componentState={optionSelect} setComponentState={setOptionSelect} />
},
{
  component: <DatoEvento componentState={optionSelect} setComponentState={setOptionSelect} />
},
{
  component: <Asistencia componentState={optionSelect} setComponentState={setOptionSelect} />
},
{
  component: <Permisos componentState={optionSelect} setComponentState={setOptionSelect} />
},
{
  component: <DescripcionEvento componentState={optionSelect} setComponentState={setOptionSelect} />
},
  ]
  
  return (
    <div>
        <div id="rootElement"/>
        {dataComponents[optionSelect].component}
    </div>
  );
};

export default EventosOri;
 */