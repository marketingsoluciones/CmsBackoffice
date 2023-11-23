import { useState } from "react"
import { InfoPageEvent } from "./EventosComponents/InfoPageEvent"
import { CardVeiw } from "./EventosComponents/CardVeiw"
import { VistaSinDatos } from "./VistaSinDatos"
import { EventContextProvider } from "../context/EventContext"
import { useEffect } from "react"

export const Eventos = ({ openModal, setOpenModal }) => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const { event } = EventContextProvider()
    console.log(event)

    useEffect(() => {
        if(event!=null)
        setState(false)
    }, [event])


    return (
        <div className=" px-5 py-2 space-y-2 h-[full] ">
            {(() => {
                if (state) {
                    return (
                        <InfoPageEvent actionButton={state} setActionButton={setState} openModal={openModal} setOpenModal={setOpenModal} />
                    )
                } else {
                    if (state2) {
                        return (
                            <CardVeiw openModal={openModal} setOpenModal={setOpenModal} />
                        )
                    } else {
                        return (
                            <VistaSinDatos
                                title={""}
                                button={"Crear evento"}
                                text={"Aún no tienes eventos para organizar"}
                                accion={"crear evento"}
                            />
                        )
                    }

                }
            })()}
        </div>
    )
}