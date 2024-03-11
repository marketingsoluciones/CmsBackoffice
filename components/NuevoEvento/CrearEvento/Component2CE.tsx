import { FC, FunctionComponent, memo } from "react";
interface propsInicioCE {
  componentState: any;
  setComponentState: any;

}

const Component2CE: FC <propsInicioCE> = memo(({componentState,setComponentState}) => {
  return (
    <div className="self-stretch flex flex-row items-center justify-between py-0 px-5 gap-[20px] text-left text-7xl-3 text-black font-semibold">
      <div className="flex flex-row items-center justify-center gap-[12px]">
        <div className="flex flex-col items-start justify-start">
          <div onClick={()=>{ 
        setComponentState(2)
      }}className="cursor-pointer flex flex-row items-start justify-start">
            <img
              className="h-[24px] w-[24px] relative overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src="ModuloEvento/FlechaIzquerda.svg"
            />
          </div>
        </div>
        <div className="overflow-hidden flex flex-col items-start justify-start">
          <div className="w-auto h-auto relative leading-[31.5px] font-semibold inline-block max-h-[31.5px] mq450:text-2xl mq450:leading-[25px]">
            Configurar evento
          </div>
        </div>
      </div>
      <div className="h-[54px] w-[222px] rounded-2xl bg-success-states-outlinedborder box-border border-[1px] border-solid border-success-light" />
    </div>
  );
});

export default Component2CE;