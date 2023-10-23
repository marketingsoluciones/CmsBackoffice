import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { ColeccionesInfoPage } from "./ColeccionsComponents/ColeccionsInfoPage"

export const Colecciones = () => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
    const dataComponents = [
        {
            component: ""
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
                        <ColeccionesInfoPage/>
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