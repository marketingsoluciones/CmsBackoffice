import { useState } from "react"
import { ItinerarioWeddingTable } from "./ItinerarioComponents/ItinerarioWeddingTable"
import { Itinerario } from "../Itinerario/Itinerario"
import { ItinerarioInfoPage } from "./ItinerarioComponents/ItinerarioInfoPage"
import { EventsGroupContextProvider } from "../../context/EventsGroupContext"

export const ItinerarioWeddingPlanner = ({ setComponentState }) => {
    const [state2, setState2] = useState(true)
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
        <div className="w-full h-full px-5 py-2">
            {eventsGroup.length == 0
                ? <ItinerarioInfoPage setOptionSelect={setOptionSelect} setComponentState={setComponentState} idxComponent={5} />
                : <div>
                    {dataComponents[optionSelect].component}
                </div>
            }
        </div >
    )
}