import { useState } from "react"
import { AuthContextProvider } from "../../../context/AuthContext"
import GlobalFilter from "../../Datatable/GlobalFilter"
import { ArrowLeft, SearchIcon } from "../../Icons/index"
import { OnlyViewTable } from "../../OnlyViewTable"



export const CartaProductosTable = ({ actionButton, setActionButton, setComponentState }) => {
    const [global, setGlobal] = useState()
    const [seteador, setSeteador] = useState(() => () => { })
    const { state, dispatch } = AuthContextProvider()

    return (
        <div className="space-y-4 w-full h-[calc(100vh-80px)] overflow-auto  ">
            <div>
                <div onClick={() => setComponentState(5)} className="w-5 h-5* top-2 left-3 text-gray-700 cursor-pointer ">
                    <ArrowLeft />
                </div>
                <p className="  text-3xl text-rosa">
                    Carta de productos
                </p>
                <p className=" text-sm bg-white p-2 rounded-lg">Crea tu carta de productos agregando cada uno de tus platos y bebidas.  </p>
            </div>

            <div className=" md:relative">
                <button className="bg-rosa rounded-lg px-4 py-1 text-white " onClick={() => setActionButton(1)}>
                    Añadir producto
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
                <OnlyViewTable slug={"CartaProducto"} dispatch={dispatch} setbuscador={setSeteador} />
            </div>
        </div>
    )
}