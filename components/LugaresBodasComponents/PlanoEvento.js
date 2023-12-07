import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { PlanoEventoTable } from "./PlanoEventoComponents/PlanoEventoTable"
import { InfoPlanoEventoPage } from "./PlanoEventoComponents/InfoPlanoEventoPage"


export const PlanoEvento = ({ componentState, setComponentState }) => {
    const path = window?.origin?.includes("://testcms.") ? process.env.NEXT_PUBLIC_EVENTSAPP?.replace("//", "//test") ?? "" : process.env.NEXT_PUBLIC_EVENTSAPP ?? ""
    console.log(path)
    return (
        <div className="h-full">
            <iframe src={`${path}/mesas/?show=iframe`} width={"100%"} height={"100%"} ></iframe>
        </div >
    )
}