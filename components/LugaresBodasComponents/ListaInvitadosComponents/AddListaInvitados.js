import { HeaderListaInvitado } from "./HeaderListaInvitado"
import { BlockCabecera } from "./BlockCabecera"
import { BlockListaInvitados } from "../../BlockListaInvitados/BlockListaInvitados"
import { ModalLeft } from "../../modals/ModalLeft"
import { useState } from "react"
import FormInvitado from "../../formularios/FormInvitado"
import FormCrearGrupo from "../../formularios/FormCrearGrupo"
import FormCrearMenu from "../../formularios/FormCrearMenu"
import { useDelayUnmount } from "../../WeddingPlannerComponents/PresupuestoComponents/Funciones"

export const AddListaInvitados = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [formShow, setFormShow] = useState(null)
  const shouldRenderChild = useDelayUnmount(isMounted, 500);

    const reciboClick = (accion) => {
        setIsMounted(accion.state)
        setFormShow(accion.click)
    }
    return (
        <>

           {shouldRenderChild &&( <ModalLeft state={isMounted} set={setIsMounted}>
                {(() => {
                    if (formShow == "invitado") {
                        return (
                            <FormInvitado state={isMounted} set={setIsMounted} />
                        )
                    } else if (formShow == "grupo") {
                            return (
                                <FormCrearGrupo state={isMounted} set={setIsMounted} />
                            )
                        } else if (formShow == "menu") {
                            return (
                                <FormCrearMenu state={isMounted} set={setIsMounted} />
                            )
                        }
                })()}
                {/* {formShow == "invitado"
              ? <FormInvitado state={isMounted} set={setIsMounted} />
              : <FormCrearGrupo state={isMounted} set={setIsMounted} />} */}
            </ModalLeft>)}

            <div className=" space-y-4 h-[100vh] ">
                <HeaderListaInvitado />
                <div className="overflow-auto h-[calc(100%-155px)]  rounded-lg pb-3">
                    <BlockCabecera />
                    <BlockListaInvitados state={isMounted} set={reciboClick} />
                </div>
            </div>
        </>
    )
}