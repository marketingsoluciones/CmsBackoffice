import { FC } from "react";
import Card1 from "./CardEvento"
interface propsEventosProximos {
    componentState: any;
    setComponentState: any;
  
  }

const EventosProximos: FC <propsEventosProximos> = ({componentState,setComponentState}) => {
  

  return (
        <div className="w-auto flex flex-col items-start justify-start gap-[14px]">
          <div className="w-auto h-[21px] relative leading-[21px] font-semibold inline-block text-left text-sm">
            Junio
          </div>
          <Card1 componentState={componentState} setComponentState={setComponentState}/>

        </div>

    
  );
};

export default EventosProximos;