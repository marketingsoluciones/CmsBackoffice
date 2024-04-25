import { useRouter } from "next/router"
import { useEffect } from "react"


const Webbuilder = () => {
    const router = useRouter()

    useEffect(() => {
        router.push("https://app.makeswift.com/login?next=%2F")
    }, [])


    return (
        < div className="w-full h-full" >
            <iframe
                sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
                src={`https://app.makeswift.com/login?next=%2F`}
                width={"100%"} className="h-[89vh] md:h-[100%]"></iframe>
        </div >
    )
}

export default Webbuilder