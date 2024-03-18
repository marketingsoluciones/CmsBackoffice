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
        <div className="h-[calc(100vh-90px)] overflow-auto">
            <div className="space-y-4 ">
                <div onClick={() => setChildrenComponentState(5)} className="w-5 h-5 absolute* z-10 top-2 left-3 text-gray-700 cursor-pointer">
                    <ArrowLeft />
                </div>
                <HeaderPlantillaMenu openModal={openModal} setOpenModal={setOpenModal} openModalP={openModalP} setOpenModalP={setOpenModalP} />
                <BlockPlantillaMenu addProducto={isMounted} setAddProducto={setIsMounted} addCategoria={isMounted2} setAddCategoria={setIsMounted2} />
            </div>
            {
                isMounted2 ? (
                    <ModalLeft state={isMounted2} set={setIsMounted2}>
                        <FormAddCategoria state={isMounted2} set={setIsMounted2} />
                    </ModalLeft>
                ): null
            }
            {
               isMounted? (
                    <ModalLeft state={isMounted} set={setIsMounted}>
                        <FormAddProducto state={isMounted} set={setIsMounted} />
                    </ModalLeft>
                ): null
            }
            {
                openModal ? (
                    <Modal openIcon={openModal} setOpenIcon={setOpenModal} classe={"md:w-[25%] h-[86%]"} >
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
        </div>
    )
}