import { FC } from "react";
import Card1 from "./CardEvento"
import Card2 from "./Card2";
interface propsEventosPasados {
    componentState: any;
    setComponentState: any;
  
  }

const EventosPasados: FC <propsEventosPasados> = ({componentState,setComponentState}) => {
  

  return (
        <div className="w-auto flex flex-col items-start justify-start gap-[14px]">
          <div className="w-auto h-[21px] relative leading-[21px] font-semibold inline-block text-left text-sm">
            Enero
          </div>
          <Card2 componentState={componentState} setComponentState={setComponentState}/>
        </div>

    
  );
};

export default EventosPasados;