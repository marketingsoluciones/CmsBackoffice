import { memo, useMemo, type CSSProperties, FC } from "react";

type CompPermiType = {
  icon: string;
  title: string;
  letra: string;
  nombre1: string;
  apellido1: string;
  color1: any;
  color2: any;

};

const CompPermi: FC <CompPermiType> = memo(
  ({
    icon,
    title,
    letra,
    nombre1,
    apellido1,
    color1,
    color2
  }) => {

    return (
      <div className="self-stretch rounded-md bg-slate-200 overflow-hidden flex flex-col items-start justify-start pt-0 px-0 pb-2.5 gap-[11px] text-left text-sm text-white font-semibold">
        <div
          className={`self-stretch flex flex-row items-center justify-start py-[7px] ${color1} px-[11px] gap-[5px]`}
          
        >
          <img
            className="h-3.5 w-[12.3px] relative overflow-hidden shrink-0"
            alt=""
            src={icon}
          />
          <div
            className="h-[21px] w-[97px] relative leading-[21px] inline-block"
            
          >
            {title}
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start py-0 px-2 text-base font-roboto">
          <div className="rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start py-[7px] px-[10.5px]">
            <div className="flex flex-row items-center justify-start gap-[11px]">
              <div
                className={`self-stretch w-auto rounded-full ${color2} overflow-hidden shrink-0 flex flex-col items-center justify-center`}
                
              >
                <b className="w-7 h-7 flex items-center justify-center">
                  {letra}
                </b>
              </div>
              <div className="h-[21px] w-[106px] relative text-sm leading-[21px] text-black inline-block font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-rates-signatures-1318x573-default-1-inter-semi-bold-123">
                <b className="font-semibold">{nombre1}</b>
                <span className="font-normal">{apellido1}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
export default CompPermi;