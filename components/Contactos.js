import { useState } from "react"
import { SubmenuComponent } from "./CateringBodasComponents/SubmenuComponent";
import { BusinessIcon, InvitadosContactos } from "./Icons/index";
import { ContactosComponent } from "./ContactosComponents/PersonasComponent";
import { EmpresasComponent } from "./ContactosComponents/EmpresaComponent";
import { InfoContactosPage } from "./ContactosComponents/InfoContactosPage";

export const Contactos = () => {
    const [optionSelect, setOptionSelect] = useState(2)
    const dataComponents = [
        {
            icon: <InvitadosContactos />,
            title: "Personas",
            component: <ContactosComponent />
        },
        {
            icon: <BusinessIcon />,
            title: "Empresas",
            component: <EmpresasComponent />
        },
        {
            component: <InfoContactosPage />
        }
    ]

    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };

    return (
        <>
            <div className="w-full h-full flex">
                <SubmenuComponent dataComponents={dataComponents} optionSelect={optionSelect} onClick={handleClickOption} />
                <div className="flex-1 flex">
                    {dataComponents[optionSelect].component}
                </div>
            </div>
        </>
    )
}