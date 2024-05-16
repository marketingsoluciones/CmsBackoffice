import { FC } from "react";


interface propsComp5 {
    title: any;
    subtitle: any;
    tags: any;
    img: any;

}

const Comp5: FC<propsComp5> = ({title, subtitle, tags, img}) => {
  return (

    <div className="cursor-pointer self-stretch bg-white hover:bg-orange-100 flex flex-row items-center justify-between max-w-full border-b-[1px] border-solid border-slate-200 gap-[20px] mq825:flex-wrap">
                
    <div className="w-auto flex flex-row items-center justify-start">
      <div className="flex flex-col items-start justify-start pt-[7px] px-3.5 pb-1.5 ">
        <div className="flex flex-row items-start justify-center">
          <div className="h-[46px] w-[46px] shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] rounded-full bg-slate-200 overflow-hidden shrink-0 flex flex-col items-start justify-center relative">
            <img
              className="w-[46px] h-[46px] relative object-cover max-w-[46px]"
              alt=""
              src={img}
            />
            <div className="w-full h-full absolute !m-[0] top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_2px_4px_rgba(0,_0,_0,_0.06)_inset] rounded-9980xl bg-profourvenuescom-nero-02 z-[1]" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start pt-[11px] pb-[9px] pr-[7px] pl-0 gap-[4px] ">
        <div className="relative leading-[21px] inline-block min-w-[98px]">
          <b>{title}</b>
          <span> {subtitle}</span>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start py-0 pr-5 pl-0 text-2xs-5 text-profourvenuescom-fuzzy-wuzzy-brown">
          <div className="relative leading-[14px] inline-block min-w-[61px]">
            {tags}
          </div>
        </div>
      </div>
    </div>

    <div className="box-border flex flex-col items-start justify-center pt-[23px] pb-[22px] pr-[100px] pl-[237.1px] max-w-full text-center text-2xs-5 text-profourvenuescom-gull-gray border-b-[1px] border-solid border-profourvenuescom-catskill-white1 mq675:pl-[118px] mq675:pr-[118px] mq675:box-border">
      <div className="relative leading-[14px] inline-block min-w-[5px]">
        1
      </div>
    </div>

  </div>
);
};

export default Comp5;