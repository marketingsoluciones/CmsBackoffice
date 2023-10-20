import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { InvitadosWeddingTable } from "./InvitadosComponents/InvitadosWeddingTable"
import { AddListaInvitados } from "../LugaresBodasComponents/ListaInvitadosComponents/AddListaInvitados"
import { InfoListaInvitadosPage } from "../LugaresBodasComponents/ListaInvitadosComponents/InfoListaInvitadosPage"

export const InvitadosWeddingPlanner = () => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
    const dataComponents = [
        {
            component: <InvitadosWeddingTable setOptionSelect={setOptionSelect} />
        },
        {
            component: <AddListaInvitados setOptionSelect={setOptionSelect} />
        },

    ]
    return (
        <>
            <div className="px-5 py-2 h-full">
                {(() => {
                    if (state) {
                        return (
                            <InfoListaInvitadosPage actionButton={state} setActionButton={setState} />
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
                                    title={"Lista de invitados"}
                                    button={"Agregar invitados"}
                                    text={"Aún no tienes Invitados"}
                                    accion={"Agrega invitados"}
                                />
                            )
                        }
                    }
                })()}

            </div >

        </>
    )
}
