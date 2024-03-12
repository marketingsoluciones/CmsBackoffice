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
    <div className="w-auto bg-slate-100 flex flex-col items-center justify-center px-4 pt-7 pb-[67px] box-border gap-[28px] tracking-[normal]">
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

      <div className="self-stretch flex flex-col items-center justify-start py-0 px-px box-border gap-[35px] mq750:gap-[17px]">
        
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

              <div className="flex flex-row items-center justify-start gap-[1px] text-lg text-black font-medium">
                <div className="flex flex-col items-start justify-start font-semibold">
                  <div className="w-3.5 h-[15.8px] relative leading-[15.75px] inline-block max-h-[15.75px]">
                    <img src="ModuloEvento/icon.svg" alt="" />
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

        <section className="w-full flex flex-row items-start justify-start box-border shrink-0 text-left">
          <div className="flex flex-row items-start justify-start gap-[16px] max-w-full mq750:gap-[18px] mq1050:flex-wrap">
            
            <div className="flex flex-col items-start justify-start gap-[9.92px] max-w-full mq750:min-w-full">
              <div className="w-auto h-[25px] relative leading-[24.5px] font-semibold inline-block">
                Informes del evento
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-[10px] max-w-full text-sm mq750:flex-wrap">
               
               {/*  Usuarios y equipos */}
                <div className="h-[105.5px] rounded-md bg-white shadow-[0px_1px_10px_rgba(0,_0,_0,_0.12),_0px_4px_5px_rgba(0,_0,_0,_0.14),_0px_2px_4px_-1px_rgba(0,_0,_0,_0.2)] overflow-hidden flex flex-row items-start justify-start min-w-[226px] mq750:flex-1">
                  <div className="self-stretch flex flex-row items-start justify-start">
                  
                  <div className="h-[106px] w-[54px] bg-slate-300 flex flex-col items-center justify-start pt-[12.5px] pb-[60px] pr-[13.869999885559082px] pl-[13.880000114440918px] box-border relative">
                      
                      <div className="my-0 top-[12.5px] left-[calc(50%_-_13.1px)] flex flex-row items-start justify-start ">
                        <img
                          className="h-[26px] w-[26.3px] relative overflow-hidden shrink-0"
                          loading="lazy"
                          alt=""
                          src="ModuloEvento/uyq.svg"
                        />
                      </div>

                    </div> 

                    <div className="self-stretch flex flex-col items-start justify-start pt-[10.5px] px-[10.5px] pb-2.5">
                      <div className="flex flex-row items-start justify-start pt-[7px] pb-0 pr-[21px] pl-0 ">
                        <div className="h-[21px] w-auto relative leading-[21px] font-semibold inline-block">
                          Usuarios y equipos
                        </div>
                      </div>
                      <div className="flex flex-row items-start justify-start text-2xs-5 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-gull-gray">
                        <div className="h-[21px] w-auto relative leading-[21px] inline-block">
                          Ranking de usuarios y equipos
                        </div>
                      </div>
                    </div>



                  </div>
                </div>

                {/* chicas, chicos, sin genero */}
                <div className="h-[105.5px] shadow-[0px_1px_10px_rgba(0,_0,_0,_0.12),_0px_4px_5px_rgba(0,_0,_0,_0.14),_0px_2px_4px_-1px_rgba(0,_0,_0,_0.2)] flex flex-row items-center justify-center bg-white rounded-md max-w-full text-center text-2xs-5">
                  <div className="shrink-0 flex flex-col items-start gap-2 justify-start">
                    
                    <div className="w-full flex flex-row items-center justify-start shrink-0 [row-gap:20px] mq750:flex-wrap">
                      <div className="flex flex-col items-start justify-start min-w-[164px]">
                        
                        <div className="self-stretch w-full flex flex-col items-center justify-center py-0 ">
                          <div className="w-10 h-3.5 relative leading-[14px] uppercase flex items-center justify-center">
                            Chicas
                          </div>
                        </div>
                        <div className="self-stretch flex flex-col items-center justify-start py-0 pr-[61px] pl-[61.908653259277344px] text-xl text-purple-700 font-bold">
                          <div className="self-stretch h-7 relative leading-[28px] inline-block mq450:text-mid mq450:leading-[22px]">
                            60%
                          </div>
                        </div>
                      </div>
                      <div className="w-auto text-md flex flex-col items-start justify-start">
                        <div className="self-stretch flex flex-col items-center justify-start py-0 pr-[45px] pl-[45.412357330322266px]">
                          <div className="self-stretch h-3.5 relative leading-[14px] uppercase inline-block">
                            Sin género
                          </div>
                        </div>
                        <div className="self-stretch flex flex-col items-center justify-start py-0 pr-[61px] pl-[61.91865539550781px] text-xl text-gray-600">
                          <div className="self-stretch h-7 relative leading-[28px] font-bold inline-block mq450:text-mid mq450:leading-[22px]">
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
                        <div className="self-stretch flex flex-col items-center justify-start py-0 pr-[61px] pl-[61.908653259277344px] text-xl text-blue-700">
                          <div className="self-stretch h-7 relative leading-[28px] font-bold inline-block mq450:text-mid mq450:leading-[22px]">
                            35%
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="self-stretch w-auto  box-border border-t-[1px] border-solid border-slate-200" />
                    <div className="self-stretch flex flex-row items-start justify-center py-0 pr-5 pl-[21px] text-xs text-black">
                      <div className="h-auto w-auto relative leading-[24px] flex items-center justify-center">
                        Ver informe de clientes
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-[17px] mq750:flex-wrap">
      <button className="cursor-pointer [border:none] p-0 bg-white rounded-md shadow-[0px_1px_10px_rgba(0,_0,_0,_0.12),_0px_4px_5px_rgba(0,_0,_0,_0.14),_0px_2px_4px_-1px_rgba(0,_0,_0,_0.2)] overflow-hidden flex flex-col items-start justify-start ">
        <div className="self-stretch flex flex-row items-start justify-start">
          
        <div className="self-stretch w-auto bg-gray-200 flex flex-col items-center justify-start pt-[12.5px] pb-[24.5px] pr-[13.869999885559082px] pl-[13.880000114440918px] box-border relative z-[0]">
            <div className="flex flex-row items-start justify-start z-[0]">
              <img
                className="relative w-[26.3px] h-[26px] overflow-hidden shrink-0"
                alt=""
                src="ModuloEvento/dolar.svg"
              />
            </div>
          </div>

          <div className="self-stretch w-full flex flex-col items-start justify-start p-[10.5px]">
          <div className="self-stretch h-auto flex flex-col items-start justify-center pt-0 px-0 pb-[7px] box-border">
              <div className="relative text-sm leading-[21px] font-semibold text-left">
                Tarifas
              </div>
            </div>
            <div className="self-stretch w-auto flex flex-col items-start justify-start">
              <div className="text-xs leading-[21px] text-left text-gray-400">
                Recuento por tarifa
              </div>
            </div>

          </div>

        </div>
      </button>
      <button className="cursor-pointer [border:none] p-0 bg-white rounded-md shadow-[0px_1px_10px_rgba(0,_0,_0,_0.12),_0px_4px_5px_rgba(0,_0,_0,_0.14),_0px_2px_4px_-1px_rgba(0,_0,_0,_0.2)] overflow-hidden flex flex-col items-start justify-start">
        <div className="self-stretch flex flex-row items-start justify-start">
        
        <div className="self-stretch w-auto flex flex-col bg-green-100 items-center justify-start pt-[12.5px] pb-[24.5px] pr-[12.239999771118164px] pl-[12.229999542236328px] box-border">
            <div className="flex flex-row items-start justify-start z-[0]">
              <img
                className="relative w-auto h-[26px] overflow-hidden shrink-0 [transform:_rotate(-180deg)]"
                alt=""
                src="ModuloEvento/entrada1.svg"
              />
            </div>
          </div>
          
          <div className="self-stretch flex flex-col items-start justify-start p-[10.5px] ">
            
          <div className="self-stretch h-7 flex flex-col items-start justify-center pt-0 px-0 pb-[7px] box-border">
              <div className="relative text-sm leading-[21px] font-semibold text-black text-left">
                Entradas
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start">
              <div className="relative text-xs leading-[21px] font-medium text-gray-400 text-left">
                Ranking de usuarios y equipos
              </div>
            </div>

          </div>


        </div>
      </button>
      <button className="cursor-pointer bg-white rounded-md shadow-[0px_1px_10px_rgba(0,_0,_0,_0.12),_0px_4px_5px_rgba(0,_0,_0,_0.14),_0px_2px_4px_-1px_rgba(0,_0,_0,_0.2)] overflow-hidden flex flex-col items-start justify-start">
        <div className="self-stretch flex flex-row items-start justify-start">
        <div className="self-stretch w-auto bg-purple-100 flex flex-col items-center justify-start pt-[12.5px] pb-[24.5px] pr-[15.520000457763672px] pl-[15.510000228881836px] box-border">
            <div className="flex flex-row items-start justify-start">
              <img
                className="relative w-[23px] h-[26px] overflow-hidden shrink-0"
                alt=""
                src="ModuloEvento/preguntas.svg"
              />
            </div>
        </div>
          <div className="self-stretch flex flex-col items-start justify-start p-[10.5px]">
            
          <div className="self-stretch h-7 flex flex-col items-start justify-center pt-0 px-0 pb-[7px] box-border">
              <div className="relative text-sm leading-[21px] font-semibold text-black text-left">
                Preguntas
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start">
              <div className="relative text-xs leading-[21px] font-medium text-gray-400 text-left">
                Evalúa las respuestas de las preguntas
              </div>
            </div>

          </div>


        </div>
      </button>
    </div>

  {/*  Resumenes de listas, entradas, rrpp y reservas */}
    <div className="flex flex-col items-start justify-start gap-[11px] text-left text-sm text-black font-semibold">                 
            <div className="self-stretch rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] overflow-hidden flex flex-col w-auto items-start justify-start gap-[5px]">
              <div className="w-full flex flex-col items-start justify-start py-[7px] pr-[13.75px] pl-3.5 box-border relative">
                <div className="absolute my-0 mx-[!important] h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-gray-600 opacity-[0.13]" />
                <div className="self-stretch flex flex-row items-center justify-start gap-[10.5px]">
                  <div className="w-full h-[17.5px] leading-[17.5px] text-lg font-semibold">             
                      LISTAS
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between py-0 px-[15px] box-border">
                <div className="flex flex-col items-start justify-start gap-1">
                  <div className="self-stretch flex flex-col items-start justify-start py-0 pr-[383.5199890136719px] pl-0">
                    <div className="relative leading-[14px] font-semibold text-xs">
                      TIEMPO REAL
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start py-0 pr-[398.5199890136719px] pl-0 text-gray-600">
                    <div className="relative leading-[14px] font-medium text-gray-400">
                      PREVISIÓN
                    </div>
                  </div>
                </div>
                <div className="w-auto h-auto flex flex-col items-center gap-1 justify-center text-right text-sm text-gray-600">
                  <div className="rounded-full bg-slate-200 py-[1px] px-[8px] flex flex-row items-center justify-start box-border gap-[3.1px]">
                    <b className="relative leading-[24px] uppercase">15</b>
                    <div className="flex flex-row items-start justify-end text-sm ">
                      <div className="relative leading-[12.25px] uppercase inline-block max-h-[12.25px]">
                        <img src="ModuloEvento/humano1.svg" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="w-auto flex flex-row items-center justify-center box-border gap-[3.19px] text-md text-gray-600">
                    <div className="leading-[14px] text-gray-400">{`0 `}</div>
                    <div className="flex flex-row items-start justify-end">
                      <div className="relative leading-[10.5px] uppercase inline-block ">
                      <img src="ModuloEvento/humano2.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative box-border w-full h-px border-t-[1px] border-solid border-slate-200" />
              <div className="w-full flex flex-col items-start justify-start gap-1 py-[7px] px-3.5 box-border text-sm text-gray-600">
                
                <div className="w-full flex flex-row items-center justify-between py-0 px-2.5 box-border">
                  
                  <div className="flex flex-col items-start justify-start">
                    <div className="self-stretch flex flex-col items-start justify-start py-0 pr-[286.3800048828125px] pl-0">
                      <div className="relative leading-[14px] font-semibol text-black">
                        EVENTO ANTERIOR (Jue. 25 enero)
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-center w-auto h-auto ">                  
                    <div className="w-auto flex flex-row items-start justify-start gap-1">
                        <b className="leading-[14px] text-black">
                          25
                        </b>
                        <div className="flex flex-col items-center justify-center leading-[10.5px]">
                          <img src="ModuloEvento/humano1.svg" alt="" />
                      </div>
                    </div>
                    <div className="w-auto flex flex-col items-start justify-start">
                      <div className="self-stretch flex flex-col items-end justify-start py-0 pr-0 pl-[34.366127014160156px]">
                        <div className="relative leading-[14px] inline-block text-black">
                          35%
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="w-full flex flex-row items-center justify-between py-0 px-2.5 box-border text-gray-400">
                  <div className="flex flex-col items-start justify-start ">
                    <div className="self-stretch flex flex-col items-start justify-start">
                      <div className="relative leading-[14px] font-medium">
                        FINAL EVENTO ANT. (Jue. 25 enero)
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start w-auto h-auto text-right">
                    
                    <div className="flex flex-row gap-1 items-center justify-center">

                        <div className="leading-[14px]">{`0 `}</div>
                          <div className=" leading-[10.5px] inline-block">
                          <img src="ModuloEvento/humano2.svg" alt="" />
                        </div>
                    
                    </div>

                    <div className="w-auto flex flex-col items-start justify-start">
                      <div className="self-stretch flex flex-col items-end justify-start py-0 pr-0 pl-[34.366127014160156px]">
                        <div className="relative leading-[14px] inline-block max-w-[50px]">
                          0%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="self-stretch rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] overflow-hidden flex flex-col w-auto items-start justify-start gap-[5px]">
              <div className="w-full flex flex-col items-start justify-start py-[7px] pr-[13.75px] pl-3.5 box-border relative">
                <div className="absolute my-0 mx-[!important] h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-gray-600 opacity-[0.13]" />
                <div className="self-stretch flex flex-row items-center justify-start gap-[10.5px]">
                  <div className="w-full h-[17.5px] leading-[17.5px] text-lg font-semibold">             
                      ENTRADAS
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between py-0 px-[15px] box-border">
                <div className="flex flex-col items-start justify-start gap-1">
                  <div className="self-stretch flex flex-col items-start justify-start py-0 pr-[383.5199890136719px] pl-0">
                    <div className="relative leading-[14px] font-semibold text-xs">
                      TIEMPO REAL
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start py-0 pr-[398.5199890136719px] pl-0 text-gray-600">
                    <div className="relative leading-[14px] font-medium text-gray-400">
                      PREVISIÓN
                    </div>
                  </div>
                </div>
                <div className="w-auto h-auto flex flex-col items-center gap-1 justify-center text-right text-sm text-gray-600">
                  <div className="rounded-full bg-slate-200 py-[1px] px-[8px] flex flex-row items-center justify-start box-border gap-[3.1px]">
                    <b className="relative leading-[24px] uppercase">15</b>
                    <div className="flex flex-row items-start justify-end text-sm ">
                      <div className="relative leading-[12.25px] uppercase inline-block max-h-[12.25px]">
                        <img src="ModuloEvento/humano1.svg" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="w-auto flex flex-row items-center justify-center box-border gap-[3.19px] text-md text-gray-600">
                    <div className="leading-[14px] text-gray-400">{`0 `}</div>
                    <div className="flex flex-row items-start justify-end">
                      <div className="relative leading-[10.5px] uppercase inline-block ">
                      <img src="ModuloEvento/humano2.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative box-border w-full h-px border-t-[1px] border-solid border-slate-200" />
              <div className="w-full flex flex-col items-start justify-start gap-1 py-[7px] px-3.5 box-border text-sm text-gray-600">
                
                <div className="w-full flex flex-row items-center justify-between py-0 px-2.5 box-border">
                  
                  <div className="flex flex-col items-start justify-start">
                    <div className="self-stretch flex flex-col items-start justify-start py-0 pr-[286.3800048828125px] pl-0">
                      <div className="relative leading-[14px] font-semibol text-black">
                        EVENTO ANTERIOR (Jue. 25 enero)
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-center w-auto h-auto ">                  
                    <div className="w-auto flex flex-row items-start justify-start gap-1">
                        <b className="leading-[14px] text-black">
                          25
                        </b>
                        <div className="flex flex-col items-center justify-center leading-[10.5px]">
                          <img src="ModuloEvento/humano1.svg" alt="" />
                      </div>
                    </div>
                    <div className="w-auto flex flex-col items-start justify-start">
                      <div className="self-stretch flex flex-col items-end justify-start py-0 pr-0 pl-[34.366127014160156px]">
                        <div className="relative leading-[14px] inline-block text-black">
                          35%
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="w-full flex flex-row items-center justify-between py-0 px-2.5 box-border text-gray-400">
                  <div className="flex flex-col items-start justify-start ">
                    <div className="self-stretch flex flex-col items-start justify-start">
                      <div className="relative leading-[14px] font-medium">
                        FINAL EVENTO ANT. (Jue. 25 enero)
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start w-auto h-auto text-right">
                    
                    <div className="flex flex-row gap-1 items-center justify-center">

                        <div className="leading-[14px]">{`0 `}</div>
                          <div className=" leading-[10.5px] inline-block">
                          <img src="ModuloEvento/humano2.svg" alt="" />
                        </div>
                    
                    </div>

                    <div className="w-auto flex flex-col items-start justify-start">
                      <div className="self-stretch flex flex-col items-end justify-start py-0 pr-0 pl-[34.366127014160156px]">
                        <div className="relative leading-[14px] inline-block max-w-[50px]">
                          0%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="self-stretch rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] overflow-hidden flex flex-col w-auto items-start justify-start gap-[5px]">
              <div className="w-full flex flex-col items-start justify-start py-[7px] pr-[13.75px] pl-3.5 box-border relative">
                <div className="absolute my-0 mx-[!important] h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-gray-600 opacity-[0.13]" />
                <div className="self-stretch flex flex-row items-center justify-start gap-[10.5px]">
                  <div className="w-full h-[17.5px] leading-[17.5px] text-lg font-semibold">             
                      ACCESO A RRPP
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between py-0 px-[15px] box-border">
                <div className="flex flex-col items-start justify-start gap-1">
                  <div className="self-stretch flex flex-col items-start justify-start py-0 pr-[383.5199890136719px] pl-0">
                    <div className="relative leading-[14px] font-semibold text-xs">
                      TIEMPO REAL
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start py-0 pr-[398.5199890136719px] pl-0 text-gray-600">
                    <div className="relative leading-[14px] font-medium text-gray-400">
                      PREVISIÓN
                    </div>
                  </div>
                </div>
                <div className="w-auto h-auto flex flex-col items-center gap-1 justify-center text-right text-sm text-gray-600">
                  <div className="rounded-full bg-slate-200 py-[1px] px-[8px] flex flex-row items-center justify-start box-border gap-[3.1px]">
                    <b className="relative leading-[24px] uppercase">15</b>
                    <div className="flex flex-row items-start justify-end text-sm ">
                      <div className="relative leading-[12.25px] uppercase inline-block max-h-[12.25px]">
                        <img src="ModuloEvento/humano1.svg" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="w-auto flex flex-row items-center justify-center box-border gap-[3.19px] text-md text-gray-600">
                    <div className="leading-[14px] text-gray-400">{`0 `}</div>
                    <div className="flex flex-row items-start justify-end">
                      <div className="relative leading-[10.5px] uppercase inline-block ">
                      <img src="ModuloEvento/humano2.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative box-border w-full h-px border-t-[1px] border-solid border-slate-200" />
              <div className="w-full flex flex-col items-start justify-start gap-1 py-[7px] px-3.5 box-border text-sm text-gray-600">
                
                <div className="w-full flex flex-row items-center justify-between py-0 px-2.5 box-border">
                  
                  <div className="flex flex-col items-start justify-start">
                    <div className="self-stretch flex flex-col items-start justify-start py-0 pr-[286.3800048828125px] pl-0">
                      <div className="relative leading-[14px] font-semibol text-black">
                        EVENTO ANTERIOR (Jue. 25 enero)
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-center w-auto h-auto ">                  
                    <div className="w-auto flex flex-row items-start justify-start gap-1">
                        <b className="leading-[14px] text-black">
                          25
                        </b>
                        <div className="flex flex-col items-center justify-center leading-[10.5px]">
                          <img src="ModuloEvento/humano1.svg" alt="" />
                      </div>
                    </div>
                    <div className="w-auto flex flex-col items-start justify-start">
                      <div className="self-stretch flex flex-col items-end justify-start py-0 pr-0 pl-[34.366127014160156px]">
                        <div className="relative leading-[14px] inline-block text-black">
                          35%
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="w-full flex flex-row items-center justify-between py-0 px-2.5 box-border text-gray-400">
                  <div className="flex flex-col items-start justify-start ">
                    <div className="self-stretch flex flex-col items-start justify-start">
                      <div className="relative leading-[14px] font-medium">
                        FINAL EVENTO ANT. (Jue. 25 enero)
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start w-auto h-auto text-right">
                    
                    <div className="flex flex-row gap-1 items-center justify-center">

                        <div className="leading-[14px]">{`0 `}</div>
                          <div className=" leading-[10.5px] inline-block">
                          <img src="ModuloEvento/humano2.svg" alt="" />
                        </div>
                    
                    </div>

                    <div className="w-auto flex flex-col items-start justify-start">
                      <div className="self-stretch flex flex-col items-end justify-start py-0 pr-0 pl-[34.366127014160156px]">
                        <div className="relative leading-[14px] inline-block max-w-[50px]">
                          0%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="self-stretch rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] overflow-hidden flex flex-col w-auto items-start justify-start gap-[5px]">
              <div className="w-full flex flex-col items-start justify-start py-[7px] pr-[13.75px] pl-3.5 box-border relative">
                <div className="absolute my-0 mx-[!important] h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-gray-600 opacity-[0.13]" />
                <div className="self-stretch flex flex-row items-center justify-start gap-[10.5px]">
                  <div className="w-full h-[17.5px] leading-[17.5px] text-lg font-semibold">             
                      RESERVA
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-between py-0 px-[15px] box-border">
                <div className="flex flex-col items-start justify-start gap-1">
                  <div className="self-stretch flex flex-col items-start justify-start py-0 pr-[383.5199890136719px] pl-0">
                    <div className="relative leading-[14px] font-semibold text-xs">
                      TIEMPO REAL
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start py-0 pr-[398.5199890136719px] pl-0 text-gray-600">
                    <div className="relative leading-[14px] font-medium text-gray-400">
                      PREVISIÓN
                    </div>
                  </div>
                </div>
                <div className="w-auto h-auto flex flex-col items-center gap-1 justify-center text-right text-sm text-gray-600">
                  <div className="rounded-full bg-slate-200 py-[1px] px-[8px] flex flex-row items-center justify-start box-border gap-[3.1px]">
                    <b className="relative leading-[24px] uppercase">15</b>
                    <div className="flex flex-row items-start justify-end text-sm ">
                      <div className="relative leading-[12.25px] uppercase inline-block max-h-[12.25px]">
                        <img src="ModuloEvento/humano1.svg" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="w-auto flex flex-row items-center justify-center box-border gap-[3.19px] text-md text-gray-600">
                    <div className="leading-[14px] text-gray-400">{`0 `}</div>
                    <div className="flex flex-row items-start justify-end">
                      <div className="relative leading-[10.5px] uppercase inline-block ">
                      <img src="ModuloEvento/humano2.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative box-border w-full h-px border-t-[1px] border-solid border-slate-200" />
              <div className="w-full flex flex-col items-start justify-start gap-1 py-[7px] px-3.5 box-border text-sm text-gray-600">
                
                <div className="w-full flex flex-row items-center justify-between py-0 px-2.5 box-border">
                  
                  <div className="flex flex-col items-start justify-start">
                    <div className="self-stretch flex flex-col items-start justify-start py-0 pr-[286.3800048828125px] pl-0">
                      <div className="relative leading-[14px] font-semibol text-black">
                        EVENTO ANTERIOR (Jue. 25 enero)
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-center w-auto h-auto ">                  
                    <div className="w-auto flex flex-row items-start justify-start gap-1">
                        <b className="leading-[14px] text-black">
                          25
                        </b>
                        <div className="flex flex-col items-center justify-center leading-[10.5px]">
                          <img src="ModuloEvento/humano1.svg" alt="" />
                      </div>
                    </div>
                    <div className="w-auto flex flex-col items-start justify-start">
                      <div className="self-stretch flex flex-col items-end justify-start py-0 pr-0 pl-[34.366127014160156px]">
                        <div className="relative leading-[14px] inline-block text-black">
                          35%
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="w-full flex flex-row items-center justify-between py-0 px-2.5 box-border text-gray-400">
                  <div className="flex flex-col items-start justify-start ">
                    <div className="self-stretch flex flex-col items-start justify-start">
                      <div className="relative leading-[14px] font-medium">
                        FINAL EVENTO ANT. (Jue. 25 enero)
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start w-auto h-auto text-right">
                    
                    <div className="flex flex-row gap-1 items-center justify-center">

                        <div className="leading-[14px]">{`0 `}</div>
                          <div className=" leading-[10.5px] inline-block">
                          <img src="ModuloEvento/humano2.svg" alt="" />
                        </div>
                    
                    </div>

                    <div className="w-auto flex flex-col items-start justify-start">
                      <div className="self-stretch flex flex-col items-end justify-start py-0 pr-0 pl-[34.366127014160156px]">
                        <div className="relative leading-[14px] inline-block max-w-[50px]">
                          0%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
    </div>

            </div>

            <div className="w-auto flex flex-col items-start justify-start gap-[10.5px] text-center text-sm mq750:min-w-full mq1050:flex-1">
              
              {/* liquidaciones, comisiones, informe financiero */}
              <div className="self-stretch flex flex-row items-start justify-start py-0 px-1 box-border max-w-full text-left">
                
                <div className="rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] w-full overflow-hidden flex flex-col items-start justify-start py-[10.5px] px-0 box-border gap-[10.5px] max-w-full">
                  <div className="self-stretch flex flex-row items-center justify-start py-0 px-2.5 box-border max-w-full [row-gap:20px] mq450:flex-wrap">
                    <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                      <div className="flex flex-col items-center justify-start pt-1 px-[2.75px] pb-[3px]">
                        <div className="flex flex-row items-start justify-start">
                          <img
                            className="h-auto w-[10.5px] relative overflow-hidden shrink-0"
                            loading="lazy"
                            alt=""
                            src="ModuloEvento/info1.svg"
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
                            src="ModuloEvento/liqui1.svg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start min-w-[233px] max-w-full">
                      <div className="w-[91px] h-[21px] relative leading-[21px] inline-block">
                        Liquidaciones
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
                            src="ModuloEvento/comi1.svg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start min-w-[233px] max-w-full">
                      <div className="w-[77px] h-[21px] relative leading-[21px] inline-block">
                        Comisiones
                      </div>
                    </div>
                  </div>
                </div>


              </div>

              <div className="self-stretch rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] overflow-hidden flex flex-col items-center justify-start gap-[5px] max-w-[350px] text-xs">
                <div className="self-stretch flex flex-col items-start justify-start pt-[9.5px] px-[10.5px] pb-[10.5px] box-border max-w-full text-left">
                  <div className="self-stretch flex flex-col items-start justify-start pt-0 pb-[10.5px] pr-[7px] pl-0 box-border gap-[4.5px] max-w-full">
                    <div className="w-auto h-3.5 relative leading-[14px] inline-block">
                      Comparte tu link para conseguir más ventas:
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start max-w-full gap-1 [row-gap:20px] text-sm mq450:flex-wrap">
                    <div className="flex flex-col w-full items-start justify-start py-0 pr-[3.5px] pl-0 box-border max-w-full">
                        <div className="self-stretch flex flex-col items-start justify-start">
                          <div className="self-stretch rounded-md bg-slate-200 flex flex-col items-start justify-start py-0 px-2.5 ">
                            <div className="self-stretch overflow-hidden flex flex-col items-start justify-start py-0 pr-[6.980010986328125px] pl-0">
                              <div className="w-auto h-9 relative leading-[36px] inline-block">
                                https://www.bodasdehoy....
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <div className="rounded-md bg-slate-200 flex flex-row items-start justify-start pt-3 px-[10.5px] pb-3.5">
                          <div className="flex flex-row items-start justify-start">
                            <img
                              className="h-3 w-[12px] relative overflow-hidden shrink-0"
                              alt=""
                              src="ModuloEvento/copiar.svg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[4.5px] max-w-full ">
                    <div className="w-auto h-3.5 relative leading-[14px] inline-block">
                      Link oficial:
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start max-w-full [row-gap:20px] text-sm mq450:flex-wrap">
                      <div className="flex flex-col w-full items-start justify-start py-0 pr-[3.5px] pl-0 box-border max-w-full">
                        <div className="self-stretch flex flex-col items-start justify-start">
                          <div className="self-stretch rounded-md bg-slate-200 flex flex-col items-start justify-start py-0 px-2.5 ">
                            <div className="self-stretch overflow-hidden flex flex-col items-start justify-start py-0 pr-[6.980010986328125px] pl-0">
                              <div className="w-auto h-9 relative leading-[36px] inline-block">
                                https://www.bodasdeho...
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <div className="rounded-md bg-slate-200 flex flex-row items-start justify-start pt-3 px-[10.5px] pb-3.5">
                          <div className="flex flex-row items-start justify-start">
                            <img
                              className="h-3 w-3 relative overflow-hidden shrink-0"
                              alt=""
                              src="ModuloEvento/copiar.svg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                
                  <div className="self-stretch flex-1 relative box-border max-w-full border-t-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white" />

                <div className="flex flex-row w-full items-center justify-center box-border max-w-full">
                  <div className="w-auto flex flex-row items-center justify-start gap-6 box-border max-w-full [row-gap:20px] mq750:flex-wrap">
                    <div className="w-auto flex flex-col items-start justify-start">
                      <div className="self-stretch flex flex-col items-center justify-start">
                        <div className="w-auto h-3.5 relative leading-[14px] text-black text-xs font-medium flex items-center justify-center">
                          Visitas con el enlace
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col items-center justify-start text-2xl">
                        <div className="w-auto h-7 relative leading-[28px] font-semibold text-black flex items-center justify-center mq450:text-mid mq450:leading-[22px]">
                          258
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col items-center justify-start text-gray-400">
                        <div className="w-auto h-3.5 relative leading-[14px] text-xs flex items-center justify-center">
                          Usuarios únicos
                        </div>
                      </div>
                    </div>
                    <div className="w-auto flex flex-col items-start justify-start ">
                      <div className="self-stretch flex flex-col items-center justify-start ">
                        <div className="w-auto h-3.5 relative leading-[14px] font-medium text-black flex items-center justify-center">
                          Visitas totales
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col items-center justify-start text-2xl">
                        <div className="w-auto h-7 relative leading-[28px] font-semibold text-black flex items-center justify-center mq450:text-mid mq450:leading-[22px]">
                          1456
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col items-center justify-start text-gray-400">
                        <div className="w-auto h-3.5 relative leading-[14px] lowercase flex items-center justify-center">
                          Usuarios únicos
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                  <div className="self-stretch flex-1 relative box-border max-w-full border-t-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white" />

                <div className="self-stretch flex flex-row items-start justify-center text-xs text-gray-800">
                  <div className="h-6 w-auto relative leading-[24px] flex items-center justify-center">
                    iFrame de venta
                  </div>
                </div>
              </div>
              
              <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[3px] pl-[3.5px] box-border max-w-full text-[31.5px] text-black font-normal">
                <div className="w-full rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] overflow-hidden flex flex-col items-start justify-start box-border gap-[35px] max-w-full mq450:gap-[17px]">
                  <div className="self-stretch flex flex-col items-start justify-start gap-[14px] max-w-full text-left text-sm">
                    
                    
                    <div className="self-stretch flex flex-row items-start justify-between pt-4 px-3.5 box-border max-w-full">
                        <div className="w-auto flex flex-row items-start justify-start gap-[6.75px]">
                          <div className="flex flex-col items-start justify-start pt-[5.5px] px-0 pb-0">
                            <b className="w-auto h-auto text-yellow-500 font-bold relative leading-[21px] inline-block">
                              1.
                            </b>
                          </div>
                          <div className="w-8 h-8 rounded-full">
                            <img src="ModuloEvento/img2.svg" alt="" />
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
                        <div className="flex flex-col items-center justify-center pb-1 pt-1 text-sm">
                          <div className="w-3.5 h-3.5 relative leading-[14px] inline-block">
                            <img src="ModuloEvento/insignia.svg" alt="" />
                          </div>
                        </div>
                      
                    </div>
                    <div className="self-stretch flex flex-col items-end justify-start text-center text-xs-9 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-ebony">
                      <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white" />
                      <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
                        <div className="h-6 w-auto relative leading-[24px] flex items-center justify-center text-xs">
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