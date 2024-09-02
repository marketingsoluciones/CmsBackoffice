import { AuthContextProvider } from "../../../context";
import { PanelEditAndCreate } from "../../../components/PanelEditAndCreate";

export const Setup = ({}) => {
    const {  dispatch, state } = AuthContextProvider();

    return (
        <div className="w-full px-5 py-2">
            {
               /*  ["edit", "create"].includes(state?.type) && ( */
                    <PanelEditAndCreate setAction={dispatch} slug={"whitelabel/setup"} state={state} />
                /* ) */
            }
        </div>
    )
}

