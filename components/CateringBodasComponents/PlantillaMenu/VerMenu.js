import { useState } from "react"
import { Modal } from "../../modals/Modal"
import { Añadirmenu } from "./AñadirMenu"
import { GuardarPlantilla } from "./GuardarPlantilla"
import { HeaderPlantillaMenu } from "./HeaderPlantillaMenu"
import { BlockPlantillaMenu } from "../../BlockPlantillaMenu/BlockPlantillaMenu"
import { ModalLeft } from "../../modals/ModalLeft"
import { FormAddProducto } from "./FormAddProducto"
import { FormAddCategoria } from "./FormAddCatergoria"

export const VerMenu = ({ }) => {
    const [openModal, setOpenModal] = useState(false)
    const [openModalP, setOpenModalP] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const [isMounted2, setIsMounted2] = useState(false)


    return (
        <>
            <div className="px-2 space-y-4 h-[100vh]">
                <HeaderPlantillaMenu openModal={openModal} setOpenModal={setOpenModal} openModalP={openModalP} setOpenModalP={setOpenModalP} />
                <BlockPlantillaMenu addProducto={isMounted} setAddProducto={setIsMounted} addCategoria={isMounted2} setAddCategoria={setIsMounted2} />
            </div>
            {
                (
                    <ModalLeft state={isMounted2} set={setIsMounted2}>
                        {/* showEditEvent ?
                        <FormCrearEvento state={isMounted} set={setIsMounted} EditEvent={showEditEvent} />
                        : */ <FormAddCategoria state={isMounted2} set={setIsMounted2} />
                        }
                    </ModalLeft>
                )
            }
            {
                (
                    <ModalLeft state={isMounted} set={setIsMounted}>
                        {/* showEditEvent ?
                        <FormCrearEvento state={isMounted} set={setIsMounted} EditEvent={showEditEvent} />
                        : */ <FormAddProducto state={isMounted} set={setIsMounted} />
                        }
                    </ModalLeft>
                )
            }
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