import { CheckboxEvents } from '../../Events/CheckBoxEvents';
import DateTimePicker1 from '../../Events/DataTimeEvents';
import { Modal } from '../../modals/Modal';
import { AñadirUbicacionM } from './AñadirUbicacionM';
import Checkbox from './Checkbox1';
import { FC, useState } from "react";
import { useRouter } from 'next/router';
interface propsComponente1CE {
  componentState: any;
  setComponentState: any;

}

const Componente1CE: FC <propsComponente1CE> = ({componentState,setComponentState}) => {
  const router = useRouter()
    const [inputValue, setInputValue] = useState("");
    const [addUbicacion, setAddUbicacion] = useState(false);
    
  return (
    <div className="w-auto rounded-md bg-white flex flex-col items-center justify-start p-7 box-border gap-[10px] text-sm">
    

    <div className="self-stretch flex flex-row items-start justify-start pt-0 px-2.5 pb-[5px] box-border max-w-full">
    <DateTimePicker1 label="Selecciona un rango de tiempo" />
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

    <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 box-border gap-[17px] max-w-full">
      <div className="w-auto relative leading-[21px] font-semibold inline-block">
        Ubicación
      </div>
      <button onClick={() => {setAddUbicacion(!addUbicacion)}} className="cursor-pointer rounded-md p-0 bg-[transparent] self-stretch flex flex-row items-center justify-between pt-px pb-0 pr-[9px] pl-[11px] border-[1px] border-solid max-w-full">
        
            <div className="w-auto relative text-sm leading-[36px] text-left inline-block">
              Aguials Crsistla
            </div>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.80078 8.90039L11.0008 13.1004L15.2008 8.90039" stroke="#6B7280" stroke-width="1.575" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        
      </button>
    </div>


    <div className="self-stretch flex flex-row items-start justify-start py-0 px-2.5 text-sm text-slate-400">
      <div className="h-3.5 w-auto relative leading-[14px] inline-block">
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
      <CheckboxEvents title={"Fumadores"}/>
      </div>
    </div>

    <div className="self-stretch h-[130px] flex-col items-start justify-start py-0 px-2.5 box-border gap-[16px]">
      <div className="w-auto relative leading-[21px] font-semibold inline-block">
        Opciones
      </div>

      <div className="self-stretch flex-col items-start justify-start gap-[9px] font-medium">
        <div className="flex-col items-start justify-start gap-[11px]">


          <CheckboxEvents title={"Copiar tarifas"}/>
          <CheckboxEvents title={"Repetir evento"}/>





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
      <button onClick={() => { router.push("/events/configure-event") }}
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