import { InfoInvitaciones } from "./InvitacionesComponents/InfoInvitaciones"

export const InvitacionesWeddinPlanner = ({setComponentState}) => {
    return (
        <div className="px-5 py-2">
            <InfoInvitaciones setComponentState={setComponentState}/>
        </div>
    )
}