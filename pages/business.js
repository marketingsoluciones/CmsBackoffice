import { useState } from "react";
import { SubmenuComponent } from "../components/CateringBodasComponents/SubmenuComponent"
import { MarcasControl, MarcasTable } from "../components/ModuloMarcas/Marcas";
import { CustomWebsControl } from "../components/ModuloMarcas/WeddingCustomWebs";
import { PiBrowsers, PiCertificate } from "react-icons/pi";
import { IframeMetricool } from "../components/MarcaBlancaMetricool";
import { IoAnalytics } from "react-icons/io5";


const Business = () => {
    const [optionSelect, setOptionSelect] = useState(0)
    
    

    const dataComponents = [
        {
            icon: <PiCertificate className="h-6 w-auto" />,
            title: "Marcas",
            component: <MarcasControl optionSelect={optionSelect} />
        },
        {
            icon: <PiBrowsers className="h-6 w-auto" />,
            title: "Wedding page",
            component: <CustomWebsControl/>
        },
        {
            icon: <IoAnalytics className="h-6 w-auto" />,
            title: "Metricas",
            component: <IframeMetricool/>
        },
    ]
    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };
    return (
        <div className="md:grid md:grid-cols-6 h-[90vh]">
            <SubmenuComponent dataComponents={dataComponents} onClick={handleClickOption} optionSelect={optionSelect} />
            <div className="col-span-6 md:col-span-5 z-10 px-5 py-2  h-[calc(100%-px)] overflow-auto">
                {dataComponents[optionSelect].component}
            </div>
        </div>
    )
}

export default Business