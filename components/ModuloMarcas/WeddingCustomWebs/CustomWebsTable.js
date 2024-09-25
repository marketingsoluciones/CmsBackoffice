import { useEffect, useState } from "react"
import { AuthContextProvider } from "../../../context"
import { ArrowLeft, SearchIcon } from "../../Icons/index"
import { OnlyViewTable } from "../../OnlyViewTable"
import GlobalFilter from "../../Datatable/GlobalFilter"
import { useRouter } from "next/router"
import { fetchApi, queries } from "../../../utils/Fetching"
import { WebBuilder } from "./WebBuilder"

export const CustomWebsTable = ({ setComponentState }) => {
    const router = useRouter()
    const { state, dispatch } = AuthContextProvider()
    const [global, setGlobal] = useState()
    const [seteador, setSeteador] = useState(() => () => { })

    return (
        <>
            {
                state?.type === "view" &&
                <div className="space-y-4 w-full h-[calc(100vh-70px)] px-5 py-2" >
                    <div>
                        <div onClick={() => router.push("/")} className="w-5 h-5  text-gray-700 cursor-pointer">
                            <ArrowLeft />
                        </div>
                        <p className=" mt-1 text-3xl text-rosa">
                            Tus Paginas Web
                        </p>
                        <p className=" text-sm bg-white p-2 rounded-lg">Administra tus Webs Pages.  </p>
                    </div>
                    <div className=" md:relative ">
                        <button onClick={() => router.push("/marketplace")} className="bg-rosa rounded-lg px-4 py-1 text-white text-base " >
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
                    <div className="bg-white space-y-5 rounded-xl flex flex-col py-2 px-4   ">
                        <OnlyViewTable dispatch={dispatch} setbuscador={setSeteador} />
                    </div>
                </div>
            }
            {
                state?.type === "edit" && (
                    <WebBuilder id={state.data._id} />
                )
            }
        </>
    )
}