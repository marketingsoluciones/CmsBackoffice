import { useRouter } from "next/router"

export const IframeWorkFlow = () => {
    const router = useRouter()
    console.log("wouter",router.asPath)
    return (
        <div className="h-full w-full"  >
            {
                
                    <iframe src="http://64.23.203.125:5678/" width={"100%"} className="h-[89vh] md:h-[100%]"></iframe> 
                   
            }
        </div>
    )
}