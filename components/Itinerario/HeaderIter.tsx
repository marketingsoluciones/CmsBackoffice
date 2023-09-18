import { FC } from "react"

interface  HeaderIterProps {
    IterArryst: any
    setIterArryst: any
    setCreatePdf: any
    createPdf: any
}

export const HeaderIter: FC <HeaderIterProps> = ({IterArryst ,setIterArryst,setCreatePdf, createPdf}) => {
    return (
        <>
            <div className="flex items-center justify-between bg-white h-16 px-5 rounded-lg">
                <div>
                    <p>Fecha de la boda: <span className="text-rosa">domingo 22 oct.2023</span></p>
                </div>
                <div className='flex items-center space-x-9'>

                   {/*  <div>
                        Reloj de 24 horas
                    </div> */}
                    <div className='text-rosa cursor-pointer'>
                        Restablecer Itinerario
                    </div>
                    <div onClick={()=> setCreatePdf(!createPdf)} className='cursor-pointer text-rosa bg-gray-50 flex items-center rounded-md border border-rosa p-2 shadow-md'>
                        <img src="/placeholder/pdf.png" alt="/pdficon" />
                        Descargar archivo PDF
                    </div>
                </div>
            </div>
        </>
    )
}