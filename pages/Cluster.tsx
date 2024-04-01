import { useEffect, useState } from "react"
import { IframeApp } from "../layouts/IframeApp";
import { AuthContextProvider } from "../context";
import ClusterComp from "../components/NuevoEvento/ClusterMod/ClusterComp";
import { BuzonProspectos } from "../components/NuevoEvento/ClusterMod/BuzonProspectos";
import InfoGeneral1 from "../components/NuevoEvento/ClusterMod/InfoGeneral1";
import { ClusterInfo1 } from "../components/NuevoEvento/ClusterMod/ClusterInfo1";
import CompVisitasWebs from "../components/NuevoEvento/ClusterMod/CompVisitasWeb";
import CompMensajes from "../components/NuevoEvento/ClusterMod/CompMensajes";

const Cluster = () => {
  const { pathArray, setPathArray } = AuthContextProvider();
  const [optionSelect, setOptionSelect] = useState(0)
  // handleClickOption se usara mas adelante para poder regresar entre componentes 
  const handleClickOption = (idx) => {
    setOptionSelect(idx);
  };

  const dataComponents = [
    /* 0 */
    {
      title: "Inicio",
      component: <ClusterComp componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    /* 1 */
    {
      title: "Buzon de Prospectos",
      component: <BuzonProspectos componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    /* 2 */
    {
      title: "Informacion General",
      component: <InfoGeneral1 componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    {
      title: "Visitas Web",
      component: <CompVisitasWebs componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    {
      title: "Mensajes",
      component: <CompMensajes componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    {
      component: <IframeApp route={"/"} />
    },
  ]
  useEffect(() => {

    setPathArray([dataComponents[optionSelect].title])
  }, [optionSelect])




  return (
    <div className="w-[100%] h-[100%]">
      <div id="rootElement" />
      {dataComponents[optionSelect].component}
    </div>
  );
};

export default Cluster;
