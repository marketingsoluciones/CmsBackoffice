import { FunctionComponent, memo } from "react";
import { Switch } from "@chakra-ui/react";

const ModoDemo: FunctionComponent = memo(() => {
  return (
        <div className="rounded-md bg-green-300 w-full overflow-hidden flex flex-row items-start justify-between py-1.5 px-4 box-border text-left text-green-900">
        <div className="flex flex-row items-start justify-start">
          <div className="flex flex-row items-start justify-start pr-3 pl-0">
{/*             <img
              className="relative w-[22px] h-[22px] overflow-hidden shrink-0 object-cover"
              alt=""
              src="/checkcircleoutlined@2x.png"
            /> */}
        <Switch
          className="h-[38px] w-[38px] pt-2"
          colorScheme="green"
          defaultChecked
          isRequired
        />
          </div>
          <div className="overflow-hidden flex flex-col items-start justify-start py-2 px-0 gap-[4px]">
            <div className="self-stretch relative tracking-[0.15px] leading-[150%] font-bold text-base">
              Modo demo Activo
            </div>
            <div className="self-stretch relative text-sm tracking-[0.17px] leading-[143%] font-medium">
              Puede visualizar el proceso de crear un evento y administrarlo
              completamente, con informes detallados entre otras funciones
              disponibles
            </div>
          </div>
        </div>
        <div className="overflow-hidden flex flex-row items-start justify-start pt-1 pb-0 pr-0 pl-4">
          <button className="cursor-pointer [border:none] p-1 bg-[transparent] rounded-m overflow-hidden flex flex-col items-center justify-center">
            <img
              className="relative w-5 h-5 overflow-hidden shrink-0"
              alt=""
              src="ModuloEvento/equis.svg"
            />
          </button>
        </div>
      </div>
  );
});

export default ModoDemo;