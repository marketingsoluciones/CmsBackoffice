import React, { useState } from 'react';
import EventosPasados from '../EventosPasados';
import EventosProximos from '../EventosProximos';

interface propsAjustesGeneralesTabs {
  componentState: any;
  setComponentState: any;

}

const AjustesGeneralesTabs: React.FC <propsAjustesGeneralesTabs> = ({componentState,setComponentState}) => {
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
              onClick={() => handleTabChange('Genérica')}
              className={`tab-button ${selectedTab === 'Genérica' ? 'flex flex-col  h-full items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  border-b-[2px] border-solid border-rosa text-rosa font-semibold' : 'flex flex-col  h-[18px] items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  text-gray-400'}`}
            >
              Genérica
            </button>
            <button
                onClick={() => handleTabChange('Reservados')}
                className={`tab-button ${selectedTab === 'Reservados' ? 'flex flex-col  h-full items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  border-b-[2px] border-solid border-rosa text-rosa font-semibold' : 'flex flex-col  h-[18px] items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  text-gray-400'}`}
             >
          Reservados
            </button>


        </div>

      </div>


      {/* Contenedor de contenido */}
      <div className="mt-4">
        {selectedTab === 'Genérica' && <EventosPasados componentState={componentState} setComponentState={setComponentState}/>}
        {selectedTab === 'Reservados' && <EventosProximos componentState={componentState} setComponentState={setComponentState}/>}
   </div>
    </main>
  );
};

export default AjustesGeneralesTabs;