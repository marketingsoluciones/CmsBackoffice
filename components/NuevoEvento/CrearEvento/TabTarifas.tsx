// TabComponent.tsx

import React, { useState } from 'react';
import TarifasDatosC from './DatosTarifasC';
import TarifasLimites from './TarifasLimitesC';

interface propsTabsTarifas {
  componentState: any;
  setComponentState: any;

}

const TabTarifas: React.FC <propsTabsTarifas> = ({componentState,setComponentState}) => {
  // Estado para controlar la opción seleccionada
  const [selectedTab, setSelectedTab] = useState<string>('Datos');

  // Función para cambiar la opción seleccionada
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <main className="w-full flex flex-col items-center justify-center py-0 pr-[22px] pl-5 gap-6 box-border shrink-0">
      
      <div className='w-full flex flex-row items-start justify-between pt-0 px-7 pb-[1.25px]'>
      <div className='w-auto flex flex-row items-start justify-between pt-0 px-7 pb-[1.25px] border-b-[1.3px] border-solid border-slate-300 '>

      {/* Botones de las opciones */}
      <div className="flex space-x-2">
            <button
              onClick={() => handleTabChange('Datos')}
              className={`tab-button ${selectedTab === 'Datos' ? 'flex flex-col  h-full items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  border-b-[2px] border-solid border-rosa text-rosa font-semibold' : 'flex flex-col  h-[18px] items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  text-gray-400'}`}
            >
              Datos
            </button>
            <button
                onClick={() => handleTabChange('Limite')}
                className={`tab-button ${selectedTab === 'Limite' ? 'flex flex-col  h-full items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  border-b-[2px] border-solid border-rosa text-rosa font-semibold' : 'flex flex-col  h-[18px] items-center justify-start pt-[6.239999771118164px] pb-[11.989999771118164px] pr-5 pl-[20.771968841552734px]  text-gray-400'}`}
             >
          Limite
            </button>

        </div>

        </div>

        <div className="w-auto flex flex-row items-start justify-start gap-[5px] max-w-full mq450:flex-wrap">
              
              <div className="rounded-md flex flex-row items-start justify-start py-0 pr-[10.299999999999272px] pl-[10.400000000001455px] box-border border-solid border-[1px] border-slate-300 gap-[6.8px] min-w-[73px] mq450:flex-1">
                <div className="w-auto flex flex-col items-start justify-start pt-2.5 px-0 pb-0 box-border">
                  <div className="self-stretch h-3.5 relative leading-[14px] inline-block min-w-[14px]">
                    <img src="ModuloEvento/checksito.svg" alt="" />
                  </div>
                </div>
                <div className="h-9 leading-[36px] font-medium text-black inline-block min-w-[71px]">
                  Disponible
                </div>
              </div>
              <div className="rounded-md flex flex-row items-start justify-start py-0 pr-[10.299999999999272px] pl-[10.400000000001455px] box-border border-solid border-[1px] border-slate-300 gap-[6.8px] min-w-[73px] mq450:flex-1">
                <div className="w-auto flex flex-col items-start justify-start pt-2.5 px-0 pb-0 box-border">
                  <div className="self-stretch h-3.5 relative leading-[14px] inline-block min-w-[14px]">
                    <img src="ModuloEvento/ojo.svg" alt="" />
                  </div>
                </div>
                <div className="h-9 leading-[36px] font-medium text-black inline-block min-w-[71px]">
                  Visible
                </div>
              </div>


              <div className="flex flex-row items-start justify-start gap-[8px] text-center text-white ">
                <div className="rounded-md bg-rosa flex flex-row items-start justify-start py-0 px-2.5">
                  <div className="h-9 w-auto relative leading-[36px] font-medium inline-block ">
                    Guardar
                  </div>
                </div>

                    <div className="rounded-md bg-slate-200 flex flex-row items-start justify-end pt-2.5 px-[10.5px] pb-[11.600000000000364px]">
                      <div className="h-[14.4px] flex flex-row items-start justify-start">
                        <img
                          className="h-[14.4px] w-3.5 relative overflow-hidden shrink-0"
                          alt=""
                          src="ModuloEvento/trespuntos.svg"
                        />
                  </div>
                </div>
              </div>

            </div>

      </div>

      {/* Contenedor de contenido */}
      <div className="mt-4 item">
        {selectedTab === 'Datos' && <TarifasDatosC componentState={componentState} setComponentState={setComponentState}/>}
        {selectedTab === 'Limite' && <TarifasLimites componentState={componentState} setComponentState={setComponentState}/>}
      </div>
    </main>
  );
};

export default TabTarifas;