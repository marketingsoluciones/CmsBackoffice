import { FC, FunctionComponent } from "react";
import Component2CE from "./Component2CE";
import Component3CE from "./Component3CE";
import ModoDemo from "../Principal/ModoDemo";
interface propsConfigurarEvento {
    componentState: any;
    setComponentState: any;
  
  }

const ConfigurarEvento: FC <propsConfigurarEvento> = ({componentState,setComponentState}) => {
  return (
    <div className="w-full relative bg-whitesmoke flex flex-col items-center justify-start pt-0 px-0 pb-[30px] box-border gap-[37px] tracking-[normal] text-center text-2xs-5 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-16475x71625-default-inter-semi-bold-263 mq750:gap-[18px]">
               
       {/* seccion 1 */}
      <div className="self-stretch overflow-hidden flex flex-row items-start justify-between py-[3.5px] pr-7 pl-[27.989999771118164px]"> 
        <div className="flex flex-row flex-wrap items-start justify-start py-0 pl-0 ">
           
          <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[11px] pl-0 box-border">
            
         
            <div className="w-auto rounded-md flex flex-row items-center justify-center p-[4.75px] box-border gap-[3.5px] text-sm text-black">
              <div className="flex flex-col items-center justify-start pt-[1.25px] px-0 pb-[2.729999542236328px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-2.5 w-[9.2px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/icon.svg"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-row items-center justify-start">
                  <div className="flex flex-col items-start justify-start py-0 pr-0.5 pl-0">
                    <div className="flex flex-col items-center justify-start">
                      <b className="w-auto h-3.5 relative leading-[14px] inline-block">
                        <span className="uppercase">{`Mié. `}</span>20
                      </b>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start ml-[-0.01px]">
                    <div className="overflow-hidden flex flex-col items-center justify-start ">
                      <div className="w-auto h-3.5 relative leading-[14px] font-semibold inline-block">
                        Playa y Rumba
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start text-left text-sm text-lightgray-100">
            <div className="w-auto h-auto relative leading-[21px] inline-block">
              /
            </div>
          </div>
          <div className="flex flex-col items-start justify-start text-gray-400 text-sm    ">
            <div className="rounded-md flex flex-row items-center justify-center p-[4.75px] box-border gap-[3.5px] ">
              <div className="flex flex-col items-center justify-start pt-[1.25px] px-0 pb-[2.729999542236328px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-2.5 w-auto relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/icon-1.svg"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-start">
                <div className="w-auto h-3.5 relative leading-[14px] font-semibold inline-block">
                  Configuración
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <ModoDemo/>
       {/* seccion 2 */}

      <Component2CE componentState={componentState} setComponentState={setComponentState}/>
       
       {/* seccion 3 */}

      <div className="self-stretch rounded-t-2xl rounded-b-none overflow-hidden flex flex-row items-start justify-center py-3.5 px-7 gap-[20px] mq750:flex-wrap">
        
        <button onClick={()=>{ 
        setComponentState(10)
      }} className="cursor-pointer [border:none] py-3.5 pr-[11px] pl-3.5 bg-white w-[90px] rounded-md shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start box-border">
          <div className="self-stretch h-[24.5px] flex flex-row items-center justify-start pt-0 px-0 pb-[4.989999771118164px] box-border">
            <div className="flex flex-row items-start justify-start">
              <img
                className="h-[13.8px] w-3.5 relative overflow-hidden shrink-0"
                alt=""
                src="ModuloEvento/Listas.svg"
              />
            </div>
            <div className="h-auto flex-1 relative text-sm leading-[21px] font-semibold text-black text-left inline-block">
              {" "}
               Listas
            </div>
          </div>
        </button>

        <button className="cursor-pointer [border:none] py-3.5 pr-2.5 pl-3.5 bg-white w-[111px] rounded-md shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start box-border">
          <div className="self-stretch h-[24.5px] flex flex-row items-center justify-start pt-0 pb-[4.989999771118164px] pr-px pl-0 box-border">
            <div className="flex flex-row items-start justify-start">
              <img
                className="h-[13.8px] w-[15.8px] relative overflow-hidden shrink-0"
                alt=""
                src="ModuloEvento/entradas.svg"
              />
            </div>
            <div className="h-[21px] flex-1 relative text-sm leading-[21px] font-semibold font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-16475x71625-default-inter-semi-bold-263 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black text-left inline-block">
              {" "}
               Entradas
            </div>
          </div>
        </button>

        <button className="cursor-pointer [border:none] py-3.5 pr-[11px] pl-3.5 bg-white w-[88px] rounded-md shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start box-border">
          <div className="self-stretch h-[24.5px] flex flex-row items-center justify-start pt-0 px-0 pb-[4.989999771118164px] box-border">
            <div className="flex flex-row items-start justify-start">
              <img
                className="h-[13.8px] w-[12.3px] relative overflow-hidden shrink-0"
                alt=""
                src="ModuloEvento/pases.svg"
              />
            </div>
            <div className="h-auto flex-1 relative text-sm leading-[21px] font-semibold text-black text-left inline-block">
              {" "}
               Pases
            </div>
          </div>
        </button>

        <button className="cursor-pointer [border:none] p-3.5 bg-white rounded-md shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start">
          <div className="h-[24.5px] flex flex-row items-center justify-start pt-0 px-0 pb-[4.989999771118164px] box-border">
            <div className="flex flex-row items-start justify-start">
              <img
                className="h-[13.8px] w-[17.5px] relative overflow-hidden shrink-0"
                alt=""
                src="ModuloEvento/accesos.svg"
              />
            </div>
            <div className="h-auto w-auto relative text-sm leading-[21px] font-semibold text-black text-left inline-block">
              {" "}
               Acceso RRPP
            </div>
          </div>
        </button>

        <button className="cursor-pointer [border:none] p-3.5 bg-white rounded-md shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start">
          <div className="h-[24.5px] flex flex-row items-center justify-start pt-0 px-0 pb-[4.989999771118164px] box-border">
            <div className="flex flex-row items-start justify-start">
              <img
                className="h-[13.8px] w-[10.5px] relative overflow-hidden shrink-0"
                alt=""
                src="ModuloEvento/reservas.svg"
              />
            </div>
            <div className="h-auto w-auto relative text-sm leading-[21px] font-semibold text-black text-left inline-block">
              {" "}
               Reservas
            </div>
          </div>
        </button>

      </div>
      <Component3CE componentState={componentState} setComponentState={setComponentState}/>
    </div>
  );
};

export default ConfigurarEvento;