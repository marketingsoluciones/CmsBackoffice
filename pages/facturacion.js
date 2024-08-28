import { useEffect, useState } from "react"
import { SocketContextProvider } from "../context"
import { useRouter } from "next/router"

const Facturacion = () => {
    const route = useRouter()
    const { fatherID } = SocketContextProvider()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true)
        }
        return () => {
            setIsMounted(false)
        }
    }, [])

    useEffect(() => {
        if (isMounted) {
            window.addEventListener('message', (event) => {
                try {
                    const message = JSON.parse(event.data)
                    if (message.type === "route") {
                        route.push(message.path)
                    }
                } catch (error) { }
            });
        }
    }, [isMounted])

    const path = window?.origin?.includes("://testcms.") ? process.env.NEXT_PUBLIC_EVENTSAPP?.replace("//", "//test") ?? "" : process.env.NEXT_PUBLIC_EVENTSAPP ?? ""

    return (
        <iframe src={`${path}/facturacion/?show=iframe&father=${fatherID}`} width={"100%"} className="h-[88vh] md:h-[100%]"></iframe>
    )
}

export default Facturacion