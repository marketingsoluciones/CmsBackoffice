import { AuthContextProvider } from "../../../context"
import { PanelEditAndCreate } from "../../PanelEditAndCreate"
import { FormDinamicalNEW } from "../../Resumen"
import { MarcasTable } from "./MarcasTable"
import { Marcas } from "../../Marcas"
import { useEffect } from "react"

export const MarcasControl = () => {
    const { state, dispatch } = AuthContextProvider()
    if (true) {
        return (
            <div className="w-full h-full px-5 py-2" >
                {
                    state?.type === "view" && (
                        <MarcasTable dispatch={dispatch} />
                    )
                }
                {
                    state?.type === "vieww" && (
                        <FormDinamicalNEW setAction={dispatch} slug={"business"} state={state} />
                    )
                }
                {
                    ["edit", "create"].includes(state?.type) && (
                        <PanelEditAndCreate setAction={dispatch} state={state} />
                    )
                }
            </div >
        )
    } else {
        return (
            <Marcas />
        )
    }
}

