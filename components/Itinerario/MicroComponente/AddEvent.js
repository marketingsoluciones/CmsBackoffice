import { useEffect } from "react"
import { EventContextProvider } from "../../../context/EventContext"
import { fetchApiEventos, queries } from "../../../utils/Fetching"

export const AddEvent = ({ data, itinerario }) => {
    const { event, setEvent } = EventContextProvider()

    const addTask = async () => {
        try {
            const addNewTask = await fetchApiEventos({
                query: queries.createTask,
                variables: {
                    eventID: event._id,
                    itinerarioID: itinerario._id,
                    taskID: data?.title,
                    hora: "10:00"
                }
            })
            setEvent((old) => {
                const f1 = old.itinerarios_array.findIndex(elem => elem._id === itinerario._id)
                old.itinerarios_array[f1].tasks.push(addNewTask)
                return { ...old }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(event?.itinerarios_array)
    }, [event])


    return (
        <div onClick={() => addTask()} className="flex space-x-2 items-center justify-center mt-3 cursor-pointer hover:text-pink-600">
            <span>
                +
            </span>
            <span className="text-rosa hover:text-pink-600">
                Añadir actividad
            </span>
        </div>
    )
}