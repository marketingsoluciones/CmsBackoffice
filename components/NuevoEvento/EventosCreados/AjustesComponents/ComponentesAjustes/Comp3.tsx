

import { FC } from "react";
import Dropdown3 from "./Dropdown3";

interface propsComp3 {
    items: any;
    title: any;
    subtitle1: any;
    subtitle2: any;

}

const Comp3: FC<propsComp3> = ({items, title, subtitle1, subtitle2}) => {
  return (

<div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[17.5px] box-border gap-[7px] max-w-full text-left text-sm text-profourvenuescom-black font-profourvenuescom-inter-regular-123">
<div className="relative leading-[21px] font-semibold text-gray-600">
  {subtitle1}
</div>
<Dropdown3 items={items} title={title}/>
<div className="relative text-xs leading-[14px] text-gray-400 inline-block max-w-full">
            <p className="m-0">
              {subtitle2}
            </p>
          </div>
</div>

);
};

export default Comp3;