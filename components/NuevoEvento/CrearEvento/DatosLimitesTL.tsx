import { FC } from "react";
import TabTarifas from "./TabTarifas";
interface propsDatosLimitesTL {
  componentState: any;
  setComponentState: any;

}

const DatosLimiteTL: FC <propsDatosLimitesTL> = ({componentState, setComponentState}) => {
  return (
    <div className="w-full bg-slate-100 flex flex-col items-start justify-start pt-0 px-0 pb-[30px] box-border gap-[37px] tracking-[normal] text-center">
      

      <div className="self-stretch h-auto overflow-hidden flex flex-col items-start justify-start py-[3.5px] px-7 box-border text-xs">
        <div className="flex flex-row items-center justify-start">
          <div className="flex flex-col items-start justify-start text-black">
            <div className="w-full flex flex-row items-center justify-center pt-[4.800000000000182px] px-1 pb-[4.699999999999818px] box-border gap-[3.5px] ">
              
              <div className="flex flex-col items-center justify-start pt-[1.199999999999818px] px-0 pb-[2.800000000000182px]">
                <div className="h-2.5 flex flex-row items-start justify-start">
                  <img
                    className="h-2.5 w-[9.2px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/icon.svg"
                  />
                </div>
              </div>

              <div className="flex flex-col items-start justify-start">
                <div className="self-stretch flex flex-row items-center justify-start py-0 pr-[3.637978807091713e-12px] pl-0">
                  <div className="w-auto flex flex-col items-start justify-start py-0 pr-[3px] pl-0 box-border">
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <b className="self-stretch h-3.5 relative leading-[14px] inline-block ">
                        <span className="uppercase">{`Mié. `}</span>20
                      </b>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start text-black">
                    <div className="w-auto flex flex-col items-center justify-start">
                      <div className="self-stretch h-3.5 relative leading-[14px] font-semibold inline-block ">
                        Playa y Rumba
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
          <div className="w-auto flex flex-col items-start justify-start text-black">
            <div className="w-full flex flex-row items-center justify-center pt-[4.800000000000182px] px-[5px] pb-[4.699999999999818px] box-border gap-[3.5px]">
              <div className="flex flex-col items-center justify-start pt-[1.199999999999818px] px-0 pb-[2.800000000000182px]">
                <div className="h-2.5 flex flex-row items-start justify-start">
                  <img
                    className="h-auto w-auto relative shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/sistem.svg"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-start">
                <div className="self-stretch h-3.5 relative leading-[14px] font-semibold inline-block">
                  Configuración
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start text-left text-sm text-gray-400">
            <div className="w-auto h-[21px] relative leading-[21px] inline-block">
              /
            </div>
          </div>
          <div className="self-stretch w-auto flex flex-col items-start justify-start text-gray-400">
            <div className="w-full flex flex-row items-center justify-center pt-[4.800000000000182px] px-[5px] pb-[4.699999999999818px] box-border gap-[3.34px]">
              <img
                className="h-auto w-auto"
                loading="lazy"
                alt=""
                src="ModuloEvento/tarifa.svg"
              />
              <div className="flex flex-col items-center justify-start">
                <div className="self-stretch h-3.5 relative leading-[14px] font-semibold inline-block">
                  Tarifa de Listas
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="self-stretch flex flex-row items-start justify-start py-0 px-14 box-border max-w-full text-left text-xl text-gray-600">
        <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq450:flex-wrap">
          
          <div className="w-[272px] flex flex-col items-start justify-start py-0 pr-[7px] pl-0 box-border">
            <div className="self-stretch overflow-hidden flex flex-col items-start justify-start">
              <div className="self-stretch flex flex-row items-center justify-start">
                
                <div onClick={()=>{ 
        setComponentState(11)
      }}
                className="cursor-pointer flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                  <div className="w-[37px] h-[37px] rounded-9980xl flex flex-row items-center justify-center pt-[5.399999999999636px] px-[7px] pb-[5.300000000000182px] box-border">
                    <div className="flex flex-col items-start justify-start">
                      <div className="h-[26.3px] flex flex-row items-start justify-start">
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

                <div className="flex flex-col items-start justify-start py-0 pr-2.5 pl-0 ml-[-0.01px]">
                  <div className="self-stretch overflow-hidden flex flex-col items-start justify-start">
                    <div className="w-auto h-[31.5px] relative leading-[31.5px] font-semibold inline-block max-h-[31.5px] mq450:text-2xl mq450:leading-[25px]">
                      Tarifas de Listas
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-col items-start justify-start">
              <div className="w-9 rounded-md bg-slate-200 box-border flex flex-row items-center justify-center pt-[6.300000000000182px] px-[9px] pb-[6.199999999999818px] max-w-[36px] border-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-mystic">
                <div className="flex flex-col items-center justify-start pt-1 px-0 pb-[5.800000000000182px]">
                  <div className="h-[15px] flex flex-row items-start justify-start pt-0 px-0 pb-[0.1000000000003638px] box-border">
                    <img
                      className="h-[14.7px] w-[15.8px] relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      src="ModuloEvento/trespuntos.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <section className="w-full flex flex-row items-start justify-start py-0 px-14 box-border max-w-full text-sm ">
<TabTarifas componentState={componentState} setComponentState={setComponentState}/>

      </section>
    </div>
  );
};

export default DatosLimiteTL;