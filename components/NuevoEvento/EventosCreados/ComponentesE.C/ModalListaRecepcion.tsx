import { FC } from "react";
import Data from "./Data";
import ClickAwayListener from "react-click-away-listener";

interface propsModalListaRecepcion {
    addInforme:any
    setAddInforme:any
   }

const ModalListasRecepcion: FC<propsModalListaRecepcion> = ({addInforme, setAddInforme}) => {
  return (
    <ClickAwayListener onClickAway={() => addInforme && setAddInforme(false)}>
        
  {/*       onClick={() => {setAddInforme(!addInforme)}}  */}

    <div className="w-[100%] bg-profourvenuescom-nero max-w-full flex flex-col items-start justify-start tracking-[normal] leading-[normal] text-left text-base text-black">
      <div className="self-stretch  flex flex-row items-center justify-between pt-[7.8px] px-5 pb-[7.7px] whitespace-nowrap gap-[20px]">
        <b className="relative leading-[24.5px]">Christian Lanza + 5</b>
        <img onClick={() => {setAddInforme(!addInforme)}}
          className="cursor-pointer h-[15.6px] w-[11.7px] relative"
          loading="lazy"
          alt=""
          src="ModuloEvento/equis2.svg"
        />
      </div>
      <div className="self-stretch flex flex-col items-center justify-center gap-[14px] max-w-full text-sm text-profourvenuescom-black">
        <div className="self-stretch bg-profourvenuescom-catskill-white flex flex-col items-start justify-start p-3.5">
          <div className="self-stretch flex flex-col items-start justify-start">
            <b className="self-stretch relative leading-[21px]">
              Tarifa: Limitaa Gratis
            </b>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start pt-[10.5px] px-[10.5px] pb-2.5 text-2xs-5 text-profourvenuescom-gull-gray border-b-[1px] border-solid border-profourvenuescom-catskill-white">
          <div className="self-stretch flex flex-col items-start justify-center">
            <div className="self-stretch flex flex-row flex-wrap items-center justify-start [row-gap:20px]">
              <div className="w-40 flex flex-col items-start justify-start pt-[20.4px] px-px pb-[20.9px] box-border gap-[1.3px]">
                <div className="flex flex-row items-center justify-start py-0 pr-[61.5px] pl-0 gap-[2px]">
                  <div className="flex flex-row items-start justify-start">
                    <img
                      className="h-2.5 w-[10.5px] relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      src="/icon3.svg"
                    />
                  </div>
                  <div className="relative leading-[14px] inline-block min-w-[62px]">
                    {" "}
                    0:00 - 7:30 
                  </div>
                  <b className="relative leading-[14px] inline-block min-w-[20px] whitespace-nowrap">
                    +18
                  </b>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[0.8px] text-base-8 text-profourvenuescom-black">
                  <b className="self-stretch relative leading-[25px]">Gratis</b>
                </div>
              </div>
              <Data />
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row flex-wrap items-end justify-start py-0 pr-[53px] pl-3.5 [row-gap:20px] text-[12px] text-profourvenuescom-gull-gray">
          <div className="w-[142px] flex flex-col items-start justify-start p-px box-border gap-[2.1px]">
            <div className="self-stretch flex flex-col items-start justify-start py-0 pr-5 pl-0">
              <div className="relative leading-[18px] inline-block min-w-[86px]">
                Precio especial
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start min-w-[140px] text-center text-sm text-profourvenuescom-black">
              <div className="flex flex-col items-start justify-start">
                <div className="rounded-tl-6xs rounded-tr-none rounded-br-none rounded-bl-6xs bg-profourvenuescom-mystic flex flex-row items-start justify-start pt-2.5 pb-[11px] pr-2.5 pl-[10.5px]">
                  <div className="flex flex-row items-start justify-start">
                    <img
                      className="h-[15px] w-[12.3px] relative overflow-hidden shrink-0"
                      alt=""
                      src="/icon-11.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start">
                <div className="self-stretch flex flex-row items-center justify-center">
                  <div className="flex-1 bg-profourvenuescom-catskill-white flex flex-col items-start justify-start border-[1px] border-solid border-profourvenuescom-catskill-white">
                    <div className="self-stretch flex flex-row items-center justify-start">
                      <div className="flex-1 flex flex-col items-start justify-start">
                        <div className="self-stretch overflow-auto flex flex-col items-center justify-start py-0 pr-[37px] pl-[36.8px]">
                          <div className="w-px relative leading-[36px] flex items-center justify-center">
                            0
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start z-[1] text-profourvenuescom-dodger-blue font-profourvenuescom-font-awesome-5-free-regular-120">
                <div className="rounded-tl-none rounded-tr-6xs rounded-br-6xs rounded-bl-none bg-profourvenuescom-mystic flex flex-row items-start justify-start pt-[10.5px] px-[10.5px] pb-[11.5px]">
                  <div className="w-[9px] relative leading-[14px] flex items-center justify-center min-w-[9px]">
                    +
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Data beforeMinWidth="124px" />
        </div>
        <div className="self-stretch flex flex-col items-start justify-start pt-[7px] px-[10.5px] pb-1.5 border-b-[1px] border-solid border-profourvenuescom-catskill-white">
          <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 px-0 [row-gap:20px]">
            <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border min-w-[166px]">
              <div className="self-stretch flex flex-col items-start justify-start">
                <b className="self-stretch relative leading-[21px]">CALIDAD</b>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start">
              <div className="flex flex-row items-start justify-start pt-1 px-0 pb-1.5">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-[23px] w-[24.8px] relative overflow-hidden shrink-0"
                    alt=""
                    src="/icon-10.svg"
                  />
                </div>
                <div className="flex flex-row items-start justify-start z-[1]">
                  <img
                    className="h-[23px] w-[24.8px] relative overflow-hidden shrink-0"
                    alt=""
                    src="/icon-10.svg"
                  />
                </div>
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-[23px] w-[24.8px] relative overflow-hidden shrink-0"
                    alt=""
                    src="/icon-10.svg"
                  />
                </div>
                <div className="flex flex-row items-start justify-start z-[1]">
                  <img
                    className="h-[23px] w-[24.8px] relative overflow-hidden shrink-0"
                    alt=""
                    src="/icon-10.svg"
                  />
                </div>
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-[23px] w-[24.8px] relative overflow-hidden shrink-0"
                    alt=""
                    src="/icon-10.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-start py-0 px-3.5 mq380:flex-wrap">
          <button className="cursor-pointer [border:none] py-0 pr-[7px] pl-0 bg-[transparent] flex flex-col items-start justify-start">
            <div className="rounded-6xs bg-profourvenuescom-mystic flex flex-row items-center justify-start py-0 pr-[6.3px] pl-[7px] gap-[7px] opacity-[0.5]">
              <div className="flex flex-row items-start justify-start">
                <img
                  className="h-[13px] w-[11.9px] relative overflow-hidden shrink-0"
                  alt=""
                  src="/icon-15.svg"
                />
              </div>
              <div className="relative text-xs-9 leading-[24px] font-profourvenuescom-inter-bold-14 text-profourvenuescom-royal-blue text-left">
                Mostrar todas las opciones
              </div>
            </div>
          </button>
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] flex flex-col items-start justify-start">
            <div className="rounded-6xs bg-profourvenuescom-mystic flex flex-row items-center justify-start py-0 pr-[27px] pl-[7px] gap-[7px]">
              <div className="flex flex-row items-start justify-start">
                <img
                  className="h-[13px] w-[11.9px] relative overflow-hidden shrink-0"
                  alt=""
                  src="/icon-16.svg"
                />
              </div>
              <div className="relative text-xs-9 leading-[24px] font-profourvenuescom-inter-bold-14 text-profourvenuescom-royal-blue text-left inline-block min-w-[127px]">
                Introducir comentarios
              </div>
            </div>
          </button>
        </div>
        <div className="self-stretch bg-profourvenuescom-catskill-white flex flex-row items-center justify-start py-[7.5px] px-0 box-border min-h-[50px] max-w-full">
          <div className="flex-1 flex flex-col items-start justify-start py-[7px] px-[10.5px] box-border max-w-full">
            <div className="self-stretch flex flex-row flex-wrap items-center justify-start max-w-full [row-gap:20px]">
              <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[7px] pl-0 box-border min-w-[231px] max-w-full">
                <div className="self-stretch flex flex-col items-start justify-start">
                  <b className="self-stretch relative leading-[21px] uppercase">
                    Precio total
                  </b>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start mq252:ml-0">
                <b className="relative leading-[21px] inline-block min-w-[23px]">
                  0 €
                </b>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-center justify-center py-0 px-[13.5px] [row-gap:20px] mq380:flex-wrap">
          <button className="cursor-pointer [border:none] py-0 pr-[7px] pl-0 bg-[transparent] flex flex-col items-start justify-start mq113:max-w-[calc(100%_-_7px)]">
            <div className="rounded-6xs bg-profourvenuescom-nero flex flex-row items-start justify-start p-[10.5px]">
              <div className="relative text-md leading-[25px] text-red-600 text-center inline-block min-w-[78px]">
                Rechazar
              </div>
            </div>
          </button>
          <div className="flex flex-col items-start justify-start py-5 pr-[7px] pl-0 mq50:max-w-[calc(100%_-_7px)]">
            <div className="w-[35.5px] h-px relative" />
          </div>
          <div className="flex flex-row items-center justify-start py-0 px-5">
            <button className="cursor-pointer [border:none] py-0 pr-[7px] pl-0 bg-[transparent] flex flex-col items-start justify-start">
              <div className="flex flex-col items-center justify-start p-[10.5px]">
                <div className="relative text-mid-5 leading-[25px] font-profourvenuescom-inter-bold-14 text-profourvenuescom-ebony text-center inline-block min-w-[74px]">
                  Cancelar
                </div>
              </div>
            </button>
            <button className="cursor-pointer [border:none] py-[10.5px] pr-[28.3px] pl-[28.2px] bg-rosa rounded-md flex flex-col items-center justify-start hover:bg-crimson">
              <div className="relative text-mid-5 leading-[25px] text-white text-center inline-block min-w-[67px]">
                Guardar
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    </ClickAwayListener>
  );
};

export default ModalListasRecepcion;