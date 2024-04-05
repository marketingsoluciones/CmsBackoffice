import { useState } from "react"
import { ItinerarioWeddingTable } from "./ItinerarioComponents/ItinerarioWeddingTable"
import { Itinerario } from "../Itinerario/Itinerario"
import { ItinerarioInfoPage } from "./ItinerarioComponents/ItinerarioInfoPage"
import { EventsGroupContextProvider } from "../../context/EventsGroupContext"

export const ItinerarioWeddingPlanner = ({ setComponentState }) => {
    const [optionSelect, setOptionSelect] = useState(0)
    const { eventsGroup } = EventsGroupContextProvider()

    return (
        <div className="w-full h-full px-5 py-2">
            {eventsGroup.length == 0
                ? <ItinerarioInfoPage setOptionSelect={setOptionSelect} setComponentState={setComponentState} idxComponent={5} />
                : <div>
                    <Itinerario setComponentState={setComponentState} idxComponent={5}/>
                </div>
            }
        </div >
    )
}