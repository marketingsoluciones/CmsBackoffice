import Inicio from "../components/NuevoEvento/Principal/Inicio"
import { useEffect, useState } from "react"
import EventosCreados from "../components/NuevoEvento/EventosCreados/EventosCreados";
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
import CrearTarifaListas from "../components/NuevoEvento/CrearEvento/CrearTarifaListas";
import DatosLimiteTL from "../components/NuevoEvento/CrearEvento/DatosLimitesTL";
import { AuthContextProvider } from "../context";
import EntradasTarifa from "../components/NuevoEvento/CrearEvento/EntradasTarifa/EntradasTarifas";
import EntradasOpciones from "../components/NuevoEvento/CrearEvento/EntradasTarifa/EntradasOpciones";
import ModalPrecio from "../components/NuevoEvento/CrearEvento/EntradasTarifa/Sub-Componentes/ModalPrecio";
import InformesPage from "../components/NuevoEvento/EventosCreados/InformesPage";
import Comision1 from "../components/NuevoEvento/EventosCreados/ComponentesE.C/Comision1";
import Comision2 from "../components/NuevoEvento/EventosCreados/ComponentesE.C/Comision2";
import Liquidaciones from "../components/NuevoEvento/EventosCreados/ComponentesE.C/Liquidaciones";
import { DataGeneral } from "../components/NuevoEvento/EventosCreados/DataGeneral";
import DatosNegocios from "../components/NuevoEvento/EventosCreados/AjustesComponents/DatosNegocio";

const EventosOri = () => {
  const { pathArray, setPathArray } = AuthContextProvider();
  const [optionSelect, setOptionSelect] = useState(0)
  // handleClickOption se usara mas adelante para poder regresar entre componentes 
  const handleClickOption = (idx) => {
    setOptionSelect(idx);
  };
  
  const dataComponents = [
    /* 0 */
    {
      title:"Inicio",
      component: <Inicio componentState={optionSelect} setComponentState={setOptionSelect} />
    },
     /* 1 */
    {
      title:"Eventos Creados",
      component: <EventosCreados componentState={optionSelect} setComponentState={setOptionSelect} />
    },
     /* 2 */
    {
      title:"Crear Evento",
      component: <InicioCE componentState={optionSelect} setComponentState={setOptionSelect} />
    },
     /* 3 */
    {
      title:"Configurar Evento",
      component: <ConfigurarEvento componentState={optionSelect} setComponentState={setOptionSelect} />
    },
     /* 4 */
    {
      component: <DatoEvento componentState={optionSelect} setComponentState={setOptionSelect} />
    },
     /* 5 */
    {
      component: <Asistencia componentState={optionSelect} setComponentState={setOptionSelect} />
    },
     /* 6 */
    {
      component: <Permisos componentState={optionSelect} setComponentState={setOptionSelect} />
    },
     /* 7 */
    {
      component: <DescripcionEvento componentState={optionSelect} setComponentState={setOptionSelect} />
    },
     /* 8 */
    {
      component: <DescuentosEvento componentState={optionSelect} setComponentState={setOptionSelect} />
    },
     /* 9 */
    {
      component: <CartaQrEvento componentState={optionSelect} setComponentState={setOptionSelect} />
    },
     /* 10 */
    {
      component: <TarifaListas componentState={optionSelect} setComponentState={setOptionSelect} />
    },
     /* 11 */
    {
      component: <CrearTarifaListas componentState={optionSelect} setComponentState={setOptionSelect} />
    },
     /* 12 */
    {
      component: <DatosLimiteTL componentState={optionSelect} setComponentState={setOptionSelect} />
    },
         /* 13 */
    {
      component: <EntradasTarifa componentState={optionSelect} setComponentState={setOptionSelect} />
    },
         /* 14 */
    {
      component: <EntradasOpciones componentState={optionSelect} setComponentState={setOptionSelect} />
    },
             /* 15 */
    {
      component: <ModalPrecio componentState={optionSelect} setComponentState={setOptionSelect} />
    },
             /* 16 */
    {
      component: <IframeApp route={"/"} />
    },
             /* 17 */
    {
      component: <InformesPage componentState={optionSelect} setComponentState={setOptionSelect} />
    },
             /* 18 */
    {
      component: <Comision1 componentState={optionSelect} setComponentState={setOptionSelect} />
    },
             /* 19 */
    {
      component: <Comision2 componentState={optionSelect} setComponentState={setOptionSelect} />
    },
              /* 20 */
    {
      component: <Liquidaciones componentState={optionSelect} setComponentState={setOptionSelect} />
    },
      /* 21 */
    {
      component: <DatosNegocios componentState={optionSelect} setComponentState={setOptionSelect} />
    },
/*     {
      component: <DataGeneral componentState={optionSelect} setComponentState={setOptionSelect} />
    }, */

  ]
  useEffect(()=>{
    
    setPathArray([dataComponents[optionSelect].title])
  }, [optionSelect])

  
  return (
    <div className={` ${optionSelect === 16 ? "" : "w-[100%] h-[100%]"}`}>
      <div id="rootElement" />
      {dataComponents[optionSelect].component}
    </div>
  );
};

export default EventosOri;
