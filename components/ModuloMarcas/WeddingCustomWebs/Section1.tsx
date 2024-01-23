import { FunctionComponent, useState } from "react";
import VariantNegativeSizeMNume from "../WeddingCustomWebs/TagCard";
import { ArrowLeft } from "../../Icons/index";

interface propsSection1 {
  setPage: any
  page: any
  setFindData: any
}

const Section1: FunctionComponent<propsSection1> = ({ setPage, page, setFindData }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <section className="relative bg-whitesmoke w-full overflow-y-auto flex flex-col items-start justify-start text-left text-[32px]  font-poppins ">
      {/* header del componente */}
      <div className="self-stretch flex flex-col items-start justify-start py-2.5 px-5 gap-[20px]">
        <div onClick={() => "setPage(!page)"} className="w-5 h-5  top-2 left-3 text-gray-700 cursor-pointer">
          <ArrowLeft />
        </div>
        <div className="self-stretch relative leading-[37.5px] capitalize font-semibold text-rosa">
          Lista de paginas para wending
        </div>
        <div className=" rounded-xl bg-white md:h-[65px] w-full flex items-center justify-center box-border relative text-left text-sm text-slategray font-poppins">
          <p className="flex items-star  px-4">
            Haz que tu red conozca Bodas de Hoy y EventosOrganizador. Recibirán una prueba ampliada de 30 días, y puedes recibir increíbles recompensas.
          </p>
        </div>
      </div>
      {/* boddy del componente  */}
      <div className="self-stretch flex flex-col items-center justify-start gap-[10px] text-right text-sm text-text-primary font-caption-s">
        {/* filter  button */}
        <div className="self-stretch flex flex-col md:flex-row items-center justify-end py-0 px-5 gap-[5px]">
          <div className="flex-1* relative leading-[21px]">8 ítems</div>
          <input
            className="[outline:none] font-caption-s text-sm bg-white rounded shadow-[0px_1px_2px_rgba(42,_54,_71,_0.08)_inset] box-border md:w-[237px] overflow-hidden shrink-0 flex flex-col items-start justify-center py-1.5 px-5 text-darkgray border-[1px] border-solid border-divider-strong1"
            placeholder="Buscar"
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button className="cursor-pointer p-1 bg-white rounded shadow-[0px_1px_2px_rgba(42,_54,_71,_0.05)] box-border h-8 overflow-hidden flex flex-row items-center justify-start border-[1px] border-solid border-divider-strong">
            <div className="hidden flex-row items-center justify-start">
              <img className="relative w-6 h-6" alt="" src="/24filter.svg" />
            </div>
            <div className="flex flex-row items-center justify-start py-0 px-1">
              <img className="relative w-4 h-4" alt="" src="/16smfilter.svg" />
            </div>
            <div className="overflow-hidden flex flex-row items-center justify-center py-0 px-1">
              <div className="relative text-sm leading-[20px] font-semibold font-caption-s text-text-primary text-center">
                Mas relevante
              </div>
            </div>
            <div className="hidden flex-row items-center justify-start">
              <img
                className="relative w-6 h-6"
                alt=""
                src="/24helpoutline.svg"
              />
            </div>
          </button>
        </div>
        {/* grid card */}

        <section className=" grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-[20px]  overflow-y-auto pb-10 ">
          <div className="md:w-[246.3px] h-[303px] flex flex-col items-start justify-start ">
            <img
              className="relative rounded-t-xl w-60 h-[270px] object-cover"
              alt=""
              src="/weddingPageFotos/b1.png"
            />
            <div className="relative rounded-2xl bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25),_0px_0px_2px_rgba(145,_158,_171,_0.2),_0px_12px_24px_-4px_rgba(145,_158,_171,_0.12)] w-60 h-[100px] mt-[-67px]">
              <div className="absolute top-[14px] left-[20px] w-[200px] overflow-hidden flex flex-col items-start justify-center">
                <div className="w-[197px] flex flex-col items-start justify-start gap-[5px]">
                  <div className="relative font-semibold text-negro">
                    Mi boda - Plantilla 1
                  </div>
                  <b className="relative text-3xs">Creada por: Pedro elias</b>
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
                      <button onClick={() => {setPage(!page),setFindData("Plantilla1") }} className="cursor-pointer [border:none] py-0 px-2.5 bg-rosa rounded-lg overflow-hidden flex flex-row items-center justify-center">
                        <div  className="relative text-xs leading-[24px] font-poppins text-white text-left">
                          Demo
                        </div>
                      </button>
                      <button className="cursor-pointer p-[5px] bg-[transparent] rounded-lg box-border w-[30px] h-[30px] overflow-hidden shrink-0 flex flex-col items-center justify-center [transform:_rotate(-180deg)] border-[1px] border-solid border-rosa">
                        <img
                          className="relative w-[14.6px] h-[13.5px] [transform:_rotate(180deg)]"
                          alt=""
                          src="/weddingPageFotos/vector2.png"
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
          <div className="md:w-[246.3px] h-[303px] flex flex-col items-center justify-start">
            <img
              className="relative rounded-t-xl w-[246.3px] h-[270px] object-cover"
              alt=""
              src="/weddingPageFotos/b2.png"
            />
            <div className="relative rounded-2xl bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25),_0px_0px_2px_rgba(145,_158,_171,_0.2),_0px_12px_24px_-4px_rgba(145,_158,_171,_0.12)] w-[247px] h-[100px] mt-[-66px]">
              <div className="absolute top-[14px] left-[20px] w-[207px] overflow-hidden flex flex-col items-start justify-center">
                <div className="w-[197px] flex flex-col items-start justify-start gap-[5px]">
                  <div className="relative font-semibold text-negro">
                    Mi boda - Plantilla 2
                  </div>
                  <b className="relative text-3xs">Creada por: Pedro elias</b>
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
                      <button onClick={() => {setPage(!page),setFindData("Plantilla2") }} className="cursor-pointer [border:none] py-0 px-2.5 bg-rosa rounded-lg overflow-hidden flex flex-row items-center justify-center">
                        <div className="relative text-xs leading-[24px] font-poppins text-white text-left">
                          Demo
                        </div>
                      </button>
                      <button className="cursor-pointer p-[5px] bg-[transparent] rounded-lg box-border w-[30px] h-[30px] overflow-hidden shrink-0 flex flex-col items-center justify-center [transform:_rotate(-180deg)] border-[1px] border-solid border-rosa">
                        <img
                          className="relative w-5 h-5 object-contain [transform:_rotate(180deg)]"
                          alt=""
                          src="/weddingPageFotos/vector.svg"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[-12px] left-[26px] w-[195px] overflow-hidden flex flex-col items-end justify-center">
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
          <div className="md:w-[246.3px] h-[303px] flex flex-col items-center justify-start">
            <img
              className="relative rounded-t-xl w-[246.3px] h-[270px] object-cover"
              alt=""
              src="/weddingPageFotos/b3.png"
            />
            <div className="relative rounded-2xl bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25),_0px_0px_2px_rgba(145,_158,_171,_0.2),_0px_12px_24px_-4px_rgba(145,_158,_171,_0.12)] w-[246px] h-[100px] mt-[-66px]">
              <div className="absolute top-[14px] left-[20px] w-[206px] overflow-hidden flex flex-col items-start justify-center">
                <div className="w-[197px] flex flex-col items-start justify-start gap-[5px]">
                  <div className="relative font-semibold text-negro">
                    Mi boda - Plantilla 3
                  </div>
                  <b className="relative text-3xs">Creada por: Pedro elias</b>
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
                      <button onClick={() => {setPage(!page),setFindData("Plantilla3") }} className="cursor-pointer [border:none] py-0 px-2.5 bg-rosa rounded-lg overflow-hidden flex flex-row items-center justify-center">
                        <div className="relative text-xs leading-[24px] font-poppins text-white text-left">
                          Demo
                        </div>
                      </button>
                      <button className="cursor-pointer p-[5px] bg-[transparent] rounded-lg box-border w-[30px] h-[30px] overflow-hidden shrink-0 flex flex-col items-center justify-center [transform:_rotate(-180deg)] border-[1px] border-solid border-rosa">
                        <img
                          className="relative w-5 h-5 object-contain [transform:_rotate(180deg)]"
                          alt=""
                          src="/weddingPageFotos/vector.svg"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[-12px] left-[23px] w-[200px] overflow-hidden flex flex-col items-end justify-center">
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
          <div className="md:w-[246.3px] h-[303px] flex flex-col items-center justify-start">
            <img
              className="relative rounded-t-xl w-[246.3px] h-[270px] object-cover"
              alt=""
              src="/weddingPageFotos/b4.png"
            />
            <div className="relative rounded-2xl bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25),_0px_0px_2px_rgba(145,_158,_171,_0.2),_0px_12px_24px_-4px_rgba(145,_158,_171,_0.12)] w-[246px] h-[100px] mt-[-66px]">
              <div className="absolute top-[14px] left-[20px] w-[206px] overflow-hidden flex flex-col items-start justify-center">
                <div className="w-[197px] flex flex-col items-start justify-start gap-[5px]">
                  <div className="relative font-semibold text-negro">
                    Mi boda - Plantilla 4
                  </div>
                  <b className="relative text-3xs">Creada por: Pedro elias</b>
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
                      <button onClick={() => {setPage(!page),setFindData("Plantilla4") }} className="cursor-pointer [border:none] py-0 px-2.5 bg-rosa rounded-lg overflow-hidden flex flex-row items-center justify-center">
                        <div className="relative text-xs leading-[24px] font-poppins text-white text-left">
                          Demo
                        </div>
                      </button>
                      <button className="cursor-pointer p-[5px] bg-[transparent] rounded-lg box-border w-[30px] h-[30px] overflow-hidden shrink-0 flex flex-col items-center justify-center [transform:_rotate(-180deg)] border-[1px] border-solid border-rosa">
                        <img
                          className="relative w-5 h-5 object-contain [transform:_rotate(180deg)]"
                          alt=""
                          src="/weddingPageFotos/vector.svg"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[-12px] left-[23px] w-[200px] overflow-hidden flex flex-col items-end justify-center">
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
          <div className="md:w-[246.3px] h-[303px] flex flex-col items-center justify-start">
            <img
              className="relative rounded-t-xl w-[246.3px] h-[270px] object-cover"
              alt=""
              src="/weddingPageFotos/b5.png"
            />
            <div className="relative rounded-2xl bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25),_0px_0px_2px_rgba(145,_158,_171,_0.2),_0px_12px_24px_-4px_rgba(145,_158,_171,_0.12)] w-[246px] h-[100px] mt-[-66px]">
              <div className="absolute top-[14px] left-[20px] w-[206px] overflow-hidden flex flex-col items-start justify-center">
                <div className="w-[197px] flex flex-col items-start justify-start gap-[5px]">
                  <div className="relative font-semibold text-negro">
                    Mi boda - Plantilla 5
                  </div>
                  <b className="relative text-3xs">Creada por: Pedro elias</b>
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
                      <button onClick={() => {setPage(!page),setFindData("Plantilla5") }} className="cursor-pointer [border:none] py-0 px-2.5 bg-rosa rounded-lg overflow-hidden flex flex-row items-center justify-center">
                        <div className="relative text-xs leading-[24px] font-poppins text-white text-left">
                          Demo
                        </div>
                      </button>
                      <button className="cursor-pointer p-[5px] bg-[transparent] rounded-lg box-border w-[30px] h-[30px] overflow-hidden shrink-0 flex flex-col items-center justify-center [transform:_rotate(-180deg)] border-[1px] border-solid border-rosa">
                        <img
                          className="relative w-5 h-5 object-contain [transform:_rotate(180deg)]"
                          alt=""
                          src="/weddingPageFotos/vector.svg"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[-12px] left-[25px] w-[196px] overflow-hidden flex flex-col items-end justify-center">
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
          <div className="md:w-[246.3px] h-[303px] flex flex-col items-center justify-start">
            <img
              className="relative rounded-t-xl w-[246.3px] h-[270px] object-cover"
              alt=""
              src="/weddingPageFotos/b6.png"
            />
            <div className="relative rounded-2xl bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25),_0px_0px_2px_rgba(145,_158,_171,_0.2),_0px_12px_24px_-4px_rgba(145,_158,_171,_0.12)] w-[247px] h-[100px] mt-[-66px]">
              <div className="absolute top-[14px] left-[20px] w-[207px] overflow-hidden flex flex-col items-start justify-center">
                <div className="w-[197px] flex flex-col items-start justify-start gap-[5px]">
                  <div className="relative font-semibold text-negro">
                    Mi boda - Plantilla 6
                  </div>
                  <b className="relative text-3xs">Creada por: Pedro elias</b>
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
                      <button onClick={() => {setPage(!page),setFindData("Plantilla6") }} className="cursor-pointer [border:none] py-0 px-2.5 bg-rosa rounded-lg overflow-hidden flex flex-row items-center justify-center">
                        <div className="relative text-xs leading-[24px] font-poppins text-white text-left">
                          Demo
                        </div>
                      </button>
                      <button className="cursor-pointer p-[5px] bg-[transparent] rounded-lg box-border w-[30px] h-[30px] overflow-hidden shrink-0 flex flex-col items-center justify-center [transform:_rotate(-180deg)] border-[1px] border-solid border-rosa">
                        <img
                          className="relative w-5 h-5 object-contain [transform:_rotate(180deg)]"
                          alt=""
                          src="/weddingPageFotos/vector.svg"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[-12px] left-[24px] w-[199px] overflow-hidden flex flex-col items-end justify-center text-center text-2xs text-text-negative font-caption-s">
                <div className="flex flex-row items-start justify-start">
                  <VariantNegativeSizeMNume
                    pillText=" 60,99$"
                    variantNegativeSizeMNumeBackgroundColor="#fef2f0"
                    variantNegativeSizeMNumeBorder="1px solid #fb8b80"
                    pillColor="#c82627"
                  />
                  {/* <div className="rounded-81xl bg-negative-background-light overflow-hidden flex flex-row items-center justify-center py-1 px-2 border-[1px] border-solid border-negative-muted">
                      <div className="relative leading-[16px] uppercase font-semibold">
                        60,99$
                      </div>
                    </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-[246.3px] h-[303px] flex flex-col items-center justify-start">
            <img
              className="relative  w-[246.3px] h-[270px] object-cover rounded-t-xl"
              alt=""
              src="/weddingPageFotos/b7.png"
            />
            <div className="relative rounded-2xl bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25),_0px_0px_2px_rgba(145,_158,_171,_0.2),_0px_12px_24px_-4px_rgba(145,_158,_171,_0.12)] w-[246px] h-[100px] mt-[-66px]">
              <div className="absolute top-[14px] left-[20px] w-[206px] overflow-hidden flex flex-col items-start justify-center">
                <div className="w-[197px] flex flex-col items-start justify-start gap-[5px]">
                  <div className="relative font-semibold text-negro">
                    Mi boda - Plantilla 7
                  </div>
                  <b className="relative text-3xs">Creada por: Pedro elias</b>
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
                      <button onClick={() => {setPage(!page),setFindData("Plantilla7") }} className="cursor-pointer [border:none] py-0 px-2.5 bg-rosa rounded-lg overflow-hidden flex flex-row items-center justify-center">
                        <div className="relative text-xs leading-[24px] font-poppinswhite text-left text-white">
                          Demo
                        </div>
                      </button>
                      <button className="cursor-pointer p-[5px] bg-[transparent] rounded-lg box-border w-[30px] h-[30px] overflow-hidden shrink-0 flex flex-col items-center justify-center [transform:_rotate(-180deg)] border-[1px] border-solid border-rosa">
                        <img
                          className="relative w-5 h-5 object-contain [transform:_rotate(180deg)]"
                          alt=""
                          src="/weddingPageFotos/vector.svg"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[-12px] left-[23px] w-[200px] overflow-hidden flex flex-col items-end justify-center">
                <div className="flex flex-row items-start justify-start">
                  <VariantNegativeSizeMNume
                    pillText="40,99$"
                    variantNegativeSizeMNumeBackgroundColor="#fef2f0"
                    variantNegativeSizeMNumeBorder="1px solid #fb8b80"
                    pillColor="#c82627"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-[246.3px] h-[303px] flex flex-col items-center justify-start ">
            <img
              className="relative  w-[246.3px] h-[270px] object-cover rounded-t-xl"
              alt=""
              src="/weddingPageFotos/b8.png"
            />
            <div className="relative rounded-2xl bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25),_0px_0px_2px_rgba(145,_158,_171,_0.2),_0px_12px_24px_-4px_rgba(145,_158,_171,_0.12)] w-[246px] h-[100px] mt-[-66px]">
              <div className="absolute top-[14px] left-[20px] w-[206px] overflow-hidden flex flex-col items-start justify-center">
                <div className="w-[197px] flex flex-col items-start justify-start gap-[5px]">
                  <div className="relative font-semibold text-negro">
                    Mi boda - Plantilla 8
                  </div>
                  <b className="relative text-3xs">Creada por: Pedro elias</b>
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
                      <button onClick={() => {setPage(!page),setFindData("Plantilla8") }} className="cursor-pointer [border:none] py-0 px-2.5 bg-rosa rounded-lg overflow-hidden flex flex-row items-center justify-center">
                        <div className="relative text-xs leading-[24px] font-poppins text-white text-left">
                          Demo
                        </div>
                      </button>
                      <button className="cursor-pointer p-[5px] bg-[transparent] rounded-lg box-border w-[30px] h-[30px] overflow-hidden shrink-0 flex flex-col items-center justify-center [transform:_rotate(-180deg)] border-[1px] border-solid border-rosa">
                        <img
                          className="relative w-5 h-5 object-contain [transform:_rotate(180deg)]"
                          alt=""
                          src="/weddingPageFotos/vector.svg"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[-12px] left-[25px] w-[196px] overflow-hidden flex flex-col items-end justify-center text-center text-2xs text-text-negative font-caption-s">
                <div className="flex flex-row items-start justify-start">
                  <VariantNegativeSizeMNume
                    pillText="13,99$"
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

export default Section1;
