import { FunctionComponent, memo } from "react";

const card1: FunctionComponent = memo(() => {
  return (
    <div className="w-auto rounded-md bg-white overflow-hidden flex flex-row items-start justify-start py-0 pr-[7px] pl-0 box-border gap-[7px] tracking-[normal]  text-sm">
      <div className="flex flex-row w-[140px] rounded-tl-2xs-5 rounded-tr-none rounded-br-none rounded-bl-2xs-5 overflow-hidden shrink-0 items-start justify-end pt-0 px-0 pb-[105px] box-border relative">
        <img
          className="h-full w-full absolute overflow-hidden object-cover"
          loading="lazy"
          alt=""
          src="ModuloEvento/divabsolute@2x.png"
        />
        <div className="flex flex-col bg-black items-center justify-center py-[7px] pr-[13px] pl-3.5 text-white">
          <b className="w-7 h-[18px] relative leading-[17.5px] uppercase inline-block">
            Jue.
          </b>
            <b className="h-[25px] w-[21px] relative leading-[24.5px] inline-block">
              29
            </b>
          <b className="w-[27px] h-[18px] relative leading-[17.5px] uppercase inline-block">
            Feb.
          </b>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border ">
        <div className="self-stretch flex flex-col items-start justify-start gap-[33px] ">
          <div className="self-stretch flex flex-col items-start justify-start pt-[10.5px] px-[7px] pb-[8.5px]">
            <div className="self-stretch flex flex-row items-center justify-between gap-[20px]">
              <div className="flex flex-row items-center justify-start py-px px-0 gap-[10px]">
                <div className="h-auto w-auto  relative inline-block ">
                  <img className="items-center justify-center " src="ModuloEvento/relog1.svg" alt="" />
                </div>
                <div className="h-auto w-auto relative leading-[14px] font-extralight inline-block whitespace-nowrap">
                  <span>{` 00:00 - 07:30 `}</span>
                  <span className="text-gray-800">
                    +18
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start pt-1 px-[7px] pb-[3px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-3.5 w-[3.5px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/icon-52.svg"
                  />
                </div>
              </div>
            </div>
            <b className="w-[140px] h-[24.5px] relative text-mid-5 leading-[24.5px] flex font-semibold text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black items-center box-border pr-5">
              Playa y rumba
            </b>
          </div>
          <div className="flex flex-col items-start justify-start gap-[7px] text-center text-5xs font-semibold">
            <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-[21px] pl-0 gap-[6px]">
              <div className="rounded-[5.25px] bg-blue-100 text-blue-500 flex flex-col items-center justify-center pt-[3px] pb-[5px] pr-[15px] pl-[17px]">
                <div className="w-auto h-3 relative leading-[12px] inline-block ">
                  LISTAS
                </div>
                <div className="flex flex-row items-center justify-center py-0 pr-[7px] pl-1.5 mt-[-1px] text-2xs-5">
                  <div className="flex flex-col items-center justify-center py-0 px-0">
                    <b className="w-[11px] h-3 relative leading-[12px] inline-block">{`0 `}</b>
                  </div>
                  <img
                    className="h-2.5 w-[5.3px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/icon-62.svg"
                  />
                </div>
              </div>
              <div className="rounded-[5.25px] bg-green-100 flex flex-col items-center justify-center pt-[3px] px-[3px] pb-[5px] text-green-600">
                <div className="w-auto h-3 relative leading-[12px] inline-block">
                  ENTRADAS
                </div>
                <div className="flex flex-row items-center justify-center py-0 pr-[17px] pl-[15px] mt-[-1px] text-2xs-5">
                  <b className="h-3 w-[11px] relative leading-[12px] inline-block">{`0 `}</b>
                  <div className="flex flex-col items-center justify-center py-0 px-0">
                    <img
                      className="w-[11.8px] h-2.5 relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      src="ModuloEvento/icon-72.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-[5.25px] bg-red-100 shadow-[0px_0px_0px_2px_#e98f2e] overflow-hidden flex flex-col items-center justify-start pt-0 pb-[5px] pr-0 pl-[9px] text-sm text-red-600">

                <div className="flex flex-row items-center justify-center py-0 pr-[9px] pl-0 mt-[-2px] text-5xs pt-2">
                  <div className="h-3 w-auto relative leading-[12px] inline-block">
                    RESERVAS
                  </div>
                </div>
                <div className="flex flex-row items-start justify-start py-0 pr-5 pl-[11px] mt-[-2px] text-2xs-5">
                  <div className="flex flex-row items-center justify-start py-0 pr-0.5 pl-0">
                    <div className="flex flex-col items-start justify-start py-0 px-0">
                      <b className="w-3 h-3 relative leading-[12px] inline-block">{`0 `}</b>
                    </div>
                    <img
                      className="h-2.5 w-[7.9px] relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      src="ModuloEvento/icon-81.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-[5.25px] bg-purple-100 flex flex-col items-center justify-center pt-[3px] px-[3px] pb-[5px] text-purple-600">
                <div className="w-auto h-3 relative leading-[12px] inline-block">
                  A. RRPP
                </div>
                <div className="flex flex-row items-center justify-start py-0 pr-5 pl-[19px] mt-[-1px] text-2xs-5">
                  <div className="flex flex-col items-start justify-start py-0 px-0">
                    <div className="w-2.5 h-3 relative leading-[12px] inline-block">{`0 `}</div>
                  </div>
                  <img
                    className="h-2.5 w-[5.3px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/icon-91.svg"
                  />
                </div>
              </div>
            </div>
            <button className="cursor-pointer [border:none] p-1.5 bg-slate-200 self-stretch rounded-6xs flex flex-row items-center justify-center whitespace-nowrap hover:bg-lightgray-200">
              <div className="h-3.5 w-[109px] relative text-2xs-5 leading-[14px] font-semibold text-black text-center flex items-center justify-center box-border pl-5 pr-5">
                Nuevo cliente
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default card1;