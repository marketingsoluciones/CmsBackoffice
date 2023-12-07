import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { PresupuestoTable } from "./PresupuestoComponents/PresupuestoTable"
import { AddPresupuesto } from "./PresupuestoComponents/AddPresupuesto"
import { InfoPresupuestoPage } from "./PresupuestoComponents/InfoPresupuestoPage"
import { EventsGroupContextProvider } from "../../context/EventsGroupContext"

export const Presupuesto = ({setComponentState}) => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
    const {eventsGroup}= EventsGroupContextProvider()
    const dataComponents = [
        /* {
            component: <PresupuestoTable setOptionSelect={setOptionSelect} setComponentState={setComponentState} />
        }, */
        {
            component: <AddPresupuesto setOptionSelect={setOptionSelect} />
        },

    ]

    return (
        <div className="px-5 py-2 h-full">
            {(() => {
                if (eventsGroup.length == 0) {
                    return (
                        <InfoPresupuestoPage actionButton={state} setActionButton={setState} setComponentState={setComponentState}/>
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
                                title={"Presupuesto"}
                                button={"Crear"}
                                text={"Aún no tienes un presupuesto creado"}
                                accion={"Agrega tu presupuesto"}
                            />
                        )
                    }
                }
            })()}

        </div >
    )
}