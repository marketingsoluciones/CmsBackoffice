import { FC } from "react";
import { useRouter } from 'next/router';
interface propsInformesTabs {
    componentState: any;
    setComponentState: any;
  
  }

const InformesTabs: FC <propsInformesTabs> = ({componentState, setComponentState}) => {
  const router = useRouter()

  return (
        <div className="w-full max-w-full flex flex-col items-start justify-start pt-[6.299999999999272px] px-[35px] pb-[49px] box-border gap-[6.200000000000728px] leading-[normal] tracking-[normal] text-left text-base-8 ">
        <div className="h-[24.5px] overflow-hidden shrink-0 flex flex-row items-end justify-start pt-0 px-0 pb-[0.7999999999992724px] box-border">
          <div className="relative leading-[24.5px] font-semibold inline-block min-w-[67.8px] shrink-0 [debug_commit:f6aba90]">
            Disponibles
          </div>
        </div>
        
        <div onClick={() => { router.push("/events/reports-tap") }}
        className="cursor-pointer w-[354px] flex flex-col items-start justify-center max-w-full text-sm">
          <div className="self-stretch flex flex-col items-start justify-start max-w-full">

            <div className="self-stretch rounded-md bg-white shadow-[0px_3px_6px_-1px_rgba(0,_0,_0,_0.1),_0px_2px_4px_-1px_rgba(0,_0,_0,_0.06)] overflow-hidden flex flex-col items-start justify-start max-w-full">
              
              <div className="self-stretch bg-blue-200 flex flex-row items-center justify-start py-[17.5px] pr-[251px] pl-3.5 gap-[10px] mq450:pr-5 mq450:box-border">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-3.5 w-3.5 relative overflow-hidden shrink-0"
                    alt=""
                    src="/ModuloEvento/recuento.svg"
                  />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <div className="relative leading-[21px] font-semibold inline-block min-w-[65px] text-blue-700">
                    Recuento
                  </div>
                </div>
              </div>
              <div className="self-stretch rounded-t-none rounded-b-sm bg-profourvenuescom-nero flex flex-row items-center justify-start pt-[13.5px] px-3.5 pb-[14.5px] box-border max-w-full text-2xs-5 text-profourvenuescom-slate-gray">
                <div className="flex-1 relative leading-[14px] inline-block max-w-full text-sm text-gray-400">
                Genera informes con las ventas realizadas por cada canal de venta en un periodo de tiempo.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
  );
};

export default InformesTabs;