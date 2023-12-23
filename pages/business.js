import { useState } from "react";
import { SubmenuComponent } from "../components/CateringBodasComponents/SubmenuComponent"
import { MarcasControl, MarcasTable } from "../components/ModuloMarcas/Marcas";
import { CustomWebsControl } from "../components/ModuloMarcas/WeddingCustomWebs";
import { PiBrowsers, PiCertificate } from "react-icons/pi";


const Business = () => {
    const [optionSelect, setOptionSelect] = useState(0)

    const dataComponents = [
        {
            icon: <PiCertificate className="h-6 w-auto" />,
            title: "Marcas",
            component: <MarcasControl />
        },
        {
            icon: <PiBrowsers className="h-6 w-auto" />,
            title: "Wedding page",
            component: <CustomWebsControl/>
        },
    ]
    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };
    return (
        <div className="md:grid md:grid-cols-6 h-[100vh]">
            <SubmenuComponent dataComponents={dataComponents} onClick={handleClickOption} optionSelect={optionSelect} />
            <div className="col-span-6 md:col-span-5 z-10 px-5 py-2  h-[calc(100%-80px)] overflow-auto">
                {dataComponents[optionSelect].component}
            </div>
        </div>
    )
}

export default Business