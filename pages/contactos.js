import { useState } from "react";
import { BusinessIcon, InvitadosContactos } from "../components/Icons/index";
import { ContactosComponent, EmpresasComponent, InfoContactosPage } from "../components/ContactosComponents";
import { SubmenuComponent } from "../components/CateringBodasComponents/SubmenuComponent";

const contactosPage = () => {
    const [optionSelect, setOptionSelect] = useState(2)
    const dataComponents = [
        {
            icon: <InvitadosContactos />,
            title: "Personas",
            component: <ContactosComponent setOptionSelect={setOptionSelect} />
        },
        {
            icon: <BusinessIcon />,
            title: "Empresas",
            component: <EmpresasComponent  setOptionSelect={setOptionSelect}/>
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

export default contactosPage