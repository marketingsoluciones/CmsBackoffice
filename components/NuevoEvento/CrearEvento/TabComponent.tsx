// TabComponent.tsx

import React, { useState } from 'react';
import ComDato1 from './ComDato1';
import ComMusica from './ComMusica';
import ComOtros from './ComOtros';
interface propsTabsComponent {
  componentState: any;
  setComponentState: any;

}

const TabComponent: React.FC <propsTabsComponent> = ({componentState,setComponentState}) => {
  // Estado para controlar la opción seleccionada
  const [selectedTab, setSelectedTab] = useState<string>('Datos');

  // Función para cambiar la opción seleccionada
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <main className="w-auto flex flex-col items-start justify-start py-0 pr-[22px] pl-5 gap-6 box-border shrink-0">
      <div className='flex flex-row items-start justify-start pt-0 px-7 pb-[1.25px] border-b-[1.3px] border-solid border-slate-300 '>
      
      {/* Botones de las opciones */}
      <div className="flex space-x-2">
            <button
              onClick={() => handleTabChange('Datos')}
              className={`tab-button ${selectedTab === 'Datos' ? 'flex flex-col  h-full items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  border-b-[2px] border-solid border-rosa text-rosa font-semibold' : 'flex flex-col  h-[18px] items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  text-gray-400'}`}
            >
              Datos
            </button>
            <button
                onClick={() => handleTabChange('Música')}
                className={`tab-button ${selectedTab === 'Música' ? 'flex flex-col  h-full items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  border-b-[2px] border-solid border-rosa text-rosa font-semibold' : 'flex flex-col  h-[18px] items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  text-gray-400'}`}
             >
          Música
            </button>
          <button
            onClick={() => handleTabChange('Otros')}
            className={`tab-button ${selectedTab === 'Otros' ? 'flex flex-col  h-full items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  border-b-[2px] border-solid border-rosa text-rosa font-semibold' : 'flex flex-col  h-[18px] items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  text-gray-400'}`}
         >
            Otros
          </button>

        </div>

      </div>

      {/* Contenedor de contenido */}
      <div className="mt-4">
        {selectedTab === 'Datos' && <ComDato1 componentState={componentState} setComponentState={setComponentState}/>}
        {selectedTab === 'Música' && <ComMusica componentState={componentState} setComponentState={setComponentState}/>}
        {selectedTab === 'Otros' && <ComOtros componentState={componentState} setComponentState={setComponentState}/>}
      </div>
    </main>
  );
};

export default TabComponent;


