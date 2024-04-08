import { useRouter } from "next/router"
import { AuthContextProvider } from "../../context"
import { useEffect } from "react"
import { fetchApi, queries } from "../../utils/Fetching"
import { parseJwt } from "../../utils/Authentication"
import Cookies from "js-cookie"

export const IframeWorkFlow = () => {
    const { development, domain } = AuthContextProvider()
    const router = useRouter()

    useEffect(() => {
        fetchApi({
            query: queries.getN8n,
            variables: { development: development, domain: development },
        }).then(cookie => {
            const dateExpire = new Date(parseJwt(cookie ?? "").exp * 1000)
            Cookies.set("n8n-auth", cookie, { domain: domain, expires: dateExpire })
            router.push("https://workflow.bodasdehoy.com/")
        })
    }, [])


    // router.push("https://workflow.bodasdehoy.com/")

    return (
        <></>
        // <div className="h-full w-full"  >
        //     <iframe src="https://workflow.bodasdehoy.com/" width={"100%"} className="h-[89vh] md:h-[100%]"></iframe>
        // </div>
    )
}