import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { ItinerarioWeddingTable } from "../WeddingPlannerComponents/ItinerarioComponents/ItinerarioWeddingTable"
import { Itinerario } from "../Itinerario/Itinerario"

export const ItinerarioC = () => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)


    return (

        <div className="px-5 py-2 h-full">
            {(() => {
                if (!state) {
                    return (
                        <VistaSinDatos
                            title={"Itinerario"}
                            button={"Agregar Itinerario"}
                            text={"Aún no tienes Itinerarios guardados"}
                            accion={"añade tu Itinerario"}
                        />
                    )
                } else {
                    if (state2) {
                        return (
                            
                            <ItinerarioWeddingTable actionButton={state2} setActionButton={setState2} />
                        )
                    } else {
                        return (
                            <>
                                <Itinerario />
                            </>
                        )
                    }
                }
            })()}

        </div >


    )
}