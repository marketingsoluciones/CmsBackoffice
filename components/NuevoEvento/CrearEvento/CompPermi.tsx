import { memo, useMemo, type CSSProperties, FC } from "react";

type CompPermiType = {
  icon?: string;
  administrador?: string;
  l?: string;
  christian?: string;
  lanza?: string;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propDisplay?: CSSProperties["display"];
  propWidth?: CSSProperties["width"];
  propBackgroundColor1?: CSSProperties["backgroundColor"];
};

const CompPermi: FC <CompPermiType> = memo(
  ({
    icon,
    administrador,
    l,
    christian,
    lanza,
    propBackgroundColor,
    propDisplay,
    propWidth,
    propBackgroundColor1,
  }) => {
    const CompPermiStyle: CSSProperties = useMemo(() => {
      return {
        backgroundColor: propBackgroundColor,
      };
    }, [propBackgroundColor]);

    const administradorStyle: CSSProperties = useMemo(() => {
      return {
        display: propDisplay,
        width: propWidth,
      };
    }, [propDisplay, propWidth]);

    const CompPermiimageStyle: CSSProperties = useMemo(() => {
      return {
        backgroundColor: propBackgroundColor1,
      };
    }, [propBackgroundColor1]);

    return (
      <div className="self-stretch flex-1 rounded-2xs-5 bg-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-mystic-200 overflow-hidden flex flex-col items-start justify-start pt-0 px-0 pb-2.5 gap-[11px] text-left text-sm text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-nero font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-rates-signatures-1318x573-default-1-inter-semi-bold-123">
        <div
          className="self-stretch bg-darkorange flex flex-row items-center justify-start py-[7px] px-[11px] gap-[1px]"
          style={CompPermiStyle}
        >
          <img
            className="h-3.5 w-[12.3px] relative overflow-hidden shrink-0"
            alt=""
            src={icon}
          />
          <div
            className="h-[21px] w-[97px] relative leading-[21px] inline-block"
            style={administradorStyle}
          >
            {administrador}
          </div>
        </div>
        <div className="self-stretch flex-1 flex flex-col items-start justify-start py-0 px-2 text-base font-roboto">
          <div className="flex-1 rounded-2xs-5 bg-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-nero shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start py-[7px] px-[10.5px]">
            <div className="flex-1 flex flex-row items-center justify-start gap-[11px]">
              <div
                className="self-stretch w-9 rounded-17xl bg-darkorange overflow-hidden shrink-0 flex flex-col items-center justify-center"
                style={CompPermiimageStyle}
              >
                <b className="w-[9px] h-7 relative tracking-[0.15px] leading-[175%] inline-block">
                  {l}
                </b>
              </div>
              <div className="h-[21px] w-[106px] relative text-sm leading-[21px] text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black inline-block font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-rates-signatures-1318x573-default-1-inter-semi-bold-123">
                <b>{christian}</b>
                <span>{lanza}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default CompPermi;