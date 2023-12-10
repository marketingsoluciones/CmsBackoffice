import { InfoInvitaciones } from "./InvitacionesComponents/InfoInvitaciones"

export const InvitacionesWeddinPlanner = ({ setComponentState }) => {
    const path = window?.origin?.includes("://testcms.") ? process.env.NEXT_PUBLIC_EVENTSAPP?.replace("//", "//test") ?? "" : process.env.NEXT_PUBLIC_EVENTSAPP ?? ""
    return (
        <div className="h-full">
            {false && <div className="px-5 py-2 absolute">
                <InfoInvitaciones setComponentState={setComponentState} />
            </div>}
            <iframe src={`${path}/invitaciones/?show=iframe`} width={"100%"} height={"100%"} ></iframe>
        </div >
    )
}