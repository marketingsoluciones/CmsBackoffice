import { useRouter } from "next/router"

export const IframeWorkFlow = () => {
    const router = useRouter()
    console.log("wouter",router.asPath)
    return (
        <div className="h-full w-full"  >
           {/*  {
                
                    <iframe src="https://workflow.bodasdehoy.com/" width={"100%"} className="h-[89vh] md:h-[100%]"></iframe> 
                   
            } */}
        </div>
    )
}