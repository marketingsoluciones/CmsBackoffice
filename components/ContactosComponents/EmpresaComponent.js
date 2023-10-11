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
                            <EmpresasContactoTable/>
                        )
                    }
                })()}

            </div >
           {/*  <p className=" text-slate-600 mt-1 px-5 text-3xl text-rosa">
                Empresas
            </p>

            <div className="bg-white h-[89%] rounded-lg mx-5 my-2 py-4 ">

                <button className=" bg-rosa px-2 ml-5 py-1 text-white rounded-lg text-base " onClick={() => setModalEmpresa(!modalEmpresa)}>
                    + Empresa
                </button>

                <div className="flex flex-col  justify-center items-center h-full">
                    <p className="text-xl text-center">Aún no hay <span className="font-semibold">empresas agendadas </span></p>
                    <div className="text-md flex space-x-2">
                        <button type="button" onClick={() => setModalEmpresa(!modalEmpresa)} className="text-rosa">Crear nueva empresa</button>
                        <p>o</p>
                        <button type="button" className="text-rosa">importar data</button>
                    </div>
                </div>
            </div> */}
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