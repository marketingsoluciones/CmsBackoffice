import { FC, memo, useState } from "react";
import { Modal } from "../../modals/Modal";
import { AñadirProductoM } from "./AñadirProductoM";

const AsisComp2: FC = memo(() => {
  const [addProducto, setAddProducto] = useState(false);

  return (
    <div className="self-stretch rounded-md bg-white shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] overflow-hidden flex flex-row items-start justify-start shrink-0 [row-gap:20px] text-left text-xs text-black font-semibold">
      <div className="h-auto w-auto flex flex-col items-start justify-start">
        
        <div className="self-stretch flex flex-row items-start justify-start">
          <div className="box-border w-[900px] flex flex-row items-center justify-start gap-36 p-[10px] pl-16 border-b-[1px] border-solid border-slate-200">
            <b className="h-[17px] w-auto relative leading-[16.5px] inline-block">
              Nombre
            </b>
            <div onClick={() => {setAddProducto(!addProducto)}} className="cursor-pointer w-auto box-border flex flex-row items-center justify-start p-[7px] text-blue-600">
        <b className="h-[17px] w-auto relative leading-[16.5px] inline-block">
          + Añadir producto
        </b>
      </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-center text-base">
          <div className="flex-1 flex flex-row items-center justify-center py-[7px] pr-2 pl-[11px] gap-[11px]">
            <div className="self-stretch w-10 rounded-3xl bg-purple-600 text-white overflow-hidden shrink-0 flex flex-col items-center justify-center">
              <b className="w-auto h-10 relative tracking-[0.15px] leading-[300%] inline-block">
                P
              </b>
            </div>
            <div className="h-[21px] w-auto relative text-sm leading-[21px] text-black inline-block font-medium">
              <b>{`Pedro `}</b>
              <span>Hernández</span>
            </div>
          </div>
          <div className="flex-1 flex flex-row items-center justify-start py-[7px] pr-2 pl-[11px] gap-[11px]">
            <div className="self-stretch w-10 rounded-3xl bg-blue-600 text-white overflow-hidden shrink-0 flex flex-col items-center justify-center">
              <b className="w-auto h-10 relative tracking-[0.15px] leading-[300%] inline-block">
                E
              </b>
            </div>
            <div className="h-[21px] w-auto relative text-sm leading-[21px] text-black inline-block font-medium">
              <b>{`Eduardo `}</b>
              <span>Jiménez</span>
            </div>
          </div>
          <div className="flex-1 flex flex-row items-center justify-start py-[7px] pr-2 pl-[11px] gap-[11px]">
            <div className="self-stretch w-10 rounded-3xl bg-orange-600 text-white overflow-hidden shrink-0 flex flex-col items-center justify-center">
              <b className="w-auto h-10 relative tracking-[0.15px] leading-[300%] inline-block">
                C
              </b>
            </div>
            <div className="h-[21px] w-auto relative text-sm leading-[21px] text-black inline-block font-medium">
              <b>{`Christian `}</b>
              <span>Lanza</span>
            </div>
          </div>
          <div className="flex-1 flex flex-row items-center justify-start py-[7px] pr-2 pl-[11px] gap-[11px]">
            <div className="self-stretch w-10 rounded-3xl text-white bg-rosa overflow-hidden shrink-0 flex flex-col items-center justify-center">
              <b className="w-auto h-10 relative tracking-[0.15px] leading-[300%] inline-block">
                B
              </b>
            </div>
            <div className="h-[21px] w-auto relative text-sm leading-[21px] text-black inline-block font-medium">
              <b>{`Barbara `}</b>
              <span>Stender</span>
            </div>
          </div>
        </div>
      </div>
      {
  addProducto ? (
      <Modal  
      setOpenIcon="" 
      openIcon="" 
      classe={"w-[36%] h-[46%]"}>

          <AñadirProductoM addProucto={addProducto} setAddProducto={setAddProducto} />
      </Modal>
  ) :
      null
} 
    </div>


  );
  
});

export default AsisComp2; 