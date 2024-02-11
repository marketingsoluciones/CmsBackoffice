import { useState } from "react"
import { ItinerarioWeddingTable } from "../WeddingPlannerComponents/ItinerarioComponents/ItinerarioWeddingTable"
import { Itinerario } from "../Itinerario/Itinerario"
import { ItinerarioInfoPage } from "../WeddingPlannerComponents/ItinerarioComponents/ItinerarioInfoPage"
import { EventsGroupContextProvider } from "../../context/EventsGroupContext"

export const ItinerarioLugaresBodas = ({ setComponentState }) => {
    const [optionSelect, setOptionSelect] = useState(0)
    const { eventsGroup } = EventsGroupContextProvider()
    const dataComponents = [
        {
            component: <ItinerarioWeddingTable setOptionSelect={setOptionSelect} />
        },
        {
            component: <Itinerario setChildrenComponentState={setOptionSelect} />
        },

    ]

    return (
        <div className="px-5 py-2 h-full">
            {
                eventsGroup.length == 0 ?
                    <ItinerarioInfoPage setComponentState={setComponentState} idxComponent={4} />
                    :
                    <div>
                        {dataComponents[optionSelect].component}
                    </div>

            }
        </div >
    )
}