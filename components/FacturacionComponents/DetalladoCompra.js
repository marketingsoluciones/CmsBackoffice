import { ArrowDownIcon, ExclamacionIcon } from "../Icons/index"

export const DetalladoCompra = ({actionButtton}) => {
    return (
        <>
            <div className="grid grid-cols-2 justify-items-center">
                {/* columna izquierza */}
                <div className="space-y-4">
                    <div className=" bg-white rounded-lg shadow-md ">
                        <div className="border-b py-5 px-5 space-y-2">
                            <p>
                                Resumen de la suscripción
                            </p>
                            <p className="text-base border border-gray-300 rounded-lg w-max px-1">
                                Pago mensual
                            </p>
                        </div>
                        <div className="space-y-2 py-5 px-5">
                            <p className="text-gray-500">
                                Tu Plan
                            </p>
                            <div className="flex justify-between text-base font-semibold">
                                <p>
                                    Plan de gestión para empresas
                                </p>
                                <p>
                                    Gratis
                                </p>
                            </div>
                        </div>
                        <div className="space-y-2 py-5 px-5">
                            <p className="text-gray-500">
                                Tu Módulo de complemento
                            </p>
                            <div className="flex justify-between text-base font-semibold ">
                                <div className="w-[50%] space-y-1 " >

                                    <p>
                                        Módulo Lugares para Bodas
                                    </p>
                                    <p>
                                        10 créditos de prospecto de
                                        Prospector al mes (se renueva
                                        mensualmente)
                                    </p>
                                </div>
                                <div className="text-end">
                                    <p>
                                        $ 49
                                    </p>
                                    <p className="text-gray-500">
                                        Por mes
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 rounded-b-lg flex text-rosa py-5 px-5">
                            <ArrowDownIcon />
                            <p>
                                Tus cambios de suscripción
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-5 shadow-md">
                        <p className="text-gray-500">
                            Método de pago
                        </p>

                    </div>

                </div>
                {/* columna derecha */}
                <div className=" bg-white rounded-lg shadow-md w-[70%] h-max   ">
                    <div className="border-b py-5 px-5 space-y-2">
                        <p>
                            Resumen de pago
                        </p>
                        <div className="text-base flex space-x-2 ">
                            <p>
                                Próxima fecha de facturación
                            </p>
                            <p className="text-base* border border-gray-300 rounded-lg w-max px-1">
                                1 Nov 2023
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2 py-5 px-5 text-gray-500">
                        <div className="flex justify-between text-base">
                            <p >
                                Subtotal
                            </p>
                            <p >
                                $ 49
                            </p>
                        </div>
                        <div className="flex justify-between text-base text-gray-500 ">
                            <div className="flex items-center space-x-1">
                                <p>
                                    Impuesto estimado (21%)
                                </p>
                                <div>
                                    <ExclamacionIcon />
                                </div>
                            </div>
                            <p>
                                $ 10
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-100 rounded-b-lg flex justify-between  py-5 px-5">
                        <div className="flex space-x-1">
                            <p className="text-base font-semibold">
                                Total pago recurrente mensual
                            </p>
                            <p className="text-gray-500">
                                <ExclamacionIcon />
                            </p>
                        </div>
                        <div className="">
                            $ 59
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg px-5 py-3 mt-3 flex justify-between">
                <button onClick={()=>actionButtton(1)}  className="border border-rosa rounded-lg py-1 px-3 text-rosa text-base ">
                    volver
                </button>
                <div>
                    <button className="bg-rosa rounded-lg px-7 py-1 text-white text-base" >
                        Revisar compra
                    </button>
                </div>
            </div>


        </>
    )
}