import { FC } from "react";
import Inicio from "../components/NuevoEvento/Principal/Inicio"
import { useState } from "react"
import EventosCreados from "../components/NuevoEvento/EventosCreados/PrincipalEventos";
import InicioCE from "../components/NuevoEvento/CrearEvento/InicioCE";
import ConfigurarEvento from "../components/NuevoEvento/CrearEvento/ConfigurarEvento";
import DatoEvento from "../components/NuevoEvento/CrearEvento/DatosEvento";
import Asistencia from "../components/NuevoEvento/CrearEvento/Asistencia";
import Permisos from "../components/NuevoEvento/CrearEvento/Permisos";

const Prueba1: FC = () => {
  eventosPage
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
  ]
  
  return (
    <div>
        <div id="rootElement"/>
        {dataComponents[optionSelect].component}
    </div>
  );
};

export default Prueba1;