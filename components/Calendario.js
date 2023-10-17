import { useState } from "react"

import { InfoPageCalendario } from "./CalendarioComponents/InfoPageCalendario"

export const Calendario = () => {
    const [state, setState] = useState(false)
    return (
        <>
            
            <div className="md:w-full px-5 py-2 space-y-2 ">
                {(() => {
                    if (!state) {
                        return (
                            <InfoPageCalendario />
                        )
                    } else {
                        return(
                          "hoal"
                        )
                    }
                })()}
            </div>
        </>
    )
}