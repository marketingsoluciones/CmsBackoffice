import { FC, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
interface propsAlerta {
 addAlerta:any
 setAddAlerta:any
}

export const Alerta1: FC <propsAlerta> = ({addAlerta,setAddAlerta}) => {
    return (
<ClickAwayListener onClickAway={() => addAlerta && setAddAlerta(false)}>
    
<div className="w-auto h-full overflow-hidden flex flex-col items-center justify-center text-left text-base-8 text-black font-semibold">
        <div className="self-stretch flex items-start justify-center font-semibold text-gray-600">
            ¡ALERTA!
        </div>
        
        <div className="self-stretch flex items-start justify-center text-gray-400 font-medium">
            <img src="/ModuloEvento/.svg" alt="" />
            <p>
                Actualmente se encuenta en modo demo, esta seccion no esta habilitada, si desea activarla, contrate el plan premiun.
            </p>

        </div>
        <button className="flex bg-rosa rounded-md items-center justify-center px-4 py-2 text-white font-medium">
            Adquirir Premiun
        </button>
        </div>

</ClickAwayListener>

    );
  };