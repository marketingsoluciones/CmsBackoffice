import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { PlanoEventoTable } from "./PlanoEventoComponents/PlanoEventoTable"
import { InfoPlanoEventoPage } from "./PlanoEventoComponents/InfoPlanoEventoPage"


export const PlanoEvento = ({ componentState, setComponentState }) => {

    return (
        <div className="h-full">
            <iframe src="http://96.126.110.203:3001/mesas/?show=iframe" width={"100%"} height={"100%"} ></iframe>
        </div >
    )
}