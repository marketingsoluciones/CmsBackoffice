import { Switch } from "@chakra-ui/react";
import { FC, useState } from "react";
import { SwichtC } from "../../ToolsComponents/Swicht";
import { useRouter } from 'next/router';
import ModoDemo from "../Principal/ModoDemo";
interface propsCartaQrEvento {
    componentState: any;
    setComponentState: any;
  
  }

const CartaQrEvento: FC <propsCartaQrEvento> = ({componentState,setComponentState}) => {
  const [diveditingViewPortValue, setDiveditingViewPortValue] = useState("");
    const router = useRouter()
  return (
    <div className="w-[100%] h-[100vh] flex flex-col items-start justify-start overflow-auto px-5 py-5 box-border gap-[37px] tracking-[normal] text-center">
      <div className="flex items-center justify-center">
        <ModoDemo />
      </div>
      <div className="self-stretch w-full  flex flex-row items-center justify-between  box-border max-w-full text-left">
      

              
              <div className="flex flex-row items-center justify-start">
                
                <div onClick={() => { router.push("/events/configure-event") }}

                className="cursor-pointer flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">

                      
                      <div className="h-[26.3px] flex flex-row items-start justify-start">
                        <img
                          className="h-[26.3px] w-[23px] relative overflow-hidden shrink-0"
                          loading="lazy"
                          alt=""
                          src="/ModuloEvento/FlechaIzquerda.svg"
                        />
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


          <div className="w-auto flex flex-row items-center justify-start gap-[17px]">
           
            <div className="rounded-md bg-slate-200 flex flex-row items-start justify-start ">
              <div className="flex flex-row items-start justify-start py-[8.5px] px-[10.5px] gap-[7px]">
                <div className="h-[15px] flex flex-col items-start justify-start pt-[1.699999999999818px] px-0 pb-0 box-border">
                  <img
                    className="w-3.5 h-[13.3px] relative overflow-hidden shrink-0 z-[2]"
                    alt=""
                    src="/ModuloEvento/buscar.svg"
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


                  <div className="w-8 h-8 rounded-md bg-slate-200 flex items-center justify-center">
                    <img
                      className="h-[14.7px] w-[15.8px] relative shrink-0"
                      loading="lazy"
                      alt=""
                      src="/ModuloEvento/sisten.svg"
                    />
                  </div>


          </div>
        
      </div>

      <section className="w-auto  flex flex-row items-start justify-start py-5 px-6 gap-4 box-border max-w-full text-left text-base text-black font-medium">
          
          <div className="w-full rounded-md bg-white overflow-hidden flex flex-row items-center justify-between p-3.5 gap-[20px]">
            
              <div className="w-auto h-[24.5px] relative leading-[24.5px] inline-block min-w-[36px]">
                koko
              </div>
            
            <div className="h-7 w-[49px] flex items-center justify-start">
            <SwichtC/>
            </div>
          </div>

          <div className="w-full rounded-md bg-white flex flex-col items-start justify-start p-7 box-border gap-[18px] text-xs text-gray-600">

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
            src="/ModuloEvento/qr1.svg"
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
