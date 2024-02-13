import { FunctionComponent, useState } from "react";
import VariantNegativeSizeMNume from "../WeddingCustomWebs/TagCard";
import { ArrowLeft } from "../../Icons/index";
import { useRouter } from "next/router";

interface propsSection1 {
  setPage: any
  page: any
  setFindData: any
}


const SectionEmpresas: FunctionComponent<propsSection1> = ({ setPage, page, setFindData }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <section className="w-full font-poppins space-y-2  ">
      {/* header del componente */}
      <div >
        <div onClick={() => setPage("principal")} className="w-5 h-5  top-2 left-3 text-gray-700 cursor-pointer">
          <ArrowLeft />
        </div>
        <div className="capitalize font-semibold mt-1 text-[32px] md:text-3xl text-rosa">
          Lista de paginas para Empresas
        </div>
        <div className=" rounded-lg bg-white p-2 w-full text-sm ">
          Haz que tu red conozca Bodas de Hoy y EventosOrganizador. Recibirán una prueba ampliada de 30 días, y puedes recibir increíbles recompensas.
        </div>
      </div>
      {/* boddy del componente  */}
      <div className="flex flex-col items-center space-y-2 text-sm">
        {/* filter  button */}
        <div className="self-stretch flex flex-col* md:flex-row items-center justify-end md:space-x-2 space-x-1">
          <div className="">8 ítems</div>
          <input
            className="[outline:none] text-sm bg-white rounded-lg box-border md:w-[237px] py-1.5 px-3 border-[1px] border-solid"
            placeholder="Buscar"
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button className="font-semibold text-sm py-1.5 px-3 bg-white rounded-lg box-border border-[1px] border-solid ">
            Buscar
          </button>
        </div>

        {/* grid card */}
        <section className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-[20px] md:h-[calc(100vh-247px)]  md:px-16 overflow-y-auto pb-5  ">
          {/* card 1 */}
          <div className="md:w-[246.3px] h-[303px] flex flex-col items-start justify-start ">
            <img
              className="relative rounded-t-xl w-60 h-[270px] object-cover"
              alt=""
              src="/ImagePlantilla/PlantillaE1/img1.png"
            />
            <div className="relative rounded-2xl bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25),_0px_0px_2px_rgba(145,_158,_171,_0.2),_0px_12px_24px_-4px_rgba(145,_158,_171,_0.12)] w-60 h-[100px] mt-[-67px]">
              <div className="absolute top-[14px] left-[20px] w-[200px] overflow-hidden flex flex-col items-start justify-center">
                <div className="w-[197px] flex flex-col items-start justify-start ">
                  <div className="relative font-semibold text-gray-800 text-[11px]">
                    Eventos(None) - Información general de eventos
                  </div>
                  <b className="text-gray-500 text-[10px]">Creada por: Christian lanza</b>
                  <div className="self-stretch h-[31px] flex flex-row items-center justify-between text-5xs">
                    <div className="flex flex-col items-start justify-start">
                      <div className="flex flex-row items-center justify-start gap-[2px]">
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                      </div>
                      <b className="relative">Vendidos: 15</b>
                    </div>
                    <div className="flex flex-row items-center justify-end gap-[5px]">
                      <button onClick={() => { setPage("demo"), setFindData("PlantillaE1") }} className="cursor-pointer [border:none] py-0 px-2.5 bg-rosa rounded-lg overflow-hidden flex flex-row items-center justify-center">
                        <div className="relative text-xs leading-[24px] font-poppins text-white text-left">
                          Demo
                        </div>
                      </button>
                      <button
                        onClick={() => setPage("WebBuilder")}
                        className="cursor-pointer p-[5px] bg-[transparent] rounded-lg box-border w-[30px] h-[30px] overflow-hidden shrink-0 flex flex-col items-center justify-center [transform:_rotate(-180deg)] border-[1px] border-solid border-rosa"
                      >
                        <img
                          className="relative w-[14.6px] h-[13.5px] [transform:_rotate(180deg)]"
                          alt=""
                          src="/weddingPageFotos/Vector2.png"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[-12px] left-[16px] w-52 overflow-hidden flex flex-col items-end justify-center">
                <div className="flex flex-row items-start justify-start">
                  <VariantNegativeSizeMNume
                    pillText="Gratis"
                    variantNegativeSizeMNumeBackgroundColor="#e9fbe7"
                    variantNegativeSizeMNumeBorder="1px solid #82b886"
                    pillColor="#077838"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* card 2 */}
          <div className="md:w-[246.3px] h-[303px] flex flex-col items-start justify-start ">
            <img
              className="relative rounded-t-xl w-60 h-[270px] object-cover"
              alt=""
              src="/ImagePlantilla/PlantillaE2/img1.png"
            />
            <div className="relative rounded-2xl bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25),_0px_0px_2px_rgba(145,_158,_171,_0.2),_0px_12px_24px_-4px_rgba(145,_158,_171,_0.12)] w-60 h-[100px] mt-[-67px]">
              <div className="absolute top-[14px] left-[20px] w-[200px] overflow-hidden flex flex-col items-start justify-center">
                <div className="w-[197px] flex flex-col items-start justify-start ">
                  <div className="relative font-semibold text-gray-800 text-[11px]">
                    Eventos(eventiz) - Conferencias y eventos
                  </div>
                  <b className="text-gray-500 text-[10px]">Creada por: Christian lanza</b>
                  <div className="self-stretch h-[31px] flex flex-row items-center justify-between text-5xs">
                    <div className="flex flex-col items-start justify-start">
                      <div className="flex flex-row items-center justify-start gap-[2px]">
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                      </div>
                      <b className="relative">Vendidos: 15</b>
                    </div>
                    <div className="flex flex-row items-center justify-end gap-[5px]">
                      <button onClick={() => { setPage("demo"), setFindData("PlantillaE2") }} className="cursor-pointer [border:none] py-0 px-2.5 bg-rosa rounded-lg overflow-hidden flex flex-row items-center justify-center">
                        <div className="relative text-xs leading-[24px] font-poppins text-white text-left">
                          Demo
                        </div>
                      </button>
                      <button
                        className="cursor-pointer p-[5px] bg-[transparent] rounded-lg box-border w-[30px] h-[30px] overflow-hidden shrink-0 flex flex-col items-center justify-center [transform:_rotate(-180deg)] border-[1px] border-solid border-rosa"
                      >
                        <img
                          className="relative w-[14.6px] h-[13.5px] [transform:_rotate(180deg)]"
                          alt=""
                          src="/weddingPageFotos/vector.svg"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[-12px] left-[16px] w-52 overflow-hidden flex flex-col items-end justify-center">
                <div className="flex flex-row items-start justify-start">
                  <VariantNegativeSizeMNume
                    pillText="19,99$"
                    variantNegativeSizeMNumeBackgroundColor="#fef2f0"
                    variantNegativeSizeMNumeBorder="1px solid #fb8b80"
                    pillColor="#c82627"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* card 3 */}
          <div className="md:w-[246.3px] h-[303px] flex flex-col items-start justify-start ">
            <img
              className="relative rounded-t-xl w-60 h-[270px] object-cover"
              alt=""
              src="/ImagePlantilla/PlantillaE3/img1.png"
            />
            <div className="relative rounded-2xl bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25),_0px_0px_2px_rgba(145,_158,_171,_0.2),_0px_12px_24px_-4px_rgba(145,_158,_171,_0.12)] w-60 h-[100px] mt-[-67px]">
              <div className="absolute top-[14px] left-[20px] w-[200px] overflow-hidden flex flex-col items-start justify-center">
                <div className="w-[197px] flex flex-col items-start justify-start ">
                  <div className="relative font-semibold text-gray-800 text-[11px]">
                    Eventos(Spark) - Conferencias y eventos.
                  </div>
                  <b className="text-gray-500 text-[10px]">Creada por: Christian lanza</b>
                  <div className="self-stretch h-[31px] flex flex-row items-center justify-between text-5xs">
                    <div className="flex flex-col items-start justify-start">
                      <div className="flex flex-row items-center justify-start gap-[2px]">
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                      </div>
                      <b className="relative">Vendidos: 15</b>
                    </div>
                    <div className="flex flex-row items-center justify-end gap-[5px]">
                      <button onClick={() => { setPage("demo"), setFindData("PlantillaE3") }} className="cursor-pointer [border:none] py-0 px-2.5 bg-rosa rounded-lg overflow-hidden flex flex-row items-center justify-center">
                        <div className="relative text-xs leading-[24px] font-poppins text-white text-left">
                          Demo
                        </div>
                      </button>
                      <button
                        className="cursor-pointer p-[5px] bg-[transparent] rounded-lg box-border w-[30px] h-[30px] overflow-hidden shrink-0 flex flex-col items-center justify-center [transform:_rotate(-180deg)] border-[1px] border-solid border-rosa"
                      >
                        <img
                          className="relative w-[14.6px] h-[13.5px] [transform:_rotate(180deg)]"
                          alt=""
                          src="/weddingPageFotos/vector.svg"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[-12px] left-[16px] w-52 overflow-hidden flex flex-col items-end justify-center">
                <div className="flex flex-row items-start justify-start">
                  <VariantNegativeSizeMNume
                    pillText="25,99$"
                    variantNegativeSizeMNumeBackgroundColor="#fef2f0"
                    variantNegativeSizeMNumeBorder="1px solid #fb8b80"
                    pillColor="#c82627"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* card 4 */}
          <div className="md:w-[246.3px] h-[303px] flex flex-col items-start justify-start ">
            <img
              className="relative rounded-t-xl w-60 h-[270px] object-cover"
              alt=""
              src="/ImagePlantilla/PlantillaE4/img1.png"
            />
            <div className="relative rounded-2xl bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25),_0px_0px_2px_rgba(145,_158,_171,_0.2),_0px_12px_24px_-4px_rgba(145,_158,_171,_0.12)] w-60 h-[100px] mt-[-67px]">
              <div className="absolute top-[14px] left-[20px] w-[200px] overflow-hidden flex flex-col items-start justify-center">
                <div className="w-[197px] flex flex-col items-start justify-start ">
                  <div className="relative font-semibold text-gray-800 text-[11px]">
                    Eventos(Rockfest) - Conferencias y eventos.
                  </div>
                  <b className="text-gray-500 text-[10px]">Creada por: Christian lanza</b>
                  <div className="self-stretch h-[31px] flex flex-row items-center justify-between text-5xs">
                    <div className="flex flex-col items-start justify-start">
                      <div className="flex flex-row items-center justify-start gap-[2px]">
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                      </div>
                      <b className="relative">Vendidos: 15</b>
                    </div>
                    <div className="flex flex-row items-center justify-end gap-[5px]">
                      <button onClick={() => { setPage("demo"), setFindData("PlantillaE4") }} className="cursor-pointer [border:none] py-0 px-2.5 bg-rosa rounded-lg overflow-hidden flex flex-row items-center justify-center">
                        <div className="relative text-xs leading-[24px] font-poppins text-white text-left">
                          Demo
                        </div>
                      </button>
                      <button
                        className="cursor-pointer p-[5px] bg-[transparent] rounded-lg box-border w-[30px] h-[30px] overflow-hidden shrink-0 flex flex-col items-center justify-center [transform:_rotate(-180deg)] border-[1px] border-solid border-rosa"
                      >
                        <img
                          className="relative w-[14.6px] h-[13.5px] [transform:_rotate(180deg)]"
                          alt=""
                          src="/weddingPageFotos/vector.svg"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[-12px] left-[16px] w-52 overflow-hidden flex flex-col items-end justify-center">
                <div className="flex flex-row items-start justify-start">
                  <VariantNegativeSizeMNume
                    pillText="30,99$"
                    variantNegativeSizeMNumeBackgroundColor="#fef2f0"
                    variantNegativeSizeMNumeBorder="1px solid #fb8b80"
                    pillColor="#c82627"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* card 5 */}
          <div className="md:w-[246.3px] h-[303px] flex flex-col items-start justify-start ">
            <img
              className="relative rounded-t-xl w-60 h-[270px] object-cover"
              alt=""
              src="/ImagePlantilla/PlantillaE5/img1.png"
            />
            <div className="relative rounded-2xl bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25),_0px_0px_2px_rgba(145,_158,_171,_0.2),_0px_12px_24px_-4px_rgba(145,_158,_171,_0.12)] w-60 h-[100px] mt-[-67px]">
              <div className="absolute top-[14px] left-[20px] w-[200px] overflow-hidden flex flex-col items-start justify-center">
                <div className="w-[197px] flex flex-col items-start justify-start ">
                  <div className="relative font-semibold text-gray-800 text-[11px]">
                    Bodas - Landing page con información general
                  </div>
                  <b className="text-gray-500 text-[10px]">Creada por: Christian lanza</b>
                  <div className="self-stretch h-[31px] flex flex-row items-center justify-between text-5xs">
                    <div className="flex flex-col items-start justify-start">
                      <div className="flex flex-row items-center justify-start gap-[2px]">
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                      </div>
                      <b className="relative">Vendidos: 15</b>
                    </div>
                    <div className="flex flex-row items-center justify-end gap-[5px]">
                      <button onClick={() => { setPage("demo"), setFindData("PlantillaE5") }} className="cursor-pointer [border:none] py-0 px-2.5 bg-rosa rounded-lg overflow-hidden flex flex-row items-center justify-center">
                        <div className="relative text-xs leading-[24px] font-poppins text-white text-left">
                          Demo
                        </div>
                      </button>
                      <button
                        className="cursor-pointer p-[5px] bg-[transparent] rounded-lg box-border w-[30px] h-[30px] overflow-hidden shrink-0 flex flex-col items-center justify-center [transform:_rotate(-180deg)] border-[1px] border-solid border-rosa"
                      >
                        <img
                          className="relative w-[14.6px] h-[13.5px] [transform:_rotate(180deg)]"
                          alt=""
                          src="/weddingPageFotos/vector.svg"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[-12px] left-[16px] w-52 overflow-hidden flex flex-col items-end justify-center">
                <div className="flex flex-row items-start justify-start">
                  <VariantNegativeSizeMNume
                    pillText="10,99$"
                    variantNegativeSizeMNumeBackgroundColor="#fef2f0"
                    variantNegativeSizeMNumeBorder="1px solid #fb8b80"
                    pillColor="#c82627"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* card 6 */}
          <div className="md:w-[246.3px] h-[303px] flex flex-col items-start justify-start ">
            <img
              className="relative rounded-t-xl w-60 h-[270px] object-cover"
              alt=""
              src="/ImagePlantilla/PlantillaE6/img1.png"
            />
            <div className="relative rounded-2xl bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25),_0px_0px_2px_rgba(145,_158,_171,_0.2),_0px_12px_24px_-4px_rgba(145,_158,_171,_0.12)] w-60 h-[100px] mt-[-67px]">
              <div className="absolute top-[14px] left-[20px] w-[200px] overflow-hidden flex flex-col items-start justify-center">
                <div className="w-[197px] flex flex-col items-start justify-start ">
                  <div className="relative font-semibold text-gray-800 text-[11px]">
                    Bodas - Landing page con información general
                  </div>
                  <b className="text-gray-500 text-[10px]">Creada por: Christian lanza</b>
                  <div className="self-stretch h-[31px] flex flex-row items-center justify-between text-5xs">
                    <div className="flex flex-col items-start justify-start">
                      <div className="flex flex-row items-center justify-start gap-[2px]">
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                        <img
                          className="relative w-3 h-3 overflow-hidden shrink-0"
                          alt=""
                          src="/weddingPageFotos/favorite--24--outline.svg"
                        />
                      </div>
                      <b className="relative">Vendidos: 15</b>
                    </div>
                    <div className="flex flex-row items-center justify-end gap-[5px]">
                      <button onClick={() => { setPage("demo"), setFindData("PlantillaE6") }} className="cursor-pointer [border:none] py-0 px-2.5 bg-rosa rounded-lg overflow-hidden flex flex-row items-center justify-center">
                        <div className="relative text-xs leading-[24px] font-poppins text-white text-left">
                          Demo
                        </div>
                      </button>
                      <button
                        className="cursor-pointer p-[5px] bg-[transparent] rounded-lg box-border w-[30px] h-[30px] overflow-hidden shrink-0 flex flex-col items-center justify-center [transform:_rotate(-180deg)] border-[1px] border-solid border-rosa"
                      >
                        <img
                          className="relative w-[14.6px] h-[13.5px] [transform:_rotate(180deg)]"
                          alt=""
                          src="/weddingPageFotos/vector.svg"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[-12px] left-[16px] w-52 overflow-hidden flex flex-col items-end justify-center">
                <div className="flex flex-row items-start justify-start">
                  <VariantNegativeSizeMNume
                    pillText=" 60,99$"
                    variantNegativeSizeMNumeBackgroundColor="#fef2f0"
                    variantNegativeSizeMNumeBorder="1px solid #fb8b80"
                    pillColor="#c82627"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default SectionEmpresas;
