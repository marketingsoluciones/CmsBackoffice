import { FC } from "react";
interface propsCompVisitasWeb {


}

export const CompVisitasWebs: FC<propsCompVisitasWeb> = ({ }) => {


  return (
    <div className="w-[100%] h-[90vh] bg-white flex flex-col items-center justify-center ext-sm gap-4 rounded-xl ">

      <h1 className=" text-6xl text-[#21232C] font-semibold">
        Visitas web
      </h1>

      <div className="flex flex-row items-start justify-start pt-0 pb-5 pr-4 pl-[16.5px] box-border max-w-full text-gray-400">
        <div className="flex flex-col items-start justify-start gap-[20.5px] max-w-full ">
          <div className="flex font-medium max-w-[1007px] text-center">
            Descubre prospectos prometedores, oportunidades ocultas entre
            las empresas que visitan su sitio y ponte en contacto con tus prospectos antes de que los
            competidores los detecten.
          </div>
          <div className="flex flex-row items-center justify-center max-w-full [row-gap:20px] mq975:flex-wrap">
            14 días gratis. El precio del complemento comienza a partir de
            49 € al mes.
            <div
              className="font-semibold flex items-start  cursor-pointer text-sm text-rosa pl-1"
            >
              Más información sobre precios
              <div className="h-4 flex flex-col items-start justify-start pt-1 px-0 pb-0 box-border pl-1">
                <img
                  className="w-3 h-3 relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="ModuloEvento/f1.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-auto flex flex-row items-start justify-center pt-0 px-0 pb-5 box-border max-w-full">
        <button className="cursor-pointer [border:none] py-1.5 px-4 bg-rosa rounded shadow-[0px_1px_2px_rgba(42,_54,_71,_0.05)] flex flex-row items-start justify-start box-border min-w-[32px] whitespace-nowrap hover:bg-crimson-100">
          <div className="w-auto relative text-sm leading-[20px] font-medium text-white text-center flex items-center justify-center">
            Comienza tu periodo de prueba gratuito
          </div>
        </button>
      </div>
      <div className="w-full flex flex-row items-start justify-center max-w-full">
        <div className="w-auto flex flex-col items-start justify-start pt-0 px-0 pb-4 box-border max-w-full">
          <div className="self-stretch flex flex-row flex-wrap items-center justify-center [row-gap:20px]">
            <div className="flex flex-col items-start justify-center py-0 pr-2 pl-0">
              <div className="h-6 overflow-hidden shrink-0 flex flex-col items-center justify-center">
                <img className="w-6 h-6 relative" loading="lazy" alt="" src="ModuloEvento/c1.svg" />
              </div>
            </div>
            <div className="flex-1 relative leading-[21px] font-medium inline-block min-w-[254px] text-[#21232C]">
              Organizaciones similares encontradas en bodasdehoy.com
            </div>
          </div>
        </div>
      </div>
      <section className="w-[757px] h-[253px] relative max-w-full">
        <div className="absolute top-[calc(50%_-_126.5px)] left-[calc(50%_-_352.5px)] w-[705px] h-[253px] flex flex-col items-center justify-start pt-0 px-0 pb-[5px] box-border max-w-full">
          <div className="self-stretch flex-1 rounded-t-2xl rounded-b-none bg-carbonaphrd-pipedrive-com-leads-web-visitors-1318x573-default-nero overflow-hidden flex flex-col items-start justify-start">
            <div className="self-stretch flex-1 overflow-hidden flex flex-col items-center justify-center pt-[0.5px] px-0 pb-[0.5999999999985448px]">
              <img
                className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover"
                alt=""
                src="ModuloEvento/1,1.svg"
              />
            </div>
          </div>
        </div>
        <div className="absolute h-[calc(100%_-_197px)] w-[calc(100%_-_701px)] top-[98.5px] right-[701px] bottom-[98.5px] left-[0px] flex flex-row items-start justify-start p-2 box-border min-w-[48px] z-[1]">
          <div className="h-10 w-10 rounded-xl bg-carbonaphrd-pipedrive-com-leads-web-visitors-1318x573-default-nero shadow-[0px_3px_5px_rgba(0,_0,_0,_0.08),_0px_0px_4px_rgba(0,_0,_0,_0.12)] box-border flex flex-row items-center justify-center py-2 px-[7px] min-w-[32px] border-[1px] border-solid border-carbonaphrd-pipedrive-com-leads-web-visitors-1318x573-default-shark-24">
            <img className="h-6 w-6 relative overflow-hidden shrink-0" alt="" src="ModuloEvento/iz.svg" />
          </div>
        </div>
        <div className="absolute h-[calc(100%_-_197px)] w-[calc(100%_-_701px)] top-[98.5px] right-[0px] bottom-[98.5px] left-[701px] flex flex-row items-start justify-start p-2 box-border min-w-[48px] z-[1]">
          <div className="h-10 w-10 rounded-xl bg-carbonaphrd-pipedrive-com-leads-web-visitors-1318x573-default-nero shadow-[0px_3px_5px_rgba(0,_0,_0,_0.08),_0px_0px_4px_rgba(0,_0,_0,_0.12)] box-border flex flex-row items-center justify-center py-2 px-[7px] min-w-[32px] border-[1px] border-solid border-carbonaphrd-pipedrive-com-leads-web-visitors-1318x573-default-shark-24">
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src="ModuloEvento/de.svg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

