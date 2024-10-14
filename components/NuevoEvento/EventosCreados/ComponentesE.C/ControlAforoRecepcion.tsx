import { FC } from "react";
interface propsControlAforoRecepcion {
    componentState: any;
    setComponentState: any;
  
  }

const ControlAforoRecepcion: FC<propsControlAforoRecepcion> = ({componentState, setComponentState}) => {
  return (
    <div className="w-full relative flex flex-col items-center justify-start gap-[12px] leading-[normal] tracking-[normal] text-left text-7xl-3 text-black font-medium py-6 px-6 ">
      
      <div className="w-full flex flex-row items-center justify-start py-0 pr-5 pl-0 gap-3">
        

          <div onClick={() => {
            setComponentState(12)
          }} className="cursor-pointer flex flex-row items-center justify-center pt-[4.5px] px-[3.9px] pb-[5.5px]">
                <img
                  className="h-[27px] w-[23px] relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/ModuloEvento/vectorF.svg"
                />
             
        </div>
            <div className="relative leading-[32px] font-semibold inline-block min-w-[76px] mq450:text-2xl mq450:leading-[25px]">
              Asistencia de Usuarios
            </div>
      </div>

      <div className="flex flex-col items-center justify-start p-5 box-border gap-[12px] max-w-full text-center text-mid-5 text-profourvenuescom-black">
        <div className="w-[105px] flex flex-row items-start justify-start">
          <img
            className="h-[125px] flex-1 relative max-w-full overflow-hidden"
            loading="lazy"
            alt=""
            src="/ModuloEvento/011.svg"
          />
        </div>
        <div className="flex flex-col items-center justify-start pt-0 px-0 pb-[0.8px]">
          <b className="relative leading-[25px]">No hay zonas configuradas</b>
        </div>
        <div className="flex flex-col items-center justify-start gap-[13.5px] max-w-[500px] text-sm text-profourvenuescom-pickled-bluewood mq600:max-w-full">
          <div className="flex flex-col items-center justify-start py-0 pr-[0.7px] pl-[0.6px]">
            <div className="relative tracking-[-0.01px] leading-[21px]">
              <p className="m-0">
                Controla el aforo de forma sencilla sumando o restando
                asistentes. Tendrás
              </p>
              <p className="m-0">
                en tiempo real el aforo del recinto y de cada zona delimitada.
              </p>
            </div>
          </div>
          <div className="rounded-md bg-slate-200 hover:bg-white flex flex-row items-center justify-start py-0 px-[10.5px] gap-[7px]">
            <div className="flex flex-row items-start justify-center py-px px-0">
              <div className="flex flex-row items-start justify-start">
                +
              </div>
            </div>
            <div onClick={() => {
            setComponentState(20)
          }} className="relative leading-[36px] font-medium">
              Añadir Nuevo Recinto
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlAforoRecepcion;