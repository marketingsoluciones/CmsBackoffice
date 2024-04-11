import React, { useState } from 'react';
import EventosProximos from './EventosProximos';
import EventosPasados from './EventosPasados';
interface propsTabCalendarioC {
  componentState: any;
  setComponentState: any;

}

const TabCalendarioC: React.FC <propsTabCalendarioC> = ({componentState,setComponentState}) => {
  // Estado para controlar la opción seleccionada
  const [selectedTab, setSelectedTab] = useState<string>('Próximos eventos');

  // Función para cambiar la opción seleccionada
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <main className="w-full flex flex-col items-start justify-start py-0 pr-[22px] pl-5 gap-6 box-border shrink-0">
      <div className='w-full flex flex-row items-start justify-between pt-0 px-7 pb-[1.25px]  '>
      
      {/* Botones de las opciones */}
      <div className="flex space-x-2 border-b-[1.3px] border-solid border-slate-300">
            <button
              onClick={() => handleTabChange('Eventos Pasados')}
              className={`tab-button ${selectedTab === 'Eventos Pasados' ? 'flex flex-col  h-full items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  border-b-[2px] border-solid border-rosa text-rosa font-semibold' : 'flex flex-col  h-[18px] items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  text-gray-400'}`}
            >
              Eventos Pasados
            </button>
            <button
                onClick={() => handleTabChange('Próximos eventos')}
                className={`tab-button ${selectedTab === 'Próximos eventos' ? 'flex flex-col  h-full items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  border-b-[2px] border-solid border-rosa text-rosa font-semibold' : 'flex flex-col  h-[18px] items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  text-gray-400'}`}
             >
          Próximos eventos
            </button>


        </div>

        <div className=" flex flex-row items-start justify-start py-0 pr-px pl-0 gap-[6.99px] text-rosa font-pro-fourvenues-com-beach-aguilas-calendar-1318x573-default-2-font-awesome-5-free-regular-105">
            <div className="flex flex-col items-start justify-start">
              <div className="rounded-md box-border flex flex-row items-center justify-center py-[9.75px] px-[17px] gap-[8.77px] border-[1px] border-solid border-slate-200">
                <div className="flex flex-col items-center justify-start pt-0.5 px-0 pb-[2.5px]">
                  <div className="w-[13px] h-[13px] relative leading-[12.25px] inline-block">
                <img className="h-auto w-auto relative overflow-hidden shrink-0"
                 src="ModuloEvento/checkIcon1.svg" 
                 alt=""/>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start text-black font-bold">
                  <div className="w-auto h-auto relative leading-[17.5px] font-semibold inline-block">
                    Ver tus ventas
                  </div>
                </div>
              </div>
            </div>
            <div onClick={()=>{ 
        setComponentState(2)
      }} 
            className="cursor-pointer flex flex-col items-start justify-start text-white font-semibold">
              <div className="rounded-md bg-rosa box-border flex flex-row items-center justify-center py-[9.75px] px-[17px] gap-[10.43px] border-[1px] border-solid border-rosa">
                <div className="flex flex-col items-center justify-start pt-0.5 px-0 pb-[2.5px]">
                  <div className="flex flex-row items-start justify-start">
                    <img
                      className="h-[13px] w-[10.7px] relative overflow-hidden shrink-0"
                      alt=""
                      src="ModuloEvento/icon-42.svg"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start">
                  <div className="w-auto h-auto relative leading-[17.5px] inline-block">
                    Crear evento
                  </div>
                </div>
              </div>
            </div>
          </div>

      </div>


      {/* Contenedor de contenido */}
      <div className="mt-4">
        {selectedTab === 'Eventos Pasados' && <EventosPasados componentState={componentState} setComponentState={setComponentState}/>}
        {selectedTab === 'Próximos eventos' && <EventosProximos componentState={componentState} setComponentState={setComponentState}/>}
   </div>
    </main>
  );
};

export default TabCalendarioC;