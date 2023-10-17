export const HeaderPlantillaMenu = ({setOpenModal, openModal , setOpenModalP ,openModalP}) => {
    return(
        <>
           <div className="flex justify-between bg-white px-4 py-4 rounded-lg shadow-lg mb-5">
                <div>
                    <p>Menú del evento</p>
                </div>

                <div>
                    <p>Evento</p>
                </div>
           </div>
           <div className="flex justify-between justify-center ">
                <div>
                    select
                </div>
                <div className="space-x-3">
                    <button onClick={() =>setOpenModal(!openModal)} className="bg-rosa px-3 py-1 text-white rounded-lg text-md">
                        Añadir menú
                    </button>
                    <button onClick={() =>setOpenModalP(!openModalP)} className="bg-acento px-3 py-1 text-white rounded-lg text-sm ">
                        Guardar plantilla
                    </button>
                </div>
           </div>
        </>
    )
}