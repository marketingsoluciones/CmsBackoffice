import { useState } from "react"
import { AgregarProducto } from "./CartaProductosComponents/AgregarProducto"
import { VerProductos } from "./CartaProductosComponents/VerProductos"

export const CartaProducto = () => {
    const [state, setState] = useState(true)
    return (
        <>
            {(() => {
                if (state) {
                    return (
                        <>
                            <VerProductos state={state} setState={setState}  />
                        </>
                    )
                } else {
                    return (
                        <>
                            <AgregarProducto />
                        </>
                    )
                }
            })()}

        </>
    )
}