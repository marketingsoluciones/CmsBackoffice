import { FC } from "react";

interface props {
  text: string
  onClick: any
}

export const ButtonEventsBack: FC<props> = ({ text, onClick }) => {

  return (
              <div className="flex flex-row items-center justify-start">
                <div onClick={() => onClick()}

                className="cursor-pointer flex flex-col items-start justify-start py-0 pr-[10.5px] pl-0">

                      
                      <div className="h-[26.3px] flex flex-row items-start justify-start">
                        <img
                          className="h-[26.3px] w-[23px] relative overflow-hidden shrink-0"
                          loading="lazy"
                          alt=""
                          src="/ModuloEvento/FlechaIzquerda.svg"
                        />
                      </div>

                </div>
                <div className="flex flex-col items-start justify-start py-0 pr-[9px] pl-0 ml-[-0.01px]">
                  <div className="overflow-hidden flex flex-col items-start justify-start">
                    <div className="w-auto h-[31.5px] relative leading-[31.5px] font-semibold text-[16px] inline-block min-w-[116px]">
                    {text}
                    </div>
                  </div>
                </div>
              </div>
    
  )
}