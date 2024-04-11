// TabComponent.tsx

import React, { FC, useState } from 'react';
import CalendarioTabs from './Canlendariotabs';
import InformesTabs from './InformesTabs';
import AjustesTabs from './AjustesTabs';

interface propsTabsGeneral {
  componentState: any;
  setComponentState: any;

}

const TabGeneral: FC <propsTabsGeneral> = ({componentState,setComponentState}) => {
  // Estado para controlar la opción seleccionada
  const [selectedTab, setSelectedTab] = useState<string>('Calendario');

  // Función para cambiar la opción seleccionada
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="w-full flex flex-col items-start justify-start py-0 pr-[22px] pl-5 gap-6 box-border shrink-0">

      
      {/* Botones de las opciones */}
      <div className="flex space-x-2">
            <button
                onClick={() => handleTabChange('Calendario')}
                className={`tab-button ${selectedTab === 'Calendario' ? 'flex flex-row gap-2 rounded-full h-full items-center justify-center py-[10px] px-[10px]  border-b-[2px] border-solid text-black text-sm bg-pink-200 font-semibold' : 'flex flex-row gap-2 rounded-full h-full items-center justify-center text-sm py-[10px] px-[10px] bg-white text-gray-600 hover:bg-slate-200'}`}
             >
                 <div className={`tab-button ${selectedTab === 'Calendario' ? 'w-7 h-7 rounded-full bg-rosa flex flex-row items-center justify-center py-[7px] pr-[7.869999885559082px] pl-[7.880000114440918px] box-border' : 'w-7 h-7 rounded-full bg-gray-600  flex flex-row items-center justify-center py-[7px] pr-[7.869999885559082px] pl-[7.880000114440918px] box-border hover:bg-gray-400'}`} >
                      <img
                        className="h-3.5 w-[12.3px] relative overflow-hidden shrink-0"
                        alt=""
                        src="ModuloEvento/icon-15.svg"
                      />
                </div>
                Calendario
            </button>

            <button
                onClick={() => handleTabChange('Informes')}
                className={`tab-button ${selectedTab === 'Informes' ? 'flex flex-row gap-2 rounded-full h-full items-center justify-center text-sm py-[10px] px-[10px]  border-b-[2px] border-solid text-black bg-pink-200 font-semibold' : 'flex flex-row gap-2 rounded-full h-full items-center justify-center text-sm py-[10px] px-[10px] bg-white text-gray-600 hover:bg-slate-200'}`}
             >
                 <div className={`tab-button ${selectedTab === 'Informes' ? 'w-7 h-7 rounded-full bg-rosa flex flex-row items-center justify-center py-[7px] pr-[7.869999885559082px] pl-[7.880000114440918px] box-border' : 'w-7 h-7 rounded-full bg-gray-600 flex flex-row items-center justify-center py-[7px] pr-[7.869999885559082px] pl-[7.880000114440918px] box-border'}`} >
                      <img
                        className="h-3.5 w-[12.3px] relative overflow-hidden shrink-0"
                        alt=""
                        src="ModuloEvento/icon-22.svg"
                      />
                </div>
                Informes
            </button>

            <button
                onClick={() => handleTabChange('Ajustes')}
                className={`tab-button ${selectedTab === 'Ajustes' ? 'flex flex-row gap-2 rounded-full h-full items-center justify-center text-sm py-[10px] px-[10px]  border-b-[2px] border-solid text-black bg-pink-200 font-semibold' : 'flex flex-row gap-2 rounded-full h-full items-center justify-center text-sm py-[10px] px-[10px] bg-white text-gray-600 hover:bg-slate-200'}`}
             >
                 <div className={`tab-button ${selectedTab === 'Ajustes' ? 'w-7 h-7 rounded-full bg-rosa flex flex-row items-center justify-center py-[7px] pr-[7.869999885559082px] pl-[7.880000114440918px] box-border' : 'w-7 h-7 rounded-full bg-gray-600 flex flex-row items-center justify-center py-[7px] pr-[7.869999885559082px] pl-[7.880000114440918px] box-border'}`} >
                      <img
                        className="h-3.5 w-[12.3px] relative overflow-hidden shrink-0"
                        alt=""
                        src="ModuloEvento/icon123.svg"
                      />
                </div>
                Ajustes
            </button>
        </div>

      {/* Contenedor de contenido */}
      <div className="w-[100%] h-[100%] mt-4">
        {selectedTab === 'Calendario' && <CalendarioTabs componentState={componentState} setComponentState={setComponentState}/>}
        {selectedTab === 'Informes' && <InformesTabs componentState={componentState} setComponentState={setComponentState}/>}
        {selectedTab === 'Ajustes' && <AjustesTabs componentState={componentState} setComponentState={setComponentState}/>}
      </div>
    </div>
  );
};

export default TabGeneral;