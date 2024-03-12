import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { InfoMenuPage } from "./MenuComponents/InfoMenuPage"
import { VerMenu } from "./PlantillaMenu/VerMenu"
import { EventsGroupContextProvider } from "../../context/EventsGroupContext"

export const MenuEmpresa = ({ setComponentState }) => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
    const { eventsGroup } = EventsGroupContextProvider()

    const dataComponents = [
        {
            component: <VerMenu setOptionSelect={setOptionSelect} setChildrenComponentState={setComponentState} />
        },
    ]

    return (
        <div className="px-5 py-2 w-full h-full">
            {eventsGroup.length == 0
                ? <InfoMenuPage setComponentState={setComponentState} />
                : state2
                    ? <div>
                        {dataComponents[optionSelect].component}
                    </div>
                    : <VistaSinDatos
                        title={"Menú"}
                        button={"Crear menú"}
                        text={"Aún no tienes  productos en tu carta"}
                        accion={"añadir productos"}
                    />}
        </div>
    )
}