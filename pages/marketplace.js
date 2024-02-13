import { useState } from "react"
import { SubmenuComponent } from "../components/CateringBodasComponents/SubmenuComponent"
import { MarketPlaceManager } from "../components/MarketPlace"
import { MdOutlineAddBusiness } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { CustomWebsControl } from "../components/ModuloMarcas/WeddingCustomWebs";

const Marketplace = () => {
    const [optionSelect, setOptionSelect] = useState(2)
    const [page, setPage] = useState("principal")

    const dataComponents = [
        {
            icon: <BsPeople className="h-6 w-auto " />,
            title: "Novios",
            component: <CustomWebsControl setPage={setPage} page={page} type={"novios"} />
        },
        {
            icon: <MdOutlineAddBusiness className="h-6 w-auto " />,
            title: "empresa",
            component: <CustomWebsControl setPage={setPage} page={page} type={"empresa"} />
        },
        {
            component: <MarketPlaceManager />
        }
    ]
    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };

    const newArryDataComponents = dataComponents.slice()
    newArryDataComponents.splice(4, 1)

    return (

        <div className="md:grid md:grid-cols-6 h-full w-[100%]">
            <SubmenuComponent dataComponents={newArryDataComponents} optionSelect={optionSelect} onClick={handleClickOption} />
            <div className="col-span-6 md:col-span-5 z-10">
                {dataComponents[optionSelect].component}
            </div>
        </div>
    )
}

export default Marketplace