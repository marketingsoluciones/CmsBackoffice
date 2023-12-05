import { motion } from "framer-motion"
import { useContext, useEffect, useState } from "react";
//import BlockInvitaciones from "../components/Resumen/BlockInvitaciones";
//import BlockInvitados from "../components/Resumen/BlockInvitados";
//import BlockListaRegalos from "../components/Resumen/BlockListaRegalos";
//import BlockMesas from "../components/Resumen/BlockMesas";
//import BlockPresupuesto from "../components/Resumen/BlockPresupuesto";
import BlockPrincipal from "../components/EventosComponents/BlockPrincipal";
//import BlockSobreMiEvento from "../components/Resumen/BlockSobreMiEvento";
import { EventContextProvider } from "../context/EventContext";
//import { useMounted } from "../hooks/useMounted"

const resumenEvento = () => {
    const { event } = EventContextProvider()
    return (
        <>
            <section className="bg-base w-full py-10 px-2 md:px-0" >
                <BlockPrincipal />
                <div className="w-full flex justify-center gap-4 md:gap-8">

                </div>

            </section>
        </>


    )
}

export default resumenEvento