import { useState } from "react";
import { SubmenuComponent } from "./CateringBodasComponents/SubmenuComponent"
import { FotoIcon, FotografoMenu } from "./Icons/index";
import { FotografoInfoPage } from "./FotografoComponents/FotografoInfoPage";
import { Colecciones } from "./FotografoComponents/Colecciones";
import { Proyectos } from "./FotografoComponents/Proyectos";
import { Modal } from "./modals/Modal";
import { ContactarGold } from "./formularios/ContactarGold";

export const FotografoComponent = () => {
    const [optionSelect, setOptionSelect] = useState(2)
    const [modalContacto, setModalContacto] = useState(false)

    const dataComponents = [
        {
            icon: <FotoIcon />,
            title: "Colecciones",
            component: <Colecciones setComponentState={setOptionSelect} />
        },
        {
            icon: <FotografoMenu />,
            title: "Proyectos",
            component: <Proyectos setComponentState={setOptionSelect} />
        },
        {
            component: <FotografoInfoPage setOptionSelect={setOptionSelect} modalContacto={modalContacto} setModalContacto={setModalContacto} />
        },
    ]
    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };

    const newArryDataComponents = dataComponents.slice()
    newArryDataComponents.splice(2, 1)
    return (
        <>
            <div className="w-full h-full flex">
                <SubmenuComponent dataComponents={newArryDataComponents} optionSelect={optionSelect} onClick={handleClickOption} />
                <div className="flex-1 w-full h-full px-5 py-2 ">
                    {dataComponents[optionSelect]?.component}
                </div>
            </div>
            {modalContacto && <Modal classe={"w-[28%] h-[86%]"}>
                <ContactarGold openModal={modalContacto} setOpenModal={setModalContacto} />
            </Modal>
            }
        </>
    )
}