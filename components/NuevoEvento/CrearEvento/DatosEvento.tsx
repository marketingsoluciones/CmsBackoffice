import { FC, FunctionComponent } from "react";
import Dato1 from "./ComDato1";
import ModoDemo from "../Principal/ModoDemo";
import TabComponent from "./TabComponent";
interface propsDatoEvento {
    componentState: any;
    setComponentState: any;
  
  }

const DatoEvento: FC <propsDatoEvento> = ({componentState,setComponentState}) => {
  return (
    <div className="w-full relative bg-slate-100 flex flex-col items-center justify-start pt-0 px-0 pb-[30px] box-border gap-[37px] tracking-[normal] text-center text-lightgray-100 ">
      
      {/* Seccion 1 */}

      <div className="self-stretch overflow-hidden flex flex-col items-start justify-start py-[3.5px] pr-[27.989980697631836px] pl-[27.989999771118164px] shrink-0">
        <div className="w-auto flex flex-row flex-wrap items-center justify-start py-0 pr-px pl-0 ">
          <div className="flex flex-col items-start justify-start text-black">
            <div className="flex flex-row items-center justify-center py-[4.75px] px-[5px] box-border gap-[3.5px]">
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
              <div className="flex flex-col items-start justify-start text-sm">
                <div className="flex flex-row items-center justify-start">
                  <div className="w-[auto flex flex-col items-start justify-start py-0 pr-px pl-0 box-border">
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <b className="w-auto h-3.5 relative leading-[14px] inline-block">
                        <span className="uppercase">{`Mié. `}</span>20
                      </b>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start ml-[-0.01px] text-black">
                    <div className="overflow-hidden flex flex-col items-center justify-start">
                      <div className="w-auto h-3.5 relative leading-[14px] font-semibold inline-block">
                         Rumba y PLaya
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start text-left text-sm">
            <div className="w-auto h-[21px] relative leading-[21px] inline-block">
              /
            </div>
          </div>
          <div className="flex flex-col items-start justify-start text-black">
            <div className="flex flex-row items-center justify-center p-[4.75px] box-border gap-[3.5px]">
              <div className="flex flex-col items-center justify-start pt-[1.25px] px-0 pb-[2.729999542236328px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-2.5 w-[10.5px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/icon-14.svg"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-start text-sm">
                <div className="w-auto h-3.5 relative leading-[14px] font-semibold inline-block">
                  Configuración
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start text-left text-sm">
            <div className="w-auto h-[21px] relative leading-[21px] inline-block">
              /
            </div>
          </div>
          <div className="flex flex-col items-start justify-start text-gray-400 text-sm">
            <div className="flex flex-row items-center justify-center p-[4.75px] box-border gap-[3.34px] ">
              <div className="flex flex-col items-center justify-start pt-[1.25px] px-0 pb-[2.729999542236328px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-2.5 w-[11.8px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/icon-21.svg"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-start">
                <div className="w-auto h-3.5 relative leading-[14px] font-semibold inline-block">
                  Datos del evento
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Alerta Modo demo */}

        <ModoDemo/>

        {/* Seccion 2 */}

      <div className="w-[1048px] flex flex-row items-start justify-between py-0 px-5 box-border gap-[20px] max-w-full shrink-0 text-left text-7xl-3 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-ebony mq450:flex-wrap">
        <div className="w-[278px] flex flex-col items-start justify-start py-0 pr-[7px] pl-0 box-border">
          <div className="self-stretch overflow-hidden flex flex-col items-start justify-start">
            <div className="self-stretch flex flex-row items-center justify-start py-0 pr-px pl-0">
              <div 
              onClick={()=>{ 
          setComponentState(3)
      }} 
              className=" cursor-pointer flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                <div className="w-[37px] h-[37px] rounded-9980xl flex flex-row items-center justify-center pt-[5.369999885559082px] px-[7px] pb-[5.370001792907715px] box-border">
                  <div className="flex flex-col items-start justify-start">
                    <div className="flex flex-row items-start justify-start">
                      <img
                        className="h-[26.3px] w-[23px] relative overflow-hidden shrink-0"
                        loading="lazy"
                        alt=""
                        src="ModuloEvento/FlechaIzquerda.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[9px] pl-0 ml-[-0.01px]">
                <div className="self-stretch overflow-hidden flex flex-col items-start justify-start">
                  <div className="w-[214px] h-[31.5px] relative leading-[31.5px] font-semibold inline-block max-h-[31.5px] mq450:text-2xl mq450:leading-[25px]">
                    Datos del evento
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" cursor-pointer flex flex-col items-start justify-start">
          <div className="w-auto rounded-md bg-slate-200 box-border flex flex-row items-center justify-center pt-[6.25px] px-[9px] pb-[6.250001907348633px] border-[1px] border-slate-200">
            <div className="flex flex-col items-center justify-start pt-[3.75px] px-0 pb-[4.489999771118164px]">
              <div className="flex flex-row items-start justify-start">
                <img
                  className="h-[16.3px] w-[15.8px] relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="ModuloEvento/trespuntos.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Seccion 3 */}
      <main className="w-auto flex flex-col items-start justify-start py-0 pr-[22px] pl-5 gap-6 box-border shrink-0">        

<TabComponent  componentState={componentState} setComponentState={setComponentState} />       
      </main>
    </div>
  );
};

export default DatoEvento;