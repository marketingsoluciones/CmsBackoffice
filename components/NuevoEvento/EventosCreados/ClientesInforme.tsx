import React, { FC } from 'react';
import SalesDashboard from './CompReutilizable2';


interface Props {
    componentState?: any;
    setComponentState?: any;
    selectedOption: any;
    setSelectedOption: any;

}

const ClientesInforme: FC <Props> = ({componentState, setComponentState, setSelectedOption, selectedOption}) => {
    
    const chartData = [
        { label: 'Menores con permiso', value: 3, color: 'pink' },
        { label: 'Mujeres +18', value: 4, color: 'gray' },
        { label: 'No Binario +25', value: 4, color: 'pink' },
        { label: 'Lesbianas +32', value: 4, color: 'gray' },
    
        // ... otros datos
      ];
      
    return (
        <div className='h-[100vh] flex flex-col items-start justify-start overflow-auto gap-6 px-4 py-4'>
            <div className="flex flex-row items-center justify-start box-border gap-4 ">

            <div onClick={() => {
                setSelectedOption(12)
            }}
                className=" cursor-pointer flex flex-col items-start justify-start ">
                <img
                className="h-4 w-4 relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/ModuloEvento/vectorF.svg"
                />

                </div>
                <div className="w-auto h-[31.5px] relative leading-[31.5px] font-semibold inline-block">
                Informe de clientes
                </div>
            </div>
            <div className="w-[100%] flex flex-wrap items-start justify-start font-semibold px-2 gap-4">
            
            <SalesDashboard
            title="Genero / Edad"
            buttonLabels={["Todos", "Listas", "Entradas", "Reservas"]}
            icon={<svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
              </svg>}
            infoTitle="Sin informacion"
            infoBody="No tiene informacion que mostrar, por favor llene datos del evento para poder mostrar metricas reales"
            chartData={chartData}
            />
            </div>

        </div>

    );
};

export default ClientesInforme;