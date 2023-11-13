import { HeaderListaInvitado } from "./HeaderListaInvitado"
import { BlockCabecera } from "./BlockCabecera"
import { BlockListaInvitados } from "../../BlockListaInvitados/BlockListaInvitados"

export const AddListaInvitados = () => {
    return (
        <div className=" space-y-4 h-[100vh] ">
            <HeaderListaInvitado />
            <div className="overflow-auto h-[calc(100%-155px)]  rounded-lg pb-3">
                <BlockCabecera />
                <BlockListaInvitados />
            </div>
        </div>
    )
}