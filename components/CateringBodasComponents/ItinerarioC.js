import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { ItinerarioWeddingTable } from "../WeddingPlannerComponents/ItinerarioComponents/ItinerarioWeddingTable"
import { Itinerario } from "../Itinerario/Itinerario"
import { ItinerarioInfoPage } from "../WeddingPlannerComponents/ItinerarioComponents/ItinerarioInfoPage"

export const ItinerarioC = ({setComponentState}) => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
    const dataComponents = [
        {
            component: <ItinerarioWeddingTable setOptionSelect={setOptionSelect} setComponentState={setComponentState}  />
        },
        {
            component: <Itinerario setChildrenComponentState={setOptionSelect} />
        },

    ]


    return (

        <div className="px-5 py-2 h-full">
            {(() => {
                if (state) {
                    return (
                        <ItinerarioInfoPage setComponentState={setComponentState} idxComponent={5} />
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
                            <VistaSinDatos
                                title={"Itinerario"}
                                button={"Agregar Itinerario"}
                                text={"Aún no tienes Itinerarios guardados"}
                                accion={"añade tu Itinerario"}
                            />
                        )
                    }
                }
            })()}

        </div >


    )
}