import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { ColeccionesInfoPage } from "./ColeccionsComponents/ColeccionsInfoPage"

export const Colecciones = ({ setComponentState }) => {
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
        <div className="w-full h-full">
            {state
                ? <ColeccionesInfoPage setComponentState={setComponentState} />
                : state2
                    ? <div>
                        {dataComponents[optionSelect].component}
                    </div>
                    : <VistaSinDatos
                        title={"Itinerario"}
                        button={"Agregar Itinerario"}
                        text={"Aún no tienes un Itinerario creado"}
                        accion={"Agrega tu Itinerario"}
                    />
            }
        </div >
    )
}