import { useState } from "react"
import { BoddyIter } from "./BoddyIter"
import { HeaderIter } from "./HeaderIter"
import { MyDocument } from "../CreatePDF"
import { Modal } from "../modals/Modal"
import { PDFViewer } from "@react-pdf/renderer"
import { ArrowLeft } from "../Icons/index"

export const Itinerario = ({ setChildrenComponentState }) => {
    const [IterArryst, setIterArryst] = useState([])
    const [createPdf, setCreatePdf] = useState(false)

    return (<>
        <div onClick={() => setChildrenComponentState(0)} className="w-5 h-5 absolute* z-10 top-2 left-3 text-gray-700 cursor-pointer">
            <ArrowLeft />
        </div>
        <div className="space-y-4 h-[87%]">
            <HeaderIter IterArryst={IterArryst} setIterArryst={setIterArryst} setCreatePdf={setCreatePdf} createPdf={createPdf} />
            <BoddyIter IterArryst={IterArryst} setIterArryst={setIterArryst} createPdf={createPdf} />
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