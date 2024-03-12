import { memo, useMemo, type CSSProperties, FC } from "react";

type CompPermiType = {
  icon?: string;
  administrador?: string;
  letra?: string;
  nombre1?: string;
  apellido1?: string;

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
    letra,
    nombre1,
    apellido1,
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
      <div className="self-stretch flex-1 rounded-md bg-slate-200 overflow-hidden flex flex-col items-start justify-start pt-0 px-0 pb-2.5 gap-[11px] text-left text-sm text-white font-semibold">
        <div
          className="self-stretch flex flex-row items-center justify-start py-[7px] px-[11px] gap-[5px]"
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
          <div className="rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start py-[7px] px-[10.5px]">
            <div className="flex flex-row items-center justify-start gap-[11px]">
              <div
                className="self-stretch w-9 rounded-full bg-darkorange overflow-hidden shrink-0 flex flex-col items-center justify-center"
                style={CompPermiimageStyle}
              >
                <b className="w-7 h-7 items-center justify-center  relative tracking-[0.15px] leading-[175%] inline-block">
                  {letra}
                </b>
              </div>
              <div className="h-[21px] w-[106px] relative text-sm leading-[21px] text-black inline-block font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-rates-signatures-1318x573-default-1-inter-semi-bold-123">
                <b className="font-semibold">{nombre1}</b>
                <span className="font-normal">{apellido1}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default CompPermi;