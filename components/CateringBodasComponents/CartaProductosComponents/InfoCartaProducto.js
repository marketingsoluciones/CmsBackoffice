import { useRouter } from "next/router"
import { ArrowLeft } from "../../Icons/index"
import { useToast } from "../../../hooks/useToast"
import { EventContextProvider } from "../../../context/EventContext"

export const InfoCartaProducto = ({ setComponentState }) => {
    const { event } = EventContextProvider()

    const toast = useToast()
    const router = useRouter()
    return (
        <div className="">
            <div onClick={() => setComponentState(5)} className="w-5 h-5 z-10 top-2 left-3 text-gray-700 cursor-pointer">
                <ArrowLeft />
            </div>
            <p className=" mt-1 text-3xl text-rosa">
                Carta de Productos
            </p>
            <div className="flex flex-col items-center bg-white rounded-lg pt-8 h-[calc(100%-245px)] md:h-[calc(100vh-145px)] overflow-auto">
                <p className="text-xl px-5  text-center"><span className="text-rosa">Muestra a tus clientes </span> que ofreces para el catering de un evento</p>
                <div className="md:grid md:grid-cols-2 px-8 py-5 content-center justify-items-center">
                    <div>
                        <img src="CartaProducto.png" alt="img carta de producto" />
                    </div>
                    <div className="flex flex-col justify-center space-y-4" >
                        <p className="text-base ">
                            <span className="text-rosa">Genera tu propia carta de productos</span> añadiendo platos y bebidas de tu restaurante para crear el menú de cada uno de sus eventos.
                        </p>
                        <div>
                            <button onClick={() => event != null && toast("error", "No tienes eventos para poder acceder, crea un evento")} className="bg-rosa rounded-lg px-4 py-1 text-white text-base">
                                Crear carta de productos
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 md:grid md:grid-cols-2 px-8 py-4 justify-items-center content-center">
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
        </div>
    )
}