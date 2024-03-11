import { FC, memo, useState } from "react";
import Dropdown from "./Dropdown1";
interface propsComDato1 {
  componentState: any;
  setComponentState: any;

}


const ComDato1: FC <propsComDato1> = memo(({componentState,setComponentState}) => {
  const [divcontrolValue, setDivcontrolValue] = useState("");
  const [divcontrol1Value, setDivcontrol1Value] = useState("");
  const [divisFullwidthValue, setDivisFullwidthValue] = useState("");
  const items=[
    {option:"-18"}
    ,{option:"+18"}
  ]

  return (
    <div className="w-full rounded-md bg-white flex flex-col items-center justify-start py-[21px] pr-[18px] pl-[21px] box-border gap-[28px]">

  <div className="flex flex-col items-center justify-center gap-4 ">
      
      {/* seccion 1 */}

      <div className="self-stretch flex flex-wrap items-start justify-start gap-[28px] shrink-0 text-left text-smi-3 text-darkslategray-100">
      <div className="flex-1 flex flex-col items-start justify-start min-w-[305px] min-h-[384px] max-w-full">
        <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[10.5px] box-border gap-[6.99px] max-w-full">
              <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold inline-block text-base max-h-[17.5px]">
                Nombre
              </div>
          <input
            className="[outline:none] bg-slate-100 self-stretch h-[37px] rounded-md box-border flex flex-col items-start justify-start pt-[9.739999771118164px] pb-[10.250001907348633px] pr-[9px] pl-[11px] text-sm text-black min-w-[250px] border-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-catskill-white1"
            placeholder="Rumba y Playa"
            type="text"
            value={divcontrolValue}
            onChange={(event) => setDivcontrolValue(event.target.value)}
          />
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[6.99px] max-w-full z-[1] mt-[-0.01px]">
          <div className="self-stretch flex flex-row items-start justify-start max-w-full">
            <div className="flex-1 flex flex-col items-start justify-start max-w-full">
              <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold text-base inline-block max-h-[17.5px]">
                Descripción
              </div>
            </div>
          </div>
          <input
            className="[border:none] [outline:none] bg-slate-100 self-stretch flex flex-col items-start justify-start pt-[9.739999771118164px] pb-[10.250001907348633px] pr-[9px] pl-[11px] h-[267px] text-sm align-text-top rounded-md min-w-[250px]"
            placeholder="Escribe tu descipción detallada aquí"
            type="text"
            value={divcontrol1Value}
            onChange={(event) => setDivcontrol1Value(event.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-start justify-start gap-[7px] min-w-[307px] max-w-full">
        <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[11px] gap-[6px]">
          
          {/* vestimenta y edad */}
          
          <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-2 py-0 pr-1.5 pl-0">
              
              {/* vestimenta */}
              <div className="self-stretch flex-1 flex flex-col items-start justify-start py-0 pr-[7px] pl-0 box-border gap-[6.99px] min-w-[95px]">
                  <div className="flex-1 flex flex-col items-start justify-start">
                    <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold text-base inline-block max-h-[17.5px]">
                      Vestimenta
                    </div>
                  
                </div>
                <input
                  className="[border:none] [outline:none] bg-slate-100 self-stretch h-[37px] rounded-md flex flex-col items-start justify-start pt-[7.989999771118164px] pb-[8.000001907348633px] pr-[35px] pl-[10.5px] box-border text-sm text-black min-w-[139px]"
                  placeholder="Casual"
                  type="text"
                  value={divisFullwidthValue}
                  onChange={(event) =>
                    setDivisFullwidthValue(event.target.value)
                  }
                />
              </div>

            {/* edad */}
            <div className="flex-1 flex flex-col items-start justify-start pt-0 px-0 pb-px box-border gap-[7px] min-w-[92px] ml-[-6px]">
              <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold inline-block max-h-[17.5px] text-base ">
                Edad
              </div>
              <Dropdown items={items} />
            </div>
          </div>


          <div className="self-stretch flex flex-row items-start justify-end text-center">
            <div className="rounded-md bg-slate-100 flex flex-col items-start justify-start p-[3.5px]">
              <div className="flex flex-row items-start justify-start py-0 pr-px pl-0">
                <button className="cursor-pointer [border:none] py-0 pr-[7px] pl-0 bg-[transparent] flex flex-col items-start justify-start">
                  <div className="rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-row items-center justify-start py-0 pr-1.5 pl-[6.989999771118164px] gap-[6.67px]">
                    <div className="flex flex-row items-start justify-center py-[1.25px] px-0">
                      <div className="flex flex-row items-start justify-start">
                        <img
                          className="h-[11.3px] w-[10.4px] relative overflow-hidden shrink-0"
                          alt=""
                          src="ModuloEvento/span.icon.svg"
                        />
                      </div>
                    </div>
                    <div className="h-6 w-auto relative text-xs leading-[24px] font-semibold text-black text-center inline-block">
                      Un día
                    </div>
                  </div>
                </button>
                <div className="rounded-md flex flex-row items-center justify-start py-0 pr-[3px] pl-[6.989999771118164px] gap-[6.76px] opacity-[0.5]">
                  <div className="flex flex-row items-start justify-center py-[1.25px] px-0">
                    <div className="flex flex-row items-start justify-start">
                      <img
                        className="h-[11.3px] w-[10.4px] relative overflow-hidden shrink-0 text-slate-500"
                        loading="lazy"
                        alt=""
                        src="ModuloEvento/span.icon.svg"
                      />
                    </div>
                  </div>
                  <div className="h-6 w-auto relative leading-[24px] text-sm inline-block">
                    Varios días
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold text-base inline-block max-h-[17.5px]">
            Fecha
          </div>
          <div className="self-stretch rounded-md bg-slate-100 flex flex-row items-center justify-start py-0 px-[11px] gap-[8px] text-sm text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black">
            <div className="flex flex-col items-start justify-start pt-0 px-0 pb-[3px]">
              <img
                className="w-[12.3px] h-[13.8px] relative overflow-hidden shrink-0"
                alt=""
                src="ModuloEvento/calvectrs.svg"
              />
            </div>
            <div className="h-9 w-auto] relative leading-[36px] font-medium inline-block">
              {" "}
              20 de mar. de 2024
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[8px] min-h-[89px]">
          <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-2 py-0 pr-1.5 pl-0">
            
            <div className="flex-[0.9706] flex flex-col items-start justify-start py-0 pr-[7px] pl-0 box-border gap-[7px] min-w-[95px]">
              <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold text-base inline-block max-h-[17.5px]">
                Hora inicio
              </div>
              <button className="cursor-pointer pt-0.5 pb-0 pr-1.5 pl-[11px] bg-slate-100 self-stretch h-9 rounded-[5.25px] box-border flex flex-row items-center justify-start gap-[6px] border-[1px] border-solid border-slate-100">
                <div className="flex flex-col items-start justify-start pt-0 px-0 pb-[5px]">
                  <div className="w-[14.2px] h-[13.8px] relative text-sm leading-[14px] font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-data-16475x71625-default-font-awesome-5-free-solid-119 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black text-left inline-block z-[1]">
                  <img
                  className="h-[21px] w-[21px] relative overflow-hidden shrink-0"
                  alt=""
                  src="ModuloEvento/relog2.svg"
                />
                  </div>
                </div>
                <div className="mb-[-2px] flex-1 flex flex-col items-start justify-start">
                  <div className="mt-[-2px] w-[39px] h-9 relative text-sm leading-[36px] font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-data-16475x71625-default-inter-semi-bold-123 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black text-left inline-block whitespace-nowrap">
                    23:00
                  </div>
                </div>
                <img
                  className="h-[21px] w-[21px] relative overflow-hidden shrink-0"
                  alt=""
                  src="ModuloEvento/arrow.svg"
                />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-start justify-start gap-[7px] min-w-[92px] ml-[-6px]">
              <div className="w-auto h-[17.5px] relative leading-[17.5px] text-base font-semibold inline-block max-h-[17.5px]">
                Hora fin
              </div>
              <button className="cursor-pointer pt-0.5 pb-0 pr-1.5 pl-[11px] bg-slate-100 self-stretch h-9 rounded-[5.25px] box-border flex flex-row items-center justify-start gap-[6px] border-[1px] border-solid border-slate-100">
                <div className="flex flex-col items-start justify-start pt-0 px-0 pb-[5px]">
                  <div className="w-[14.2px] h-[13.8px] relative text-sm leading-[14px] font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-data-16475x71625-default-font-awesome-5-free-solid-119 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black text-left inline-block z-[1]">
                  <img
                  className="h-[21px] w-[21px] relative overflow-hidden shrink-0"
                  alt=""
                  src="ModuloEvento/relog2.svg"
                />
                  </div>
                </div>
                <div className="mb-[-2px] flex-1 flex flex-col items-start justify-start">
                  <div className="mt-[-2px] w-[45px] h-9 relative text-sm leading-[36px] font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-data-16475x71625-default-inter-semi-bold-123 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black text-left inline-block whitespace-nowrap">
                    *07:30
                  </div>
                </div>
                <img
                  className="h-[21px] w-[21px] relative overflow-hidden shrink-0"
                  alt=""
                  src="ModuloEvento/arrow.svg"
                />
              </button>
            </div>

          </div>
          <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold text-base inline-block max-h-[17.5px]">
            Fecha fin venta
          </div>
        </div>
        <div className="flex flex-row items-start justify-start pt-0 px-0 pb-1 box-border max-w-full text-2xs-5 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-gull-gray">
          <div className="h-7 w-auto relative text-sm text-gray-400 leading-[14px] inline-block">

              Indica la fecha y hora en la que se cerrará la venta de todos los
              servicios activos en este evento.
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start text-center text-xs text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-ebony">
          <div className="self-stretch flex flex-row items-start justify-start pt-0 pb-2.5 pr-[5px] pl-[3.430000066757202px] gap-[6.9px] mq450:flex-wrap">
           
            <div className="flex flex-col items-center justify-center">
              <div className="rounded-md bg-slate-100 shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-row items-start justify-start py-0 pr-[3px] pl-[6.869239807128906px] whitespace-nowrap">
                <div className="h-6 w-auto relative font-semibold leading-[24px] inline-block">
                  Un dia antes
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-start justify-start min-w-[64px] text-black font-semibold">
              <div className="rounded-md bg-slate-200 shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-row items-start justify-start py-0 pr-0.5 pl-[6.890989780426025px] whitespace-nowrap">
                <div className="h-6 w-auto relative leading-[24px] inline-block">
                  Una hora antes
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start justify-start">
              <div className="rounded-md bg-slate-100 shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-row items-start justify-start py-0 pr-0.5 pl-[6.7198052406311035px] whitespace-nowrap">
                <div className="h-6 w-auto relative leading-[24px] font-semibold text-black inline-block">
                  Inicio evento
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start justify-start text-white">
              <div className="rounded-md bg-rosa shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-row items-start justify-start py-0 pr-0.5 pl-[6.899749755859375px] whitespace-nowrap">
                <div className="h-6 w-auto relative leading-[24px] font-semibold inline-block">
                  Fin evento
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-start justify-start min-w-[60px]">
              <div className="rounded-md bg-slate-100 shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-row items-start justify-start py-0 pr-1.5 pl-[6.670969486236572px]">
                <div className="h-6 w-auto relative leading-[24px] font-semibold inline-block">
                  Personalizado
                </div>
              </div>
            </div>

          </div>

          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[3px] pl-0 gap-[14px] text-left text-sm text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black mq450:flex-wrap">
            <div className="flex-1 flex flex-row items-center justify-center opacity-[0.5] min-w-[148px]">
              <div className="flex-1 rounded-md bg-slate-100 flex flex-row items-center justify-start py-0 px-[11px] gap-[8px]">
                <div className="flex flex-col items-start justify-start pt-0 px-0 pb-[3px]">
                  <img
                    className="w-[12.3px] h-[13.8px] relative overflow-hidden text-gray-400 shrink-0"
                    alt=""
                    src="ModuloEvento/relog2.svg"
                  />
                </div>
                <div className="h-9 w-auto relative leading-[36px] font-medium inline-block">
                  {" "}
                  21 de mar. de 2024
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-row items-center justify-center rounded-md opacity-[0.5] min-w-[148px]">
              <button className="cursor-pointer pt-0.5 pb-0 pr-2 pl-2.5 bg-slate-100 h-9 flex-1 rounded-[5.25px] box-border flex flex-row items-center justify-start gap-[5px] border-[1px] border-solid border-slate-100">
                <div className="flex flex-col items-start justify-start pt-0 px-0 pb-[5px]">
                  <div className="w-[14.2px] h-[13.8px] relative text-sm leading-[14px] text-black text-left inline-block z-[1]">
                  <img
                    className="w-[12.3px] h-[13.8px] relative overflow-hidden text-gray-400 shrink-0"
                    alt=""
                    src="ModuloEvento/relog2.svg"
                  />
                  </div>
                </div>
                <div className="mb-[-2px] flex-1 flex flex-col items-start justify-start">
                  <div className="mt-[-2px] w-[38px] h-9 relative text-sm leading-[36px] whitespace-nowrap">
                    07:30
                  </div>
                </div>
                <img
                  className="h-[21px] w-[21px] relative overflow-hidden shrink-0"
                  alt=""
                  src="ModuloEvento/arrow.svg"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

        {/* separador */}

      <div className="self-stretch h-[1.3px] relative box-border border-t-[1.3px] border-solid border-slate-200" />
        
        {/* seccion 2 */}

      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-px pl-0 shrink-0 text-left gap-4 max-w-full">

      <div className="self-stretch flex-1 flex flex-col items-start justify-start text-xs gap-2 ">
      
      <div className="self-stretch flex flex-row items-start justify-start min-w-[305px] max-w-full">
          
          <div className="self-stretch w-full flex flex-row w- items-start justify-between py-0 pr-px pl-0 box-border gap-[20px]  min-w-[305px] max-w-full">
            <div className="h-[17.5px] w-auto relative leading-[17.5px] font-semibold text-base inline-block max-h-[17.5px]">
              Flyer
            </div>
            <div className="flex flex-row items-center justify-start py-0 pr-1.5 pl-[7px] gap-[6.89px] text-xs text-black font-semibold">
              <div className="h-3 w-3 relative leading-[11.9px] inline-block">
              <img
                className="w-[12.3px] h-[13.8px] relative overflow-hidden shrink-0"
                alt=""
                src="ModuloEvento/igicon.svg"
              />
              </div>
              <div className="h-6 w-auto relative leading-[24px] font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-data-16475x71625-default-inter-semi-bold-123 inline-block">
                info
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col w-full items-start justify-start text-gray-400">
          <div className="w-[225px] h-3.5 relative leading-[14px] inline-block z-[1]">
            <span>{`Resolución recomendada: `}</span>
            <b>1080x1350</b>
            <span> pixels.</span>
          </div>
          <div className="self-stretch h-[150px] relative rounded-md bg-slate-100 overflow-hidden shrink-0 z-[2]" />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-start justify-start pt-[7px] px-0 pb-0 box-border min-w-[306px] max-w-full text-center text-sm text-seagreen font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-data-16475x71625-default-font-awesome-5-free-solid-119">
      <div className="w-full flex flex-row items-start justify-between gap-[0px] min-w-[305px] [row-gap:20px]">
          <div className="flex flex-col items-start justify-start pt-0 px-0 pb-[6.989999771118164px]">
            <div className="flex flex-col items-start justify-start">
              <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold text-base inline-block max-h-[17.5px]">
                Ubicación
              </div>
            </div>
          </div>
          <div className="rounded-6xs bg-secondary-contrast flex flex-row items-start justify-center py-0 px-[7px] text-xs-9 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-ebony font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-data-16475x71625-default-font-awesome-5-free-solid-119">
            <div className="flex flex-col items-start justify-start pt-[6.25px] pb-[6.239999771118164px] pr-[7px] pl-0">
              <div className="w-3 h-3 relative leading-[11.9px] inline-block">
              <img
                className="w-[12.3px] h-[13.8px] relative overflow-hidden shrink-0"
                alt=""
                src="ModuloEvento/igicon.svg"
              />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start pt-0 px-0 pb-[0.48999977111816406px] ml-[-0.11px] font-semibold">
              <div className="w-auto h-6 relative leading-[24px] inline-block">
                info
              </div>
            </div>
          </div>
        </div>
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0.5 pl-0 box-border gap-[7px] max-w-full mq450:flex-wrap">
            <button className="cursor-pointer pt-px pb-0 pr-2 pl-3 bg-slate-100 h-9 flex-1 rounded-[5.25px] box-border flex flex-row items-center justify-between min-w-[123px] whitespace-nowrap max-w-full gap-[20px] border-[1px] border-solid border-slate-100 hover:bg-gainsboro hover:box-border hover:border-[1px] hover:border-solid hover:border-gainsboro">
              <div className="mt-[-1px] mb-[-1px] h-9 w-[102px] relative text-sm leading-[36px] font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-data-16475x71625-default-inter-semi-bold-123 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black text-left inline-block">
                Aguials Crsistla
              </div>
              <img
                className="h-[21px] w-[21px] relative overflow-hidden shrink-0"
                alt=""
                src="ModuloEvento/arrow.svg"
              />
            </button>
            <div className="rounded-md bg-slate-100 flex flex-row items-center justify-start py-0 pr-[9px] pl-[11px]">
              <div className="flex flex-col items-start justify-start pt-0 px-0 pb-0.5">
                <div className="w-3.5 h-3.5 relative leading-[14px] inline-block">
                <img
                className="h-[21px] w-[21px] relative overflow-hidden shrink-0"
                alt=""
                src="ModuloEvento/check1.svg"
              />
                </div>
              </div>
              <div className="h-9 w-auto relative leading-[36px] font-medium text-black inline-block">
                {" "}
                Visible
              </div>
            </div>
          </div>
        </div>


    </div>


  </div>
  <div className="self-stretch h-[1.3px] relative box-border border-t-[1.3px] border-solid border-slate-200" />
              <button onClick={()=>{ 
                setComponentState(3)
              }} 
              className="cursor-pointer [border:none] p-0 bg-[transparent] w-[85px] flex flex-col items-start justify-start">
                <div className="w-full rounded-md bg-rosa box-border flex flex-row items-center justify-center pt-[9.75px] px-[17px] pb-[9.740001678466797px] border-[1px] border-solid border-rosa">
                  <div className="flex flex-col items-center justify-start">
                    <div className="w-auto h-[17.5px] relative text-smi-3 leading-[17.5px] font-medium text-white text-center inline-block max-h-[17.5px]">
                      Guardar
                    </div>
                  </div>
                </div>
              </button>
  </div>

    
  );
});

export default ComDato1;