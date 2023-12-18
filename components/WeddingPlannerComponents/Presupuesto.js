import { useState } from "react"
import { InfoPresupuestoPage } from "./PresupuestoComponents/InfoPresupuestoPage"
import { EventsGroupContextProvider } from "../../context/EventsGroupContext"
import { SocketContextProvider } from "../../context"

export const Presupuesto = ({ setComponentState }) => {
    const [state, setState] = useState(true)
    const { eventsGroup } = EventsGroupContextProvider()
    const { fatherID } = SocketContextProvider()

    const path = window?.origin?.includes("://testcms.") ? process.env.NEXT_PUBLIC_EVENTSAPP?.replace("//", "//test") ?? "" : process.env.NEXT_PUBLIC_EVENTSAPP ?? ""
    return (
        eventsGroup.length !== 0
            ? < div className="h-full" >
                <iframe src={`${path}/presupuesto/?show=iframe&father=${fatherID}`} width={"100%"}  className="h-[89vh] md:h-[100%]"></iframe>
            </div >
            : <InfoPresupuestoPage actionButton={state} setActionButton={setState} setComponentState={setComponentState} />
    )
}