import { FC } from "react";
import ClickAwayListener from "react-click-away-listener";
interface propsModalPrecio {
  
  componentState?: any
  setComponentState?: any
    addAñadirPrecio?:any
    setAddAñadirPrecio?:any
  }


const ModalPrecio: FC <propsModalPrecio> = ({addAñadirPrecio, setAddAñadirPrecio, componentState, setComponentState}) => {
  return (
<ClickAwayListener onClickAway={() => addAñadirPrecio && setAddAñadirPrecio(false)}>
    <div className="w-[100%] max-w-full flex flex-col items-start justify-start gap-[12px] tracking-[normal]">
    
    <div className="flex flex-row w-full items-center justify-start gap-2 pt-[21px] px-[21px] pb-[22px] text-left text-base-8 border-b-[1px] border-solid border-slate-200">

          
          <div onClick={() => {setAddAñadirPrecio(!addAñadirPrecio)}} className=" cursor-pointer flex flex-col items-start justify-start px-[7px]">

                  <img
                    className="h-auto w-auto overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/fle.svg"
                  />

          </div>

          <div className="flex flex-col items-start justify-center pt-[5.299999999999272px] px-0 pb-[6.700000000000728px]">
            <div className="relative leading-[25px] font-semibold inline-block min-w-[97px]">
              Editar precio
            </div>
          </div>
    </div>

    <div className="self-stretch overflow-hidden flex flex-col items-start justify-start pt-0 px-[20.900000000001455px] pb-[21px] box-border relative gap-[7.5px] max-h-[493px] max-w-full text-left text-smi-3 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-create-1318x573-default-fiord font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263">
      
      <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[2.5px] gap-[7px]">
        <div className="relative leading-[17.5px] font-semibold inline-block min-w-[38px] max-h-[17.5px] text-base text-gray-600">
          Precio
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[10.5px] text-center text-sm text-gray-600">
          
          <div className="h-[37px] flex flex-row items-start justify-start">
            <div className="self-stretch w-[31.5px] rounded-tl-md rounded-tr-none rounded-br-none rounded-bl-md bg-slate-200 flex flex-row items-start justify-start pt-[11.799999999999272px] px-2.5 pb-[11.200000000000728px] box-border">
              <div className="h-full flex-1 relative leading-[14px] flex items-center justify-center max-h-[37px]">
               +
              </div>
            </div>
            <button className="cursor-pointer [border:none] py-2.5 pr-[45.099999999998545px] pl-[45.5px] bg-slate-100 flex flex-row items-start justify-start hover:bg-gainsboro-100">
              <div className="relative text-sm leading-[17px] text-left inline-block min-w-[28.9px]">
                10 €
              </div>
            </button>
            <div className="self-stretch w-[31.5px] rounded-tl-none rounded-tr-md rounded-br-md rounded-bl-none bg-slate-200 flex flex-row items-start justify-start pt-[11.799999999999272px] px-2.5 pb-[11.200000000000728px] box-border">
              <div className="h-full flex-1 relative leading-[14px] flex items-center justify-center max-h-[37px]">
                -
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-row items-start justify-start gap-[5px] text-left text-smi-3 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-create-1318x573-default-fiord font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263">
            
            <div className="w-full flex flex-col items-start justify-start gap-[7px] min-w-[118px]">
              <div className="w-full relative leading-[17.5px] font-semibold inline-block min-w-[108px] max-h-[17.5px]">
                Gastos de gestión
              </div>
              <div className="w-full h-[37px] flex flex-row items-start justify-between text-center text-sm text-gray-600">
              
            <div className="self-stretch w-[20%] rounded-tl-md rounded-tr-none rounded-br-none rounded-bl-md bg-slate-200 flex flex-row items-start justify-start pt-[11.799999999999272px] px-2.5 pb-[11.200000000000728px] box-border">
              <div className="h-full flex-1 relative leading-[14px] flex items-center justify-center max-h-[37px]">
               +
              </div>
            </div>
            <button className="w-full cursor-pointer [border:none] py-2.5 bg-slate-100 flex flex-row items-start justify-center hover:bg-gainsboro-100">
              <div className="relative text-sm leading-[17px] text-left inline-block min-w-[28.9px]">
                8 %
              </div>
            </button>
            <div className="self-stretch w-[20%] rounded-tl-none rounded-tr-md rounded-br-md rounded-bl-none bg-slate-200 flex flex-row items-start justify-start pt-[11.799999999999272px] px-2.5 pb-[11.200000000000728px] box-border">
              <div className="h-full flex-1 relative leading-[14px] flex items-center justify-center max-h-[37px]">
                -
              </div>
            </div>
          
              </div>

            </div>

            <div className="w-full flex flex-col items-start justify-end pt-[24.5px] px-0 pb-0 box-border min-w-[118px] text-sm text-gray-600">
              <div className="self-stretch rounded-md bg-slate-200 overflow-hidden flex flex-row items-center justify-between py-2 pr-[35px] pl-[10.5px] relative">
                <div className="flex flex-col items-start justify-center">
                  <div className="self-stretch overflow-hidden flex flex-col items-start justify-start">
                    <div className="relative leading-[21px] inline-block min-w-[71px]">
                      Porcentaje
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start">
                  <div className="relative leading-[14px] inline-block min-w-[13px]">
                   <img src="ModuloEvento/dd.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-1.5 box-border max-w-full text-sm text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-ebony">
        <div className="flex-1 flex flex-col items-start justify-start gap-[7px] max-w-full">
          
          <div className="self-stretch rounded-md bg-slate-100 flex flex-row flex-wrap items-center justify-start py-[10.5px] pr-[9.80000000000291px] pl-[10.5px] [row-gap:20px]">
            <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border min-w-[202px]">
              <div className="self-stretch flex flex-col items-start justify-start">
                <div className="self-stretch flex flex-col items-start justify-start">
                  <div className="relative leading-[21px] inline-block min-w-[84px]">
                    Cliente paga
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start text-xs text-gray-400 font-medium">
                  <div className="relative leading-[14px]">
                    Entrada + gastos de gestión
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start text-blue-600">
              <div className="relative leading-[21px] inline-block min-w-[41px]">
                10,8 €
              </div>
            </div>
          </div>
          <div className="self-stretch rounded-md bg-slate-100 flex flex-row flex-wrap items-center justify-start py-[10.5px] pr-[9.80000000000291px] pl-[10.5px] [row-gap:20px]">
            <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border min-w-[202px]">
              <div className="self-stretch flex flex-col items-start justify-start">
                <div className="self-stretch flex flex-col items-start justify-start">
                  <div className="relative leading-[21px] inline-block min-w-[84px]">
                  Pasarela de pago
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start text-xs text-gray-400 font-medium">
                  <div className="relative leading-[14px]">
                  7,00 %
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start text-orange-600">
              <div className="relative leading-[21px] inline-block min-w-[41px]">
              -0,76 €
              </div>
            </div>
          </div>
          <div className="self-stretch rounded-md bg-slate-100 flex flex-row flex-wrap items-center justify-start py-[10.5px] pr-[9.80000000000291px] pl-[10.5px] [row-gap:20px]">
            <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border min-w-[202px]">
              <div className="self-stretch flex flex-col items-start justify-start">
                <div className="self-stretch flex flex-col items-start justify-start">
                  <div className="relative leading-[21px] inline-block min-w-[84px]">
                  Recibes
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start text-xs text-gray-400 font-medium">
                  <div className="relative leading-[14px]">
                  Pago cliente - coste pasarela
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start text-green-600">
              <div className="relative leading-[21px] inline-block min-w-[41px]">
              10,04 €
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[2.5px] gap-[7px]">
        <div className="relative leading-[17.5px] font-semibold inline-block min-w-[38px] max-h-[17.5px] text-base text-gray-600">
        Límite de entradas
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[10.5px] text-center text-sm text-gray-600">
          
          <div className="h-[37px] flex flex-row items-start justify-start">
            <div className="self-stretch w-[31.5px] rounded-tl-md rounded-tr-none rounded-br-none rounded-bl-md bg-slate-200 flex flex-row items-start justify-start pt-[11.799999999999272px] px-2.5 pb-[11.200000000000728px] box-border">
              <div className="h-full flex-1 relative leading-[14px] flex items-center justify-center max-h-[37px]">
               +
              </div>
            </div>
            <button className="cursor-pointer [border:none] py-2.5 pr-[45.099999999998545px] pl-[45.5px] bg-slate-100 flex flex-row items-start justify-start hover:bg-gainsboro-100">
              <div className="relative text-sm leading-[17px] text-left inline-block min-w-[28.9px]">
                1000
              </div>
            </button>
            <div className="self-stretch w-[31.5px] rounded-tl-none rounded-tr-md rounded-br-md rounded-bl-none bg-slate-200 flex flex-row items-start justify-start pt-[11.799999999999272px] px-2.5 pb-[11.200000000000728px] box-border">
              <div className="h-full flex-1 relative leading-[14px] flex items-center justify-center max-h-[37px]">
                -
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="relative text-sm leading-[17.5px] font-semibold text-gray-600 text-left inline-block min-w-[98px] max-h-[17.5px]">
            Límite de fechas
        </div>

      <div className="w-[100%] flex flex-row items-start justify-start max-w-full gap-2 text-sm text-gray-600">
        <div className="w-full flex flex-col items-start justify-start box-border">
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="self-stretch rounded-MD bg-slate-100 flex flex-row items-center justify-start py-0 pr-[65.19999999999709px] pl-[10.5px] gap-[7px]">
              <div className="h-3.5 flex flex-row items-start justify-start">
                <img
                  className="h-3.5 w-[12.3px] relative overflow-hidden shrink-0"
                  alt=""
                  src="ModuloEvento/calcal.svg"
                />
              </div>
              <div className="relative leading-[36px] font-medium inline-block min-w-[123px]">
                {" "}
                1 de mar. de 2024
              </div>
            </div>
          </div>
        </div>

        <div className="h-auto w-[20%] rounded-md bg-slate-100 box-border overflow-x-auto shrink-0 flex flex-row items-start justify-between px-2 py-2 gap-[4.299999999999272px] border-[1px] border-solid border-slate-200">
          <div className="flex flex-row">
          <div className="flex flex-col items-start justify-start">
            <div className="relative leading-[14px] inline-block min-w-[14.2px]">
              <img src="ModuloEvento/lulu.svg" alt="" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
              07:30
          </div>
        </div>
          <img
            className="h-[14px] w-[14px] shrink-0 items-center justify-center "
            alt=""
            src="ModuloEvento/lolo.svg"
          />
        </div>

        <div className="flex flex-col items-start justify-start">
        <div className="w-[35px] rounded-md bg-slate-100 box-border flex flex-row items-center justify-center pt-[6.299999999999272px] px-[9px] pb-[6.200000000000728px] max-w-[35px] border-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-create-1318x573-default-geyser">
          <div className="flex flex-col items-center justify-start pt-[3px] px-0 pb-[5.5px]">
            <div className="h-4 flex flex-row items-start justify-start">
              <img
                className="h-4 w-[15.8px] relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="ModuloEvento/lele.svg"
              />
            </div>
          </div>
        </div>
      </div>
      </div>



    </div>

    <div className="self-stretch flex flex-row items-start justify-start py-0 px-[21px] box-border max-w-full text-left text-sm text-gray-600">
      <div className="flex-1 flex flex-col items-start justify-start gap-[6px] max-w-full">
        <div className="self-stretch flex flex-col items-start justify-start gap-[6px]">
          <div className="relative leading-[17.5px] font-semibold inline-block min-w-[43px] max-h-[17.5px]">
            Incluye
          </div>
          <input
            className="[outline:none] bg-slate-100 self-stretch h-[65px] rounded-6xs box-border overflow-hidden shrink-0 flex flex-row items-start justify-start pt-[5.5px] px-[11px] pb-[38.5px] font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263 text-sm text-slategray min-w-[223px] border-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-mystic"
            placeholder="1 copa y 2 chupitos"
            type="text"
          />
        </div>
        <div className="self-stretch w-full flex flex-row items-start justify-start pt-0 px-1 pb-1.5 text-xs font-normal">
          <div className="relative leading-[14px]">
            <p className="m-0">
              Poner solo los complementos que acompañan a la entrada como consumiciones, parking, cuño... Será una palabra o frase precedida de un "con".
          </p>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start">
          <div className="relative leading-[17.5px] font-semibold inline-block min-w-[128px] max-h-[17.5px]">
            Información adicional
          </div>
          <input
            className="[outline:none] bg-slate-100 self-stretch h-[65px] rounded-6xs box-border overflow-hidden shrink-0 flex flex-row items-start justify-start pt-[6.5px] px-[11px] pb-[37.5px] font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263 text-sm text-slategray min-w-[223px] border-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-mystic"
            placeholder="comentarios extra"
            type="text"
          />
        </div>
      </div>
    </div>

    </div>
    </ClickAwayListener>

  );
};

export default ModalPrecio;