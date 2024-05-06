import { FC, useMemo, type CSSProperties } from "react";

export type ComponentRType = {
  icon1?: string;
  forStatement?: string;
  christianLanza?: string;
  nada?: string;

  /** Style props */
  propPadding?: CSSProperties["padding"];
  propMinWidth?: CSSProperties["minWidth"];
};

const ComponentR: FC<ComponentRType> = ({
  icon1,
  forStatement,
  christianLanza,
  nada,
  propPadding,
  propMinWidth,
}) => {
  const divflexStyle: CSSProperties = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const nadaStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  return (
    <div className="self-stretch flex flex-row items-start justify-start py-0 px-[7px] box-border max-w-full text-center text-2xs-2 text-profourvenuescom-fiord font-profourvenuescom-font-awesome-5-free-regular-120">
      <div className="flex-1 rounded-[5.25px] box-border flex flex-row items-start justify-start p-[3px] gap-[8.6px] max-w-full border-[1px] border-solid border-profourvenuescom-nero mq450:flex-wrap">
        <div className="flex flex-col items-start justify-start pt-4 px-0 pb-0">
          <div className="flex flex-col items-start justify-start py-0 pr-[3.5px] pl-0">
            <div className="rounded-md bg-[#CBD5E1] flex flex-row items-center justify-center p-2.5">
              <div className="rounded-full bg-[#F97316] shadow-[0px_2px_4px_rgba(0,_0,_0,_0.06)_inset] flex flex-col items-start justify-start">
                <div className="flex flex-col items-center justify-start py-2.5 px-[15px]">
                  <div className="relative leading-[14px] inline-block min-w-[4px] text-gray-600">
                    !
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-start justify-start min-w-[149px] text-left text-smi-3 font-profourvenuescom-inter-bold-14">
          <div
            className="self-stretch flex flex-row items-start justify-start py-0 px-0 text-profourvenuescom-geyser"
            style={divflexStyle}
          >
            <div className="flex-1 flex flex-col items-start justify-start">
              <div className="self-stretch flex flex-col items-start justify-start">
                <div className="self-stretch relative leading-[18px]">
                  <span>{`Sin hora `}</span>
                  <span className="text-profourvenuescom-black"> </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-[7px] text-profourvenuescom-fiord">
              <div className="flex flex-row items-start justify-start">
                <img
                  className="h-2.5 w-[10.5px] relative overflow-hidden shrink-0"
                  alt=""
                  src="/icon-13.svg"
                />
              </div>
              <div className="flex flex-row items-start justify-start">
                <img
                  className="h-[13px] w-[7.7px] relative overflow-hidden shrink-0"
                  alt=""
                  src={icon1}
                />
              </div>
              <b className="relative leading-[18px] inline-block min-w-[8px]">
                {forStatement}
              </b>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[7.2px] mt-[-0.5px] text-sm">
            <div className="self-stretch relative leading-[21px] font-semibold">
              {christianLanza}
            </div>
            <div className="flex flex-row items-start justify-start py-0 pr-5 pl-0 gap-[3.5px] mt-[-0.2px] text-smi-3 text-profourvenuescom-gull-gray">
              <div className="flex flex-col items-start justify-start pt-1 px-0 pb-0">
                <img
                  className="w-[9.2px] h-2.5 relative overflow-hidden shrink-0"
                  alt=""
                  src="/icon-151.svg"
                />
              </div>
              <div className="relative leading-[18px] inline-block min-w-[84px]">
                christian lanza
              </div>
            </div>
          </div>
          <div className="self-stretch rounded-tl-none rounded-tr-2xs-5 rounded-b-2xs-5 bg-profourvenuescom-cyan-aqua flex flex-row items-start justify-start py-[3px] px-[4.5px] mt-[-0.5px] text-2xs-5 border-[1px] border-solid border-profourvenuescom-mustard">
            <div
              className="relative leading-[14px] inline-block min-w-[25px]"
              style={nadaStyle}
            >
              {nada}
            </div>
          </div>
        </div>
        <div className="h-[70px] w-[54px] flex flex-col items-start justify-start pt-4 px-0 pb-0 box-border">
          <div className="self-stretch flex-1 relative rounded-[5.25px] bg-profourvenuescom-geyser" />
        </div>
      </div>
    </div>
  );
};

export default ComponentR;
