import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { ListaInvitadosTable } from "./ListaInvitadosComponents/ListaInvitadosTable"
import { AddListaInvitados } from "./ListaInvitadosComponents/AddListaInvitados"
import { InfoListaInvitadosPage } from "./ListaInvitadosComponents/InfoListaInvitadosPage"
import { EventContextProvider } from "../../context/EventContext"
import { useEffect } from "react"
import { EventsGroupContextProvider } from "../../context/EventsGroupContext"

export const ListaInvitados = ({ setComponentState }) => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
    const { event } = EventContextProvider()
    const { eventsGroup } = EventsGroupContextProvider()
    console.log(eventsGroup)
    useEffect(() => {
        if (event?.invitados_array?.length != 0) {
            setState(false)
        }
    }, [event])


    const dataComponents = [
        /* {
            component: <ListaInvitadosTable setActionButton={setOptionSelect} setComponentState={setComponentState} />
        }, */
        {
            component: <AddListaInvitados setChildrenComponentState={setComponentState} />
        },

    ]


    return (
        <>
            <div className="px-5 py-2 h-full">
                {(() => {
                    if (eventsGroup.length == 0) {
                        return (
                            <InfoListaInvitadosPage setState={setState} state={state} setComponentState={setComponentState} idxComponent={4} />
                        )
                    } else {
                        if (state2) {
                            return (
                                <div>
                                    {dataComponents[optionSelect].component}
                                </div>
                            )
                        }
                        else {
                            return (
                                <VistaSinDatos
                                    title={"Lista de invitados"}
                                    button={"Crear lista"}
                                    text={"Aún no tienes Invitados agregados"}
                                    accion={"Agrega un Invitado"}
                                />
                            )
                        }
                    }
                })()}
            </div >

        </>
    )
}