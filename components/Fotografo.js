import { useState } from "react";
import { SubmenuComponent } from "./CateringBodasComponents/SubmenuComponent"
import { FotoIcon, FotografoMenu } from "./Icons/index";
import { FotografoInfoPage } from "./FotografoComponents/FotografoInfoPage";
import { Colecciones } from "./FotografoComponents/Colecciones";
import { Proyectos } from "./FotografoComponents/Proyectos";

export const FotografoComponent = () => {
    const [optionSelect, setOptionSelect] = useState(2)
    const dataComponents = [
        {
            icon: <FotoIcon />,
            title: "Colecciones",
            component: <Colecciones/>
        },
        {
            icon: <FotografoMenu />,
            title: "Proyectos",
            component: <Proyectos/>
        },
        {
            component: <FotografoInfoPage />
        },
    ]
    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };
    return (
        <div className="grid grid-cols-6 h-full">

            <SubmenuComponent dataComponents={dataComponents} optionSelect={optionSelect} onClick={handleClickOption} />

            <div className="col-span-6 md:col-span-5">
                {dataComponents[optionSelect]?.component}
            </div>

        </div>
    )
}