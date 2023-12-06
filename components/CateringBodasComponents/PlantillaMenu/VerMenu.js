import { useState } from "react"
import { Modal } from "../../modals/Modal"
import { Añadirmenu } from "./AñadirMenu"
import { GuardarPlantilla } from "./GuardarPlantilla"
import { HeaderPlantillaMenu } from "./HeaderPlantillaMenu"
import { BlockPlantillaMenu } from "../../BlockPlantillaMenu/BlockPlantillaMenu"
import { ModalLeft } from "../../modals/ModalLeft"
import { FormAddProducto } from "./FormAddProducto"
import { FormAddCategoria } from "./FormAddCatergoria"
import { ArrowLeft } from "../../Icons/index"

export const VerMenu = ({ setChildrenComponentState }) => {
    const [openModal, setOpenModal] = useState(false)
    const [openModalP, setOpenModalP] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const [isMounted2, setIsMounted2] = useState(false)


    return (
        <>
            <div className="space-y-4 h-[100vh]">
                <div onClick={() => setChildrenComponentState(0)} className="w-5 h-5 absolute* z-10 top-2 left-3 text-gray-700 cursor-pointer">
                    <ArrowLeft />
                </div>
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