import { FC } from "react";

interface props {
  selected: boolean
  onClick: () => void
  icon: JSX.Element
  label: string
}

export const ButtonUnroll: FC<props> = ({ icon, label, onClick, selected }) => {

  return (
    <button
      onClick={onClick}
      className={`tab-button ${selected
        ? 'flex flex-row gap-2 rounded-full h-full items-center justify-center p-[8px] pr-[12px] border-b-[2px] border-solid text-black text-sm bg-pink-200 font-semibold'
        : 'flex flex-row gap-2 rounded-full h-full items-center justify-center text-sm p-[8px] bg-white text-gray-600 hover:bg-slate-200'
        }`}
    >
      <div
        className={`tab-icon ${selected
          ? 'w-8 h-8 rounded-full bg-rosa flex flex-row items-center justify-center p-[7px] box-border'
          : 'w-8 h-8 rounded-full bg-gray-600 flex flex-row items-center justify-center p-[7px] box-border hover:bg-gray-400'
          }`}
      >
        {icon}
      </div>
      {selected && label}
    </button>
  )
}