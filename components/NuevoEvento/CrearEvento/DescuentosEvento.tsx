import { FC, useState } from "react";
import ModalDescuentos from "./Modales/ModalDescuento";
import { Modal } from "../../modals/Modal";
interface propsDescuentosEvento {
    componentState: any;
    setComponentState: any;
  
  }

const DescuentosEvento: FC <propsDescuentosEvento> = ({componentState,setComponentState}) => {

    const [addDescuento, setAddDescuento] = useState(false);

  return (
    <div className="w-[100%] bg-slate-100 flex flex-col items-start justify-start pt-0 px-0 pb-[58px] box-border gap-[37px] tracking-[normal] text-center font-semibold text-xs">
     
     <div className="self-stretch h-[] overflow-hidden flex flex-col items-start justify-start py-[3.5px] px-7 box-border">
        <div className="flex flex-row items-center justify-start">
          <div className="flex flex-col items-start justify-start text-black">
            <div className="w-full flex flex-row items-center justify-center pt-[4.800000000000182px] px-1 pb-[4.699999999999818px] box-border gap-[3.5px] ">
              
              <div className="flex flex-col items-center justify-start pt-[1.199999999999818px] px-0 pb-[2.800000000000182px]">
                <div className="h-2.5 flex flex-row items-start justify-start">
                  <img
                    className="h-2.5 w-[9.2px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/icon.svg"
                  />
                </div>
              </div>

              <div className="flex flex-col items-start justify-start">
                <div className="self-stretch flex flex-row items-center justify-start py-0 pr-[3.637978807091713e-12px] pl-0">
                  <div className="w-auto flex flex-col items-start justify-start py-0 pr-[3px] pl-0 box-border">
                    <div className="self-stretch flex flex-col items-center justify-start">
                      <b className="self-stretch h-3.5 relative leading-[14px] inline-block ">
                        <span className="uppercase">{`Mié. `}</span>20
                      </b>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start text-black">
                    <div className="w-auto flex flex-col items-center justify-start">
                      <div className="self-stretch h-3.5 relative leading-[14px] font-semibold inline-block ">
                        Playa y Rumba
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start text-left text-sm">
            <div className="w-auto h-[21px] relative leading-[21px] inline-block">
              /
            </div>
          </div>
          <div className="w-auto flex flex-col items-start justify-start text-black">
            <div className="w-full flex flex-row items-center justify-center pt-[4.800000000000182px] px-[5px] pb-[4.699999999999818px] box-border gap-[3.5px]">
              <div className="flex flex-col items-center justify-start pt-[1.199999999999818px] px-0 pb-[2.800000000000182px]">
                <div className="h-2.5 flex flex-row items-start justify-start">
                  <img
                    className="h-auto w-auto relative shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/sistem.svg"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-start">
                <div className="self-stretch h-3.5 relative leading-[14px] font-semibold inline-block">
                  Configuración
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start text-left text-sm text-gray-400">
            <div className="w-auto h-[21px] relative leading-[21px] inline-block">
              /
            </div>
          </div>
          <div className="self-stretch w-auto flex flex-col items-start justify-start text-gray-400">
            <div className="w-full flex flex-row items-center justify-center pt-[4.800000000000182px] px-[5px] pb-[4.699999999999818px] box-border gap-[3.34px]">
              <img
                className="h-auto w-auto"
                loading="lazy"
                alt=""
                src="ModuloEvento/porciento.svg"
              />
              <div className="flex flex-col items-center justify-start">
                <div className="self-stretch h-3.5 relative leading-[14px] font-semibold inline-block">
                  Descuentos
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="self-stretch flex flex-row items-start justify-start py-0 px-14 box-border max-w-full text-left text-7xl-3 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-ebony font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-discount-codes-16475x71625-default-inter-semi-bold-123">
        <div className="flex-1 flex flex-col items-end justify-start gap-[65px] max-w-full lg:gap-[32px]">
          <div className="self-stretch flex flex-row items-start justify-between max-w-full gap-[20px]">
            <div className="w-[351px] flex flex-col items-start justify-start py-0 pr-[7px] pl-0 box-border max-w-full">
              <div className="self-stretch overflow-hidden flex flex-col items-start justify-start">
                <div className="self-stretch flex flex-row items-center justify-start [row-gap:20px] mq416:flex-wrap">
                  
                  
                  <div onClick={()=>{ 
        setComponentState(3)
      }}
                  className="cursor-pointer flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                    <div className="w-[37px] h-[37px] rounded-9980xl flex flex-row items-center justify-center pt-[5.399999999999636px] px-[7px] pb-[5.300000000000182px] box-border">
                      <div className="flex flex-col items-start justify-start">
                        <div className="h-[26.3px] flex flex-row items-start justify-start">
                          <img
                            className="h-[26.3px] w-[23px] relative overflow-hidden shrink-0"
                            loading="lazy"
                            alt=""
                            src="ModuloEvento/FlechaIzquerda.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start justify-start py-0 pr-2.5 pl-0 box-border min-w-[193px] ml-[-0.01px] mq416:ml-0">
                    <div className="self-stretch overflow-hidden flex flex-col items-start justify-start">
                      <div className="w-auto h-[31.5px] relative leading-[31.5px] text-[16px] font-semibold inline-block max-h-[31.5px] mq416:text-2xl mq416:leading-[25px]">
                        Códigos de descuento
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-[10px] text-center text-sm text-primary-contrast">
              <div className="flex flex-col items-start justify-start">
                <div className="w-auto rounded-md bg-slate-200 box-border flex flex-row items-center justify-center pt-[6.300000000000182px] px-[9px] pb-[6.199999999999818px] max-w-[36px] ">
                  <div className="flex flex-col items-center justify-start pt-[3.699999999999818px] px-0 pb-[4.5px]">
                    <div className="h-[16.3px] flex flex-row items-start justify-start">
                      <img
                        className="h-[16.3px] w-[15.8px] relative overflow-hidden shrink-0"
                        loading="lazy"
                        alt=""
                        src="ModuloEvento/trespuntos.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div onClick={() => {setAddDescuento(!addDescuento)}}  className="cursor-pointer flex flex-col items-start justify-start">
                <div className="rounded-md bg-rosa flex flex-row items-center justify-start py-0 px-[10.5px]">
                  <div className="h-9 w-auto relative leading-[36px] font-medium flex items-center justify-center min-w-[43px] text-white">
                    Nuevo
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full text-center text-sm text-slategray">
            <div className="w-[438px] flex flex-col items-start justify-start gap-[14px] max-w-full">
              <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
                <div className="h-[126px] w-[126px] relative rounded-9980xl bg-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white">
                  <img
                    className="absolute top-[35.7px] left-[43.3px] w-[39.4px] h-[53px] overflow-hidden"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/porciento1.svg"
                  />
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[7px]">
                <div className="flex flex-row items-start justify-start py-0 px-[67px] mq416:pl-5 mq416:pr-5 mq416:box-border">
                  <div className="h-[21px] w-[304px] relative leading-[21px] font-semibold text-sm flex items-center justify-center text-gray-600">
                    No hay códigos de descuento en este evento
                  </div>
                </div>
                <div className="self-stretch h-[42px] relative leading-[21px] font-semibold text-sm text-gray-400 inline-block">
                  <p className="m-0">
                    Crea un código de descuento único para este evento o importa
                    un
                  </p>
                  <p className="m-0">
                    código de descuento ya creado de tu negocio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {
  addDescuento ? (
      <Modal  
      setOpenIcon="" 
      openIcon="" 
      classe={"w-[36%] h-[76%]"}>

          <ModalDescuentos addDescuento={addDescuento} setAddDescuento={setAddDescuento} />
      </Modal>
  ) :
      null
}
    </div>
  );
};

export default DescuentosEvento;