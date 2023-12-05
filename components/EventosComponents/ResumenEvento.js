import { motion } from "framer-motion"
import { useContext, useEffect, useState } from "react";
import BlockInvitaciones from "./BlockInvitaciones";
import BlockInvitados from "./BlockInvitados";
import BlockListaRegalos from "./BlockListaRegalos";
import BlockMesas from "./BlockMesas";
import BlockPresupuesto from "./BlockPresupuesto";
import BlockPrincipal from "./BlockPrincipal";
import BlockSobreMiEvento from "./BlockSobreMiEvento";
import { EventContextProvider } from "../../context/EventContext";
//import { useMounted } from "../hooks/useMounted"

export const ResumenEvento = () => {
   
    return (
        <div className="h-[106vh] w-full">
            <section className="bg-base  w-full px-2 md:px-0 h-[calc(100%-135px)] overflow-auto space-y-4" >
                <BlockPrincipal />
                <div className="w-full flex justify-center gap-4 md:gap-8">
                    <BlockPresupuesto />
                    <BlockInvitados />
                </div>
                <BlockInvitaciones />
                <div className="w-full flex-col flex md:flex-row justify-center gap-8 ">
                    <BlockMesas />
                    <BlockListaRegalos />
                </div>
                <div className="w-[80%]  " >
                    <BlockSobreMiEvento />
                </div>
            </section>
        </div >
    )
}

