import { FC } from "react";
interface propsDatosC {
  componentState: any;
  setComponentState: any;

}

const DatosC: FC <propsDatosC> = ({componentState, setComponentState}) => {
  return (

      <div className="w-full rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-row flex-wrap items-start justify-start pt-[21px] pb-[43px] pr-[20.69999999999709px] pl-[21px] box-border gap-[10.5px] max-w-full text-left text-sm text-black font-medium">
        <div className="flex flex-col items-start justify-start gap-[7px] min-w-[307px] max-w-full">
          <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[10.5px]">
            <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[7px]">
              <div className="relative leading-[21px] font-semibold inline-block min-w-[54px]">
                Nombre
              </div>
            </div>
            <input
              className="[outline:none] bg-slate-100 self-stretch h-12 rounded-md box-border flex flex-col items-start justify-start py-[11.5px] pl-[11.5px] text-md text-black min-w-[250px] border-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-catskill-white"
              placeholder="General"
              type="text"
            />
          </div>
          <div className="relative leading-[21px] font-semibold inline-block min-w-[31px]">
            Tipo
          </div>

          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[3px] pl-0 ">
            
            <div className="flex flex-col w-full items-start justify-start py-0 pr-[7px] pl-0 box-border min-w-[96px]">
              <div className="self-stretch flex flex-col items-start justify-start">
                <div className="self-stretch rounded-md bg-green-600 flex flex-row items-center justify-start py-0 pl-[10.5px] gap-[6.999999046325684px]">
                  <div className="h-auto w-auto flex flex-row items-start justify-start">
                    <img
                      className="h-3.5 w-[13.6px] relative overflow-hidden shrink-0"
                      alt=""
                      src="ModuloEvento/mundo2.svg"
                    />
                  </div>
                  <div className="relative leading-[36px] font-medium inline-block min-w-[49px] text-white">
                    Pública
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full items-start justify-start text-gray-600">
              <div className="self-stretch rounded-md bg-slate-200 flex flex-row items-center justify-start py-0 pl-[10.5px] gap-[10px]">
                <div className="h-3.5 w-[11px] relative leading-[14px] flex items-center">
                  <img src="ModuloEvento/libro.svg" alt="" />
                </div>
                <div className="relative leading-[36px] font-medium font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-ebony inline-block min-w-[58px]">
                  Limitada
                </div>
              </div>
            </div>

          </div>

        </div>
        <div className="flex flex-col items-start justify-start gap-[8.75px] min-w-[307px] max-w-full">
          <div className="self-stretch rounded-md bg-slate-100 box-border flex flex-col items-start justify-start pt-1.5 px-0 pb-px gap-[10px] max-w-full border-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-mystic">
            <div className="self-stretch flex flex-col items-start justify-start max-w-full">
              
              <div className="self-stretch flex flex-row items-center justify-center py-0 px-[21px] box-border max-w-full [row-gap:20px] mq675:flex-wrap">
                <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border min-w-[259px] max-w-full">
                  <div className="self-stretch flex flex-col items-start justify-start">
                    <div className="self-stretch flex flex-col items-start justify-start">
                      <div className="relative leading-[21px]">
                        <b>{`10 € `}</b>
                        <span className="text-gray-600">
                          solo la entrada
                        </span>
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-start justify-start text-xs text-gray-600">
                      <div className="relative leading-[14px]">
                        Hasta 1000 entradas, o hasta el final del evento
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start">
                  <div className="flex flex-row items-start justify-end">
                    <div className="rounded-6xs flex flex-col items-center justify-start py-[11px] px-[10.5px]">
                      <div className="h-3.5 flex flex-row items-start justify-start">
                        <img
                          className="h-3.5 w-[8.8px] relative overflow-hidden shrink-0"
                          loading="lazy"
                          alt=""
                          src="ModuloEvento/equis1.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-slate-200" />
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[5px] max-w-full">
              <div className="self-stretch flex flex-col items-start justify-start max-w-full">
                
              <div className="self-stretch flex flex-row items-center justify-center py-0 px-[21px] box-border max-w-full [row-gap:20px] mq675:flex-wrap">
                <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border min-w-[259px] max-w-full">
                  <div className="self-stretch flex flex-col items-start justify-start">
                    <div className="self-stretch flex flex-col items-start justify-start">
                      <div className="relative leading-[21px]">
                        <b>{`10 € `}</b>
                        <span className="text-gray-600">
                          solo la entrada
                        </span>
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-start justify-start text-xs text-gray-600">
                      <div className="relative leading-[14px]">
                        Hasta 1000 entradas, o hasta el final del evento
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start">
                  <div className="flex flex-row items-start justify-end">
                    <div className="rounded-6xs flex flex-col items-center justify-start py-[11px] px-[10.5px]">
                      <div className="h-3.5 flex flex-row items-start justify-start">
                        <img
                          className="h-3.5 w-[8.8px] relative overflow-hidden shrink-0"
                          loading="lazy"
                          alt=""
                          src="ModuloEvento/equis1.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-slate-200" />
              </div>
              <div className="self-stretch bg-orange-100 flex flex-row items-end justify-start py-[10.5px] px-[21px] gap-[10.5px] text-gray-600">
                <div className="h-[17px] flex flex-col items-start justify-end pt-0 px-0 pb-[3px] box-border">
                  <img
                    className="w-[10.5px] h-3.5 relative overflow-hidden shrink-0"
                    alt=""
                    src="ModuloEvento/mas1.svg"
                  />
                </div>
                <div className="relative leading-[21px] inline-block min-w-[88px]">
                  Añadir precio
                </div>
              </div>
            </div>

          </div>
          <div className="relative leading-[21px] font-semibold inline-block min-w-[104px]">
            Complementos
          </div>
          <div className="self-stretch rounded-md bg-slate-100 flex flex-row items-end justify-start py-[11.5px] px-[22px] gap-[10.5px] text-gray-600 border-[1px] border-solid border-slate-200">
            <div className="h-[17px] flex flex-col items-start justify-end pt-0 px-0 pb-[3px] box-border">
              <img
                className="w-[10.5px] h-3.5 relative overflow-hidden shrink-0"
                alt=""
                src="ModuloEvento/mas1.svg"
              />
            </div>
            <div className="relative leading-[21px]">Añadir complemento</div>
          </div>
        </div>
      </div>
  
  );
};

export default DatosC;