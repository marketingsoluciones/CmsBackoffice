import { FC, memo } from "react";

export type MensajesCType = {
  sVG?: string;
  cntrateEnLasVentas?: string;
  organizaTodasLas?: string;
  comunicacionesConLos?: string;
  clientesEnUnSoloLugar?: string;
};

const MensajesC: FC<MensajesCType> = memo(
  ({
    sVG,
    cntrateEnLasVentas,
    organizaTodasLas,
    comunicacionesConLos,
    clientesEnUnSoloLugar,
  }) => {
    return (
      <div className="flex-1 flex flex-col items-start justify-start pt-6 px-0 pb-4 box-border gap-[24px] min-w-[150px] text-center text-base text-[#21232C] font-carbonaphrd-pipedrive-com-leads-messaging-1318x573-default-inter-semi-bold-14">
        <div className="self-stretch h-[85px] flex flex-col items-center justify-start pt-0 px-10 pb-[5px] box-border">
          <img
            className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover"
            loading="lazy"
            alt=""
            src={sVG}
          />
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
          <div className="self-stretch flex flex-col items-center justify-start py-0 px-[13px]">
            <div className="w-full relative leading-[24px] font-semibold inline-block max-w-[200px]">
              {cntrateEnLasVentas}
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center justify-start py-0 px-[19.5px] text-sm-9 text-gray-400">
            <div className="w-full relative leading-[21px] font-medium inline-block max-w-[200px]">
              <p className="m-0">{organizaTodasLas}</p>
              <p className="m-0">{comunicacionesConLos}</p>
              <p className="m-0">{clientesEnUnSoloLugar}</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default MensajesC;
