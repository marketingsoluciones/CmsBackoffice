import { FC } from "react";
import Componente1CE from "./Componente1CE";
import ModoDemo from "../Principal/ModoDemo";
interface propsInicioCE {
  componentState: any;
  setComponentState: any;

}

const InicioCE: FC <propsInicioCE> = ({componentState,setComponentState}) => {
  return (
    <div className="w-auto relative bg-whitesmoke-100 flex flex-col items-center justify-start py-[30px] px-5 box-border gap-[37px] tracking-[normal] text-left text-7xl-3">

<ModoDemo/>

     
      <div className="w-[950px] gap-4 flex flex-row items-start justify-between box-border">
        <div className="flex flex-row items-center justify-center gap-3">
                  <div onClick={()=>{ 
        setComponentState(1)
      }}  className="cursor-pointer">
                  <img
                    className="h-[34px] w-[31px] relative shrink-0"
                    loading="eager"
                    alt=""
                    src="ModuloEvento/FlechaIzquerda.svg"
                  />
                  </div>
          <div className="w-auto flex flex-col items-start justify-start">
            <div className=" flex flex-col items-start justify-start">
              <div className="w-[171px] h-[31.5px] relative leading-[31.5px] font-semibold inline-block">
                Crear evento
              </div>
            </div>
          </div>
          </div>
          
      </div>
      <Componente1CE componentState={componentState} setComponentState={setComponentState}/>
    </div>
  );
};

export default InicioCE;
