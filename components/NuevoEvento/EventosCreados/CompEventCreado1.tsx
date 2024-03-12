import { FunctionComponent, memo, useMemo, type CSSProperties } from "react";

type CompEventCreado1Type = {
  icon?: string;
  tarifas?: string;
  recuentoPorTarifa?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propFlex?: CSSProperties["flex"];
  propMinWidth?: CSSProperties["minWidth"];
  propLeft?: CSSProperties["left"];
  propWidth1?: CSSProperties["width"];
  propBackgroundColor?: CSSProperties["backgroundColor"];
};

const CompEventCreado1: FunctionComponent<CompEventCreado1Type> = memo(
  ({
    icon,
    tarifas,
    recuentoPorTarifa,
    propWidth,
    propFlex,
    propMinWidth,
    propLeft,
    propWidth1,
    propBackgroundColor,
  }) => {
    const CompEventCreado1Style: CSSProperties = useMemo(() => {
      return {
        width: propWidth,
        flex: propFlex,
        minWidth: propMinWidth,
      };
    }, [propWidth, propFlex, propMinWidth]);

    const beforeStyle: CSSProperties = useMemo(() => {
      return {
        left: propLeft,
      };
    }, [propLeft]);

    const iconStyle: CSSProperties = useMemo(() => {
      return {
        width: propWidth1,
      };
    }, [propWidth1]);

    const divabsoluteStyle: CSSProperties = useMemo(() => {
      return {
        backgroundColor: propBackgroundColor,
      };
    }, [propBackgroundColor]);

    return (
      <div
        className="w-[171px] rounded-2xs-5 bg-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-nero shadow-[0px_1px_10px_rgba(0,_0,_0,_0.12),_0px_4px_5px_rgba(0,_0,_0,_0.14),_0px_2px_4px_-1px_rgba(0,_0,_0,_0.2)] overflow-hidden shrink-0 flex flex-row items-start justify-start [transform:_rotate(180deg)] text-left text-sm text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-black font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-medium-123"
        style={CompEventCreado1Style}
      >
        <div className="flex-1 flex flex-row items-start justify-start">
          <div className="h-[70px] w-[54px] flex flex-col items-center justify-start pt-[12.5px] pb-[24.5px] pr-[13.869999885559082px] pl-[13.880000114440918px] box-border relative">
            <div
              className="my-0 mx-[!important] absolute top-[12.5px] left-[calc(50%_-_13.1px)] flex flex-row items-start justify-start"
              style={beforeStyle}
            >
              <img
                className="h-[26px] w-[26.3px] relative overflow-hidden shrink-0 [transform:_rotate(-180deg)]"
                loading="lazy"
                alt=""
                src={icon}
                style={iconStyle}
              />
            </div>
            <div
              className="w-full h-full absolute my-0 mx-[!important] top-[0%] right-[0%] bottom-[0%] left-[0%] bg-gray-300 z-[1]"
              style={divabsoluteStyle}
            />
          </div>
          <div className="flex-1 flex flex-col items-start justify-start p-[10.5px] [transform:_rotate(180deg)]">
            <div className="self-stretch flex flex-row items-start justify-start pt-[7px] px-0 pb-0">
              <div className="h-[21px] w-[47px] relative leading-[21px] font-semibold inline-block">
                {tarifas}
              </div>
            </div>
            <div className="flex flex-row items-start justify-start text-2xs-5 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-gull-gray">
              <div className="h-[21px] w-24 relative leading-[21px] inline-block">
                {recuentoPorTarifa}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default CompEventCreado1;
