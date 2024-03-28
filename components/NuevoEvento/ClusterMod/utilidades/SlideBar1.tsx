import { EventsGroupContextProvider } from "../../../../context/EventsGroupContext";
import { ModalLeft } from "../../../modals/ModalLeft";
import { FormCrearEvento } from "../../../EventosComponents/FormCrearEvento";
import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { useRouter } from "next/router";

export const SlideBar1 = ({ dataComponents, optionSelect, onClick }) => {
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
            <div className=" hidden md:block bg-gray-100 px-2 py-5 space-y-5 w-[190px] z-10 ">

              {dataComponents.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => onClick(idx)}
                    className={`${optionSelect == idx ? " text-rosa bg-[#F6E2E9] rounded-md px-1 py-1 font-medium " : " text-azulCorporativo hover:bg-[#E3E5E8] rounded-md px-1 py-1 hover:font-medium "
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