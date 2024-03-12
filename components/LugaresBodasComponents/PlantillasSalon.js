import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { PlantillaSalonTable } from "./PlantillaComponents/PlantillaSalonTable"
import { InfoPlantillaSalonPage } from "./PlantillaComponents/InfoPlantillaSalonPage"

export const PlantillaSalon = ({ componentState, setComponentState }) => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
    const dataComponents = [
        {
            component: "" /* <PlantillaSalonTable componentState={componentState} setComponentState={setComponentState} /> */
        },
        {
            component: ""
        },
    ]

    return (
        <div className="px-5 py-2 h-full">
            {(() => {
                if (state) {
                    return (
                        <InfoPlantillaSalonPage componentState={componentState} setComponentState={setComponentState} />
                    )
                } else {
                    if (state2) {

                        return (
                            <div>
                                {dataComponents[optionSelect].component}
                            </div>
                        )
                    } 
                }
            })()}

        </div >
    )
}