import { HeaderPlantillaMenu } from "./PlantillaMenu/headerPlantillaMenu"
import { Modal } from "../modals/Modal"
import { useState } from "react"
import { GuardarPlantilla } from "./PlantillaMenu/GuardarPlantilla"
import { Añadirmenu } from "./PlantillaMenu/AñadirMenu"


export const PlantillaMenu = () => {
    const [openModal, setOpenModal] = useState(false)
    const [openModalP, setOpenModalP] = useState(false)

    console.log(openModal)
    console.log(openModalP)

    return (
        <>
            <div className="px-2">
                <HeaderPlantillaMenu openModal={openModal} setOpenModal={setOpenModal} openModalP={openModalP} setOpenModalP={setOpenModalP} />
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
                        <GuardarPlantilla openModal={openModalP} setOpenModal={setOpenModalP}/>
                    </Modal>
                ) : null
            }
        </>
    )
}