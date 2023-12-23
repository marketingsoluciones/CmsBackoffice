import { AuthContextProvider } from "../../../context"
import { WebsTable } from "./CustomWebsTable"

export const CustomWebsControl = () => {
    const { state, dispatch } = AuthContextProvider()
    return (
        <div className=" ">
            {state.type === "view" && (
                <WebsTable dispatch={dispatch} />
            )}
            {/* {state.type === "vieww" && (
                <FormDinamicalNEW setAction={dispatch} slug={"business"} state={state} />
            )}
            {["edit", "create"].includes(state.type) && (
                <PanelEditAndCreate setAction={dispatch} slug={"business"} state={state} />
            )} */}
        </div>
    )
}