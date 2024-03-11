import { FC, FunctionComponent } from "react";
import Permiso from "./CompPermi";
interface propsPermisos {
    componentState: any;
    setComponentState: any;
  
  }

const Permisos: FC <propsPermisos> = ({componentState,setComponentState}) => {
  return (
    <div className="w-full relative bg-whitesmoke-200 flex flex-col items-center justify-start pt-0 px-0 pb-[51px] box-border gap-[37px] tracking-[normal] text-center text-2xs-5 text-lightgray font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-rates-signatures-1318x573-default-1-inter-semi-bold-123">
      
      <div className="self-stretch overflow-hidden flex flex-col items-start justify-start py-[3.5px] pr-[27.989980697631836px] pl-[27.989999771118164px]">
        <div className="flex flex-row items-center justify-start py-0 pr-px pl-0">
          
          <div className="flex flex-col items-start justify-start text-xs">
            <div className=" flex flex-row items-center justify-center py-[4.75px] px-[5px] box-border gap-[3.5px]">
              <div className="flex flex-col items-center justify-start pt-[1.25px] px-0 pb-[2.729999542236328px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-2.5 w-[9.2px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src=""
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-row items-center justify-start">
                  <div className="w-auto flex flex-col items-start justify-start py-0 pr-px pl-0 box-border">
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <b className="w-auto h-3.5 relative leading-[14px] inline-block">
                        <span className="uppercase">{`Mié. `}</span>20
                      </b>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start ml-[-0.01px] text-black">
                    <div className="overflow-hidden flex flex-col items-center justify-start ">
                      <div className="w-auto h-3.5 relative leading-[14px] font-semibold inline-block">
                        Rumba y Playa
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start text-left text-sm">
            <div className="w-[5px] h-[21px] relative leading-[21px] inline-block">
              /
            </div>
          </div>

          <div className="flex flex-col items-start justify-start text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-pickled-bluewood-200">
            <div className="rounded-6xs flex flex-row items-center justify-center p-[4.75px] box-border gap-[3.5px] max-w-[95.43000030517578px]">
              <div className="flex flex-col items-center justify-start pt-[1.25px] px-0 pb-[2.729999542236328px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-2.5 w-[10.5px] relative overflow-hidden shrink-0"
                    alt=""
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-start">
                <div className="w-[72px] h-3.5 relative leading-[14px] font-semibold inline-block">
                  Configuración
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start text-left text-sm">
            <div className="w-[5px] h-[21px] relative leading-[21px] inline-block">
              /
            </div>
          </div>

          <div className="flex flex-col items-start justify-start text-darkslategray-300">
            <div className="rounded-6xs flex flex-row items-center justify-center py-[4.75px] px-1 box-border gap-[3.34px] max-w-[110.18000030517578px]">
              <img className="h-[12.8px] w-3 relative" loading="lazy" alt="" />
              <div className="flex flex-col items-center justify-start">
                <div className="w-12 h-3.5 relative leading-[14px] font-semibold inline-block">
                  Permisos
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="w-[1240px] flex flex-col items-start justify-start py-0 px-5 box-border gap-[58px] max-w-full text-left text-7xl-3 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-ebony-100">
        <div className="self-stretch flex flex-row items-start justify-between gap-[20px] mq416:flex-wrap">
          <div className="flex flex-col items-start justify-start py-0 pr-[7px] pl-0">
            <div className="overflow-hidden flex flex-col items-start justify-start">
              <div className="flex flex-row items-center justify-start py-0 pr-px pl-0">
                <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                  <div className="w-[37px] h-[37px] rounded-9980xl flex flex-row items-center justify-center pt-[5.369999885559082px] px-[7px] pb-[5.370001792907715px] box-border">
                    <div className="flex flex-col items-start justify-start">
                      <div className="flex flex-row items-start justify-start">
                        <img
                          className="h-[26.3px] w-[23px] relative overflow-hidden shrink-0"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start py-0 pr-[9px] pl-0 ml-[-0.01px]">
                  <div className="overflow-hidden flex flex-col items-start justify-start">
                    <div className="w-[119px] h-[31.5px] relative leading-[31.5px] font-semibold inline-block max-h-[31.5px]">
                      Permisos
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-[10px]">
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] flex flex-col items-start justify-start">
              <div className="rounded-6xs bg-rosa flex flex-row items-center justify-start py-0 pr-1.5 pl-[10.5px] gap-[7.1px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-3.5 w-[17.5px] relative overflow-hidden shrink-0"
                    alt=""
                  />
                </div>
                <div className="h-9 w-[113px] relative text-sm leading-[36px] font-medium font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-rates-signatures-1318x573-default-1-inter-semi-bold-123 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-nero text-center inline-block">
                  Asignar permiso
                </div>
              </div>
            </button>
            <div className="flex flex-col items-start justify-start">
              <div className="w-[35px] rounded-6xs bg-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-mystic-200 box-border flex flex-row items-center justify-center pt-[6.25px] px-[9px] pb-[6.250001907348633px] max-w-[35px] border-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-mystic-200">
                <div className="flex flex-col items-center justify-start pt-[3.75px] px-0 pb-[4.489999771118164px]">
                  <div className="flex flex-row items-start justify-start">
                    <img
                      className="h-[16.3px] w-[15.8px] relative overflow-hidden shrink-0"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-[219px] flex flex-col items-start justify-start gap-[7px]">
          <Permiso
            icon="12.25x14x1357552678"
            administrador=" Administrador"
            l="L"
            christian="Christian "
            lanza="Lanza"
            propBackgroundColor="#ed6c02"
            propDisplay="inline-block"
            propBackgroundColor1="#ed6c02"
          />
          <Permiso
            icon="14x14x2060162630"
            administrador=" Galería"
            l="B"
            christian="Barbara "
            lanza="Stender"
            propBackgroundColor="#0288d1"
            propDisplay="flex"
            propWidth="51px"
            propBackgroundColor1="#0288d1"
          />
        </div>
      </div>

    </div>
  );
};

export default Permisos;