import { useState } from "react"
import { SubmenuComponent } from "./CateringBodasComponents/SubmenuComponent";
import { BusinessIcon, InvitadosContactos } from "./Icons/index";
import { ContactosComponent } from "./ContactosComponents/PersonasComponent";
import { EmpresasComponent } from "./ContactosComponents/EmpresaComponent";

export const Contactos = () => {
    const [optionSelect, setOptionSelect] = useState(0)
    const dataComponents = [
        {
            icon: <InvitadosContactos/>,
            title: "Personas",
            component: <ContactosComponent/>
        },
        {
            icon: <BusinessIcon/>,
            title: "Empresas",
            component: <EmpresasComponent/>
        },
    ]

    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };

    return (
        <>
            <div className="grid grid-cols-6 h-full">
                <SubmenuComponent dataComponents={dataComponents} optionSelect={optionSelect} onClick={handleClickOption} />
                <div className="col-span-6 md:col-span-5">
                    {dataComponents[optionSelect].component}
                </div>
            </div>
        </>
    )
}