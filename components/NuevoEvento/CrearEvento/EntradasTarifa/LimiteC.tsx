import { FC } from "react";
import C2 from "./Sub-Componentes/C2";
interface propsLimiteC {
    componentState: any;
    setComponentState: any;
  
  }
const LimiteC: FC <propsLimiteC> = ({componentState, setComponentState}) => {
  return (
    <div className="w-[100%] max-w-full flex flex-row items-start justify-start tracking-[normal]">
      
      <section className="rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start py-[21px] pr-[20.89999999999418px] pl-[21px] box-border gap-[0.5px] max-w-full text-left text-sm text-black font-semibold">
        
        <div className="self-stretch flex flex-row items-start justify-start gap-[29.30000000000291px] max-w-full mq800:flex-wrap">
          <div className="w-full flex flex-col items-start justify-start gap-[7px] min-w-[453px] max-w-full mq675:min-w-full mq800:flex-1">
            <div className="relative leading-[21px] font-semibold">
              Máximo por link de venta
            </div>
            <div className="flex flex-row items-start justify-start pt-0 px-0 pb-[3.5px] text-smi-3 text-gray-400">
              <div className="relative leading-[17.5px] font-medium text-xs">
              Máximo número de entradas totales que se pueden comprar a través del Link oficial .
              </div>
            </div>
            <div className="self-stretch h-9 flex flex-row items-start justify-center py-0 pr-5 pl-[39px] box-border text-center text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-dodger-blue font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-1-font-awesome-5-free-regular-14">
              <div className="self-stretch bg-slate-100 rounded-md w-[235.9px] flex flex-row items-center justify-center">
                    
                    <div className="self-stretch w-[31.5px] flex flex-col items-start justify-start">
                      <div className="self-stretch flex-1 rounded-tl-md rounded-tr-none rounded-br-none rounded-bl-md bg-slate-200 flex flex-row items-start justify-start py-[11px] px-2.5">
                        <div className="self-stretch flex-1 relative leading-[14px] flex items-center justify-center">
                          +
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex flex-col items-center justify-center text-gray-600 font-semibold">
                      <div className="self-stretch flex flex-row items-center justify-center relative">
                        
                        <div className="flex flex-col items-center justify-center text-left">
                          <div className="relative leading-[21px] inline-block min-w-[35px]">
                            5000
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="self-stretch w-[31.5px] flex flex-col items-start justify-start">
                      <div className="self-stretch flex-1 rounded-tl-none rounded-tr-md rounded-br-md rounded-bl-none bg-slate-200 flex flex-row items-start justify-start py-[11px] px-2.5">
                        <div className="self-stretch flex-1 relative leading-[14px] flex items-center justify-center">
                          -
                        </div>
                      </div>
                    </div>


              </div>
            </div>
            <div className="relative leading-[21px] font-semibold">
              Número de entradas 
            </div>
            <div className="relative text-xs leading-[17.5px] text-gray-400 font-medium inline-block max-h-[17.5px] max-w-full">
              Número de entradas simultáneas que se pueden comprar.

            </div>
          </div>

          <div className="flex-1 flex flex-col items-start justify-start gap-[14px] min-w-[307px] max-w-full">
            <C2
              title="Grupos y equipos internos"
              text=" Los grupos y equipos no pueden apuntar en esta tarifa."
            />
            <C2
              title="Usuarios especiales"
              text=" No hay usuarios especiales"
              color="#FFFBEB"
            />
          </div>

        </div>

        <div className="w-[471.8px] flex flex-row flex-wrap items-end justify-start gap-[66.80000000000291px] max-w-full mq675:gap-[33px]">
          <div className="flex flex-col items-start justify-end pt-0 px-0 pb-0.5">
            <div className="flex flex-row items-start justify-start gap-[10.5px]">
              <div className="h-8 w-8 relative items-center justify-center rounded-full bg-slate-100 shadow-[0px_2px_4px_rgba(0,_0,_0,_0.06)_inset] overflow-hidden shrink-0">
                <img
                  className="w-auto h-auto py-[10px] px-[10px] overflow-hidden"
                  loading="lazy"
                  alt=""
                  src="ModuloEvento/icon.svg"
                />
              </div>
              <div className="flex flex-col items-start justify-start pt-[5.5px] px-0 pb-0">
                <div className="relative leading-[21px] font-medium">
                  Links RRPPs y oficiales
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-row items-start justify-start min-w-[136px] text-center text-xs text-gray-600 gap-2">
            
            <div className="h-[50px] w-full flex flex-col items-start justify-start">
              <div className="flex flex-row items-start justify-start py-0 pr-[29px] pl-[29.099999999998545px]">
                <b className="w-[42px] relative leading-[14px] uppercase flex items-center justify-center min-w-[42px] max-w-[100px]">
                  Mínimo
                </b>
              </div>
              
              <div className="self-stretch bg-slate-100 flex flex-row items-center justify-between pl-0 text-sm text-gray-600 font-semibold">

                      
                      <div className="self-stretch flex-1 flex flex-col items-start justify-start">
                        <div className="self-stretch flex-1 rounded-tl-md rounded-tr-none rounded-br-none rounded-bl-md bg-slate-200 flex flex-row items-start justify-start py-[11px] px-2.5">
                          <div className="self-stretch flex-1 relative leading-[14px] flex items-center justify-center">
                           +
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex flex-col items-start justify-start">
                        <div className="self-stretch flex flex-row items-center justify-center py-0 px-px relative">
                          <div className=" flex flex-col items-start justify-start">
                            <div className="relative leading-[21px] inline-block min-w-[7px]">
                              1
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col items-start justify-start">
                        <div className="self-stretch flex-1 rounded-tl-none rounded-tr-md rounded-br-md rounded-bl-none bg-slate-200 flex flex-row items-start justify-start py-[11px] px-2.5">
                          <div className="self-stretch flex-1 relative leading-[14px] flex items-center justify-center">
                           +
                          </div>
                        </div>
   
                </div>
              </div>

            </div>

            <div className="h-[50px] w-full flex flex-col items-end justify-start">
              <div className="flex flex-row items-start justify-end py-0 pr-[26.900000000001455px] pl-[27px]">
                <b className="w-[46px] relative leading-[14px] uppercase flex items-center justify-center min-w-[46px] max-w-[100px]">
                  Máximo
                </b>
              </div>
              <div className="self-stretch bg-slate-100 flex flex-row items-center justify-between pl-0 text-sm text-gray-600 font-semibold">

                      
                      <div className="self-stretch flex-1 flex flex-col items-start justify-start">
                        <div className="self-stretch flex-1 rounded-tl-md rounded-tr-none rounded-br-none rounded-bl-md bg-slate-200 flex flex-row items-start justify-start py-[11px] px-2.5">
                          <div className="self-stretch flex-1 relative leading-[14px] flex items-center justify-center">
                           +
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex flex-col items-start justify-start">
                        <div className="self-stretch flex flex-row items-center justify-center py-0 px-px relative">
                          <div className=" flex flex-col items-start justify-start">
                            <div className="relative leading-[21px] inline-block min-w-[7px]">
                              5
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col items-start justify-start">
                        <div className="self-stretch flex-1 rounded-tl-none rounded-tr-md rounded-br-md rounded-bl-none bg-slate-200 flex flex-row items-start justify-start py-[11px] px-2.5">
                          <div className="self-stretch flex-1 relative leading-[14px] flex items-center justify-center">
                           +
                          </div>
                        </div>
   
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default LimiteC;