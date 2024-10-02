import { FC } from "react";
import ModoDemo from "../Principal/ModoDemo";
import AsisComp1 from "./AsisComp1";
import AsisComp2 from "./AsisComp2";
import { useRouter } from 'next/router';
interface propsAsistencia {
    componentState: any;
    setComponentState: any;
  
  }

const Asistencia: FC <propsAsistencia> = ({componentState,setComponentState}) => {
  const router = useRouter()
  return (
    <div className="w-auto relative bg-slate-100 flex flex-col items-center justify-center pt-0 px-0 pb-[31px] box-border gap-[37px] tracking-[normal] text-center text-2xs-5">
      
      <ModoDemo/>

      <div className="w-[1050px] flex flex-row items-start justify-between py-0 px-5 box-border gap-[20px] max-w-full shrink-0 text-left text-7xl-3 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-ebony">
        <div className="flex flex-col items-start justify-start py-0 pr-[7px] pl-0">
          <div className="overflow-hidden flex flex-col items-start justify-start">
            <div className="flex flex-row items-center justify-start py-0 pr-px pl-0">
              <div onClick={() => { router.push("/events/configure-event") }}
              className="cursor-pointer flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                <div className="w-auto h-[37px] flex flex-row items-center justify-center pt-[5.369999885559082px] px-[7px] pb-[5.370001792907715px] box-border">
                  <div className="flex flex-col items-start justify-start">
                    <div className="flex flex-row items-start justify-start">
                      <img
                        className="h-[26.3px] w-[23px] relative overflow-hidden shrink-0"
                        loading="lazy"
                        alt=""
                        src="ModuloEvento/FlechaIzquerda.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-0 pr-[9px] pl-0 ml-[-0.01px]">
                <div className="overflow-hidden flex flex-col items-start justify-start">
                  <div className="w-[134px] h-[31.5px] relative leading-[31.5px] font-semibold inline-block max-h-[31.5px]">
                    Asistencia
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <div className="w-[35px] rounded-md bg-slate-200 box-border flex flex-row items-center justify-center pt-[6.25px] px-[9px] pb-[6.250001907348633px] max-w-[35px]">
            <div className="flex flex-col items-center justify-start pt-[3.75px] px-0 pb-[4.489999771118164px]">
              <div className="flex flex-row items-start justify-start">
                <img
                  className="h-[16.3px] w-[15.8px] relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="ModuloEvento/trespuntos.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-auto flex flex-col items-start justify-start pt-0 px-5 pb-0 box-border gap-[11px] shrink-0">
        <AsisComp1 />
        <AsisComp2 />
      </div>
    </div>
  );
};

export default Asistencia;