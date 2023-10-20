export const InfoPresupuestoPage = ({actionButton, setActionButton}) => {
    return (
        <>
            <p className=" text-slate-600 mt-1 text-3xl text-rosa">
                Presupuestos
            </p>
            <div className="bg-white rounded-lg">
                <div className="grid grid-cols-2 py-8 px-12 justify-items-center content-center" >
                    <div className="flex flex-col justify-center space-y-3">
                        <p className="text-xl">
                            <span className="text-rosa">Calcula y controla el presupuesto </span> de tu evento con facilidad
                        </p>
                        <p className="text-base">
                            Maximiza tu presupuesto y optimiza tus recursos con la ayuda del EventosOrganizador.
                        </p>
                        <div className="text-base">
                            <button onClick={()=> setActionButton(!actionButton)} className="bg-rosa rounded-lg text-white px-3 py-0.5">
                                Gestionar presupuestos
                            </button>
                        </div>
                    </div>
                    <div>
                        <img src="presupuestoPage.png" alt="presupuesto page" />
                    </div>
                </div>
                <div className="bg-gray-200 flex items-center justify-center py-5">
                    <p className="text-base">
                        Aquí crear y<span className="text-rosa"> hacer el seguimiento de los gastos </span> de tu evento es más sencillo.
                    </p>
                </div>
                <div className="grid grid-cols-2 justify-items-center py-7 px-8">
                    <div>
                        <img src="presupuesto.png" alt="presupuesto" />
                    </div>
                    <div className="flex items-center" >
                        <p className="text-base">
                            Con el gestor de presupuestos <span className="text-rosa">puedes añadir o eliminar elementos a tu lista. </span> Todo pensado para que llevar  el control de los gastos de tu evento con agilidad y menos estrés en el proceso.
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}