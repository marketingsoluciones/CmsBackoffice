import { Dispatch, FC, memo, SetStateAction } from 'react'
import { CrearEventoIcon } from '../Icons/index';



const CardCreateEvent = (/* {set, state} */) => {
  /*  const [hoverRef, isHovered] = useHover();
  */
  return (
    <div
      /*  ref={hoverRef} */
      /* onClick={() => set(!state)} */
      className={` space-y-3 w-72 h-36 rounded-xl flex flex-col items-center justify-center my-4 cursor-pointer shadow-lg bg-base border border-gray-100 transition`/*  ${
        isHovered
          ? "transform scale-105 duration-700  text-gray-400"
          : "text-primary"
      }` */}
    >
      <CrearEventoIcon className="w-8 h-8" />
      <p className="font-display font-base text-md">Crear evento</p>
    </div>
  );
};

export default memo(CardCreateEvent)
