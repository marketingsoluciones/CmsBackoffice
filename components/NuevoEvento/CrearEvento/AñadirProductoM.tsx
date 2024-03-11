import { FC, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import CustomButton from "./MyButton";
import MyButton from "./MyButton";
import { string } from "yup";
interface propsAñadirProductoM {
 addProucto:any
 setAddProducto:any
}

export const AñadirProductoM: FC <propsAñadirProductoM> = ({addProucto,setAddProducto}) => {
    const [inputValue, setInputValue] = useState("");
    const [ischecked1, setCheck1] = useState(false);
    const [ischecked2, setCheck2] = useState(false);
    return (
<ClickAwayListener onClickAway={() => addProucto && setAddProducto(false)}>
    
<div className="w-auto box-border overflow-hidden flex flex-col items-center justify-start py-px px-0 gap-[21px]  text-left text-base text-black">
      <div className="self-stretch flex flex-row items-center justify-between pt-[21px] px-[21px] pb-[22px] border-b-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-mystic">
        <div className="h-[24.5px] w-auto relative leading-[24.5px] font-semibold inline-block max-h-[24.5px]">
          Añadir producto
        </div>
        <div onClick={() => {setAddProducto(!addProucto)}} className="cursor-pointer w-auto flex flex-col items-center justify-center">
          <img
            className="w-auto h-auto relative"
            loading="lazy"
            alt=""
            src="ModuloEvento/equis.svg"
          />
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start py-0 px-[21px] gap-[8px] text-smi-3 text-darkslategray-100">
        <div className="w-auto h-[17.5px] relative leading-[17.5px] font-semibold inline-block max-h-[17.5px]">
          Nombre
        </div>
        <input
          className="[outline:none] bg-slate-100 self-stretch h-[37px] pl-4 font-medium relative rounded-md box-border"
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      </div>

      <MyButton texto={"hola"} ischecked={ischecked1} setCheck={setCheck1}/>
      <MyButton texto={"pepito"} ischecked={ischecked2} setCheck={setCheck2}/>

      <div className="self-stretch flex flex-row items-center justify-end pt-[22px] px-[21px] pb-[21px] border-t-[1px] border-solid border-pro-fourvenues-com-beach-aguilas-create-event-1318x573-default-mystic">
        <button onClick={() => {setAddProducto(!addProucto)}} className="cursor-pointer [border:none] p-0 bg-[transparent] w-[76px] flex flex-col items-start justify-start">
          <div className="w-full rounded-md bg-rosa box-border flex flex-row items-center justify-center py-[9.75px] px-[17px] max-w-[76.16000366210938px] border-[1px] border-solid border-rosa">
            <div className="flex flex-col items-center justify-start">
              <div className="w-auto h-[17.5px] relative text-sm leading-[17.5px] font-semibold text-white text-center inline-block max-h-[17.5px]">
                Añadir
              </div>
            </div>
          </div>
        </button>
      </div>


    </div>


</ClickAwayListener>

    );
  };
  