import { useState } from "react"
import { Eventos } from "../components/Eventos"
import { FormCrearEvento } from "../components/EventosComponents/FormCrearEvento"
import { ModalLeft } from "../components/modals/ModalLeft"

const eventosPage = () => {
    const [isMounted, setIsMounted] = useState(false);
    return (
        <div className="w-full">
            {(
                <ModalLeft state={isMounted} set={setIsMounted}>
                    {
                        <FormCrearEvento state={isMounted} set={setIsMounted} />
                    }
                </ModalLeft>
            )}
            <p className=" mt-1 px-5 text-3xl text-rosa">
                Eventos
            </p>
            <Eventos openModal={isMounted} setOpenModal={setIsMounted} />
        </div>
    )
}

export default eventosPage