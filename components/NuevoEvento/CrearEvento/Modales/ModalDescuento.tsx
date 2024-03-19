import { FC, memo, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
interface propsModalDescuentos {
    addDescuento:any
    setAddDescuento:any
   }

const ModalDescuentos: FC <propsModalDescuentos> = ({addDescuento, setAddDescuento}) => {
  const [inputValue, setInputValue] = useState("");
  const [divplaceholderValue, setDivplaceholderValue] = useState("");

  return (
    <ClickAwayListener onClickAway={() => addDescuento && setAddDescuento(false)}>

    <div className="w-full flex flex-col overflow-hidden items-center justify-center tracking-[normal] text-left text-base-8 text-black font-medium mq416:max-w-full">
      <div className="self-stretch flex flex-col items-start justify-start max-w-full">
        <div className="self-stretch flex flex-row items-start justify-start pb-[22px] border-b-[1.3px] border-solid border-slate-200">
          <div className="h-[25px] w-full relative leading-[25px] font-semibold inline-block ">
            Añadir
          </div>
        </div>
        <div className="self-stretch overflow-hidden flex flex-col items-end justify-start pt-[8.600000000000364px] pb-[19.100000000000364px] pr-[21px] pl-[20.900000000001455px] box-border gap-[21.5px] max-h-[316px] max-w-full text-sm text-gray-600">
          <div className="self-stretch flex flex-col items-start justify-start gap-[7px]">
            <div className="w-full h-[17.5px] relative leading-[17.5px] font-semibold inline-block ">
              Código
            </div>
            <div className="flex flex-col items-start justify-start gap-[2.4px] text-center">
              <div className="flex flex-row w-full items-start justify-start gap-[7px]">
                
                <input
                  className="[outline:none] bg-slate-200 w-[240px]  h-[37px] rounded-md box-border"
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                />

                  <div className="w-[100px] rounded-md bg-slate-200 box-border flex flex-row items-center justify-center pt-[9.699999999999818px] pb-[9.800000000000182px] px-[17px] gap-[9.6px] border-[1px] border-solid border-slate-200">
                    <div className="w-auto flex flex-col items-center justify-start pt-[1.300000000000182px] px-0 pb-[3.199999999999818px] box-border">
                      <div className="self-stretch h-[13px] relative leading-[13px] inline-block min-w-[13px]">
                        
                      </div>
                    </div>
                    <div className="w-auto flex flex-col items-center justify-start">
                      <div className="self-stretch h-[17.5px] relative leading-[17.5px] font-semibold inline-block max-h-[17.5px]">
                        Activo
                      </div>
                    </div>
                  </div>
              
              </div>
              <div className="w-auto h-7 relative text-xs leading-[14px] font-medium text-gray-400 text-left inline-block">
                <p className="m-0">
                  Este es el código que difundirás entre tus clientes. Por
                  ejemplo:
                </p>
                <p>"PROMO50"</p>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[7px] max-w-full">
            <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold inline-block min-w-[72px] max-h-[17.5px]">
              Descripción
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[2.5px] max-w-full text-2xs-5 text-gray-400">
                  <div className="flex-1 rounded-md bg-slate-200 box-border flex flex-col items-start justify-start pt-[9.800000000000182px] pb-[9.699999999999818px] pr-[7px] pl-[11px] max-w-full">
                    <input
                      className="[border:none] [outline:none] bg-[transparent] self-stretch h-[18px] overflow-hidden shrink-0 flex flex-col items-start justify-start pt-0 pb-[0.5px] pr-[181.5px] pl-0 box-border text-sm text-gray-400 min-w-[211px]"
                      placeholder="Escribe una descripción..."
                      type="text"
                      value={divplaceholderValue}
                      onChange={(event) =>
                        setDivplaceholderValue(event.target.value)
                      }
                    />
              </div>
              <div className="w-auto h-7 relative leading-[14px] inline-block max-w-full">
                <p className="m-0">
                  Esto te ayudará a identificar este código. Por ejemplo:
                  "Promoción de
                </p>
                <p className="m-0">septiembre.</p>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[6.9px]">
            <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold inline-block min-w-[65px] max-h-[17.5px] shrink-0">
              Descuento
            </div>
            <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[7px] shrink-0 text-center text-sm text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-gull-gray font-www-fourvenues-com-es-christian-lanza1-events-playa-y-rumba-29-02-2024-81y9-tickets-clrusb7w7018g01aeancrb2z0sg4m98f-1358x573-default-font-awesome-5-free-regular-123-upper">
              
              <div className="h-[37px] flex flex-row rounded-md overflow-hidden items-start justify-start text-gray-400 shrink-0 [debug_commit:1cbd860]">
                <div className="self-stretch w-[31.5px] bg-slate-200 flex flex-row items-start justify-start pt-2.5 px-2.5 pb-[13px] box-border shrink-0 [debug_commit:1cbd860]">
                  <div className="h-full flex-1 relative leading-[14px] flex items-center justify-center max-h-[36.9900016784668px]">
                    -
                  </div>
                </div>
                <div className="bg-slate-100 flex flex-row items-start justify-start pt-[9.300000000000182px] pb-[10.199999999999818px] pr-12 pl-[48.70000000000073px] shrink-0 [debug_commit:1cbd860] text-left text-slategray font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-discount-codes-16475x71625-default-inter-semi-bold-123">
                  <div className="h-[17.5px] w-[22.3px] relative leading-[17.5px] inline-block min-w-[22.3px]">
                    0 €
                  </div>
                </div>
                <div className="self-stretch w-[31.5px] bg-slate-200 flex flex-row items-start justify-start pt-2.5 px-2.5 pb-[13px] box-border shrink-0 [debug_commit:1cbd860] text-dodgerblue">
                  <div className="h-full flex-1 relative leading-[14px] flex items-center justify-center max-h-[36.9900016784668px]">
                    +
                  </div>
                </div>
              </div>
              

                  <div className="flex-1 rounded-md bg-slate-200 overflow-hidden min-w-[118px] flex flex-row items-center justify-between py-2 pr-[10.5px] pl-[10.5px] relative">
                    <div className="flex flex-col items-start justify-center">
                      <div className="self-stretch w-6 h-[21px]  overflow-hidden leading-[21px] flex flex-col items-start justify-start text-black">

                          Fijo
                        </div>
                     
                    </div>
                    <div className="my-0 mx-[!important] h-[37.84%] top-[28.38%] right-[16.8px] bottom-[33.78%] flex flex-col items-start justify-end text-gray-600">
                      <div className="w-auto h-auto leading-[21px] inline-block min-w-[13px]">
                        <img src="ModuloEvento/arrowbajo.svg" alt="" />
                      </div>
                    </div>
                  
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row flex-wrap items-center justify-end py-[21px] pr-[21.099999999998545px] pl-[209px] [row-gap:20px] border-t-[1.3px] border-solid border-slate-200">
        
        <div onClick={() => setAddDescuento(!addDescuento)} className="cursor-pointer [border:none] py-0 pr-[7px] pl-0 bg-[transparent] flex-1 flex flex-col items-start justify-start box-border min-w-[64px]">
          
          <div className="w-full rounded-md bg-slate-200 box-border flex flex-row items-center justify-center pt-[9.800000000000182px] px-[17px] pb-[9.699999999999818px] max-w-[91px]">
              <div className="self-stretch h-[17.5px] relative text-smi-3 leading-[17.5px] font-semibold text-gray-600 text-center inline-block min-w-[54px] max-h-[17.5px]">
                Cancelar
              </div>
          </div>

        </div>

        <button className="cursor-pointer pt-[9.800000000000182px] px-[17px] pb-[9.699999999999818px] bg-rosa w-[86px] rounded-md box-border flex flex-row items-center justify-center max-w-[86px]">
          <div className="w-auto flex flex-col items-center justify-start">
            <div className="self-stretch h-[17.5px] relative text-smi-3 leading-[17.5px] font-medium text-white text-center inline-block min-w-[49px] max-h-[17.5px]">
              Guardar
            </div>
          </div>
        </button>
      </div>
    </div>
    </ClickAwayListener>
  );
};

export default ModalDescuentos;