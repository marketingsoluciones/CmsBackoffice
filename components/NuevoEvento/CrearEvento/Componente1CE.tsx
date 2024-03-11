import { Modal } from '../../modals/Modal';
import { AñadirUbicacionM } from './AñadirUbicacionM';
import Checkbox from './Checkbox1';
import { FC, FunctionComponent, useState } from "react";
interface propsComponente1CE {
  componentState: any;
  setComponentState: any;

}

const Componente1CE: FC <propsComponente1CE> = ({componentState,setComponentState}) => {
    const [inputValue, setInputValue] = useState("");
    const [addUbicacion, setAddUbicacion] = useState(false);
  return (
    <div className="w-auto rounded-md bg-white flex flex-col items-center justify-start p-7 box-border gap-[10px] max-w-[896px] text-sm text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black mq750:pt-5 mq750:pb-5 mq750:box-border mq1100:max-w-full">
    <div className="self-stretch flex flex-col items-start justify-start pt-[5px] px-2.5 pb-0 box-border gap-[9px] max-w-full">
      <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[7px]">
        <div className="w-[41px] h-[21px] relative leading-[21px] font-semibold inline-block">
          Fecha
        </div>
      </div>
      <button className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex flex-row items-start justify-start max-w-full">
        <div className="flex-1 rounded-6xs bg-slate-100 border-solid border-[1px] border-slate-100 rounded-md flex flex-row flex-wrap items-center justify-start py-0 pr-[513px] pl-[10.5px] box-border gap-[7px] max-w-full mq750:pr-64 mq750:box-border mq450:pr-5 mq450:box-border">
          <div className="flex flex-row items-start justify-start">
            <img
              className="h-3.5 w-[12.3px] relative overflow-hidden shrink-0"
              alt=""
              src="ModuloEvento/fecha1.svg"
            />
          </div>
          <div className="h-9 flex-1 relative text-sm leading-[36px] font-medium font-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-inter-semi-bold-123 text-black text-left flex items-center min-w-[84px]">
            {" "}
            12 de feb. de 2024
          </div>
        </div>
      </button>
    </div>
    <div className="self-stretch flex flex-row items-start justify-start pt-0 px-2.5 pb-[5px] box-border max-w-full">
      <div className="flex-1 flex flex-row flex-wrap items-start justify-start py-0 pr-[7px] pl-0 box-border max-w-full">
        <div className="flex-[0.9794] flex flex-col items-start justify-start py-0 pr-[7px] pl-0 box-border gap-[7px] min-w-[136px] max-w-full">
          <div className="w-[72px] h-[21px] relative leading-[21px] font-semibold inline-block">
            Hora inicio
          </div>
          <button className="cursor-pointer pt-px pb-0 pr-2 pl-2.5 bg-slate-100 self-stretch rounded-[5.25px] flex flex-row items-center justify-start gap-[6px] border-[1px] border-solid border-slate-100 mq450:flex-wrap">
            <div className="h-3.5 w-3 relative text-sm leading-[14px] font-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-font-awesome-5-free-regular-105 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black text-left inline-block z-[1]">
            <img
              className="h-3.5 w-[12.3px] relative overflow-hidden shrink-0"
              alt=""
              src="ModuloEvento/relog1.svg"
            />
            </div>
            <div className="h-[35px] flex-1 flex flex-col items-start justify-start pt-0 px-0 pb-px box-border min-w-[175px]">
              <div className="w-[46px] h-9 relative text-sm leading-[36px] font-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-inter-semi-bold-123 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black text-left inline-block whitespace-nowrap">
                *00:00
              </div>
            </div>
            <img
              className="h-[21px] w-[21px] relative overflow-hidden shrink-0"
              alt=""
              src="ModuloEvento/flechaAbajo.svg"
              
            />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-start justify-start gap-[7px] min-w-[133px] max-w-full ml-[-6px]">
          <div className="w-[54px] h-[21px] relative leading-[21px] font-semibold inline-block">
            Hora fin
          </div>
          <button className="cursor-pointer pt-px px-[9px] pb-0 bg-slate-100 self-stretch rounded-[5.25px] flex flex-row items-center justify-start gap-[6px] border-[1px] border-solid border-slate-100 mq450:flex-wrap">
            <div className="h-3.5 w-[13px] relative text-sm leading-[14px] font-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-font-awesome-5-free-regular-105 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black text-left inline-block z-[1]">
            <img
              className="h-3.5 w-[12.3px] relative overflow-hidden shrink-0"
              alt=""
              src="ModuloEvento/relog1.svg"
            />
            </div>
            <div className="h-[35px] flex-1 flex flex-col items-start justify-start pt-0 px-0 pb-px box-border min-w-[174px]">
              <div className="w-[45px] h-9 relative text-sm leading-[36px] font-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-inter-semi-bold-123 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black text-left inline-block whitespace-nowrap">
                *07:30
              </div>
            </div>
            <img
              className="h-[21px] w-[21px] relative overflow-hidden shrink-0"
              alt=""
              src="ModuloEvento/flechaAbajo.svg"
            />
          </button>
        </div>
      </div>
    </div>


    <div className="self-stretch flex flex-col items-start justify-start pt-0 px-2.5 pb-2.5 gap-[7px]">
      <div className="w-[54px] h-[21px] relative leading-[21px] font-semibold inline-block">
        Nombre
      </div>
      <input
        className="[outline:none] bg-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-catskill-white1 self-stretch h-[47.5px] relative rounded-[5.25px] box-border min-w-[250px] border-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-catskill-white1"
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
    </div>
    <div className="self-stretch h-[75px] flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[17px] max-w-full">
      <div className="w-[68px] h-[21px] relative leading-[21px] font-semibold inline-block">
        Ubicación
      </div>
      <button onClick={() => {setAddUbicacion(!addUbicacion)}} className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex-1 flex flex-row items-start justify-start relative max-w-full">
        <div className="flex-1 rounded-[5.25px] bg-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-catskill-white1 box-border flex flex-row items-center justify-between pt-px pb-0 pr-[9px] pl-[11px] gap-[20px] max-w-full z-[1] border-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-catskill-white1">
          <div className="h-[35px] flex flex-col items-start justify-start pt-0 px-0 pb-0 box-border">
            <div className="w-[102px] h-9 relative text-sm leading-[36px] font-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-inter-semi-bold-123 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black text-left inline-block">
              Aguials Crsistla
            </div>
          </div>
          <img
            className="h-[21px] w-[21px] relative overflow-hidden shrink-0"
            alt=""
            src="ModuloEvento/flechaAbajo.svg"
          />
        </div>
      </button>
    </div>


    <div className="self-stretch flex flex-row items-start justify-start py-0 px-2.5 text-sm text-slate-400">
      <div className="h-3.5 w-auto relative leading-[14px] inline-block">
        {" "}
        Campo requerido
      </div>
    </div>
    <div className="self-stretch flex-col items-start justify-start pt-0 px-2.5 box-border max-w-full">
      <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0">
        <div className="w-[203px] h-[21px] relative leading-[21px] font-semibold inline-block">
          ¿Qué zonas quieres importar?
        </div>
      </div>
      <div className="self-stretch flex flex-row items-center justify-start py-[3.5px] px-0 box-border">
        <Checkbox label="" />
        <div className="flex-col items-start justify-start min-w-[423px] max-w-full text-base-8 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black font-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-inter-semi-bold-123 mq750:min-w-full">
          <div className="w-[83px] h-[24.5px] relative leading-[24.5px] font-semibold inline-block max-h-[24.5px]">
            fumadores
          </div>
        </div>
      </div>
    </div>
    <div className="self-stretch h-[130px] flex-col items-start justify-start py-0 px-2.5 box-border gap-[16px]">
      <div className="w-[65px] h-[21px] relative leading-[21px] font-semibold inline-block">
        Opciones
      </div>
      <div className="self-stretch flex-col items-start justify-start gap-[9px] font-medium">
        <div className="flex-col items-start justify-start gap-[11px]">
          <div className=" flex-row items-end justify-start gap-[7px]">
            <Checkbox label="" />
            <div className="h-[17.5px] w-auto relative text-smi-3 leading-[17.5px] text-black inline-block ">
              Copiar tarifas
            </div>
          </div>
          <div className="flex-row items-end justify-start gap-[7px]">
            <Checkbox label="" />
            <div className="h-auto w-auto relative text-smi-3 leading-[17.5px] font-medium text-black inline-block ">
              Repetir evento
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-md bg-slate-50 flex flex-row items-start justify-start p-2.5 gap-[5px] text-2xs-5 text-slate-400 border-[1px] border-solid border-slate-200">
          <div className="h-3.5 w-auto relative leading-[14px] font-medium text-slate-400 inline-block">
          Se copiarán las tarifas y la configuración de aforo del evento
            anterior del mismo día de la semana.
          </div>
        </div>
      </div>
    </div>
    <div className="self-stretch h-auto flex flex-row items-center justify-center pt-5 px-2.5 box-border">
      <button onClick={()=>{ 
        setComponentState(3)
      }} 
      className="cursor-pointer py-[9.75px] px-[17px] bg-rosa rounded-md box-border flex flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-start">
          <div className="w-auto  h-[17.5px] relative text-sm leading-[17.5px] font-medium text-white text-center inline-block">
            Crear evento
          </div>
        </div>
      </button>
    </div>
   
    {
  addUbicacion ? (
      <Modal  
      setOpenIcon="" 
      openIcon="" 
      classe={"w-[56%] h-[86%]"}>

          <AñadirUbicacionM addUbicacion={addUbicacion} setAddUbicacion={setAddUbicacion} />
      </Modal>
  ) :
      null
}
  </div>



  );
};



export default Componente1CE;