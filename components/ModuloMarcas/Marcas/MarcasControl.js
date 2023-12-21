import { AuthContextProvider } from "../../../context"
import { PanelEditAndCreate } from "../../PanelEditAndCreate"
import { FormDinamicalNEW } from "../../Resumen"
import { MarcasTable } from "./MarcasTable"

export const MarcasControl = () => {
    const { state, dispatch } = AuthContextProvider()
    return (
        <div className=" ">
            {state.type === "view" && (
                <MarcasTable dispatch={dispatch} />
            )}
            {state.type === "vieww" && (
                <FormDinamicalNEW setAction={dispatch} slug={"business"} state={state} />
            )}
            {["edit", "create"].includes(state.type) && (
                <PanelEditAndCreate setAction={dispatch} slug={"business"} state={state} />
            )}
        </div>
    )
}

