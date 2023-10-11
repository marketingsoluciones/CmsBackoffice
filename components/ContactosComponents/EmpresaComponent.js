import { useState } from "react"
import { Modal } from "../modals/Modal"
import { AddEmpresaComponent } from "./AddEmpresaComponent"
import { VistaSinDatos } from "../VistaSinDatos"
import { EmpresasContactoTable } from "./EmpresasTable"

export const EmpresasComponent = () => {
    const [modalEmpresa, setModalEmpresa] = useState(false)
    const [state, setState] = useState(true)


    return (
        <>
            <div className="px-5 py-2 h-full">
                {(() => {
                    if (!state) {
                        return (
                            <VistaSinDatos
                                title={"Empresas"}
                                button={"+ Empresas"}
                                text={"Aún no hay empresas agendadas"}
                                accion={"Crear nueva empresa"}
                            />
                        )
                    } else {
                        return (
                            <EmpresasContactoTable modalEmpresa={modalEmpresa} setModalEmpresa={setModalEmpresa}/>
                        )
                    }
                })()}

            </div >
           
            {
                modalEmpresa ? (
                    <Modal openIcon={modalEmpresa} setOpenIcon={setModalEmpresa} classe={"w-[25%] h-[95%]"} >
                        <AddEmpresaComponent modalEmpresa={modalEmpresa} setModalEmpresa={setModalEmpresa} />
                    </Modal>
                ) : null
            }
        </>
    )
}