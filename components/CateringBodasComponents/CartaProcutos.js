import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { AgregarProducto } from "./CartaProductosComponents/AgregarProducto"
import { CartaProductosTable } from "./CartaProductosComponents/CartaProductosTable"
import { InfoCartaProducto } from "./CartaProductosComponents/InfoCartaProducto"

export const CartaProducto = () => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const [optionSelect, setOptionSelect] = useState(0)
    const dataComponents = [
        {

            component: <CartaProductosTable actionButton={state2} setActionButton={setOptionSelect} />

        },
        {
            component: <AgregarProducto actionButton={state2} setActionButton={setOptionSelect} />
        },

    ]

    const handleClick = () => {

    }

    return (
        <div className="px-5 py-2 h-full">
            {(() => {
                if (state) {
                    return (
                       <InfoCartaProducto actionButton={state} setActionButton={setState}/>
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
                            <>
                                <VistaSinDatos
                                    title={"Carta de productos"}
                                    button={"Añadir producto"}
                                    text={"Aún no tienes Productos en tu carta"}
                                    accion={"añade tu productos"}
                                    onClick={handleClick()}
                                />
                            </>
                        )
                    }
                }
            })()}
        </div >
    )
}