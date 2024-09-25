import { useState } from "react"
import { AuthContextProvider } from "../../context/AuthContext"
import { SearchIcon } from "../Icons/index"
import GlobalFilter from "../Datatable/GlobalFilter"
import { OnlyViewTable } from "../OnlyViewTable"
import { ArrowLeft } from "lucide-react"


export const EmpresasContactoTable = ({ modalEmpresa, setModalEmpresa, setOptionSelect }) => {
    const [global, setGlobal] = useState()
    const [seteador, setSeteador] = useState(() => () => { })
    const { state, dispatch } = AuthContextProvider()
    return (
        <>
            <div className="space-y-4 w-full h-[calc(100vh-80px)] overflow-auto   ">
                <div>
                    <div onClick={() => setOptionSelect(3)} className="w-5 h-5 absolute* z-10 top-2 left-3 text-gray-700 cursor-pointer">
                        <ArrowLeft />
                    </div>
                    <p className=" mt-1 text-3xl text-rosa ">
                        Empresas
                    </p>

                    <p className=" text-sm bg-white p-2 rounded-lg text-gray-500b">Organiza los contactos de tus clientes o proveedores en un sólo lugar. </p>
                </div>

                <div className="relative">
                    <button onClick={() => setModalEmpresa(!modalEmpresa)} className="bg-rosa rounded-lg px-4 py-1 text-white text-base">
                        + Persona
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

                    <OnlyViewTable slug={"contactosEmpresas"} dispatch={dispatch} setbuscador={setSeteador} />

                </div>
            </div>

        </>
    )
}