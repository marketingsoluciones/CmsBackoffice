import { useRouter } from "next/router"


export const OptionsButtons = ({ optionsArry,optionSelect,onClick }) => {
    const router = useRouter()
    return (
        <>

            {
                optionsArry.map((item, idx) => {
                    return (
                        <button  key={idx} onClick={() => item.state? router.push("/facturacion"): onClick(idx)} className={`${optionSelect === idx ? "text-rosa" : ""}`}>
                            {item.icon}
                        </button>
                    )
                })
            }


        </>
    )

}