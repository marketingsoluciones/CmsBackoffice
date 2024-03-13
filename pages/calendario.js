import { Calendario } from "../components/Calendario"

const CalendarioPage = () => {
    return (
        <div className="flex flex-col" >
            <p className=" mt-1 px-5 text-3xl text-rosa">
                Calendario
            </p>
            <Calendario />
        </div >
    )
}

export default CalendarioPage