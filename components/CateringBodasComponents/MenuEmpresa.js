import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { MenuTable } from "./MenuComponents/MenuTable"
import { InfoMenuPage } from "./MenuComponents/InfoMenuPage"
import { VerMenu } from "./PlantillaMenu/VerMenu"
import { EventsGroupContextProvider } from "../../context/EventsGroupContext"

export const MenuEmpresa = ({setComponentState}) => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
    
    const { eventsGroup } = EventsGroupContextProvider()

    const dataComponents = [
        /* {
            component: <MenuTable setOptionSelect={setOptionSelect} setComponentState={setComponentState}/>
        }, */
        {
            component: <VerMenu setOptionSelect={setOptionSelect} setChildrenComponentState={setComponentState} />
        },

    ]
    const onClick = () => {

    }
    return (
        <div className="px-5 py-2 h-full">
            {(() => {
                if (eventsGroup.length == 0) {
                    return (
                        <InfoMenuPage setComponentState={setComponentState}/>
                    )
                } else {
                    if (state2) {
                        return (
                            <div>
                                {dataComponents[optionSelect].component}
                            </div>
                        )
                    } else {
                        return (
                            <VistaSinDatos
                                title={"Menú"}
                                button={"Crear menú"}
                                text={"Aún no tienes  productos en tu carta"}
                                accion={"añadir productos"}
                                onClick={onClick}
                            />
                        )
                    }
                }
            })()}

        </div>
    )
}