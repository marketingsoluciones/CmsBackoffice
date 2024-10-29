import { AuthContextProvider } from "../../../context"
import { LinksTabla } from "./LinksTabla"
import { PanelEditAndCreate } from "../../PanelEditAndCreate"
import { ColumnsDefTable } from "../../NuevoEvento/ClusterMod"
import {CreateLink } from "../../formularios/CreateLink"

export const LinksControl = ({ schemaChildren }) => {
    const { state, dispatch } = AuthContextProvider()
    console.log(schemaChildren)
    if (true) {
        return (
            <div className="w-full h-full px-5 py-2" >
                {
                    state?.type === "view" && (<>
                        {/* <LinksTabla dispatch={dispatch} /> */}
                        <ColumnsDefTable schemaChildren={schemaChildren} ButtonActive={true} title={"Crear un nuevo Link"}  />
                    </>
                    )
                }
                {
                    state?.type === "vieww" && (
                        <FormDinamicalNEW setAction={dispatch} state={state} />
                    )
                }
                {
                    ["edit", "create"].includes(state?.type) && (
                        <PanelEditAndCreate setAction={dispatch} state={state} />
                        /* <CreateLink/> */
                        
                    )
                }
            </div >
        )
    } else {
        /* establecer codigo para cuando la condicion es false */
    }
}