import { FC } from "react";
import Comp5 from "./ComponentesUsers/Comp5";
interface propsUsuarios {
    componentState: any;
    setComponentState: any;
  
  }

const Usuarios: FC<propsUsuarios> = ({componentState, setComponentState}) => {
  return (
    <div className="w-[100%] max-w-full flex flex-col items-start justify-start gap-[21px] tracking-[normal] leading-[normal] text-left px-5 py-5">
      
      <div className="self-stretch flex flex-row flex-wrap items-start justify-between max-w-full [row-gap:20px]">

        <div className="self-stretch overflow-hidden flex flex-row items-center justify-center gap-4">
                    <div onClick={() => { setComponentState(1) }}
                    className=" cursor-pointer flex flex-row items-start justify-start">
                      <img
                        className="h-7 w-[23px] relative overflow-hidden shrink-0"
                        loading="lazy"
                        alt=""
                        src="ModuloEvento/Vectorflecha.svg"
                      />
                    </div>
              <div className="flex flex-col items-start justify-start text-black text-[18px] ">
                Usuarios
              </div>
        </div>

        <div className="flex flex-row items-center justify-center">

        <div className="w-[242.5px] flex flex-col items-start justify-start py-0 pr-[7px] pl-0 box-border">
          <div className="self-stretch rounded-md bg-slate-50 flex flex-row items-start justify-start py-0 px-px border-[1px] border-solid border-slate-200">
            <div className="flex flex-row items-start justify-start py-[9px] px-[10.5px] gap-[7px]">
              <img
                className="h-[15px] w-3.5 relative overflow-hidden shrink-0 z-[2]"
                alt=""
                src="ModuloEvento/Vectorbuscar.svg"
              />
              <input
                className="w-[calc(100%_-_35px)] [border:none] [outline:none] bg-[transparent] h-[17px] flex-1 flex flex-row items-start justify-start font-profourvenuescom-inter-regular-123 text-sm text-profourvenuescom-gull-gray min-w-[109px] z-[1]"
                placeholder="Buscar"
                type="text"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-center py-0 pr-[7px] pl-0">
          <div className="flex flex-col items-start justify-start">
            <div className="w-[35px] rounded-md bg-slate-50 box-border flex flex-row items-center justify-center py-[5px] pr-[15px] pl-3.5 max-w-[35px] border-[1px] border-solid border-profourvenuescom-mystic">
              <div className="flex flex-col items-center justify-start pt-[3px] px-0 pb-[5.5px]">
                <div className="w-1 flex flex-row items-start justify-start">
                  <img
                    className="h-4 w-[3.9px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/Vectortrespuntos.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="cursor-pointer [border:none] rounded-md bg-rosa w-auto flex flex-row items-start justify-start py-2 px-[17px] gap-2">
              <div className="relative text-sm leading-[18px] font-semibold text-white text-center inline-block min-w-[39px]">
                Nuevo
              </div>
              <div className="flex flex-row items-start justify-start">
                <img
                  className="h-4 w-[15.3px] relative overflow-hidden shrink-0"
                  alt=""
                  src="ModuloEvento/Vectorflechapabajo.svg"
                />
              </div>
            
        
        </button>

        </div>
      </div>

      <div className="flex flex-row flex-wrap items-start justify-start pl-0 [row-gap:20px] text-center text-sm text-black mq675:pr-[363px] mq675:box-border mq450:pr-5 mq450:box-border">
        
        <div className="w-[60px] flex flex-col items-start justify-center pt-[0.3px] pb-[0.2px] pr-[7px] pl-0 box-border">
          <button className="cursor-pointer [border:none] pt-0 px-0 pb-0 bg-[transparent] self-stretch flex flex-col items-start justify-start">
            <div className="self-stretch rounded-md bg-black flex flex-row items-start justify-start py-[3px] px-[7px]">
              <div className="relative text-smi-3 leading-[18px] font-medium text-white text-center inline-block min-w-[37px]">
                Todos
              </div>
            </div>
          </button>
        </div>

        <div className="w-auto flex flex-col items-start justify-center pt-[0.3px] pb-[0.2px] pr-[7px] pl-0 box-border">
          <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-0">
            <div className="self-stretch rounded-[5.25px] flex flex-row items-center justify-start py-[3px] px-[7px] gap-[3.5px] border-[1px] border-solid border-slate-300">
              <div className="h-[13px] w-[10.7px] bg-red-700 rounded-sm flex flex-row items-start justify-start">
              </div>
              <div className="relative leading-[18px] font-medium inline-block ">
                Directores
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-center pt-[0.3px] pb-[0.2px] pr-[7px] pl-0">
          <div className="flex flex-col items-start justify-start pt-0 px-0 pb-0">
            <div className="rounded-[5.25px] flex flex-row items-center justify-start py-[3px] px-[7px] gap-[3.5px] border-[1px] border-solid border-slate-300">
              <div className="flex flex-row items-start justify-start">
                <img
                  className="h-[13px] w-[13.8px] relative overflow-hidden shrink-0"
                  alt=""
                  src="ModuloEvento/Vectorestrella.svg"
                />
              </div>
              <div className="relative leading-[18px] font-medium inline-block min-w-[117px]">
                Relaciones publicas
              </div>
            </div>
          </div>
        </div>

        <div className="w-auto flex flex-col items-start justify-center pt-[0.3px] pb-[0.2px] pr-[7px] pl-0 box-border">
          <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-0">
            <div className="self-stretch rounded-[5.25px] flex flex-row items-center justify-start py-[3px] px-[7px] gap-[3.5px] border-[1px] border-solid border-slate-300">
              <div className="h-[13px] w-[10.7px] bg-blue-700 rounded-sm flex flex-row items-start justify-start">
              </div>
              <div className="relative leading-[18px] font-medium inline-block min-w-[49px]">
                Control de Aforo
              </div>
            </div>
          </div>
        </div>

        <div className="w-auto flex flex-col items-start justify-start">
          <div className="self-stretch rounded-[5.25px] flex flex-row items-center justify-start py-[3px] pr-1.5 pl-2 gap-[3.5px] border-[1px] border-solid border-slate-300">
          <div className="h-[13px] w-[10.7px] bg-blue-700 rounded-sm flex flex-row items-start justify-start">
              </div>
            <div className="relative leading-[18px] font-medium inline-block min-w-[56px]">
              Reservaciones
            </div>
          </div>
        </div>

      </div>

      <section className="self-stretch shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] rounded-md bg-white overflow-hidden flex flex-col items-start justify-start max-w-full text-center text-xs text-profourvenuescom-black font-profourvenuescom-inter-regular-123">
          
            <div className="self-stretch overflow-x-auto flex flex-row items-center justify-between pr-[50px] max-w-full [row-gap:20px] border-b-[1px] border-solid border-slate-200">
              
              <div className="flex flex-row items-center justify-center gap-2">
              <div className="flex flex-col items-start justify-center pt-[7px] pb-1.5  pl-[33.4px] ">
                <b className="relative leading-[17px] inline-block min-w-[8px]">
                  5
                </b>
              </div>

              <div className="box-border flex flex-col items-start justify-center pt-[7px] px-0 pb-1.5  max-w-full text-left  mq675:min-w-full">
                <b className="w-[63px] h-[17px] relative leading-[17px] flex items-center min-w-[43px] p-0">
                  Nombre
                </b>
              </div>
              </div>

              <div className="box-border flex flex-col items-start justify-center pt-[7px]  pb-1.5 max-w-full  mq675:pl-[95px] mq675:pr-[95px] mq675:box-border">
                <b className="relative leading-[17px] inline-block min-w-[97px] whitespace-nowrap">
                  Sesiones abiertas
                </b>
              </div>

            </div>

            <div className="self-stretch flex flex-col items-start justify-center max-w-full text-left text-sm">
              
            <Comp5 title={"Eduardo Hernandez"} subtitle={"Rd"} tags={"#Directores"} img={"ModuloEvento/imgE.svg"} />
            <Comp5 title={"Christian Lanza"} subtitle={""} tags={"#ControlDeAforo"} img={"ModuloEvento/imgC.svg"} />
            <Comp5 title={"Juan C. Carrillo"} subtitle={""} tags={"#Directores"} img={"ModuloEvento/imgJ.svg"} />
            <Comp5 title={"Maria Perez"} subtitle={""} tags={"#RelacionesPublicas"} img={"ModuloEvento/imgM.svg"} />
            </div>
        
      </section>

    </div>
  );
};

export default Usuarios;
