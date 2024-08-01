import { FC, useState } from "react";
import ClusterC1 from "./ClusterC1";
interface propsInfoGeneral1 {
  componentState: any;
  setComponentState: any;

}

export const InfoGeneral1: FC<propsInfoGeneral1> = ({ componentState, setComponentState }) => {

  return (
    <div className=" w-full tracking-[normal] overflow-y-auto h-[90vh] pr-4 pb-[20px]">
      <main className="flex flex-col items-start justify-start gap-[10px]">
        <h1 className=" text-inherit leading-[38px] text-[20px] capitalize font-semibold">
          Cluster
        </h1>
        <div className=" rounded-lg bg-white flex flex-col items-start justify-start pt-5 gap-[20px] text-center text-base text-azul">
          {/*  sub-seccion 1 */}
          <h2 className="self-stretch text-xl text-rosa leading-[40px] font-semibold ">
            Convierte más lead en ventas con la ayuda del Lead Clúster
          </h2>
          <p className="px-[20px] leading-[20px] ">
            El Lead Clúster capta por ti los leads cualificados que demanda tu empresa para acelerar la conversión de nuevos clientes. Accede a una base de datos de clientes potenciales al final de su proceso de compra. Clientes a tu medida. Todo sin crear nuevos departamentos en tu empresa, lidiar con complicadas herramientas o estrategias de marketing.
          </p>

          {/* sub-seccion 2 */}
          <div className="self-stretch bg-slate-200 flex flex-col pt-5 pb-[50px] gap-[20px] ">
            <h2 className="self-stretch w-full h-auto relative leading-[30px] text-center  inline-block">
              Los beneficios crecen cada día, así como tus posibilidades de interacción con tus clientes desde nuestra plataforma. <b className="text-rosa">Con el Lead Clúster tienes acceso a:</b>
            </h2>
            <div className="h-[511px] grid grid-cols-2 items-center justify-items-center px-40">
              <div className="h-[156px] w-[337.8px] my-0 mx-[!important]  rounded flex flex-col items-center justify-start p-px box-border">
                <img
                  className="w-[123px] flex-1 relative max-h-full overflow-hidden"
                  loading="lazy"
                  alt=""
                  src="ModuloEvento/chatenvivo.svg"
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
              <div className="w-[398.4px] my-0 mx-[!important]  rounded flex flex-col items-start justify-start pt-px pb-0.5 pr-[41.900000000001455px] pl-[42.5px] box-border gap-[16px]">
                <div className="self-stretch h-20 flex flex-row items-start justify-start py-0 pr-[37px] pl-[36.69999999999709px] box-border">
                  <img
                    className="h-20 flex-1 relative max-w-full overflow-hidden object-cover"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/leads2.svg"
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
              <div className="h-[232px] w-[336.9px] my-0 mx-[!important]  rounded bg-white shadow-[0px_0px_1px_1px_rgba(0,_0,_0,_0.05),_0px_1px_2px_-2px_rgba(0,_0,_0,_0.06),_0px_1px_3px_rgba(0,_0,_0,_0.07)] box-border overflow-hidden shrink-0 flex flex-col items-center justify-start pt-px px-0 pb-[35px] min-h-[232px] border-[1px] border-solid border-carbonaphrd-pipedrive-com-leads-chatbot-1318x573-default-shark-12">
                <img
                  className="w-60 h-20 relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="ModuloEvento/chatbot2.svg"
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
              <div className="h-[262px] w-[372px] my-0 mx-[!important]  rounded flex flex-row items-start justify-start p-px box-border min-h-[232px] max-w-full">
                <div className="self-stretch flex-1 flex flex-col items-center justify-start py-6 px-4 box-border max-w-full">
                  <img
                    className="w-60 h-20 relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/formulariosweb.svg"
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
          {/* sub-seccion 3 */}
          <h2 className="self-stretch text-xl text-rosa leading-[30px] font-semibold ">
            ¿Por qué elegir el LEAD CLÚSTER?
          </h2>

          <p className="self-stretch px-20">
            El Lead Clúster resuelve por ti todos los inconvenientes que causan el no tener la estructura para la captación de leads cualificados. Y te da la oportunidad de obtener resultados propios de una inversión mayor.
          </p>

          <div className="h-[299px] w-full flex-1 grid md:grid-cols-2 items-center justify-items-center md:px-60 gap-5 ">
            <div>
              <ClusterC1 group3338="ModuloEvento/capacitacion.svg" />
            </div>

            <div className="  flex flex-col items-start justify-start gap-[10px]">
              <div className="self-stretch h-[49.8px] flex flex-row items-start justify-start box-border gap-[10px]">
                <img
                  className="h-[37.8px] w-10 relative"
                  loading="lazy"
                  alt=""
                  src="ModuloEvento/publicidad.svg"
                />
                <div className="h-[49.8px] flex-1 relative leading-[25px] text-xs font-semibold inline-block">
                  Clúster de inversión en publicidad
                </div>
              </div>
              <div className="self-stretch text-xs h-[63.7px] w-[233px] ">
                Maximiza el impacto de tu inversión al realizar campañas
                conjuntas.
              </div>
            </div>

            <div>
              <ClusterC1
                group3338="ModuloEvento/capleads.svg"
              />
            </div>

            <div className=" flex flex-col items-start justify-start gap-[10px]">
              <div className="self-stretch h-[49.8px] flex flex-row items-start justify-start box-border gap-[10px]">
                <img
                  className="h-[35.1px] w-10 relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="ModuloEvento/plataforma.svg"
                />
                <div className="h-[49.8px] flex-1 relative leading-[25px] text-xs font-semibold inline-block">
                  Plataforma SaaS innovadora
                </div>
              </div>
              <div className="self-stretch text-xs h-[69.7px] w-[233px]">
                Crea formularios, webs y autopublicaciones en redes sociales
                con facilidad.
              </div>
            </div>

            <div className="flex flex-col items-start justify-start gap-[10px]">
              <div className="self-stretch h-[49.8px] flex flex-row items-start justify-start box-border gap-[10px]">
                <img
                  className="h-[45.8px] w-10 relative"
                  loading="lazy"
                  alt=""
                  src="ModuloEvento/ahorro.svg"
                />
                <div className="h-[49.8px] w-[212px] relative leading-[25px] text-xs font-semibold flex items-center">
                  Ahorro de tiempo y dinero
                </div>
              </div>
              <div className="self-stretch text-xs h-[63.7px] w-[233px]">
                Reduces los costes y esfuerzos al compartir recursos y estrategias.
              </div>
            </div>

            <div className="flex flex-col items-start justify-start gap-[10px]">
              <div className="self-stretch  flex flex-row items-start justify-center box-border gap-[10px]">
                <img
                  className="h-[46.3px] w-10 relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="ModuloEvento/colaboracion.svg"
                />
                <div className=" flex-1 relative leading-[25px] text-xs font-semibold ">
                  Colaboración y aprendizaje
                </div>
              </div>
              <div className="self-stretch text-xs h-[63.7px] w-[233px]">
                Comparte experiencias y conocimientos con otros profesionales del sector.
              </div>
            </div>
          </div>

          <div className=" font-semibold self-stretch bg-rosa h-20 flex items-center justify-center text-xl text-white">
            Llega directo a tus clientes potenciales y convierte más leads en ventas
          </div>

          <div className="h-[337px] flex-1 leading-[30px] flex flex-col px-20 text-left py-8">
              <p className=" leading-[20px] ">
                Es tu oportunidad de obtener la cartera de lead que te conviene. El LEAD CLÚSTER dispara tus resultados a niveles de grandes inversiones. Por lo que tienes mayor oportunidad de llegar a tu cliente ideal.
              </p>
              <p className="py-1">Maximiza el alcance de tu inversión.</p>

              <p className=" py-1 leading-[20px] ">
                Integra tu negocio al Clúster de empresas apuestan por el mismo perfil de cliente, pero todos con dedicados a diferentes servicios.
              </p>

              <p className="py-1 leading-[20px]">
                Esta sinergia de fuerzas te permite pujar con una inversión mayor sin incrementar tu presupuesto.
              </p>
              <p className="py-1 leading-[20px] ">
                No tienes que ocuparte de nada. El equipo de LEAD CLÚSTER resolvemos todo lo que necesitas para captar los leads cualificados que necesitas, mientras tu te dedicas a cerrar tus ventas y atender el funcionamiento de tu empresa.
              </p>
          </div>

        </div>
      </main>
    </div>
  );
};
