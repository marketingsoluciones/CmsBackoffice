export const InfoModulos = ({ dataArry, setOptionSelect }) => {
    return (
        <div className="h-[100vh]">
            <p className=" text-slate-600 mt-1 text-3xl text-rosa">
                Planes
            </p>
            <div className="grid grid-cols-3 space-x-5 h-[calc(100%-125px)] overflow-auto">
                <div className="col-span-2 space-y-4">
                    <div className="bg-white rounded-lg grid grid-cols-2 py-9 px-10">
                        <div className="space-y-2">
                            <p className="text-base font-semibold text-gray-500">TU PLAN ACTUAL</p>
                            <p className="font-semibold text-gray-600">PANEL DE GESTIÓN PARA EMPRESAS</p>
                            <p className="text-base">Gestión general de los perfiles de tu marca y/o eventos.</p>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                            <button onClick={()=>setOptionSelect(1)} className="text-base bg-rosa text-white py-1 px-2 rounded-lg">
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
                        <InfoModulo dataArry={dataArry} setOptionSelect={setOptionSelect} />
                    </div>
                </div>
                <div className="col-span-1 space-y-4">
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
                            <button onClick={()=>setOptionSelect(3)} className="text-base text-white bg-rosa rounded-lg py-1 px-4">
                                Agregar detalles
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

const InfoModulo = ({ dataArry, setOptionSelect }) => {
    return (
        <div className="space-y-3">
            {
                dataArry.map((item, idx) => {
                    return (
                        <div key={idx} className="flex items-center justify-between px-4">
                            <div>
                                <img src={item.icon} />
                            </div>
                            <div className="w-[75%] space-y-1 ">
                                <p className="font-semibold">
                                    {item.title}
                                </p>
                                <p className="text-base w-[85%]">
                                    {item.text}
                                </p>
                            </div>
                            <button onClick={()=>setOptionSelect(1)} className="text-base font-semibold border rounded-lg py-1 px-2 border-gray-400">
                                {item.button}
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}