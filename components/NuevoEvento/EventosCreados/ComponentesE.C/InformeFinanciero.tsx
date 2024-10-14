import { FC } from "react";
import ClickAwayListener from "react-click-away-listener";
interface propsInformeFinanciero {
    addInforme:any
    setAddInforme:any
   }

const InformeFinanciero: FC<propsInformeFinanciero> = ({addInforme, setAddInforme}) => {
  return (
    <ClickAwayListener onClickAway={() => addInforme && setAddInforme(false)}>
    <div className="w-[100%] max-w-full flex flex-col items-start justify-start pt-0 px-0 pb-5 box-border gap-[10px] tracking-[normal] leading-[normal] text-left text-base-8 text-profourvenuescom-ebony font-profourvenuescom-inter-bold-14">
      <div className="self-stretch flex flex-row items-center justify-between py-0 px-5 gap-[20px] mq450:flex-wrap">
        <b className="relative leading-[25px]">Informe financiero</b>
        
          <div onClick={() => {setAddInforme(!addInforme)}} className="cursor-pointer flex flex-row items-center justify-center pt-[6.3px] px-3 pb-[6.2px] box-border max-w-[35px]">
            <div className="flex flex-col items-center justify-start pt-1 px-0 pb-[4.5px]">
              <div className="flex flex-row items-start justify-start">
                <img
                  className="h-6 w-6 relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/ModuloEvento/equis1.svg"
                />
              
            </div>
          </div>
        </div>

      </div>
      <main className="self-stretch bg-slate-100 flex flex-row items-start justify-start p-3.5 box-border max-w-full text-left text-sm text-profourvenuescom-black font-profourvenuescom-inter-bold-14">
        <div className="flex-1 bg-white shadow-[1px_1px_3px_rgba(0,_0,_0,_0.15)] flex flex-col items-start justify-start pt-[26.5px] pb-[115.7px] pr-[25.5px] pl-7 box-border gap-[5.5px] max-w-full mq625:pt-5 mq625:pb-[49px] mq625:box-border">
          <div className="flex flex-col items-start justify-start pt-0 px-0 pb-[23.5px] gap-[0.5px]">
            <div className="relative leading-[21px] inline-block max-w-[655.8800048828125px] mq675:max-w-full">
              Viernes, 29 de Noviembre de 2024
            </div>
            <h2 className="m-0 relative text-[24px] leading-[36px] font-bold font-inherit inline-block max-w-[655.8800048828125px] mq450:text-[19px] mq450:leading-[29px] mq675:max-w-full">
              Noche de Divas
            </h2>
          </div>
          <div className="w-4 h-[45.3px] relative hidden max-w-[16px]" />
          <div className="self-stretch flex flex-row items-start justify-between pt-[3.5px] px-0 pb-[5px] gap-[20px] border-b-[2px] border-solid border-profourvenuescom-mercury mq450:flex-wrap">
            <b className="relative leading-[21px] inline-block min-w-[105px] shrink-0 [debug_commit:1de1738]">
              Ingresos online
            </b>
            <div className="flex flex-row items-start justify-start gap-[64.3px] shrink-0 [debug_commit:1de1738] text-center">
              <b className="relative leading-[21px] inline-block min-w-[63px]">
                Cantidad
              </b>
              <b className="w-[54.4px] relative leading-[21px] flex text-right items-center shrink-0 min-w-[54.4px]">
                Importe
              </b>
            </div>
          </div>
          <div className="w-[616px] flex flex-row items-end justify-between pt-0 px-0 pb-[4.5px] box-border gap-[20px] max-w-full mq450:flex-wrap">
            <div className="flex flex-col items-start justify-start gap-[10px]">
              <div className="relative leading-[18px] inline-block min-w-[103px]">
                Entradas online
              </div>
              <div className="relative leading-[18px] inline-block min-w-[111px]">
                Entradas taquilla
              </div>
              <div className="relative leading-[18px] inline-block min-w-[119px]">
                entradas_terminal
              </div>
              <div className="relative leading-[18px]">Cambios de nombre</div>
              <div className="relative leading-[18px] inline-block min-w-[128px]">
                Adelantos reservas
              </div>
              <div className="relative leading-[18px] inline-block min-w-[114px]">
                Gestión entradas
              </div>
              <div className="relative leading-[18px]">
                Gestión entradas taquilla
              </div>
              <div className="relative leading-[18px]">
                ingresos_ggdd_entradas_terminal
              </div>
              <div className="relative leading-[18px]">
                Garantía de devolución
              </div>
            </div>
            <div className="w-[98.3px] flex flex-col items-end justify-start py-0 pr-0 pl-px box-border gap-[10.1px] text-center">
              <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                <div className="relative leading-[18px] inline-block min-w-[9px]">
                120
                </div>
                <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                6000,00 €
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                <div className="relative leading-[18px] inline-block min-w-[9px]">
                  50
                </div>
                <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                  2500,00 €
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                <div className="relative leading-[18px] inline-block min-w-[9px]">
                  10
                </div>
                <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                  500,00 €
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                <div className="relative leading-[18px] inline-block min-w-[9px]">
                  5
                </div>
                <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                  25,00 €
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                <div className="relative leading-[18px] inline-block min-w-[9px]">
                  20
                </div>
                <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                  1000,00 €
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                <div className="relative leading-[18px] inline-block min-w-[9px]">
                  0
                </div>
                <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                  0,00 €
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                <div className="relative leading-[18px] inline-block min-w-[9px]">
                  0
                </div>
                <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                  0,00 €
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                <div className="relative leading-[18px] inline-block min-w-[9px]">
                  0
                </div>
                <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                  0,00 €
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                <div className="relative leading-[18px] inline-block min-w-[9px]">
                  0
                </div>
                <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                  0,00 €
                </div>
              </div>
            </div>
          </div>
          <div className="w-[615.9px] flex flex-row items-start justify-between gap-[20px] max-w-full mq450:flex-wrap">
            <div className="flex flex-col items-start justify-start gap-[10px]">
              <div className="relative leading-[18px] inline-block min-w-[112px]">
                Gestión reservas
              </div>
              <div className="relative leading-[18px]">
                Devoluciones entradas
              </div>
              <div className="relative leading-[18px]">
                Devoluciones reservas
              </div>
              <div className="relative leading-[18px]">
                Devoluciones entradas taquilla
              </div>
              <div className="relative leading-[18px]">
                entradas_terminal_refunded
              </div>
            </div>
            <div className="w-[98.3px] flex flex-col items-end justify-start py-0 pr-0 pl-px box-border gap-[10.1px] text-center">
              <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                <div className="relative leading-[18px] inline-block min-w-[9px]">
                  0
                </div>
                <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                  0,00 €
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                <div className="relative leading-[18px] inline-block min-w-[9px]">
                  3
                </div>
                <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                150,00 €
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                <div className="relative leading-[18px] inline-block min-w-[9px]">
                  2
                </div>
                <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                  100,00 €
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                <div className="relative leading-[18px] inline-block min-w-[9px]">
                  1
                </div>
                <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                  50,00 €
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                <div className="relative leading-[18px] inline-block min-w-[9px]">
                  1
                </div>
                <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                  50,00 €
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[4.5px] box-border gap-[27px] max-w-full text-right">
            <div className="self-stretch flex flex-col items-start justify-start">
              <div className="self-stretch flex flex-row items-start justify-end pt-0.5 px-0 pb-[1.5px] gap-[64.8px] border-t-[2px] border-solid border-profourvenuescom-mercury mq450:flex-wrap mq450:gap-[32px]">
                <b className="relative leading-[21px]">TOTAL INGRESOS ONLINE</b>
                <b className="relative leading-[21px] inline-block min-w-[46px]">
                9800,00 €
                </b>
              </div>
              <div className="relative text-2xs-5 leading-[14px] z-[1] mt-[-1px]">
                Ingresos online que declarar (IVA incluido)
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[5.5px] max-w-full text-left">
              <div className="self-stretch flex flex-row items-start justify-between pt-[3.5px] px-0 pb-[5px] gap-[20px] border-b-[2px] border-solid border-profourvenuescom-mercury mq450:flex-wrap">
                <b className="relative leading-[21px] inline-block min-w-[49px] shrink-0 [debug_commit:1de1738]">
                  Gastos
                </b>
                <div className="flex flex-row items-start justify-start gap-[64.3px] shrink-0 [debug_commit:1de1738] text-center">
                  <b className="relative leading-[21px] inline-block min-w-[63px]">
                    Cantidad
                  </b>
                  <b className="w-[54.4px] relative leading-[21px] flex text-right items-center shrink-0 min-w-[54.4px]">
                    Importe
                  </b>
                </div>
              </div>
              <div className="w-[615.9px] flex flex-row items-end justify-between gap-[20px] max-w-full mq625:flex-wrap">
                <div className="flex flex-col items-start justify-start gap-[10px]">
                  <div className="relative leading-[18px]">
                    Gestión entradas (pasarela de pago)
                  </div>
                  <div className="relative leading-[18px]">
                    Gestión entradas taquilla (pasarela de pago)
                  </div>
                  <div className="relative leading-[18px]">
                    ggdd_entradas_terminal
                  </div>
                  <div className="relative leading-[18px]">
                    Cambios de nombre (pasarela de pago)
                  </div>
                  <div className="relative leading-[18px]">
                    Gastos garantía de devolución
                  </div>
                </div>
                <div className="w-[98px] flex flex-col items-end justify-start gap-[10.1px] text-center">
                  <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                    <div className="relative leading-[18px] inline-block min-w-[9px]">
                    0
                    </div>
                    <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                    150,00 €
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                    <div className="relative leading-[18px] inline-block min-w-[9px]">
                      0
                    </div>
                    <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                      50,00 €
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                    <div className="relative leading-[18px] inline-block min-w-[9px]">
                      0
                    </div>
                    <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                      20,00 €
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                    <div className="relative leading-[18px] inline-block min-w-[9px]">
                      0
                    </div>
                    <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                      10,00 €
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                    <div className="relative leading-[18px] inline-block min-w-[9px]">
                      0
                    </div>
                    <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                      50,00 €
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[24.5px] max-w-full">
            <div className="self-stretch flex flex-col items-start justify-start gap-[5.5px] max-w-full">
              <div className="w-[616px] flex flex-row items-start justify-between gap-[20px] max-w-full mq450:flex-wrap">
                <div className="flex flex-col items-start justify-start gap-[10px]">
                  <div className="relative leading-[18px]">
                    Gestión reservas (pasarela de pago)
                  </div>
                  <div className="relative leading-[18px] inline-block min-w-[128px]">
                    Total envío de SMS
                  </div>
                </div>
                <div className="w-[98.1px] flex flex-col items-end justify-start py-0 pr-0 pl-px box-border gap-[10.5px] text-center">
                  <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                    <div className="relative leading-[18px] inline-block min-w-[9px]">
                      0
                    </div>
                    <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                      30,00 €
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                    <div className="relative leading-[18px] inline-block min-w-[9px]">
                      0
                    </div>
                    <div className="relative leading-[18px] text-right inline-block min-w-[43px]">
                      20,00 €
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-end pt-0.5 px-0 pb-[1.5px] gap-[64.9px] text-right border-t-[2px] border-solid border-profourvenuescom-mercury mq450:flex-wrap">
                <b className="relative leading-[21px] inline-block min-w-[108px]">
                  TOTAL GASTOS
                </b>
                <b className="relative leading-[21px] inline-block min-w-[46px]">
                  330,00 €
                </b>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[0.5px] text-right">
              <div className="self-stretch flex flex-row items-start justify-end">
                <div className="w-[265.8px] flex flex-row items-start justify-between gap-[20px]">
                  <b className="relative leading-[21px]">
                    Importe total a liquidar
                  </b>
                  <b className="relative leading-[21px] inline-block text-profourvenuescom-royal-blue min-w-[46px]">
                    10.130,00 €
                  </b>
                </div>
              </div>
              <div className="relative text-2xs-5 leading-[14px]">
                Este es el importe total a percibir en este evento
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="flex flex-row items-start justify-start py-0 px-5">
        <button className="cursor-pointer [border:none] py-0 px-[10.5px] bg-rosa rounded-md flex flex-row items-start justify-start gap-[7px]">
          <div className="flex flex-col items-start justify-start pt-2 px-0 pb-0">
            <img
              className="w-5 h-5 relative overflow-hidden shrink-0"
              alt=""
              src="/ModuloEvento/imprimir.svg"
            />
          </div>
          <div className="relative text-base-8 leading-[36px] font-medium text-white text-center inline-block min-w-[62px]">
            Imprimir
          </div>
        </button>
      </div>
    </div>
    </ClickAwayListener>
  );
};

export default InformeFinanciero;
