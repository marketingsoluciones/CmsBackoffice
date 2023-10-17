import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { InvitadosWeddingTable } from "./InvitadosComponents/InvitadosWeddingTable"
import { AddListaInvitados } from "../LugaresBodasComponents/ListaInvitadosComponents/AddListaInvitados"
import { InfoListaInvitadosPage } from "../LugaresBodasComponents/ListaInvitadosComponents/InfoListaInvitadosPage"

export const InvitadosWeddingPlanner = () => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [state3, setState3] = useState(true)
    return (
        <>
            <div className="px-5 py-2 h-full">
                {(() => {
                    if (!state) {
                        return (
                            <VistaSinDatos
                                title={"Lista de invitados"}
                                button={"Agregar invitados"}
                                text={"Aún no tienes Invitados"}
                                accion={"Agrega invitados"}
                            />
                        )
                    } else {
                        if (!state2) {
                            return (
                                <InvitadosWeddingTable/>
                            )
                        } else if (state3) {
                            return (
                                <InfoListaInvitadosPage/>
                            )
                        }

                        else {
                            return (

                                <AddListaInvitados />
                            )
                        }
                    }
                })()}

            </div >

        </>
    )
}