import { FC, FunctionComponent } from "react";
import ModoDemo from "../Principal/ModoDemo";
interface propsComponent1 {
  componentState: any;
  setComponentState: any;

}

const Component1: FC<propsComponent1> = ({ componentState, setComponentState }) => {

  return (
    <div className="w-[100%] flex flex-col items-start justify-start pt-[13px] pb-[15px] pr-6 pl-3.5 box-border gap-[14px] text-left text-base-8">
      <div className="self-stretch flex flex-row items-center justify-between gap-[20px] ">
        <div onClick={() => {
          setComponentState(0)
        }}
          className=" cursor-pointer flex flex-row items-center justify-start gap-[10px]">
          <img className="h-[13.9px] w-3.5 relative" loading="lazy" alt="" src="/ModuloEvento/vectorF.svg" />
          <div className="h-auto w-auto relative leading-[24.5px] font-semibold inline-block">
            Configura tu organización
          </div>
        </div>

      </div>

    </div>
  );
};

export default Component1;
