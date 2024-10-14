import { FC } from "react";
import TabTarifas from "./TabTarifas";
import { ButtonEventsBack } from "../../Events/ButtonEventsBack";
import { useRouter } from 'next/router';
import ModoDemo from "../Principal/ModoDemo";
interface propsDatosLimitesTL {
  componentState: any;
  setComponentState: any;

}

const DatosLimiteTL: FC <propsDatosLimitesTL> = ({componentState, setComponentState}) => {
const router = useRouter()
  return (
    <div className="w-full h-[90vh] flex flex-col items-start justify-start overflow-auto py-7 px-4 box-border gap-[37px] tracking-[normal] text-center">
      
      <div className="flex items-center justify-center">
        <ModoDemo />
      </div>


      <div className="self-stretch flex flex-row items-start justify-start py-0 px-14 box-border max-w-full text-left text-xl text-gray-600">
        <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq450:flex-wrap">
          
        <ButtonEventsBack text="Datos Adicionales" onClick={() => { router.push("/events/create-list")}}/>

          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-col items-start justify-start">
              <div className="w-9 rounded-md bg-slate-200 box-border flex flex-row items-center justify-center pt-[6.300000000000182px] px-[9px] pb-[6.199999999999818px] max-w-[36px] border-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-mystic">
                <div className="flex flex-col items-center justify-start pt-1 px-0 pb-[5.800000000000182px]">
                  <div className="h-[15px] flex flex-row items-start justify-start pt-0 px-0 pb-[0.1000000000003638px] box-border">
                    <img
                      className="h-[14.7px] w-[15.8px] relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      src="/ModuloEvento/trespuntos.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <section className="w-full flex flex-row items-start justify-start py-0 px-14 box-border max-w-full text-sm ">
      <TabTarifas componentState={componentState} setComponentState={setComponentState}/>

      </section>
    </div>
  );
};

export default DatosLimiteTL;