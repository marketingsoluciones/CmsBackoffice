
import { FunctionComponent } from "react";

const NegocioAjustes: FunctionComponent = () => {
  return (
    <div className="w-[1271px] max-w-full flex flex-col items-start justify-start py-7 px-0 box-border gap-[28px] tracking-[normal] leading-[normal] text-left text-7xl-3 text-gray-100 font-profourvenuescom-inter-bold-14">
      
      <div className="self-stretch flex flex-row items-start justify-start max-w-full">
        <div className="flex-1 overflow-hidden flex flex-col items-start justify-start max-w-full">
          <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[984px] pl-0 [row-gap:20px] mq450:pr-5 mq450:box-border mq750:pr-[492px] mq750:box-border">
            <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
              <div className="w-[37px] h-[37px] rounded-9980xl flex flex-row items-center justify-center pt-[4.5px] px-[7px] pb-[5.5px] box-border">
                <div className="flex flex-col items-start justify-start">
                  <div className="flex flex-row items-start justify-start">
                    <img
                      className="h-[27px] w-[23px] relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      src="/icon.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border min-w-[155px]">
              <div className="self-stretch overflow-hidden flex flex-col items-start justify-start">
                <div className="relative leading-[32px] font-semibold mq450:text-2xl mq450:leading-[25px]">
                  Ajustes generales
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="self-stretch flex flex-row items-start justify-start py-0 px-7 box-border max-w-full text-center text-smi-3 text-rosa">
        <div className="flex-1 overflow-hidden flex flex-row items-start justify-start max-w-full">
          <div className="flex flex-col items-start justify-start">
            <div className="flex flex-row items-start justify-start py-0 px-7 border-b-[1px] border-solid border-profourvenuescom-mystic">
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-col items-center justify-start pt-[7px] px-[21px] pb-2.5 border-b-[1px] border-solid border-rosa">
                  <div className="relative leading-[18px] font-medium inline-block min-w-[53px]">
                    Genérica
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-0 pr-0 pl-3.5 text-profourvenuescom-slate-gray">
                <div className="flex flex-col items-start justify-start">
                  <div className="flex flex-col items-center justify-start pt-[7px] px-[21px] pb-[11.5px]">
                    <div className="relative leading-[18px] font-medium inline-block min-w-[70px]">
                      Reservados
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="w-[1022px] flex flex-row items-start justify-start py-0 px-7 box-border max-w-full text-left text-sm text-gray-100 font-profourvenuescom-inter-bold-14">
        <div className="flex-1 rounded-6xs bg-profourvenuescom-nero flex flex-col items-start justify-start pt-7 px-0 pb-[21px] box-border gap-[28px] max-w-[1008px] lg:pt-5 lg:pb-5 lg:box-border mq1050:max-w-full">
          <div className="self-stretch flex flex-row items-start justify-start gap-[28px] max-w-full mq1050:flex-wrap">
            <div className="flex-[0.9574] flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[14px] min-w-[305px] max-w-full mq1050:flex-1">
              <div className="self-stretch flex flex-col items-start justify-start gap-[7px] max-w-full">
                <div className="relative leading-[21px] font-semibold inline-block min-w-[35px]">
                  Edad
                </div>
                <div className="self-stretch rounded-6xs bg-profourvenuescom-catskill-white1 overflow-hidden flex flex-row items-center justify-center py-2 pr-[17.5px] pl-[10.5px] box-border relative max-w-full">
                  <input
                    className="w-[calc(100%_-_42px)] [border:none] [outline:none] bg-profourvenuescom-catskill-white1 h-[21px] flex-1 flex flex-col items-start justify-center font-profourvenuescom-inter-bold-14 text-sm text-gray-100 min-w-[242px] max-w-full"
                    placeholder="+18"
                    type="text"
                  />
                  <div className="!m-[0] absolute h-[37.84%] top-[32.43%] right-[17.5px] bottom-[29.73%] flex flex-col items-start justify-start">
                    <div className="flex flex-row items-start justify-start">
                      <img
                        className="h-3.5 w-3.5 relative overflow-hidden shrink-0"
                        alt=""
                        src="/icon-27.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[7px]">
                <div className="relative leading-[21px] font-semibold inline-block min-w-[93px]">
                  Edad por dias
                </div>
                <div className="self-stretch flex flex-col items-start justify-start text-smi-3 text-lightslategray">
                  <div className="self-stretch relative leading-[18px]">
                    Configure la edad mínima para cada día de la semana
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-center justify-between gap-[10.67px] text-center mq750:flex-wrap">
                  <div className="w-[55px] flex flex-col items-center justify-start gap-[7px]">
                    <div className="flex flex-col items-center justify-start py-0 px-[23px]">
                      <div className="relative leading-[21px] font-semibold inline-block min-w-[8px]">
                        L
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="self-stretch flex flex-row items-start justify-center">
                        <div className="flex-1 rounded-6xs bg-profourvenuescom-catskill-white1 flex flex-row items-center justify-center border-[1px] border-solid border-profourvenuescom-catskill-white1">
                          <div className="rounded-6xs bg-profourvenuescom-catskill-white1 flex flex-col items-start justify-start py-[9px] pr-[7px] pl-[10.5px]">
                            <div className="overflow-auto flex flex-col items-center justify-start py-0 pr-[9px] pl-2.5">
                              <div className="relative inline-block min-w-[16px]">
                                18
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[55px] flex flex-col items-center justify-start gap-[7px]">
                    <div className="flex flex-col items-center justify-start py-0 px-[21px]">
                      <div className="relative leading-[21px] font-semibold inline-block min-w-[13px]">
                        M
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="self-stretch flex flex-row items-start justify-center">
                        <div className="flex-1 rounded-6xs bg-profourvenuescom-catskill-white1 flex flex-row items-center justify-center border-[1px] border-solid border-profourvenuescom-catskill-white1">
                          <div className="rounded-6xs bg-profourvenuescom-catskill-white1 flex flex-col items-start justify-start py-[9px] pr-[7px] pl-[10.5px]">
                            <div className="overflow-auto flex flex-col items-center justify-start py-0 pr-[9px] pl-2.5">
                              <div className="relative inline-block min-w-[16px]">
                                18
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[55px] flex flex-col items-center justify-start gap-[7px]">
                    <div className="flex flex-col items-center justify-start py-0 px-[21px]">
                      <div className="relative leading-[21px] font-semibold inline-block min-w-[13px]">
                        M
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="self-stretch flex flex-row items-start justify-center">
                        <div className="flex-1 rounded-6xs bg-profourvenuescom-catskill-white1 flex flex-row items-center justify-center border-[1px] border-solid border-profourvenuescom-catskill-white1">
                          <div className="rounded-6xs bg-profourvenuescom-catskill-white1 flex flex-col items-start justify-start py-[9px] pr-[7px] pl-[10.5px]">
                            <div className="overflow-auto flex flex-col items-center justify-start py-0 pr-[9px] pl-2.5">
                              <div className="relative inline-block min-w-[16px]">
                                18
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[55px] flex flex-col items-center justify-start gap-[7px]">
                    <div className="flex flex-col items-center justify-start py-0 px-[23px]">
                      <div className="relative leading-[21px] font-semibold inline-block min-w-[8px]">
                        J
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="self-stretch flex flex-row items-start justify-center">
                        <div className="flex-1 rounded-6xs bg-profourvenuescom-catskill-white1 flex flex-row items-center justify-center border-[1px] border-solid border-profourvenuescom-catskill-white1">
                          <div className="rounded-6xs bg-profourvenuescom-catskill-white1 flex flex-col items-start justify-start py-[9px] pr-[7px] pl-[10.5px]">
                            <div className="overflow-auto flex flex-col items-center justify-start py-0 pr-[9px] pl-2.5">
                              <div className="relative inline-block min-w-[16px]">
                                18
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[55px] flex flex-col items-center justify-start gap-[7px]">
                    <div className="flex flex-col items-center justify-start py-0 px-[22px]">
                      <div className="relative leading-[21px] font-semibold inline-block min-w-[11px]">
                        V
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="self-stretch flex flex-row items-start justify-center">
                        <div className="flex-1 rounded-6xs bg-profourvenuescom-catskill-white1 flex flex-row items-center justify-center border-[1px] border-solid border-profourvenuescom-catskill-white1">
                          <div className="rounded-6xs bg-profourvenuescom-catskill-white1 flex flex-col items-start justify-start py-[9px] pr-[7px] pl-[10.5px]">
                            <div className="overflow-auto flex flex-col items-center justify-start py-0 pr-[9px] pl-2.5">
                              <div className="relative inline-block min-w-[16px]">
                                18
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[55px] flex flex-col items-center justify-start gap-[7px]">
                    <div className="flex flex-col items-center justify-start py-0 px-[22px]">
                      <div className="relative leading-[21px] font-semibold inline-block min-w-[10px]">
                        S
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="self-stretch flex flex-row items-start justify-center">
                        <div className="flex-1 rounded-6xs bg-profourvenuescom-catskill-white1 flex flex-row items-center justify-center border-[1px] border-solid border-profourvenuescom-catskill-white1">
                          <div className="rounded-6xs bg-profourvenuescom-catskill-white1 flex flex-col items-start justify-start py-[9px] pr-[7px] pl-[10.5px]">
                            <div className="overflow-auto flex flex-col items-center justify-start py-0 pr-[9px] pl-2.5">
                              <div className="relative inline-block min-w-[16px]">
                                18
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[55px] flex flex-col items-center justify-start gap-[7px]">
                    <div className="flex flex-col items-center justify-start py-0 px-[22px]">
                      <div className="relative leading-[21px] font-semibold inline-block min-w-[11px]">
                        D
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <div className="self-stretch flex flex-row items-start justify-center">
                        <div className="flex-1 rounded-6xs bg-profourvenuescom-catskill-white1 flex flex-row items-center justify-center border-[1px] border-solid border-profourvenuescom-catskill-white1">
                          <div className="rounded-6xs bg-profourvenuescom-catskill-white1 flex flex-col items-start justify-start py-[9px] pr-[7px] pl-[10.5px]">
                            <div className="overflow-auto flex flex-col items-center justify-start py-0 pr-[9px] pl-2.5">
                              <div className="relative inline-block min-w-[16px]">
                                18
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    <div className="self-stretch rounded-sm bg-profourvenuescom-catskill-white flex flex-col items-start justify-start p-3.5 text-left text-sm text-gray-100 font-profourvenuescom-inter-bold-14">
      <div className="self-stretch flex flex-row items-center justify-start [row-gap:20px] mq450:flex-wrap">
        <div
          className="flex-1 flex flex-col items-start justify-start min-w-[136px]"
        
        >
          <div className="relative leading-[21px] font-semibold">
          Visible en Fourvenues Clientes
          </div>
        </div>
        <div
          className="flex-1 flex flex-col items-end justify-start min-w-[136px] mq450:ml-0"
          
        >
          <div className="w-[35px] h-[21px] flex flex-col items-start justify-start">
            <div className="w-[35px] h-[21px] flex flex-row items-center justify-start">
              <div className="h-[21px] w-[35px] rounded-9980xl bg-rosa flex flex-row items-center justify-start py-[3.5px] pr-[3.5px] pl-[17.5px] box-border">
                <div className="h-3.5 w-3.5 relative rounded-9980xl bg-profourvenuescom-nero box-border border-[1px] border-solid border-profourvenuescom-mystic" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start pt-[7px] px-0 pb-0 text-smi-3 text-lightslategray">
        <div className="self-stretch relative leading-[17.5px]">
        Activa esta opción para que tu negocio sea visible en Fourvenues Clientes.
        </div>
      </div>
    </div>

    <div className="self-stretch rounded-sm bg-profourvenuescom-catskill-white flex flex-col items-start justify-start p-3.5 text-left text-sm text-gray-100 font-profourvenuescom-inter-bold-14">
      <div
        className="self-stretch flex flex-row items-center justify-start [row-gap:20px] mq450:flex-wrap"
    
      >
        <div className="flex flex-col items-start justify-start">
          <div className="relative leading-[21px] font-semibold">
          Doble confirmación de email
          </div>
        </div>
        <div className="flex-1 flex flex-col items-end justify-start min-w-[35px] mq450:ml-0">
          <div className="w-[35px] h-[21px] flex flex-col items-start justify-start">
            <div className="w-[35px] h-[21px] flex flex-row items-center justify-start">
              <div
                className="h-[21px] w-[35px] rounded-9980xl bg-rosa flex flex-row items-center justify-start py-[3.5px] pr-[3.5px] pl-[17.5px] box-border"
            
              >
                <div
                  className="h-3.5 w-3.5 relative rounded-9980xl bg-profourvenuescom-nero box-border border-[1px] border-solid border-profourvenuescom-mystic"
                  
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start pt-[7px] px-0 pb-0 text-smi-3 text-lightslategray">
        <div className="self-stretch relative leading-[17.5px]">
        Activa esta opción para solicitar la doble confirmación de email en cualquier venta.
        </div>
      </div>
    </div>

    <div className="self-stretch rounded-sm bg-profourvenuescom-catskill-white flex flex-col items-start justify-start p-3.5 text-left text-sm text-gray-100 font-profourvenuescom-inter-bold-14">
      <div
        className="self-stretch flex flex-row items-center justify-start [row-gap:20px] mq450:flex-wrap"

      >
        <div className="flex flex-col items-start justify-start">
          <div className="relative leading-[21px] font-semibold">
          Distinción de género
          </div>
        </div>
        <div className="flex-1 flex flex-col items-end justify-start min-w-[35px] mq450:ml-0">
          <div className="w-[35px] h-[21px] flex flex-col items-start justify-start">
            <div className="w-[35px] h-[21px] flex flex-row items-center justify-start">
              <div
                className="h-[21px] w-[35px] rounded-9980xl bg-rosa flex flex-row items-center justify-start py-[3.5px] pr-[3.5px] pl-[17.5px] box-border"

              >
                <div
                  className="h-3.5 w-3.5 relative rounded-9980xl bg-profourvenuescom-nero box-border border-[1px] border-solid border-profourvenuescom-mystic"

                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start pt-[7px] px-0 pb-0 text-smi-3 text-lightslategray">
        <div className="self-stretch relative leading-[17.5px]">
          <p className="m-0">Desactiva esta opción para NO hacer distinción de géneros en recepción.</p>
          <p className="m-0">Activa esta opción para recopilar datos sobre el género de tus asistentes.</p>
        </div>
      </div>
    </div>

              <div className="self-stretch rounded-sm bg-profourvenuescom-catskill-white flex flex-col items-start justify-start p-3.5">
                <div className="self-stretch flex flex-row items-center justify-start mq450:flex-wrap">
                  <div className="flex flex-col items-start justify-start">
                    <div className="relative leading-[21px] font-semibold inline-block min-w-[121px]">
                      Calidad requerida
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-end justify-start min-w-[35px]">
                    <div className="w-[35px] h-[21px] flex flex-col items-start justify-start">
                      <div className="w-[35px] h-[21px] flex flex-row items-center justify-start">
                        <div className="h-[21px] w-[35px] rounded-9980xl bg-profourvenuescom-mystic flex flex-row items-center justify-start py-[3.5px] pr-[17.5px] pl-[3.5px] box-border">
                          <div className="h-3.5 w-3.5 relative rounded-9980xl bg-profourvenuescom-nero box-border border-[1px] border-solid border-profourvenuescom-anakiwa" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start pt-[7px] px-0 pb-0 text-smi-3 text-lightslategray">
                  <div className="self-stretch relative leading-[17.5px]">
                    <p className="m-0">
                      <span>{`Activa esta opción para que se tenga que introducir de forma `}</span>
                      <b className="font-profourvenuescom-inter-bold-14">
                        obligatoria
                      </b>
                      <span className="font-profourvenuescom-inter-bold-14">
                        {" "}
                        la
                      </span>
                    </p>
                    <p className="m-0">calidad en la recepción de listas</p>
                  </div>
                </div>
              </div>
              <div className="self-stretch rounded-sm bg-profourvenuescom-catskill-white flex flex-col items-start justify-start p-3.5">
                <div className="self-stretch flex flex-row items-center justify-start [row-gap:20px] mq450:flex-wrap">
                  <div className="flex flex-col items-start justify-start">
                    <div className="relative leading-[21px] font-semibold">
                      RRPP puede anular entradas
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-end justify-start min-w-[35px] mq450:ml-0">
                    <div className="w-[35px] h-[21px] flex flex-col items-start justify-start">
                      <div className="w-[35px] h-[21px] flex flex-row items-center justify-start">
                        <div className="h-[21px] w-[35px] rounded-9980xl bg-rosa flex flex-row items-center justify-start py-[3.5px] pr-[3.5px] pl-[17.5px] box-border">
                          <div className="h-3.5 w-3.5 relative rounded-9980xl bg-profourvenuescom-nero box-border border-[1px] border-solid border-profourvenuescom-mystic" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start pt-[7px] px-0 pb-0 text-smi-3 text-lightslategray">
                  <div className="relative leading-[17.5px]">
                    <p className="m-0">
                      Activa esta opción para establecer límites de entradas por
                      negocio, los
                    </p>
                    <p className="m-0">
                      cuales prevalecen sobre los límites por evento
                    </p>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start pt-[7px] px-0 pb-0">
                  <div className="self-stretch flex flex-col items-start justify-start gap-[7px]">
                    <div className="relative leading-[21px] font-semibold">
                      Periodo de anulación
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[195.1px] pl-0 [row-gap:20px] mq450:pr-5 mq450:box-border mq750:flex-wrap">
                      <button className="cursor-pointer [border:none] pt-[1.5px] px-0 pb-0 bg-[transparent] flex flex-col items-start justify-start">
                        <div className="rounded-6xs bg-rosa box-border flex flex-row items-center justify-center p-[3px] max-w-[109.9800033569336px] border-[1px] border-solid border-rosa">
                          <div className="flex flex-col items-center justify-start">
                            <div className="relative text-2xs-5 leading-[14px] font-semibold font-profourvenuescom-inter-bold-14 text-profourvenuescom-catskill-white text-center inline-block min-w-[101px]">
                              Hasta fin del evento
                            </div>
                          </div>
                        </div>
                      </button>
                      <button className="cursor-pointer [border:none] pt-[1.5px] pb-0 pr-0 pl-[7px] bg-[transparent] flex flex-col items-start justify-start mq450:ml-0">
                        <div className="rounded-6xs bg-profourvenuescom-mystic box-border flex flex-row items-center justify-center p-[3px] max-w-[108.94999694824219px] border-[1px] border-solid border-profourvenuescom-mystic">
                          <div className="flex flex-col items-center justify-start">
                            <div className="relative text-2xs-5 leading-[14px] font-semibold font-profourvenuescom-inter-bold-14 text-profourvenuescom-pickled-bluewood text-center inline-block min-w-[100px]">
                              30 min tras la venta
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
{/*               <Background
                dobleConfirmacinDeEmail="Mostrar totales en recepción"
                activaEstaOpcinParaSolici="Activa esta opción para ocultar el número total de entradas y listas en"
                venta="recepción"
                propRowGap="unset"
                propBackgroundColor="#ff5887"
                propBorder="1px solid #e2e8f0"
              />
              <Background1
                visibleEnFourvenuesClient="Devolver ventas pasadas"
                activaEstaOpcinParaQueTuN="Los usuarios con permiso podrán devolver ventas de eventos pasados"
                propFlex="unset"
                propMinWidth="unset"
                propMinWidth1="35px"
              />
              <Background
                dobleConfirmacinDeEmail="Recepcionistas pueden devolver"
                activaEstaOpcinParaSolici="Activa esta opción para que se puedan devolver entradas desde la"
                venta="aplicación de Access"
                propRowGap="unset"
                propBackgroundColor="#ff5887"
                propBorder="1px solid #e2e8f0"
              />
              <Background
                dobleConfirmacinDeEmail="RRPP puede anular reservas"
                activaEstaOpcinParaSolici="Activa esta opción para que tus relaciones públicas puedan anular las"
                venta="reservas vendidas por ellos"
                propRowGap="unset"
                propBackgroundColor="#e2e8f0"
                propBorder="1px solid #93c5fd"
              /> */}
              <div className="self-stretch flex flex-col items-start justify-start pt-0 px-2.5 pb-[21px] box-border max-w-full">
                <div className="self-stretch flex flex-row items-center justify-start">
                  <div className="flex flex-col items-start justify-start">
                    <div className="relative leading-[21px] font-semibold">
                      Autorización paterna
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[7px] text-smi-3 text-lightslategray">
                  <div className="self-stretch relative leading-[18px]">
                    Sube un archivo o indica el enlace a un archivo externo
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-center justify-start py-0 px-0 box-border max-w-full [row-gap:20px] mq450:flex-wrap">
                  <button className="cursor-pointer [border:none] py-[10.5px] px-[7px] bg-profourvenuescom-mystic w-[60.3px] rounded-tl-6xs rounded-tr-none rounded-br-none rounded-bl-6xs flex flex-row items-center justify-center box-border">
                    <div className="flex flex-row items-start justify-start">
                      <img
                        className="h-[13px] w-[12.3px] relative overflow-hidden shrink-0"
                        alt=""
                        src="/icon-28.svg"
                      />
                    </div>
                    <div className="flex-1 relative text-smi-3 leading-[18px] font-profourvenuescom-inter-bold-14 text-profourvenuescom-black text-center inline-block min-w-[34px]">
                      {" "}
                      Subir
                    </div>
                  </button>
                  <input
                    className="w-full [border:none] [outline:none] bg-profourvenuescom-catskill-white1 h-[38.5px] flex-1 rounded-tl-none rounded-tr-6xs rounded-br-6xs rounded-bl-none flex flex-col items-start justify-start pt-[11.5px] px-[7px] pb-3 box-border font-profourvenuescom-inter-bold-14 text-smi-3 text-lightslategray min-w-[240px] max-w-full"
                    placeholder="https://..."
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start gap-[6.8px] min-w-[305px] max-w-full mq1050:flex-1">
              <div className="relative leading-[21px] font-semibold">
                Términos y condiciones
              </div>
              <div className="relative text-smi-3 leading-[18px] text-lightslategray inline-block max-w-full">
                Especifica los términos y condiciones particulares de tu negocio
              </div>
              <textarea
                className="[border:none] bg-profourvenuescom-catskill-white1 h-[231px] w-auto [outline:none] self-stretch relative rounded-6xs overflow-hidden shrink-0"
                rows={12}
                cols={23}
              />
            </div>
          </div>
          <div className="self-stretch h-2 relative box-border border-t-[1px] border-solid border-profourvenuescom-catskill-white" />
          <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[84.9px] flex flex-col items-start justify-start">
              <div className="w-full rounded-6xs bg-rosa box-border flex flex-row items-center justify-center py-2 px-[17px] max-w-[84.94999694824219px] border-[1px] border-solid border-rosa">
                <div className="flex flex-col items-center justify-start">
                  <div className="relative text-smi-3 leading-[18px] font-semibold font-profourvenuescom-inter-bold-14 text-profourvenuescom-catskill-white text-center inline-block min-w-[49px]">
                    Guardar
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NegocioAjustes;