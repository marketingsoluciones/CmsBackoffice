import { FC } from "react";
interface propsComp1 {
    title: any;


}

const Comp1: FC<propsComp1> = ({title}) => {
  return (


    <div className="w-[55px] flex flex-col items-center justify-start gap-[7px]">
    <div className="flex flex-col items-center justify-start py-0 px-[23px]">
      <div className="relative leading-[21px] font-semibold inline-block min-w-[8px] text-gray-600">
        {title}
      </div>
    </div>
    <div className="self-stretch w-[52px] h-[37px] bg-slate-100 rounded-md flex items-center justify-center">
    <input
    className="[border:none] [outline:none] bg-inherit w-6 flex flex-col items-center justify-center  text-sm text-black"
    placeholder="+18"
    type="text"
  />
    </div>
  </div>

);
};

export default Comp1;