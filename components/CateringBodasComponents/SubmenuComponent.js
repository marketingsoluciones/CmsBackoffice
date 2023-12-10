import { EventoSelect } from "../EventoSelect"
import { EventsGroupContextProvider } from "../../context/EventsGroupContext"
import { ModalLeft } from "../modals/ModalLeft"
import { FormCrearEvento } from "../EventosComponents/FormCrearEvento"
import { useState } from "react"

export const SubmenuComponent = ({ dataComponents, optionSelect, onClick }) => {
    const { eventsGroup } = EventsGroupContextProvider()
    const [isMounted, setIsMounted] = useState(false);
  
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
                        <div className=" px-4* py-5* h-20 w-[100%] space-y-5 col-span-1* flex overflow-x-auto pb-2 ">
                            {/*  {eventsGroup?.length != 0 ? <EventoSelect /> : <ButtonEventForm isMounted={isMounted} setIsMounted={setIsMounted} />} */}
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
                        </div>
                    )
                }
            })()}
        </>
    )
}

const ButtonEventForm = ({ setIsMounted, isMounted }) => {
    return (
        <button onClick={() => setIsMounted(!isMounted)} className="text-base bg-rosa text-white rounded-lg p-2 w-full">Crea un Evento</button>
    )
}