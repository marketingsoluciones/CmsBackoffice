import { FC, useState } from "react";
import MyButton from "../MyButton";

interface propsAsistenteC {
    componentState: any;
    setComponentState: any;
  
  }

const AsistenteC: FC <propsAsistenteC> = ({componentState, setComponentState}) => {
    const [ischecked1, setCheck1] = useState(false);
    const [ischecked2, setCheck2] = useState(false);
  return (
    <div className="w-[100%] max-w-full flex flex-row items-start justify-start tracking-[normal] text-left text-sm text-black font-semibold">
      <div className="flex-1 rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start pt-[21px] pb-[10.5px] pr-[20.89999999999418px] pl-[21px] box-border gap-[7px] max-w-full">
        <div className="self-stretch flex flex-row flex-wrap items-start justify-start pt-0 px-0 pb-[10.5px] box-border gap-[10.5px] max-w-full">
          <div className="flex-1 flex flex-col items-start justify-start gap-[5.25px] min-w-[307px] max-w-full">
            <div className="relative leading-[21px] font-semibold inline-block min-w-[119px]">
              Recabar datos de
            </div>
            <div className="self-stretch flex flex-row items-start justify-start gap-[10.5px] text-gray-600 font-medium mq675:flex-wrap">
              
            <MyButton texto={"Sólo comprador"} ischecked={ischecked1} setCheck={setCheck1}/>
      <MyButton texto={"Todos los asistentes"} ischecked={ischecked2} setCheck={setCheck2}/>

            </div>
            <div className="relative text-xs leading-[14px] text-gray-400 font-normal inline-block max-w-full">
              Se pedirá los datos de cada asistente. Cada persona llevará una
              entrada con su nombre
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[7px] min-w-[307px] max-w-full">
            <div className="relative leading-[21px] font-semibold inline-block min-w-[70px]">
              Preguntas
            </div>
            <div className="self-stretch rounded-md bg-slate-100 flex flex-row items-end justify-start py-[11.5px] px-[22px] gap-[10.5px] text-gray-600 border-[1px] border-solid border-slate-200">
              <div className="h-[17px] flex flex-col items-start justify-end pt-0 px-0 pb-[3px] box-border">
                <img
                  className="w-[10.5px] h-3.5 relative overflow-hidden shrink-0"
                  alt=""
                  src="ModuloEvento/mas1.svg"
                />
              </div>
              <div className="relative leading-[21px] inline-block min-w-[107px]">
                Añadir pregunta
              </div>
            </div>
          </div>
        </div>
        <div className="w-[471.8px] flex flex-col items-start justify-start gap-[7px] max-w-full">
          <div className="relative leading-[21px] font-semibold inline-block min-w-[40px]">
            Datos
          </div>
          <div className="self-stretch flex flex-row flex-wrap items-center justify-start [row-gap:20px] text-center text-2xs-5">
            <div className="flex-1 flex flex-col items-start justify-start pt-[5px] px-0 pb-0.5 box-border min-w-[196px] text-left">
              <b className="relative leading-[14px] inline-block min-w-[43px]">
                Campos
              </b>
            </div>
            <div className="w-auto flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border">
              <div className="self-stretch flex flex-col items-center justify-start pt-[5px] pb-0.5 pr-[26.400000000001455px] pl-[26.599999999998545px]">
                <b className="w-full relative leading-[14px] inline-block min-w-[27px] max-w-[80px]">
                  Pedir
                </b>
              </div>
            </div>
            <div className="w-auto flex flex-col items-center justify-start pt-[5px] pb-0.5 pr-[10.900000000001455px] pl-[11.099999999998545px] box-border">
              <b className="w-full relative leading-[14px] inline-block min-w-[58px] max-w-[80px]">
                Obligatorio
              </b>
            </div>
          </div>
        </div>

        <div className="w-[471.8px] flex flex-col items-start justify-start max-w-full text-center font-medium">
          
          <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[7px] box-border max-w-full text-black font-medium">
            <div className="flex-1 flex flex-row flex-wrap items-center justify-start shrink-0 [debug_commit:f6aba90]">
              <div className="flex-1 flex flex-col items-start justify-start min-w-[196px] text-left text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-black font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263">
                <div className="relative leading-[21px] inline-block min-w-[53px]">
                  Nombre
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px]">
                  <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                    <img src="ModuloEvento/cc.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px]">
                  <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                  <img src="ModuloEvento/cc.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[7px] box-border max-w-full mt-[-10.5px] text-black font-medium">
            <div className="flex-1 flex flex-row flex-wrap items-center justify-start shrink-0 [debug_commit:f6aba90] z-[1]">
              <div className="flex-1 flex flex-col items-start justify-start min-w-[196px] text-left text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-black font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263">
                <div className="relative leading-[21px] inline-block min-w-[36px]">
                  Email
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px] opacity-[0.5]">
                  <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                  <img src="ModuloEvento/cc1.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px] opacity-[0.5]">
                  <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                  <img src="ModuloEvento/cc1.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[7px] box-border max-w-full mt-[-10.5px] text-black font-medium">
            <div className="flex-1 flex flex-row flex-wrap items-center justify-start shrink-0 [debug_commit:f6aba90] z-[2]">
              <div className="flex-1 flex flex-col items-start justify-start min-w-[196px] text-left text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-black font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263">
                <div className="relative leading-[21px] inline-block min-w-[58px]">
                  Teléfono
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px]">
                  <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                  <img src="ModuloEvento/cc.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px]">
                  <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                  <img src="ModuloEvento/cc.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[7px] box-border max-w-full mt-[-10.5px]">
            <div className="flex-1 flex flex-row flex-wrap items-center justify-start shrink-0 [debug_commit:f6aba90] z-[3]">
              <div className="flex-1 flex flex-col items-start justify-start min-w-[196px] text-left text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-black font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263">
                <div className="relative leading-[21px]">
                  Fecha de nacimiento
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px]">
                  <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                  <img src="ModuloEvento/cc2.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px]">
                  <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                  <img src="ModuloEvento/cc2.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[7px] box-border max-w-full mt-[-10.5px]">
            <div className="flex-1 flex flex-row flex-wrap items-center justify-start shrink-0 [debug_commit:f6aba90] z-[4]">
              <div className="flex-1 flex flex-col items-start justify-start min-w-[196px] text-left text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-black font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263">
                <div className="relative leading-[21px] inline-block min-w-[49px]">
                  Género
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px]">
                  <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                    <img src="ModuloEvento/cc2.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px]">
                  <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                  <img src="ModuloEvento/cc2.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[7px] box-border max-w-full mt-[-10.5px]">
            <div className="flex-1 flex flex-row flex-wrap items-center justify-start shrink-0 [debug_commit:f6aba90] z-[5]">
              <div className="flex-1 flex flex-col items-start justify-start min-w-[196px] text-left text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-black font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263">
                <div className="relative leading-[21px] inline-block min-w-[63px]">
                  Dirección
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px]">
                  <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                    <img src="ModuloEvento/cc2.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px]">
                  <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                  <img src="ModuloEvento/cc2.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[7px] box-border max-w-full mt-[-10.5px]">
            <div className="flex-1 flex flex-row flex-wrap items-center justify-start shrink-0 [debug_commit:f6aba90] z-[6]">
              <div className="flex-1 flex flex-col items-start justify-start min-w-[196px] text-left text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-black font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263">
                <div className="relative leading-[21px] inline-block min-w-[28px]">
                  País
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px]">
                  <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                    <img src="ModuloEvento/cc2.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px]">
                  <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                  <img src="ModuloEvento/cc2.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[7px] box-border max-w-full mt-[-10.5px]">
            <div className="flex-1 flex flex-row flex-wrap items-center justify-start shrink-0 [debug_commit:f6aba90] z-[7]">
              <div className="flex-1 flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border min-w-[196px] text-left text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-black font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263">
                <div className="self-stretch flex flex-col items-start justify-start pt-0 pb-px pr-0 pl-3.5">
                  <div className="relative leading-[21px] inline-block min-w-[92px]">
                    Código postal
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[3.5px] mt-[-1px] text-xs text-gray-400">
                    <div className="relative leading-[14px]">
                      Disponible si se solicita el país
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
                <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px] opacity-[0.5]">
                  <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                    <img src="ModuloEvento/cc2.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px] opacity-[0.5]">
                  <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                  <img src="ModuloEvento/cc2.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-row items-center justify-between shrink-0 [debug_commit:f6aba90] z-[8] mt-[-10.5px] text-left text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-black font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263 mq675:flex-wrap">
            <div className="w-[301.3px] flex flex-col items-start justify-start">
              <div className="relative leading-[21px]">
                Número de identificación
              </div>
            </div>
            <div className="flex flex-col items-start justify-start text-center text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-gull-gray font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-1-font-awesome-5-free-regular-14">
              <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px]">
                <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                  <img src="ModuloEvento/cc2.svg" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-20 pl-0 shrink-0 [debug_commit:f6aba90] z-[9] mt-[-10.5px] text-left text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-black font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263 mq675:pr-10 mq675:box-border">
            <div className="flex-1 flex flex-col items-start justify-start py-0 px-3.5 box-border min-w-[196px]">
              <div className="relative leading-[21px] inline-block min-w-[33px]">
                · DNI
              </div>
            </div>
            <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 text-center text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-gull-gray font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-1-font-awesome-5-free-regular-14">
              <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px]">
                <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                <img src="ModuloEvento/cc2.svg" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-20 pl-0 shrink-0 [debug_commit:f6aba90] z-[10] mt-[-10.5px] text-left text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-black font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263 mq675:pr-10 mq675:box-border">
            <div className="flex-1 flex flex-col items-start justify-start py-0 px-3.5 box-border min-w-[196px]">
              <div className="relative leading-[21px] inline-block min-w-[31px]">
                · NIE
              </div>
            </div>
            <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 text-center text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-gull-gray font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-1-font-awesome-5-free-regular-14">
              <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px]">
                <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                <img src="ModuloEvento/cc2.svg" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-20 pl-0 shrink-0 [debug_commit:f6aba90] z-[11] mt-[-10.5px] text-left text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-black font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263 mq675:pr-10 mq675:box-border">
            <div className="flex-1 flex flex-col items-start justify-start py-0 px-3.5 box-border min-w-[196px]">
              <div className="relative leading-[21px] inline-block min-w-[76px]">
                · Pasaporte
              </div>
            </div>
            <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 text-center text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-gull-gray font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-1-font-awesome-5-free-regular-14">
              <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px]">
                <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                <img src="ModuloEvento/cc2.svg" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-20 pl-0 shrink-0 [debug_commit:f6aba90] z-[12] mt-[-10.5px] text-left text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-black font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-1318x573-default-inter-semi-bold-263 mq675:pr-10 mq675:box-border">
            <div className="flex-1 flex flex-col items-start justify-start py-0 px-3.5 box-border min-w-[196px]">
              <div className="relative leading-[21px] inline-block min-w-[37px]">
                · Otro
              </div>
            </div>
            <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 text-center text-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-3-gull-gray font-pro-fourvenues-com-beach-aguilas-ulrusb7uo018901aehsqqgeimfewd8b6-settings-rates-tickets-mlruscyfl014j01bne3ezei4j2izzbrh-1318x573-default-1-font-awesome-5-free-regular-14">
              <div className="rounded-6xs flex flex-row items-start justify-start py-[11px] pr-[32.900000000001455px] pl-[33.099999999998545px]">
                <div className="w-3.5 relative leading-[14px] flex items-center justify-center min-w-[14px] max-w-[59px]">
                <img src="ModuloEvento/cc2.svg" alt="" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AsistenteC;