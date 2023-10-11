import { HeaderPlantillaMenu } from "../../CateringBodasComponents/PlantillaMenu/headerPlantillaMenu"
import { HeaderListaInvitado } from "./HeaderListaInvitado"
import { BlockCabecera } from "./BlockCabecera"
import { BlockListaInvitados } from "../../BlockListaInvitados/BlockListaInvitados"

export const AddListaInvitados = () => {
    return (
        <div className=" space-y-4">
            <HeaderListaInvitado />
            <div className="overflow-auto h-[34rem] rounded-lg pb-3">
                <BlockCabecera />
                <BlockListaInvitados />
            </div>
        </div>
    )
}