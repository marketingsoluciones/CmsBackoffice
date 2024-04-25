import { FC } from "react";
interface propsUsuariosEquipos {
    componentState: any;
    setComponentState: any;
  
  }

const UsuariosEquipos: FC<propsUsuariosEquipos> = ({componentState, setComponentState}) => {
  return (
    <div className="w-full relative flex flex-col items-start justify-start gap-[10.5px] tracking-[normal] leading-[normal] text-left text-xs text-black font-medium py-6 px-6 mq450:max-w-full mq750:max-w-full">
      
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
            <div className="relative leading-[32px] font-semibold text-[16px] inline-block min-w-[76px] mq450:text-2xl mq450:leading-[25px]">
              Usuarios y Equipos
            </div>
      </div>

      <div className="self-stretch flex flex-row flex-wrap items-start justify-between py-0 px-[10.5px] box-border max-w-full [row-gap:20px]">
        
        <div className="w-auto flex flex-col items-start justify-start pt-0 px-0 pb-px box-border max-w-full">
          <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] mq450:flex-wrap">
            <button className="cursor-pointer [border:none] pt-[10.5px] px-[10.5px] pb-2.5 bg-[transparent] rounded-t-md rounded-b-none overflow-hidden flex flex-col items-center justify-start border-b-[1px] border-solid border-profourvenuescom-royal-blue hover:bg-dodgerblue">
              <div className="relative text-sm leading-[21px] font-bold  text-center inline-block min-w-[34px]">
                Todo
              </div>
            </button>
            <button className="cursor-pointer [border:none] pt-[10.5px] px-[10.5px] pb-2.5 bg-[transparent] rounded-t-2xs-5 rounded-b-none overflow-hidden flex flex-col items-center justify-start border-b-[1px] border-solid border-profourvenuescom-mystic hover:bg-lightgray">
              <div className="relative text-sm leading-[21px] font-profourvenuescom-inter-bold-14 text-profourvenuescom-black text-center inline-block min-w-[39px]">
                Listas
              </div>
            </button>
            <button className="cursor-pointer [border:none] pt-[10.5px] px-[10.5px] pb-2.5 bg-[transparent] flex-1 rounded-t-2xs-5 rounded-b-none box-border overflow-hidden flex flex-col items-center justify-start min-w-[53px] border-b-[1px] border-solid border-profourvenuescom-mystic hover:bg-lightgray">
              <div className="relative text-sm leading-[21px] font-profourvenuescom-inter-bold-14 text-profourvenuescom-black text-center inline-block min-w-[59px]">
                Entradas
              </div>
            </button>
            <button className="cursor-pointer [border:none] pt-[10.5px] px-[10.5px] pb-2.5 bg-[transparent] flex-1 rounded-t-2xs-5 rounded-b-none box-border overflow-hidden flex flex-col items-center justify-start min-w-[53px] border-b-[1px] border-solid border-profourvenuescom-mystic hover:bg-lightgray">
              <div className="relative text-sm leading-[21px] font-profourvenuescom-inter-bold-14 text-profourvenuescom-black text-center inline-block min-w-[61px]">
                Reservas
              </div>
            </button>
            <button className="cursor-pointer [border:none] pt-[10.5px] px-[10.5px] pb-2.5 bg-[transparent] rounded-t-2xs-5 rounded-b-none overflow-hidden flex flex-col items-center justify-start border-b-[1px] border-solid border-profourvenuescom-mystic hover:bg-lightgray">
              <div className="relative text-sm leading-[21px] font-profourvenuescom-inter-bold-14 text-profourvenuescom-black text-center inline-block min-w-[40px]">
                Pases
              </div>
            </button>
            <button className="cursor-pointer [border:none] pt-[10.5px] px-[10.5px] pb-2.5 bg-[transparent] flex-1 rounded-t-2xs-5 rounded-b-none box-border overflow-hidden flex flex-col items-center justify-start min-w-[48px] border-b-[1px] border-solid border-profourvenuescom-mystic hover:bg-lightgray">
              <div className="relative text-sm leading-[21px] font-profourvenuescom-inter-bold-14 text-profourvenuescom-black text-center inline-block min-w-[53px]">
                A. RRPP
              </div>
            </button>
          </div>
        </div>

        <div className="w-auto flex flex-row items-center justify-start max-w-full [row-gap:20px]">
          
          <div className="flex-1 flex flex-col items-start justify-start py-[3.5px] pr-[7px] pl-0 box-border min-w-[223px] max-w-full">
            <div className="self-stretch rounded-md bg-white flex flex-col items-start justify-start py-2 px-[17px] border-[1px] border-solid border-slate-200">
              <input
                className="w-full [border:none] [outline:none] bg-[transparent] self-stretch h-[17px] overflow-hidden shrink-0 flex flex-col items-start justify-start font-profourvenuescom-inter-bold-14 text-sm text-profourvenuescom-gull-gray min-w-[179px]"
                placeholder="Buscar"
                type="text"
              />
            </div>
          </div>
        
          <button className="cursor-pointer [border:none] py-0 pr-[3.5px] pl-0 bg-[transparent] flex flex-col items-start justify-start">
            <div className="rounded-md bg-slate-200 flex flex-row items-center justify-start py-0 px-[10.5px] gap-[7px]">
              <div className="flex flex-row items-start justify-end pt-0.5 px-0 pb-px">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-3.5 w-3.5 relative overflow-hidden shrink-0"
                    alt=""
                    src="ModuloEvento/013.svg"
                  />
                </div>
              </div>
              <div className="relative text-sm leading-[36px] font-medium font-profourvenuescom-inter-bold-14 text-profourvenuescom-ebony text-right inline-block min-w-[47px]">
                Buscar
              </div>
            </div>
          </button>

          <button className="cursor-pointer [border:none] py-0 pr-[3.5px] pl-0 bg-[transparent] flex flex-col items-start justify-start">
            <div className="rounded-md bg-slate-200 flex flex-row items-center justify-start py-0 px-[10.5px] gap-[7px]">
              <div className="flex flex-row items-start justify-end pt-0.5 px-0 pb-px">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-3.5 w-3.5 relative overflow-hidden shrink-0"
                    alt=""
                    src="ModuloEvento/014.svg"
                  />
                </div>
              </div>
              <div className="relative text-sm leading-[36px] font-medium font-profourvenuescom-inter-bold-14 text-profourvenuescom-ebony text-right inline-block min-w-[40px]">
                Filtrar
              </div>
            </div>
          </button>

          <div className="rounded-md bg-slate-200 flex flex-col items-end justify-start py-[11px] px-[10.5px]">
            <div className="flex flex-row items-start justify-start">
              <img
                className="h-4 w-4 relative overflow-hidden shrink-0"
                alt=""
                src="ModuloEvento/06.svg"
              />
            </div>
          </div>
          
        </div>

      </div>

      <section className="self-stretch rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] overflow-hidden flex flex-row items-start justify-start max-w-full text-right text-xs text-black font-semibold">
      <div className="w-full flex flex-col items-start justify-start tracking-[normal] leading-[normal] text-left text-xs">
      
      <div className="self-stretch flex flex-row items-start justify-between text-xs max-w-full gap-[20px] ">
        
        <div className="w-[200.3px] flex flex-row items-end justify-start gap-[16px]">
          <div className="h-[35.5px] w-[35px] relative box-border shrink-0 [debug_commit:1de1738]"/>
          <div className="flex-1 box-border flex flex-row items-start justify-start pt-[9px] px-[7px] pb-2 min-w-[200px] shrink-0 [debug_commit:1de1738]">
            <b className="relative leading-[17px] inline-block min-w-[43px]">
              Nombre
            </b>
          </div>
        </div>

        <div className="w-full flex flex-row items-start justify-start max-w-full [row-gap:20px] text-right ">
          <div className="flex flex-row items-start justify-start pt-[9px] px-[7px] pb-2 hover:bg-gainsboro">
            <b className="relative leading-[17px] inline-block min-w-[36px]">
              Entran
            </b>
          </div>
          <div className="flex flex-row items-start justify-start pt-[9px] px-[7px] pb-2 ">
            <b className="relative leading-[17px] inline-block min-w-[60px]">
              Apuntados
            </b>
          </div>
          <div className="flex flex-row items-start justify-start pt-[9px] px-[7px] pb-2 ">
            <b className="relative leading-[17px] inline-block min-w-[61px]">
              Recaudado
            </b>
          </div>
          <div className="flex flex-row items-start justify-start pt-[9px] px-[7px] pb-2 ">
            <b className="relative leading-[17px] inline-block min-w-[38px]">
              Chicas
            </b>
          </div>
          <div className="flex flex-row items-start justify-start pt-[9px] px-[7px] pb-2 ">
            <b className="relative leading-[17px] inline-block min-w-[38px]">
              Chicos
            </b>
          </div>
          <div className="flex flex-row items-start justify-start pt-[9px] px-[7px] pb-2">
            <b className="relative leading-[17px] inline-block min-w-[58px]">
              Sin género
            </b>
          </div>
          <div className="flex-1 box-border flex flex-row items-start justify-start pt-[9px] px-[7px] pb-2 min-w-[67px] text-left  ">
            <b className="relative leading-[17px] inline-block min-w-[42px]">
              Calidad
            </b>
          </div>
          <div className="flex flex-row items-start justify-start pt-[9px] pb-2 pr-[6.2px] pl-[7px] text-center ">
            <b className="relative leading-[17px] inline-block min-w-[35px]">
              Asiste
            </b>
          </div>
          <div className="flex-1 box-border flex flex-row items-start justify-start pt-[9px] px-[7px] pb-2 min-w-[67px] text-center">
            <b className="relative leading-[17px] inline-block min-w-[89px]">
              Prod. recaudado
            </b>
          </div>
          <div className="flex-1 box-border flex flex-row items-start justify-start pt-[9px] px-[7px] pb-2 min-w-[62px] z-[1] text-center ">
            <b className="relative leading-[17px] inline-block min-w-[81px]">
              Prod. vendidos
            </b>
          </div>
        </div>
      </div>
      
      <div className="self-stretch flex flex-row items-start justify-between pt-[3.3px] pb-[3.2px] pr-0 pl-[7px] box-border max-w-full gap-[20px] text-center text-xs mq1050:flex-wrap mq1050:pr-[7px] mq1050:box-border">
        <div className="w-auto flex flex-row items-end justify-start">
          <div className="flex flex-col items-start justify-end pt-0 pb-[7.3px] pr-[7px] pl-0">
            <b className="relative leading-[21px] inline-block min-w-[11px]">
              1.
            </b>
          </div>
          <div className="flex flex-col items-start justify-end pt-0 px-0 pb-1">
            <div className="w-7 h-7 rounded-9xl bg-profourvenuescom-catskill-white overflow-hidden shrink-0 flex flex-col items-start justify-center relative">
              <img
                className="w-7 h-7 relative rounded-9xl object-cover max-w-[28px]"
                loading="lazy"
                alt=""
                src="ModuloEvento/015.svg"
              />
              <div className="w-full h-full absolute !m-[0] top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_2px_4px_rgba(0,_0,_0,_0.06)_inset] rounded-9980xl bg-profourvenuescom-nero-02 z-[1]" />
            </div>
          </div>
          <div className="flex-1 box-border flex flex-row items-start justify-start pt-[9px] px-[7px] pb-2 min-w-[200px] text-left text-2xs text-profourvenuescom-black">
            <b className="relative leading-[17px] inline-block min-w-[84px]">
              Christian Lanza
            </b>
          </div>
        </div>
        <div className="w-auto flex flex-row items-start justify-start max-w-full [row-gap:20px] text-right text-2xs text-profourvenuescom-black mq725:flex-wrap">
          <div className="w-[50px] box-border flex flex-row items-start justify-end pt-[9px] px-[7px] pb-2 ">
            <b className="relative leading-[17px] inline-block min-w-[8px]">
              0
            </b>
          </div>
          <div className="w-[74px] box-border flex flex-row items-start justify-end pt-[9px] px-[7px] pb-2 ">
            <b className="relative leading-[17px] inline-block min-w-[13px]">
              10
            </b>
          </div>
          <div className="w-[75px] box-border flex flex-row items-start justify-end pt-[7px] px-[7px] pb-1.5 text-sm ">
            <div className="relative leading-[21px] inline-block min-w-[22px]">
              0 €
            </div>
          </div>
          <div className="w-[52px] box-border flex flex-row items-start justify-end pt-[9px] px-[7px] pb-2 ">
            <b className="relative leading-[17px] inline-block min-w-[8px]">
              0
            </b>
          </div>
          <div className="w-[52px] box-border flex flex-row items-start justify-end pt-[9px] px-[7px] pb-2 ">
            <b className="relative leading-[17px] inline-block min-w-[8px]">
              0
            </b>
          </div>
          <div className="w-[72px] box-border flex flex-row items-start justify-end pt-[9px] px-[7px] pb-2 ">
            <b className="relative leading-[17px] inline-block min-w-[8px]">
              0
            </b>
          </div>
          <div className="flex-1 box-border flex flex-row items-start justify-start pt-[9px] px-[7px] pb-2 min-w-[50px] ">
            <div className="flex flex-row items-start justify-start py-1 pr-5 pl-0">
              <img
                className="h-2 w-1.5 relative min-h-[8px]"
                loading="lazy"
                alt=""
                src="/vector3.svg"
              />
              <img
                className="h-2 w-1.5 relative min-h-[8px]"
                loading="lazy"
                alt=""
                src="/vector3.svg"
              />
              <img
                className="h-2 w-1.5 relative min-h-[8px]"
                loading="lazy"
                alt=""
                src="/vector3.svg"
              />
              <img
                className="h-2 w-1.5 relative min-h-[8px]"
                loading="lazy"
                alt=""
                src="/vector3.svg"
              />
              <img
                className="h-2 w-1.5 relative min-h-[8px]"
                loading="lazy"
                alt=""
                src="/vector3.svg"
              />
            </div>
          </div>
          <div className="flex flex-row items-start justify-start pt-[9px] px-5 pb-2 text-center ">
            <b className="relative leading-[17px] inline-block min-w-[8px]">
              0
            </b>
          </div>
          <button className="cursor-pointer [border:none] pt-[7px] px-10 pb-1.5 bg-[transparent] flex-[0.2584] box-border flex flex-row items-start justify-start min-w-[22px] z-[1] hover:bg-gainsboro mq450:flex-1">
            <div className="relative text-sm leading-[21px] font-profourvenuescom-inter-bold-14 text-profourvenuescom-black text-center inline-block min-w-[22px]">
              0 €
            </div>
          </button>
          <div className="flex-[0.1111] box-border flex flex-row items-start justify-start pt-[9px] px-[43px] pb-2 min-w-[50px] z-[2] text-center mq450:flex-1">
            <b className="relative leading-[17px] inline-block min-w-[8px]">
              0
            </b>
          </div>
        </div>
      </div>
    </div>
      </section>
    </div>
  );
};

export default UsuariosEquipos;
