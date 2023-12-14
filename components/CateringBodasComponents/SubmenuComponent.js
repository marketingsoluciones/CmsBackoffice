import { EventoSelect } from "../EventoSelect"
import { EventsGroupContextProvider } from "../../context/EventsGroupContext"
import { ModalLeft } from "../modals/ModalLeft"
import { FormCrearEvento } from "../EventosComponents/FormCrearEvento"
import { useState } from "react"
import { ArrowDownIcon } from "../Icons/index"
import { SlOptionsVertical } from "react-icons/sl";

export const SubmenuComponent = ({ dataComponents, optionSelect, onClick }) => {
    const { eventsGroup } = EventsGroupContextProvider()
    const [isMounted, setIsMounted] = useState(false);
    const [stateSubOptions, setStateSubOptions] = useState(false)

    return (

        <>
            {(
                <ModalLeft state={isMounted} set={setIsMounted}>
                    {
                        <FormCrearEvento state={isMounted} set={setIsMounted} />
                    }
                </ModalLeft>
            )}
            {(() => {
                if (screen.width > 640) {
                    return (
                        <div className=" hidden md:block bg-gray-200 px-4 py-5 space-y-5 col-span-1">
                            {eventsGroup?.length != 0 ? <EventoSelect /> : <ButtonEventForm isMounted={isMounted} setIsMounted={setIsMounted} />}
                            {
                                dataComponents.map((item, idx) => {
                                    return (
                                        <div key={idx} onClick={() => onClick(idx)} className={`${optionSelect === idx ? " text-rosa " : ""} flex  items-center  space-x-3 cursor-pointer  `}>
                                            <div className="h-full">
                                                {
                                                    item.icon
                                                }
                                            </div>
                                            <div className="text-sm">
                                                {
                                                    item.title
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
                if (screen.width < 640) {
                    return (

                        <div className=" relative  ">
                            <div className="flex items-center  space-x-5 pb-0.5* bg-white z-50 ">
                                <div onClick={() => setStateSubOptions(!stateSubOptions)} className="ml-5">
                                    <SlOptionsVertical />
                                </div>
                                {eventsGroup?.length != 0 ? <EventoSelect /> : <ButtonEventForm isMounted={isMounted} setIsMounted={setIsMounted} />}
                            </div>

                            <div className={`space-y-5 absolute bg-gray-200 px-4 py-5 rounded-b-lg ${stateSubOptions ? "transition w-full duration-500 " : "transition w-full -translate-y-56 duration-500 top-0  "}`}>
                                {
                                    dataComponents.map((item, idx) => {
                                        return (
                                            <div key={idx} onClick={() => onClick(idx)} className={`${optionSelect === idx ? " text-rosa " : ""} flex  items-center  space-x-3 cursor-pointer`}>
                                                <div className="h-full">
                                                    {
                                                        item.icon
                                                    }
                                                </div>
                                                <div className="text-sm">
                                                    {
                                                        item.title
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        /* <div className=" px-4* py-5* h-20 w-[100%] space-y-5 col-span-1* flex overflow-x-auto pb-2 ">
                             {eventsGroup?.length != 0 ? <EventoSelect /> : <ButtonEventForm isMounted={isMounted} setIsMounted={setIsMounted} />}
                            {
                                dataComponents.map((item, idx) => {
                                    return (
                                        <div key={idx} onClick={() => onClick(idx)} className={`${optionSelect === idx ? " text-rosa " : ""} flex  items-center space-x-3 cursor-pointer mt-5 mx-3 pl-3 rounded-lg bg-white  `}>
                                            <div className="h-full*">
                                                {
                                                    item.icon
                                                }
                                            </div>
                                            <div className="text-sm w-36 ">
                                                {
                                                    item.title
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div> */
                    )
                }
            })()}
        </>
    )
}

const ButtonEventForm = ({ setIsMounted, isMounted }) => {
    return (
        <button onClick={() => setIsMounted(!isMounted)} className="text-base bg-rosa text-white rounded-lg p-2 w-[70%] md:w-full">Crea un Evento</button>
    )
}