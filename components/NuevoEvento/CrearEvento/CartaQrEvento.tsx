import { Switch } from "@chakra-ui/react";
import { FC, useState } from "react";
import { SwichtC } from "../../ToolsComponents/Swicht";
interface propsCartaQrEvento {
    componentState: any;
    setComponentState: any;
  
  }

const CartaQrEvento: FC <propsCartaQrEvento> = ({componentState,setComponentState}) => {
  const [diveditingViewPortValue, setDiveditingViewPortValue] = useState("");
  return (
    <div className="w-full relative bg-whitesmoke-200 flex flex-col items-start justify-start pt-0 px-0 pb-[30px] box-border gap-[37px] tracking-[normal] text-center text-2xs-5 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-geyser font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-discount-codes-16475x71625-default-inter-semi-bold-123">
      
      <div className="self-stretch h-[] overflow-hidden flex flex-col items-start justify-start py-[3.5px] px-7 box-border text-xs">
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
                src="ModuloEvento/qr.svg"
              />
              <div className="flex flex-col items-center justify-start">
                <div className="self-stretch h-3.5 relative leading-[14px] font-semibold inline-block">
                  Carta QR
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="self-stretch flex flex-row items-start justify-start py-0 px-14 box-border max-w-full text-left text-7xl-3 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-ebony">
        <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq416:flex-wrap">
          <div className="flex flex-col items-start justify-start py-0 pr-[7px] pl-0">
            <div className="overflow-hidden flex flex-col items-start justify-start">
              <div className="flex flex-row items-center justify-start">
                
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
                <div className="flex flex-col items-start justify-start py-0 pr-[9px] pl-0 ml-[-0.01px]">
                  <div className="overflow-hidden flex flex-col items-start justify-start">
                    <div className="w-auto h-[31.5px] relative leading-[31.5px] font-semibold text-[16px] inline-block min-w-[116px]">
                      Carta QR
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[287.8px] flex flex-row items-start justify-start gap-[17px]">
            <div className="flex-1 rounded-md bg-slate-200 flex flex-row items-start justify-start pt-[1.300000000000182px] px-[1.2999999999992724px] pb-[1.3999999999996362px] shrink-0 [debug_commit:1cbd860] border-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white">
              <div className="flex flex-row items-start justify-start py-[8.5px] px-[10.5px] gap-[7px]">
                <div className="h-[15px] flex flex-col items-start justify-start pt-[1.699999999999818px] px-0 pb-0 box-border">
                  <img
                    className="w-3.5 h-[13.3px] relative overflow-hidden shrink-0 z-[2]"
                    alt=""
                    src="ModuloEvento/buscar.svg"
                  />
                </div>
                <input
                  className="[border:none] [outline:none] bg-[transparent] h-[17.3px] w-[180px] flex flex-row items-start justify-start pt-0 px-[0.4000000000014552px] pb-[0.3000000000001819px] box-border font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-discount-codes-16475x71625-default-inter-semi-bold-123 text-sm text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-gull-gray min-w-[108px] z-[1]"
                  placeholder="Buscar"
                  type="text"
                  value={diveditingViewPortValue}
                  onChange={(event) =>
                    setDiveditingViewPortValue(event.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start shrink-0 [debug_commit:1cbd860]">
              <div className="w-9 rounded-md bg-slate-200 box-border flex flex-row items-center justify-center pt-[6.300000000000182px] px-[9px] pb-[6.199999999999818px] max-w-[36px]">
                <div className="flex flex-col items-center justify-start pt-1 px-0 pb-[5.800000000000182px]">
                  <div className="h-[15px] flex flex-row items-start justify-start pt-0 px-0 pb-[0.1000000000003638px] box-border">
                    <img
                      className="h-[14.7px] w-[15.8px] relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      src="ModuloEvento/sisten.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="self-stretch flex flex-row items-start justify-start py-0 pr-[20px] pl-[20px] gap-4 box-border max-w-full text-left text-base text-black font-medium">
          
          <div className="w-[600px] rounded-md bg-white overflow-hidden shrink-0 flex flex-row items-center justify-between p-3.5 box-border gap-[20px]">
            <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[1.699999999999818px]">
              <div className="w-auto h-[24.5px] relative leading-[24.5px] inline-block min-w-[36px]">
                koko
              </div>
            </div>
            <div className="h-7 w-[49px] rounded-9980xl bg-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-mystic flex flex-row items-center justify-start py-[3.5px] pr-[24.5px] pl-[3.5px] box-border">
            <SwichtC/>
            </div>
          </div>

          <div className="rounded-md bg-white flex flex-col w-auto items-start justify-start p-7 box-border gap-[18px] text-xs text-gray-600 mq416:pt-5 mq416:pb-5 mq416:box-border mq416:min-w-full">

            <div className="w-auto h-[21px] relative leading-[21px] text-black font-semibold inline-block shrink-0">
              Configura la carta QR para este evento
            </div>
            <div className="self-stretch h-[1.3px] relative box-border border-t-[1.3px] border-solid border-slate-200" />
            <div className="w-auto h-[21px] relative leading-[21px] font-semibold text-gray-600 inline-block shrink-0">
              Código QR de tu carta
            </div>
            <img 
            className="w-[100%] h-[228px] rounded-md shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_rgba(0,_0,_0,_0.06)] flex flex-row items-start justify-start p-3.5 box-border" 
            loading="lazy"
            alt=""
            src="ModuloEvento/qr1.svg"
            />
            <div className="w-[100%] h-3.5 relative text-2xs-5 leading-[14px] inline-block shrink-0">
              Haz click en el QR para imprimirlo
            </div>
            <div className="flex flex-col items-start justify-start gap-[5px] max-w-full shrink-0">
              <div className="w-[100%] h-[21px] relative leading-[21px] font-semibold text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black inline-block">
                Link de la carta virtual
              </div>
              <div className="w-[100%] flex flex-row items-start justify-start gap-[5px] max-w-full mq416:flex-wrap">
                <div className="w-[100%] rounded-md bg-slate-200 flex flex-col items-start justify-start pt-[8.5px] pb-[8.799999999999272px] pr-[7px] pl-[10.5px] box-border max-w-full">
                  <div className="w-auto h-[17px] relative inline-block">
                    https://www.bodasdehoy.com/beach...
                  </div>
                </div>
                <div className="w-9 rounded-md bg-slate-200 box-border flex flex-row items-center justify-center pt-[6.300000000001091px] px-2.5 pb-[6.199999999998909px] max-w-[36px]">
                  <div className="flex flex-col items-center justify-start pt-1 px-0 pb-[5.799999999999272px]">
                    <div className="h-[14.7px] flex flex-row items-start justify-start">
                      <img
                        className="h-[14.7px] w-[13.8px] relative overflow-hidden shrink-0"
                        alt=""
                        src="ModuloEvento/copiar.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[100%] h-3.5 relative text-xs leading-[14px] inline-block max-w-full">
                Comparte este link para que tus clientes puedan visualizar la
                carta.
              </div>
            </div>
            <div className="self-stretch rounded-md bg-blue-100 flex flex-col items-start justify-start pt-[14.400000000001455px] px-3.5 pb-[13.099999999998545px] text-xs text-blue-600">
              <div className="self-stretch flex flex-row items-start justify-start gap-[7px]">
               
                  <img
                    className="w-auto h-auto pt-[4px] shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/info3.svg"
                  />
                
                <div className="h-auto w-[100%] relative leading-[18px] inline-block shrink-0">
                  Activa una carta QR desde la lista de cartas QR para que ésta
                  aparezca en la página principal del
                </div>
              </div>
              <div className="h-[17.5px] flex flex-row items-start justify-start pt-0 px-0 pb-0 box-border">
                <div className="mt-[-0.5px] h-[18px] w-[57px] relative leading-[18px] inline-block min-w-[57px]">
                  microsite.
                </div>
              </div>
            </div>
          </div>
      
      </section>
    </div>
  );
};

export default CartaQrEvento;
