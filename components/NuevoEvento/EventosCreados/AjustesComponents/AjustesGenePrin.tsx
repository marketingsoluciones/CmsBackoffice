
import { FC } from "react";
import AjustesGeneralesTabs from "./AjustesGeneralesTabs";
import { useRouter } from 'next/router';
interface propsAjustesGenePrin {
    componentState: any;
    setComponentState: any;
  
  }

const AjustesGenePrin: FC<propsAjustesGenePrin> = ({componentState, setComponentState}) => {
const router = useRouter()
  return (
    <div className="w-[100%] h-[90vh] max-w-full flex flex-col items-start justify-start overflow-auto py-7 px-0 box-border gap-[28px]">
      
      <div className="flex flex-row items-center justify-center px-3 gap-2 max-w-full">           

                  <div onClick={() => { router.push("/events/tiketing") }}
                  className="cursor-pointer flex flex-row items-start justify-start">
                    <img
                      className="h-auto w-auto"
                      loading="lazy"
                      alt=""
                      src="/ModuloEvento/FlechaIzquerda.svg"
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