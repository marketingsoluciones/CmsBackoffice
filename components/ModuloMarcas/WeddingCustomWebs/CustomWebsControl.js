import { AuthContextProvider } from "../../../context"
import { WebsTable } from "./CustomWebsTable"
import Section1 from "./Section1"

export const CustomWebsControl = () => {
    const { state, dispatch } = AuthContextProvider()
    return (
        <div className=" ">
          <Section1/>
        </div>
    )
}