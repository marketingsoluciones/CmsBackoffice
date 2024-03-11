import { EventsGroupContextProvider } from "../../context/EventsGroupContext"
import { InfoInvitaciones } from "./InvitacionesComponents/InfoInvitaciones"

export const InvitacionesWeddinPlanner = ({ setComponentState }) => {
    const { eventsGroup } = EventsGroupContextProvider()

    const path = window?.origin?.includes("://testcms.") ? process.env.NEXT_PUBLIC_EVENTSAPP?.replace("//", "//test") ?? "" : process.env.NEXT_PUBLIC_EVENTSAPP ?? ""
    return (


        eventsGroup.length !== 0
            ? <div className="h-full">
                <iframe src={`${path}/invitaciones/?show=iframe`} width={"100%"} className="h-[89vh] md:h-[100%]" ></iframe>
            </div> :
            <div className="px-5 py-2">
                <InfoInvitaciones setComponentState={setComponentState} />
            </div>


    )
}