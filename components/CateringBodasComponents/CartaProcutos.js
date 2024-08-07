import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { AgregarProducto } from "./CartaProductosComponents/AgregarProducto"
import { CartaProductosTable } from "./CartaProductosComponents/CartaProductosTable"
import { InfoCartaProducto } from "./CartaProductosComponents/InfoCartaProducto"
import { EventsGroupContextProvider } from "../../context/EventsGroupContext"

export const CartaProducto = ({ setComponentState }) => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
    const { eventsGroup } = EventsGroupContextProvider()

    const dataComponents = [
        {
            component: <CartaProductosTable actionButton={state2} setActionButton={setOptionSelect} setComponentState={setComponentState} />
        },
        {
            component: <AgregarProducto actionButton={state2} setActionButton={setOptionSelect} setChildrenComponentState={setOptionSelect} />
        },
    ]

    return (
        <div className="px-5 py-2 w-full h-full">
            {
                eventsGroup.length ?
                    <div>
                        {dataComponents[optionSelect].component}
                    </div> :
                    <InfoCartaProducto setComponentState={setComponentState} />
            }
        </div >
    )
}