import { FC, useState } from "react";
import ModalTarifasListas from "./Modales/ModalTarifasListas";
import { Modal } from "../../modals/Modal";
import ModoDemo from "../Principal/ModoDemo";
import { useRouter } from 'next/router';
import { ButtonEventsBack } from "../../Events/ButtonEventsBack";
import { ButtonEvents } from "../../Events/ButtonEvents";
interface propsCrearTarifaListas {
    componentState: any;
    setComponentState: any;
  
  }

const CrearTarifaListas: FC <propsCrearTarifaListas> = ({componentState, setComponentState}) => {
  const router = useRouter()
  const [inputValue, setInputValue] = useState("");

  const [addAñaO, setAddAñaO] = useState(false);

  return (
    <div className="w-full h-[95vh] bg-whitesmoke-200 flex flex-col items-center justify-start overflow-auto py-7 px-4 box-border gap-[37px] tracking-[normal] text-center text-2xs-5 text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-geyser font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-rates-guest-list-create-16475x71625-default-1-inter-semi-bold-123">

      <div className="flex items-center justify-center">
        <ModoDemo />
      </div>

      <div className="self-stretch flex flex-row items-start justify-between py-0 px-14 box-border max-w-full text-left">
        

<ButtonEventsBack text="Tarifas Listas" onClick={() => { router.push("/events/list")}} />

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

        
        <div className="w-auto rounded-md bg-white shadow-md flex flex-col items-center justify-start py-5 px-5 text-xs box-border gap-[38px] max-w-full ">
          
          <div className="self-stretch flex flex-row items-start justify-end py-0 px-[7px] box-border max-w-full">
            <div className="flex-1 flex flex-col items-start justify-start gap-[8.4px] max-w-full">
              <div className="w-[54px] h-[21px] relative leading-[21px] font-semibold inline-block min-w-[54px]">
                Nombre
              </div>
              <input
                className="[outline:none] bg-slate-200 self-stretch h-12 relative rounded-md box-border min-w-[250px] pl-4 "
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
              <div className="w-[31px] h-[21px] relative leading-[21px] font-semibold inline-block min-w-[31px]">
                Tipo
              </div>
              <div className="self-stretch flex flex-row items-start justify-center py-0 pr-0.5 pl-0 gap-[5px] ">
                <div className="rounded-md bg-green-600 flex flex-row items-start justify-start w-[100%] py-0 px-[10.5px] box-border gap-[9.5px] min-w-[141px]">
                  <div className="w-[11px] flex flex-col items-start justify-start pt-[9px] px-0 pb-0 box-border">
                    <div className="self-stretch h-3.5 relative leading-[14px] pt-[2px] inline-block">
                      <img src="/ModuloEvento/mundo.svg" alt="" />
                    </div>
                  </div>
                  <div className="h-9 w-auto relative leading-[36px] font-medium text-white inline-block min-w-[49px]">
                    Pública
                  </div>
                </div>
                <div className="rounded-md bg-slate-200 flex flex-row items-start justify-start w-[100%] py-0 px-[10.5px] box-border gap-[10px] min-w-[141px] text-gray-600">
                  <div className="w-[12px] flex flex-col items-start justify-start pt-[12px] px-0 pb-0 box-border">
                    <div className="self-stretch h-3.5 relative leading-[14px]  inline-block">
                      <img src="/ModuloEvento/libro.svg" alt="" />
                    </div>
                  </div>
                  <div className="h-9 w-[58px] relative leading-[36px] font-medium inline-block min-w-[58px]">
                    Limitada
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-col items-start justify-start gap-[15.5px]">
            <div className="w-[65px] h-[21px] relative leading-[21px] font-semibold inline-block min-w-[65px]">
              Opciones
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[10.45px] text-smi-3 text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-gull-gray">
              <div className="self-stretch h-[1.3px] relative box-border border-t-[1.3px] border-solid border-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-catskill-white" />
              
              <div className="self-stretch overflow-hidden flex flex-row flex-wrap items-start justify-start gap-[3.9px]">
                <div className="flex flex-col items-start justify-start">
                  <div className="flex flex-row items-start justify-start gap-[3.4px] shrink-0 [debug_commit:2554057]">
                    <div className="h-[13.8px] flex flex-col items-start justify-start pt-[1.2999999999992724px] px-0 pb-0 box-border">
                      <img
                        className="w-[12.3px] h-[12.5px] relative overflow-hidden shrink-0"
                        loading="lazy"
                        alt=""
                        src="/ModuloEvento/relog3.svg"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-start py-0 pr-[9.599999999998545px] pl-0">
                      <div className="w-[85px] h-[18px] relative leading-[18px] inline-block min-w-[85px] whitespace-nowrap text-gray-600">{` 23:00 - 06:30 `}</div>
                    </div>
                    <div className="flex flex-col items-start justify-start pt-[1.2999999999992724px] px-0 pb-0 text-mediumslateblue font-pro-fourvenues-com-beach-aguilas-dlsj9ud510272017c1tbi7y1lvzlroll-settings-rates-guest-list-create-16475x71625-default-1-font-awesome-5-free-regular-14">
                      <div className="w-[11px] h-[13px] relative leading-[12.25px] inline-block min-w-[11px] whitespace-nowrap">
                      <img src="/ModuloEvento/generos.svg" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="h-[20.5px] flex flex-row items-start justify-start pt-0 px-0 pb-0 box-border text-sm text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-black">
                    <div className="mt-[-0.5px] h-[21px] w-[131px] relative leading-[21px] inline-block shrink-0 [debug_commit:2554057]">
                      <b>{`10 € `}</b>
                      <span className="text-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-gull-gray">
                        solo la entrada
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-start justify-start min-w-[187px]">
                  <b className="w-[23px] h-[18px] relative leading-[18px] inline-block min-w-[23px] whitespace-nowrap text-gray-400">
                    +18
                  </b>
                </div>
                <div className="flex flex-col items-start justify-start pt-[1.2999999999992724px] px-0 pb-0">
                      <div className="rounded-6xs flex flex-col items-center justify-start pt-2.5 px-[10.5px] pb-[12.200000000000728px]">
                        <div className="h-[13.8px] flex flex-row items-start justify-start">
                          <img
                            className="h-[13.8px] w-[8.8px] relative overflow-hidden shrink-0"
                            loading="lazy"
                            alt=""
                            src="/ModuloEvento/equis1.svg"
                          />
                        </div>
                  </div>
                </div>
              </div>

              
              <div className="self-stretch flex flex-col items-start justify-start gap-[5px] text-sm">
                <div className="self-stretch h-[1.3px] relative box-border shrink-0 [debug_commit:2554057] border-t-[1.3px] border-solid border-slate-200" />
                <div onClick={() => setAddAñaO(!addAñaO)}
                className="cursor-pointer bg-red-100 self-stretch bg-ivory flex flex-row items-start justify-start py-[10.5px] px-[21px] gap-[10.5px] shrink-0 [debug_commit:2554057]">
                  <div className="h-[15.6px] flex flex-col items-start justify-start pt-[5.300000000001091px] px-0 pb-0 box-border">
                    <img className="w-[10.3px] h-[10.3px] relative" alt="" src="/ModuloEvento/mas1.svg" />
                  </div>
                  <div className="h-[21px] w-[92px] relative leading-[21px] inline-block min-w-[92px] text-gray-400 font-medium">
                    Añadir opción
                  </div>
                </div>
              </div>
            </div>
          </div>
      <ButtonEvents text="Guardar" onClick={() => { router.push("/events/date-list")}}/>
        </div>
        
      

      {
  addAñaO ? (
      <Modal  
      setOpenIcon="" 
      openIcon="" 
      classe={"w-[32%] h-[86%]"}>

          <ModalTarifasListas addAñaO={addAñaO} setAddAñaO={setAddAñaO} />
      </Modal>
  ) :
      null
}
    </div>
  );
};

export default CrearTarifaListas;
