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
            <div className="px-5 py-2 w-full h-full">
                {state
                    ? <PersonasContactoTable modalPersona={modalPersona} setModalPersona={setModalPersona} />
                    : <VistaSinDatos
                        title={"Contactos"}
                        button={"+ Persona"}
                        text={"Aún no hay Persona agendadas"}
                        accion={"Crear nueva persona o importar data"}
                    />}
            </div >
            {modalPersona && <Modal openIcon={modalPersona} setOpenIcon={setModalPersona} classe={"md:w-[25%]  h-[95%]"} >
                <AddContactoComponent modalPersona={modalPersona} setModalPersona={setModalPersona} />
            </Modal>}
        </>
    )
}