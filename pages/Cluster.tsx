import { useEffect, useState } from "react"
import { IframeApp } from "../layouts/IframeApp";
import { AuthContextProvider } from "../context";
import ClusterComp from "../components/NuevoEvento/ClusterMod/ClusterComp";

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
      component: <ClusterComp componentState={optionSelect} setComponentState={setOptionSelect} />
    },
    {
      component: <IframeApp route={"/"} />
    },
  ]
  useEffect(()=>{
    
    setPathArray([dataComponents[optionSelect].title])
  }, [optionSelect])

  


  return (
    <div className="w-[100%] h-[100%]">
      <div id="rootElement" />
      {dataComponents[optionSelect].component}
    </div>
  );
};

export default EventosOri;
