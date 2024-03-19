import Inicio from "../components/NuevoEvento/Principal/Inicio"
import { useState } from "react"
import EventosCreados from "../components/NuevoEvento/EventosCreados/PrincipalEventos";
import InicioCE from "../components/NuevoEvento/CrearEvento/InicioCE";
import ConfigurarEvento from "../components/NuevoEvento/CrearEvento/ConfigurarEvento";
import DatoEvento from "../components/NuevoEvento/CrearEvento/DatosEvento";
import Asistencia from "../components/NuevoEvento/CrearEvento/Asistencia";
import Permisos from "../components/NuevoEvento/CrearEvento/Permisos";
import DescripcionEvento from "../components/NuevoEvento/EventosCreados/PanelEventCreado";
import { IframeApp } from "../layouts/IframeApp";
import DescuentosEvento from "../components/NuevoEvento/CrearEvento/DescuentosEvento";
import CartaQrEvento from "../components/NuevoEvento/CrearEvento/CartaQrEvento";
import TarifaListas from "../components/NuevoEvento/CrearEvento/TarifaListas";

const EventosOri = () => {
  const [optionSelect, setOptionSelect] = useState(0)
  // handleClickOption se usara mas adelante para poder regresar entre componentes 
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
    {
      component: <DescuentosEvento componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    {
      component: <CartaQrEvento componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    {
      component: <TarifaListas componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    {
      component: <IframeApp route={"/"} />
    },
  ]

  return (
    <div className="w-[100%] h-[100%]">
      <div id="rootElement" />
      {dataComponents[optionSelect].component}
    </div>
  );
};

export default EventosOri;
