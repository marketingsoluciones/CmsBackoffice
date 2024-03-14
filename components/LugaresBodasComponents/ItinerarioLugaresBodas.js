import { useState } from "react"
import { ItinerarioWeddingTable } from "../WeddingPlannerComponents/ItinerarioComponents/ItinerarioWeddingTable"
import { Itinerario } from "../Itinerario/Itinerario"
import { ItinerarioInfoPage } from "../WeddingPlannerComponents/ItinerarioComponents/ItinerarioInfoPage"
import { EventsGroupContextProvider } from "../../context/EventsGroupContext"

export const ItinerarioLugaresBodas = ({ setComponentState }) => {
   
    const { eventsGroup } = EventsGroupContextProvider()
 

    return (
        <div className="px-5 py-2 h-full">
            {
                eventsGroup.length ?
                    <div>
                        <Itinerario  setComponentState={setComponentState} idxComponent={4} />
                    </div> :
                    <ItinerarioInfoPage setComponentState={setComponentState} idxComponent={4} />
            }
        </div >
    )
}