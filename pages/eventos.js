import { useState } from "react"
import { Eventos } from "../components/Eventos"
import { FormCrearEvento } from "../components/EventosComponents/FormCrearEvento"
import { ModalLeft } from "../components/modals/ModalLeft"
import { SocketContextProvider } from "../context"

const eventosPage = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { fatherID } = SocketContextProvider()
    const path = window?.origin?.includes("://testcms.") ? process.env.NEXT_PUBLIC_EVENTSAPP?.replace("//", "//test") ?? "" : process.env.NEXT_PUBLIC_EVENTSAPP ?? ""

    return (
        <>
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
        </>
    )
}

export default eventosPage