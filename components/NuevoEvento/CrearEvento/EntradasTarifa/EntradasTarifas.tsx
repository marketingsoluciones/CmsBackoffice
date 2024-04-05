import { FC, useState } from "react";
import { Modal } from "../../../modals/Modal";
import ModalPrecio from "./Sub-Componentes/ModalPrecio";
interface propsEntradasTarifa {
  componentState: any;
  setComponentState: any;

}

const EntradasTarifa: FC <propsEntradasTarifa> = ({componentState, setComponentState}) => {
  const [addAñadirPrecio, setAddAñadirPrecio] = useState(false);
  return (
    <div className="w-full relative bg-slate-100 flex flex-col items-start justify-start pt-0 px-0 pb-[73px] box-border tracking-[normal] text-left text-7xl-3 text-black font-semibold">
      
      <div className="self-stretch w-full flex flex-row items-center justify-start max-w-full px-14 py-10 gap-2">
                      <div onClick={()=>{ 
        setComponentState(3)
      }}
                       className=" cursor-pointer w-[37px] h-[37px] flex flex-row items-center justify-center pt-[5.400000000001455px] px-[7px] pb-[5.599999999998545px] box-border">
                            <img
                              className="h-[26px] w-[23px] relative overflow-hidden shrink-0"
                              loading="lazy"
                              alt=""
                              src="ModuloEvento/FlechaIzquerda.svg"
                            />
                    </div>

                        <div className="relative leading-[31.5px] font-semibold inline-block max-h-[31.5px] mq675:text-2xl mq675:leading-[25px]">
                          Crear tarifa de entrada
                        </div>

      </div>

      <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full text-sm text-black">
        <div className="w-auto rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-col items-end justify-start py-7 px-0 box-border gap-[28px] max-w-full mq800:pt-5 mq800:pb-5 mq800:box-border">
          <div className="self-stretch flex flex-row items-start justify-end py-0 px-7 box-border max-w-full">
            <div className="flex-1 flex flex-col items-start justify-start gap-[7px] max-w-full">
              <div className="relative leading-[21px] font-semibold inline-block min-w-[54px]">
                Nombre
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[10.5px]">
                <input
                  className="[outline:none] bg-slate-100 px-3 self-stretch h-[47.5px] relative rounded-[5.25px] box-border min-w-[250px] border-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-catskill-white"
                  type="text"
                />
                <div className="self-stretch flex flex-col items-start justify-start">
                  <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[7px]">
                    <div className="relative leading-[21px] font-semibold inline-block min-w-[31px]">
                      Tipo
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-[3px] pl-0 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-nero font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-1-font-awesome-5-free-regular-14">
                    
                    <div className="flex-[0.9732] flex flex-col items-start justify-start py-0 pr-1.5 pl-0 box-border min-w-[90px]">
                      <div className="self-stretch flex flex-col items-start justify-start">
                        <div className="self-stretch rounded-md bg-green-600 flex flex-row items-center justify-start py-0 pr-[137px] pl-[10.5px] gap-[9.6px]">
                          <div className="h-3.5 w-[11px] relative leading-[14px] flex items-center">
                           <img src="ModuloEvento/mundo.svg" alt="" />
                          </div>
                          <div className="relative leading-[36px] font-medium text-white inline-block min-w-[49px]">
                            Pública
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col items-start justify-start min-w-[87px] ml-[-2px] text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-gull-gray">
                      <div className="self-stretch rounded-md bg-slate-200 flex flex-row items-center justify-start py-0 pr-[127px] pl-[10.5px] gap-[10px]">
                        <div className="h-3.5 w-[11px] relative leading-[14px] flex items-center">
                          <img src="ModuloEvento/libro5.svg" alt="" />
                        </div>
                        <div className="relative leading-[36px] font-medium font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-ebony inline-block min-w-[58px]">
                          Limitada
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[10.5px] box-border gap-[10.5px] max-w-full">
            
            <div className="self-stretch flex flex-col items-start justify-start gap-[7px] max-w-full">
              <div className="flex flex-row items-start justify-start py-0 px-[21px]">
                <div className="relative leading-[21px] font-semibold inline-block min-w-[51px]">
                  Precios
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[10.5px] max-w-full">
                <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-catskill-white">
                  <div className="absolute top-[0px] left-[0px] box-border w-full h-full hidden border-t-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-catskill-white" />
                  <div className="absolute top-[1px] left-[0px] w-px h-px hidden" />
                </div>
                <div className="self-stretch flex flex-row items-start justify-start py-0 px-[21px] box-border max-w-full">
                  <div className="flex-1 flex flex-row flex-wrap items-center justify-start py-0 px-0 box-border max-w-full [row-gap:20px]">
                    <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border min-w-[277px] max-w-full">
                      <div className="self-stretch flex flex-col items-start justify-start">
                        <div className="self-stretch flex flex-col items-start justify-start">
                          <div className="relative leading-[21px]">
                            <b>{`10 € `}</b>
                            <span className="text-gray-400">
                              solo la entrada
                            </span>
                          </div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start text-2xs-5 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-gull-gray">
                          <div className="relative leading-[14px] text-gray-400 font-normal">
                            Hasta 1000 entradas, o hasta el final del evento
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start">
                      <div className="flex flex-row items-start justify-end">
                        <div className="rounded-6xs flex flex-col items-center justify-start py-[11px] px-[10.5px]">
                          <div className="h-3.5 flex flex-row items-start justify-start">
                            <img
                              className="h-3.5 w-[8.8px] relative overflow-hidden shrink-0"
                              loading="lazy"
                              alt=""
                              src="ModuloEvento/equis1.svg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          <div onClick={() => {setAddAñadirPrecio(!addAñadirPrecio)}}
           className="cursor-pointer w-full h-full items-center justify-center">
            <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-slate-200" />
            <div className="flex flex-row bg-orange-100 w-full h-full items-start justify-start py-[10px] px-[21px] text-gray-400 ">
              <div className="flex flex-row items-end justify-start gap-[10.5px]">
                <div className="h-[17px] flex flex-col items-start justify-end pt-0 px-0 pb-[3px] box-border">
                  <img
                    className="w-[10.5px] h-3.5 relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/mas1.svg"
                  />
                </div>
                <div className="relative leading-[21px] inline-block min-w-[88px]">
                  Añadir precio
                </div>
              </div>
            </div>
            <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-slate-200" />
            </div>

          </div>

          <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
            <button onClick={()=>{ 
        setComponentState(14)
      }}
            className="cursor-pointer [border:none] pt-[9.5px] pb-[11px] pr-[10.200000000004366px] pl-[10.299999999995634px] bg-rosa hover:opacity-100 rounded-md flex flex-row items-start justify-start opacity-[0.5] hover:bg-crimson-100">
              <div className="w-[68px] relative text-mid-5 leading-[25px] font-medium text-white text-center flex items-center justify-center min-w-[68px]">
                Guardar
              </div>
            </button>
          </div>
        </div>
      </div>
      {
  addAñadirPrecio ? (
      <Modal  
      setOpenIcon="" 
      openIcon="" 
      classe={"w-[46%] h-[86%]"}>

          <ModalPrecio addAñadirPrecio={addAñadirPrecio} setAddAñadirPrecio={setAddAñadirPrecio} />
      </Modal>
  ) :
      null
}
    </div>
  );
};

export default EntradasTarifa;
