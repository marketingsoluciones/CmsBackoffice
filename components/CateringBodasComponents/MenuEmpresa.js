import { useState } from "react"
import { VerMenu } from "./MenuComponents/VerMenu"

export const MenuEmpresa = () => {
    const [state, setState] = useState(true)
    return (
        <>
            {(() => {
                if (state) {
                    return (
                        <>
                            <VerMenu state={state} setState={setState}  />
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