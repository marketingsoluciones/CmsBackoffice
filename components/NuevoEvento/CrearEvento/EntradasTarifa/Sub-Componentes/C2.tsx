import { CSSProperties, FC, useMemo } from "react";
export type C2Type = {
    title?: string;
    text?: string;
    color?: string;
  
  };

const C2: FC <C2Type> = ({title, text, color}) => {
    const C2Style: CSSProperties = useMemo(() => {
        return {
          width: "100%", // Cambia esto según tus necesidades
          backgroundColor: color,
        };
      }, [color]);
    

  return (
    <div className="rounded-md flex flex-col items-start justify-start pt-[13.200000000000728px] pb-[18.700000000000728px] pr-3.5 pl-[15.099999999998545px] gap-[5.299999999999272px] border-[1px] border-solid border-slate-100"
    style={C2Style}>
      <div className="relative leading-[21px] font-semibold">
        {title}
      </div>
      <div className="flex flex-row items-end justify-start text-xs text-black font-medium">
        <div className="relative  inline-block min-w-[11.799999999999272px] leading-[11px] ">
          <img src="ModuloEvento/dan.svg" alt="" />
        </div>
        <div className="relative leading-[14px] ">
          {text}
          </div>
      </div>
    </div>
  );
};

export default C2;
