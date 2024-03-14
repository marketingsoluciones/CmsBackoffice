import { useState } from "react"
import { Modal } from "../modals/Modal"
import { AddEmpresaComponent } from "./AddEmpresaComponent"
import { VistaSinDatos } from "../VistaSinDatos"
import { EmpresasContactoTable } from "./EmpresasTable"

export const EmpresasComponent = ({setOptionSelect}) => {
    const [modalEmpresa, setModalEmpresa] = useState(false)
    const [state, setState] = useState(true)

    return (
        <>
            <div className="px-5 py-2 w-full ">
                {
                    state ?
                        <EmpresasContactoTable modalEmpresa={modalEmpresa} setModalEmpresa={setModalEmpresa} setOptionSelect={setOptionSelect} /> :
                        <VistaSinDatos
                            title={"Empresas"}
                            button={"+ Empresas"}
                            text={"Aún no hay empresas agendadas"}
                            accion={"Crear nueva empresa"}
                        />
                }
            </div >
            {
                modalEmpresa &&
                <Modal openIcon={modalEmpresa} setOpenIcon={setModalEmpresa} classe={"md:w-[25%] h-[95%]"} >
                    <AddEmpresaComponent modalEmpresa={modalEmpresa} setModalEmpresa={setModalEmpresa} />
                </Modal>
            }
        </>
    )
}