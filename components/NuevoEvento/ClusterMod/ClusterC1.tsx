import { FunctionComponent, memo, useMemo, type CSSProperties } from "react";

type FrameComponentType = {
  group3338?: string;

  /** Style props */
  propLeft?: CSSProperties["left"];
};

const ClusterC1: FunctionComponent<FrameComponentType> = memo(
  ({ group3338, propLeft }) => {
    const frameDivStyle: CSSProperties = useMemo(() => {
      return {
        left: propLeft,
      };
    }, [propLeft]);

    return (
      <div
        className="h-[144.4px] w-[263px] my-0 mx-[!important] absolute top-[0px] left-[8px] flex flex-col items-start justify-start pt-0 px-0 pb-[94.60000000000218px] box-border gap-[10px] text-left text-base text-rosa font-poppins"
        style={frameDivStyle}
      >
        <div className="self-stretch h-[49.8px] flex flex-row items-start justify-start py-0 pr-px pl-0 box-border gap-[10px] shrink-0 [debug_commit:f6aba90]">
          <img
            className="h-[39.8px] w-10 relative"
            loading="lazy"
            alt=""
            src={group3338}
          />
          <div className="h-[49.8px] flex-1 relative leading-[25px] text-xs font-semibold inline-block">
            Captación conjunta de Leads
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-end text-xs text-azul">
          <div className="h-[84.7px] w-[233px] relative leading-[25px] flex items-center shrink-0 [debug_commit:f6aba90]">
            Aumenta la potencia de tus resultados al hacer pujas en conjunto con
            otros profesionales.
          </div>
        </div>
      </div>
    );
  },
);

export default ClusterC1;
