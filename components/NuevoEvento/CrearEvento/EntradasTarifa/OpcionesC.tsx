import { FC } from "react";
import C1 from "./Sub-Componentes/C1";
import Checkbox from "../Checkbox1";
interface propsOpcionesC {
    componentState: any;
    setComponentState: any;
  
  }

const OpcionesC: FC <propsOpcionesC> = ({componentState, setComponentState}) => {
  return (
    <div className="w-auto max-w-full flex flex-row items-start justify-start tracking-[normal] text-left text-sm text-black font-semibold">
      <div className="rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-row flex-wrap items-start justify-start py-[21px] pr-[20.89999999999418px] pl-[21px] box-border gap-[10.5px] max-w-full mq675:pt-5 mq675:pb-5 mq675:box-border">
        <div className="flex-1 flex flex-col items-start justify-start min-w-[307px] max-w-full">
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[7px]">
              <div className="relative leading-[21px] font-semibold inline-block min-w-[90px]">
                Activar venta
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[10.5px] text-rosa font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-1-font-awesome-5-free-regular-14">
              <C1
                icon="/ModuloEvento/e.svg"
                title="Efectivo"
                text="Autoriza a los usuarios profesionales y colaboradores externos la venta física, y registra el importe recaudado en efectivo por cada uno de ellos."
              />
              <C1
                icon="/ModuloEvento/m.svg"
                title="Venta por microsite"
                text="Activa la venta online en los links oficiales y canales de
                venta."
              />
              <C1
                icon="/ModuloEvento/l.svg"
                title="Pago por link"
                text="Permite a los usuarios profesionales y colaboradores externos crear enlaces de activación y enviarlos a sus clientes para completar el proceso de compra"
                autorizaALosWidth="14px"
                propWidth="415.8px"
              />
              <C1
                icon="/ModuloEvento/i.svg"
                title="Impreso"
                text="Autoriza a los usuarios profesionales y colaboradores externos la venta en papel, y registra el importe recaudado en efectivo por cada uno de ellos."
                autorizaALosWidth="14px"
                propWidth="415.8px"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-start justify-start gap-[8.75px] min-w-[307px] max-w-full">
          <div className="relative leading-[21px] font-semibold">
            ¿Cuándo empieza la venta?
          </div>
          <div className="w-full flex flex-row items-start justify-start max-w-full [row-gap:20px] mq675:flex-wrap">
            <div className="flex-1 flex flex-col items-start justify-start gap-[3.5px] min-w-[200px]">
              <div className="w-full flex flex-col items-start justify-start py-0 pr-[7px] pl-0 box-border max-w-[307px]">
                <div className="self-stretch flex flex-col items-start justify-start">
                  <div className="self-stretch rounded-md bg-slate-200 flex flex-row items-center justify-start py-0 pr-[136px] pl-[10.5px] gap-[7px] mq675:pr-5 mq675:box-border">
                    <div className="h-3.5 flex flex-row items-start justify-start">
                      <img
                        className="h-3.5 w-[12.3px] relative overflow-hidden shrink-0"
                        alt=""
                        src="/ModuloEvento/calcal.svg"
                      />
                    </div>
                    <div className="relative leading-[36px] font-medium">
                      {" "}
                      26 de ene. de 2024
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center pt-0 px-0 pb-[7px] text-xs-9 text-black font-medium  py-0 pr-[6.400000000008731px] pl-[7px] ">
                
                  
                  <div className="flex items-start justify-start">
      
                      <Checkbox/>
                   
                  </div>
                  <div className="relative leading-[24px] text-black inline-block min-w-[94px]">
                    Activar contador
                  </div>

                
              </div>
              <div className="flex flex-row items-start justify-start pt-0 px-0 pb-[3.5px]">
                <div className="relative leading-[21px] font-semibold">
                  Cambios de nombre
                </div>
              </div>

              <div className="flex flex-row items-center justify-center pt-0 px-0 pb-[7px] text-xs-9 text-black font-medium  py-0 pr-[6.400000000008731px] pl-[7px] ">
                
                  
                <div className="flex items-start justify-start">
    
                    <Checkbox/>
                 
                </div>
                <div className="relative leading-[24px] text-black inline-block min-w-[94px]">
                Permitir cambios de nombre
                </div>

              
            </div>

            </div>
            <div className="h-9 w-auto rounded-md bg-slate-200 box-border flex flex-row items-start justify-start pt-px pb-[7.5px] pr-[7px] pl-[9px] gap-[12px] border-[1px] border-solid border-slate-300">
              <div className="flex flex-row items-start justify-start gap-[4.30000000000291px]">
                <div className="flex flex-col items-start justify-start pt-2.5 px-0 pb-0">
                  <div className="relative leading-[14px] inline-block min-w-[14.2px] shrink-0 [debug_commit:f6aba90] ">
                    <img src="/ModuloEvento/relog1.svg" alt="" />
                  </div>
                </div>
                <div className="relative leading-[36px] font-medium inline-block min-w-[35px] shrink-0 [debug_commit:f6aba90]">
                  16:15
                </div>
              </div>
              <div className="h-[27.5px] flex flex-col items-start justify-start pt-[6.5px] px-0 pb-0 box-border">
                <img
                  className="w-[16px] h-[16px] relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/ModuloEvento/fff.svg"
                />
              </div>
            </div>
            
          </div>
          <div className="self-stretch rounded-md box-border flex flex-col items-start justify-start py-[15px] px-3.5 gap-[7px] max-w-full border-[1px] border-solid border-slate-200">
            <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-[3px] pl-0">
              <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[9px] pl-0 box-border gap-[7px] min-w-[120px]">
                <div className="relative leading-[21px] font-semibold inline-block min-w-[31px]">
                  Tipo
                </div>
                <div className="self-stretch h-9 rounded-md bg-slate-200 box-border flex flex-row items-start justify-between pt-px px-2.5 pb-[7.5px] gap-[20px] border-[1px] border-solid border-slate-300">
                  <div className="relative leading-[36px] font-medium">
                    Pagar diferencia de precio
                  </div>
                  <div className="h-[27.5px] flex flex-col items-start justify-start pt-[6.5px] px-0 pb-0 box-border">
                    <img
                      className="w-[16px] h-[16px] relative overflow-hidden shrink-0"
                      alt=""
                      src="/ModuloEvento/fff.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="h-16 w-[140px] flex flex-col items-start justify-start z-[1] ml-[-2.1px]">
                <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[7px]">
                  <div className="relative leading-[21px] font-semibold inline-block min-w-[50px] max-w-[140px]">
                    Mínimo
                  </div>
                </div>
                <div className="self-stretch flex-1 flex flex-row bg-slate-100 rounded-md items-start justify-start text-center text-gray-600 font-semibold">
                  <div className="self-stretch flex-1 flex flex-row items-start justify-start">
                    <div className="self-stretch w-[31.5px] flex flex-col items-start justify-start">
                      <div className="self-stretch flex-1 rounded-tl-md rounded-tr-none rounded-br-none rounded-bl-md bg-slate-200 flex flex-row items-start justify-start py-[11px] px-2.5">
                        <div className="self-stretch flex-1 relative leading-[14px] flex items-center justify-center">
                         +
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col  items-start justify-start ">
                      <div className="self-stretch flex flex-row items-center justify-center py-0 px-px relative">
                        <div className="!m-[0] absolute top-[7.5px] left-[28.6px] flex flex-col items-start justify-start z-[1] text-left text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-ebony">
                          <div className="relative leading-[21px] inline-block min-w-[20px]">
                            1 €
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
              </div>
            </div>
            <div className="relative text-xs leading-[14px] text-gray-400 inline-block max-w-full font-medium">
              <span>{`Fourvenues cobrará `}</span>
              <b>0,5 €</b>
              <span>
                {" "}
                fijos más IVA por la gestión de cada cambio de nombre
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpcionesC;
