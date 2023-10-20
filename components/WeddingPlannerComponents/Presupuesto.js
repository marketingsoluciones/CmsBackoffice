import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { PresupuestoTable } from "./PresupuestoComponents/PresupuestoTable"
import { AddPresupuesto } from "./PresupuestoComponents/AddPresupuesto"

export const Presupuesto = () => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)

    const dataComponents = [
        {
            component: <PresupuestoTable setOptionSelect={setOptionSelect} />
        },
        {
            component: <AddPresupuesto setOptionSelect={setOptionSelect} />
        },

    ]

    return (
        <div className="px-5 py-2 h-full">
            {(() => {
                if (state) {
                    return (
                        ""
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