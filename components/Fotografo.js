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
            component: <Colecciones />
        },
        {
            icon: <FotografoMenu />,
            title: "Proyectos",
            component: <Proyectos />
        },
        {
            component: <FotografoInfoPage  setOptionSelect={setOptionSelect}  modalContacto={modalContacto} setModalContacto={setModalContacto} />
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
                    {dataComponents[optionSelect]?.component}
                </div>

            </div>
            {
                modalContacto ? (
                    <Modal classe={"w-[28%] h-[86%]"}>
                        <ContactarGold openModal={modalContacto} setOpenModal={setModalContacto} />
                    </Modal>
                ) :
                    null
            }
        </>
    )
}