import { useState } from "react"
import { BoddyIter } from "./BoddyIter"
import { HeaderIter } from "./HeaderIter"
import { MyDocument } from "../CreatePDF"
import { Modal } from "../modals/Modal"
import { PDFViewer } from "@react-pdf/renderer"

export const Itinerario = () => {
    const [IterArryst, setIterArryst] = useState([])
    const [createPdf, setCreatePdf] = useState(false)

    return (<>
        <div className="space-y-4 h-[87%]">
            <HeaderIter IterArryst={IterArryst} setIterArryst={setIterArryst} setCreatePdf={setCreatePdf} createPdf={createPdf} />
            <BoddyIter IterArryst={IterArryst} setIterArryst={setIterArryst} createPdf={createPdf} />
        </div>
        {
            createPdf ? (
                <Modal openIcon={createPdf} setOpenIcon={setCreatePdf} classe={ "h-[50%] w-[85%]"} >
                    <MyDocument IterArryst={IterArryst} />
                </Modal>
            ) : null
        }
    </>)
}