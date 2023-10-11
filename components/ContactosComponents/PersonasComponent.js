import { useState } from "react"
import { Modal } from "../modals/Modal"
import { AddContactoComponent } from "./AddContactoComponent"
import { VistaSinDatos } from "../VistaSinDatos"
import { PersonasContactoTable } from "./PersonasTable"

export const ContactosComponent = () => {
    const [modalPersona, setModalPersona] = useState(false)
    const [state, setState] = useState(true)


    return (
        <>

            <div className="px-5 py-2 h-full">
                {(() => {
                    if (!state) {
                        return (
                            <VistaSinDatos
                                title={"Contactos"}
                                button={"+ Persona"}
                                text={"Aún no hay Persona agendadas"}
                                accion={"Crear nueva persona"}
                            />
                        )
                    } else {
                        return (
                            <PersonasContactoTable/>
                        )
                    }
                })()}

            </div >
            {
                modalPersona ? (
                    <Modal openIcon={modalPersona} setOpenIcon={setModalPersona} classe={"w-[25%] h-[95%]"} >
                        <AddContactoComponent modalPersona={modalPersona} setModalPersona={setModalPersona} />
                    </Modal>
                ) : null
            }

        </>
    )
}