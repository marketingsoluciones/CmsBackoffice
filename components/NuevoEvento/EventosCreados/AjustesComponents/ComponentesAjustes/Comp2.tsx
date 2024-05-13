import { FC } from "react";
import { SwichtC } from "../../../../ToolsComponents/Swicht";
interface propsComp2 {
    title: any;
    subtitle: any;


}

const Comp2: FC<propsComp2> = ({title, subtitle}) => {
  return (
<div className="self-stretch rounded-md bg-slate-100 flex flex-col items-start justify-start p-3.5 text-left text-sm text-gray-600 font-semibold">
<div className="self-stretch flex flex-row items-center justify-start [row-gap:20px] mq450:flex-wrap">
  <div className="flex-1 flex flex-col items-start justify-start min-w-[136px]">
    <div className="relative leading-[21px] font-semibold">
    {title}
    </div>         
  </div>
  <SwichtC/>
</div>

<div className="self-stretch flex flex-col items-start justify-start pt-[7px] px-0 pb-0 text-smi-3 text-lightslategray">
  <div className="self-stretch relative leading-[17.5px] font-medium text-gray-400">
  {subtitle}
  </div>
</div>
</div>

);
};

export default Comp2;