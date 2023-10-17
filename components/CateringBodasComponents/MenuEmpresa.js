import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { MenuTable } from "./MenuComponents/MenuTable"

export const MenuEmpresa = () => {
    const [state, setState] = useState(true)
    const onClick = () => {
        
    }
    return (
        <div  className="px-5 py-2 h-full">
            {(() => {
                if (!state) {
                    return (
                        <>
                            <VistaSinDatos
                                title={"Menú"}
                                button={"Crear menú"}
                                text={"Aún no tienes  productos en tu carta"}
                                accion={"añadir productos"}
                                onClick={onClick}
                            />
                        </>
                    )
                } else {
                    return (
                        <>
                            <MenuTable/>
                        </>
                    )
                }
            })()}

        </div>
    )
}