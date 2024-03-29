import { useEffect } from "react"
import { AuthContextProvider } from "../../../context"
import { PanelEditAndCreate } from "../../PanelEditAndCreate"
import { FormDinamicalNEW } from "../../Resumen"
import { MarcasTable } from "./MarcasTable"
import { useRouter } from "next/router"

export const MarcasControl = ({optionSelect}) => {
    const { state, dispatch } = AuthContextProvider()
    const r = useRouter()

    /* useEffect(() => {
        
          dispatch({ type: "view", payload: {} });
      
      }, [optionSelect]); */

    return (
        <div className=" ">
            {state?.type === "view" && (
                <MarcasTable dispatch={dispatch} />
            )}
            {state?.type === "vieww" && (
                <FormDinamicalNEW setAction={dispatch} slug={"business"} state={state} />
            )}
            {["edit", "create"].includes(state?.type) && (
                <PanelEditAndCreate setAction={dispatch} slug={"business"} state={state} />
            )}
        </div>
    )
}

