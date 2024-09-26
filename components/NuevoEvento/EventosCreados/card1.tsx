import { FC } from "react";
interface propsCard1 {
  componentState?: any;
  setComponentState?: any;
  icon?: any;
  title?: any;
  content?: any;
  urls?: any;
}

const Card1: FC<propsCard1> = ({ icon, title, content, urls, componentState, setComponentState }) => {
  return (
    <div onClick={() => {
      setComponentState(urls)
    }} className="cursor-pointer w-[50%] rounded-lg bg-white overflow-hidden flex flex-row items-center justify-start py-0 pr-2.5 pl-0 box-border gap-[5px] min-w-[237px] max-w-full mq1100:flex-wrap mq1100:pl-2.5 mq1100:pt-2.5 mq1100:pb-2.5 mq1100:box-border">
      <div className="bg-rosa h-full w-auto flex flex-row items-start justify-end pt-[13px] pb-[43.900000000001455px] px-2">
        <img
          className="h-[30px] w-[60px] relative"
          loading="lazy"
          alt=""
          src={icon} // Utiliza la variable 'icon' para la ruta de la imagen
        />
      </div>
      <div className="flex flex-col items-start justify-start gap-[5px] text-sm">
        <div className="relative leading-[21px] font-semibold inline-block min-w-[122px]">
          {title}
        </div>
        <div className="relative text-xs leading-[14px] text-gray-400">
          {content}
        </div>
      </div>
    </div>

  );
};

export default Card1;