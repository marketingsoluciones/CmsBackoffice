import { FC, memo, useState } from "react";
interface propsTarifasDatosC {
    componentState: any;
    setComponentState: any;
  
  }

const TarifasDatosC: FC <propsTarifasDatosC> = ({componentState, setComponentState}) => {
  const [divh2d7fd9c8e5Value, setDivh2d7fd9c8e5Value] = useState("");
  return (
    <div className="w-full rounded-md bg-white flex flex-row flex-wrap items-start justify-start p-[21px] box-border gap-[10.5px] tracking-[normal] text-left text-sm text-black font-semibold">
      <div className="flex-1 flex flex-col items-start justify-start gap-[8.77px] min-w-[307px] max-w-full">
        <div className="self-stretch flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[10.5px] gap-[1.87px]">
            <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[7px]">
              <div className="w-auto h-[21px] relative leading-[21px] font-semibold inline-block min-w-[54px]">
                Nombre
              </div>
            </div>
            <div className="self-stretch rounded-[5.25px] bg-slate-200 flex flex-col items-start justify-start py-[11.600000000000364px] pr-2.5 pl-[11.599999999998545px] border-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white">
              <input
                className="[border:none] [outline:none] bg-[transparent] self-stretch h-[24.5px] overflow-hidden shrink-0 flex flex-col items-start justify-start py-0 pl-0 box-border font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-rates-guest-list-create-16475x71625-default-1-inter-semi-bold-123 text-mid-5 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-ebony min-w-[250px]"
                placeholder="lista 1"
                type="text"
                value={divh2d7fd9c8e5Value}
                onChange={(event) => setDivh2d7fd9c8e5Value(event.target.value)}
              />
            </div>
          </div>

        </div>
        <div className="w-[31px] h-[21px] relative leading-[21px] font-semibold inline-block min-w-[31px] mt-[-1.9px]">
            Tipo
          </div>
          <div className="self-stretch flex flex-row items-start justify-center py-0 pr-0.5 pl-0 gap-[5px] ">
                <div className="rounded-md bg-green-600 flex flex-row items-start justify-start w-[100%] py-0 px-[10.5px] box-border gap-[9.5px] min-w-[141px]">
                  <div className="w-[11px] flex flex-col items-start justify-start pt-[9px] px-0 pb-0 box-border">
                    <div className="self-stretch h-3.5 relative leading-[14px] pt-[2px] inline-block">
                      <img src="/ModuloEvento/mundo.svg" alt="" />
                    </div>
                  </div>
                  <div className="h-9 w-auto relative leading-[36px] font-medium text-white inline-block min-w-[49px]">
                    Pública
                  </div>
                </div>
                <div className="rounded-md bg-slate-200 flex flex-row items-start justify-start w-[100%] py-0 px-[10.5px] box-border gap-[10px] min-w-[141px] text-gray-600">
                  <div className="w-[12px] flex flex-col items-start justify-start pt-[12px] px-0 pb-0 box-border">
                    <div className="self-stretch h-3.5 relative leading-[14px]  inline-block">
                      <img src="ModuloEvento/libro.svg" alt="" />
                    </div>
                  </div>
                  <div className="h-9 w-[58px] relative leading-[36px] font-medium inline-block min-w-[58px]">
                    Limitada
                  </div>
                </div>
              </div>

        <div className="w-[216px] h-[21px] relative leading-[21px] font-semibold inline-block">
          Hasta cuando se puede apuntar
        </div>
        <div className="w-full flex flex-row items-start justify-start gap-2 max-w-full [row-gap:20px] mq450:flex-wrap">
          
        <div className="w-full flex flex-col items-start justify-start gap-[7px] text-xs">

              <div className="self-stretch h-auto rounded-md bg-slate-200 box-border shrink-0 flex flex-row items-center justify-start pt-[2px]  pr-[10px] pl-[10px] gap-[4.5px] text-sm text-gray-600">
              <img
                  className="h-[16px] w-[16px]"
                  alt=""
                  src="/ModuloEvento/calendarioIcon2.svg"
                />
                  <div className="w-auto h-auto flex flex-row ">
               
                  <div className="w-auto h-auto leading-[36px] inline-block min-w-[47px] text-black">
                  21 de mar. de 2024
                  </div>

                  </div>

              </div>
            </div>
          
          <div className="w-full flex flex-col items-start justify-start gap-[7px] text-xs">

              <div className="self-stretch h-auto rounded-md bg-slate-200 box-border shrink-0 flex flex-row items-center justify-between pt-[2px]  pr-[10px] pl-[10px] gap-[4.5px] text-sm text-gray-600">
                  
                  <div className="w-auto h-auto flex flex-row ">
               
                  <div className="w-auto h-auto leading-[36px] inline-block min-w-[47px]">
                    +18
                  </div>

                  </div>
                <img
                  className="h-[16px] w-[16px]"
                  alt=""
                  src="/ModuloEvento/fAB.svg"
                />
              </div>
            </div>

        </div>
      </div>

      <div className="flex-1 flex flex-col items-start justify-start gap-[9.1px] min-w-[307px] max-w-full">
        <div className="w-auto h-[21px] relative leading-[21px] font-semibold inline-block min-w-[65px]">
          Opciones
        </div>
        
        <div className="self-stretch rounded-md flex flex-col items-start justify-start pt-[11.600000000000364px] pb-[13.49999999999818px] pr-2 pl-2 gap-[9.55px] border-[1px] border-solid border-slate-200">
          
        <div className="self-stretch overflow-hidden flex flex-row flex-wrap items-start justify-start gap-[3.9px]">
                <div className="flex flex-col items-start justify-start">
                  <div className="flex flex-row items-start justify-start gap-[3.4px] shrink-0 [debug_commit:2554057]">
                    <div className="h-[13.8px] flex flex-col items-start justify-start pt-[1.2999999999992724px] px-0 pb-0 box-border">
                      <img
                        className="w-[12.3px] h-[12.5px] relative overflow-hidden shrink-0"
                        loading="lazy"
                        alt=""
                        src="/ModuloEvento/relog3.svg"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-start py-0 pr-[9.599999999998545px] pl-0">
                      <div className="w-[85px] h-[18px] relative leading-[18px] inline-block min-w-[85px] whitespace-nowrap text-gray-600">{` 23:00 - 06:30 `}</div>
                    </div>
                    <div className="flex flex-col items-start justify-start pt-[1.2999999999992724px] px-0 pb-0 text-mediumslateblue font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-rates-guest-list-create-16475x71625-default-1-font-awesome-5-free-regular-14">
                      <div className="w-[11px] h-[13px] relative leading-[12.25px] inline-block min-w-[11px] whitespace-nowrap">
                      <img src="/ModuloEvento/generos.svg" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="h-[20.5px] flex flex-row items-start justify-start pt-0 px-0 pb-0 box-border text-sm text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black">
                    <div className="mt-[-0.5px] h-[21px] w-[131px] relative leading-[21px] inline-block shrink-0 [debug_commit:2554057]">
                      <b>{`10 € `}</b>
                      <span className="text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-gull-gray">
                        solo la entrada
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-start justify-start min-w-[187px]">
                  <b className="w-[23px] h-[18px] relative leading-[18px] inline-block min-w-[23px] whitespace-nowrap text-gray-400">
                    +18
                  </b>
                </div>
                <div className="flex flex-col items-start justify-start pt-[1.2999999999992724px] px-0 pb-0">
                      <div className="rounded-6xs flex flex-col items-center justify-start pt-2.5 px-[10.5px] pb-[12.200000000000728px]">
                        <div className="h-[13.8px] flex flex-row items-start justify-start">
                          <img
                            className="h-[13.8px] w-[8.8px] relative overflow-hidden shrink-0"
                            loading="lazy"
                            alt=""
                            src="/ModuloEvento/equis1.svg"
                          />
                        </div>
                  </div>
                </div>
              </div>

          <div className="self-stretch h-[1.1px] relative box-border border-t-[1.1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white" />
          <div className="flex flex-row items-start justify-start py-0 px-[21px] text-sm">
            <div className="flex flex-row items-end justify-start gap-[10.5px]">
              <div className="h-[16.9px] flex flex-col items-start justify-end pt-0 px-0 pb-[2.500000000001819px] box-border">
                <img
                  className="w-[10.5px] h-[14.4px] relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/ModuloEvento/mas1.svg"
                />
              </div>
              <div className="h-[21px] w-[92px] relative leading-[21px] inline-block min-w-[92px] font-medium text-gray-400">
                Añadir opción
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-[50px] relative">

                  <div className="w-auto h-[24.5px] relative leading-[24.5px] font-semibold inline-block min-w-[73px] max-h-[24.5px]">
                    Etiquetas
                  </div>
   
          <div className="text-xs leading-[14px] text-gray-400">
            Selecciona las etiquetas que quieras permitir en esta tarifa
          </div>
        </div>
        <div className="self-stretch rounded-md box-border flex flex-col items-start justify-start pt-[13.399999999999636px] pb-[13.299999999999272px] pr-[11px] pl-[13.299999999999272px] max-w-full text-center text-xs border-[1px] border-solid border-slate-200">

            <div className="flex flex-col items-start justify-start py-0 pr-[390px] pl-0 box-border max-w-full mq450:pr-5 mq450:box-border">
              
            <div className="flex flex-col items-start justify-start py-[3.5px] pr-1.5 pl-0 box-border">
                <div className="w-full rounded-md bg-slate-200 box-border flex flex-row items-center justify-center py-[4.600000000000364px] px-[3px]">
                  <div className="w-auto flex flex-col items-center justify-start">
                    <div className="w-8 h-auto relative leading-[14px] pl-2 pr-2 font-semibold flex items-center justify-center">
                      15
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-[3.5px] pr-1.5 pl-0 box-border">
                <div className="w-full rounded-md bg-slate-200 box-border flex flex-row items-center justify-center py-[4.600000000000364px] px-[3px]">
                  <div className="w-auto flex flex-col items-center justify-start">
                    <div className="w-8 h-auto relative leading-[14px] pl-2 pr-2 font-semibold flex items-center justify-center">
                      hola
                    </div>
                  </div>
                </div>
              </div>


              
            </div>
        </div>
      </div>
    </div>
  );
};

export default TarifasDatosC;
