import { useEffect, useState } from "react";
import { AuthContextProvider } from "../../context";
import { ArrowLeft, SearchIcon } from "../../components/Icons/index"
import { PanelEditAndCreate } from "../../components/PanelEditAndCreate";

const Setup = () => {
  const { user, development, dispatch, state } = AuthContextProvider();
  const [optionSelect, setOptionSelect] = useState(0);


  useEffect(() => {
    dispatch({ type: "CREATE", payload: {} });
  }, [])
  return (
    <div className="w-full px-5 py-2">
      {
        state?.type === "view" &&
        <div className="w-full space-y-4 h-[calc(100vh-70px)] flex flex-col" >
          
        </div>
      }
      {
        ["edit", "create"].includes(state?.type) && (
          <PanelEditAndCreate setAction={dispatch} slug={"whitelabel/setup"} state={state} />
        )
      }
    </div>
  )
}

export default Setup