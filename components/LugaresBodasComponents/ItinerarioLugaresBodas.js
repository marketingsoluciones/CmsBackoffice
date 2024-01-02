import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { ItinerarioWeddingTable } from "../WeddingPlannerComponents/ItinerarioComponents/ItinerarioWeddingTable"
import { Itinerario } from "../Itinerario/Itinerario"
import { ItinerarioInfoPage } from "../WeddingPlannerComponents/ItinerarioComponents/ItinerarioInfoPage"

export const ItinerarioLugaresBodas = ({setComponentState}) => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
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
            {(() => {
                if (!state) {
                    return (
                        <ItinerarioInfoPage setComponentState={setComponentState} idxComponent={4}/>
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
                                text={"Aún no tienes un Itinerario creado"}
                                accion={"Agrega tu Itinerario"}
                            />
                        )
                    }

                }
            })()}

        </div >
    )
}