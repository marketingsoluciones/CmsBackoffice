import { AuthContextProvider } from "../../../context"
import { LinksTabla } from "./LinksTabla"
import { PanelEditAndCreate } from "../../PanelEditAndCreate"

export const LinksControl = () => {
    const { state, dispatch } = AuthContextProvider()
    if (true) {
        return (
            <div className="w-full h-full px-5 py-2" >
                {
                    state?.type === "view" && (
                        <LinksTabla dispatch={dispatch} />
                    )
                }
                {
                    state?.type === "vieww" && (
                        <FormDinamicalNEW setAction={dispatch} state={state} />
                    )
                }
                {
                    ["edit", "create"].includes(state?.type) && (
                        <></>// <PanelEditAndCreate setAction={dispatch} state={state} />
                    )
                }
            </div >
        )
    } else {
        /* establecer codigo para cuando la condicion es false */
    }
}