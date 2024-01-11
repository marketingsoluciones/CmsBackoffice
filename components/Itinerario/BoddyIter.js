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
import { ElGranDia, MenuOptions, Preboda, Itinerario } from "./MicroComponente"
import { EventContextProvider } from "../../context/EventContext"

export const BoddyIter = ({ IterArryst, setIterArryst, createPdf }) => {
    const [optionSelect, setOptionSelect] = useState("El gran día")

    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };

    const OptionsArry = [
        {
            title: "protocolo",
            icon: <BsCake />,
            // component: <Tasks event={event} IconArry={IconArry} />
        },
        {
            title: "preboda",
            icon: <CiHeart />,
            // component: <Preboda event={event} IconArry={IconArry} />
        },
        {
            title: "el gran día",
            icon: <LiaRingSolid />,
            // component: <ElGranDia event={event} IconArry={IconArry} />
        },
    ]

    return (
        <>
            <div className="flex flex-col items-center bg-white w-full h-full rounded-lg  ">
                <MenuOptions DataOptionsArry={OptionsArry} optionSelect={optionSelect} onClick={handleClickOption} />
                <Itinerario data={OptionsArry.find(elem => elem.title === optionSelect)} />
            </div>
        </>
    )
}