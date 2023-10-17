import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { PlanoEventoTable } from "./PlanoEventoComponents/PlanoEventoTable"
import { InfoPlanoEventoPage } from "./PlanoEventoComponents/InfoPlanoEventoPage"

export const PlanoEvento = () => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
    const dataComponents = [
        {
            component: <PlanoEventoTable />
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
                        <InfoPlanoEventoPage actionButton={state2} setActionButton={setState2} />

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
                                title={"Plano del Evento"}
                                button={"Agregar Plano"}
                                text={"Aún no tienes Planos guardadas"}
                                accion={"añade tu Plano"}
                            />
                        )
                    }
                }
            })()}

        </div >

    )
}