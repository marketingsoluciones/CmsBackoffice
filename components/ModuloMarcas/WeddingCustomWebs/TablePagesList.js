import { useEffect, useState } from "react"
import { AuthContextProvider } from "../../../context"
import { ArrowLeft, SearchIcon } from "../../Icons/index"
import { OnlyViewTable } from "../../PanelViewTable"
import GlobalFilter from "../../Datatable/GlobalFilter"
import { useRouter } from "next/router"
import { fetchApi, queries } from "../../../utils/Fetching"

export const TablePegesList = ({ setComponentState }) => {
    const router = useRouter()
    const { dispatch } = AuthContextProvider()
    const [global, setGlobal] = useState()
    const [seteador, setSeteador] = useState(() => () => { })
    useEffect(() => {
        fetchApi({
            query: queries.getCodePage
        })

    }, [])
    return (
        <div className="space-y-4 w-full  " >
            <div>
                <div onClick={() => router.push("/")} className="w-5 h-5  text-gray-700 cursor-pointer">
                    <ArrowLeft />
                </div>
                <p className=" mt-1 text-3xl text-rosa">
                    Tus Paginas Web
                </p>
                <p className=" text-sm bg-white p-2 rounded-lg">Administra tus Webs Pages.  </p>
            </div>
            <div className=" md:relative">
                <button className="bg-rosa rounded-lg px-4 py-1 text-white text-base " onClick={() => setComponentState(1)}>
                    Añadir Pagina
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