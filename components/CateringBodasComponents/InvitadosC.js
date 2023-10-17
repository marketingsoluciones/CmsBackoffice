import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos.js"
import { InvitadosCateringTable } from "./InvitadosComponents/InvitadosCateringTable.js"
import { InfoListaInvitadosPage } from "../LugaresBodasComponents/ListaInvitadosComponents/InfoListaInvitadosPage.js"
import { AddListaInvitados } from "../LugaresBodasComponents/ListaInvitadosComponents/AddListaInvitados.js"

export const InvitadosC = () => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [state3, setState3] = useState(true)
    return (
        <div className="px-5 py-2 h-full">
            {(() => {
                if (!state) {
                    return (
                        <>
                            <VistaSinDatos
                                title={"Lista de invitados"}
                                button={"Crear lista"}
                                text={"Aún no tienes una lista de invitados"}
                                accion={"añade tu Lista de invitados"}
                            />
                        </>
                    )
                } else {
                    if (!state2) {
                        return (
                            <InvitadosCateringTable />
                        )
                    } else if (state3) {
                        return (
                            <InfoListaInvitadosPage />
                        )
                    }

                    else {
                        return (

                            <AddListaInvitados />
                        )
                    }

                }
            })()}

        </div>
    )
}