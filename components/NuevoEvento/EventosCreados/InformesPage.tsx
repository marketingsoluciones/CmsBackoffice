import { FC } from "react";
interface propsInformePage {
    componentState: any;
    setComponentState: any;
  
  }

const InformesPage: FC<propsInformePage> = ({componentState, setComponentState}) => {
  return (
    <div className="w-[100%] bg-whitesmoke max-w-[1271px] flex flex-col items-start justify-start pt-[30.5px] px-0 pb-0 box-border gap-[29.25px] max-h-[573px] tracking-[normal] leading-[normal] text-left text-sm text-profourvenuescom-ebony font-profourvenuescom-inter-semi-bold-158 mq450:max-w-full mq750:max-w-full mq1100:max-w-full mq1275:max-w-full">
      <div className="flex flex-row items-start justify-start py-0 px-5 text-7xl-3">
        <div className="flex flex-row items-end justify-start gap-[10px]">
          
          <div onClick={()=>{ 
        setComponentState(1)
      }}  className="cursor-pointer flex flex-col items-start justify-end pt-0 px-0 pb-[2.7999999999992724px]">
            <img
              className="w-[30px] h-[30px] relative"
              loading="lazy"
              alt=""
              src="ModuloEvento/FlechaIzquerda.svg"
            />
          </div>
          <div className="relative leading-[32px] font-semibold inline-block text-[16px] min-w-[122px] mq450:text-2xl mq450:leading-[25px]">
            Recuento
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[47px] pl-[46.79999999999927px] box-border max-w-full text-black mq750:pl-[23px] mq750:pr-[23px] mq750:box-border">
        <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq1275:flex-wrap">
          <div className="w-[100%] flex flex-row items-center justify-start gap-[10px] max-w-full mq750:flex-wrap">
            
              <div className="rounded-md bg-white flex flex-row items-center justify-start py-0 pr-2.5 pl-[10.5px] gap-[7px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-3.5 w-[12.3px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/calcal.svg"
                  />
                </div>
                <div className="relative leading-[36px] font-medium text-[10px] ">
                  27 de mar. de 2024
                </div>
              </div>
            
            <div className="flex flex-row items-start justify-start">
              <img
                className="h-[15px] w-[8.8px] relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="ModuloEvento/asdf.svg"
              />
            </div>
            <div className="flex flex-col items-start justify-start">
              <div className="rounded-md bg-white flex flex-row items-center justify-start py-0 pr-2.5 pl-[10.5px] gap-[7px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-3.5 w-[12.3px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="ModuloEvento/calcal.svg"
                  />
                </div>
                <div className="relative leading-[36px] font-medium inline-block text-[10px] ">
                  11 de abr. de 2024
                </div>
              </div>
            </div>
            <button className="cursor-pointer p-0 bg-white rounded-md border-solid border-[1px] border-blue-700 flex flex-col items-start justify-start">
              <div className="self-stretch flex flex-row gap-2 items-center justify-start py-0 px-[10.5px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-3.5 w-[17.5px] relative overflow-hidden shrink-0"
                    alt=""
                    src="ModuloEvento/copa.svg"
                  />
                </div>
                <div className="flex-1 relative text-[10px] leading-[36px] font-semibold text-blue-700 text-right">
                  {" "}
                  Recuento por eventos 0
                </div>
              </div>
            </button>
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] flex flex-col items-start justify-start">
              <div className="self-stretch rounded-md bg-white flex flex-row items-center justify-start py-0 px-[10.5px] gap-[7px]">
                <div className="flex flex-row items-start justify-start">
                  <img
                    className="h-3.5 w-[12.3px] relative overflow-hidden shrink-0"
                    alt=""
                    src="ModuloEvento/calcal.svg"
                  />
                </div>
                <div className="flex-1 relative text-[10px] leading-[36px] text-right">
                  Recuento por fechas
                </div>
              </div>
            </button>
          </div>
          <div className="w-auto flex flex-row items-center justify-center gap-[10px]">
            <div className="w-full rounded-md bg-white flex flex-row items-start justify-start p-px border-[1px] border-solid border-slate-200 py-[9px] pr-[7px] pl-[10.5px] gap-[7px]">

                
                <div className="flex flex-col items-start justify-start pt-[1.5px] px-0 pb-0">
                  <img
                    className="w-3.5 h-3.5 relative overflow-hidden shrink-0"
                    alt=""
                    src="ModuloEvento/buscar.svg"
                  />
                </div>
                <input
                  className="w-[100%] [border:none] [outline:none] bg-[transparent] h-[17px] flex-1 flex flex-row items-start justify-start text-sm "
                  placeholder="Buscar"
                  type="text"
                />
                
             
            </div>
           
              <div className="w-auto rounded-md bg-white box-border flex flex-row items-center justify-center pt-[6.299999999999272px] pb-[6.200000000000728px] pr-[15px] pl-3.5 border-[1px] border-solid border-slate-200">
                <div className="flex flex-col items-center justify-start pt-[3px] px-0 pb-[5.5px]">
                  <div className="w-full flex flex-row items-start justify-start">
                    <img
                      className="h-4 w-[16px] relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      src="ModuloEvento/trespuntos.svg"
                    />
                  </div>
                </div>
              </div>
          
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-center justify-start pt-[53px] px-5 pb-3.5 box-border gap-[19px] opacity-[0.25] max-w-full text-center text-profourvenuescom-pickled-bluewood">
        <div className="w-[500px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
          <img
            className="h-[125px] w-[120px] relative overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src="ModuloEvento/icono1.svg"
          />
        </div>
        <div className="w-[500px] relative leading-[21px] flex items-center max-w-full">
              Selecciona un rango de fechas con eventos y descubre que canales de venta han sido más productivos.
        </div>
      </div>
    </div>
  );
};

export default InformesPage;