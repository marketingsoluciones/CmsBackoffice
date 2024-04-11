import { FC } from "react";
import Component1 from "./Component1";
import Component2 from "./Component2";
import Card1 from "./CardEvento"
import ModoDemo from "../Principal/ModoDemo";
import { Ejemplo1Icon, Ejemplo2Icon } from "../../Icons";
import Dropdown2 from "./Dropdown2";
import TabGeneral from "./TabsGeneral";
interface propsEventosCreados {
    componentState: any;
    setComponentState: any;
  
  }

const EventosCreados: FC <propsEventosCreados> = ({componentState,setComponentState}) => {
  

  return (
    <div className="w-[100%] bg-whitesmoke flex flex-col items-start justify-start py-[30px] px-[20px] box-border gap-[30px]">
      <ModoDemo/>
      <Component1 componentState={componentState} setComponentState={setComponentState} />
      
      <TabGeneral componentState={componentState} setComponentState={setComponentState}/>

    </div>
  );
};

export default EventosCreados;