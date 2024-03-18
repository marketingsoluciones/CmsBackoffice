import { FC, FunctionComponent } from "react";
import Permiso from "./CompPermi";
import ModoDemo from "../Principal/ModoDemo";
interface propsPermisos {
    componentState: any;
    setComponentState: any;
  
  }

const Permisos: FC <propsPermisos> = ({componentState,setComponentState}) => {
  return (
    <div className="w-full relative bg-whitesmoke-200 flex flex-col items-center justify-start px-4 pb-[51px] box-border gap-[37px] tracking-[normal] text-center">
      
      <div className="self-stretch overflow-hidden flex flex-col items-start justify-start">
        <div className="flex flex-row items-center justify-start py-0 pr-px pl-0">
          
          <div className="flex flex-col items-start justify-start text-xs">
            <div className=" flex flex-row items-center justify-center py-[4.75px] px-[5px] box-border gap-[3.5px]">
              <div className="flex flex-col items-center justify-start pt-[1.25px] px-0 pb-[2.729999542236328px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-2.5 w-[9.2px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/icon.svg"
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
            <div className="w-auto h-auto relative leading-[21px] inline-block">
              /
            </div>
          </div>

          <div className="flex flex-col items-start justify-start text-black">
            <div className=" flex flex-row items-center justify-center p-[4.75px] box-border gap-[3.5px] ">
              <div className="flex flex-col items-center justify-start pt-[1.25px] px-0 pb-[2.729999542236328px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-auto w-auto relative overflow-hidden shrink-0"
                    alt=""
                    src="ModuloEvento/Vector1.svg"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-start">
                <div className="w-auto h-auto relative leading-[14px] font-semibold text-xs inline-block">
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
            <div className="rounded-6xs flex flex-row items-center justify-center py-[4.75px] px-1 box-border gap-[3.34px]">
              <img className="h-[12.8px] w-3 relative" loading="lazy" alt="" src="ModuloEvento/Vector3.svg" />
              <div className="flex flex-col items-center justify-start">
                <div className="w-auto h-3.5 relative leading-[14px] font-semibold text-xs text-gray-400 inline-block">
                  Permisos
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <ModoDemo />
      <div className="w-full flex flex-col items-start justify-start py-0 px-5 box-border gap-[58px] max-w-full text-left text-7xl-3 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-ebony-100">
        <div className="self-stretch flex flex-row items-start justify-between gap-[20px] mq416:flex-wrap">
         
         
          <div className="flex flex-col items-start justify-start py-0 pr-[7px] pl-0">
            <div className="overflow-hidden flex flex-col items-start justify-start">
              <div className="flex flex-row items-center justify-start py-0 pr-px pl-0">
                
                <div onClick={()=>{ 
        setComponentState(3)
      }} 
                 className="cursor-pointer flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                  <div className="w-[37px] h-[37px] flex flex-row items-center justify-center pt-[6px] px-[7px] pb-[6px] box-border">
                    <div className="flex flex-col items-start justify-start">
                      <div className="flex flex-row items-start justify-start">
                        <img
                          className="h-[26.3px] w-[23px] relative overflow-hidden shrink-0"
                          alt=""
                          src="ModuloEvento/FlechaIzquerda.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start py-0 pr-[9px] pl-0 ml-[-0.01px]">
                  <div className="overflow-hidden flex flex-col items-start justify-start">
                    <div className="w-auto h-[31.5px] relative leading-[31.5px] font-semibold inline-block max-h-[31.5px]">
                      Permisos
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-[10px]">
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] flex flex-col items-start justify-start">
              <div className="rounded-md bg-rosa flex flex-row items-center justify-start py-0 pr-1.5 pl-[10.5px] gap-[7.1px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-3.5 w-[17.5px] relative overflow-hidden shrink-0"
                    alt=""
                    src="ModuloEvento/human3.svg"
                  />
                </div>
                <div className="h-9 w-auto relative text-sm leading-[36px] font-medium text-white text-center inline-block">
                  Asignar permiso
                </div>
              </div>
            </button>
            <div className="flex flex-col items-start justify-start">
              <div className="w-[35px] rounded-md bg-slate-200 box-border flex flex-row items-center justify-center pt-[6.25px] px-[9px] pb-[6.250001907348633px] max-w-[35px] border-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-mystic-200">
                <div className="flex flex-col items-center justify-start pt-[3.75px] px-0 pb-[4.489999771118164px]">
                  <div className="flex flex-row items-start justify-start">
                    <img
                      className="h-[16.3px] w-[15.8px] relative overflow-hidden shrink-0"
                      alt=""
                      src="ModuloEvento/tresPuntos.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-[219px] flex flex-col items-start justify-start gap-[7px]">
          <Permiso
            icon="ModuloEvento/human4.svg"
            administrador=" Administrador"
            letra="L"
            nombre1="Christian "
            apellido1="Lanza"
            propBackgroundColor="#ed6c02"
            propDisplay="inline-block"
            propBackgroundColor1="#ed6c02"
          />
          <Permiso
            icon="ModuloEvento/camara.svg"
            administrador=" Galería"
            letra="B"
            nombre1="Barbara "
            apellido1="Stender"
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