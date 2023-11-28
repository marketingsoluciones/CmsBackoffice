import { EventContextProvider } from "../context/EventContext"
import { EventsGroupContextProvider } from "../context/EventsGroupContext"
export const EventoSelect = () => {
    const { event, setEvent } = EventContextProvider()
    const { eventsGroup } = EventsGroupContextProvider()
    const EventArry = eventsGroup.reduce((acc, el) => acc.concat(el.nombre), [])
    const EventArryReverse = EventArry.reverse()

    const handleChange = (e) => {
        try {
            setEvent(eventsGroup.find((el) => el.nombre === e))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="relative h-10 w-72 min-w-[200px] cursor-pointer">
                <select
                    value={event.nombre}
                    onChange={(e) => { handleChange(e.target.value) }}
                    className="  cursor-pointer peer h-full w-[55%] rounded-[7px] border border-gray-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all* placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                >
                    {
                        EventArryReverse.map((item, idx) => {
                            return (
                                <option key={idx} value={item}> {item}</option>
                            )
                        })
                    }
                </select>
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-[55%] select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all* before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-500 before:transition-all* after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-500 after:transition-all* peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2* peer-focus:before:border-l-2* peer-focus:before:border-pink-500 peer-focus:after:border-t-2* peer-focus:after:border-r-2* peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Elige tu evento
                </label>
            </div>
        </>
    )
}