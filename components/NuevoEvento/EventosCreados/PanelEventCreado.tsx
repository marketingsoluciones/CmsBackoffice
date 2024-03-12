import { FC, FunctionComponent } from "react";
import CeCreado1 from "./CompEventCreado1";
import CeCreado2 from "./CompEventCreado2";
import ModoDemo from "../Principal/ModoDemo";
interface propsDescripcionEvento {
    componentState: any;
    setComponentState: any;
  
  }

const DescripcionEvento: FC <propsDescripcionEvento> = ({componentState,setComponentState}) => {
  return (
    <div className="w-[1100px] bg-slate-100 flex flex-col items-start justify-start pt-7 pb-[67px] pr-[15px] pl-7 box-border gap-[28px] tracking-[normal] text-left text-7xl-3">
      <ModoDemo />
    {/* seccion 1 */}

      <div className="self-stretch w-full flex flex-row flex-wrap items-center justify-between [row-gap:20px]">

            <div className="flex flex-row items-center justify-start box-border [row-gap:20px] mq450:pr-5 mq450:box-border mq750:flex-wrap mq750:pr-[186px] mq750:box-border">
              
              <div onClick={()=>{ 
        setComponentState(1)
      }} 
              className=" cursor-pointer flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                      <img
                        className="h-[26px] w-[23px] relative overflow-hidden shrink-0"
                        loading="lazy"
                        alt=""
                        src="ModuloEvento/vectorF.svg"
                      />

              </div>

              <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[9px] pl-0 box-border">
                <div className="self-stretch overflow-hidden flex flex-col items-start justify-start">
                  <div className="w-auto h-[31.5px] relative leading-[31.5px] font-semibold inline-block max-h-[31.5px] mq450:text-2xl mq450:leading-[25px]">
                    Playa y Rumba
                  </div>
                </div>
              </div>
            </div>

        <div className="w-auto flex flex-row items-start justify-start gap-[7px] mq750:flex-wrap">
         
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-auto flex flex-col items-start justify-start">
            <div className="w-auto rounded-md box-border flex flex-row items-center justify-center py-[9.75px] px-[17px] gap-[9.77px] border-[1px] border-solid border-slate-200">
              <div className="w-auto flex flex-col items-center justify-start pt-0.5 px-0 pb-[2.5px] box-border">
                <div className="self-stretch h-auto relative text-smi-3 leading-[12.25px] text-rosa text-center inline-block">
                 <img src="ModuloEvento/Symbol1.svg" alt="" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-start">
                <div className="self-stretch w-auto relative text-sm leading-[17.5px] font-semibold text-black text-center inline-block">
                  Ver tus ventas
                </div>
              </div>
            </div>
          </button>

          <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-auto flex flex-col items-start justify-start text-sm text-white">
            <div className="w-auto rounded-md bg-rosa box-border flex flex-row items-center justify-center py-[9.75px] px-[17px] gap-[9.97px] border-[1px] border-solid border-rosa">
              <div className="w-auto flex flex-col items-center justify-start">
                <div className="self-stretch h-auto relative text-smi-3 leading-[17.5px] font-semibold text-center inline-block">
                  Recepción
                </div>
              </div>

              <div className="flex flex-col items-center justify-start ">
         
                  <img
                    className="h-4 w-[14.3px] relative overflow-hidden shrink-0"
                    alt=""
                    src="ModuloEvento/iconf1.svg"
                  />
            
              </div>

            </div>
          </button>

          <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[114.3px] flex flex-col items-start justify-start text-sm">
            <div className="w-full rounded-md bg-rosa box-border flex flex-row items-center justify-center py-[9.75px] px-[17px] gap-[10.07px] border-[1px] border-solid border-rosa">
              <div className="w-auto flex flex-col items-center justify-start">
                <div className="self-stretch h-auto relative text-smi-3 leading-[17.5px] font-semibold text-white text-center inline-block ">
                  Informes
                </div>
              </div>
              <div className="flex flex-col items-center justify-start pt-[0.07999999821186066px] px-0 pb-[1.4199999570846558px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-4 w-[14.3px] relative overflow-hidden shrink-0"
                    alt=""
                    src="ModuloEvento/iconf1.svg"
                  />
                </div>
              </div>
            </div>
          </button>

          <button className="cursor-pointer [border:none] p-0 bg-[transparent] flex-1 flex flex-col items-start justify-start text-sm text-white">
            <div className="w-auto rounded-md bg-rosa box-border flex flex-row items-center justify-center py-[9.75px] px-[17px] gap-[10.41px] border-[1px] border-solid border-rosa">
              <div className="flex flex-col items-center justify-start ">
                  <img
                    className="h-[16px] w-[16px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/config.svg"
                  />
              </div>
              <div className="flex-1 flex flex-col items-center justify-start">
                <div className="self-stretch h-[17.5px] relative text-smi-3 leading-[17.5px] font-semibold font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-medium-123 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-nero text-center inline-block max-h-[17.5px]">
                  Configurar evento
                </div>
              </div>
            </div>
          </button>
        </div>

      </div>

    {/* Seccion 2 */}

      <div className="self-stretch flex flex-col items-end justify-start py-0 px-px box-border gap-[35px] mq750:gap-[17px]">
        
        <section className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[5px] shrink-0 text-left">
          <img
            className="h-[98.3px] w-[84px] relative rounded-md overflow-hidden shrink-0 object-cover"
            loading="lazy"
            alt=""
            src="ModuloEvento/img1.svg"
          />
          <div className="flex flex-row items-start justify-between py-[7px] px-0 box-border max-w-full gap-[20px] lg:flex-wrap mq1050:min-w-full">
            
            {/* sub-seccion 1 */}
            <div className="flex flex-col items-start justify-start gap-[5px]">

              <div className="flex flex-row items-center justify-start gap-[1px]">
                <div className="flex flex-col items-start justify-start text-base-7 font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-font-awesome-5-free-solid-105">
                  <div className="w-3.5 h-[15.8px] relative leading-[15.75px] inline-block max-h-[15.75px]">
                    
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start pt-[2.5px] pb-1 pr-[2.479999542236328px] pl-0">
                  <div className="w-auto h-[25px] relative leading-[24.5px] uppercase inline-block box-border pr-0">
                    Jue.
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start pt-[2.5px] pb-1 pr-[3px] pl-0">
                  <b className="w-auto h-[25px] relative leading-[24.5px] inline-block">
                    29
                  </b>
                </div>
                <div className="flex flex-col items-start justify-start pt-[2.5px] pb-1 pr-[3px] pl-0">
                  <div className="w-auto h-[25px] relative leading-[24.5px] uppercase inline-block">
                    Febrero
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start pt-[2.5px] px-0 pb-1">
                  <div className="w-auto h-[25px] relative leading-[24.5px] uppercase inline-block">
                    2024
                  </div>
                </div>
              </div>

              <div className="overflow-hidden flex flex-row items-center justify-start py-0 pr-5 pl-0 text-smi-3 text-gray-400">
                <div className="h-[13px] w-[13px] relative leading-[12.25px] inline-block">
                 <img src="ModuloEvento/reg.svg" alt="" />
                </div>
                <div className="w-auto relative leading-[17.5px] font-medium inline-block whitespace-nowrap">
                   00:00 - 07:30
                </div>
              </div>
              <div className="rounded-md bg-red-300 flex flex-col items-start justify-start pt-[2px] pb-[2px] pr-[8px] pl-[8px] text-xs text-red-800">
                <div className="relative leading-[14px] font-semibold inline-block whitespace-nowrap">
                  +18
                </div>
              </div>
            </div>

            <div className="w-auto flex flex-row items-start justify-center gap-[10px] text-right text-smi-3 text-text-primary mq750:flex-wrap">
              <div className="rounded-md bg-white shadow-[0px_1px_5px_rgba(0,_0,_0,_0.12),_0px_2px_2px_rgba(0,_0,_0,_0.14),_0px_3px_1px_-2px_rgba(0,_0,_0,_0.2)] flex flex-col items-end justify-start pt-[10.5px] px-3.5 pb-2.5 box-border min-w-[142px] min-h-[100px] shrink-0 mq450:flex-1 mq750:min-h-[auto]">
                <div className="flex flex-col items-start justify-start">
                    <div className="w-auto h-auto relative leading-[17.5px] font-medium inline-block text-sm text-gray-400">
                      A. RRPP
                  </div>
                  <div className="flex flex-col items-end justify-start text-7xl-3 text-gray-600">
                    <div className="w-auto h-auto relative leading-[31.5px] text-xl font-medium inline-block mq450:text-2xl mq450:leading-[25px]">
                      200 €
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-white shadow-[0px_1px_5px_rgba(0,_0,_0,_0.12),_0px_2px_2px_rgba(0,_0,_0,_0.14),_0px_3px_1px_-2px_rgba(0,_0,_0,_0.2)] flex flex-col items-end justify-start py-[10.5px] pr-3.5 pl-[11px] box-border gap-[5px] min-w-[142px] min-h-[100px] shrink-0 mq450:flex-1">
                <div className="flex flex-col items-start justify-start">
 
                    <div className="h-[17.5px] w-auto relative leading-[17.5px] font-medium inline-block text-gray-400 text-xs max-h-[17.5px]">
                      ENTRADAS
                    
                  </div>
                  <div className="w-auto h-[31.5px] relative leading-[31.5px] font-medium text-gray-400 text-xl inline-block max-h-[31.5px] whitespace-nowrap mq450:text-2xl mq450:leading-[25px]">
                    1000 €
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[2px] text-left text-2xs-5 font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-font-awesome-5-free-solid-105">
                  <div className="flex flex-row items-end justify-start gap-[2.8px]">
                    <div className="h-3 w-[9px] flex flex-col items-start justify-start pt-0 px-0 pb-px box-border">
                      <div className="self-stretch flex-1 relative leading-[10.5px] flex items-center">
                        
                      </div>
                    </div>
                    <div className="h-3.5 w-auto relative leading-[14px] text-xs inline-block">
                      {" "}
                      800/3000
                    </div>
                  </div>
                  <div className="w-full rounded-full h-1.5 dark:bg-slate-300">
  <div className="bg-blue-600 h-1.5 rounded-full dark:bg-rosa" style={{ width: "25%" }}></div>
</div>
                </div>
              </div>

              <div className="rounded-md bg-white shadow-[0px_1px_5px_rgba(0,_0,_0,_0.12),_0px_2px_2px_rgba(0,_0,_0,_0.14),_0px_3px_1px_-2px_rgba(0,_0,_0,_0.2)] flex flex-col items-end justify-start py-[10.5px] pr-3.5 pl-[11px] box-border gap-[5px] min-w-[142px] min-h-[100px] shrink-0 mq450:flex-1">
                <div className="flex flex-col items-start justify-start">

                    <div className="h-[17.5px] w-auto relative leading-[17.5px] font-medium text-gray-400 inline-block text-xs max-h-[17.5px]">
                      LISTAS
                  </div>
                  <div className="w-auto h-[31.5px] relative leading-[31.5px] font-medium text-gray-400 text-xl inline-block max-h-[31.5px] whitespace-nowrap mq450:text-2xl mq450:leading-[25px]">
                    150 €
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[2px] text-left text-2xs-5 font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-font-awesome-5-free-solid-105">
                  <div className="flex flex-row items-end justify-start gap-[2.8px]">
                    <div className="h-3 w-[9px] flex flex-col items-start justify-start pt-0 px-0 pb-px box-border">
                      <div className="self-stretch flex-1 relative leading-[10.5px] flex items-center">
                        
                      </div>
                    </div>
                    <div className="h-3.5 w-auto relative leading-[14px] text-xs inline-block">
                      {" "}
                      1500/20000
                    </div>
                  </div>
                  <div className="w-full rounded-full h-1.5 dark:bg-slate-300">
  <div className="bg-blue-600 h-1.5 rounded-full dark:bg-rosa" style={{ width: "25%" }}></div>
</div>
                </div>
              </div>

              <div className="rounded-md bg-white shadow-[0px_1px_5px_rgba(0,_0,_0,_0.12),_0px_2px_2px_rgba(0,_0,_0,_0.14),_0px_3px_1px_-2px_rgba(0,_0,_0,_0.2)] flex flex-col items-end justify-start py-[10.5px] pr-3.5 pl-[11px] box-border gap-[5px] min-w-[142px] min-h-[100px] shrink-0 mq450:flex-1">
                <div className="flex flex-col items-start justify-start">

                    <div className="h-[17.5px] w-auto relative leading-[17.5px] font-medium text-gray-400 inline-block text-xs max-h-[17.5px]">
                      RESERVAS
                    </div>
                  <div className="w-auto h-[31.5px] relative leading-[31.5px] font-medium text-gray-400 text-xl inline-block max-h-[31.5px] whitespace-nowrap mq450:text-2xl mq450:leading-[25px]">
                    300 €
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[2px] text-left text-2xs-5 font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-font-awesome-5-free-solid-105">
                  <div className="flex flex-row items-end justify-start gap-[2.8px]">
                    <div className="h-3 w-[9px] flex flex-col items-start justify-start pt-0 px-0 pb-px box-border">
                      <div className="self-stretch flex-1 relative leading-[10.5px] flex items-center">
                        
                      </div>
                    </div>
                    <div className="h-3.5 w-auto relative leading-[14px] text-xs inline-block">
                      {" "}
                      3/20
                    </div>
                  </div>
                  <div className="w-full rounded-full h-1.5 dark:bg-slate-300">
  <div className="bg-blue-600 h-1.5 rounded-full dark:bg-rosa" style={{ width: "25%" }}></div>
</div>
                </div>
              </div>

              <div className="rounded-md bg-white shadow-[0px_1px_5px_rgba(0,_0,_0,_0.12),_0px_2px_2px_rgba(0,_0,_0,_0.14),_0px_3px_1px_-2px_rgba(0,_0,_0,_0.2)] flex flex-col items-end justify-start py-[10.5px] pr-3.5 pl-[11px] box-border gap-[5px] min-w-[142px] min-h-[100px] shrink-0 mq450:flex-1">
                <div className="flex flex-col items-start justify-start">

                    <div className="h-[17.5px] w-auto relative leading-[17.5px] font-medium text-gray-400 inline-block text-xs max-h-[17.5px]">
                      TOTAL
                  </div>
                  <div className="w-auto h-[31.5px] relative leading-[31.5px] font-medium text-gray-400 text-xl inline-block max-h-[31.5px] whitespace-nowrap mq450:text-2xl mq450:leading-[25px]">
                    1650 €
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>
        <section className="w-[1247.5px] flex flex-row items-start justify-start py-0 px-[45px] box-border shrink-0 max-w-full text-left text-mid-5 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-black font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-medium-123 lg:pl-[22px] lg:pr-[22px] lg:box-border">
          <div className="flex-1 flex flex-row items-start justify-start gap-[36px] max-w-full mq750:gap-[18px] mq1050:flex-wrap">
            <div className="flex-1 flex flex-col items-start justify-start gap-[9.92px] max-w-full mq750:min-w-full">
              <div className="w-[168px] h-[25px] relative leading-[24.5px] font-semibold inline-block">
                Informes del evento
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-[10px] max-w-full text-sm mq750:flex-wrap">
                <div className="h-[105.5px] rounded-2xs-5 bg-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-nero shadow-[0px_1px_10px_rgba(0,_0,_0,_0.12),_0px_4px_5px_rgba(0,_0,_0,_0.14),_0px_2px_4px_-1px_rgba(0,_0,_0,_0.2)] overflow-hidden flex flex-row items-start justify-start [transform:_rotate(180deg)] min-w-[226px] mq750:flex-1">
                  <div className="self-stretch flex flex-row items-start justify-start">
                    <div className="self-stretch flex flex-col items-start justify-start pt-[10.5px] px-[10.5px] pb-2.5">
                      <div className="flex flex-row items-start justify-start pt-[7px] pb-0 pr-[21px] pl-0 [transform:_rotate(180deg)]">
                        <div className="h-[21px] w-[130px] relative leading-[21px] font-semibold inline-block">
                          Usuarios y equipos
                        </div>
                      </div>
                      <div className="flex flex-row items-start justify-start [transform:_rotate(180deg)] text-2xs-5 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-gull-gray">
                        <div className="h-[21px] w-[151px] relative leading-[21px] inline-block">
                          Ranking de usuarios y equipos
                        </div>
                      </div>
                    </div>
                    <div className="h-[106px] w-[54px] flex flex-col items-center justify-start pt-[12.5px] pb-[60px] pr-[13.869999885559082px] pl-[13.880000114440918px] box-border relative">
                      <div className="my-0 mx-[!important] absolute top-[12.5px] left-[calc(50%_-_13.1px)] flex flex-row items-start justify-start">
                        <img
                          className="h-[26px] w-[26.3px] relative overflow-hidden shrink-0 [transform:_rotate(-180deg)]"
                          loading="lazy"
                          alt=""
                        />
                      </div>
                      <div className="w-full h-full absolute my-0 mx-[!important] top-[0%] right-[0%] bottom-[0.47%] left-[0%] bg-royalblue z-[1]" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 shadow-[0px_1px_10px_rgba(0,_0,_0,_0.12),_0px_4px_5px_rgba(0,_0,_0,_0.14),_0px_2px_4px_-1px_rgba(0,_0,_0,_0.2)] flex flex-row items-start justify-start min-w-[302px] max-w-full text-center text-2xs-5">
                  <div className="w-[465px] rounded-2xs-5 bg-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-nero shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] overflow-hidden shrink-0 flex flex-col items-start justify-start min-h-[99px] max-w-full">
                    <div className="ml-[-12.5px] mb-[10.5px] w-[490.3px] flex flex-row items-center justify-start shrink-0 max-w-[105%] [row-gap:20px] mq750:flex-wrap">
                      <div className="flex-1 flex flex-col items-start justify-start min-w-[164px]">
                        <div className="self-stretch flex flex-col items-center justify-start py-0 pr-[57.06463623046875px] pl-[57.38536071777344px]">
                          <div className="w-10 h-3.5 relative leading-[14px] uppercase flex items-center justify-center">
                            Chicas
                          </div>
                        </div>
                        <div className="self-stretch flex flex-col items-center justify-start py-0 pr-[61px] pl-[61.908653259277344px] text-2xl text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-amethyst">
                          <div className="self-stretch h-7 relative leading-[28px] font-medium inline-block mq450:text-mid mq450:leading-[22px]">
                            60%
                          </div>
                        </div>
                      </div>
                      <div className="w-[154.4px] flex flex-col items-start justify-start">
                        <div className="self-stretch flex flex-col items-center justify-start py-0 pr-[45px] pl-[45.412357330322266px]">
                          <div className="self-stretch h-3.5 relative leading-[14px] uppercase inline-block">
                            Sin género
                          </div>
                        </div>
                        <div className="self-stretch flex flex-col items-center justify-start py-0 pr-[61px] pl-[61.91865539550781px] text-2xl text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-slate-gray">
                          <div className="self-stretch h-7 relative leading-[28px] font-medium inline-block mq450:text-mid mq450:leading-[22px]">
                            5%
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col items-start justify-start min-w-[164px]">
                        <div className="self-stretch flex flex-col items-center justify-start py-0 pr-[56.56824493408203px] pl-[56.88175201416016px]">
                          <div className="w-[41px] h-3.5 relative leading-[14px] uppercase flex items-center justify-center">
                            Chicos
                          </div>
                        </div>
                        <div className="self-stretch flex flex-col items-center justify-start py-0 pr-[61px] pl-[61.908653259277344px] text-2xl text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-dodger-blue">
                          <div className="self-stretch h-7 relative leading-[28px] font-medium inline-block mq450:text-mid mq450:leading-[22px]">
                            35%
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white" />
                    <div className="self-stretch flex flex-row items-start justify-center py-0 pr-5 pl-[21px] text-xs-9 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-ebony">
                      <div className="h-6 w-[130px] relative leading-[24px] flex items-center justify-center">
                        Ver informe de clientes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-[17px] mq750:flex-wrap">
                <CeCreado1
                  icon="26.25x26x-1612832161"
                  tarifas="Tarifas"
                  recuentoPorTarifa="Recuento por tarifa"
                  propWidth="171px"
                  propLeft="calc(50% - 13.1px)"
                  propWidth1="26.3px"
                  propBackgroundColor="rgba(15, 23, 42, 0.1)"
                />
                <CeCreado1
                  icon="29.53x26x-1261380472"
                  tarifas="Entradas"
                  recuentoPorTarifa="Ranking de usuarios y equipos"
                  propWidth="226px"
                  propFlex="unset"
                  propMinWidth="unset"
                  propLeft="calc(50% - 14.7px)"
                  propWidth1="29.5px"
                  propBackgroundColor="rgba(13, 148, 136, 0.1)"
                />
                <CeCreado1
                  icon="22.97x26x51124289"
                  tarifas="Preguntas"
                  recuentoPorTarifa="Evalúa las respuestas de las preguntas"
                  propWidth="unset"
                  propFlex="1"
                  propMinWidth="174px"
                  propLeft="calc(50% - 11.5px)"
                  propWidth1="23px"
                  propBackgroundColor="rgba(147, 51, 234, 0.1)"
                />
              </div>
              <CeCreado2 lISTAS="LISTAS" />
              <CeCreado2 lISTAS="ENTRADAS" />
              <CeCreado2 lISTAS="ACCESO RRPP" />
              <CeCreado2 lISTAS="RESERVAS" />
            </div>
            <div className="w-[420.7px] flex flex-col items-start justify-start gap-[10.5px] min-w-[420.6999999999971px] max-w-full text-center text-sm mq750:min-w-full mq1050:flex-1">
              <div className="self-stretch flex flex-row items-start justify-start py-0 px-1 box-border max-w-full text-left">
                <div className="flex-1 rounded-2xs-5 bg-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-nero shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] overflow-hidden flex flex-col items-start justify-start py-[10.5px] px-0 box-border gap-[10.5px] max-w-full">
                  <div className="self-stretch flex flex-row items-center justify-start py-0 px-2.5 box-border max-w-full [row-gap:20px] mq450:flex-wrap">
                    <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                      <div className="flex flex-col items-center justify-start pt-1 px-[2.75px] pb-[3px]">
                        <div className="flex flex-row items-start justify-start">
                          <img
                            className="h-3.5 w-[10.5px] relative overflow-hidden shrink-0"
                            loading="lazy"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start min-w-[238px] max-w-full">
                      <div className="w-[120px] h-[21px] relative leading-[21px] inline-block">
                        Informe financiero
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white" />
                  <div className="self-stretch flex flex-row items-center justify-start py-0 px-2 box-border max-w-full [row-gap:20px] mq450:flex-wrap">
                    <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                      <div className="flex flex-col items-center justify-start pt-1 pb-[3px] pr-0.5 pl-[1.8700000047683716px]">
                        <div className="flex flex-row items-start justify-start">
                          <img
                            className="h-3.5 w-[12.3px] relative overflow-hidden shrink-0"
                            loading="lazy"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start min-w-[233px] max-w-full">
                      <div className="w-[91px] h-[21px] relative leading-[21px] inline-block">
                        Liquidaciones
                      </div>
                    </div>
                    <div className="w-[11px] flex flex-col items-start justify-start pt-1 px-0 pb-[3px] box-border text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-geyser font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-font-awesome-5-free-solid-105">
                      <div className="self-stretch h-3.5 relative leading-[14px] flex items-center">
                        
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white" />
                  <div className="self-stretch flex flex-row items-center justify-start py-0 px-2 box-border max-w-full [row-gap:20px] mq450:flex-wrap">
                    <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                      <div className="flex flex-col items-center justify-start pt-1 pb-[3px] pr-0 pl-[0.119999997317791px]">
                        <div className="flex flex-row items-start justify-start">
                          <img
                            className="h-3.5 w-[15.8px] relative overflow-hidden shrink-0"
                            loading="lazy"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start min-w-[233px] max-w-full">
                      <div className="w-[77px] h-[21px] relative leading-[21px] inline-block">
                        Comisiones
                      </div>
                    </div>
                    <div className="w-[11px] flex flex-col items-start justify-start pt-1 px-0 pb-[3px] box-border text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-geyser font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-font-awesome-5-free-solid-105">
                      <div className="self-stretch h-3.5 relative leading-[14px] flex items-center">
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch rounded-2xs-5 bg-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-nero shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] overflow-hidden flex flex-col items-end justify-start gap-[5px] max-w-full text-2xs-5">
                <div className="self-stretch flex flex-col items-start justify-start pt-[9.5px] px-[10.5px] pb-[10.5px] box-border max-w-full text-left">
                  <div className="self-stretch flex flex-col items-start justify-start pt-0 pb-[10.5px] pr-[7px] pl-0 box-border gap-[4.5px] max-w-full">
                    <div className="w-[222px] h-3.5 relative leading-[14px] inline-block">
                      Comparte tu link para conseguir más ventas:
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start max-w-full [row-gap:20px] text-sm mq450:flex-wrap">
                      <div className="flex-1 flex flex-col items-start justify-start min-w-[235px] max-w-full">
                        <div className="flex flex-col items-start justify-start shrink-0 max-w-[103%]">
                          <div className="rounded-[5.25px] bg-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white flex flex-col items-start justify-start py-0 px-2.5 opacity-[0.5] border-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white">
                            <div className="overflow-hidden flex flex-col items-start justify-start">
                              <div className="w-[351px] h-9 relative leading-[36px] inline-block">
                                https://www.bodasdehoy.com/marketing-solucione...
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <div className="rounded-6xs bg-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-mystic flex flex-row items-start justify-start pt-3 px-[10.5px] pb-3.5">
                          <div className="flex flex-row items-start justify-start">
                            <img
                              className="h-2.5 w-[9.2px] relative overflow-hidden shrink-0"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[4.5px] max-w-full z-[1] mt-[-1px]">
                    <div className="w-14 h-3.5 relative leading-[14px] inline-block">
                      Link oficial:
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start max-w-full [row-gap:20px] text-sm mq450:flex-wrap">
                      <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[3.5px] pl-0 box-border min-w-[240px] max-w-full">
                        <div className="self-stretch flex flex-col items-start justify-start">
                          <div className="self-stretch rounded-[5.25px] bg-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white flex flex-col items-start justify-start py-0 px-2.5 opacity-[0.5] border-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white">
                            <div className="self-stretch overflow-hidden flex flex-col items-start justify-start py-0 pr-[6.980010986328125px] pl-0">
                              <div className="w-[336px] h-9 relative leading-[36px] inline-block">
                                https://www.bodasdehoy.com/beach-aguilas/81Y9
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <div className="rounded-6xs bg-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-mystic flex flex-row items-start justify-start pt-3 px-[10.5px] pb-3.5">
                          <div className="flex flex-row items-start justify-start">
                            <img
                              className="h-2.5 w-[9.2px] relative overflow-hidden shrink-0"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-px flex flex-row items-start justify-start py-0 pr-[3.5px] pl-[3px] box-border max-w-full">
                  <div className="self-stretch flex-1 relative box-border max-w-full border-t-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white" />
                </div>
                <div className="flex flex-row items-start justify-start py-0 px-1.5 box-border max-w-full">
                  <div className="w-[409px] flex flex-row items-center justify-start py-0 px-0 box-border max-w-full [row-gap:20px] mq750:flex-wrap">
                    <div className="w-[222.3px] flex flex-col items-start justify-start">
                      <div className="self-stretch flex flex-col items-center justify-start py-0 pr-[14.004788398742676px] pl-[14.33520793914795px]">
                        <div className="w-[168px] h-3.5 relative leading-[14px] uppercase flex items-center justify-center">
                          Visitas a través de mi enlace
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col items-center justify-start py-0 px-5 text-2xl">
                        <div className="w-10 h-7 relative leading-[28px] font-medium flex items-center justify-center mq450:text-mid mq450:leading-[22px]">
                          258
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col items-center justify-start py-0 pr-[59.02056121826172px] pl-[59.319435119628906px] text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-gull-gray">
                        <div className="w-[78px] h-3.5 relative leading-[14px] lowercase flex items-center justify-center">
                          Usuarios únicos
                        </div>
                      </div>
                    </div>
                    <div className="w-[237.3px] flex flex-col items-start justify-start z-[1]">
                      <div className="self-stretch flex flex-col items-center justify-start py-0 pr-[54.00711441040039px] pl-[54.332881927490234px]">
                        <div className="w-[88px] h-3.5 relative leading-[14px] uppercase flex items-center justify-center">
                          Visitas totales
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col items-center justify-start py-0 px-5 text-2xl">
                        <div className="w-[51px] h-7 relative leading-[28px] font-medium flex items-center justify-center mq450:text-mid mq450:leading-[22px]">
                          1456
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col items-center justify-start py-0 pr-[59.01055908203125px] pl-[59.329437255859375px] text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-gull-gray">
                        <div className="w-[78px] h-3.5 relative leading-[14px] lowercase flex items-center justify-center">
                          Usuarios únicos
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-px flex flex-row items-start justify-start py-0 pr-[3.5px] pl-[3px] box-border max-w-full">
                  <div className="self-stretch flex-1 relative box-border max-w-full border-t-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white" />
                </div>
                <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 text-xs-9 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-ebony">
                  <div className="h-6 w-[91px] relative leading-[24px] flex items-center justify-center">
                    iFrame de venta
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[3px] pl-[3.5px] box-border max-w-full text-[31.5px] text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-turmeric font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-font-awesome-5-free-solid-105">
                <div className="flex-1 rounded-2xs-5 bg-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-nero shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] overflow-hidden flex flex-col items-start justify-start pt-7 px-0 pb-0 box-border gap-[35px] max-w-full mq450:gap-[17px]">
                  <div className="self-stretch h-[35px] flex flex-row items-start justify-center py-0 px-5 box-border">
                    <div className="self-stretch w-4 relative leading-[35px] flex items-center justify-center mq450:text-[19px] mq450:leading-[21px] mq1050:text-[25px] mq1050:leading-[28px]">
                      
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[14px] max-w-full text-left text-sm font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-medium-123">
                    <div className="self-stretch flex flex-row items-start justify-start py-0 px-3.5 box-border max-w-full">
                      <div className="flex-1 flex flex-row items-end justify-between max-w-full gap-[20px]">
                        <div className="w-[236.5px] flex flex-row items-start justify-start gap-[6.75px]">
                          <div className="flex flex-col items-start justify-start pt-[5.5px] px-0 pb-0">
                            <b className="w-[11px] h-[21px] relative leading-[21px] inline-block">
                              1.
                            </b>
                          </div>
                          <div className="h-8 w-8 rounded-13xl bg-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white overflow-hidden shrink-0 flex flex-col items-start justify-start relative">
                            <img
                              className="w-8 h-8 relative rounded-13xl object-cover max-w-[32px]"
                              loading="lazy"
                              alt=""
                            />
                            <div className="w-full h-full absolute my-0 mx-[!important] top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-9980xl bg-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-nero-02 shadow-[0px_2px_4px_rgba(0,_0,_0,_0.06)_inset] z-[1]" />
                          </div>
                          <div className="flex-1 flex flex-col items-start justify-start pt-[5.5px] px-0 pb-0 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-black">
                            <div className="w-full overflow-hidden flex flex-row items-start justify-start max-w-[180px]">
                              <div className="h-[21px] w-[100px] relative leading-[21px] inline-block">
                                <b>christian</b>
                                <span> lanza</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-start pt-0 px-0 pb-[8.5px] text-[13.7px] font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-font-awesome-5-free-solid-105">
                          <div className="w-3.5 h-3.5 relative leading-[14px] inline-block">
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-end justify-start text-center text-xs-9 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-ebony">
                      <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white" />
                      <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
                        <div className="h-6 w-32 relative leading-[24px] flex items-center justify-center">
                          Ver recuento completo
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DescripcionEvento;