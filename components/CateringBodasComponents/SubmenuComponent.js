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
      {(() => {
        if (screen.width > 640) {
          return (
            <div className=" hidden md:block bg-gray-200 px-2 py-5 space-y-5 w-[190px] z-10 ">
              {router.pathname == "/business" ? null : eventsGroup?.length !=
                0 ? (
                <EventoSelect />
              ) : (
                <ButtonEventForm
                  isMounted={isMounted}
                  setIsMounted={setIsMounted}
                />
              )}

              {dataComponents.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => onClick(idx)}
                    className={`${optionSelect == idx ? " text-rosa " : " text-azulCorporativo"
                      } flex text-rosa items-center  space-x-3 cursor-pointer`}
                  >
                    <div className="h-full">{item.icon}</div>
                    <div className="text-sm ">
                      {item.title}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }
        if (screen.width < 640) {
          return (
            <ClickAwayListener
              onClickAway={() => stateSubOptions && setStateSubOptions(false)}
            >
              <div className=" relative  ">
                <div className="flex items-center  space-x-5 pb-0.5* bg-white z-50 ">
                  <div
                    onClick={() => setStateSubOptions(!stateSubOptions)}
                    className="ml-5"
                  >
                    <SlOptionsVertical />
                  </div>
                  {eventsGroup?.length != 0 ? (
                    <EventoSelect />
                  ) : (
                    <ButtonEventForm
                      isMounted={isMounted}
                      setIsMounted={setIsMounted}
                    />
                  )}
                </div>

                <div
                  className={`space-y-5 absolute bg-gray-200 px-4 py-5 rounded-b-lg ${stateSubOptions
                    ? "transition w-full duration-500 "
                    : "transition w-full -translate-y-56 duration-500 top-0  "
                    }`}
                >
                  {dataComponents.map((item, idx) => {
                    return (
                      <div
                        key={idx}
                        onClick={() => onClick(idx)}
                        className={`${optionSelect === idx ? " text-rosa " : ""
                          } flex  items-center  space-x-3 cursor-pointer`}
                      >
                        <div className="h-full">{item.icon}</div>
                        <div className="text-sm">{item.title}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ClickAwayListener>
          );
        }
      })()}
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
