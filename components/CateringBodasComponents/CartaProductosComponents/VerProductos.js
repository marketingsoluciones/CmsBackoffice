export const VerProductos = ({state,setState }) => {
    return (
        <>
            <p className=" text-slate-600 mt-1 px-5 text-3xl text-rosa">
                Carta de productos
            </p>

            <button className=" bg-rosa px-2 ml-5 py-1 text-white rounded-lg text-base " onClick={()=>setState(!state)}>
                Agregar producto
            </button>

            <div className="bg-white h-[85%] mx-5 my-2 rounded-lg flex flex-col items-center justify-center">

            <p className="text-xl text-center">Aún no tienes productos en tu carta,<br/> añadir productos.</p>


            </div>

        </>
    )
}