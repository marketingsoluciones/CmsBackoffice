import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { ListaInvitadosTable } from "./ListaInvitadosComponents/ListaInvitadosTable"
import { AddListaInvitados } from "./ListaInvitadosComponents/AddListaInvitados"
import { InfoListaInvitadosPage } from "./ListaInvitadosComponents/InfoListaInvitadosPage"

export const ListaInvitados = () => {
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
                                button={"Crear lista"}
                                text={"Aún no tienes Invitados agregados"}
                                accion={"Agrega un Invitado"}
                            />
                        )
                    } else {
                        if (!state2) {
                            return (
                                <ListaInvitadosTable actionButton={state2} setActionButton={setState2} />
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