import { useState } from "react"
import { InfoPageEvent } from "./EventosComponents/InfoPageEvent"
import { CardVeiw } from "./EventosComponents/CardVeiw"
import { VistaSinDatos } from "./VistaSinDatos"

export const Eventos = () => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)

    const dataComponents = [
        {
            component: <CardVeiw />
        },
        {
            component: ""
        },

    ]

    return (
        <div className=" px-5 py-2 space-y-2 h-[90%] ">
            {(() => {
                if (state) {
                    return (
                        <InfoPageEvent actionButton={state} setActionButton={setState} />
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
                                title={""}
                                button={"Crear evento"}
                                text={"Aún no tienes eventos para organizar"}
                                accion={"crear evento"}
                            />
                        )
                    }

                }
            })()}
        </div>
    )
}