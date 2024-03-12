import { Switch } from "@chakra-ui/react";
import { FC, memo, useState } from "react";
import { SwichtC } from "../../ToolsComponents/Swicht";
interface propsComOtros {
  componentState: any;
  setComponentState: any;

}


const ComOtros: FC <propsComOtros> = memo(({componentState,setComponentState}) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="w-full rounded-md bg-white flex flex-col items-center justify-start py-[21px] pr-[18px] pl-[21px] box-border gap-[28px]">
              <div className="w-auto flex flex-row flex-wrap items-start justify-start py-0 px-5 box-border gap-[28px] max-w-full shrink-0">


{/*         <FrameNested /> */}
<div className="flex-1 flex flex-col items-start justify-start gap-[8px] min-w-[301px] max-w-full text-left text-sm">
      
      <div className="self-stretch flex-row bg-slate-100 rounded-md items-start justify-start pt-0 px-0 pb-1.5 box-border">
        <div className="flex-col w-full items-start justify-start p-3.5 box-border opacity-[0.5]">
          
          
          <div className="self-stretch flex flex-row items-center justify-between [row-gap:20px] mq450:flex-wrap">

              <div className="flex w-auto h-[21px] relative items-start justify-start leading-[21px] font-semibold text-gray-500">
                Distinción de género

            </div>

            <div className="flex flex-row items-start justify-start pr-3 pl-0">
<SwichtC/>
          </div>

          </div>
            <div className="self-stretch flex-col items-start justify-start w-auto relative pt-[7px] pb-0 pr-1.5 pl-0 text-sm leading-[17.5px]">
              <p className="m-0">
                Desactiva esta opción para NO hacer distinción de géneros en
                recepción.
              </p>
              <p className="m-0">
                Activa esta opción para recopilar datos sobre el género de tus
                asistentes.
              </p>
            </div>
        </div>
      </div>


      <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-1.5 box-border max-w-full">
        <div className="flex-1 rounded-md bg-slate-200 flex flex-col items-start justify-start p-3.5 box-border opacity-[0.5] max-w-full">
         
          <div className="self-stretch flex flex-row items-center justify-between [row-gap:20px] mq450:flex-wrap">
            <div className="flex flex-col items-start justify-start">
              <div className="w-auto h-[21px] relative leading-[21px] font-semibold inline-block">
                Calidad obligatoria
              </div>
            </div>

            <div className="flex flex-row items-start justify-start pr-3 pl-0">
            <SwichtC/>
     
          </div>

          </div>
          <div className="self-stretch flex-col items-start justify-start pt-[7px] pb-0 pr-2.5 pl-0 text-smi-3 text-gray-600">
            <div className="w-auto relative leading-[17.5px] inline-block">
              <p className="m-0">
                <span>{`Activa esta opción para que se tenga que introducir de forma `}</span>
                <b className="font-semibold">
                  obligatoria
                </b>
              </p>
              <p className="m-0">
                la calidad en la recepción de cualquier venta
              </p>
            </div>
          </div>
        </div>
      </div>
      

      <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-1.5 box-border max-w-full text-sm">
        <div className="flex-1 rounded-md bg-slate-100 flex flex-col items-start justify-start p-3.5 box-border max-w-full">
          
          <div className="self-stretch flex flex-row items-center justify-between [row-gap:20px] mq450:flex-wrap">
            <div className="flex flex-col items-start justify-start">
              <div className="w-auto h-[21px] relative leading-[21px] font-semibold inline-block">
                RRPP puede anular entradas
              </div>
            </div>
            <div className="flex flex-row items-start justify-start pr-3 pl-0">
            <SwichtC/>
  
          </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start pt-[7px] pb-0 pr-7 pl-0 text-smi-3 text-gray-600">
            <div className="w-auto  relative leading-[17.5px] inline-block">
              <p className="m-0">
                Activa esta opción y los RRPP podrán anular las entradas las
                entradas
              </p>
              <p className="m-0">vendidas por ellos mismos</p>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start pt-[5.5px] px-0 pb-0">
            <div className="self-stretch flex flex-col items-start justify-start gap-[8.49px]">
              <div className="w-auto h-[21px] relative leading-[21px] font-semibold inline-block">
                Periodo de anulación
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-2 [row-gap:20px] mq450:pr-5 mq450:box-border mq725:flex-wrap">
                <button className="cursor-pointer self-stretch w-auto p-0 flex py-[7px] pr-2 pl-2 items-start justify-start rounded-md bg-rosa box-border">
                      <div className="w-auto text-xs leading-[14px] font-semibold text-white text-center">
                        Hasta fin del evento
                  </div>
                </button>
                <button className="cursor-pointer [border:none] py-0 pr-0 pl-[7px] bg-[transparent] flex flex-col items-start justify-start ml-[-0.02px] mq450:ml-0">
                  <div className="rounded-md bg-slate-300 box-border flex flex-row items-center justify-center py-[7px] px-2 ">
                      <div className="w-auto h-3.5 relative text-xs leading-[14px] font-semibold text-black text-center inline-block">
                        30 min tras la venta
                      </div>
                    
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-1.5 box-border max-w-full">
        <div className="flex-1 rounded-md bg-slate-100 flex flex-col items-start justify-start p-3.5 box-border shrink-0 max-w-full">
          <div className="self-stretch flex flex-row items-center justify-between max-w-full [row-gap:20px] mq450:flex-wrap">
            <div className="flex flex-col items-start justify-start">
              <div className="w-auto h-[21px] relative leading-[21px] font-semibold inline-block">
                Visible
              </div>
            </div>
            <div className="flex flex-row items-start justify-start pr-3 pl-0">
            <SwichtC/>
     
          </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start pt-[5.980000019073486px] pb-[0.45999860763549805px] pr-[21px] pl-0 shrink-0 text-smi-3 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-gull-gray">
            <div className="w-auto relative leading-[17.5px] inline-block">
              <p className="m-0">
                Muestra el evento a todos los clientes a través de la web o el
                iframe de
              </p>
              <p className="m-0">
                venta. Con la opción desactivada los RRPP y canales podrán
                seguir
              </p>
              <p className="m-0">
                vendiendo a través de Fourvenues Profesionales.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-1.5 box-border max-w-full">
        <div className="flex-1 rounded-md bg-slate-100 flex flex-col items-start justify-start py-3.5 pr-[12.029989242553711px] pl-[13.989999771118164px] box-border shrink-0 max-w-full">
          <div className="self-stretch flex flex-row items-center justify-between py-0 pr-[3px] pl-0 box-border max-w-full [row-gap:20px] mq450:flex-wrap">
            <div className="flex flex-col items-start justify-start">
              <div className="w-auto h-[21px] relative leading-[21px] font-semibold inline-block">
                Activo
              </div>
            </div>
            <div className="flex flex-row items-start justify-start pr-3 pl-0">
            <SwichtC/>
        
          </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start pt-[5.989999771118164px] px-0 pb-[0.42000389099121094px] shrink-0 text-smi-3 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-gull-gray">
            <div className="w-auto relative leading-[17.5px] inline-block">
              <p className="m-0">
                Con el evento desactivado solo los usuarios administrador y
                gestión
              </p>
              <p className="m-0">
                eventos verán el evento en Fourvenues Profesionales, tampoco
                aparecerá
              </p>
              <p className="m-0">
                en la web de venta ni en el iframe para el cliente. Usa esta
                opción para
              </p>
              <p className="m-0">
                hacer pruebas o configurar las tarifas de un evento que aún no
                quieres que
              </p>
              <p className="m-0">sean visibles a clientes o RRPP.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="self-stretch flex flex-col items-start justify-start max-w-full">
        <div className="self-stretch flex flex-row items-center justify-start">
          <div className="h-[21px] w-auto relative leading-[21px] font-semibold inline-block">
            Autorización paterna
          </div>
        </div>
        <div className="w-auto relative text-smi-3 leading-[17.5px] text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-gull-gray inline-block max-w-full mt-[-1px]">
          Sube un archivo o indica el enlace a un archivo externo.
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start rounded-md bg-slate-100 py-0 pr-px pl-0 box-border max-w-full [row-gap:20px] text-center text-smi-3 text-rosa mq450:flex-wrap">
        <div className="bg-slate-100 flex flex-row items-start justify-start pt-[9px] pb-[11px] pr-1.5 pl-2.5">
          <div className="h-[18px] w-[34px] relative leading-[17.5px] font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-data-1977x8595-default-inter-semi-bold-123 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black inline-block">
            {" "}
            Subir
          </div>
        </div>
        <input
          className="[border:none] [outline:none] bg-slate-100 h-[39px] flex-1 rounded-tl-none rounded-tr-6xs rounded-br-6xs rounded-bl-none flex flex-row items-center justify-start pt-2.5 px-[7px] pb-[13px] box-border font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-data-1977x8595-default-inter-semi-bold-123 text-smi-3 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-gull-gray min-w-[261px] max-w-full"
          placeholder="https://..."
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      </div>
    </div>
         

          <div className="flex-1 flex flex-col items-start justify-start gap-[7px] max-w-full">
            <div className="w-auto h-[21px] text-base relative leading-[21px] font-semibold inline-block">
              Términos y condiciones
            </div>
            <div className="w-auto h-[18px] relative text-smi-3 leading-[17.5px] text-xs text-gray-600 inline-block max-w-full">
              Especifica los términos y condiciones particulares del evento
            </div>
            <div className="self-stretch h-[230.8px] relative rounded-md bg-slate-100 overflow-hidden shrink-0" />
          </div>
        </div>
{/*         <SaveButton /> */}
        <div className="self-stretch flex flex-col items-center justify-center">
      <div className="self-stretch  h-[15.5px] relative box-border border-t-[1.5px] border-solid border-slate-200" />

        <button onClick={()=>{ 
                setComponentState(3)
              }}
        className="cursor-pointer [border:none] p-0 bg-[transparent] w-[85px] flex flex-col items-start justify-center">
          <div className="w-auto rounded-md bg-rosa text-sm text-white box-border flex flex-row items-center justify-center pt-[9.75px] px-[17px] pb-[9.729999542236328px] max-w-[85.87999725341797px]">
            Guardar
            
          </div>
        </button>
      </div>
    </div>


    
  );
});

export default ComOtros;