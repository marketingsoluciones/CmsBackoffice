import { FC } from "react";
interface propsCrmComponent {
    componentState: any;
    setComponentState: any;
  
  
  }

const CrmComponent: FC<propsCrmComponent> = ({componentState, setComponentState}) => {
  return (
    <div className="w-[100%] flex flex-col items-start justify-start py-0 px-7 box-border gap-[21px] tracking-[normal] leading-[normal] text-center">
      
      <div className="self-stretch flex flex-row flex-wrap items-start justify-between max-w-full [row-gap:20px]">
        
        <div className="flex flex-col items-start justify-start shrink-0 [debug_commit:1de1738] max-w-full mq975:min-w-full">
          <button className="cursor-pointer py-2 px-[17px] bg-white hover:bg-slate-200 rounded-md box-border flex flex-row items-center justify-center gap-[10.5px] border-[1px] border-solid border-slate-200">
            <div className="flex flex-col items-center justify-start">
              <div className="relative text-sm leading-[18px] font-semibold text-center inline-block min-w-[67px]">
                Último mes
              </div>
            </div>
            <div className="flex flex-col items-center justify-start pt-[0.1px] px-0 pb-[1.4px]">
              <div className="flex flex-row items-start justify-start opacity-[0.5]">
                <img
                  className="h-4 w-4 relative overflow-hidden shrink-0"
                  alt=""
                  src="/ModuloEvento/arrow-down2.svg"
                />
              </div>
            </div>
          </button>
        </div>

        <div className="flex flex-col items-start justify-start shrink-0 [debug_commit:1de1738] ml-[-132.1px] mq975:ml-0">
              <div className="rounded-md bg-white hover:bg-slate-200 box-border flex flex-row items-center justify-center py-2 px-[17px] gap-[10.5px] border-[1px] border-solid border-slate-200">
                <div className="flex flex-col items-center justify-start pt-0.5 px-0 pb-[2.5px]">
                  <div className="flex flex-row items-start justify-start">
                    <img
                      className="h-[13px] w-[13.8px] relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      src="/ModuloEvento/megaphone.svg"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start">
                  <div className="relative leading-[18px] font-semibold inline-block min-w-[72px] text-sm">
                    Fidelización
                  </div>
                </div>
              </div>

        </div>
      </div>

      <section className="self-stretch flex flex-col items-start justify-center gap-[21px] max-w-full text-left text-sm font-semibold text-gray-600">
        
        <div className="self-stretch w-full rounded-md bg-slate-50 box-border flex flex-row items-center justify-start py-[5px] px-9 min-h-[114px] [row-gap:20px] border-[1px] border-solid border-slate-300 ">
          <div className="flex-[0.6389] flex flex-col items-start justify-between py-2.5 pl-0 box-border min-w-[214px] min-h-[100px] mq450:pr-5 mq450:box-border mq450:flex-1 ">
            <div className="flex flex-row items-center justify-start py-0 px-0 gap-[12px]">
              <div className="flex py-2 px-2 bg-orange-800 rounded-full"/>
              <div className="relative leading-[18px] inline-block min-w-[40px] font-medium">
                Ventas
              </div>
            </div>
            <div className="relative text-lg leading-[35px] inline-block min-w-[22px] mq450:text-lgi mq450:leading-[21px] mq975:text-6xl mq975:leading-[28px]">
              0
            </div>
          </div>
          <div className="flex-[0.5576] flex flex-col items-start justify-between py-2.5 pl-0 box-border min-w-[214px] min-h-[100px] mq450:pr-5 mq450:box-border mq450:flex-1 ">
            <div className="flex flex-row items-center justify-start gap-[14px]">
              <img
                className="h-4 w-4 relative"
                loading="lazy"
                alt=""
                src="/ModuloEvento/ic_round-people-outline.svg"
              />
              <div className="relative leading-[18px] inline-block min-w-[30px] font-medium">
                Edad
              </div>
            </div>
            <div className="relative text-12xl-5 leading-[35px] font-semibold inline-block min-w-[15px] mq450:text-lgi mq450:leading-[21px] mq975:text-6xl mq975:leading-[28px]">
              -
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-between py-2.5 pl-0 box-border min-w-[214px] min-h-[100px] mq450:pr-5 mq450:box-border ">
            <div className="flex flex-row items-center justify-start gap-[13px]">
              <img
                className="h-4 w-4 relative"
                loading="lazy"
                alt=""
                src="/ModuloEvento/ph_money-fill.svg"
              />
              <div className="relative leading-[18px] inline-block min-w-[74px] font-medium">
                Gasto medio
              </div>
            </div>
            <div className="relative text-12xl-5 leading-[35px] font-semibold text-profourvenuescom-black inline-block min-w-[51px] mq450:text-lgi mq450:leading-[21px] mq975:text-6xl mq975:leading-[28px]">
              0 €
            </div>
          </div>
          <div className="flex-[0.8354] flex flex-col items-start justify-between py-2.5 pl-0 box-border min-w-[214px] min-h-[100px] mq450:pr-5 mq450:box-border mq450:flex-1 ">
            <div className="flex flex-row items-center justify-start py-0 px-0 gap-[11px]">
              <img
                className="h-4 w-4 relative"
                loading="lazy"
                alt=""
                src="/ModuloEvento/mdi_clipboard-account-outline.svg"
              />
              <div className="relative leading-[18px] inline-block min-w-[60px] font-medium">
                Asistencia
              </div>
            </div>
            <div className="relative text-12xl-5 leading-[35px] font-semibold text-profourvenuescom-black inline-block min-w-[22px] mq450:text-lgi mq450:leading-[21px] mq975:text-6xl mq975:leading-[28px]">
              0
            </div>
          </div>
        </div>

        <div className="self-stretch flex flex-row  items-center justify-start gap-[21px] max-w-full ">
          
          <div className="self-stretch w-full rounded-md bg-slate-50 box-border flex flex-row items-center justify-between py-[5px] px-5 min-w-[388px] min-h-[114px] max-w-full gap-[20px] border-[1px] border-solid border-slate-300 mq450:flex-wrap mq725:min-w-full ">
            <div className="h-[100px] w-[87.5px] flex flex-col items-start justify-between py-2.5 px-0 box-border text-left text-gray-600 font-semibold">
            <div className="flex flex-row items-center justify-start gap-[10px]">
<div className="flex py-2 px-2 bg-blue-800 rounded-full"/>
        <div
          className="relative leading-[18px] inline-block min-w-[53px]">
          hombres
        </div>
      </div>
      <div className="self-stretch relative text-12xl-5 leading-[35px] font-semibold  mq450:text-lgi mq450:leading-[21px] mq975:text-6xl mq975:leading-[28px]">
        0 %
      </div>
            </div>
            <div className="h-[100px] w-[87.5px] flex flex-col items-start justify-between py-2.5 px-0 box-border text-left text-gray-600 font-semibold">
            <div className="flex flex-row items-center justify-start gap-[10px]">
<div className="flex py-2 px-2 bg-pink-600 rounded-full"/>
        <div
          className="relative leading-[18px] inline-block min-w-[53px]">
          Mujeres
        </div>
      </div>
      <div className="self-stretch relative text-12xl-5 leading-[35px] font-semibold  mq450:text-lgi mq450:leading-[21px] mq975:text-6xl mq975:leading-[28px]">
        0 %
      </div>
            </div>
            <div className="h-[100px] w-[96.9px] flex flex-col items-start justify-between py-2.5 px-0 box-border">
              <div className="flex flex-row items-center justify-start gap-[10px]">
              <div className="flex py-2 px-2 bg-gray-600 rounded-full"/>
                <div className="overflow-hidden flex flex-col items-start justify-start">
                  <div className="relative leading-[18px] inline-block min-w-[63px]">
                    Sin género
                  </div>
                </div>
              </div>
              <div className="self-stretch relative text-12xl-5 leading-[35px] font-semibold text-profourvenuescom-black mq450:text-lgi mq450:leading-[21px] mq975:text-6xl mq975:leading-[28px]">
                0 %
              </div>
            </div>
          </div>

          <div className="self-stretch w-full rounded-md bg-slate-50 box-border flex flex-row items-center justify-start py-2 px-0 min-w-[388px] max-w-full border-[1px] border-solid border-slate-300 mq725:min-w-full ">
            <div className="flex-1 flex flex-col items-start justify-center py-0 px-[21px] box-border gap-[7px] max-w-full">
              <div className="flex flex-row items-center justify-start py-[9.5px] px-0 gap-[10px]">
              <div className="flex py-2 px-2 bg-green-800 rounded-full"/>
                <div className="relative leading-[18px] inline-block min-w-[78px]">
                  Total clientes
                </div>
              </div>
              <div className="self-stretch h-[7px] flex flex-col items-end justify-start pt-0 px-0 pb-0 box-border text-right text-profourvenuescom-gull-gray">
                <div className="relative leading-[18px] inline-block min-w-[54px]">
                  Suscritos
                </div>
              </div>
              <div className="self-stretch flex flex-row items-center justify-between gap-[20px] text-12xl-5 text-profourvenuescom-black mq450:flex-wrap">
                <div className="flex flex-row items-center justify-start py-0 pr-px pl-0 gap-[10px]">
                  <img
                    className="h-[22px] w-[18.4px] relative overflow-hidden shrink-0 opacity-50 "
                    loading="lazy"
                    alt=""
                    src="/ModuloEvento/f7_person.svg"
                  />
                  <div className="relative leading-[35px] font-semibold inline-block min-w-[22px] mq450:text-lgi mq450:leading-[21px] mq975:text-6xl mq975:leading-[28px]">
                    0
                  </div>
                </div>
                <img
                  className="self-stretch w-px relative max-h-full min-h-[35px]"
                  alt=""
                  src="/vector-13.svg"
                />
                <div className="flex flex-col items-start justify-start text-right text-profourvenuescom-gull-gray">
                  <div className="flex flex-col items-end justify-start">
                    <div className="relative leading-[35px] font-semibold inline-block min-w-[22px] mq450:text-lgi mq450:leading-[21px] mq975:text-6xl mq975:leading-[28px]">
                      0
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="self-stretch h-[385px] rounded-md bg-slate-50 box-border overflow-hidden shrink-0 flex flex-row items-start justify-between pt-px px-0 pb-0 max-w-full text-left text-xs font-semibold border-[1px] border-solid border-slate-300 ">

          
          <div className="flex flex-col items-start justify-start p-[21px] box-border max-w-full mq450:pt-5 mq450:pb-5 mq450:box-border mq725:min-w-full">
            
            <div className="self-stretch flex flex-row items-center justify-start gap-2 py-[4.5px] pl-0 [row-gap:20px] mq450:pr-5 mq450:box-border mq725:flex-wrap mq725:pr-[198px] mq725:box-border">
              <div className="flex flex-col items-start justify-start ">
                  <img
                    className="h-5 w-5 relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="/ModuloEvento/prime_sort-amount-up-alt.svg"
                  />
              </div>
              <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 mq450:ml-0">
                <div className="overflow-hidden flex flex-col items-start justify-start">
                  <div className="relative leading-[28px] text-base font-semibold inline-block min-w-[127px] mq450:text-mid mq450:leading-[22px]">
                    Rentabilidad
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-center py-[140px] px-[39px] text-center text-sm text-profourvenuescom-gull-gray">
              <div className="relative leading-[21px] flex items-center">
                <span className="w-full">
                  <p className="m-0">
                    No se han encontrado datos de rentabilidad para el período o
                    los eventos
                  </p>
                  <p className="m-0">seleccionados.</p>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-[385.5px] items-center justify-start p-[21px] box-border max-w-full text-center mq725:min-w-full ">
        
                  
                  <div className="flex flex-col items-center justify-start leading-[25px] font-semibold text-base">
                      Noviembre - Diciembre
                  </div>
                  <div className="w-[60%] h-[60%] flex flex-col items-start justify-start pt-[21px] px-0 pb-0 box-border">

                      <div className="rounded-full bg-white flex flex-col items-center justify-center py-[82px] px-5">
                        <div className="flex flex-col items-center justify-start">
                          <div className="relative leading-[32px] inline-block text-xl min-w-[42px] mq450:text-2xl mq450:leading-[25px]">
                            0 €
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-start text-2xl text-profourvenuescom-slate-gray">
                          <div className="relative leading-[28px] text-gray-400 inline-block min-w-[112px] mq450:text-mid mq450:leading-[22px]">
                            Recaudado
                          </div>
                        </div>
                      </div>
                    
                  </div>
                
              
            
          </div>

        
      </section>

      <section className="self-stretch flex flex-row items-start justify-start gap-[21px] max-w-full text-left ">
        
        <div className="rounded-md w-full bg-slate-50 box-border flex flex-col items-start justify-start pt-5 px-[21px] pb-[143px] gap-[160px] max-w-full border-[1px] border-solid border-slate-300 mq450:gap-[40px] mq450:pt-5 mq450:pb-[93px] mq450:box-border mq725:gap-[80px] mq725:min-w-full ">
          <div className="self-stretch w-full flex flex-row items-center justify-between gap-[10.5px] max-w-full mq725:flex-wrap">
            
            <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border max-w-full">
              <div className="self-stretch flex flex-row items-center justify-start py-[4.5px] pl-0 [row-gap:20px] mq450:flex-wrap mq450:pr-5 mq450:box-border">
                
                <div className="flex flex-col items-start justify-start pt-[1.3px] pb-[1.7px] pr-[10.5px] pl-0">
                  <div className="flex flex-row items-start justify-start">
                    <img
                      className="h-[18px] w-[19.7px] relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      src="/ModuloEvento/solar_cup-star-linear.svg"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 mq450:ml-0">
                  <div className="overflow-hidden flex flex-col items-start justify-start">
                    <div className="relative leading-[28px] font-semibold inline-block min-w-[57px] mq450:text-mid mq450:leading-[22px]">
                      Top 5
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="cursor-pointer rounded-md bg-white hover:bg-slate-200 flex flex-row items-start justify-start gap-2 py-2 px-[17px] border-[1px] border-solid border-slate-300">
                <div className="flex flex-col items-center justify-start pt-0.5 px-0 pb-[2.5px]">
                  
                    <img
                      className="h-[13px] w-[13.8px] relative overflow-hidden shrink-0"
                      alt=""
                      src="/ModuloEvento/ojito.svg"
                    />
                  
                </div>
                <div className="flex flex-col items-center justify-start">
                  <div className="relative text-sm leading-[18px] font-semibold text-center inline-block">
                    Ver listado completo
                  </div>
                </div>
              
            </button>

          </div>
          <div className="self-stretch relative leading-[21px] flex flex-row items-start justify-start py-0 pr-[26px] pl-[26.5px] text-center text-sm text-gray-400 font-medium">

              No se han encontrado clientes para el período o los eventos seleccionados.
            
          </div>
        </div>

          <div className="self-stretch rounded-md w-full bg-slate-50 flex flex-col items-start justify-start py-5 px-[21px] border-[1px] border-solid border-slate-300">
            
            <div className="self-stretch flex flex-row items-center justify-start py-[4.5px] pl-0 mq450:pr-5 mq450:box-border mq725:box-border">
              
              <div className="flex flex-col items-start justify-start pt-[1.3px] pb-[1.7px] pr-[10.5px] pl-0">
                <img src="/ModuloEvento/lucide_file-check.svg" className="flex flex-row items-start justify-start" />
              </div>
              <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                    Suscripciones
              </div>
            </div>

            <div className="self-stretch relative leading-[21px] h-full flex flex-row items-center justify-center px-[23px] text-center text-sm text-gray-400">
                  No se han encontrado datos de subscripciones para el período o los eventos seleccionados.
            </div>
          </div>
        

      </section>
      <section className="self-stretch flex flex-row items-start justify-start gap-[21px] max-w-full text-left ">
        
        <div className="rounded-md w-full bg-slate-50 box-border flex flex-col items-start justify-start pt-5 px-[21px] pb-[143px] gap-[160px] max-w-full border-[1px] border-solid border-slate-300 mq450:gap-[40px] mq450:pt-5 mq450:pb-[93px] mq450:box-border mq725:gap-[80px] mq725:min-w-full ">
          <div className="self-stretch w-full flex flex-row items-center justify-between gap-[10.5px] max-w-full mq725:flex-wrap">
            
            <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border max-w-full">
              <div className="self-stretch flex flex-row items-center justify-start py-[4.5px] pl-0 [row-gap:20px] mq450:flex-wrap mq450:pr-5 mq450:box-border">
                
                <div className="flex flex-col items-start justify-start pt-[1.3px] pb-[1.7px] pr-[10.5px] pl-0">
                  <div className="flex flex-row items-start justify-start">
                    <img
                      className="h-[18px] w-[19.7px] relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      src="/ModuloEvento/fluent_people-team-16-regular.svg"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 mq450:ml-0">
                  <div className="overflow-hidden flex flex-col items-start justify-start">
                    <div className="relative leading-[28px] font-semibold inline-block min-w-[57px] mq450:text-mid mq450:leading-[22px]">
                    Edad
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch relative leading-[21px] flex flex-row items-start justify-start py-0 pr-[26px] pl-[26.5px] text-center text-sm text-gray-400 font-medium">

              Pide los datos de la edad a tus clientes para mostrarte información útil.
            
          </div>
        </div>

          <div className="self-stretch rounded-md w-full bg-slate-50 flex flex-col items-start justify-start py-5 px-[21px] border-[1px] border-solid border-slate-300">
            
            <div className="self-stretch flex flex-row items-center justify-start py-[4.5px] pl-0 mq450:pr-5 mq450:box-border mq725:box-border">
              
              <div className="flex flex-col items-start justify-start pt-[1.3px] pb-[1.7px] pr-[10.5px] pl-0">
                <img src="/ModuloEvento/ion_card-outline.svg" className="flex flex-row w-5 h-5 items-start justify-start" />
              </div>
              <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
              Métodos de pago
              </div>
            </div>

            <div className="self-stretch relative leading-[21px] h-full flex flex-row items-center justify-center px-[23px] text-center text-sm text-gray-400">
            No se han encontrado transacciones para el período o los eventos seleccionados.
            </div>
          </div>
        

      </section>

    </div>
  );
};

export default CrmComponent;
