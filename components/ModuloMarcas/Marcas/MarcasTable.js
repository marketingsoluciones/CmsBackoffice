import { useState } from "react"
import GlobalFilter from "../../Datatable/GlobalFilter"
import { ArrowLeft, SearchIcon } from "../../Icons/index"
import { OnlyViewTable } from "../../OnlyViewTable"

export const MarcasTable = ({ dispatch }) => {
    const [global, setGlobal] = useState()
    const [seteador, setSeteador] = useState(() => () => { })

    return (
        <div className="space-y-4 w-full h-[calc(100vh-70px)] overflow-auto ">
            <div>
                <div onClick={() => "setComponentState(5)"} className="w-5 h-5 top-2 left-3 text-gray-700 cursor-pointer ">
                    <ArrowLeft />
                </div>
                <p className=" mt-1 text-3xl text-rosa font-semibold">
                    Marcas
                </p>
                <p className=" text-sm bg-white p-2 rounded-lg">Crea tu marca.  </p>
            </div>
            <div className=" md:relative">
                <button className="bg-rosa rounded-lg px-4 py-1 text-white text-base " onClick={() => dispatch({ type: "CREATE", payload: {} })}>
                    Añadir Marca
                </button>
                <div className=" absolute h-8  rounded-md px-2 flex items-center border-gray-400 border-2 bottom-0 right-0 w-1/3 ">
                    <SearchIcon />
                    <GlobalFilter
                        globalFilter={global}
                        setGlobalFilter={seteador}
                    />
                </div>
            </div>
            <div className="bg-white space-y-5 rounded-xl flex flex-col py-2 px-4   ">
                <OnlyViewTable dispatch={dispatch} setbuscador={setSeteador} />
            </div>
        </div>
    )
}