import { useState } from "react"
import { Modal } from "../../modals/Modal"
import { Añadirmenu } from "./AñadirMenu"
import { GuardarPlantilla } from "./GuardarPlantilla"


import { HeaderPlantillaMenu } from "./HeaderPlantillaMenu"
import { BlockPlantillaMenu } from "../../BlockPlantillaMenu/BlockPlantillaMenu"

export const VerMenu = () => {
    const [openModal, setOpenModal] = useState(false)
    const [openModalP, setOpenModalP] = useState(false)

    return (
        <>
            <div className="px-2 space-y-4">
                <HeaderPlantillaMenu openModal={openModal} setOpenModal={setOpenModal} openModalP={openModalP} setOpenModalP={setOpenModalP} />
                <BlockPlantillaMenu/>
            </div>
            {
                openModal ? (
                    <Modal openIcon={openModal} setOpenIcon={setOpenModal} classe={"w-[25%] h-[86%]"} >
                        <Añadirmenu openModal={openModal} setOpenModal={setOpenModal} />
                    </Modal>
                ) : null
            }
            {
                openModalP ? (
                    <Modal openIcon={openModalP} setOpenIcon={setOpenModalP} classe={"w-[28%] h-[86%]"} >
                        <GuardarPlantilla openModal={openModalP} setOpenModal={setOpenModalP} />
                    </Modal>
                ) : null
            }
        </>
    )
}