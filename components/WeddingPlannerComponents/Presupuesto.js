import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { PresupuestoTable } from "./PresupuestoComponents/PresupuestoTable"

export const Presupuesto = () => {
    const [state, setState] = useState(true)

    return (
            <div className="px-5 py-2 h-full">
                {(() => {
                    if (!state) {
                        return (
                            <VistaSinDatos
                                title={"Presupuesto"}
                                button={"Crear"}
                                text={"Aún no tienes un presupuesto creado"}
                                accion={"Agrega tu presupuesto"}
                            />
                        )
                    } else {
                        return (
                            <PresupuestoTable/>
                        )
                    }
                })()}

            </div >
    )
}