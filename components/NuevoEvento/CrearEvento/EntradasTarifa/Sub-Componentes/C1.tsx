import { useMemo, type CSSProperties, FC } from "react";
import Checkbox from "../../Checkbox1";

export type C1Type = {
  icon?: string;
  title?: string;
  text?: string;

  /** Style props */
  autorizaALosWidth?: CSSProperties["width"];
  propWidth?: CSSProperties["width"];
};

const C1: FC <C1Type> = ({
  icon,
  title,
  text,
  autorizaALosWidth,
  propWidth,
}) => {
  const iconStyle: CSSProperties = useMemo(() => {
    return {
      width: autorizaALosWidth,
    };
  }, [autorizaALosWidth]);

  const spanflexGrowmarginStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  return (
    <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-px gap-[2.5px] text-left text-2xs-5 text-gray-600 ">
      
      <div className="self-stretch rounded-md bg-slate-200 flex flex-row items-center justify-between px-[10.5px]">
        
        <div className="flex flex-row items-center justify-center pr-[7px] pl-0 gap-2">
          
          <div className="h-3.5 flex flex-row items-start justify-start">
            <img
              className="h-3.5 w-[17.5px] relative overflow-hidden shrink-0"
              alt=""
              src={icon}
              style={iconStyle}
            />
          </div>
          <div className="w-auto flex flex-col items-center justify-center font-medium text-sm text-black">
        {title}
        </div>
        </div>



        <div className="flex flex-col items-start justify-start">
            <Checkbox label={""}/>
        </div>

      </div>
      <div className="self-stretch flex flex-col items-start justify-start py-0 pr-[26px] pl-0 text-xs text-gray-400 font-normal">
        <div className="relative leading-[14px]">
          <p className="m-0">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default C1;
