import { useState } from "react"
import { InvitadosCatering, ItinerarioCatering, MesasICon, PlanoEventoIcon } from "./Icons/index"
import { SubmenuComponent } from "./CateringBodasComponents/SubmenuComponent"
import { PlantillaSalon } from "./LugaresBodasComponents/PlantillasSalon"
import { ListaInvitados } from "./LugaresBodasComponents/ListaInvitados"
import { PlanoEvento } from "./LugaresBodasComponents/PlanoEvento"
import { ItinerarioLugaresBodas } from "./LugaresBodasComponents/ItinerarioLugaresBodas"
import { InfoLugaresBodas } from "./LugaresBodasComponents/InfoLugaresBodas"

export const LugaresBodas = () => {
    const [optionSelect, setOptionSelect] = useState(4)
    const dataComponents = [
        
        {
            icon: <MesasICon />,
            title: "Plantillas del salón",
            component: <PlantillaSalon/>
        },
        {
            icon: <PlanoEventoIcon />,
            title: "Plano del evento",
            component: <PlanoEvento/>
        },
        {
            icon: <InvitadosCatering />,
            title: "Lista de invitados",
            component: <ListaInvitados/>
        },
        {
            icon: <ItinerarioCatering />,
            title: "Intinerarios",
            component: <ItinerarioLugaresBodas/>
        },
        {   
            component:<InfoLugaresBodas setOptionSelect={setOptionSelect}/>
        },
    ]
    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };

    return (
        <>

            <div className="grid grid-cols-6 h-full">

                <SubmenuComponent dataComponents={dataComponents} optionSelect={optionSelect} onClick={handleClickOption} />

                <div className="col-span-6 md:col-span-5">
                    {dataComponents[optionSelect].component}
                </div>

            </div>

        </>
    )
}