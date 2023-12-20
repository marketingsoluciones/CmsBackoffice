import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { InvitadosWeddingTable } from "./InvitadosComponents/InvitadosWeddingTable"
import { AddListaInvitados } from "../LugaresBodasComponents/ListaInvitadosComponents/AddListaInvitados"
import { InfoListaInvitadosPage } from "../LugaresBodasComponents/ListaInvitadosComponents/InfoListaInvitadosPage"
import { EventsGroupContextProvider } from "../../context/EventsGroupContext"

export const InvitadosWeddingPlanner = ({ setComponentState }) => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
    const { eventsGroup } = EventsGroupContextProvider()

    const dataComponents = [
        /* {
            component: <InvitadosWeddingTable setOptionSelect={setOptionSelect} setComponentState={setComponentState} />
        }, */
        {
            component: <AddListaInvitados setOptionSelect={setOptionSelect} setChildrenComponentState={setOptionSelect} />
        },

    ]
    return (
        <>
            <div className="px-5 py-2 h-full">
                {(() => {
                    if (eventsGroup.length == 0) {
                        return (
                            <InfoListaInvitadosPage state={state} setState={setState} setComponentState={setComponentState} idxComponent={4} />
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
