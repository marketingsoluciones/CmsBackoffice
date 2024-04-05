import React, { useState } from 'react';
import DatosC from '../DatosC';
import OpcionesC from '../OpcionesC';
import AsistenteC from '../AsistenteC';
import LimiteC from '../LimiteC';

interface propsEntradaTabsC {
  componentState: any;
  setComponentState: any;

}

const EntradaTabsC: React.FC <propsEntradaTabsC> = ({componentState,setComponentState}) => {
  // Estado para controlar la opción seleccionada
  const [selectedTab, setSelectedTab] = useState<string>('Datos');

  // Función para cambiar la opción seleccionada
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <main className="w-full flex flex-col items-center justify-center py-0 px-8 gap-6 box-border shrink-0">
      
      <div className='w-full flex flex-row items-start justify-between rounded-md px-2 py-2'>
      <div className='w-auto flex flex-row items-start justify-between pt-0 px-7 pb-[1.25px] border-b-[1.3px] border-solid border-slate-300'>

      {/* Botones de las opciones */}
      <div className="flex space-x-2">
            <button
              onClick={() => handleTabChange('Datos')}
              className={`tab-button ${selectedTab === 'Datos' ? 'flex flex-col  h-full items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  border-b-[2px] border-solid border-rosa text-rosa font-semibold text-base' : 'flex flex-col  h-[18px] items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  text-gray-400 text-base'}`}
            >
              Datos
            </button>
            <button
                onClick={() => handleTabChange('Opciones')}
                className={`tab-button ${selectedTab === 'Opciones' ? 'flex flex-col  h-full items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  border-b-[2px] border-solid border-rosa text-rosa font-semibold text-base' : 'flex flex-col  h-[18px] items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  text-gray-400 text-base'}`}
             >
          Opciones
            </button>
            <button
                onClick={() => handleTabChange('Asistente')}
                className={`tab-button ${selectedTab === 'Asistente' ? 'flex flex-col  h-full items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  border-b-[2px] border-solid border-rosa text-rosa font-semibold text-base' : 'flex flex-col  h-[18px] items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  text-gray-400 text-base'}`}
             >
          Asistente
            </button>
            <button
                onClick={() => handleTabChange('Limite')}
                className={`tab-button ${selectedTab === 'Limite' ? 'flex flex-col  h-full items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  border-b-[2px] border-solid border-rosa text-rosa font-semibold text-base' : 'flex flex-col  h-[18px] items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  text-gray-400 text-base'}`}
             >
          Limite
            </button>

        </div>

        </div>

      </div>

      {/* Contenedor de contenido */}
      <div className="mt-4 item">
        {selectedTab === 'Datos' && <DatosC componentState={componentState} setComponentState={setComponentState}/>}
        {selectedTab === 'Opciones' && <OpcionesC componentState={componentState} setComponentState={setComponentState}/>}
        {selectedTab === 'Asistente' && <AsistenteC componentState={componentState} setComponentState={setComponentState}/>}
        {selectedTab === 'Limite' && <LimiteC componentState={componentState} setComponentState={setComponentState}/>}
      </div>
    </main>
  );
};

export default EntradaTabsC;