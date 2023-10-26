import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { MenuTable } from "./MenuComponents/MenuTable"
import { InfoMenuPage } from "./MenuComponents/InfoMenuPage"
import { VerMenu } from "./PlantillaMenu/VerMenu"

export const MenuEmpresa = () => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
    const dataComponents = [
        {

            component: <MenuTable setActionButton={setOptionSelect}/>

        },
        {
            component: <VerMenu />
        },

    ]
    const onClick = () => {

    }
    return (
        <div className="px-5 py-2 h-full">
            {(() => {
                if (!state) {
                    return (
                        <InfoMenuPage/>
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