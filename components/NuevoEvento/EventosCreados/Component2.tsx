import { FunctionComponent } from "react";

const Component2: FunctionComponent = () => {
    return (
      <div className="self-stretch flex flex-row items-start justify-start py-0 px-0 box-border text-left text-sm">
      <div className="flex-1 overflow-hidden flex flex-row items-start justify-start py-3.5 px-7 box-border">
        <div className="flex flex-col items-start justify-start py-0 pr-[11px] pl-0">
          <div className="flex flex-col items-start justify-start">
            <div className="rounded-full bg-pink-200 flex flex-row items-center justify-center p-[7px]">
              <div className="flex flex-col items-start justify-start">
                <div className="w-7 h-7 rounded-full bg-rosa flex flex-row items-center justify-center py-[7px] pr-[7.869999885559082px] pl-[7.880000114440918px] box-border">
                  <div className="flex flex-col items-start justify-start">
                    <div className="flex flex-row items-start justify-start">
                      <img
                        className="h-3.5 w-[12.3px] relative overflow-hidden shrink-0"
                        alt=""
                        src="ModuloEvento/icon-15.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-0 pr-[9px] pl-[10.5px]">
                <div className="w-auto h-auto relative leading-[21px] font-bold inline-block">
                  Calendario
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start py-0 pr-2.5 pl-0">
          <div className="flex flex-col items-start justify-start">
            <div className="rounded-full bg-white flex flex-row items-center justify-center p-[7px]">
              <div className="flex flex-col items-start justify-start">
                <div className="w-7 h-7 rounded-full bg-slate-600 flex flex-row items-center justify-center p-[7px] box-border">
                  <div className="flex flex-col items-start justify-start">
                    <div className="flex flex-row items-start justify-start">
                      <img
                        className="h-3.5 w-3.5 relative overflow-hidden shrink-0"
                        alt=""
                        src="ModuloEvento/icon-22.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-0 px-[10.5px]">
                <div className="w-[60px] h-[21px] relative leading-[21px] font-semibold inline-block">
                  Informes
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <div className="rounded-full bg-white flex flex-row items-center justify-center p-[7px]">
            <div className="flex flex-col items-start justify-start">
              <div className="w-7 h-7 rounded-full bg-slate-600 flex flex-row items-center justify-center p-[7px] box-border">
                <div className="flex flex-col items-start justify-start">
                  <div className="flex flex-row items-start justify-start">
                    <img
                      className="h-3.5 w-3.5 relative overflow-hidden shrink-0 "
                      alt=""
                      src="ModuloEvento/icon123.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start py-0 pr-[9px] pl-[10.5px]">
              <div className="w-[52px] h-[21px] relative leading-[21px] font-semibold inline-block">
                Ajustes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };
  
  export default Component2;