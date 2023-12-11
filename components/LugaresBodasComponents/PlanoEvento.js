import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { PlanoEventoTable } from "./PlanoEventoComponents/PlanoEventoTable"
import { InfoPlanoEventoPage } from "./PlanoEventoComponents/InfoPlanoEventoPage"
import { SocketContextProvider } from "../../context"



export const PlanoEvento = ({ componentState, setComponentState }) => {
    const { fatherID } = SocketContextProvider()
    const path = window?.origin?.includes("://testcms.") ? process.env.NEXT_PUBLIC_EVENTSAPP?.replace("//", "//test") ?? "" : process.env.NEXT_PUBLIC_EVENTSAPP ?? ""
    return (
        <div className="h-full">
            <iframe src={`${path}/mesas/?show=iframe&father=${fatherID}`} width={"100%"} height={"100%"} className=""></iframe>
        </div >
    )
}