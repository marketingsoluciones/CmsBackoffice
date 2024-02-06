import { useState } from "react";
import { SubmenuComponent } from "../components/CateringBodasComponents/SubmenuComponent"
import { MarcasControl, MarcasTable } from "../components/ModuloMarcas/Marcas";
import { CustomWebsControl, TablePegesList } from "../components/ModuloMarcas/WeddingCustomWebs";
import { PiBrowsers, PiCertificate } from "react-icons/pi";
import { IframeMetricool } from "../components/MarcaBlancaMetricool";
import { IoAnalytics } from "react-icons/io5";
import { CiViewTable } from "react-icons/ci";


const Business = () => {
    const [optionSelect, setOptionSelect] = useState(0)
    const [page, setPage] = useState("principal")



    const dataComponents = [
        {
            icon: <PiCertificate className="h-6 w-auto" />,
            title: "Marcas",
            component: <MarcasControl optionSelect={optionSelect} />
        },
        {
            icon: <PiBrowsers className="h-6 w-auto" />,
            title: "Wedding page",
            component: <CustomWebsControl setPage={setPage} page={page} />
        },
        {
            icon: <CiViewTable className="h-6 w-auto" />,
            title: "Pages list",
            component: <TablePegesList  setComponentState={setOptionSelect} />
        },
        {
            icon: <IoAnalytics className="h-6 w-auto" />,
            title: "Metricas",
            component: <IframeMetricool />
        },
    ]
    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };
    return (
        <div className="md:grid md:grid-cols-6 h-full">
            <SubmenuComponent dataComponents={dataComponents} onClick={handleClickOption} optionSelect={optionSelect} />
            <div className={` col-span-6 md:col-span-5 z-10   ${page === "WebBuilder"? optionSelect != 1 ? "px-5 py-2" :"":"px-5 py-2"} h-[calc(100%-px)] overflow-auto `}>
                {dataComponents[optionSelect].component}
            </div>
        </div>
    )
}

export default Business