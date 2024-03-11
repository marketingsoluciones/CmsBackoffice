import { FC, memo } from "react";
interface propsComponent3CE {
  componentState: any;
  setComponentState: any;

}


const Component3CE: FC <propsComponent3CE> = memo(({componentState,setComponentState}) => {
  return (
    <div className="self-stretch flex flex-row items-center justify-center py-0 px-1 box-border max-w-full text-left text-sm">
      <div className="w-auto flex flex-row flex-wrap items-start justify-center py-0 px-5 box-border gap-[5.7px]">

      <div 
        onClick={()=>{ 
          setComponentState(4)
      }} 
      className="cursor-pointer w-auto rounded-md bg-white shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_rgba(0,_0,_0,_0.06)] overflow-hidden shrink-0 flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] mq450:flex-wrap">
            <div className="bg-blue-600 flex flex-col items-start justify-start pt-0 px-0 pb-[17.460002899169922px]">
              <div className="flex flex-col items-center justify-start pt-[11.739999771118164px] pb-[12.989999771118164px] pr-[8.039999008178711px] pl-[10.489999771118164px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-[31.3px] w-[35.5px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/datos.svg"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start pt-[9.739999771118164px] px-[10.5px] pb-[24.460002899169922px] box-border gap-[0.74px] min-w-[189px]">
              <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[3.5px]">
                <div className="w-auto h-[21px] relative leading-[21px] font-semibold inline-block">
                Datos del evento
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start text-xs text-gray-600">
                <div className="w-[250px] h-3.5 relative leading-[14px] inline-block">
                Cambia el nombre, fecha, flyer,
artistas, música o especifica los términos.                
                </div>
              </div>
            </div>
          </div>
        </div>

      <div onClick={()=>{ 
          setComponentState(5)
      }}  
      className="cursor-pointer w-auto rounded-md bg-white shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_rgba(0,_0,_0,_0.06)] overflow-hidden shrink-0 flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] mq450:flex-wrap">
            <div className="bg-orange-600 flex flex-col items-start justify-start pt-0 px-0 pb-[17.460002899169922px]">
              <div className="flex flex-col items-center justify-start pt-[11.739999771118164px] pb-[12.989999771118164px] pr-[8.039999008178711px] pl-[10.489999771118164px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-[31.3px] w-[35.5px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/asistencia.svg"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start pt-[9.739999771118164px] px-[10.5px] pb-[24.460002899169922px] box-border gap-[0.74px] min-w-[189px]">
              <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[3.5px]">
                <div className="w-auto h-[21px] relative leading-[21px] font-semibold inline-block">
                Asistencia usuarios
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start text-xs text-gray-600">
                <div className="w-[250px] h-3.5 relative leading-[14px] inline-block">
                Asigna a cada usuario el número de copas, chupitos o 
consumiciones.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div onClick={()=>{ 
        setComponentState(6)
      }}
        className="cursor-pointer w-auto rounded-md bg-white shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_rgba(0,_0,_0,_0.06)] overflow-hidden shrink-0 flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] mq450:flex-wrap">
            <div className="bg-orange-600 flex flex-col items-start justify-start pt-0 px-0 pb-[17.460002899169922px]">
              <div className="flex flex-col items-center justify-start pt-[11.739999771118164px] pb-[12.989999771118164px] pr-[8.039999008178711px] pl-[10.489999771118164px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-[31.3px] w-[35.5px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/permisos.svg"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start pt-[9.739999771118164px] px-[10.5px] pb-[24.460002899169922px] box-border gap-[0.74px] min-w-[189px]">
              <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[3.5px]">
                <div className="w-auto h-[21px] relative leading-[21px] font-semibold inline-block">
                Permisos del evento
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start text-xs text-gray-600">
                <div className="w-[250px] h-3.5 relative leading-[14px] inline-block">
                Otorga a trabajadores permisos que solo afectan a
este evento.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cursor-pointer w-auto rounded-md bg-white shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_rgba(0,_0,_0,_0.06)] overflow-hidden shrink-0 flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] mq450:flex-wrap">
            <div className="bg-orange-600 flex flex-col items-start justify-start pt-0 px-0 pb-[17.460002899169922px]">
              <div className="flex flex-col items-center justify-start pt-[11.739999771118164px] pb-[12.989999771118164px] pr-[8.039999008178711px] pl-[10.489999771118164px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-[31.3px] w-[35.5px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/canales.svg"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start pt-[9.739999771118164px] px-[10.5px] pb-[24.460002899169922px] box-border gap-[0.74px] min-w-[189px]">
              <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[3.5px]">
                <div className="w-auto h-[21px] relative leading-[21px] font-semibold inline-block">
                Canales de venta
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start text-xs text-gray-600">
                <div className="w-[250px] h-3.5 relative leading-[14px] inline-block">
                Activa o desactiva los canales de venta que podrán
ver este evento
                </div>
              </div>
            </div>
          </div>
        </div>

      <div className="cursor-pointer w-auto rounded-md bg-white shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_rgba(0,_0,_0,_0.06)] overflow-hidden shrink-0 flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] mq450:flex-wrap">
            <div className="bg-pink-600 flex flex-col items-start justify-start pt-0 px-0 pb-[17.460002899169922px]">
              <div className="flex flex-col items-center justify-start pt-[11.739999771118164px] pb-[12.989999771118164px] pr-[8.039999008178711px] pl-[10.489999771118164px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-[31.3px] w-[35.5px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/codigos.svg"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start pt-[9.739999771118164px] px-[10.5px] pb-[24.460002899169922px] box-border gap-[0.74px] min-w-[189px]">
              <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[3.5px]">
                <div className="w-auto h-[21px] relative leading-[21px] font-semibold inline-block">
                Códigos de descuento
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start text-xs text-gray-600">
                <div className="w-[250px] h-3.5 relative leading-[14px] inline-block">
                Configura los códigos de descuento y aplicalos a
tantas tarifas como quieras
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cursor-pointer w-auto rounded-md bg-white shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_rgba(0,_0,_0,_0.06)] overflow-hidden shrink-0 flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] mq450:flex-wrap">
            <div className="bg-pink-600 flex flex-col items-start justify-start pt-0 px-0 pb-[17.460002899169922px]">
              <div className="flex flex-col items-center justify-start pt-[11.739999771118164px] pb-[12.989999771118164px] pr-[8.039999008178711px] pl-[10.489999771118164px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-[31.3px] w-[35.5px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/icon-13.svg"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start pt-[9.739999771118164px] px-[10.5px] pb-[24.460002899169922px] box-border gap-[0.74px] min-w-[189px]">
              <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[3.5px]">
                <div className="w-auto h-[21px] relative leading-[21px] font-semibold inline-block">
                  Evento carta QR
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start text-xs text-gray-600">
                <div className="w-[250px] h-3.5 relative leading-[14px] inline-block">
                  Configura la carta QR para este evento
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
});

export default Component3CE;