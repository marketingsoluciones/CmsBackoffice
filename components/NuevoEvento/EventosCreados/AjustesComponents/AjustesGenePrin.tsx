
import { FC } from "react";
import AjustesGeneralesTabs from "./AjustesGeneralesTabs";
interface propsAjustesGenePrin {
    componentState: any;
    setComponentState: any;
  
  }

const AjustesGenePrin: FC<propsAjustesGenePrin> = ({componentState, setComponentState}) => {
  return (
    <div className="w-[100%] max-w-full flex flex-col items-start justify-start py-7 px-0 box-border gap-[28px]">
      
      <div className="flex flex-row items-center justify-center px-3 gap-2 max-w-full">           

                  <div onClick={() => { setComponentState(1) }}
                  className="cursor-pointer flex flex-row items-start justify-start">
                    <img
                      className="h-auto w-auto"
                      loading="lazy"
                      alt=""
                      src="ModuloEvento/FlechaIzquerda.svg"
                    />
                  </div>
            <div className="flex flex-col items-start justify-start box-border text-black text-[18px] font-semibold">
                  Ajustes generales
            </div>
          

      </div>

<AjustesGeneralesTabs componentState={componentState} setComponentState={setComponentState}/>

    </div>

  );
};

export default AjustesGenePrin;