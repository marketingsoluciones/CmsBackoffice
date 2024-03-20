import { FC, useState } from "react";
import ClickAwayListener from "react-click-away-listener";

interface propsModalTarifasListas {
    addAñaO:any
    setAddAñaO:any
   }

const ModalTarifasListas: FC <propsModalTarifasListas> = ({addAñaO, setAddAñaO}) => {
  const [text2Value, setText2Value] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  return (
    <ClickAwayListener onClickAway={() => addAñaO && setAddAñaO(false)}>

    <div className="w-auto box-border overflow-hidden flex flex-col items-start justify-start tracking-[normal] text-left text-base text-gray-600 font-semibold mq450:max-w-full mq625:max-w-full">
      
      <div className="w-full flex flex-row items-start justify-start pt-[21px] px-[21px] pb-[22.300000000000185px] gap-[14px] border-b-[1.3px] border-solid border-slate-200">
        <div 
        onClick={() => setAddAñaO(!addAñaO)}
        className="cursor-pointer h-[19.3px] flex flex-col items-start justify-start pt-[5.599999999999454px] px-0 pb-0 box-border">
          <img
            className="w-[13.8px] h-[13.7px]"
            loading="lazy"
            alt=""
            src="ModuloEvento/flechAb.svg"
          />
        </div>
        <div className="h-[25px] w-auto relative leading-[25px] font-semibold text-[14px] inline-block min-w-[101px]">
          Editar opción
        </div>
      </div>

      <section className="w-full h-full flex flex-row items-start justify-start max-w-full text-left text-smi-3">
        <div className="flex flex-col items-start justify-start pt-2 pb-[2.300000000000182px] pr-[20.899999999997817px] pl-[21px] box-border gap-[6.9px] max-w-full">
          
          <div className="w-auto h-[65.1px] flex flex-col items-start justify-start pt-0 px-0 pb-[3.600000000000364px] box-border gap-[7px]">
            <div className="w-full h-[17.5px] relative leading-[17.5px] font-semibold inline-block min-w-[38px] max-h-[17.5px]">
              Precio
            </div>

            <div className="self-stretch rounded-md flex flex-row items-start justify-start overflow-hidden text-center text-sm text-gray-600 ">
              
                <div className="bg-slate-200 w-[31.5px] h-[37px] flex flex-row items-start justify-start pt-2.5 px-2.5 pb-[13px] box-border">
                  <div className="h-full flex-1 relative leading-[14px] flex items-center justify-center max-h-[36.9900016784668px]">
                    -
                  </div>
                </div>
                <button className="cursor-pointer [border:none] pt-[9.199999999999818px] px-5 pb-[10.300000000000182px] bg-slate-100 w-[231px] flex flex-row items-start justify-center box-border hover:bg-gainsboro-100">
                  <div className="h-[17.5px] w-[28.9px] text-sm leading-[17.5px] text-slategray text-left inline-block min-w-[28.9px]">
                    10 €
                  </div>
                </button>
             
              <div className="self-stretch w-[31.5px] bg-slate-200 flex flex-row items-start justify-start pt-2.5 px-2.5 pb-[13px] box-border">
                <div className="h-full flex-1 relative leading-[14px] flex items-center justify-center max-h-[36.9900016784668px]">
                  +
                </div>
              </div>
            </div>

          </div>



          <div className="self-stretch flex flex-row items-start justify-start pb-[3.600000000000364px] gap-[6.9px]">
            


          <div className="w-full flex flex-col items-start justify-start gap-[7px] text-xs">
              <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold inline-block min-w-[35px] max-h-[17.5px]">
                Desde
              </div>

              <div className="self-stretch h-auto rounded-md bg-slate-200 box-border shrink-0 flex flex-row items-center justify-between pt-[2px]  pr-[10px] pl-[10px] gap-[4.5px] text-sm text-gray-600">
                  
                  <div className="w-auto h-auto flex flex-row ">
                  <div className="w-[14.2px] h-[13.8px] leading-[14px] pt-3 inline-block ">
                    <img src="ModuloEvento/relog3.svg" alt="" />
                  </div>
               
                  <div className="w-auto h-auto leading-[36px] inline-block min-w-[47px]">
                    *23:30
                  </div>

                  </div>
                <img
                  className="h-[16px] w-[16px]"
                  alt=""
                  src="ModuloEvento/fAB.svg"
                />
              </div>
            </div>
            
            <div className="w-full flex flex-col items-start justify-start gap-[7px] text-xs">
              <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold inline-block min-w-[35px] max-h-[17.5px]">
                Hasta
              </div>

              <div className="self-stretch h-auto rounded-md bg-slate-200 box-border shrink-0 flex flex-row items-center justify-between pt-[2px]  pr-[10px] pl-[10px] gap-[4.5px] text-sm text-gray-600">
                  
                  <div className="w-auto h-auto flex flex-row ">
                  <div className="w-[14.2px] h-[13.8px] leading-[14px] pt-3 inline-block ">
                    <img src="ModuloEvento/relog3.svg" alt="" />
                  </div>
               
                  <div className="w-auto h-auto leading-[36px] inline-block min-w-[47px]">
                    *06:30
                  </div>

                  </div>
                <img
                  className="h-[16px] w-[16px]"
                  alt=""
                  src="ModuloEvento/fAB.svg"
                />
              </div>
            </div>

          </div>



          <div className="self-stretch flex flex-row items-start justify-start gap-[10.5px] max-w-full">

            <div className="w-full flex flex-col items-start justify-start gap-[7px] text-xs">
              <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold inline-block min-w-[35px] max-h-[17.5px]">
                Edad minima
              </div>

              <div className="self-stretch h-auto rounded-md bg-slate-200 box-border shrink-0 flex flex-row items-center justify-between pt-[2px]  pr-[10px] pl-[10px] gap-[4.5px] text-sm text-gray-600">
                  
                  <div className="w-auto h-auto flex flex-row ">
               
                  <div className="w-auto h-auto leading-[36px] inline-block min-w-[47px]">
                    +18
                  </div>

                  </div>
                <img
                  className="h-[16px] w-[16px]"
                  alt=""
                  src="ModuloEvento/fAB.svg"
                />
              </div>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-[7px] text-xs">
              <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold inline-block min-w-[35px] max-h-[17.5px]">
                Genero
              </div>

              <div className="self-stretch h-auto rounded-md bg-blue-700 box-border shrink-0 flex flex-row items-center justify-start pt-[2px]  pr-[10px] pl-[10px] gap-[4.5px] text-sm text-white">   
              <img
                  className="h-[16px] w-[16px]"
                  alt=""
                  src="ModuloEvento/humanoB.svg"
                />
                  <div className="w-auto h-auto leading-[36px] inline-block min-w-[47px]">
                    Chicos
                  </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-[7px] text-xs">
              <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold inline-block min-w-[35px] max-h-[17.5px]">
               
              </div>

              <div className="self-stretch h-auto rounded-md bg-red-700 box-border shrink-0 flex flex-row items-center justify-start pt-[2px]  pr-[10px] pl-[10px] gap-[4.5px] text-sm text-white">
                  
              <img
                  className="h-[16px] w-[16px]"
                  alt=""
                  src="ModuloEvento/humanoB.svg"
                />
                  <div className="w-auto h-auto leading-[36px] inline-block min-w-[47px]">
                    Chicas
                  </div>
              </div>
            </div>
          </div>

            <div className="self-stretch w-full flex flex-col items-start justify-start gap-[7px] max-w-full">
            <div className="w-32 h-[17.5px] relative leading-[17.5px] font-semibold inline-block max-h-[17.5px] shrink-0 [debug_commit:2554057]">
              Incluye
            </div>
            
              <input
                className="[outline:none] h-[65.5px] w-full rounded-md box-border flex flex-row items-start justify-start pt-[11.700000000000728px] pb-[32.79999999999927px] pr-[11.799999999999272px] pl-[11.700000000000728px] text-sm text-gray-600 min-w-[250px] max-w-full border-solid border-[1px] border-slate-200"
                placeholder="1 copa ó 2 chupitos"
                type="text"
                value={text2Value}
                onChange={(event) => setText2Value(event.target.value)}
              />
            
          </div>

          <div className="self-stretch w-full flex flex-col items-start justify-start gap-[7px] max-w-full">
            <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold inline-block min-w-[128px] max-h-[17.5px] shrink-0 [debug_commit:2554057]">
              Información adicional
            </div>
            
              <input
                className="[outline:none]  h-[65.5px] self-stretch w-full rounded-md box-border  flex flex-row items-start justify-start pt-[11.700000000000728px] pb-[32.79999999999927px] pr-[11.799999999999272px] pl-[11.700000000000728px] text-sm text-gray-600 min-w-[250px] max-w-full border-solid border-[1px] border-slate-200"
                placeholder="Informe al cliente de otro tipo de restricciones o comentarios extra"
                type="text"
                value={textareaValue}
                onChange={(event) => setTextareaValue(event.target.value)}
              />
            
          </div>


        </div>
      </section>
      
    </div>
    </ClickAwayListener>
  );
};

export default ModalTarifasListas;
