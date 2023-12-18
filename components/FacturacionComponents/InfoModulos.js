import { ArrowBackComponent } from "../ToolsComponents"
import { useRouter } from "next/router";


export const InfoModulos = ({ data, setOptionSelect }) => {
    const router = useRouter()


    const actionBut = () => {
       { router.back()}
    }

    return (
        <div className="h-[100vh]">
            <ArrowBackComponent action={actionBut}/>
            <p className="  mt-1 text-3xl text-rosa">
                Planes
            </p>
            <div className="md:grid md:grid-cols-3 md:space-x-5 h-[calc(100%-145px)] overflow-auto space-y-3 md:space-y-0">

                <div className="col-span-2 space-y-4">
                    <div className="bg-white rounded-lg md:grid md:grid-cols-2 py-9 px-10 space-y-2 md:space-y-0">
                        <div className="space-y-2">
                            <p className="text-base font-semibold text-gray-500">TU PLAN ACTUAL</p>
                            <p className="font-semibold text-gray-600">PANEL DE GESTIÓN PARA EMPRESAS</p>
                            <p className="text-base">Gestión general de los perfiles de tu marca y/o eventos.</p>
                        </div>
                        <div className="flex flex-col md:items-end space-y-1">
                            <button onClick={() => setOptionSelect(1)} className="text-base bg-rosa text-white py-1 px-2 rounded-lg">
                                Administrar complementos
                            </button>
                            <p className="font-semibold text-gray-600">
                                Gratis
                            </p>
                            <p className="text-base text-gray-500">
                                Incluido en el plan gratuito
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg py-10 px-5 space-y-3">
                        <p>
                            Activa módulos especiales de organización
                        </p>
                        <p className="text-base">
                            PRUEBA NUESTROS COMPLEMENTOS
                        </p>
                        <InfoModulo data={data} setOptionSelect={setOptionSelect} />
                    </div>
                </div>

                <div className="md:col-span-1 space-y-4">
                    <div className="bg-white  py-10 px-8 space-y-2 rounded-lg ">
                        <p className="text-rosa ">FACTURACIÓN</p>
                        <p className="text-base px-3">
                            Tu primera factura aparecerá aquí
                            después del primer pago
                        </p>
                    </div>

                    <div className="bg-white  py-10 px-8 space-y-3 rounded-lg ">
                        <p className="text-rosa text-">AGREGA TUS DETALLES DE FACTURACIÓN</p>
                        <div className="flex items-center justify-center">
                            <img src="/detallesFactura.png" />
                        </div>
                        <p className="text-base px-3">
                            Una vez que finalice su prueba, será
                            cobró el monto correspondiente al
                            plan
                        </p>
                        <div className="flex items-center justify-center">
                            <button onClick={() => setOptionSelect(3)} className="text-base text-white bg-rosa rounded-lg py-1 px-4">
                                Agregar detalles
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

const InfoModulo = ({ data, setOptionSelect }) => {
    const dataArry = data?.modulos?.map(elem => {
        return data?.data.find(el => (el.metadata.grupo === elem && el.metadata.tipo === "basic"))
    })
    return (
        <div className="space-y-4">
            {
                dataArry?.map((item, idx) => {
                    return (
                        <div key={idx} className="flex md:flex-row flex-col items-center justify-between px-4 space-y-2 ">
                            <div>
                                <img src={item?.images[0]} />
                            </div>
                            <div className="md:w-[75%] space-y-1 ">
                                <p className="font-semibold">
                                    {`Módulo ${item?.metadata?.grupo}`}
                                </p>
                                <p className="text-base md:w-[85%]">
                                    {item?.description}
                                </p>
                            </div>
                            <button onClick={() => setOptionSelect(1)} className="text-base font-semibold border rounded-lg py-1 px-2 border-gray-400">
                                Ver oferta
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}