export const InfoPageEvent = ({actionButton, setActionButton}) => {
    return (
        <>
            <div className="bg-white  space-y-5 rounded-xl h-full flex flex-col items-center justify-center h-full py-16">

                <img src="/photoEvento.png" alt="alta" className="w-[80%] md:w-[40%]" />

                <p className="md:text-3xl text-xl text-rosa font-semibold">Gestiona tus contactos</p>

                <p className="md:px-80 px-5 text-center" >Ordena las mesas de tu boda y el banquete, crea tu lista de invitados, lleva un control de la asistencia, organiza tu presupuesto y habla en vivo.</p>

                <div className="grid md:grid-cols-2  md:space-x-10 space-y-3 md:space-y-0  " >
                    <button type="button" onClick={()=>setActionButton(!actionButton)} className=" py-2 px-7 border border-gray-400 rounded-lg w-full text-base">
                        Ver mis eventos
                    </button>
                    <button className="py-2 px-7 bg-rosa rounded-lg text-white w-full text-base">
                        Crear evento
                    </button>
                </div>

            </div>
        </>
    )
}