
export const PublicacionesInfo = () => {
    return (
        <>
            <div className="bg-white  space-y-5 rounded-xl h-full flex flex-col items-center justify-center h-full pt-10 pb-5">

                <img src="/Publicaciones.png" alt="alta" className="w-[80%] md:w-[40%]" />

                <p className="md:text-3xl text-xl text-rosa font-semibold">Escribe sobre bodas</p>

                <p>
                    Publica tus artículos sobre tendencias y consejos de forma gratuita
                    en el Magazine de Bodas de Hoy
                </p>

                <div className=" space-y-3 md:space-y-0 pt-3 pb-2  " >
                    <button className="py-2 px-7 bg-rosa rounded-lg text-white w-full">
                        Crear artículo
                    </button>
                </div>

            </div>
        </>
    )
}