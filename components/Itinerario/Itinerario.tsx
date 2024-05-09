import { useState } from "react"
import { BoddyIter } from "./BoddyIter"
import { HeaderIter } from "./HeaderIter"
import { MyDocument } from "../CreatePDF"
import { Modal } from "../modals/Modal"
import { PDFViewer } from "@react-pdf/renderer"
import { ArrowLeft } from "../Icons/index"

export const Itinerario = ({  setComponentState, idxComponent }) => {
    const [IterArryst, setIterArryst] = useState([])
    const [createPdf, setCreatePdf] = useState(false)

    return (<>
        <div onClick={() => setComponentState(idxComponent)} className="flex items-center z-10 text-gray-700 cursor-pointer py-1 space-x-2">
            <ArrowLeft className="w-5 h-5" /> 
            <span>Volver</span>
        </div>
        <div className="space-y-4 h-[75vh]">
            <HeaderIter IterArryst={IterArryst} setIterArryst={setIterArryst} setCreatePdf={setCreatePdf} createPdf={createPdf} />
            <BoddyIter/>
        </div>
        {
            createPdf ? (
                <Modal openIcon={createPdf} setOpenIcon={setCreatePdf} classe={"h-[50%] w-[85%]"} >
                    <MyDocument IterArryst={IterArryst} />
                </Modal>
            ) : null
        }
    </>)
}