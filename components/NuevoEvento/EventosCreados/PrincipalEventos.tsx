import { FC } from "react";
import Component1 from "./Component1";
import Component2 from "./Component2";
import Card1 from "./CardEvento"
import ModoDemo from "../Principal/ModoDemo";
interface propsEventosCreados {
    componentState: any;
    setComponentState: any;
  
  }

const EventosCreados: FC <propsEventosCreados> = ({componentState,setComponentState}) => {
  return (
    <div className="w-auto relative bg-whitesmoke flex flex-col items-start justify-start py-[30px] px-[20px] box-border gap-[30px]">
              <ModoDemo/>
      <Component1 componentState={componentState} setComponentState={setComponentState} />
      <Component2 />

      {/* seccion de tags y crear evento/ver tus ventas */}

      <div className="  w-auto self-stretch flex flex-col items-start justify-start text-md ">
        <div className="self-stretch flex flex-row items-start justify-between box-border">

                <div className="flex flex-row items-start justify-start pt-0 pb-px pr-[29px] pl-7 border-b-[1px] border-solid border-slate-300">
                  <div className="flex flex-col items-start justify-start">
                    
                    <div className="flex flex-col items-center justify-start pt-[7px] pb-[11px] pr-[15px] pl-[20.729610443115234px]">
                      <div className="w-auto h-[18px] relative leading-[17.5px] font-medium inline-block">
                        Eventos pasados
                      </div>
                    </div>

                  </div>

                  <div className="flex flex-col items-start justify-start py-0 pr-0 pl-3.5 text-rosa">
                    <div className="flex flex-col items-start justify-start">
                      <div className="flex flex-col items-center justify-start pt-[7px] pb-[11px] pr-[15px] pl-[20.690715789794922px] border-b-[2px] border-solid border-rosa">
                        <b className="w-auto h-[18px] relative leading-[17.5px] inline-block">
                          Próximos eventos
                        </b>
                      </div>
                    </div>
                  </div>

                </div>

          <div className=" flex flex-row items-start justify-start py-0 pr-px pl-0 gap-[6.99px] text-rosa font-pro-fourvenues-com-beach-aguilas-calendar-1318x573-default-2-font-awesome-5-free-regular-105">
            <div className="flex flex-col items-start justify-start">
              <div className="rounded-md box-border flex flex-row items-center justify-center py-[9.75px] px-[17px] gap-[8.77px] border-[1px] border-solid border-slate-200">
                <div className="flex flex-col items-center justify-start pt-0.5 px-0 pb-[2.5px]">
                  <div className="w-[13px] h-[13px] relative leading-[12.25px] inline-block">
                <img className="h-auto w-auto relative overflow-hidden shrink-0"
                 src="ModuloEvento/checkIcon1.svg" 
                 alt=""/>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start text-black font-bold">
                  <div className="w-auto h-auto relative leading-[17.5px] font-semibold inline-block">
                    Ver tus ventas
                  </div>
                </div>
              </div>
            </div>
            <div onClick={()=>{ 
        setComponentState(2)
      }} 
            className="cursor-pointer flex flex-col items-start justify-start text-white font-semibold">
              <div className="rounded-md bg-rosa box-border flex flex-row items-center justify-center py-[9.75px] px-[17px] gap-[10.43px] border-[1px] border-solid border-rosa">
                <div className="flex flex-col items-center justify-start pt-0.5 px-0 pb-[2.5px]">
                  <div className="flex flex-row items-start justify-start">
                    <img
                      className="h-[13px] w-[10.7px] relative overflow-hidden shrink-0"
                      alt=""
                      src="ModuloEvento/icon-42.svg"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start">
                  <div className="w-auto h-auto relative leading-[17.5px] inline-block">
                    Crear evento
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* cards de los eventos ya creados */}

        <div className="w-auto flex flex-col items-start justify-start gap-[14px]">
          <div className="w-auto h-[21px] relative leading-[21px] font-semibold inline-block text-left text-sm">
            Febrero
          </div>
          <Card1 componentState={componentState} setComponentState={setComponentState}/>

        </div>
      </div>
    
  );
};

export default EventosCreados;