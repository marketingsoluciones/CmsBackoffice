import { AuthContextProvider } from "../../../context"
import { PanelEditAndCreate } from "../../PanelEditAndCreate"
import { FormDinamicalNEW } from "../../Resumen"
import { MarcasTable } from "./MarcasTable"
import { Marcas } from "../../Marcas"

export const MarcasControl = () => {
    const { state, dispatch } = AuthContextProvider()

    if (true) {
        return (
            <div className="w-full h-full" >
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
                        <PanelEditAndCreate setAction={dispatch} slug={"business"} state={state} />
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

