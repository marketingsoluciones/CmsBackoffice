import { FC, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
interface propsAñadirUbicacionM {
 addUbicacion:any
 setAddUbicacion:any
}

export const AñadirUbicacionM: FC <propsAñadirUbicacionM> = ({addUbicacion,setAddUbicacion}) => {
    const [inputValue, setInputValue] = useState("");
    const [input2Value, setInput2Value] = useState("");
    return (
<ClickAwayListener onClickAway={() => addUbicacion && setAddUbicacion(false)}>
    
<div className="w-auto overflow-hidden flex flex-col items-center justify-center pt-px pb-0.5 pr-0 pl-0.5 text-left text-base-8 text-black font-semibold">
      <div className="py-2">
      <div className="self-stretch flex flex-row items-center justify-between pt-[21px] pb-[22px] pr-5 pl-[21px] border-b-[1.3px] border-solid border-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-mystic">
        <div className="h-[24.5px] w-[131px] relative leading-[24.5px] font-semibold inline-block max-h-[24.5px]">
          Añadir Ubicación
        </div>
        <button onClick={() => {setAddUbicacion(!addUbicacion)}} className="cursor-pointer [border:none] p-0 bg-[transparent] w-4 flex flex-col items-center justify-center">
          <img className="w-3.5 h-3.5 relative" alt="" src="ModuloEvento/fv-button.svg" />
        </button>
      </div>

      <div className="h-auto flex flex-col items-center justify-start pt-[21px] px-[15px] pb-[15px] box-border gap-[9px] max-h-[316px] text-smi-3 text-darkslategray-100">
        <div className="self-stretch h-[18px] flex flex-row items-start justify-start py-0 px-[5px] box-border">
          <div className="h-[17.5px] w-auto relative leading-[17.5px] font-semibold inline-block max-h-[17.5px]">
            Nombre de la ubicación
          </div>
        </div>
        <div className="self-stretch h-[53px] flex flex-col items-start justify-start py-0 px-[5px] box-border text-xs  font-normal">
          <input
            className="[outline:none] bg-slate-100 self-stretch h-[39px] rounded-md box-border flex flex-row items-center justify-center pt-3 px-4 pb-[11px] font-normal text-sm border-[1px] border-solid border-slate-100"
            type="text"
            value={input2Value}
            onChange={(event) => setInput2Value(event.target.value)}
          />
          <div className="flex flex-row items-end justify-start gap-[2px]">
            <div className="h-3.5 w-[558px] relative leading-[14px] text-slate-400 inline-block">
              Indica el nombre por el que se conoce esta ubicación. Por
              ejemplo, el nombre comercial de la sala o del recinto.
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start py-2 pr-1.5 pl-[5px]">
          <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[10.5px] gap-[6.99px]">
            <div className="self-stretch flex flex-row items-start justify-start">
              <div className="flex-1 flex flex-col items-start justify-start">
                <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold inline-block max-h-[17.5px]">
                  Dirección postal
                </div>
              </div>
            </div>
              <div className="self-stretch flex flex-col rounded-md items-center justify-start p-[1.25px]">
                <input
                  className="[outline:none] bg-slate-100 self-stretch h-[39px] rounded-md box-border flex flex-row items-center justify-center pt-3 px-4 pb-[11px] font-normal text-sm border-[1px] border-solid border-slate-100"
                  placeholder="Escribe para buscar..."
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                />
            </div>
          </div>
          <div className="self-stretch rounded-lg bg-slate-100 flex flex-row items-center justify-center pt-3 pb-[11px] pr-[21px] pl-5 z-[1] mt-[-1px] border-[1px] border-dashed border-rosa">
            <img
              className="h-[100px] w-[100px] relative overflow-hidden shrink-0"
              alt=""
              src="ModuloEvento/location.svg"
            />
          </div>
        </div>
      </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-end pt-[22.25px] pb-[21px] pr-[21.000015258789062px] pl-0 border-t-[1.3px] border-solid border-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-mystic">

            <button onClick={() => {setAddUbicacion(!addUbicacion)}}  className="cursor-pointer [border:none] py-0 pr-[7px] pt-[10.5px] bg-[transparent] flex flex-col items-center justify-center">
                  <div className="w-auto h-auto relative text-smi-3 font-semibold text-slate-600 text-center inline-block">
                    Cancelar
                  </div>
            </button>
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-auto flex flex-col items-start justify-start ml-[-0.01px]">
              <div className="w-full rounded-md bg-rosa box-border flex flex-row items-center justify-center pt-[9.75px] px-[17px] pb-[9.740001678466797px] max-w-[70.3499984741211px] border-[1px] border-solid border-rosa">
                <div className="w-[auto flex flex-col items-center justify-start">
                  <div className="w-auto h-[17.5px] relative text-smi-3 leading-[17.5px] font-semibold text-white text-center inline-block max-h-[17.5px]">
                    Crear
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

</ClickAwayListener>

    );
  };
  