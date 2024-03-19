import { FC } from "react";
interface propsTarifaListas {
    componentState: any;
    setComponentState: any;
  
  }

const TarifaListas: FC <propsTarifaListas> = ({componentState,setComponentState}) => {
  return (
    <div className="w-full relative bg-whitesmoke-200 flex flex-col items-center justify-start pt-0 px-0 pb-[30px] box-border gap-[37px] tracking-[normal] text-center text-2xs-5 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-geyser font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-discount-codes-16475x71625-default-inter-semi-bold-123">
      
      <div className="self-stretch h-[] overflow-hidden flex flex-col items-start justify-start py-[3.5px] px-7 box-border text-xs">
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

      <div className="w-[100%] flex flex-row items-start justify-between py-0 px-5 box-border gap-[20px] max-w-full text-left text-7xl-3 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-ebony mq416:flex-wrap">
        <div className="w-[272px] flex flex-col items-start justify-start py-0 pr-[7px] pl-0 box-border">
          <div className="self-stretch overflow-hidden flex flex-col items-start justify-start">
            <div className="self-stretch flex flex-row items-center justify-start">
              
              <div onClick={()=>{ 
        setComponentState(3)
      }}
              className=" cursor-pointer flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                <div className="w-[37px] h-[37px] flex flex-row items-center justify-center pt-[5.399999999999636px] px-[7px] pb-[5.300000000000182px] box-border">
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
                  <div className="w-52 h-[31.5px] relative leading-[31.5px] font-semibold inline-block max-h-[31.5px] mq416:text-2xl mq416:leading-[25px]">
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
      <div className="w-auto flex flex-col items-center justify-center pt-0 px-5 pb-0 box-border gap-[20px] max-w-full text-mid-5 text-black">
        <img
          className="w-[150px] h-[121.9px] relative"
          loading="lazy"
          alt=""
          src="ModuloEvento/tarifaG.svg"
        />
        <b className="w-[118px] h-[24.5px] relative leading-[24.5px] flex items-center justify-center min-w-[118px] shrink-0">
          No hay tarifas
        </b>
        <div className="w-full flex flex-col items-center justify-start pt-0 px-0 pb-[0.0999999999994543px] box-border gap-[28.67px] max-w-[501px] shrink-0 text-sm text-gray-500">
          <div className="w-auto h-[21px] relative leading-[21px] flex items-center justify-center max-w-full text-gray-400">
            Crea una tarifa de listas para permitir que la gente se apunte en
            lista
          </div>
          <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
            <button className="cursor-pointer [border:none] py-0 px-[10.5px] bg-rosa w-[115px] rounded-md flex flex-row items-center justify-start box-border gap-[6.97px]">
              <div className="flex flex-row items-start justify-center pt-[1.300000000000182px] px-0 pb-[2.699999999999818px]">
                <div className="h-[13.3px] flex flex-row items-start justify-start text-white font-medium text-md">
                  +
                </div>
              </div>
              <div className="h-9 relative text-sm leading-[36px] font-medium text-white text-center inline-block min-w-[76px]">
                Crear tarifa
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarifaListas;