import { FC } from "react";
import Card1 from "./CardEvento"
import TabCalendarioC from "./TabCalendarioC";
interface propsCalendarioTabs {
    componentState: any;
    setComponentState: any;
  
  }

const CalendarioTabs: FC <propsCalendarioTabs> = ({componentState,setComponentState}) => {
  

  return (
    <div className="w-[100%] flex flex-col items-start justify-start box-border gap-[30px]">

      {/* seccion de tags y crear evento/ver tus ventas */}

      <div className="w-[100%] flex flex-col items-start justify-between text-md ">
        <div className="self-stretch flex flex-row items-start justify-between box-border">

<TabCalendarioC componentState={componentState} setComponentState={setComponentState}/>

        </div>
      </div>
      </div>
    
  );
};

export default CalendarioTabs;