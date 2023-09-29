import { useState } from "react"
import { Modal } from "../modals/Modal"
import { AddContactoComponent } from "./AddContactoComponent"

export const ContactosComponent = () => {
    const [modalPersona, setModalPersona] = useState(false)

    return (
        <>
            <p className=" text-slate-600 mt-1 px-5 text-3xl text-rosa">
                Contactos
            </p>

            <div className="bg-white h-[89%] rounded-lg mx-5 my-2 py-4 ">

                <button className=" bg-rosa px-2 ml-5 py-1 text-white rounded-lg text-base " onClick={() => setModalPersona(!modalPersona)}>
                    + Persona
                </button>

                <div className="flex flex-col  justify-center items-center h-full">
                    <p className="text-xl text-center">Aún no hay <span className="font-semibold">Persona agendadas </span></p>
                    <div className="text-md flex space-x-2">
                        <button type="button" onClick={() => setModalPersona(!modalPersona)} className="text-rosa">Crear nueva persona</button>
                        <p>o</p>
                        <button type="button"  className="text-rosa">importar data</button>
                    </div>
                </div>
            </div>
            {
                modalPersona ? (
                    <Modal openIcon={modalPersona} setOpenIcon={setModalPersona} classe={"w-[25%] h-[95%]"} >
                        <AddContactoComponent modalPersona={modalPersona} setModalPersona={setModalPersona}  />
                    </Modal>
                ) : null
            }
            
        </>
    )
}