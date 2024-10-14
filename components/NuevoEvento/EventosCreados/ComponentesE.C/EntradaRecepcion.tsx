import { FC, useState } from "react";
import ModalListasRecepcion from "./ModalListaRecepcion";
import { Modal } from "../../../modals/Modal";
interface propsEntradaRecepcion {

    componentState?: any;
    setComponentState?: any;
    selectedOption: any;
    setSelectedOption: any;
    
    }

const EntradaRecepcion: FC<propsEntradaRecepcion> = ({componentState, setComponentState, selectedOption, setSelectedOption}) => {
    const [addInforme, setAddInforme] = useState(false);
  return (
    <div className="w-full relative flex flex-col items-start justify-start py-6 px-6 box-border gap-[35px] tracking-[normal] leading-[normal] text-left  text-black mq750:gap-[17px]">
      <div className="flex flex-row items-center justify-start py-0 pr-5 pl-0 gap-3">
        

          <div onClick={() => {
            setSelectedOption(12)
          }} className="cursor-pointer flex flex-row items-center justify-center pt-[4.5px] px-[3.9px] pb-[5.5px]">
                <img
                  className="h-[27px] w-[23px] relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/ModuloEvento/vectorF.svg"
                />
             
        </div>
            <div className="relative leading-[32px] font-semibold inline-block min-w-[76px] mq450:text-2xl mq450:leading-[25px]">
              Entradas
            </div>
      </div>
      <section className="self-stretch flex flex-col items-start justify-start gap-[14px] max-w-full text-left text-sm text-profourvenuescom-black font-profourvenuescom-inter-bold-14">
        
        <div className="self-stretch gap-2 overflow-hidden flex flex-row items-start justify-start max-w-full [row-gap:20px]">
          

        <div className="w-full self-stretch rounded-[5.25px] bg-slate-200 flex flex-row items-center justify-start px-2 border-[1px] border-solid border-slate-300">
             

                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-4 w-4 relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="/ModuloEvento/search.svg"
                  />
               
              </div>
                  <input
                    className="[border:none] [outline:none] text-base-1 bg-[transparent] self-stretch relative text-black text-left inline-block min-w-[242px]"
                    placeholder="Nombre del cliente o código"
                    type="text"
                  />
        </div>


        <div className="w-full self-stretch rounded-[5.25px] bg-slate-200 flex flex-row items-center justify-start px-2 border-[1px] border-solid border-slate-300">
             

             <div className="flex flex-row items-start justify-start">
               <img
                 className="h-4 w-4 relative overflow-hidden shrink-0"
                 loading="lazy"
                 alt=""
                 src="/ModuloEvento/user.svg"
               />
            
           </div>
               <input
                 className="[border:none] [outline:none] text-base-1 bg-[transparent] self-stretch relative text-black text-left inline-block min-w-[242px]"
                 placeholder="Referente"
                 type="text"
               />
        </div>



            <button className="w-auto cursor-pointer [border:none] py-0 px-[10.5px] bg-rosa rounded-md flex flex-row items-start justify-start gap-[4px]">
              <div className="flex flex-col items-start justify-start pt-[11px]">
                <img
                  className="w-4 h-4 relative overflow-hidden shrink-0"
                  alt=""
                  src="/ModuloEvento/scan.svg"
                />
              </div>
              <div className="relative text-sm leading-[36px] font-medium text-left text-white inline-block">
                Escanear
              </div>
            </button>

          <div className="flex flex-col items-start justify-start pt-2 pb-0 pr-2.5 pl-0">
            <div className="relative leading-[21px] inline-block min-w-[60px] whitespace-nowrap">
              20:52:50
            </div>
          </div>

          <div className="flex flex-col items-center justify-center pt-[11.5px] pb-0 pr-[6.2px] pl-0">
            <img
              className="w-10 h-4 relative overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src="/ModuloEvento/stop.svg"
            />
          </div>

          <div className="rounded-md flex flex-row items-start justify-start py-1.5 px-[7px] whitespace-nowrap text-gray-500 border-[1px] border-dashed border-slate-400">
            <div className="relative tracking-[-0.18px] leading-[21px] inline-block min-w-[128px]">
              <span>ASISTENTES:</span>
              <span className="text-black">{`  `}</span>
              <span className="text-blue-600">0 / 4</span>
            </div>
          </div>
        </div>

        <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-slate-300" />
        
        <div className="self-stretch bg-white rounded-md flex flex-row items-start justify-start pb-4 px-3.5 box-border max-w-full text-xs">
          <div className="flex-1 flex flex-col items-start justify-start max-w-full">
            <div className="flex flex-row items-start justify-start pt-[13px] pb-[11px] px-0 border-b-[1px] border-solid border-slate-200">
              <div className="h-6 w-[25.9px] relative shrink-0 [debug_commit:1de1738]">
                <img
                  className="absolute top-[5px] left-[7px] w-[11.9px] h-[13px] overflow-hidden"
                  loading="lazy"
                  alt=""
                  src="/ModuloEvento/info2.svg"
                />
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start relative max-w-full">
              <div className="w-[721.2px] !m-[0] absolute top-[-50px] left-[21px] box-border flex flex-row items-start justify-start pt-[16.3px] px-[7px] pb-4 min-w-[250px] max-w-full border-b-[1px] border-solid border-profourvenuescom-catskill-white">
                <b className="h-[17px] w-auto relative leading-[17px] inline-block min-w-[43px] p-0">
                  Nombre
                </b>
              </div>
              <div className="!m-[0] absolute top-[-50px] right-[450.8px] flex flex-row items-start justify-start pt-[16.3px] px-[7px] pb-4 text-right border-b-[1px] border-solid border-profourvenuescom-catskill-white">
                <b className="relative leading-[17px] inline-block min-w-[36px]">
                  Entran
                </b>
              </div>
              <div className="!m-[0] absolute top-[-50px] right-[378px] box-border flex flex-row items-start justify-start pt-[16.3px] pb-4 pr-[6.4px] pl-[7px] min-w-[70px] z-[1] text-right border-b-[1px] border-solid border-profourvenuescom-catskill-white">
                <b className="relative leading-[17px] inline-block min-w-[60px]">
                  Apuntados
                </b>
              </div>
              <div className="!m-[0] absolute top-[-50px] right-[264px] box-border flex flex-row items-start justify-start pt-[16.3px] px-[41.5px] pb-4 min-w-[100px] border-b-[1px] border-solid border-profourvenuescom-catskill-white hover:bg-gainsboro">
                <b className="relative leading-[17px] inline-block min-w-[31px]">
                  Tarifa
                </b>
              </div>
              <div className="!m-[0] absolute top-[-50px] right-[164px] box-border flex flex-row items-start justify-start pt-[16.3px] px-[7px] pb-4 min-w-[100px] text-right border-b-[1px] border-solid border-profourvenuescom-catskill-white hover:bg-gainsboro">
                <b className="relative leading-[17px] inline-block min-w-[86px]">
                  Ingresos finales
                </b>
              </div>
              <div className="!m-[0] absolute top-[-50px] right-[0px] box-border flex flex-row items-start justify-start pt-[16.3px] px-[55.5px] pb-4 min-w-[150px] border-b-[1px] border-solid border-profourvenuescom-catskill-white hover:bg-gainsboro">
                <b className="relative leading-[17px] inline-block min-w-[53px]">
                  Referente
                </b>
              </div>
                <div className="self-stretch w-full flex flex-col items-center justify-center">
              <div onClick={() => { setAddInforme(!addInforme) }}
              className="cursor-pointer w-full flex-1 bg-yellow-100 flex flex-row items-start justify-between py-[7px] pr-[54px] pl-[7px] box-border max-w-full gap-[20px] z-[2] text-sm lg:pr-[27px] lg:box-border mq750:flex-wrap">
                <div className="flex flex-row items-center justify-start gap-[7px]">
                  <div className="flex flex-col items-start justify-end pt-0 px-0 ">
                    <div className="flex flex-row items-start justify-start opacity-[0.25]">
                      <img
                        className="h-3.5 w-3.5 relative overflow-hidden shrink-0"
                        loading="lazy"
                        alt=""
                        src="/ModuloEvento/foto4.svg"
                      />
                    </div>
                  </div>
                  <div className="relative leading-[21px] inline-block min-w-[103px]">
                    Christian Lanza
                  </div>
                </div>
                <div className="w-[413.2px] flex flex-row items-center justify-start gap-[64.5px] max-w-full text-right text-profourvenuescom-gull-gray mq450:flex-wrap mq450:gap-[32px]">
                  <div className="relative leading-[21px] inline-block min-w-[9px] mq450:w-full mq450:h-[9px]">
                    0
                  </div>
                  <div className="flex-[0.743] flex flex-row items-center justify-start py-0 pr-[35px] pl-0 box-border gap-[13.6px] min-w-[90px] text-profourvenuescom-black mq450:flex-1">
                    <div className="w-[9.1px] relative leading-[21px] flex items-center shrink-0 min-w-[9.1px] [debug_commit:1de1738]">
                      6
                    </div>
                    <div className="flex flex-col items-center justify-center pt-0 px-0 pb-[1.2px] text-left text-[10px] ">
                      <div className="relative text-green-600 leading-[18px] inline-block min-w-[79px] shrink-0 [debug_commit:1de1738]">
                        gratis
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-row items-start justify-start gap-[14px] min-w-[90px] text-gray-200">
                    <div className="relative leading-[21px] inline-block min-w-[22px]">
                      0 €
                    </div>
                    <div className="relative leading-[21px] text-profourvenuescom-black text-left inline-block min-w-[103px]">
                      Christian Lanza
                    </div>
                  </div>
                </div>
              </div>
              <div onClick={() => { setAddInforme(!addInforme) }}
              className="cursor-pointer w-full flex-1 bg-white hover:bg-yellow-100 flex flex-row items-start justify-between py-[7px] pr-[54px] pl-[7px] box-border max-w-full gap-[20px] z-[2] text-sm lg:pr-[27px] lg:box-border mq750:flex-wrap">
                <div className="flex flex-row items-center justify-start gap-[7px]">
                  <div className="flex flex-col items-start justify-end pt-0 px-0 ">
                    <div className="flex flex-row items-start justify-start opacity-[0.25]">
                      <img
                        className="h-3.5 w-3.5 relative overflow-hidden shrink-0"
                        loading="lazy"
                        alt=""
                        src="/ModuloEvento/foto4.svg"
                      />
                    </div>
                  </div>
                  <div className="relative leading-[21px] inline-block min-w-[103px]">
                    Jhuliana Delgado
                  </div>
                </div>
                <div className="w-[413.2px] flex flex-row items-center justify-start gap-[64.5px] max-w-full text-right text-profourvenuescom-gull-gray mq450:flex-wrap mq450:gap-[32px]">
                  <div className="relative leading-[21px] inline-block min-w-[9px] mq450:w-full mq450:h-[9px]">
                    0
                  </div>
                  <div className="flex-[0.743] flex flex-row items-center justify-start py-0 pr-[35px] pl-0 box-border gap-[13.6px] min-w-[90px] text-profourvenuescom-black mq450:flex-1">
                    <div className="w-[9.1px] relative leading-[21px] flex items-center shrink-0 min-w-[9.1px] [debug_commit:1de1738]">
                      6
                    </div>
                    <div className="flex flex-col items-center justify-center pt-0 px-0 pb-[1.2px] text-left text-[10px] ">
                      <div className="relative text-green-600 leading-[18px] inline-block min-w-[79px] shrink-0 [debug_commit:1de1738]">
                        gratis
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-row items-start justify-start gap-[14px] min-w-[90px] text-gray-200">
                    <div className="relative leading-[21px] inline-block min-w-[22px]">
                      0 €
                    </div>
                    <div className="text-xs relative leading-[21px] text-left inline-block">
                    Jhuliana D.
                    </div>
                  </div>
                </div>
              </div>
              <div onClick={() => { setAddInforme(!addInforme) }}
              className="cursor-pointer w-full flex-1 bg-white hover:bg-yellow-100 flex flex-row items-start justify-between py-[7px] pr-[54px] pl-[7px] box-border max-w-full gap-[20px] z-[2] text-sm lg:pr-[27px] lg:box-border mq750:flex-wrap">
                <div className="flex flex-row items-center justify-start gap-[7px]">
                  <div className="flex flex-col items-start justify-end pt-0 px-0 ">
                    <div className="flex flex-row items-start justify-start opacity-[0.25]">
                      <img
                        className="h-3.5 w-3.5 relative overflow-hidden shrink-0"
                        loading="lazy"
                        alt=""
                        src="/ModuloEvento/foto4.svg"
                      />
                    </div>
                  </div>
                  <div className="relative leading-[21px] inline-block min-w-[103px]">
                    Yoe Stender
                  </div>
                </div>
                <div className="w-[413.2px] flex flex-row items-center justify-start gap-[64.5px] max-w-full text-right text-profourvenuescom-gull-gray mq450:flex-wrap mq450:gap-[32px]">
                  <div className="relative leading-[21px] inline-block min-w-[9px] mq450:w-full mq450:h-[9px]">
                    0
                  </div>
                  <div className="flex-[0.743] flex flex-row items-center justify-start py-0 pr-[35px] pl-0 box-border gap-[13.6px] min-w-[90px] text-profourvenuescom-black mq450:flex-1">
                    <div className="w-[9.1px] relative leading-[21px] flex items-center shrink-0 min-w-[9.1px] [debug_commit:1de1738]">
                      6
                    </div>
                    <div className="flex flex-col items-center justify-center pt-0 px-0 pb-[1.2px] text-left text-[10px] ">
                      <div className="relative text-green-600 leading-[18px] inline-block min-w-[79px] shrink-0 [debug_commit:1de1738]">
                        gratis
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-row items-start justify-start gap-[14px] min-w-[90px] text-gray-200">
                    <div className="relative leading-[21px] inline-block min-w-[22px]">
                      0 €
                    </div>
                    <div className="relative leading-[21px] text-profourvenuescom-black text-left inline-block min-w-[103px]">
                    Yoe Stender
                    </div>
                  </div>
                </div>
              </div>
              <div onClick={() => { setAddInforme(!addInforme) }}
              className="cursor-pointer w-full flex-1 bg-white hover:bg-yellow-100 flex flex-row items-start justify-between py-[7px] pr-[54px] pl-[7px] box-border max-w-full gap-[20px] z-[2] text-sm lg:pr-[27px] lg:box-border mq750:flex-wrap">
                <div className="flex flex-row items-center justify-start gap-[7px]">
                  <div className="flex flex-col items-start justify-end pt-0 px-0 ">
                    <div className="flex flex-row items-start justify-start opacity-[0.25]">
                      <img
                        className="h-3.5 w-3.5 relative overflow-hidden shrink-0"
                        loading="lazy"
                        alt=""
                        src="/ModuloEvento/foto4.svg"
                      />
                    </div>
                  </div>
                  <div className="relative leading-[21px] inline-block min-w-[103px]">
                    Carlos Carrillo
                  </div>
                </div>
                <div className="w-[413.2px] flex flex-row items-center justify-start gap-[64.5px] max-w-full text-right text-profourvenuescom-gull-gray mq450:flex-wrap mq450:gap-[32px]">
                  <div className="relative leading-[21px] inline-block min-w-[9px] mq450:w-full mq450:h-[9px]">
                    0
                  </div>
                  <div className="flex-[0.743] flex flex-row items-center justify-start py-0 pr-[35px] pl-0 box-border gap-[13.6px] min-w-[90px] text-profourvenuescom-black mq450:flex-1">
                    <div className="w-[9.1px] relative leading-[21px] flex items-center shrink-0 min-w-[9.1px] [debug_commit:1de1738]">
                      6
                    </div>
                    <div className="flex flex-col items-center justify-center pt-0 px-0 pb-[1.2px] text-left text-[10px] ">
                      <div className="relative text-green-600 leading-[18px] inline-block min-w-[79px] shrink-0 [debug_commit:1de1738]">
                        gratis
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-row items-start justify-start gap-[14px] min-w-[90px] text-gray-200">
                    <div className="relative leading-[21px] inline-block min-w-[22px]">
                      0 €
                    </div>
                    <div className="relative leading-[21px] text-profourvenuescom-black text-left inline-block min-w-[103px]">
                    Carlos Carrillo
                    </div>
                  </div>
                </div>
              </div>
              </div>

            </div>
          </div>
        </div>

      </section>
      {
        addInforme ? (
          <Modal
            setOpenIcon=""
            openIcon=""
            classe={"w-[36%] h-[86%]"}>

            <ModalListasRecepcion addInforme={addInforme} setAddInforme={setAddInforme} />
          </Modal>
        ) :
          null
      }
    </div>
  );
};

export default EntradaRecepcion;