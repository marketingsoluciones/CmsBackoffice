import { useState } from "react"
import { VerInvitados } from "./InvitadosComponents/VerInvitados.js"

export const InvitadosC = () => {
    const [state, setState] = useState(true)
    return (
        <>
            {(() => {
                if (state) {
                    return (
                        <>
                            <VerInvitados state={state} setState={setState} />
                        </>
                    )
                } else {
                    return (
                        <>
                            ""
                        </>
                    )
                }
            })()}

        </>
    )
}