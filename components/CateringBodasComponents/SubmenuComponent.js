import { EventoSelect } from "../EventoSelect";
import { EventsGroupContextProvider } from "../../context/EventsGroupContext";
import { ModalLeft } from "../modals/ModalLeft";
import { FormCrearEvento } from "../EventosComponents/FormCrearEvento";
import { useState } from "react";
import { ArrowDownIcon } from "../Icons/index";
import { SlOptionsVertical } from "react-icons/sl";
import ClickAwayListener from "react-click-away-listener";
import { useRouter } from "next/router";

export const SubmenuComponent = ({ dataComponents, optionSelect, onClick }) => {
  const { eventsGroup } = EventsGroupContextProvider();
  const [isMounted, setIsMounted] = useState(false);
  const [stateSubOptions, setStateSubOptions] = useState(false);
  const router = useRouter();

  return (
    <>
      <ModalLeft state={isMounted} set={setIsMounted}>
        <FormCrearEvento state={isMounted} set={setIsMounted} />
      </ModalLeft>
      <div className="block bg-gray-200 px-2 py-5 space-y-5 w-[190px] z-10">
        {dataComponents.map((item, idx) => {
          return (
            <div
              key={idx}
              onClick={() => item.url != undefined ? router.push(item?.url) : onClick(idx)}
              className={`${optionSelect == idx ? " text-rosa " : " text-azulCorporativo"
                } flex  items-center  space-x-3 cursor-pointer`}
            >
              <div className="h-full">{item.icon}</div>
              <div className="text-sm ">
                {item.title}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const ButtonEventForm = ({ setIsMounted, isMounted }) => {
  return (
    <button
      onClick={() => setIsMounted(!isMounted)}
      className="text-base bg-rosa text-white rounded-lg p-2 w-[70%] md:w-full"
    >
      Crea un Evento
    </button>
  );
};
