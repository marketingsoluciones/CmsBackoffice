import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos.js"
import { InvitadosCateringTable } from "./InvitadosComponents/InvitadosCateringTable.js"
import { InfoListaInvitadosPage } from "../LugaresBodasComponents/ListaInvitadosComponents/InfoListaInvitadosPage.js"
import { AddListaInvitados } from "../LugaresBodasComponents/ListaInvitadosComponents/AddListaInvitados.js"

export const InvitadosC = () => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
    const dataComponents = [
        {

            component: <InvitadosCateringTable setOptionSelect={setOptionSelect} />

        },
        {
            component: <AddListaInvitados setOptionSelect={setOptionSelect} />
        },

    ]

    const onClick = () => {

    }
    return (
        <div className="px-5 py-2 h-full">
            {(() => {
                if (state) {
                    return (
                        <InfoListaInvitadosPage state={state} setState={setState} />
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
                                button={"Crear lista"}
                                text={"Aún no tienes una lista de invitados"}
                                accion={"añade tu Lista de invitados"}
                            />
                        )
                    }
                }
            })()}

            
        </div>
    )
}