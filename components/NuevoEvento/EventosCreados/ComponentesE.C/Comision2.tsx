import { FC } from "react";
interface propsComision2 {
    componentState: any;
    setComponentState: any;
}

const Comision2: FC<propsComision2> = ({componentState, setComponentState}) => {
  return (
    <div className="w-[100%] max-w-full flex flex-col items-start justify-start gap-[25px] leading-[normal] tracking-[normal] text-left px-6 py-6">
      <div className="self-stretch flex flex-row items-center justify-between gap-[20px] mq500:flex-wrap">
        
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

        <div className="flex flex-row items-center justify-center gap-[44px] mq450:gap-[22px]">
          
          <button className="cursor-pointer py-2 px-[17px] bg-slate-100 w-[96.5px] rounded-md box-border flex flex-row items-center justify-center gap-[7.5px] max-w-[100.94999694824219px] border-[1px] border-solid border-slate-200 mq450:w-[calc(100%_-_40px)] hover:bg-white">
            <div className="w-[50px] flex flex-col items-center justify-start pt-[2.4px] px-0 pb-[2.9px] box-border">
              <div className="self-stretch w-4 h-4 relative leading-[12.25px] text-center flex items-center justify-center">
                <img src="ModuloEvento/buscarRosa.svg" alt="" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-start">
              <div className="relative text-xs leading-[18px] font-semibold text-center inline-block min-w-[42px]">
                Buscar
              </div>
            </div>
          </button>

          <button className="cursor-pointer py-2 px-[17px] bg-slate-100 w-auto rounded-md box-border flex flex-row items-center justify-center gap-[10.5px] border-[1px] border-solid border-slate-200 hover:bg-white mq450:w-[calc(100%_-_40px)]">
            <div className="w-auto flex flex-col items-center justify-start box-border">
                <img src="ModuloEvento/ojito.svg" alt="" />
            </div>
            <div className="flex flex-col items-center justify-start">
              <div className="relative text-xs leading-[18px] font-semibold text-center inline-block">
                Ocultar ceros
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="w-[459px] flex flex-col items-start justify-center py-0 pr-5 pl-0 box-border max-w-full text-right text-sm text-profourvenuescom-black">
        <div className="bg-profourvenuescom-nero overflow-x-auto flex flex-row items-center justify-start py-0 px-0 text-2xs">
          <div className="w-[202px] shrink-0 flex flex-row items-center justify-start py-0 px-2.5 box-border text-center">
            <b className="relative leading-[17px] inline-block min-w-[43px]">
              Nombre
            </b>
          </div>
          <div className="flex flex-row items-center justify-start py-[4.5px] pr-[33px] pl-0">
            <b className="relative leading-[17px] inline-block min-w-[27px]">
              Total
            </b>
          </div>
          <div className="flex flex-col items-center justify-center py-[4.5px] px-[9px]">
            <div className="flex flex-row items-center justify-start">
              <b className="relative leading-[17px] inline-block min-w-[18px]">
                E. 1
              </b>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-[4.5px] px-2">
            <div className="flex flex-row items-center justify-start">
              <b className="relative leading-[17px] inline-block min-w-[20px]">
                E. 2
              </b>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-[4.5px] px-2">
            <div className="flex flex-row items-center justify-start">
              <b className="relative leading-[17px] inline-block min-w-[20px]">
                E. 3
              </b>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-[4.5px] px-2">
            <div className="flex flex-row items-center justify-start">
              <b className="relative leading-[17px] inline-block min-w-[20px]">
                E. 4
              </b>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-[4.5px] px-2">
            <div className="flex flex-row items-center justify-start">
              <b className="relative leading-[17px] inline-block min-w-[20px]">
                E. 5
              </b>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-start [row-gap:20px] border-b-[1px] border-solid border-profourvenuescom-catskill-white mq450:flex-wrap">
          <div className="flex flex-col items-start justify-start pt-[7px] pb-2 pr-0 pl-[7px]">
            <div className="flex flex-row items-start justify-center">
              <div className="h-7 w-7 rounded-9xl bg-profourvenuescom-catskill-white overflow-hidden shrink-0 flex flex-col items-start justify-center relative">
                <img
                  className="w-7 h-7 relative rounded-9xl object-cover max-w-[28px]"
                  loading="lazy"
                  alt=""
                  src="ModuloEvento/foto1.svg"
                />
                <div className="w-full h-full absolute !m-[0] top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-9980xl bg-profourvenuescom-nero-02 shadow-[0px_2px_4px_rgba(0,_0,_0,_0.06)_inset] z-[1]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px] text-left">
            <div className="overflow-hidden flex flex-col items-start justify-start">
              <div className="relative leading-[21px] inline-block max-w-[150px]">
                Adrian Fons Camarena
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] pr-[31px] pl-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row flex-wrap items-center justify-start [row-gap:20px] border-b-[1px] border-solid border-profourvenuescom-catskill-white">
          <div className="flex flex-col items-start justify-start pt-[7px] pb-2 pr-0 pl-[7px]">
            <div className="flex flex-row items-start justify-center">
              <div className="h-7 w-7 rounded-9xl bg-profourvenuescom-catskill-white overflow-hidden shrink-0 flex flex-col items-start justify-center relative">
                <img
                  className="w-7 h-7 relative rounded-9xl object-cover max-w-[28px]"
                  loading="lazy"
                  alt=""
                  src="ModuloEvento/foto2.svg"
                />
                <div className="w-full h-full absolute !m-[0] top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-9980xl bg-profourvenuescom-nero-02 shadow-[0px_2px_4px_rgba(0,_0,_0,_0.06)_inset] z-[1]" />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start py-[11px] px-[7px] box-border min-w-[107px] text-left">
            <div className="self-stretch overflow-hidden flex flex-col items-start justify-start py-0 pr-5 pl-0">
              <div className="relative leading-[21px] inline-block min-w-[95px] max-w-[150px]">
                Carbonaph Rd
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] pr-[31px] pl-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-start [row-gap:20px] border-b-[1px] border-solid border-profourvenuescom-catskill-white mq450:flex-wrap">
          <div className="flex flex-col items-start justify-start pt-[7px] pb-2 pr-0 pl-[7px]">
            <div className="flex flex-row items-start justify-center">
              <div className="h-7 w-7 rounded-9xl bg-profourvenuescom-catskill-white overflow-hidden shrink-0 flex flex-col items-start justify-center relative">
                <img
                  className="w-7 h-7 relative rounded-9xl object-cover max-w-[28px]"
                  loading="lazy"
                  alt=""
                  src="ModuloEvento/foto3.svg"
                />
                <div className="w-full h-full absolute !m-[0] top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-9980xl bg-profourvenuescom-nero-02 shadow-[0px_2px_4px_rgba(0,_0,_0,_0.06)_inset] z-[1]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px] text-left">
            <div className="overflow-hidden flex flex-col items-start justify-start py-0 pr-5 pl-0">
              <div className="relative leading-[21px] inline-block max-w-[150px]">
                Carla Reig Martinez
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] pr-[31px] pl-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row flex-wrap items-center justify-start [row-gap:20px] border-b-[1px] border-solid border-profourvenuescom-catskill-white">
          <div className="flex flex-col items-start justify-start pt-[7px] pb-2 pr-0 pl-[7px]">
            <div className="flex flex-row items-start justify-center">
              <div className="h-7 w-7 rounded-9xl bg-profourvenuescom-catskill-white overflow-hidden shrink-0 flex flex-col items-start justify-center relative">
                <img
                  className="w-7 h-7 relative rounded-9xl object-cover max-w-[28px]"
                  loading="lazy"
                  alt=""
                  src="ModuloEvento/foto4.svg"
                />
                <div className="w-full h-full absolute !m-[0] top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-9980xl bg-profourvenuescom-nero-02 shadow-[0px_2px_4px_rgba(0,_0,_0,_0.06)_inset] z-[1]" />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start py-[11px] px-[7px] box-border min-w-[107px] text-left">
            <div className="self-stretch overflow-hidden flex flex-col items-start justify-start py-0 pr-5 pl-0">
              <div className="relative leading-[21px] inline-block min-w-[103px] max-w-[150px]">
                Christian Lanza
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] pr-[31px] pl-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-[11px] px-[7px]">
            <div className="flex flex-col items-end justify-start opacity-[0.1]">
              <div className="relative leading-[21px] inline-block min-w-[22px]">
                0 €
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comision2;
