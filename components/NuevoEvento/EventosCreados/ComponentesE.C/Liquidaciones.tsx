import { FC } from "react";
interface propsLiquidaciones {
  componentState?: any;
  setComponentState?: any;
  selectedOption?: any;
  setSelectedOption?: any;
  
  }

const Liquidaciones: FC<propsLiquidaciones> = ({componentState, setComponentState, selectedOption, setSelectedOption}) => {
  return (
    <div className="w-[100%] py-6 px-6 flex flex-col items-center justify-center gap-[140px] leading-[normal] tracking-[normal] text-left mq450:gap-[35px] mq600:gap-[70px]">
      
      <div className="w-full flex flex-row items-center justify-start gap-2 ">
          
          <div className="flex flex-col items-start justify-start">
            <div onClick={()=>{ 
        setSelectedOption(12)
      }} 
             className="cursor-pointer flex flex-row items-center justify-center ">
                  <img
                    className="h-[18px] w-[18px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/vectorF.svg"
                  />
            </div>
          </div>

          <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
            <div className="overflow-hidden flex flex-col items-start justify-start py-0 pr-[15.8px] pl-0">
              <div className="relative leading-[32px] font-semibold mq450:text-2xl mq450:leading-[25px] text-[18px] ">
                Liquidaciones
              </div>
            </div>
          </div>

        </div>
      
      <div className="flex flex-col items-center justify-center p-5 box-border gap-[11px] max-w-full text-center text-sm text-gray-400">
        <div className="w-[126px] h-[126px] rounded-full bg-slate-100 flex flex-col items-start justify-center pt-[35.8px] pb-[36.7px] pr-[40.1px] pl-10 box-border">
          <div className="flex flex-col items-center justify-start pt-0 px-0 pb-0">
            <div className="flex flex-row items-start justify-start">
              <img
                className="h-[54px] w-[45.9px] relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="ModuloEvento/Liquidaciones2.svg"
              />
            </div>
          </div>
        </div>
        <div className="relative leading-[21px] font-semibold">
          No hay liquidaciones disponibles
        </div>
        <div className="relative leading-[21px] text-profourvenuescom-gull-gray">
          <p className="m-0">
            Es necesario configurar al menos una tarifa con venta por SMS y
          </p>
          <p className="m-0">
            haberse vendido alguna entrada para poder ver esta sección
          </p>
        </div>
      </div>
    </div>
  );
};

export default Liquidaciones;