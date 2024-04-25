import { FC } from "react";
interface propsComision1 {
    componentState: any;
    setComponentState: any;
}

const Comision1: FC<propsComision1> = ({componentState, setComponentState}) => {
  return (
    <div className="w-[100%] max-w-full flex flex-col items-center justify-start py-5 px-0 box-border tracking-[normal] leading-[normal] text-left text-7xl-3 text-profourvenuescom-ebony font-profourvenuescom-inter-bold-14">
      <div className="self-stretch flex flex-row items-center justify-between py-0 px-5 gap-[20px] mq450:flex-wrap">
        
        <div className="flex flex-row items-center justify-start gap-2">
          
          <div className="flex flex-col items-start justify-start">
            <div onClick={()=>{ 
        setComponentState(7)
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
                Comisiones
              </div>
            </div>
          </div>

        </div>

        <button className="cursor-pointer py-2 px-[17px] bg-slate-100 rounded-md box-border flex flex-row items-center justify-center gap-[10.5px] max-w-[138.08999633789062px] border-[1px] border-solid border-slate-200 hover:bg-slate-50">
          <div className="w-3.5 flex flex-col items-center justify-start pt-[2.4px] px-0 pb-[2.9px] box-border">
            <div className="self-stretch relative text-smi-1 leading-[13px] text-center inline-block min-w-[14px]">
              <img src="ModuloEvento/ojito.svg" alt="" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-start">
            <div className="relative text-xs leading-[18px] font-semibold text-center inline-block min-w-[78px]">
              Mostrar todo
            </div>
          </div>
        </button>
      </div>
      <div className="self-stretch flex flex-col items-center justify-center p-5 text-center text-101xl text-profourvenuescom-black font-profourvenuescom-font-awesome-5-free-regular-120">
        <div className="flex flex-col items-center justify-start gap-[10px]">
          <div className="w-[120.2px] relative leading-[120px] flex items-center justify-center mq450:text-[30px] mq450:leading-[48px] mq1050:text-[48px] mq1050:leading-[72px]">
           <img src="ModuloEvento/carita.svg" alt="" />
          </div>
          <div className="flex flex-col items-center justify-start py-0 px-4 text-mid-5 font-profourvenuescom-inter-bold-14">
            <b className="relative leading-[25px] inline-block min-w-[123px] max-w-[1187px] lg:max-w-full">
              Sin resultados
            </b>
          </div>
          <button onClick={()=>{ 
        setComponentState(19)
      }} 
           className="cursor-pointer py-2 px-[17px] bg-slate-100 rounded-md box-border flex flex-row items-center justify-center gap-[10.5px] max-w-[155.86000061035156px] border-[1px] border-solid border-slate-200 hover:bg-slate-50">
            <div className="w-auto flex flex-col items-center justify-start pt-[2.4px] px-0 pb-[2.9px] box-border">
              <div className="self-stretch relative leading-[13px] text-center inline-block min-w-[14px]">
                <img src="ModuloEvento/ojito.svg" alt="" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-start">
              <div className="relative text-xs leading-[18px] font-semibold text-center inline-block min-w-[95px]">
                Activar ver todo
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comision1;
