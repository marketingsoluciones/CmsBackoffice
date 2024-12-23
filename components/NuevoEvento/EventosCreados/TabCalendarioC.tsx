import React, { FC, useState } from 'react';
import EventosProximos from './EventosProximos';
import EventosPasados from './EventosPasados';
import { useRouter } from 'next/router';
import Checkbox from '../CrearEvento/Checkbox1';
import { CheckboxEvents } from '../../Events/CheckBoxEvents';
interface props {
  componentState: any;
  setComponentState: any;

}

const TabCalendarioC: FC <props> = ({componentState, setComponentState}) => {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter()
  // Estado para controlar la opción seleccionada
  const [selectedTab, setSelectedTab] = useState<string>('Próximos eventos');

  // Función para cambiar la opción seleccionada
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };



  const handleButtonClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <main className="w-full flex flex-col items-start justify-start py-0 gap-6 box-border shrink-0">
       {/* Botones de las opciones */}
      <div className='w-full flex md:flex-row flex-col items-center md:justify-between justify-center gap-3    '>
      <div className=" flex flex-row items-center justify-center gap-2">
            

            <div onClick={() => { router.push("/events/create-event") }} className="cursor-pointer bg-rosa rounded-md box-border flex flex-row items-center justify-center py-[9.75px] px-[17px] gap-[10.43px] border-[1px] border-solid border-rosa text-white font-semibold">
                <div className="flex flex-row items-start justify-start">
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3580_5942)">
                  <path d="M8.57516 8.11169V8.68598C8.57516 8.87741 8.47944 8.97312 8.28801 8.97312H6.46944V10.7917C6.46944 10.9831 6.37373 11.0788 6.1823 11.0788H5.60801C5.41658 11.0788 5.32087 10.9831 5.32087 10.7917V8.97312H3.5023C3.31087 8.97312 3.21516 8.87741 3.21516 8.68598V8.11169C3.21516 7.92026 3.31087 7.82455 3.5023 7.82455H5.32087V6.00598C5.32087 5.81455 5.41658 5.71883 5.60801 5.71883H6.1823C6.37373 5.71883 6.46944 5.81455 6.46944 6.00598V7.82455H8.28801C8.47944 7.82455 8.57516 7.92026 8.57516 8.11169ZM11.2552 3.80455V12.2274C11.2552 12.5465 11.1435 12.8176 10.9202 13.041C10.6968 13.2643 10.4256 13.376 10.1066 13.376H1.68373C1.36468 13.376 1.09349 13.2643 0.870156 13.041C0.646823 12.8176 0.535156 12.5465 0.535156 12.2274V3.80455C0.535156 3.4855 0.646823 3.21431 0.870156 2.99098C1.09349 2.76764 1.36468 2.65598 1.68373 2.65598H2.8323V1.41169C2.8323 1.22026 2.92801 1.12455 3.11944 1.12455H4.07658C4.26801 1.12455 4.36373 1.22026 4.36373 1.41169V2.65598H7.42658V1.41169C7.42658 1.22026 7.5223 1.12455 7.71373 1.12455H8.67087C8.8623 1.12455 8.95801 1.22026 8.95801 1.41169V2.65598H10.1066C10.4256 2.65598 10.6968 2.76764 10.9202 2.99098C11.1435 3.21431 11.2552 3.4855 11.2552 3.80455ZM10.1066 12.0838V4.95312H1.68373V12.0838C1.68373 12.1795 1.73158 12.2274 1.8273 12.2274H9.96301C10.0587 12.2274 10.1066 12.1795 10.1066 12.0838Z" fill="#F8FAFC"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_3580_5942">
                  <rect width="10.72" height="13" fill="white" transform="matrix(1 0 0 -1 0.535156 13.75)"/>
                  </clipPath>
                  </defs>
                  </svg>
                </div>
                <div className="flex flex-col items-center justify-center">
                  
                    Crear evento
                  
                </div>
            </div>

            <div className="flex flex-row items-center justify-center rounded-md box-border py-2 px-[17px] gap-[5px] border-[1px] border-solid border-slate-300">
            <CheckboxEvents title={"Ver Ventas"} />
            </div>



          </div>
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