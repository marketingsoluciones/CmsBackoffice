import { FC } from "react";
import ComponentR from "./ComponentR";
import ReservationSystem from "../ReservaCompo/Reservas1";
import UserEdit2 from "../ReservaCompo/ModalUsuarios1";
import { Avatar } from "@chakra-ui/react";
interface propsReservasRecepcion {
    componentState: any;
    setComponentState: any;
  
  }

const ReservasRecepcion: FC<propsReservasRecepcion> = ({componentState, setComponentState}) => {

  return (
    <div className="w-full relative flex flex-col items-start justify-start py-6 px-6 box-border gap-[20px] min-h-[493px] tracking-[normal] leading-[normal] text-left text-7xl-3 text-black font-semibold">
    <div className="flex flex-row items-center justify-start py-0 pr-5 pl-0 gap-3">
        

        <div onClick={() => {
          setComponentState(12)
        }} className="cursor-pointer flex flex-row items-center justify-center pt-[4.5px] px-[3.9px] pb-[5.5px]">
              <img
                className="h-[27px] w-[23px] relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="ModuloEvento/vectorF.svg"
              />
           
      </div>
          <div className="relative leading-[32px] font-semibold inline-block min-w-[76px] mq450:text-2xl mq450:leading-[25px]">
            Reservas
          </div>
    </div>
    <ReservationSystem/>




{/*       
      <div className="self-stretch flex flex-col items-start justify-start max-w-full text-center text-sm text-profourvenuescom-royal-blue">
        <div className="self-stretch h-[50px] rounded-t-2xl rounded-b-none bg-profourvenuescom-nero flex flex-row items-start justify-between pt-0 pb-1.5 pr-[7px] pl-0 box-border max-w-full gap-[20px] sticky top-[0] z-[99] mq725:h-auto">
          <div className="w-[634.6px] flex flex-row flex-wrap items-start justify-start gap-[7px] max-w-full">
            
            <div className="flex-1 flex flex-col items-start justify-start pt-0 px-0 pb-px box-border min-w-[248px] shrink-0 [debug_commit:1de1738] max-w-full">
              <div className="self-stretch flex flex-row items-start justify-start p-[7px] box-border max-w-full">
                <div className="flex-1 flex flex-col items-start justify-start max-w-full">
                  <div className="self-stretch rounded-[5.25px] bg-white flex flex-col items-start justify-start pt-[7px] px-2.5 pb-2 border-[1px] border-solid border-slate-300">
                    <input
                      className="w-full [border:none] [outline:none] bg-[transparent] self-stretch h-[17px] overflow-hidden shrink-0 flex flex-col items-start justify-start font-bold text-sm text-gray-400 min-w-[207px]"
                      placeholder="Buscar..."
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[246.3px] flex flex-col items-start justify-start pt-[7px] px-0 pb-0 box-border">
              <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-px shrink-0 [debug_commit:1de1738]">
                <div className="self-stretch flex flex-row items-center justify-start py-0 px-0">
                  <div className="w-[52.5px] flex flex-col items-start justify-start py-0 pr-[3.5px] pl-0 box-border">
                    <div className="self-stretch rounded-md bg-white flex flex-col items-center justify-start py-0 px-2.5 border-[2px] border-solid border-blue-600">
                      <div className="relative leading-[32px] font-semibold inline-block min-w-[24px] text-blue-600">
                        lolo
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[3.5px] pl-0 text-gray-400">
                    <div className="self-stretch rounded-md bg-white flex flex-col items-center justify-start py-0 px-2.5 whitespace-nowrap border-[2px] border-solid border-slate-200">
                      <div className="relative leading-[32px] font-medium">
                        invitados generales
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md bg-white flex flex-col items-center justify-start py-1.5 px-1.5">
                    <div className="flex flex-row items-start justify-start">
                    <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
              clipRule="evenodd"
            />
          </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[37px] w-[377.9px] relative hidden max-w-full" />
          <div className="w-auto flex flex-col items-start justify-start pt-[7px] px-0 pb-0 box-border text-2xs-5 text-profourvenuescom-slate-gray">
            <div className="self-stretch flex flex-col items-start justify-start">
              <div className="self-stretch flex flex-row items-start justify-start">
                
                <div className="w-full bg-slate-200 rounded-md flex flex-col items-start justify-start pt-0 pb-px pr-[7px] pl-0">
                  <div className="self-stretch flex flex-row items-start justify-start py-0 px-0">
                    
                    <div className="flex flex-col items-center justify-start py-[11px] px-[10.5px]">
                      <div className="flex flex-row items-start justify-start">
                        <img
                          className="h-5 w-5 relative overflow-hidden shrink-0"
                          alt=""
                          src="ModuloEvento/izqui.svg"
                        />
                      </div>
                    </div>

                    <div className="w-full h-full  flex flex-col items-start justify-start pt-[2.3px] px-[10.5px] box-border min-w-[150px] mq975:hidden">
                      <div className="flex flex-col items-center justify-start py-0 pr-[4.6px] pl-[4.5px]">
                        <div className="relative leading-[14px] font-medium inline-block min-w-[120px] text-xs mq975:hidden">
                          Sáb. 28/12/2024 - 19:12
                        </div>
                      </div>
                      <div className="overflow-hidden  flex flex-col items-center justify-start py-0 pr-[23.1px] pl-[22.9px] box-border max-w-[160px]">
                        <div className="relative leading-[18px] font-medium inline-block min-w-[83px] text-xs">
                          Playa y rumba
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-start py-[11px] px-[10.5px]">
                      <div className="flex flex-row items-start justify-start">
                        <img
                          className="h-5 w-5 relative overflow-hidden shrink-0"
                          alt=""
                          src="ModuloEvento/dere.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>


                      <div className="w-auto rounded-md bg-slate-200 box-border flex flex-row items-center justify-center py-[5px] pr-[15px] pl-3.5 border-[1px] border-solid border-slate-300">
                        <div className="flex flex-col items-center justify-start pt-[3px] px-0 pb-[5.5px]">
                          <div className="w-1 flex flex-row items-start justify-start">
                            <img
                              className="h-6 w-6 relative overflow-hidden shrink-0"
                              alt=""
                              src="ModuloEvento/trespuntos.svg"
                            />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start max-w-full [row-gap:20px] text-left text-xs text-black font-medium mq1025:flex-wrap">
          
          <div className="w-[381.3px] bg-white rounded-md flex flex-col items-start justify-start pt-0 px-0 pb-[137.5px] box-border gap-[3.5px] min-w-[381.2999999999993px] max-w-full mq450:pb-[89px] mq450:box-border mq450:min-w-full mq1025:flex-1">
            <div className="w-[61.2px] h-[34px] relative hidden" />
            <div className="self-stretch h-px relative box-border hidden border-t-[1px] border-solid border-slate-200" />
            <div className="self-stretch flex flex-col items-start justify-start pt-0 pb-[3.5px] pr-px pl-0 box-border max-w-full">
              <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[3px] pl-[3.5px] box-border max-w-full">
                <div className="flex-1 flex flex-row items-start justify-start py-0 pr-px pl-0 box-border gap-[61.2px] max-w-full mq450:flex-wrap mq450:gap-[31px]">
                  
                  <div className="w-full rounded-t-[5.25px] rounded-b-none flex flex-row items-start justify-start pt-3 px-[7px] pb-2 box-border gap-[7px]">
                    <div className="relative leading-[14px] inline-block">
                      +
                    </div>
                    <div className="relative leading-[14px] uppercase font-medium inline-block text-[10px] ">
                      Nueva reserva
                    </div>
                  </div>

                  <div className="flex-1 flex flex-row items-end justify-start min-w-[191px] text-right text-sm text-gray-600">
                    <div className="flex-1 flex flex-row items-start justify-start shrink-0 [debug_commit:1de1738]">
                      <div className="h-[34px] w-[33.3px] relative rounded-t-[5.25px] rounded-b-none  shrink-0 [debug_commit:1de1738]">
                        <img
                          className="absolute top-[11px] left-[10.5px] w-[12.3px] h-3.5 overflow-hidden"
                          alt=""
                          src="ModuloEvento/01.svg"
                        />
                      </div>
                      <div className="h-[34px] w-[33.3px] relative rounded-t-[5.25px] rounded-b-none bg-profourvenuescom-nero box-border shrink-0 [debug_commit:1de1738] z-[1] ml-[-0.1px] border-b-[2px] border-solid border-profourvenuescom-royal-blue">
                        <img
                          className="absolute top-[11px] left-[10.5px] w-[12.3px] h-3.5 overflow-hidden"
                          alt=""
                          src="ModuloEvento/02.svg"
                        />
                      </div>
                    </div>
                    <div className="h-[34px] w-[35px] relative rounded-t-[5.25px] rounded-b-none bg-profourvenuescom-nero shrink-0 [debug_commit:1de1738]">
                      <img
                        className="absolute top-[11px] left-[10.5px] w-3.5 h-3.5 overflow-hidden"
                        alt=""
                        src="ModuloEvento/03.svg"
                      />
                    </div>
                    <div className="h-[34px] w-[31.5px] relative rounded-t-[5.25px] rounded-b-none bg-profourvenuescom-nero shrink-0 [debug_commit:1de1738]">
                      <img
                        className="absolute top-[11px] left-[10.5px] w-[10.5px] h-3.5 overflow-hidden"
                        alt=""
                        src="ModuloEvento/04.svg"
                      />
                    </div>
                    <div className="h-[34px] w-[33.3px] relative rounded-t-[5.25px] rounded-b-none bg-profourvenuescom-nero shrink-0 [debug_commit:1de1738]">
                      <img
                        className="absolute top-[11px] left-[10.5px] w-[12.3px] h-3.5 overflow-hidden"
                        alt=""
                        src="ModuloEvento/05.svg"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[5px]">
                      <div className="relative leading-[21px] inline-block min-w-[4.6px] shrink-0 [debug_commit:1de1738]">
                        |
                      </div>
                    </div>
                    <div className="h-[34px] w-[24.5px] relative rounded-t-[5.25px] rounded-b-none bg-profourvenuescom-nero shrink-0 [debug_commit:1de1738]">
                      <img
                        className="absolute top-[11px] left-[10.5px] w-3 h-3.5 overflow-hidden"
                        alt=""
                        src="ModuloEvento/06.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="self-stretch bg-slate-200 flex flex-col items-start justify-start py-[7px] px-[10.5px] text-gray-600 font-semibold text-[10px] ">
                <div className="self-stretch flex flex-row items-center justify-start [row-gap:20px] mq450:flex-wrap">
                  <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border min-w-[167px] text-smi-3">
                    <div className="self-stretch flex flex-col items-start justify-start">
                      <div className="self-stretch relative leading-[18px] uppercase font-medium">
                        lolo
                      </div>
                    </div>
                  </div>
                  <div className="w-[50px] flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border">
                    <div className="self-stretch flex flex-row items-center justify-start">
                      <div className="flex-1 relative leading-[14px] uppercase font-medium">
                        0 / 5  
                      </div>
                      <div className="flex flex-row items-start justify-start">
                        <img
                          className="h-2.5 w-[10.5px] relative overflow-hidden shrink-0"
                          alt=""
                          src="ModuloEvento/07.svg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-[30.1px] flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border">
                    <div className="self-stretch flex flex-row items-center justify-start">
                      <div className="flex-1 relative leading-[14px] uppercase font-medium">
                        8  
                      </div>
                      <div className="flex flex-row items-start justify-start">
                        <img
                          className="h-2.5 w-[6.6px] relative overflow-hidden shrink-0"
                          alt=""
                          src="ModuloEvento/08.svg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-[23.4px] flex flex-row items-center justify-start py-0 pr-[3px] pl-0 box-border z-[1]">
                    <div className="flex-1 relative leading-[14px] uppercase font-medium shrink-0">
                      2  
                    </div>
                    <div className="flex flex-row items-start justify-start">
                      <img
                        className="h-2.5 w-[7.9px] relative overflow-hidden shrink-0"
                        alt=""
                        src="ModuloEvento/09.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <ComponentR
              icon1="/icon-14.svg"
              forStatement="2"
              christianLanza="christian lanza"
              nada="nada"
            />
            <ComponentR
              icon1="/icon-17.svg"
              forStatement="6"
              christianLanza="christian lanza2"
              nada="ew"
              propPadding="unset"
              propMinWidth="15px"
            />
            <div className="self-stretch bg-slate-200 flex flex-col items-start justify-start py-[7px] px-[10.5px] text-gray-600 font-semibold text-[10px] ">
              <div className="self-stretch flex flex-row items-center justify-start [row-gap:20px] mq450:flex-wrap">
                <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border min-w-[166px] text-smi-3">
                  <div className="self-stretch flex flex-col items-start justify-start">
                    <div className="self-stretch relative leading-[18px] uppercase font-medium">
                      invitados generales
                    </div>
                  </div>
                </div>
                <div className="w-[50px] flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border">
                  <div className="self-stretch flex flex-row items-center justify-start">
                    <div className="flex-1 relative leading-[14px] uppercase font-medium">
                      0 / 6  
                    </div>
                    <div className="flex flex-row items-start justify-start">
                      <img
                        className="h-2.5 w-[10.5px] relative overflow-hidden shrink-0"
                        alt=""
                        src="/icon-101.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-[30.1px] flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border">
                  <div className="self-stretch flex flex-row items-center justify-start">
                    <div className="flex-1 relative leading-[14px] uppercase font-medium">
                      0  
                    </div>
                    <div className="flex flex-row items-start justify-start">
                      <img
                        className="h-2.5 w-[6.6px] relative overflow-hidden shrink-0"
                        alt=""
                        src="/icon-20.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-[24.4px] flex flex-row items-center justify-start py-0 pr-1 pl-0 box-border z-[1]">
                  <div className="flex-1 relative leading-[14px] uppercase font-medium shrink-0">
                    0  
                  </div>
                  <div className="flex flex-row items-start justify-start">
                    <img
                      className="h-2.5 w-[7.9px] relative overflow-hidden shrink-0"
                      alt=""
                      src="/icon-121.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 box-border flex flex-row items-start justify-start min-w-[578px] max-w-full text-center text-base text-profourvenuescom-ebony font-profourvenuescom-inter-bold-14 border-r-[1px] border-solid border-profourvenuescom-mystic border-b-[1px] mq725:min-w-full">
            <div className="h-[442px] flex-1 overflow-auto flex flex-row items-start justify-start max-w-full">
              <div className="w-[489px] bg-profourvenuescom-catskill-white flex flex-col items-end justify-start pt-0 pb-[362.3px] pr-[293.5px] pl-0 box-border gap-[4.7px] max-w-[calc(100%_-_0px)] mq725:pr-[146px] mq725:pb-[235px] mq725:box-border">
                <div className="self-stretch flex flex-row items-start justify-end py-0 pr-[34.2px] pl-0">
                  <div className="flex-1 flex flex-row items-end justify-start gap-[14.7px]">
                    <div className="flex-1 flex flex-row items-end justify-start gap-[2.7px]">
                      <div className="h-[98px] flex-1 relative">
                        <div className="absolute top-[44px] left-[19.5px] rounded-[2.04px] bg-white w-[24.4px] h-6">
                          <div className="absolute top-[2px] left-[2px] rounded-[2.04px] bg-slate-200 w-[20.4px] h-[20.4px] hidden" />
                          <div className="absolute top-[0px] left-[4px] w-[16.4px] h-6">
                            <div className="absolute top-[4px] left-[0px] rounded-[1.64px] bg-slate-200 w-[16.4px] h-[16.4px] z-[1]" />
                            <div className="absolute top-[0px] left-[4.3px] leading-[24px] font-medium flex items-center justify-center min-w-[8px] z-[2]">
                              1
                            </div>
                          </div>
                          <div className="absolute top-[-4px] left-[16.5px] rounded-[5.25px] bg-white box-border w-3 flex flex-row items-start justify-start py-0 pr-0.5 pl-[3.8px] z-[2] text-[10px] text-black border-[1px] border-solid border-slate-200">
                            <div className="relative leading-[10px] inline-block min-w-[4px]">
                              8
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-[0px] left-[0px] w-full flex flex-col items-start justify-start h-full z-[1] text-sm text-black font-medium">
                          <div className="self-stretch flex flex-col items-center justify-center p-[10.5px]">
                            <div className="self-stretch flex flex-col items-start justify-start pt-[3.5px] px-0 pb-0">
                              <div className="self-stretch rounded-[5.25px] bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-col items-center justify-start pt-[11px] px-[13px] pb-2.5">
                                <div className="self-stretch relative leading-[14px] inline-block min-w-[9px]">
                                  +
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-start justify-start pt-[3.5px] px-0 pb-0">
                              <div className="rounded-[5.25px] bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-col items-center justify-start pt-[11px] pb-2.5 pr-[11px] pl-[11.4px] opacity-[0.5]">
                                <div className="w-[13px] flex flex-row items-start justify-start">
                                -
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-[24.4px] flex flex-col items-start justify-end pt-0 px-0 pb-[30px] box-border">
                        <div className="self-stretch h-6 relative rounded-[2.04px] bg-white">
                          <div className="absolute top-[2px] left-[2px] rounded-[2.04px] bg-slate-200 w-[20.4px] h-[20.4px] hidden" />
                          <div className="absolute top-[0px] left-[4px] w-[16.4px] h-6">
                            <div className="absolute top-[4px] left-[0px] rounded-[1.64px] bg-slate-200 w-[16.4px] h-[16.4px] z-[1]" />
                            <div className="absolute top-[0px] left-[3.2px] leading-[24px] font-medium flex items-center justify-center min-w-[10px] z-[2]">
                              2
                            </div>
                          </div>
                          <div className="absolute top-[-4px] left-[16.4px] rounded-[5.25px] bg-white box-border w-3 flex flex-row items-start justify-start py-0 pr-0.5 pl-[3.9px] z-[2] text-7xs border-[1px] border-solid border-slate-200">
                            <div className="relative leading-[10px] inline-block min-w-[4px] text-[10px]">
                              8
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[24.4px] flex flex-col items-start justify-end pt-0 px-0 pb-[30px] box-border">
                      <div className="self-stretch h-6 relative rounded-[2.04px] bg-white">
                        <div className="absolute top-[2px] left-[2px] rounded-[2.04px] bg-slate-200 w-[20.4px] h-[20.4px] hidden" />
                        <div className="absolute top-[0px] left-[4px] w-[16.4px] h-6">
                          <div className="absolute top-[4px] left-[0px] rounded-[1.64px] bg-slate-200 w-[16.4px] h-[16.4px] z-[1]" />
                          <div className="absolute top-[0px] left-[2.7px] leading-[24px] font-medium flex items-center justify-center min-w-[11px] z-[2]">
                            3
                          </div>
                        </div>
                        <div className="absolute top-[-4px] left-[16.4px] rounded-[5.25px] bg-profourvenuescom-catskill-white box-border w-3 flex flex-row items-start justify-start py-0 pr-0.5 pl-[3.9px] z-[2] text-7xs text-profourvenuescom-fiord border-[1px] border-solid border-profourvenuescom-geyser">
                          <div className="relative leading-[10px] inline-block min-w-[4px] text-[10px] ">
                            8
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[24.4px] flex flex-col items-start justify-end pt-0 px-0 pb-[30px] box-border">
                      <div className="self-stretch h-6 relative rounded-[2.04px] bg-white">
                        <div className="absolute top-[2px] left-[2px] rounded-[2.04px] bg-slate-200 w-[20.4px] h-[20.4px] hidden" />
                        <div className="absolute top-[0px] left-[4px] w-[16.4px] h-6">
                          <div className="absolute top-[4px] left-[0px] rounded-[1.64px] bg-slate-200 w-[16.4px] h-[16.4px] z-[1]" />
                          <div className="absolute top-[0px] left-[2.7px] leading-[24px] font-medium flex items-center justify-center min-w-[11px] z-[2]">
                            4
                          </div>
                        </div>
                        <div className="absolute top-[-4px] left-[16.4px] rounded-[5.25px] bg-white box-border w-3 flex flex-row items-start justify-start py-0 pr-0.5 pl-[3.9px] z-[3] text-7xs text-profourvenuescom-fiord border-[1px] border-solid border-profourvenuescom-geyser">
                          <div className="relative leading-[10px] inline-block min-w-[4px] text-[10px] ">
                            8
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[24.4px] h-6 relative rounded-[2.04px] bg-white">
                  <div className="absolute top-[2px] left-[2px] rounded-[2.04px] bg-slate-200 w-[20.4px] h-[20.4px] hidden" />
                  <div className="absolute top-[0px] left-[4px] w-[16.4px] h-6">
                    <div className="absolute top-[4px] left-[0px] rounded-[1.64px] bg-slate-200 w-[16.4px] h-[16.4px] z-[1]" />
                    <div className="absolute top-[0px] left-[3.3px] leading-[24px] font-medium flex items-center justify-center min-w-[10px] z-[2]">
                      5
                    </div>
                  </div>
                  <div className="absolute top-[-4px] left-[16.5px] rounded-[5.25px] bg-white box-border w-3 flex flex-row items-start justify-start py-0 pr-0.5 pl-[3.8px] z-[2] text-7xs border-[1px] border-solid border-slate-200">
                    <div className="relative leading-[10px] inline-block min-w-[4px] text-[10px] ">
                      8
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ReservasRecepcion;
