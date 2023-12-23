import { useState } from "react"
import { ArrowLeft, SearchIcon } from "../../Icons/index"
import GlobalFilter from "../../Datatable/GlobalFilter"
import { OnlyViewTable } from "../../PanelViewTable"
import { useRouter } from "next/router"

export const WebsTable = ({ dispatch }) => {
    const [global, setGlobal] = useState()
    const [seteador, setSeteador] = useState(() => () => { })
    const router = useRouter()
    return (
        <div className="space-y-4 w-full  ">
            <div>
                <div onClick={() => "setComponentState(5)"} className="w-5 h-5 absolute* z-10* top-2 left-3 text-gray-700 cursor-pointer">
                    <ArrowLeft />
                </div>
                <p className=" mt-1 text-3xl text-rosa">
                    Wedding page
                </p>
                <p className=" text-sm bg-white p-2 rounded-lg">Crea tu carta de productos agregando cada uno de tus platos y bebidas.  </p>
            </div>
            <div className=" md:relative">
                <button className="bg-rosa rounded-lg px-4 py-1 text-white text-base " onClick={() => router.push (
                    window.origin.includes("://testcms.") ? process.env.NEXT_PUBLIC_CUSTOMWEB?.replace("//", "//test") ?? "" : NEXT_PUBLIC_CUSTOMWEB ?? ""
                )}>
                    Crear Page
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