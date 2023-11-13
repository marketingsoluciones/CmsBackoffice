import { useState } from "react"
import { AuthContextProvider } from "../../../context/AuthContext"
import GlobalFilter from "../../Datatable/GlobalFilter"
import { SearchIcon } from "../../Icons/index"
import { OnlyViewTable } from "../../PanelViewTable"



export const InvitadosCateringTable = ({ setOptionSelect }) => {
    const [global, setGlobal] = useState()
    const [seteador, setSeteador] = useState(() => () => { })
    const { state, dispatch } = AuthContextProvider()

    return (
        <div className="space-y-4 w-full  ">
            <div>

                <p className=" text-slate-600 mt-1 text-3xl text-rosa">
                    Lista de invitados
                </p>

                <p className=" text-sm bg-white p-2 rounded-lg">Gestiona tu lista de invitados, asistencia, alergias y mesa asignada según evento. </p>
            </div>

            <div className="relative">
                <button className="bg-rosa rounded-lg px-4 py-1 text-white " onClick={() => setOptionSelect(1)}>
                    Crear lista
                </button>

                <div className=" absolute h-8  rounded-md px-2 flex items-center  border-gray-400 border-2  bottom-0 right-0 w-1/3 ">
                    <SearchIcon />
                    <GlobalFilter
                        globalFilter={global}
                        setGlobalFilter={seteador}
                    />
                </div>
            </div>

            <div className="bg-white space-y-5 rounded-xl flex flex-col py-2 px-4  ">

                <OnlyViewTable slug={"business"} dispatch={dispatch} setbuscador={setSeteador} />

            </div>
        </div>

    )
}