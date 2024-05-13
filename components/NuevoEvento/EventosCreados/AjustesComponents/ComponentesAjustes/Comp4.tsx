import { FC } from "react";


interface propsComp4 {
    title: any;
    subtitle: any;

}

const Comp4: FC<propsComp4> = ({title, subtitle}) => {
  return (

    <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[10.5px] box-border max-w-full text-left text-sm">
    <div className="relative leading-[21px] font-semibold inline-block min-w-[125px]">
      {title}
    </div>
    <div className="self-stretch rounded-md bg-slate-100 flex flex-row items-start justify-between overflow-hidden p-0 box-border max-w-full">

        
        <div className="flex items-start justify-start">
          <div className="bg-gray-200 flex flex-row items-start justify-start pt-2.5 pb-[11px] pr-2.5 pl-[10.5px]">
            <div className="flex flex-row items-start justify-start text-rosa">
                -
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start max-w-full">    

            <div className="flex flex-col items-start justify-start ">
              <div className="relative leading-[36px] font-medium inline-block min-w-[16px]">
                31
              </div>
            </div>


        </div>

        <div className="flex items-start justify-start">
          <div className="bg-gray-200 flex flex-row items-start justify-start pt-2.5 pb-[11px] pr-2.5 pl-[10.5px]">
            <div className="flex flex-row items-start justify-start text-rosa">
                +
            </div>
          </div>
        </div>

      
    </div>
    <div className="self-stretch flex flex-col items-start justify-start pt-[7px] px-0 pb-0 text-smi-3 text-profourvenuescom-gull-gray">
      <div className="self-stretch relative leading-[17.5px]">
        <p className="m-0">
          {subtitle}</p>
      </div>
    </div>
</div>

);
};

export default Comp4;