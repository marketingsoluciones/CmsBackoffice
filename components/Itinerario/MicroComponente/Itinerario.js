import { Modal } from "../../modals/Modal";
import { EventContextProvider } from "../../../context/EventContext";
import { Task } from "./Task"
import { fetchApiEventos, queries } from "../../../utils/Fetching";
import { SubHeader } from "./SubHeader";
import { AddEvent } from "./AddEvent";
import { GuardarButtom } from "./GuardarButtom";
import { useEffect, useState } from "react";


export const Itinerario = ({ data }) => {
    const { event, setEvent } = EventContextProvider()
    const newDate = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = newDate.toLocaleDateString(navigator?.languages, options)
    const itinerario = event?.itinerarios_array?.find(elem => elem.title === data?.title)

    if (!event?.itinerarios_array?.find(elem => elem.title == data.title)) {
        try {
            fetchApiEventos({
                query: queries?.createItinerario,
                variables: {
                    eventID: event._id,
                    title: data?.title
                }
            }).then(
                (result) => {
                    console.log("fetch create iter", result)
                    setEvent((old) => {
                        old.itinerarios_array.push(result)
                        return { ...old }
                    })
                }
            )
        } catch (error) {
            console.log(error)
        };
    }



    return (
        <>
            <SubHeader date={date} title={data?.title} />
            <div className="w-full h-full overflow-auto flex flex-col items-center">
                <div className="w-full">
                    {itinerario?.tasks?.map((elem, idx) => {
                        return (
                            <Task task={elem} key={idx} date={date} itinerario={itinerario} />
                        )
                    })
                    }
                </div>
                <AddEvent date={date} itinerario={itinerario} />
            </div>
            <GuardarButtom />
        </>
    )
}


