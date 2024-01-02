import { Anillos, Baile, Baile2, Brindis, Carro, Cena, Cocteles, Comida, Dividersvg, Fotografo, FuegosArtificiales, Iglesia, Maquillaje, Merienda, Novios, PlusIcon, Salida, SesionFotos, Sol, Torta, Vestido, Dress, Dots } from "../Icons/index"
import { SelectIcon } from "./MicroComponente/SelectIcon"
import { useEffect, useState } from "react"
import { Modal } from "../modals/Modal"
import { IconList } from "./MicroComponente/IconList"
import { Formik, Form } from "formik"
import { InputFieldGlobal } from "../formularios/Inputs/InputFieldGlobal"
import { MyDocument } from "../CreatePDF"
import * as yup from "yup"
import { CiHeart } from "react-icons/ci";
import { BsCake } from "react-icons/bs";
import { LiaRingSolid } from "react-icons/lia";
import { ElGranDia, MenuOptions, Preboda, Protocolo } from "./MicroComponente"
import { EventContextProvider } from "../../context/EventContext"

export const BoddyIter = ({ IterArryst, setIterArryst, createPdf }) => {
    const { event } = EventContextProvider()
    const [optionSelect, setOptionSelect] = useState(1)

    

    const IconArry = [
        {
            id: "10",
            icon: <Anillos />,
        },
        {
            id: "11",
            icon: <FuegosArtificiales />,
        },
        {
            id: "12",
            icon: <Baile />,
        },
        {
            id: "13",
            icon: <Baile2 />,
        },
        {
            id: "14",
            icon: <Brindis />,
        },
        {
            id: "15",
            icon: <Carro />,
        },
        {
            id: "16",
            icon: <Cena />
        },
        {
            id: "17",
            icon: <Cocteles />,
        },
        {
            id: "18",
            icon: <Comida />,
        },
        {
            id: "19",
            icon: <Fotografo />,
        },
        {
            id: "20",
            icon: <Iglesia />,
        },
        {
            id: "21",
            icon: <Maquillaje />,
        },
        {
            id: "22",
            icon: <Merienda />,
        },
        {
            id: "23",
            icon: <Novios />,
        },
        {
            id: "24",
            icon: <Salida />,
        },
        {
            id: "25",
            icon: <SesionFotos />,
        },
        {
            id: "26",
            icon: <Sol />,
        },
        {
            id: "27",
            icon: <Torta />,
        },
        {
            id: "28",
            icon: <Vestido />,
        },
        {
            id: "29",
            icon: <Dress />,
        },
    ]

    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };

    const OptionsArry = [
        {
            icon: <CiHeart />,
            title: "Preboda",
            component: <Preboda event={event} IconArry={IconArry} />
        },
        {
            icon: <LiaRingSolid />,
            title: "El gran día",
            component: <ElGranDia event={event} IconArry={IconArry} />
        },
        {
            icon: <BsCake />,
            title: "Protocolo",
            component: <Protocolo event={event} IconArry={IconArry} />
        },
    ]

    return (
        <>
            <div className="flex flex-col items-center bg-white h-full rounded-lg  ">
                <MenuOptions DataOptionsArry={OptionsArry} optionSelect={optionSelect} onClick={handleClickOption} />
                {OptionsArry[optionSelect].component}
            </div>
        </>
    )
}