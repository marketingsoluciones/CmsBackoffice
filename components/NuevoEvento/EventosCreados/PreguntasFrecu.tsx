import React, { FC } from 'react';


interface Props {
    componentState?: any;
    setComponentState?: any;
    selectedOption: any;
    setSelectedOption: any;

}

const PreguntasFrecu: FC <Props> = ({componentState, setComponentState, setSelectedOption, selectedOption}) => {
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
    Preguntas Fracuentes
    </div>
            </div>
<div className='w-full h-full flex flex-col items-center justify-center'>

<div className='w-[150px] h-[150px] rounded-full bg-gray-200 flex items-center justify-center text-gray-500'>
            <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"></path>
</svg>
            </div>
            <div className='flex items-start justify-normal text-base text-gray-600 font-semibold'>
            No hay informes que mostrar
        </div>
        <div className='flex items-start justify-normal text-base text-gray-400 font-medium'>
        Es necesario configurar preguntas en alguna de las tarifas de entradas y que haya alguna entrada vendida para ver el contenido de esta sección
        </div>
</div>

        </div>

    );
};

export default PreguntasFrecu;