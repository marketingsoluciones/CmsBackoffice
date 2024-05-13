
import { FC } from "react";
import Comp3 from "./ComponentesAjustes/Comp3";
import Comp2 from "./ComponentesAjustes/Comp2";
import Checkbox from "../../CrearEvento/Checkbox1";
import Comp4 from "./ComponentesAjustes/Comp4";
interface propsReservadosComp {
  componentState: any;
  setComponentState: any;

}

const ReservadosComp: FC<propsReservadosComp> = ({componentState, setComponentState}) => {
    const items=[
        {option:"Priorizar email"}
        ,{option:"Enviar SMS"}
        ,{option:"No reconfirmar"}
      ]
      const items2=[
        {option:"1 día(s) antes"}
        ,{option:"2 día(s) antes"}
        ,{option:"3 día(s) antes"}
        ,{option:"4 día(s) antes"}
        ,{option:"El mismo día"}
      ]
  return (

        <div className="w-auto rounded-md bg-white flex flex-col items-start justify-start pt-[27px] px-5 pb-5 box-border gap-5 tracking-[normal] leading-[normal] text-left text-sm text-black font-medium">
        
<Comp3 items={items} title={"Priorizar email"} subtitle1={"Reconfirmar reservas"} subtitle2={"No reconfirmar reservas, reconfirmar reservas siempre por sms ó reconfirmar por email en el caso de haber email y número de teléfono"}/>
<Comp3 items={items2} title={"1 día(s) antes"} subtitle1={"Cuándo reconfirmar reservas"} subtitle2={"Momento en el que se reconfirmarán las reservas"}/>

<Comp2 title={"Notificar al cambiar de estado"} subtitle={"Al cambiar una reserva de estado se notificará al cliente"}/>
<Comp2 title={"Espacios aleatorios"} subtitle={"Se utilizará el algoritmo de espacios aleatorios para la asignación de estos."}/>
<Comp2 title={"RRPP pueden ver espacios"} subtitle={"Si está activo los RRPP podrán ver los espacios de las reservas aunque no puedan seleccionarlos"}/>



        <div className="self-stretch rounded-md bg-slate-100 flex flex-col items-start justify-start p-3.5 box-border max-w-full text-left text-sm text-gray-600 font-semibold">
            <div className="self-stretch flex flex-row items-center justify-start">
              <div className="flex flex-col items-start justify-start">
                <div className="relative leading-[21px] font-semibold">
                  Cálculo automático del precio de la reserva
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start pt-[7px] px-0 pb-0 box-border max-w-full text-smi-3 text-profourvenuescom-gull-gray">
              <div className="self-stretch flex flex-row items-center justify-start py-0 pr-2.5 pl-0 box-border max-w-full">
                <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[16.8px] pl-0 box-border max-w-full">
                  <div className="relative leading-[17.5px] text-gray-400 font-medium text-xs">
                    <p className="m-0">
                      Indica cómo quieres que se calcule el precio de las reservas
                      cuando se añaden más personas extras de las que permite la tarifa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start pt-[7px] px-0 pb-0 box-border max-w-full">
              <div className="self-stretch rounded-md bg-slate-200 flex flex-row flex-wrap items-center justify-start py-[7px] px-3.5 box-border gap-[14px] max-w-full">
                <div className="h-[21px] flex-1 flex flex-col items-start justify-start min-w-[238px] max-w-full">
                  <div className="w-[366px] h-[21px] relative leading-[21px] flex items-center">
                    Por reserva
                  </div>
                </div>
                <Checkbox/>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start pt-[7px] px-0 pb-0 box-border max-w-full text-smi-3 text-profourvenuescom-gull-gray">
              <div className="self-stretch flex flex-row items-center justify-start py-0 pr-[10.6px] pl-0 box-border max-w-full">
                <div className="flex-1 flex flex-col items-start justify-start py-0 pr-px pl-0 box-border max-w-full">
                  <div className="relative leading-[17.5px] text-gray-400 font-medium text-xs">
                    <p className="m-0">
                      Escoge por reserva si quieres que el número de personas extra
                      sean fijas independientemente de cuántas tarifas se estén aplicando en una reserva.
                      </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start pt-[7px] px-0 pb-0 box-border max-w-full">
              <div className="self-stretch rounded-md bg-slate-200 flex flex-row flex-wrap items-center justify-start py-[7px] px-3.5 box-border gap-[14px] max-w-full">
                <div className="h-[21px] flex-1 flex flex-col items-start justify-start min-w-[238px] max-w-full">
                  <div className="self-stretch relative leading-[21px]">
                    Por tarifa
                  </div>
                </div>
                <Checkbox/>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start pt-[7px] px-0 pb-0 box-border max-w-full text-smi-3 text-profourvenuescom-gull-gray">
              <div className="self-stretch flex flex-row items-center justify-start py-0 pr-[10.6px] pl-0 box-border max-w-full">
                <div className="flex-1 flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border max-w-full">
                  <div className="relative leading-[17.5px] inline-block max-w-full text-gray-400 font-medium text-xs">
                    <p className="m-0">
                      Escoge por tarifa si quieres que el número de personas extra
                      se acumule con cada tarifa sumada a la reserva.
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </div>


<Comp4 title={"Días profesionales"} subtitle={"Número de días previos en los cuales los profesionales pueden enviar reservas"}/>
<Comp4 title={"Días clientes"} subtitle={"Número de días previos en los cuales los clientes pueden reservar"}/>


        <div className="self-stretch flex flex-row items-start justify-center">
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[84.9px] flex flex-row items-start justify-center">
              <div className="flex-1 flex flex-col items-start justify-start">
                <div className="w-full rounded-md bg-rosa box-border flex flex-row items-center justify-center py-2 px-[17px] max-w-[84.94999694824219px] border-[1px] border-solid border-rosa">
                  <div className="flex flex-col items-center justify-start">
                    <div className="relative text-smi-3 leading-[18px] font-semibold text-white text-center inline-block min-w-[49px]">
                      Guardar
                    </div>
                  </div>
                </div>
              </div>
            </button>
        </div>

        </div>
    
  );
};

export default ReservadosComp;