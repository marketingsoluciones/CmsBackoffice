import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type DataType = {
  /** Style props */
  beforeMinWidth?: CSSProperties["minWidth"];
};

const Data: FunctionComponent<DataType> = ({ beforeMinWidth }) => {
  const dataStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: beforeMinWidth,
    };
  }, [beforeMinWidth]);

  return (
    <div
      className="flex-1 flex flex-col items-start justify-start py-[1.7px] px-px box-border gap-[7px] min-w-[142px] text-center text-sm text-profourvenuescom-black font-profourvenuescom-inter-bold-14"
      style={dataStyle}
    >
      <div className="self-stretch flex flex-row items-center justify-start py-0 px-0">
        <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[7px] pl-0">
          <div className="self-stretch flex flex-row items-start justify-start min-w-[120px]">
            <div className="flex flex-col items-end justify-start">
              <div className="rounded-tl-6xs rounded-tr-none rounded-br-none rounded-bl-6xs bg-profourvenuescom-mystic flex flex-row items-start justify-end pt-2.5 pb-[11px] pr-[10.5px] pl-2.5">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-[15px] w-[12.3px] relative overflow-hidden shrink-0"
                    alt=""
                    src="/icon-11.svg"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start">
              <div className="self-stretch flex flex-row items-center justify-center">
                <div className="flex-1 bg-profourvenuescom-catskill-white flex flex-col items-start justify-start border-[1px] border-solid border-profourvenuescom-catskill-white">
                  <div className="self-stretch flex flex-row items-center justify-start">
                    <div className="flex-1 flex flex-col items-start justify-start">
                      <div className="self-stretch overflow-auto flex flex-col items-center justify-start py-0 px-[62px]">
                        <div className="w-3 relative leading-[36px] flex items-center justify-center min-w-[12px]">
                          0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end justify-start text-profourvenuescom-dodger-blue font-profourvenuescom-font-awesome-5-free-regular-120">
              <div className="rounded-tl-none rounded-tr-6xs rounded-br-6xs rounded-bl-none bg-profourvenuescom-mystic flex flex-row items-start justify-end pt-[10.5px] px-[10.5px] pb-[11.5px]">
                <div className="w-[9px] relative leading-[14px] flex items-center justify-center min-w-[9px]">
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-start pt-1 px-0 pb-[3px]">
          <div className="flex flex-row items-start justify-start opacity-[0.5]">
            <img
              className="h-3.5 w-[8.8px] relative overflow-hidden shrink-0"
              alt=""
              src="/icon-21.svg"
            />
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-center justify-start py-0 px-0">
        <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[7px] pl-0">
          <div className="self-stretch flex flex-row items-start justify-start min-w-[120px]">
            <div className="flex flex-col items-end justify-start">
              <div className="rounded-tl-6xs rounded-tr-none rounded-br-none rounded-bl-6xs bg-profourvenuescom-mystic flex flex-row items-start justify-end pt-2.5 pb-[11px] pr-[10.5px] pl-2.5">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-[15px] w-[12.3px] relative overflow-hidden shrink-0"
                    alt=""
                    src="/icon-11.svg"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start">
              <div className="self-stretch flex flex-row items-center justify-center">
                <div className="flex-1 bg-profourvenuescom-catskill-white flex flex-col items-start justify-start border-[1px] border-solid border-profourvenuescom-catskill-white">
                  <div className="self-stretch flex flex-row items-center justify-start">
                    <div className="flex-1 flex flex-col items-start justify-start">
                      <div className="self-stretch overflow-auto flex flex-col items-center justify-start py-0 px-[62px]">
                        <div className="w-3 relative leading-[36px] flex items-center justify-center min-w-[12px]">
                          0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end justify-start text-profourvenuescom-dodger-blue font-profourvenuescom-font-awesome-5-free-regular-120">
              <div className="rounded-tl-none rounded-tr-6xs rounded-br-6xs rounded-bl-none bg-profourvenuescom-mystic flex flex-row items-start justify-end pt-[10.5px] px-[10.5px] pb-[11.5px]">
                <div className="w-[9px] relative leading-[14px] flex items-center justify-center min-w-[9px]">
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-start pt-1 px-0 pb-[3px]">
          <div className="flex flex-row items-start justify-start opacity-[0.5]">
            <img
              className="h-3.5 w-[8.8px] relative overflow-hidden shrink-0"
              alt=""
              src="/icon-41.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
