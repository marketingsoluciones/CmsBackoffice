
export const InfoPlanoEventoPage = ({actionButton, setActionButton}) => {
    return (
        <div className="h-full ">
            <p className=" text-slate-600 mt-1 text-3xl text-rosa">
                Plano del evento
            </p>
            <div className="bg-white rounded-xl flex flex-col h-[91%]   " >
                <div className="grid grid-cols-3 px-5  py-8 content-center ">
                    <div className=" col-span-1 space-y-2  flex flex-col justify-center items-center ">
                        <p className="text-xl text-rosa font-semibold">
                            Asigna y personaliza
                        </p>
                        <p>
                            el plano de tu evento
                        </p>
                    </div>
                    <div className=" col-span-2 flex justify-center px-6">
                        <p className="text-base">
                            Ordena la distribución de las mesas, el espacio para el funcionamiento de cada proveedor y sienta a los invitados. Todo lo que necesitas es diseñar el plano de tu evento en tu EventosOrganizador.
                        </p>
                    </div>
                </div>
                <div className="  flex items-center justify-center ">
                    <img src="/plano.png" alt="alta" className="w-[95%] h-full" />
                </div>
                <div className="flex flex-col items-center justify-center px-10 py-7 ">
                    <p className="text-base text-center ">Además de facilitar el cálculo optimo del salón para tu fiesta, te permite integrar a los proveedores que requieren participar en este plano. La ubicación del Dj, fotógrafo, el sector de recepción o de ceremonia. </p>
                </div>
                <div className="bg-gray-200 h-full rounded-b-lg  grid grid-cols-3 justify-items-center p-8 ">
                    <div className="col-span-2 flex justify-center">
                        <p className="w-[90%]">
                            <span className="text-rosa">Enlaza tu plano de salón al evento </span>
                            y lleva el control de cada una de las piezas de tu celebración ¡ahora mismo!
                        </p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <button onClick={()=> setActionButton(!actionButton)} className="bg-rosa text-base text-white px-2 py-1 rounded-lg">
                            Gestionar planos
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}