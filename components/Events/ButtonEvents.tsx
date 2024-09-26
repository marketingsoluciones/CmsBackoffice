import { FC } from "react";

interface props {
  text: string
  onClick: any
}

export const ButtonEvents: FC<props> = ({ text, onClick }) => {

  return (
    <button onClick={() => onClick()} className="cursor-pointer [border:none] py-2.5 px-2 bg-rosa rounded-md h-[30px] flex flex-row items-center justify-center box-border">
      <b className="relative text-base leading-[24px] font-poppins text-white text-center">
        {text}
      </b>
    </button>
  )
}