
import { FC } from "react";
import Comp1 from "./ComponentesAjustes/Comp1";
import { SwichtC } from "../../../ToolsComponents/Swicht";
import Comp2 from "./ComponentesAjustes/Comp2";
interface propsGenericaComp {
  componentState: any;
  setComponentState: any;

}

const GenericaComp: FC<propsGenericaComp> = ({componentState, setComponentState}) => {
  return (

      <div className="w-auto flex flex-row items-start justify-start py-0 px-7 box-border max-w-full text-left text-sm text-black font-profourvenuescom-inter-bold-14">
        <div className="flex-1 rounded-md bg-white flex flex-col items-start justify-start pt-7 px-0 pb-[21px] box-border gap-[28px] lg:pt-5 lg:pb-5 lg:box-border ">
          <div className="self-stretch flex flex-row items-start justify-start gap-[28px] max-w-full mq1050:flex-wrap">
            <div className="flex-[0.9574] flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[14px] min-w-[305px] max-w-full ">
              <div className="self-stretch flex flex-col items-start justify-start gap-[7px] max-w-full">
                <div className="relative leading-[21px] font-semibold inline-block min-w-[35px] text-gray-600">
                  Edad
                </div>
                <div className="self-stretch rounded-md bg-slate-100 overflow-hidden flex flex-row items-center justify-center py-2 pr-[17.5px] pl-[10.5px] box-border relative max-w-full">
                  <input
                    className="w-[calc(100%_-_42px)] [border:none] [outline:none] bg-inherit h-[21px] flex flex-col items-start justify-center  text-sm text-black min-w-[242px] max-w-full"
                    placeholder="+18"
                    type="text"
                  />
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[7px]">
                <div className="relative leading-[21px] font-semibold inline-block min-w-[93px] text-gray-600">
                  Edad por dias
                </div>
                <div className="self-stretch flex flex-row items-center justify-between gap-[10.67px] text-center mq750:flex-wrap">
                  
                <Comp1 title={"L"}/>
                <Comp1 title={"M"}/>
                <Comp1 title={"M"}/>
                <Comp1 title={"J"}/>
                <Comp1 title={"V"}/>
                <Comp1 title={"S"}/>
                <Comp1 title={"D"}/>

                </div>
              </div>
 
              <Comp2 title={"Doble confirmación de email"} subtitle={"Activa esta opción para solicitar la doble confirmación de email en cualquier venta."}/>
              <Comp2 title={"Distinción de género"} subtitle={"Desactiva esta opción para NO hacer distinción de géneros en recepción. Activa esta opción para recopilar datos sobre el género de tus asistentes."}/>

              {/* esta sera independiente */}

              <div className="self-stretch rounded-md bg-slate-100 flex flex-col items-start justify-start p-3.5">
                <div className="self-stretch flex flex-row items-center justify-between [row-gap:20px] mq450:flex-wrap">
                  <div className="flex flex-col items-start justify-start">
                    <div className="relative leading-[21px] font-semibold text-gray-600">
                      RRPP puede anular entradas
                    </div>
                  </div>
                  
              <SwichtC/>

                </div>
                <div className="self-stretch flex flex-col items-start justify-start pt-[7px] px-0 pb-0 text-smi-3 text-gray-400">
                  <div className="relative leading-[17.5px]">
                    <p className="m-0">
                      Activa esta opción para establecer límites de entradas por
                      negocio, los cuales prevalecen sobre los límites por evento
                    </p>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start pt-[7px] px-0 pb-0">
                  <div className="self-stretch flex flex-col items-start justify-start gap-[7px]">
                    <div className="relative leading-[21px] font-semibold text-gray-600">
                      Periodo de anulación
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start gap-2 py-0 pl-0 [row-gap:20px] mq450:pr-5 mq450:box-border mq750:flex-wrap">
                      
                      <button className="cursor-pointer [border:none] bg-rosa hover:bg-gray-400 rounded-md text-white font-medium text-xs flex flex-col items-start justify-start px-1 py-1">
                              Hasta fin del evento
                      </button>
                      <button className="cursor-pointer bg-inherit hover:bg-gray-200 rounded-md text-gray-400 hover:text-gray-600 font-medium text-xs flex flex-col items-start justify-start border-[1px] border-solid border-slate-200 py-1 px-1">
                      30 min tras la venta
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <Comp2 title={"Mostrar totales en recepción"} subtitle={"Activa esta opción para ocultar el número total de entradas y listas en recepción"}/>
              <Comp2 title={"Devolver ventas pasadas"} subtitle={"Los usuarios con permiso podrán devolver ventas de eventos pasados"}/>
              <Comp2 title={"Recepcionistas pueden devolver"} subtitle={"Activa esta opción para que se puedan devolver entradas desde la aplicación de Access"}/>
              <Comp2 title={"RRPP puede anular reservas"} subtitle={"Activa esta opción para que tus relaciones públicas puedan anular las reservas vendidas por ellos"}/>


            {/* otra seccion */}
              <div className="self-stretch flex flex-col items-start justify-start pt-0 px-2.5 pb-[21px] box-border max-w-full">
                <div className="self-stretch flex flex-row items-center justify-start">
                  <div className="flex flex-col items-start justify-start">
                    <div className="relative leading-[21px] font-semibold text-gray-600">
                      Autorización paterna
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[7px] text-smi-3 text-lightslategray">
                  <div className="self-stretch relative leading-[18px] text-gray-400">
                    Sube un archivo o indica el enlace a un archivo externo
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-center justify-start rounded-md overflow-hidden py-0 px-0 box-border max-w-full [row-gap:20px] mq450:flex-wrap">
                  <button className="cursor-pointer [border:none] py-[10.5px] px-[7px] bg-slate-200 w-[60.3px] rounded-tl-6xs rounded-tr-none rounded-br-none rounded-bl-6xs flex flex-row items-center justify-center box-border">
                    <div className="flex flex-row items-start justify-start">
                      <img
                        className="h-[13px] w-[12.3px] relative overflow-hidden shrink-0"
                        alt=""
                        src="ModuloEvento/ph_upload-bold.svg"
                      />
                    </div>
                    <div className="flex-1 relative text-smi-3 leading-[18px] font-profourvenuescom-inter-bold-14 text-profourvenuescom-black text-center inline-block min-w-[34px]">
                      {" "}
                      Subir
                    </div>
                  </button>
                  <input
                    className="w-full [border:none] [outline:none] bg-slate-100 h-[38.5px] flex-1 rounded-tl-none rounded-tr-6xs rounded-br-6xs rounded-bl-none flex flex-col items-start justify-start pt-[11.5px] px-[7px] pb-3 box-border font-profourvenuescom-inter-bold-14 text-smi-3 text-lightslategray min-w-[240px] max-w-full"
                    placeholder="https://..."
                    type="text"
                  />
                </div>
              </div>

            </div>

            <div className="flex flex-col items-start justify-start gap-[6.8px] min-w-[305px] max-w-full">
              <div className="relative leading-[21px] font-semibold text-gray-600">
                Términos y condiciones
              </div>
              <div className="relative text-smi-3 leading-[18px] text-lightslategray inline-block max-w-full text-gray-400">
                Especifica los términos y condiciones particulares de tu negocio
              </div>
              <textarea
                className="[border:none] bg-slate-100 h-[231px] w-auto [outline:none] self-stretch relative rounded-md overflow-hidden shrink-0"
              />
            </div>

          </div>
          <div className="self-stretch h-2 relative box-border border-t-[1px] border-solid border-slate-100" />
          <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[84.9px] flex flex-col items-start justify-start">
              <div className="w-full rounded-md bg-rosa box-border flex flex-row items-center justify-center py-2 px-[17px] max-w-[84.94999694824219px] border-[1px] border-solid border-rosa">
                <div className="flex flex-col items-center justify-start">
                  <div className="relative text-smi-3 leading-[18px] font-semibold text-white text-center inline-block min-w-[49px]">
                    Guardar
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

  );
};

export default GenericaComp;