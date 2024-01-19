import { EventContextProvider } from "../../../context/EventContext";
import { Task } from "./Task"
import { fetchApiEventos, queries } from "../../../utils/Fetching";
import { SubHeader } from "./SubHeader";
import { AddEvent } from "./AddEvent";
import { GuardarButtom } from "./GuardarButtom";
import { useEffect, useState } from "react";
import { AuthContextProvider } from "../../../context";


export const Itinerario = ({ data }) => {
    const { domain } = AuthContextProvider()
    const { event, setEvent } = EventContextProvider()
    const newDate = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = newDate.toLocaleDateString(navigator?.languages, options)
    const [itinerario, setItinerario] = useState()
    const [tasks, setTasks] = useState()

    useEffect(() => {
        const itinerario = event?.itinerarios_array?.find(elem => elem.title === data?.title)
        setItinerario({ ...itinerario })
        if (itinerario?.tasks?.length > 0) {
            setTasks([...itinerario?.tasks?.sort((a, b) => a.hora.localeCompare(b.hora))])
        }
    }, [data, event])

    useEffect(() => {
        if (event && !event?.itinerarios_array?.find(elem => elem.title == data.title)) {
            try {
                fetchApiEventos({
                    query: queries?.createItinerario,
                    variables: {
                        eventID: event._id,
                        title: data?.title
                    },
                    domain
                }).then((result) => {
                    setEvent((old) => {
                        old.itinerarios_array.push(result)
                        return { ...old }
                    })
                })
            } catch (error) {
                console.log(error)
            };
        }
    }, [event])


    return (
        <>
            <SubHeader date={date} title={data?.title} itinerario={itinerario} />
            <div className="w-full h-full overflow-auto flex flex-col items-center">
                <div className="w-full">
                    {tasks?.map((elem, idx) => {
                        return (
                            <Task task={elem} key={idx} date={date} itinerario={itinerario} />
                        )
                    })
                    }
                </div>
                <AddEvent tasks={tasks} itinerario={itinerario} />
            </div>
            <GuardarButtom />
        </>
    )
}


