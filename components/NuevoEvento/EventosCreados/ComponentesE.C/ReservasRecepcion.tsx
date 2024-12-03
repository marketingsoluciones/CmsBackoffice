import { FC } from "react";
import ComponentR from "./ComponentR";
import ReservationSystem from "../ReservaCompo/Reservas1";
import UserEdit2 from "../ReservaCompo/ModalUsuarios1";
import { Avatar } from "@chakra-ui/react";
interface propsReservasRecepcion {
    componentState: any;
    setComponentState: any;
  
  }

const ReservasRecepcion: FC<propsReservasRecepcion> = ({componentState, setComponentState}) => {

  return (
    <div className="w-full relative flex flex-col items-start justify-start py-6 px-6 box-border gap-[20px] min-h-[493px] tracking-[normal] leading-[normal] text-left text-7xl-3 text-black font-semibold">
    <div className="flex flex-row items-center justify-start py-0 pr-5 pl-0 gap-3">
        

        <div onClick={() => {
          setComponentState(12)
        }} className="cursor-pointer flex flex-row items-center justify-center pt-[4.5px] px-[3.9px] pb-[5.5px]">
              <img
                className="h-[27px] w-[23px] relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/ModuloEvento/vectorF.svg"
              />
           
      </div>
          <div className="relative leading-[32px] font-semibold inline-block min-w-[76px] mq450:text-2xl mq450:leading-[25px]">
            Reservas
          </div>
    </div>
    <ReservationSystem/>
    </div>
  );
};

export default ReservasRecepcion;
