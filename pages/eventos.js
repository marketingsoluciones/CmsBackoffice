import { useState } from "react"
import { Eventos } from "../components/Eventos"
import { FormCrearEvento } from "../components/EventosComponents/FormCrearEvento"
import { useDelayUnmount } from "../components/WeddingPlannerComponents/PresupuestoComponents/Funciones"
import { ModalLeft } from "../components/modals/ModalLeft"

const eventosPage = () => {
    const shouldRenderChild = useDelayUnmount(isMounted, 500)
    const [isMounted, setIsMounted] = useState(false );
    console.log(isMounted)
    return (
        <>
            {/* shouldRenderChild true && */ (
                <ModalLeft state={isMounted} set={setIsMounted}>
                    {/* showEditEvent ?
                        <FormCrearEvento state={isMounted} set={setIsMounted} EditEvent={showEditEvent} />
                        : */ <FormCrearEvento state={isMounted} set={setIsMounted} />
                    }
                </ModalLeft>
            )}
            <p className=" text-slate-600 mt-1 px-5 text-3xl text-rosa">
                Eventos
            </p>
            <Eventos openModal={isMounted} setOpenModal={setIsMounted} />
        </>
    )
}

export default eventosPage