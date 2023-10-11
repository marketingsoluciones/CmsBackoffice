import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { PlantillaSalonTable } from "./PlantillaComponents/PlantillaSalonTable"
import { InfoPlantillaSalonPage } from "./PlantillaComponents/InfoPlantillaSalonPage"

export const PlantillaSalon = () => {
    const [state, setState] = useState(true)

    return (
        <div className="px-5 py-2 h-full">
            {(() => {
                if (state) {
                    return (
                        <InfoPlantillaSalonPage/>
                        /* <VistaSinDatos
                            title={"Plantillas del Salón"}
                            button={"Agregar Plantilla"}
                            text={"Aún no tienes Plantillas guardadas"}
                            accion={"añade tu Plantilla"}
                        /> */
                    )
                } else {
                    return(
                        <PlantillaSalonTable/>
                    )
                }
            })()}

        </div >
    )
}