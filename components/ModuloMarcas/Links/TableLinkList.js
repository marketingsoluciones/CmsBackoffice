import { useEffect, useState } from "react"
import { AuthContextProvider } from "../../../context"
import { ArrowLeft, SearchIcon } from "../../Icons/index"
import { OnlyViewTable } from "../../PanelViewTable"
import GlobalFilter from "../../Datatable/GlobalFilter"
import { useRouter } from "next/router"
import { fetchApi, queries } from "../../../utils/Fetching"
import { PanelEditAndCreate } from "../../PanelEditAndCreate"


export const TableLinkList = ({ setComponentState }) => {
    const router = useRouter()
    const { state, dispatch } = AuthContextProvider()
    const [global, setGlobal] = useState()
    const [seteador, setSeteador] = useState(() => () => { })
    const [showClicks, setShowClick] = useState(false)
    const [slug, setSlug] = useState("links")



    return (
        <div className="w-full px-5 py-2">
            {
                state?.type === "view" &&
                <div className="w-full space-y-4 h-[calc(100vh-70px)] flex flex-col" >
                    <div>
                        <div onClick={() => router.push("/")} className="w-5 h-5 text-gray-700 cursor-pointer">
                            <ArrowLeft />
                        </div>
                        <p className=" mt-1 text-3xl text-rosa">
                            Links
                        </p>
                        <p className=" text-sm bg-white p-2 rounded-lg">{!showClicks ? "Links para campañas de difusión." : "Actividad por clicks en links."}</p>
                    </div>
                    <div className=" md:relative ">
                        <div className="space-x-3">
                            <button onClick={() => dispatch({ type: "CREATE", payload: { slug: "links" } })} className="bg-rosa rounded-lg px-4 py-1 text-white text-base " >
                                Crear Link
                            </button>
                            {/* <button onClick={() => router.push("/marketplace")} className="bg-rosa rounded-lg px-4 py-1 text-white text-base " >
                                Ver Clicks a Link
                            </button> */}
                        </div>
                        <div className=" absolute h-8  rounded-md px-2 flex items-center  border-gray-400 border-2  bottom-0 right-0 w-1/3 ">
                            <SearchIcon />
                            <GlobalFilter
                                globalFilter={global}
                                setGlobalFilter={seteador}
                            />
                        </div>
                    </div>
                    {/* {!!dimensions.width && <>
                        <div style={{ width: dimensions.width - 40, height: dimensions.height - 182 }} className="bg-white rounded-xl top-[222px] absolute" />
                        <div style={{ width: dimensions.width - 44, height: dimensions.height - 190 }} className="overflow-y-scroll overflow-x-scroll translate-x-1 top-[230px] absolute">
                            <div className="bg-white rounded-xl h-full space-y-5 py-2 px-4 min-w-[800px] overflow-x-hidden overflow-y-hidden flex flex-col">
                                <OnlyViewTable slug={slug} setSlug={setSlug} dispatch={dispatch} setbuscador={setSeteador} />
                            </div>
                        </div>
                    </>
                    } */}
                </div>
            }
            {
                ["edit", "create"].includes(state?.type) && (
                    <PanelEditAndCreate setAction={dispatch} slug={"links"} state={state} />
                )
            }
        </div >
    )
}