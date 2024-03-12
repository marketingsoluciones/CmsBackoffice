import { useState } from "react"
import { InfoListaInvitadosPage } from "./ListaInvitadosComponents/InfoListaInvitadosPage"
import { EventContextProvider } from "../../context/EventContext"
import { useEffect } from "react"
import { EventsGroupContextProvider } from "../../context/EventsGroupContext"
import { SocketContextProvider } from "../../context"

export const ListaInvitados = ({ setComponentState }) => {
    const [state, setState] = useState(true)
    const { event } = EventContextProvider()
    const { eventsGroup } = EventsGroupContextProvider()
    const { fatherID } = SocketContextProvider()

    useEffect(() => {
        if (event?.invitados_array?.length != 0) {
            setState(false)
        }
    }, [event])

    const path = window?.origin?.includes("://testcms.") ? process.env.NEXT_PUBLIC_EVENTSAPP?.replace("//", "//test") ?? "" : process.env.NEXT_PUBLIC_EVENTSAPP ?? ""
    return (
        eventsGroup.length !== 0
            ? < div className="w-full h-full" >
                <iframe src={`${path}/invitados/?show=iframe&father=${fatherID}`} width={"100%"} className="h-[89vh] md:h-[100%]"></iframe>
            </div >
            : <InfoListaInvitadosPage setState={setState} state={state} setComponentState={setComponentState} idxComponent={5} />
    )
}