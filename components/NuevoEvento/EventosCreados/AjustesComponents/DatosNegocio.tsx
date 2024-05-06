import { FC } from "react";
interface propsDatosNegocios {
    componentState: any;
    setComponentState: any;
  
  }

const DatosNegocios: FC<propsDatosNegocios> = ({componentState, setComponentState}) => {
  return (
    <div className="w-[100%] max-w-full flex flex-col items-start justify-start pt-7 px-7 pb-[49px] box-border gap-[28px] tracking-[normal] leading-[normal] text-left text-7xl-3 text-black font-semibold">
     
      <div className="self-stretch flex flex-row items-start justify-start max-w-full">
        <div className=" overflow-hidden flex flex-col items-start justify-start max-w-full">
          <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[928px] pl-0 [row-gap:20px] lg:pr-[464px] lg:box-border mq450:pr-5 mq450:box-border mq750:pr-[232px] mq750:box-border">
            
            <div onClick={() => {
            setComponentState(1)
          }} className="cursor-pointer flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">
              <div className="w-[37px] h-[37px] rounded-md flex flex-row items-center justify-center pt-[4.5px] px-[7px] pb-[5.5px] box-border">
                <div className="flex flex-col items-start justify-start">
                  <div className="flex flex-row items-start justify-start">
                    <img
                      className="h-[27px] w-[23px] relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      src="ModuloEvento/FlechaIzquerda.svg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0 box-border min-w-[155px]">
              <div className="self-stretch overflow-hidden flex flex-col items-start justify-start">
                <div className="relative leading-[32px] font-semibold mq450:text-2xl mq450:leading-[25px]">
                  Datos del negocio
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
        <section className="self-stretch w-full rounded-md bg-white flex flex-row items-start justify-start pt-[21px] px-[21px] pb-[26.5px] box-border max-w-full text-left text-smi-3 text-profourvenuescom-fiord font-profourvenuescom-inter-bold-14">
          
          <div className=" self-stretch w-full flex flex-col items-center justify-start ">
            <div className="w-full relative leading-[18px] font-semibold flex items-center shrink-0 max-w-full text-base text-gray-600">
            Logotipo
          </div>
          <div className="w-full flex flex-col items-center justify-center pt-[46px] px-0 pb-0 box-border max-w-full text-center text-lg text-black">
            <div className="w-[120px] h-[120px] shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_rgba(0,_0,_0,_0.06)] rounded-full bg-slate-200 overflow-hidden shrink-0 flex flex-row items-center justify-center py-0 px-[26px] box-border relative">
              <h1 className="m-0 h-60 flex-1 relative text-inherit text-xl leading-[120px] font-bold font-inherit flex items-center justify-center mq450:text-[29px] mq450:leading-[72px] mq1050:text-[38px] mq1050:leading-[96px]">
                BA
              </h1>
              <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] shadow-[0px_2px_4px_rgba(0,_0,_0,_0.06)_inset] rounded-9980xl bg-profourvenuescom-nero-02 z-[1]" />
            </div>
          </div>
          </div>

          <div className="self-stretch w-full h-[226px] flex flex-col items-start justify-start gap-[6.5px]">
            <div className="relative leading-[18px] font-semibold inline-block min-w-[48px] text-base text-gray-600">
              Portada
            </div>
            <div className="flex flex-row items-start justify-start pt-0 px-0 pb-[7.5px] text-xs font-medium text-gray-400">
              <div className="relative leading-[14px] whitespace-nowrap">
                <span>Resolución recomendada </span>
                <b>1080x1350</b>
                <span> pixels.</span>
              </div>
            </div>
            <div className="w-[140px] flex-1 relative shadow-[0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_1px_2px_rgba(0,_0,_0,_0.06)] rounded-md bg-slate-100 hover:bg-slate-200 overflow-hidden" />
          </div>
        </section>

        <form className="self-stretch rounded-md bg-white flex flex-col items-start justify-start pt-[20.3px] px-[21px] pb-[21px] box-border max-w-full mq750:pt-5 mq750:pb-5 mq750:box-border">
          <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[28px] max-w-full">
            <div className="flex-1 flex flex-col items-start justify-start gap-[9.3px] min-w-[305px] max-w-full">
              <div className="self-stretch flex flex-col items-start justify-start gap-[3.7px] max-w-full">
                <b className="relative text-mid-5 leading-[25px] inline-block text-black text-left min-w-[51px]">
                  Datos
                </b>
                <div className="self-stretch flex flex-col items-start justify-start max-w-full">
                  
                  <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[10.5px] box-border gap-[7px] max-w-full">
                    <div className="self-stretch flex flex-col items-start justify-start">
                      <div className="self-stretch relative text-xs leading-[18px] font-semibold text-gray-400 text-left">
                        Nombre
                      </div>
                    </div>
                    <div className="self-stretch flex flex-row items-center justify-center max-w-full">
                      <div className="flex-1 rounded-md bg-slate-100 box-border flex flex-col items-start justify-start py-2 pr-[7px] pl-2.5 max-w-full border-[1px] border-solid border-slate-200">
                        <input
                          className="w-full [border:none] [outline:none] bg-[transparent] self-stretch h-[17px] overflow-auto shrink-0 flex flex-col items-start justify-start text-xs text-black min-w-[250px]"
                          placeholder="Beach Aguilas"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[10.5px] box-border gap-[7px] max-w-full z-[1] mt-[-0.5px]">
                    <div className="self-stretch flex flex-col items-start justify-start">
                      <div className="self-stretch relative text-xs leading-[18px] font-semibold text-gray-400 text-left">
                        Nombre SMS
                      </div>
                    </div>
                    <div className="self-stretch flex flex-row items-center justify-center max-w-full">
                      <div className="flex-1 rounded-md bg-slate-100 box-border flex flex-col items-start justify-start py-2 pr-[7px] pl-2.5 max-w-full border-[1px] border-solid border-slate-200">
                        <input
                          className="w-full [border:none] [outline:none] bg-[transparent] self-stretch h-[17px] overflow-hidden shrink-0 flex flex-col items-start justify-start text-sm text-black min-w-[250px]"
                          placeholder="Beach Agui"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[3.7px] max-w-full">
                <b className="relative text-md leading-[25px] inline-block text-black text-left min-w-[80px] shrink-0">
                  Contacto
                </b>
                <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[10.5px] box-border gap-[7px] shrink-0 max-w-full">
                  <div className="self-stretch flex flex-col items-start justify-start">
                    <div className="self-stretch relative text-xs leading-[18px] font-semibold text-gray-400 text-left">
                      Nombre persona de contacto
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-center justify-center max-w-full">
                    <div className="flex-1 rounded-md bg-slate-100 box-border flex flex-col items-start justify-start py-2 pr-[7px] pl-2.5 max-w-full border-[1px] border-solid border-slate-200">
                      <input
                        className="w-full [border:none] [outline:none] bg-[transparent] self-stretch h-[17px] overflow-auto shrink-0 flex flex-col items-start justify-start text-sm text-black min-w-[250px]"
                        placeholder="Marketing Soluciones"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start gap-[3.7px] min-w-[305px] max-w-full">
              <b className="relative text-md leading-[25px] inline-block text-black text-left min-w-[129px]">
                Redes sociales
              </b>
              <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[3.3px] box-border max-w-full">
                <div className="flex-1 relative text-xs leading-[18px] font-semibold text-gray-400 text-left inline-block max-w-full">
                  Instagram
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[6.3px] box-border gap-[7px] max-w-full mq750:flex-wrap">
                <input
                  className="[outline:none] bg-slate-100 px-4 h-[37px] flex-1 relative rounded-md box-border min-w-[250px] max-w-full border-[1px] border-solid border-slate-200"
                  type="text"
                />
                <div className="flex flex-row items-start justify-start">
                  <div className="flex flex-col items-start justify-start py-0 pr-[7px] pl-0">
                    <div className="w-[35px] rounded-md bg-slate-100 hover:bg-slate-200 hover:border-slate-300  box-border flex flex-row items-center justify-center py-[5px] px-2.5 max-w-[35px] border-[1px] border-solid border-slate-200">
                      <div className="flex flex-col items-center justify-start pt-[3px] px-0 pb-[5.5px]">
                        <div className="flex flex-row items-start justify-start">
                          <img
                            className="h-4 w-4 relative overflow-hidden shrink-0 opacity-50"
                            loading="lazy"
                            alt=""
                            src="ModuloEvento/akar-icons_copy.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start z-[1]">
                    <div className="w-[35px] rounded-md bg-slate-100 hover:bg-slate-200 hover:border-slate-300 box-border flex flex-row items-center justify-center py-[5px] px-[9px] max-w-[35px] border-[1px] border-solid border-slate-200">
                      <div className="flex flex-col items-center justify-start pt-[3px] px-0 pb-[5.5px]">
                        <div className="flex flex-row items-start justify-start">
                          <img
                            className="h-4 w-[15.8px] relative overflow-hidden shrink-0 opacity-50"
                            loading="lazy"
                            alt=""
                            src="ModuloEvento/akar-icons_link-out.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[3.3px] box-border max-w-full">
                <div className="flex-1 relative text-xs leading-[18px] font-semibold text-gray-400 text-left inline-block max-w-full">
                  Facebook
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[6.3px] box-border gap-[7px] max-w-full mq750:flex-wrap">
                <input
                  className="[outline:none] bg-slate-100 px-4 h-[37px] flex-1 relative rounded-6xs box-border min-w-[250px] max-w-full border-[1px] border-solid border-slate-200"
                  type="text"
                />
                <div className="flex flex-row items-start justify-start">
                  <div className="flex flex-col items-start justify-start py-0 pr-[7px] pl-0">
                    <div className="w-[35px] rounded-md bg-slate-100 hover:bg-slate-200 hover:border-slate-300  box-border flex flex-row items-center justify-center py-[5px] px-2.5 max-w-[35px] border-[1px] border-solid border-profourvenuescom-mystic">
                      <div className="flex flex-col items-center justify-start pt-[3px] px-0 pb-[5.5px]">
                        <div className="flex flex-row items-start justify-start">
                          <img
                            className="h-4 w-[13.8px] relative overflow-hidden shrink-0 opacity-50"
                            loading="lazy"
                            alt=""
                            src="ModuloEvento/akar-icons_copy.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start z-[1]">
                    <div className="w-[35px] rounded-md bg-slate-100 hover:bg-slate-200 hover:border-slate-300  box-border flex flex-row items-center justify-center py-[5px] px-[9px] max-w-[35px] border-[1px] border-solid border-slate-200">
                      <div className="flex flex-col items-center justify-start pt-[3px] px-0 pb-[5.5px]">
                        <div className="flex flex-row items-start justify-start">
                          <img
                            className="h-4 w-[15.8px] relative overflow-hidden shrink-0 opacity-50"
                            loading="lazy"
                            alt=""
                            src="ModuloEvento/akar-icons_link-out.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[3.3px] box-border max-w-full">
                <div className="flex-1 relative text-xs leading-[18px] font-semibold text-gray-400 text-left inline-block max-w-full">
                  Web oficial
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-[7px] max-w-full mq750:flex-wrap">
                <input
                  className="[outline:none] bg-slate-100 px-4 h-[37px] flex-1 relative rounded-6xs box-border min-w-[250px] max-w-full border-[1px] border-solid border-slate-200"
                  type="text"
                />
                <div className="flex flex-row items-start justify-start">
                  <div className="flex flex-col items-start justify-start py-0 pr-[7px] pl-0">
                    <div className="w-[35px] rounded-md bg-slate-100 hover:bg-slate-200 hover:border-slate-300  box-border flex flex-row items-center justify-center py-[5px] px-2.5 max-w-[35px] border-[1px] border-solid border-slate-200">
                      <div className="flex flex-col items-center justify-start pt-[3px] px-0 pb-[5.5px]">
                        <div className="flex flex-row items-start justify-start">
                          <img
                            className="h-4 w-[13.8px] relative overflow-hidden shrink-0 opacity-50"
                            loading="lazy"
                            alt=""
                            src="ModuloEvento/akar-icons_copy.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start z-[1]">
                    <div className="w-[35px] rounded-md bg-slate-100 hover:bg-slate-200 hover:border-slate-300  box-border flex flex-row items-center justify-center py-[5px] px-[9px] max-w-[35px] border-[1px] border-solid border-slate-200">
                      <div className="flex flex-col items-center justify-start pt-[3px] px-0 pb-[5.5px]">
                        <div className="flex flex-row items-start justify-start">
                          <img
                            className="h-4 w-[15.8px] relative overflow-hidden shrink-0 opacity-50"
                            loading="lazy"
                            alt=""
                            src="ModuloEvento/akar-icons_link-out.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[469px] flex flex-col items-start justify-start pt-0 px-0 pb-[10.5px] box-border gap-[7px] max-w-full z-[1] mt-[-0.5px]">
            <div className="self-stretch flex flex-col items-start justify-start">
              <div className="self-stretch relative text-xs leading-[18px] font-semibold text-gray-400 text-left">
                Teléfono
              </div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-center max-w-full">
                    <div className="flex-1 rounded-md bg-slate-100 box-border flex flex-col items-start justify-start py-2 pr-[7px] pl-2.5 max-w-full border-[1px] border-solid border-slate-200">
                      <input
                        className="w-full [border:none] [outline:none] bg-[transparent] self-stretch h-[17px] overflow-auto shrink-0 flex flex-col items-start justify-start text-sm text-black min-w-[250px]"
                        placeholder="+51 958 869 547"
                        type="text"
                      />
                    </div>
                  </div>
          </div>
          <div className="self-stretch h-[137px] relative max-w-full mt-[-0.5px]">
            <div className="absolute top-[0px] left-[0px] w-[469px] flex flex-col items-start justify-start pt-0 px-0 pb-[10.5px] box-border gap-[7px] max-w-full z-[2]">
              <div className="self-stretch flex flex-col items-start justify-start">
                <div className="self-stretch relative text-xs leading-[18px] font-semibold text-gray-400 text-left">
                  Correo electrónico
                </div>
              </div>
              <div className="self-stretch flex flex-row items-center justify-center max-w-full">
                <div className="flex-1 rounded-md bg-slate-100 box-border flex flex-col items-start justify-start py-2 pr-[7px] pl-2.5 max-w-full border-[1px] border-solid border-slate-200">
                  <input
                    className="w-full [border:none] [outline:none] bg-[transparent] self-stretch h-[17px] overflow-auto shrink-0 flex flex-col items-start justify-start text-sm text-black min-w-[250px]"
                    placeholder="marketingsoluciones.com@gmail.com"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="absolute top-[72px] left-[0px] w-full flex flex-row items-start justify-center pt-7 px-5 pb-0 box-border max-w-full z-[3]">
              <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[84.9px] flex flex-col items-start justify-start">
                <div className="w-full rounded-md bg-rosa box-border flex flex-row items-center justify-center py-2 px-[17px] max-w-[84.94999694824219px]">
                  <div className="flex flex-col items-center justify-start">
                    <div className="relative text-sm leading-[18px] font-semibold  text-white text-center inline-block min-w-[49px]">
                      Guardar
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </form>

      
    </div>
  );
};

export default DatosNegocios;