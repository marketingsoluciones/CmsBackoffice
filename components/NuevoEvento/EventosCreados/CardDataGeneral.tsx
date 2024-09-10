import React, { FC } from 'react';

interface Props {
    componentState?: any;
    setComponentState?: any;
    title: any;
    Subtitle1: any;
    NSubtitle1: any;
    Subtitle2: any;
    NSubtitle2: any;
    SubTFecha1: any;
    SubTFechaNumber1: any;
    SubTFechaPorcentaje1: any;
    SubTFecha2: any;
    SubTFechaNumber2: any;
    SubTFechaPorcentaje2: any;

  // ... otros props si es necesario
}

const CardData1: FC <Props> = ({componentState, setComponentState, title, Subtitle1, Subtitle2, NSubtitle1, NSubtitle2,SubTFecha1, SubTFecha2, SubTFechaNumber1, SubTFechaNumber2, SubTFechaPorcentaje1, SubTFechaPorcentaje2}) => {
  return (
            <div className="w-full rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] overflow-hidden flex flex-col items-start justify-start gap-[5px]">
                    
                    <div className="w-full flex flex-col bg-gray-600 bg-opacity-[0.13] items-start justify-start py-[7px] pr-[13.75px] pl-3.5 box-border relative text-lg font-semibold">
                        {title}
                    </div>

                    <div className="w-full flex flex-col items-center justify-between gap-2 py-0 px-[15px] box-border">

                        <div className="self-stretch flex flex-row items-start justify-between text-xs font-semibold">
                            <div className='flex items-start justify-start'>
                            {Subtitle1}
                            </div>

                            <div className="w-auto flex flex-row items-center justify-center box-border gap-[3.19px] text-md text-gray-600">
                          <div className="leading-[14px] text-gray-400">{NSubtitle1}</div>
                          <div className="flex flex-row items-start justify-end">
                            <div className="relative leading-[10.5px] uppercase inline-block ">
                              <img src="ModuloEvento/humano2.svg" alt="" />
                            </div>
                          </div>
                        </div>
                        </div>

                        <div className="self-stretch flex flex-row items-start justify-between  font-medium text-gray-400">
                            <div className='flex items-start justify-start'>
                            {Subtitle2}
                            </div>
                            <div className="rounded-full bg-slate-200 py-[1px] px-[8px] flex flex-row items-center justify-start box-border gap-[3.1px]">
                          <b className="relative leading-[24px] uppercase">{NSubtitle2}</b>
                            <div className="relative leading-[12.25px] uppercase inline-block max-h-[12.25px]">
                              <img src="ModuloEvento/humano1.svg" alt="" />
                            </div>
                          

                        </div>
                        </div>

                    </div>

                    <div className="relative box-border w-full h-px border-t-[1px] border-solid border-slate-200" />
                    <div className="w-full flex flex-col items-start justify-start gap-1 py-[7px] px-3.5 box-border text-sm text-gray-600">
  
                      <div className="w-full flex flex-row items-center justify-between py-0 px-2.5 box-border">
  
                        <div className="flex flex-col items-start justify-start">
                        
                        <div className="self-stretch flex flex-col items-start justify-start font-semibol text-black">
                            {SubTFecha1}
                        </div>
                        
                        </div>
  
                        <div className="flex flex-row items-center justify-center w-auto h-auto ">
                        <div className="w-auto flex flex-row items-start justify-start gap-1">
                            <b className="leading-[14px] text-black">
                            {SubTFechaNumber1}
                            </b>
                            <div className="flex flex-col items-center justify-center leading-[10.5px]">
                              <img src="ModuloEvento/humano1.svg" alt="" />
                            </div>
                        </div>
                        <div className="w-auto flex flex-col items-start justify-start">
                            <div className="self-stretch flex flex-col items-end justify-start py-0 pr-0 pl-[34.366127014160156px]">
                              <div className="relative leading-[14px] inline-block text-black">
                              {SubTFechaPorcentaje1}
                              </div>
                            </div>
                        </div>
                        
                        </div>
  
                      </div>
  
                      <div className="w-full flex flex-row items-center justify-between py-0 px-2.5 box-border text-gray-400">
                        <div className="flex flex-col items-start justify-start ">
                          <div className="self-stretch flex flex-col items-start justify-start">
                            <div className="relative leading-[14px] font-medium">
                            {SubTFecha2}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row items-start justify-start w-auto h-auto text-right">
  
                          <div className="flex flex-row gap-1 items-center justify-center">
  
                            <div className="leading-[14px]">{SubTFechaNumber2}</div>
                            <div className=" leading-[10.5px] inline-block">
                              <img src="ModuloEvento/humano2.svg" alt="" />
                            </div>
  
                          </div>
  
                          <div className="w-auto flex flex-col items-start justify-start">
                            <div className="self-stretch flex flex-col items-end justify-start py-0 pr-0 pl-[34.366127014160156px]">
                              <div className="relative leading-[14px] inline-block max-w-[50px]">
                              {SubTFechaPorcentaje2}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
  
                    </div>
                  </div>
  );
};

export default CardData1;