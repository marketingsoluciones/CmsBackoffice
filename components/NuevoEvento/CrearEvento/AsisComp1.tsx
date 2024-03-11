import { FC, memo, useState } from "react";

const AsisComp1: FC = memo(() => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="self-stretch w-auto bg-white flex flex-col items-start justify-start p-[10.5px] box-border shrink-0">
      <div className="self-stretch flex flex-row items-center justify-start shrink-0 [row-gap:20px]">
        <input
          className="[outline:none] bg-white h-9 w-[800px] rounded-md box-border flex flex-col items-start justify-start pt-[9px] px-[11.5px] pb-2.5 font-semibold text-sm text-steelblue border-[1px] border-solid border-slate-200"
          placeholder="Nombre del trabajador..."
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button className="cursor-pointer [border:none] p-0 bg-[transparent] flex flex-col items-start justify-start">
          <div className="flex flex-row items-start justify-end">
            <div className="rounded-md bg-rosa flex flex-row items-start justify-end py-0 px-2.5 opacity-[0.5]">
              <div className="h-9 w-auto relative text-sm leading-[36px] font-medium text-white text-center inline-block">
                Guardar
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
});

export default AsisComp1;