import { FC, useState } from "react";
import ClusterC1 from "./ClusterC1";

export const ClusterInfo1 = ({}) => {

  return (   
    <div className="w-full flex flex-row items-start justify-start bg-slate-100 gap-[20px] tracking-[normal] text-left text-xs font-poppins mq700:pl-5 mq700:pr-5 mq700:box-border">
      <main className="flex flex-col items-start justify-start gap-[20px] max-w-[100%] text-left text-[32px] font-poppins mq700:max-w-full">
        <div className="m-0 w-auto h-auto relative text-inherit leading-[38px] text-xl pt-2 capitalize font-semibold font-inherit flex items-center box-border pr-5 mq450:text-lgi mq450:leading-[22px] mq975:text-[26px] mq975:leading-[30px]">
          Clúster
        </div>
        <div className="self-stretch rounded-lg bg-white flex flex-col items-start justify-start pt-5 px-0 pb-[64.09999999999854px] box-border gap-[20px] max-w-full text-center text-base text-azul mq700:pb-5 mq700:box-border mq975:pb-[27px] mq975:box-border">
         {/*  sub-seccion 1 */}
          <div className="self-stretch flex flex-row items-start justify-start py-0 px-16 text-xl text-rosa mq975:pl-8 mq975:pr-8 mq975:box-border">
            <div className="m-0 h-auto w-full relative text-inherit leading-[40px] font-semibold font-inherit flex items-center justify-center mq450:text-lgi mq450:leading-[32px]">
              Convierte más lead en ventas con la ayuda del Lead Clúster
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[26px] pl-[26.5px] box-border max-w-full text-xs">
            <div className="w-full h-auto relative leading-[30px] flex items-center max-w-full">
              El Lead Clúster capta por ti los leads cualificados que demanda tu
              empresa para acelerar la conversión de nuevos clientes. Accede a
              una base de datos de clientes potenciales al final de su proceso
              de compra. Clientes a tu medida. Todo sin crear nuevos
              departamentos en tu empresa, lidiar con complicadas herramientas o
              estrategias de marketing.
            </div>
          </div>

         {/* sub-seccion 2 */}
          <div className="self-stretch bg-slate-200 flex flex-col items-start justify-start pt-0 px-[18px] pb-[50.80000000000291px] box-border gap-[20px] max-w-full mq450:pb-[21px] mq450:box-border mq975:pb-[33px] mq975:box-border">
            <div className="self-stretch w-full h-auto relative leading-[30px] text-center text-xs inline-block">
              <span>{`Los beneficios crecen cada día, así como tus posibilidades de interacción con tus clientes desde nuestra plataforma. `}</span>
              <b className="text-rosa">Con el Lead Clúster tienes acceso a:</b>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[19px] pl-[19.399999999997817px] box-border max-w-full text-carbonaphrd-pipedrive-com-leads-chatbot-1318x573-default-shark">
              <div className="h-[511px] flex-1 flex flex-row flex-wrap items-center justify-center relative gap-[47px] max-w-full">
                <div className="h-[156px] w-[337.8px] my-0 mx-[!important] absolute top-[18.5px] left-[0px] rounded flex flex-col items-center justify-start p-px box-border">
                  <img
                    className="w-[123px] flex-1 relative max-h-full overflow-hidden"
                    loading="lazy"
                    alt=""
                    src="/ModuloEvento/chatenvivo.svg"
                  />
                  <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
                    <div className="self-stretch flex flex-col items-center justify-start py-0 px-5">
                      <div className="w-[102px] h-6 relative leading-[24px] font-semibold flex items-center justify-center min-w-[102px]">
                        Chat en vivo
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start py-0 pr-[79.89999999999782px] pl-[79.90000000000146px] text-sm-9 text-carbonaphrd-pipedrive-com-leads-chatbot-1318x573-default-pale-sky">
                      <div className="self-stretch h-[42px] relative leading-[21px] font-medium inline-block">
                        <p className="m-0">{`Humaniza las relaciones `}</p>
                        <p className="m-0">con tus clientes</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[398.4px] my-0 mx-[!important] absolute top-[0px] left-[386.8px] rounded flex flex-col items-start justify-start pt-px pb-0.5 pr-[41.900000000001455px] pl-[42.5px] box-border gap-[16px]">
                  <div className="self-stretch h-20 flex flex-row items-start justify-start py-0 pr-[37px] pl-[36.69999999999709px] box-border">
                    <img
                      className="h-20 flex-1 relative max-w-full overflow-hidden object-cover"
                      loading="lazy"
                      alt=""
                      src="/ModuloEvento/leads2.svg"
                    />
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
                    <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
                      <div className="h-6 w-[152px] relative leading-[24px] font-semibold flex items-center justify-center">
                        Leads cualificados
                      </div>
                    </div>
                    <div className="self-stretch h-[62px] relative text-sm-9 leading-[21px] font-medium text-carbonaphrd-pipedrive-com-leads-chatbot-1318x573-default-pale-sky inline-block">
                      Encuentra a tus prospectos en nuestra extensa base de
                      datos a la que puedes acceder a través de tus créditos.
                    </div>
                  </div>
                </div>
                <div className="h-[232px] w-[336.9px] my-0 mx-[!important] absolute top-[264px] left-[13.6px] rounded bg-white shadow-[0px_0px_1px_1px_rgba(0,_0,_0,_0.05),_0px_1px_2px_-2px_rgba(0,_0,_0,_0.06),_0px_1px_3px_rgba(0,_0,_0,_0.07)] box-border overflow-hidden shrink-0 flex flex-col items-center justify-start pt-px px-0 pb-[35px] min-h-[232px] border-[1px] border-solid border-carbonaphrd-pipedrive-com-leads-chatbot-1318x573-default-shark-12">
                  <img
                    className="w-60 h-20 relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="/ModuloEvento/chatbot2.svg"
                  />
                  <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
                    <div className="self-stretch flex flex-col items-center justify-start py-0 px-5">
                      <div className="w-[68px] h-6 relative leading-[24px] font-semibold flex items-center justify-center min-w-[68px]">
                        Chatbot
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start py-0 pr-12 pl-[48.5px] text-sm-9 text-carbonaphrd-pipedrive-com-leads-chatbot-1318x573-default-pale-sky">
                      <div className="self-stretch h-[84px] relative leading-[21px] font-medium inline-block">
                        <p className="m-0">{`Mantén activa tu atención 24/7 `}</p>
                        <p className="m-0">con tus prospectos. Personaliza</p>
                        <p className="m-0">{` tus mensajes, genera citas y `}</p>
                        <p className="m-0">responde a preguntas frecuentes.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[262px] w-[372px] my-0 mx-[!important] absolute top-[249px] left-[399.5px] rounded flex flex-row items-start justify-start p-px box-border min-h-[232px] max-w-full">
                  <div className="self-stretch flex-1 flex flex-col items-center justify-start py-6 px-4 box-border max-w-full">
                    <img
                      className="w-60 h-20 relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      src="/ModuloEvento/formulariosweb.svg"
                    />
                    <div className="self-stretch flex flex-col items-start justify-start pt-4 px-0 pb-0">
                      <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
                        <div className="self-stretch flex flex-col items-center justify-start py-0 px-5">
                          <div className="w-[136px] h-6 relative leading-[24px] font-semibold flex items-center justify-center">
                            Formularios web
                          </div>
                        </div>
                        <div className="self-stretch flex flex-col items-center justify-start py-0 px-[44.5px] text-sm-9 text-carbonaphrd-pipedrive-com-leads-chatbot-1318x573-default-pale-sky">
                          <div className="self-stretch h-[84px] relative leading-[21px] font-medium inline-block">
                            <p className="m-0">
                              Garantía de seguridad de los datos
                            </p>
                            <p className="m-0">{` vitales de tus prospectos. `}</p>
                            <p className="m-0">{`Formularios intuitivos, `}</p>
                            <p className="m-0">
                              fáciles de procesar y compartir.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="self-stretch h-[59.8px] relative leading-[30px] inline-block">
              <p className="m-0">¿Deseas generar más prospectos?</p>
              <p className="m-0">
                Con el Lead Clúster llegó el momento de hacerlo.
              </p>
            </div>
            <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 text-white">
              <div className="w-[204px] rounded-lg bg-rosa flex flex-row items-start justify-start pt-[3px] px-2 pb-[3.900000000001455px] box-border whitespace-nowrap">
                <div className="h-6 w-[182px] relative leading-[24px] flex items-center justify-center shrink-0">
                  {" "}
                  Cotiza tu plan ahora
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 text-xl text-rosa">
            <div className="m-0 h-10 w-full relative text-inherit leading-[40px] font-semibold font-inherit flex items-center justify-center shrink-0 mq450:text-lgi mq450:leading-[32px]">
              ¿Por qué elegir el LEAD CLÚSTER?
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-2 pl-[8.5px] box-border max-w-full">
            <div className="h-auto relative leading-[30px] whitespace-pre-wrap flex items-center text-xs justify-center w-full box-border pr-0">
              {" "}
              El Lead Clúster resuelve por ti todos los inconvenientes que
              causan el no tener la estructura para la captación de leads
              cualificados. Y te da la oportunidad de obtener resultados propios
              de una inversión mayor.
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[17px] pl-[17.5px] box-border max-w-full text-left text-rosa">
            <div className="h-[299px] flex-1 flex flex-row flex-wrap items-center justify-center relative gap-[10px] max-w-full">
              <ClusterC1 group3338="/ModuloEvento/capacitacion.svg" propLeft="8px" />
              <div className="w-[263px] my-0 mx-[!important] absolute top-[10.5px] left-[281px] flex flex-col items-start justify-start pt-0 px-0 pb-[0.0999999999985448px] box-border gap-[10px]">
                <div className="self-stretch h-[49.8px] flex flex-row items-start justify-start py-0 pr-px pl-0 box-border gap-[10px]">
                  <img
                    className="h-[37.8px] w-10 relative"
                    loading="lazy"
                    alt=""
                    src="/ModuloEvento/publicidad.svg"
                  />
                  <div className="h-[49.8px] flex-1 relative leading-[25px] text-xs font-semibold inline-block">
                    Clúster de inversión en publicidad
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-end text-xs text-azul">
                  <div className="h-[63.7px] w-[233px] relative leading-[25px] flex items-center shrink-0 box-border pl-5">
                    Maximiza el impacto de tu inversión al realizar campañas
                    conjuntas.
                  </div>
                </div>
              </div>
              <ClusterC1
                group3338="/ModuloEvento/capleads.svg"
                propLeft="554px"
              />
              <div className="w-[263px] my-0 mx-[!important] absolute top-[169.5px] left-[8px] flex flex-col items-start justify-start gap-[10px]">
                <div className="self-stretch h-[49.8px] flex flex-row items-start justify-start py-0 pr-px pl-0 box-border gap-[10px]">
                  <img
                    className="h-[35.1px] w-10 relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="/ModuloEvento/plataforma.svg"
                  />
                  <div className="h-[49.8px] flex-1 relative leading-[25px] text-xs font-semibold inline-block">
                    Plataforma SaaS innovadora
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-end text-xs text-azul">
                  <div className="h-[69.7px] w-[233px] relative leading-[25px] flex items-center shrink-0 box-border pl-5">
                    Crea formularios, webs y autopublicaciones en redes sociales
                    con facilidad.
                  </div>
                </div>
              </div>
              <div className="w-[263px] my-0 mx-[!important] absolute top-[172.5px] left-[281px] flex flex-col items-start justify-start pt-0 px-0 pb-[0.0999999999985448px] box-border gap-[10px]">
                <div className="h-[49.8px] flex flex-row items-start justify-start py-0 pr-px pl-0 box-border gap-[10px]">
                  <img
                    className="h-[45.8px] w-10 relative"
                    loading="lazy"
                    alt=""
                    src="/ModuloEvento/ahorro.svg"
                  />
                  <div className="h-[49.8px] w-[212px] relative leading-[25px] text-xs font-semibold flex items-center">
                    Ahorro de tiempo y dinero
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-end text-xs text-azul">
                  <div className="h-[63.7px] w-[233px] relative leading-[25px] flex items-center shrink-0 box-border pl-5">
                    Reduces los costes y esfuerzos al compartir recursos y
                    estrategias.
                  </div>
                </div>
              </div>
              <div className="w-[263px] my-0 mx-[!important] absolute top-[172.5px] left-[554px] flex flex-col items-start justify-start pt-0 px-0 pb-[0.0999999999985448px] box-border gap-[10px]">
                <div className="self-stretch h-[49.8px] flex flex-row items-start justify-start py-0 pr-px pl-0 box-border gap-[10px]">
                  <img
                    className="h-[46.3px] w-10 relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="/ModuloEvento/colaboracion.svg"
                  />
                  <div className="h-[49.8px] flex-1 relative leading-[25px] text-xs font-semibold inline-block">
                    Colaboración y aprendizaje
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-end text-xs text-azul">
                  <div className="h-[63.7px] w-[233px] relative leading-[25px] flex items-center shrink-0 box-border pl-5">
                    Comparte experiencias y conocimientos con otros
                    profesionales del sector.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch bg-rosa h-20 flex flex-row items-center justify-center py-0 px-[79px] box-border max-w-full text-xl text-white mq975:pl-[39px] mq975:pr-[39px] mq975:box-border">
            <div className="m-0 h-auto relative text-inherit font-semibold font-inherit inline-block max-w-full mq450:text-lgi mq450:leading-[32px]">
              Llega directo a tus clientes potenciales y convierte más leads en
              ventas
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[27px] pl-[27.5px] box-border max-w-full text-left">
            <div className="h-[337px] flex-1 relative leading-[30px] flex items-center max-w-full">
              <span>
                <p className="m-0">
                  Es tu oportunidad de obtener la cartera de lead que te
                  conviene. El LEAD CLÚSTER dispara tus resultados a niveles de
                  grandes inversiones. Por lo que tienes mayor oportunidad de
                  llegar a tu cliente ideal.
                </p>
                <p className="m-0">Maximiza el alcance de tu inversión.</p>
                <p className="m-0">&nbsp;</p>
                <p className="m-0">
                  Integra tu negocio al Clúster de empresas apuestan por el
                  mismo perfil de cliente, pero todos con dedicados a diferentes
                  servicios.
                </p>
                <p className="m-0">&nbsp;</p>
                <p className="m-0">
                  Esta sinergia de fuerzas te permite pujar con una inversión
                  mayor sin incrementar tu presupuesto.
                </p>
                <p className="m-0">
                  No tienes que ocuparte de nada. El equipo de LEAD CLÚSTER
                  resolvemos todo lo que necesitas para captar los leads
                  cualificados que necesitas, mientras tu te dedicas a cerrar
                  tus ventas y atender el funcionamiento de tu empresa.
                </p>
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

