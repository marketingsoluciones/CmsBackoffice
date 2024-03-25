import { useState } from "react"
import { Modal } from "../modals/Modal"
import { AddContactoComponent } from "./AddContactoComponent"
import { VistaSinDatos } from "../VistaSinDatos"
import { PersonasContactoTable } from "./PersonasTable"

export const ContactosComponent = ({ setOptionSelect }) => {
    const [modalPersona, setModalPersona] = useState(false)
   

    return (
        <>
            <div className="px-5 py-2 w-full h-full">
                {
                    <PersonasContactoTable modalPersona={modalPersona} setModalPersona={setModalPersona} setOptionSelect={setOptionSelect} />
                }
            </div >
            {
                modalPersona &&
                <Modal openIcon={modalPersona} setOpenIcon={setModalPersona} classe={"md:w-[25%]  h-[95%]"} >
                    <AddContactoComponent modalPersona={modalPersona} setModalPersona={setModalPersona} />
                </Modal>
            }
        </>
    )
}