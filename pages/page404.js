import Image from "next/image"
import { Eventos } from "../components/Eventos"
import { Calendario } from "../components/Calendario"


const Page404 = () => {
    return (
        <>
            {/* <div className="flex h-full justify-center  items-center">
                <img src={"/placeholder/illustration_404.png"} ></img>

            </div> */}

            <Calendario/>
        </>
    )
}

export default Page404