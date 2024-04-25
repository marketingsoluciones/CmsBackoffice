import { FC } from "react";
interface propsRrPpRecepcion {
    componentState: any;
    setComponentState: any;
  
  }

const RrPpRecepcion: FC<propsRrPpRecepcion> = ({componentState, setComponentState}) => {
  return (
    <div className="w-full relative flex flex-col items-start justify-start px-6 py-6 box-border gap-[55px] tracking-[normal] leading-[normal] text-left text-7xl-3 text-profourvenuescom-ebony font-profourvenuescom-inter-bold-14 mq600:gap-[27px]">
      <div className="flex flex-row items-center justify-start py-0 pr-5 pl-0 gap-3">
        

        <div onClick={() => {
          setComponentState(12)
        }} className="cursor-pointer flex flex-row items-center justify-center pt-[4.5px] px-[3.9px] pb-[5.5px]">
              <img
                className="h-[27px] w-[23px] relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="ModuloEvento/vectorF.svg"
              />
           
      </div>
          <div className="relative leading-[32px] font-semibold inline-block min-w-[76px] mq450:text-2xl mq450:leading-[25px]">
            R.R.P.P
          </div>
    </div>
      <div className="self-stretch flex flex-row items-start justify-center max-w-full text-center text-mid-5 text-profourvenuescom-black">
        <div className="w-[475px] flex flex-col items-start justify-start gap-[10px] max-w-full">
          <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
            <img
              className="h-[120.7px] w-[90.5px] relative"
              loading="lazy"
              alt=""
              src="ModuloEvento/rrpp.svg"
            />
          </div>
          <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
            <b className="relative leading-[25px]">
              No hay listas para este evento
            </b>
          </div>
          <div className="relative text-sm leading-[21px] text-profourvenuescom-pickled-bluewood">
            <p className="m-0">
              Aquí podrás hacer el check in de los asistentes que estén
              apuntados en
            </p>
            <p className="m-0">lista para este evento.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RrPpRecepcion;