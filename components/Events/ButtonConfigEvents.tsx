import { FC, memo } from "react";
interface props {
  componentState: any;
  setComponentState: any;
  items: any;

}


const ButtonConfigEvents: FC <props> = ({componentState, setComponentState, items}) => {

  return (

        <button  onClick={() => {items.component()}} 
            className="cursor-pointer [border:none] py-3.5 pr-[11px] px-3.5 bg-white w-auto rounded-md shadow-sm hover:shadow-lg flex flex-col items-start justify-start box-border">
            <div className="self-stretch h-[24.5px] flex flex-row items-center justify-start pb-[5px] gap-1 box-border">
                <div className={`flex flex-row items-start justify-start ${items.bgtext}`}>
                {items.img}
                </div>
        <div className="h-auto relative text-sm leading-[21px] font-semibold text-black text-left inline-block">
        {items.title}
        </div>
      </div>
    </button>

);
};

export default ButtonConfigEvents;