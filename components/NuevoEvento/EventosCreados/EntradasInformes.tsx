import React, { FC } from 'react';
import ProgressIndicator from './CompReutilizable1';
import SalesDashboard from './CompReutilizable2';


interface Props {
    componentState?: any;
    setComponentState?: any;
    selectedOption: any;
    setSelectedOption: any;

}

const EntradasInformes: FC <Props> = ({componentState, setComponentState, setSelectedOption, selectedOption}) => {
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
                src="ModuloEvento/vectorF.svg"
                />

                </div>
                <div className="w-auto h-[31.5px] relative leading-[31.5px] font-semibold inline-block">
                Entradas
                </div>
            </div>
            <div className="w-[100%] flex flex-wrap items-start justify-start font-semibold px-2 gap-4">
            <ProgressIndicator 
            title='Solo entradda'
            value={150}
            maxValue={1000}
            currency='1500$'/>
            <ProgressIndicator 
            title='Entrada + 1 bebida'
            value={150}
            maxValue={1000}
            currency='1500$'/>
            <ProgressIndicator 
            title='Entrada + servicio de whisky'
            value={150}
            maxValue={1000}
            currency='1500$'/>
            <ProgressIndicator 
            title='Entrada + Servicio + 2 shots de tequila'
            value={150}
            maxValue={1000}
            currency='1500$'/>
            </div>
            <div className="w-[100%] flex flex-wrap items-start justify-start font-semibold px-2 gap-4">
            
            <SalesDashboard
            title="Ventas mensuales"
            buttonLabels={["Todos", "Productos", "Servicios"]}
            icon={<svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
              </svg>}
            infoTitle="Ventas más altas en enero"
            infoBody="Las ventas aumentaron un 20% en enero."
            />
            </div>

        </div>

    );
};

export default EntradasInformes;