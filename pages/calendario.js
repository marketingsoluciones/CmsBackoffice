import Script from "next/script"
import { useState } from "react"
import { InfoPageCalendario } from "../components/CalendarioComponents/InfoPageCalendario"

const CalendarioPage = () => {
    const [state, setState] = useState(true)
    return (
        <div className="flex flex-col w-full px-5 overflow-auto " >
            <p className=" mt-1 px-5 text-3xl text-rosa">
                Calendario
            </p>
            {
                !state ?
                    <InfoPageCalendario /> :
                    <div className="tidycal-embed -scale-y-1255" data-path="bodasdehoycom/30-minute-meeting"></div>
            }
            <Script src="https://asset-tidycal.b-cdn.net/js/embed.js" />
        </div >
    )
}

export default CalendarioPage