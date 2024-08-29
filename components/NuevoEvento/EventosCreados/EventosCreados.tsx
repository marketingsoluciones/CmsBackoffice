import { FC } from "react";
import Component1 from "./Component1";
import ModoDemo from "../Principal/ModoDemo";
import TabGeneral from "./TabsGeneral";

interface propsEventosCreados {
    componentState: any;
    setComponentState: any;
  
  }

const EventosCreados: FC <propsEventosCreados> = ({componentState,setComponentState}) => {
  

  return (
    <div className="w-[100%] h-full bg-whitesmoke flex flex-col items-start justify-start overflow-auto py-[30px] px-[20px] box-border gap-[30px]">
      <div className="flex items-center justify-center">
      <ModoDemo/>
      </div>
      <Component1 componentState={componentState} setComponentState={setComponentState} />

      
      <TabGeneral componentState={componentState} setComponentState={setComponentState}/>
    
    </div>
  );
};

export default EventosCreados;