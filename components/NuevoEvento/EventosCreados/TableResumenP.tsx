import React, { FC } from 'react';

interface Props {
    componentState?: any;
    setComponentState?: any;
    title: any;
    subtitle: any;
    n1: any;
    n2: any;
    n3: any;
    n4: any;
    n5: any;
    n6: any;
    n7: any;
    n8: any;
    n9: any;
    subtitle2: any;
    p1: any;
    p2: any;
    p3: any;
    p4: any;
    p5: any;
    p6: any;
    p7: any;
    p8: any;
    p9: any;
    subtitle3: any;
    r1: any;
    r2: any;
    r3: any;
    r4: any;
    r5: any;
    r6: any;
    r7: any;
    r8: any;
    r9: any;
    subtitle4: any;
    j1: any;
    j2: any;
    j3: any;
    j4: any;
    j5: any;
    j6: any;
    j7: any;
    j8: any;
    j9: any;
}

const TableResumenP: FC <Props> = ({
    componentState, setComponentState, title, subtitle, subtitle2, subtitle3, subtitle4,
    n1, n2, n3, n4, n5, n6, n7, n8, n9,
    p1, p2, p3, p4, p5, p6, p7, p8, p9,
    r1, r2, r3, r4, r5, r6, r7, r8, r9,
    j1, j2, j3, j4, j5, j6, j7, j8, j9,

}) => {
    return (

            <div className='md:w-[90%] w-full flex flex-col items-start justify-start font-semibold px-2'>            
            <div className='flex font-semibold px-2'>
                {title}
            </div>
            <div className='w-full flex flex-col rounded-md bg-white overflow-hidden items-center justify-center divide-y'>
                <div className='self-stretch flex flex-row items-start justify-between bg-gray-200 py-2 md:text-xs text-[8px] font-semibold text-black px-2 '>
                    
                    <div className='flex items-center justify-center'>
                    Nombre
                    </div>

                    <div className='flex felx-row items-center justify-center md:gap-4 gap-1'>
                    <div className='flex items-center justify-center'>
                    Offiline
                    </div>
                    <div className='flex items-center justify-center'>
                    Online
                    </div>
                    <div className='flex items-center justify-center'>
                    Total
                    </div>
                    <div className='flex items-center justify-center'>
                    Mujeres
                    </div>
                    <div className='flex items-center justify-center'>
                    Hombres
                    </div>
                    <div className='flex items-center justify-center'>
                    Sin genero
                    </div>
                    <div className='flex items-center justify-center'>
                    Edad
                    </div>
                    <div className='flex items-center justify-center'>
                    Calidad
                    </div>
                    </div>
                </div>
                <div className='self-stretch flex flex-row items-center justify-between bg-white py-2 md:text-xs text-[8px] font-normal text-black px-2 '>
                    
                    <div className='flex items-center justify-center'>
                    {subtitle}
                    </div>

                    <div className='flex felx-row items-center justify-center m:gap-4 gap-1'>
                    
                    <div className='md:w-[45px] w-[28px] flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center'>
                    {n1}
                    </div>
                    <div className='flex items-center justify-center text-[8px] text-green-500'>
                    {n2}
                    </div>
                    </div>
                    <div className='md:w-[45px] w-[28px] flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center'>
                    {n3}
                    </div>
                    <div className='flex items-center justify-center text-[8px] text-green-500'>
                    {n4}
                    </div>
                    </div>
                    <div className='md:w-[45px] w-[28px] flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center'>
                    {n5}
                    </div>
                    <div className='flex items-center justify-center text-[8px] text-green-500'>
                    {n6}
                    </div>
                    </div>

                    <div className='md:w-[45px] w-[28px] flex items-center justify-center text-pink-500'>
                    {n7}
                    </div>
                    <div className='md:w-[45px] w-[28px] flex items-center justify-center text-blue-500'>
                    {n8}
                    </div>
                    <div className='md:w-[45px] w-[28px] flex items-center justify-center'>
                    {n9}
                    </div>
                    <div className='md:w-[45px] w-[28px] flex items-center justify-center'>
                    -
                    </div>
                    <div className='w-[45px] flex items-center justify-center text-yellow-500'>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    </div>
                    </div>
                </div>
                <div className='self-stretch flex flex-row items-center justify-between bg-white py-2 md:text-xs text-[8px] font-normal text-black px-2 '>
                    
                    <div className='flex items-center justify-center'>
                    {subtitle2}
                    </div>

                    <div className='flex felx-row items-center justify-center md:gap-4 gap-1'>
                    
                    <div className='md:w-[45px] w-[28px] flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center'>
                    {p1}
                    </div>
                    <div className='flex items-center justify-center text-[8px] text-green-500'>
                    {p2}
                    </div>
                    </div>
                    <div className='md:w-[45px] w-[28px] flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center'>
                    {p3}
                    </div>
                    <div className='flex items-center justify-center text-[8px] text-green-500'>
                    {p4}
                    </div>
                    </div>
                    <div className='md:w-[45px] w-[28px] flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center'>
                    {p5}
                    </div>
                    <div className='flex items-center justify-center text-[8px] text-green-500'>
                    {p6}
                    </div>
                    </div>

                    <div className='md:w-[45px] w-[28px] flex items-center justify-center text-pink-500'>
                    {p7}
                    </div>
                    <div className='md:w-[45px] w-[28px] flex items-center justify-center text-blue-500'>
                    {p8}
                    </div>
                    <div className='md:w-[45px] w-[28px] flex items-center justify-center'>
                    {p9}
                    </div>
                    <div className='md:w-[45px] w-[28px] flex items-center justify-center'>
                    -
                    </div>
                    <div className='md:w-[45px] w-[28px] flex items-center justify-center text-yellow-500'>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    </div>
                    </div>

                </div>
                <div className='self-stretch flex flex-row items-center justify-between bg-white py-2 md:text-xs text-[8px] font-normal text-black px-2 '>
                    
                    <div className='flex items-center justify-center'>
                    {subtitle3}
                    </div>

                    <div className='flex felx-row items-center justify-center md:gap-4 gap-1'>
                    
                    <div className='md:w-[45px] w-[28px] flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center'>
                    {r1}
                    </div>
                    <div className='flex items-center justify-center text-[8px] text-green-500'>
                    {r2}
                    </div>
                    </div>
                    <div className='md:w-[45px] w-[28px] flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center'>
                    {r3}
                    </div>
                    <div className='flex items-center justify-center text-[8px] text-green-500'>
                    {r4}
                    </div>
                    </div>
                    <div className='md:w-[45px] w-[28px] flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center'>
                    {r5}
                    </div>
                    <div className='flex items-center justify-center text-[8px] text-green-500'>
                    {r6}
                    </div>
                    </div>

                    <div className='md:w-[45px] w-[28px] flex items-center justify-center text-pink-500'>
                    {r7}
                    </div>
                    <div className='md:w-[45px] w-[28px] flex items-center justify-center text-blue-500'>
                    {r8}
                    </div>
                    <div className='md:w-[45px] w-[28px] flex items-center justify-center'>
                    {r9}
                    </div>
                    <div className='md:w-[45px] w-[28px] flex items-center justify-center'>
                    -
                    </div>
                    <div className='w-[45px] flex items-center justify-center text-yellow-500'>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    </div>
                    </div>
                </div>
                <div className='self-stretch flex flex-row items-center justify-between bg-white py-2 md:text-xs text-[8px] font-normal text-black px-2 '>
                    
                    <div className='flex items-center justify-center'>
                    {subtitle4}
                    </div>

                    <div className='flex felx-row items-center justify-center md:gap-4 gap-1'>
                    
                    <div className='md:w-[45px] w-[28px] flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center'>
                    {j1}
                    </div>
                    <div className='flex items-center justify-center text-[8px] text-green-500'>
                    {j2}
                    </div>
                    </div>
                    <div className='md:w-[45px] w-[28px] flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center'>
                    {j3}
                    </div>
                    <div className='flex items-center justify-center text-[8px] text-green-500'>
                    {j4}
                    </div>
                    </div>
                    <div className='md:w-[45px] w-[28px] flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center'>
                    {j5}
                    </div>
                    <div className='flex items-center justify-center text-[8px] text-green-500'>
                    {j6}
                    </div>
                    </div>

                    <div className='md:w-[45px] w-[28px] flex items-center justify-center text-pink-500'>
                    {j7}
                    </div>
                    <div className='md:w-[45px] w-[28px] flex items-center justify-center text-blue-500'>
                    {j8}
                    </div>
                    <div className='md:w-[45px] w-[28px] flex items-center justify-center'>
                    {j9}
                    </div>
                    <div className='md:w-[45px] w-[28px] flex items-center justify-center'>
                    -
                    </div>
                    <div className='md:w-[45px] w-[28px] flex items-center justify-center text-yellow-500'>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"></path>
                    </svg>
                    </div>
                    </div>
                </div>


            </div>
            </div>
    );
};

export default TableResumenP;