import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos.js"
import { InvitadosCateringTable } from "./InvitadosComponents/InvitadosCateringTable.js"
import { InfoListaInvitadosPage } from "../LugaresBodasComponents/ListaInvitadosComponents/InfoListaInvitadosPage.js"
import { AddListaInvitados } from "../LugaresBodasComponents/ListaInvitadosComponents/AddListaInvitados.js"

export const InvitadosC = ({setComponentState}) => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
    const dataComponents = [
        {

            component: <InvitadosCateringTable setOptionSelect={setOptionSelect} setComponentState={setComponentState} />

        },
        {
            component: <AddListaInvitados setOptionSelect={setOptionSelect} setChildrenComponentState={setOptionSelect} />
        },

    ]

    const onClick = () => {

    }
    return (
        <div className="px-5 py-2 h-full">
            {(() => {
                if (state) {
                    return (
                        <InfoListaInvitadosPage state={state} setState={setState} setComponentState={setComponentState} idxComponent={5} />
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