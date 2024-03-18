import { Itinerario } from "../Itinerario/Itinerario"
import { ItinerarioInfoPage } from "../WeddingPlannerComponents/ItinerarioComponents/ItinerarioInfoPage"
import { EventsGroupContextProvider } from "../../context/EventsGroupContext"

export const ItinerarioC = ({ setComponentState }) => {
    const { eventsGroup } = EventsGroupContextProvider()
   

    return (

        <div className="px-5 py-2 w-full h-full">
            {eventsGroup.length == 0
                ? <ItinerarioInfoPage setComponentState={setComponentState} idxComponent={5} />
                : <div>
                   <Itinerario setComponentState={setComponentState} idxComponent={5} />
                </div>
            }
        </div >


    )
}