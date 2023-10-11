import { useState } from "react"
import { VistaSinDatos } from "../VistaSinDatos"
import { AgregarProducto } from "./CartaProductosComponents/AgregarProducto"
import { CartaProductosTable } from "./CartaProductosComponents/CartaProductosTable"

export const CartaProducto = () => {
    const [state, setState] = useState(true)
    const [state2, setState2] = useState(true)
    const handleClick = () => {

    }

    return (
        <div className="px-5 py-2 h-full">
            {(() => {
                if (!state) {
                    return (
                        <VistaSinDatos
                            title={"Carta de productos"}
                            button={"Añadir producto"}
                            text={"Aún no tienes Productos en tu carta"}
                            accion={"añade tu productos"}
                            onClick={handleClick()}
                        />
                    )
                } else {
                    if (state2) {
                        return (
                            <CartaProductosTable actionButton={state2} setActionButton={setState2} />
                        )
                    } else {
                        return (
                            <>
                                <AgregarProducto actionButton={state2} setActionButton={setState2} />
                            </>
                        )
                    }
                }
            })()}
        </div >
    )
}