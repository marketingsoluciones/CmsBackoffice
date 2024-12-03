import { FC, memo } from "react";
interface props {
  componentState: any;
  setComponentState: any;
  items: any;

}


const Component3CE: FC <props> = ({componentState, setComponentState, items}) => {

  return (
      <div onClick={() => {items.component()}}
      className="cursor-pointer w-auto rounded-md bg-white shadow-sm hover:shadow-lg overflow-hidden flex flex-col items-start justify-start">
          
            <div className={`self-stretch ${items.bg} flex flex-row items-center gap-2 justify-start px-2 py-2 ${items.textbg}`}>
                  {items.img}
                  <div className="w-auto relative leading-[21px] text-xs font-semibold inline-block">
                {items.title}
                </div>
            </div>
            <div className="flex flex-col items-start justify-start px-2 py-2 gap-1 min-w-[189px]">
              
                <div className="w-[250px] relative inline-block text-xs text-left text-gray-400 font-medium">
                {items.content}                
                </div>
            </div>
          
        </div>

  );
};

export default Component3CE;
