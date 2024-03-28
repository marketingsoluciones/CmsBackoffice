import { FC } from "react";
import MensajesC from "./utilidades/MensajesC1";
interface propsMensajesC {
    componentState: any;
    setComponentState: any;
  
  }

const CompMensajes: FC <propsMensajesC> = ({componentState, setComponentState}) => {

  return (
    <div className="w-[100%] bg-white max-w-full flex flex-col items-center justify-center py-8 box-border gap-[52px] tracking-[normal] text-center text-6xl text-[#21232C] font-semibold mq450:pl-5 mq450:pr-5 mq450:box-border mq975:gap-[26px_52px] mq975:pl-[77px] mq975:pr-[77px] mq975:box-border">
      <div className="flex flex-row items-center justify-center max-w-full">
        
        <div className="w-auto flex flex-col items-start justify-start gap-[15.666666666666666px] max-w-full">
          <div className="self-stretch h-20 flex flex-row items-start justify-center py-0 px-5 box-border">
            <img className="h-20 w-20 relative" loading="lazy" alt="" src="ModuloEvento/ms.svg" />
          </div>
          <div className="w-full flex flex-row items-center justify-center py-0 px-5 box-border max-w-full">
            <div className="w-auto flex flex-col items-end justify-start gap-[1px]">
              
              <div className="flex flex-row items-center justify-center py-0 pr-[8.299999999999272px] pl-2">
                <div className="w-auto relative leading-[38px] flex items-center justify-center mq450:text-xl mq450:leading-[30px] mq450:max-w-full">
                  Messenger
                </div>
              </div>
              
              <div className="self-stretch flex flex-row items-center justify-center gap-[3.2999999999992724px] text-sm text-gray-400">
                <div className="flex-1 relative leading-[21px] font-semibold inline-block">
                  por Bodasdehoy
                </div>
                <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[1.7999999999992724px] text-3xs text-white">
                  <div className="rounded-lg bg-green-800 overflow-hidden flex flex-row items-start justify-start py-0 px-1.5 box-border min-w-[16px] max-w-[147.5800018310547px]">
                    <div className="w-auto relative tracking-[0.2px] leading-[16px] uppercase font-semibold flex items-center justify-center min-w-[38px]">
                      gratis
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[72px] relative text-[15.9px] leading-[24px] font-medium text-gray-400 flex items-center">
            <span>
              <p className="m-0">
                Gestiona la comunicación comercial de Facebook en
              </p>
              <p className="m-0">
                Bodasdehoy y convierte las nuevas conversaciones entrantes
              </p>
              <p className="m-0">en contactos, prospectos y negocios.</p>
            </span>
          </div>
          <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
            <div className="w-auto flex flex-col items-center justify-start pt-4 px-0 pb-0 box-border">
              <button
                className="cursor-pointer [border:none] py-[5.5px] px-1 bg-rosa self-stretch rounded shadow-[0px_1px_2px_rgba(42,_54,_71,_0.05)] flex flex-row items-center justify-center box-border min-w-[32px]">
                <div className="overflow-hidden flex flex-col items-center justify-start py-0 px-3 text-xl text-white">
                    Conectar
                </div>
              </button>
            </div>
          </div>
        </div>

      </div>
      <section className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-4 box-border gap-[52px] max-w-full text-left text-3xs text-carbonaphrd-pipedrive-com-leads-web-visitors-1318x573-default-shark font-carbonaphrd-pipedrive-com-leads-messaging-1318x573-default-inter-semi-bold-14 mq975:gap-[26px_52px]">
        <div className="self-stretch flex flex-col items-start justify-start max-w-full">
          <div className="self-stretch flex flex-row flex-wrap items-start justify-center py-6 px-0 gap-[56px] mq975:gap-[28px]">
            <MensajesC
              sVG="ModuloEvento/concentrate.svg"
              cntrateEnLasVentas="Céntrate en las ventas"
              organizaTodasLas="Organiza todas las"
              comunicacionesConLos="comunicaciones con los"
              clientesEnUnSoloLugar="clientes en un solo lugar"
            />
            <MensajesC
              sVG="ModuloEvento/contexto.svg"
              cntrateEnLasVentas="Contexto compartido"
              organizaTodasLas="Gestiona los mensajes como"
              comunicacionesConLos="equipo para obtener mejores"
              clientesEnUnSoloLugar="resultados"
            />
            <MensajesC
              sVG="ModuloEvento/sincro.svg"
              cntrateEnLasVentas="Sincronización perfecta"
              organizaTodasLas="Vincula conversaciones a"
              comunicacionesConLos="contactos, prospectos y"
              clientesEnUnSoloLugar="negocios"
            />
          </div>
          <div className="self-stretch h-[25px] flex flex-row items-start justify-start pt-2 px-0 pb-4 box-border max-w-full">
            <div className="self-stretch flex-1 relative bg-slate-100 max-w-full" />
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start px-4 gap-[24px] max-w-full mq1000:flex-wrap">
          <div className="w-60 rounded bg-white box-border overflow-hidden shrink-0 flex flex-col items-start justify-start py-px px-0 min-w-[240px] border-[1px] border-solid border-slate-100 mq1000:flex-1">
            <div className="self-stretch bg-gray-400 flex flex-col items-end justify-start pt-[46.900000000001455px] px-2 pb-2 relative gap-[23px]">
              <div className="w-full h-full !m-[0] absolute top-[0px] right-[0px] bottom-[0px] left-[0px] flex flex-col items-start justify-start">
                <img
                  className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover"
                  alt=""
                  src="ModuloEvento/img4.svg"
                />
                <div className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] [background:linear-gradient(180deg,_rgba(25,_36,_53,_0),_rgba(25,_36,_53,_0.16)_66.67%,_rgba(25,_36,_53,_0.2))] z-[1]" />
              </div>
              <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
                <div className="h-10 w-10 relative rounded-xl bg-rosa items-center justify-center shadow-[0px_0px_2px_rgba(0,_0,_0,_0.24),_0px_16px_24px_2px_rgba(0,_0,_0,_0.05),_0px_6px_30px_5px_rgba(0,_0,_0,_0.06),_0px_8px_10px_-5px_rgba(0,_0,_0,_0.1)] overflow-hidden shrink-0 z-[2]">
                <img src="ModuloEvento/play.svg" alt="" className="py-2 px-2" />
                </div>
              </div>
              <div className="rounded-sm bg-[#F8F8F8] flex flex-row items-start justify-start py-0 pr-[3.599999999998545px] pl-[3.600000000002183px] box-border min-w-[16px] max-w-[222px] z-[2]">
                <div className="relative leading-[16px] uppercase font-semibold inline-block min-w-[28px] whitespace-nowrap text-xs">
                  01:35
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start pt-[13px] px-4 pb-3 gap-[4px] text-[11px] border-t-[1px] border-solid border-slate-100">
              <div className="relative leading-[16px] uppercase font-semibold inline-block max-w-[206px]">
                INTEGRACIÓN DE MESSENGER
              </div>
              <div className="relative text-sm-9 leading-[21px] font-medium inline-block max-w-[206px]">
                <p className="m-0">Gestiona tus interacciones de</p>
                <p className="m-0">Messenger en Bodasehoy</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[16px] min-w-[285px] max-w-full text-2xl">
            <div className="self-stretch flex flex-col items-start justify-start gap-[8px] max-w-full">
              <div className="relative leading-[32px] mq450:text-mid mq450:leading-[26px]">
                <p className="m-0">
                  Más información acerca de la integración de
                </p>
                <p className="m-0">Messenger</p>
              </div>
              <div className="relative text-sm-9 leading-[21px] font-medium inline-block max-w-full">
                <p className="m-0">
                  Integra con Messenger y comunícate con tus clientes actuales y
                </p>
                <p className="m-0">potenciales directamente desde Bodasdehoy.</p>
              </div>
            </div>
            <div className="flex flex-row items-end justify-start gap-[1.6000000000021828px] max-w-full text-sm text-rosa">
              <a
                className="relative leading-[21px] font-semibold text-[inherit] [text-decoration:none] shrink-0 [debug_commit:f6aba90]"
                href=""
                target="_blank"
              >
                Aprende cómo Messenger puede potenciar tu negocio
              </a>
              <div className="h-auto flex flex-col items-start justify-start pt-0 px-0 pb-0.5 box-border">
                <img
                  className="w-2 h-2 relative overflow-hidden shrink-0 [debug_commit:f6aba90]"
                  loading="lazy"
                  alt=""
                  src="ModuloEvento/f1.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full flex flex-row items-start justify-center max-w-full text-sm">
        <div className="w-auto flex flex-row items-start justify-start gap-[1px] max-w-full">
          <div className="flex-1 relative leading-[21px] font-medium inline-block ">
            Explora más canales de mensajería en el Marketplace
          </div>
          <div className="h-auto flex flex-col items-start justify-start pt-[2.5px] px-0 pb-0 box-border">
            <img className="w-3 h-3 relative" loading="lazy" alt="" src="ModuloEvento/f1.svg" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default CompMensajes;
