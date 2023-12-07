import { useState } from "react"
import { VerMenu } from "./PlantillaMenu/VerMenu"
import { InfoPlantillaMenuPage } from "./PlantillaMenu/infoPlantillaMenuPage"
import { PlantillaMenuTable } from "./PlantillaMenu/PlantillaMenuTable"
import { EventsGroupContextProvider } from "../../context/EventsGroupContext"

export const PlantillaMenu = ({setComponentState}) => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
    const {eventsGroup} = EventsGroupContextProvider()
    const dataComponents = [
       /*  {

            component: <PlantillaMenuTable setActionButton={setOptionSelect} actionButton={optionSelect} setComponentState={setComponentState}/>

        }, */
        {
            component: <VerMenu setChildrenComponentState={setOptionSelect} />
        },

    ]
    return (
        <div className="px-5 py-2 h-full">
            {(() => {
                if (eventsGroup.length == 0) {
                    return (
                        <InfoPlantillaMenuPage actionButton={state} setActionButton={setState} setComponentState={setComponentState}/>
                    )
                } else {
                    if (state2) {
                        return (

                            <div>
                                {dataComponents[optionSelect].component}
                            </div>
                        )
                    } else {
                        return (
                            <>
                            </>
                        )
                    }
                }
            })()}

        </div >
    )
}