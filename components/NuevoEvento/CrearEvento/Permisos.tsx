import { FC, FunctionComponent } from "react";
import Permiso from "./CompPermi";
import ModoDemo from "../Principal/ModoDemo";
import { useRouter } from 'next/router';
interface propsPermisos {
    componentState: any;
    setComponentState: any;
  
  }

const Permisos: FC <propsPermisos> = ({componentState,setComponentState}) => {
  const router = useRouter()
  return (
    <div className="w-full bg-whitesmoke-200 flex flex-col items-center justify-start py-5 px-4 box-border gap-[37px] tracking-[normal] text-center">
      
      <div className="flex items-center justify-center">
        <ModoDemo />
      </div>

      <div className="w-full flex flex-col items-start justify-start py-0 px-5 box-border gap-[58px] max-w-full text-left text-7xl-3 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-ebony-100">
        <div className="self-stretch flex flex-row items-start justify-between gap-[20px] mq416:flex-wrap">
        
        
          <div className="flex flex-col items-start justify-start py-0 pr-[7px] pl-0">
            <div className="overflow-hidden flex flex-col items-start justify-start">
              <div className="flex flex-row items-center justify-start py-0 pr-px pl-0">
                
                <div onClick={() => { router.push("/events/configure-event") }}

                className="cursor-pointer flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                  <div className="w-[37px] h-[37px] flex flex-row items-center justify-center pt-[6px] px-[7px] pb-[6px] box-border">
                    <div className="flex flex-col items-start justify-start">
                      <div className="flex flex-row items-start justify-start">
                        <img
                          className="h-[26.3px] w-[23px] relative overflow-hidden shrink-0"
                          alt=""
                          src="/ModuloEvento/FlechaIzquerda.svg"
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
                    src="/ModuloEvento/humanoB.svg"
                  />
                </div>
                <div className="h-9 w-auto relative text-sm leading-[36px] font-medium text-white text-center inline-block">
                  Asignar permiso
                </div>
              </div>
            </button>
            <div className="flex flex-col items-start justify-start">
              <div className="w-[35px] rounded-md bg-slate-200 box-border flex flex-row items-center justify-center pt-[6.25px] px-[9px] pb-[6.250001907348633px] max-w-[35px] border-[1px] border-solid">
                <div className="flex flex-col items-center justify-start pt-[3.75px] px-0 pb-[4.489999771118164px]">
                  <div className="flex flex-row items-start justify-start">
                    <img
                      className="h-[16.3px] w-[15.8px] relative overflow-hidden shrink-0"
                      alt=""
                      src="/ModuloEvento/tresPuntos.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-[219px] flex flex-col items-start justify-start gap-[7px]">
          <Permiso
            icon="/ModuloEvento/human4.svg"
            title=" Administrador"
            letra="L"
            nombre1="Christian "
            apellido1="Lanza"
            color1={"bg-orange-500"}
            color2={"bg-orange-500"}
          />
          <Permiso
            icon="/ModuloEvento/camara.svg"
            title=" Galería"
            letra="M"
            nombre1="Maria"
            apellido1="Perez"
            color1={"bg-blue-500"}
            color2={"bg-blue-500"}
          />
        </div>
      </div>

    </div>
  );
};

export default Permisos;