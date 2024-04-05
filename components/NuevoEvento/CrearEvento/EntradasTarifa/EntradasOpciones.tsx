import { FC } from "react";
import EntradaTabsC from "./Sub-Componentes/EntradaTabsC";
interface propsEntradasOpciones {
  componentState: any;
  setComponentState: any;

}

const EntradasOpciones: FC <propsEntradasOpciones> = ({componentState, setComponentState}) => {
  return (
    <div className="w-full relative flex flex-col items-start justify-start pt-0 px-0 pb-10 box-border tracking-[normal] text-left text-7xl-3 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-ebony font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263">
      
      <div className="self-stretch w-full flex flex-row items-center justify-between max-w-full py-14 px-14 gap-3">
                  <div className="flex gap-2 items-center justify-start">
                    <div onClick={()=>{ 
        setComponentState(13)
      }} className="cursor-pointer h-[26px] flex flex-row items-start justify-start">
                            <img
                              className="h-[26px] w-[23px] relative overflow-hidden shrink-0"
                              loading="lazy"
                              alt=""
                              src="ModuloEvento/FlechaIzquerda.svg"
                            />
                    </div>

                        <div className="relative leading-[31.5px] font-semibold inline-block max-h-[31.5px] mq675:text-2xl mq675:leading-[25px]">
                          Crear tarifa de entrada
                        </div>
                  </div>

            <div className="w-auto flex flex-row items-start justify-start gap-[5px] max-w-full mq450:flex-wrap">
              
              <div className="rounded-md flex flex-row bg-white hover:bg-slate-200 items-start justify-start py-0 pr-[10.299999999999272px] pl-[10.400000000001455px] box-border border-solid border-[1px] border-slate-300 gap-[6.8px] min-w-[73px] mq450:flex-1">
                <div className="w-auto flex flex-col items-start justify-start pt-2.5 px-0 pb-0 box-border">
                  <div className="self-stretch h-3.5 relative leading-[14px] inline-block min-w-[14px]">
                    <img src="ModuloEvento/checksito.svg" alt="" />
                  </div>
                </div>
                <div className="h-9 leading-[36px] font-medium text-black inline-block min-w-[71px] text-base">
                  Disponible
                </div>
              </div>
              <div className="rounded-md flex flex-row bg-white hover:bg-slate-200 items-start justify-start py-0 pr-[10.299999999999272px] pl-[10.400000000001455px] box-border border-solid border-[1px] border-slate-300 gap-[6.8px] min-w-[73px] mq450:flex-1">
                <div className="w-auto flex flex-col items-start justify-start pt-2.5 px-0 pb-0 box-border">
                  <div className="self-stretch h-3.5 relative leading-[14px] inline-block min-w-[14px]">
                    <img src="ModuloEvento/ojo.svg" alt="" />
                  </div>
                </div>
                <div className="w-auto h-9 leading-[36px] font-medium text-black inline-block text-base">
                  Visible
                </div>
              </div>


              <div className="flex flex-row items-start justify-start gap-[8px] text-center text-white text-base ">
                <div className="rounded-md bg-rosa flex flex-row items-start justify-start py-0 px-2.5">
                  <div className="h-9 w-auto relative leading-[36px] font-medium inline-block ">
                    Guardar
                  </div>
                </div>

                    <div className="rounded-md bg-slate-200 flex flex-row items-start justify-end pt-2.5 px-[10.5px] pb-[11.600000000000364px]">
                      <div className="h-[14.4px] flex flex-row items-start justify-start">
                        <img
                          className="h-[14.4px] w-3.5 relative overflow-hidden shrink-0"
                          alt=""
                          src="ModuloEvento/trespuntos.svg"
                        />
                  </div>
                </div>
              </div>

            </div>

                    
      </div>

      <EntradaTabsC componentState={componentState} setComponentState={setComponentState}/>

    </div>
  );
};

export default EntradasOpciones;