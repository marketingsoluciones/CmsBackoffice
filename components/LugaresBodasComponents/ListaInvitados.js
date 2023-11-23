import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { ListaInvitadosTable } from "./ListaInvitadosComponents/ListaInvitadosTable"
import { AddListaInvitados } from "./ListaInvitadosComponents/AddListaInvitados"
import { InfoListaInvitadosPage } from "./ListaInvitadosComponents/InfoListaInvitadosPage"
import { EventContextProvider } from "../../context/EventContext"
import { useEffect } from "react"

export const ListaInvitados = () => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
    const { event } = EventContextProvider()

    useEffect(() => {
        if (event.invitados_array.length != 0){
            setState(false)
        }
    }, [event])
   

    const dataComponents = [
        {
            component: <ListaInvitadosTable setActionButton={setOptionSelect} />
        },
        {
            component: <AddListaInvitados />
        },

    ]


    return (
        <>
            <div className="px-5 py-2 h-full">
                {(() => {
                    if (state) {
                        return (
                            <InfoListaInvitadosPage setState={setState} state={state} />
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