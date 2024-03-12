import { useState } from "react"
import { VerMenu } from "./PlantillaMenu/VerMenu"
import { InfoPlantillaMenuPage } from "./PlantillaMenu/infoPlantillaMenuPage"

export const PlantillaMenu = ({ setComponentState }) => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
    const dataComponents = [
        {
            component: <VerMenu setChildrenComponentState={setOptionSelect} />
        },
    ]
    return (
        <div className="px-5 py-2 w-full h-full">
            {state
                ? <InfoPlantillaMenuPage actionButton={state} setActionButton={setState} setComponentState={setComponentState} />
                : state2 &&
                <div>
                    {dataComponents[optionSelect].component}
                </div>
            }
        </div >
    )
}