import React, { FC } from 'react';
import TableResumenP from './TableResumenP';

interface Props {
    componentState?: any;
    setComponentState?: any;
    selectedOption: any;
    setSelectedOption: any;

}

const ResumenDePrecios: FC <Props> = ({componentState, setComponentState, setSelectedOption, selectedOption}) => {
    return (
        <div className='h-full flex flex-col items-start justify-start overflow-auto gap-6 px-4 py-4'>
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
                Resumen de Precios
                </div>
            </div>
            <div className="w-[100%] flex flex-col items-start justify-start font-semibold px-2 gap-4">
            <TableResumenP 
            title={"Listas"}
            subtitle={"Vip Party"}
            n1={"0/0"} n2={"0$"} n3={"0/0"} n4={"0$"} n5={"0/0"} n6={"0$"} n7={"0%"} n8={"0%"} n9={"0%"}
            subtitle2={"Chicas Hight"}
            p1={"0/0"} p2={"0$"} p3={"0/0"} p4={"0$"} p5={"0/0"} p6={"0$"} p7={"0%"} p8={"0%"} p9={"0%"}
            subtitle3={"Ambiente"}
            r1={"0/0"} r2={"0$"} r3={"0/0"} r4={"0$"} r5={"0/0"} r6={"0$"} r7={"0%"} r8={"0%"} r9={"0%"}
            subtitle4={"Solteras"}
            j1={"0/0"} j2={"0$"} j3={"0/0"} j4={"0$"} j5={"0/0"} j6={"0$"} j7={"0%"} j8={"0%"} j9={"0%"}
            />
            <TableResumenP 
            title={"Entradas"}
            subtitle={"Solo Entrada"}
            n1={"0/0"} n2={"0$"} n3={"0/0"} n4={"0$"} n5={"0/0"} n6={"0$"} n7={"0%"} n8={"0%"} n9={"0%"}
            subtitle2={"Entrada + 1 bebida"}
            p1={"0/0"} p2={"0$"} p3={"0/0"} p4={"0$"} p5={"0/0"} p6={"0$"} p7={"0%"} p8={"0%"} p9={"0%"}
            subtitle3={"Entrada + servicio de whisky"}
            r1={"0/0"} r2={"0$"} r3={"0/0"} r4={"0$"} r5={"0/0"} r6={"0$"} r7={"0%"} r8={"0%"} r9={"0%"}
            subtitle4={"Entrada + Servicio + 2 shots de tequila"}
            j1={"0/0"} j2={"0$"} j3={"0/0"} j4={"0$"} j5={"0/0"} j6={"0$"} j7={"0%"} j8={"0%"} j9={"0%"}
            />
            
            </div>
        </div>

    );
};

export default ResumenDePrecios;