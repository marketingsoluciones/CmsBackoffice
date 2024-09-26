import React, { FC } from 'react';
import CapacityControl from './CompenteConAfo';

interface Props {
    componentState?: any;
    setComponentState?: any;
    selectedOption: any;
    setSelectedOption: any;

}

const ControlAforoComp: FC <Props> = ({componentState, setComponentState, setSelectedOption, selectedOption}) => {
    const DataZone = [
       {
        name:"Zonas Disponibles y para agregar",
        current: 25, 
        max: 35, 
       } 
    ]
    return (
        <div className='h-full flex flex-col items-start justify-start overflow-auto gap-6 px-4 py-4'>
                  <div className="w-full flex flex-row items-center justify-start py-0 pr-5 pl-0 gap-3">
        

        <div onClick={() => {
          setSelectedOption(6)
        }} className="cursor-pointer flex flex-row items-center justify-center pt-[4.5px] px-[3.9px] pb-[5.5px]">
              <img
                className="h-[27px] w-[23px] relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="ModuloEvento/vectorF.svg"
              />
           
      </div>
          <div className="relative leading-[32px] font-semibold inline-block min-w-[76px] mq450:text-2xl mq450:leading-[25px]">
            Control de Aforo
          </div>
    </div>
            
            <CapacityControl title='Noche de divas' totalPeople={25} zones={DataZone}/>
        </div>

    );
};

export default ControlAforoComp;