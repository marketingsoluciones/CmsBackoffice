import { useRouter } from "next/router"


export const InfoCartaProducto = ({actionButton, setActionButton}) => {

    const router = useRouter()
    return (
        <>
            <p className=" mt-1 text-3xl text-rosa">
                Carta de productos
            </p>
            <div className="flex flex-col items-center bg-white rounded-lg pt-8">
                <p className="text-xl"><span className="text-rosa">Muestra a tus clientes </span> que ofreces para el catering de un evento</p>
                <div className="grid grid-cols-2 px-8 py-5 content-center justify-items-center">
                    <div>
                        <img src="CartaProducto.png" alt="img carta de producto" />
                    </div>
                    <div className="flex flex-col justify-center space-y-4" >
                        <p className="text-base ">
                            <span className="text-rosa">Genera tu propia carta de productos</span> añadiendo platos y bebidas de tu restaurante para crear el menú de cada uno de sus eventos.
                        </p>
                        <div>
                            <button onClick={()=>{false? setActionButton(!actionButton): router.push({
                                    pathname: "/facturacion",
                                    query: {
                                        state: 1,
                                        producto: "34",
                                        plan: "basic"
                                    }
                                })}} className="bg-rosa rounded-lg px-4 py-1 text-white text-base">
                                Crear carta de productos
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 grid grid-cols-2 px-8 py-4 justify-items-center content-center">
                    <div className="flex items-center">
                        <p className="text-base text-end">
                            <span className="text-rosa">Añade cada uno de tus platos</span> indicando su nombre, categoria dentro del menú y si incluye alguno de los 14 alérgenos según el Real Decreto 126/2015
                        </p>
                    </div>
                    <div className="flex flex-rows space-x-3 items-center justify-center">
                        <img src="alergenos.png" alt="alergenos" />
                    </div>
                </div>
                <div className="px-8 py-5  text-base flex items-center justify-center h-full">
                    <p>
                        Con tu carta de productos das libertad de combinaciones y variantes en lo que ofreces.
                    </p>
                </div>
            </div>
        </>
    )
}