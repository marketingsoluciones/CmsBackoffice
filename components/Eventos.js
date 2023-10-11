import { useState } from "react"
import { InfoPageEvent } from "./EventosComponents/InfoPageEvent"
import { CardVeiw } from "./EventosComponents/CardVeiw"

export const Eventos = () => {
    const [state, setState] = useState(true)
    return (
        <div>
            <p className=" text-slate-600 mt-1 px-5 text-3xl text-rosa">
                Eventos
            </p>
            <div className=" px-5 py-2 space-y-2 ">
                {(() => {
                    if (!state) {
                        return (
                            <InfoPageEvent />
                        )
                    } else {
                        return(

                            <CardVeiw/>
                        )
                    }
                })()}
            </div>
        </div>
    )
}