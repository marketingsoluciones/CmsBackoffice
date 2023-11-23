import { useState } from "react";
import { OpcionesPresupuesto } from "./OpcionesPresupuesto";
import { BlockListaCategorias } from "./BlockListaCategorias";
import { MontoPresupuesto } from "./MontoPresupuesto";
import { CostoFinalPresupuesto } from "./CostoFinalPresupuesto"
import Grafico from "./Grafico";
import { BlockPagos } from "./BlockPagos";
import { EventContextProvider } from "../../../context/EventContext";
import { AuthContextProvider } from "../../../context/AuthContext";
import { useEffect } from "react";
import BlockCategoria from "./BlockCategoria";

export const AddPresupuesto = ({ setOptionSelect }) => {

    const [showCategoria, setShowCategoria] = useState({
        isVisible: false,
        id: "",
    });
    const { event } = EventContextProvider();
    const [active, setActive] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const { user, verificationDone } = AuthContextProvider()

    useEffect(() => {
        setCategorias(event?.presupuesto_objeto?.categorias_array)
    }, [event])

    useEffect(() => {
        const condicion = event?.presupuesto_objeto?.categorias_array?.findIndex(item => item._id == showCategoria.id)
        condicion == -1 && setShowCategoria({ isVisible: false, id: "" })
    }, [event?.presupuesto_objeto?.categorias_array, showCategoria?.id])


    return (
        <section className="h-[100vh]" >
            <button type="button" onClick={() => setOptionSelect(0)}>
                volver
            </button>
            <OpcionesPresupuesto setActive={setActive} active={active} />
            {active ? (
                <div className="grid md:grid-cols-3 w-full h-[calc(100%-150px)] gap-6 pt-2 pl-3 pr-3 md:pr-0 pb-4 overflow-auto">
                    <BlockListaCategorias
                        set={(act) => setShowCategoria(act)}
                        categorias_array={categorias}
                    />
                    <div className="md:col-span-2 w-full flex flex-col relative">
                        {
                            showCategoria.isVisible ? (
                               
                                <BlockCategoria
                                    set={(act) => setShowCategoria(act)}
                                    cate={showCategoria?.id}
                                />
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div className=" bg-white shadow-md rounded-xl grid place-items-center p-4">
                                            <MontoPresupuesto
                                                estimado={
                                                    event?.presupuesto_objeto?.coste_estimado
                                                }
                                            />
                                        </div>
                                        <div className=" bg-white shadow-md rounded-xl grid place-items-center p-4">
                                            <CostoFinalPresupuesto />
                                        </div>
                                    </div>
                                    <div className="w-full pt-2">
                                        <h2 className="font-display pb-2 text-xl text-gray-500 font-semibold text-center w-full">
                                            ¿Cuanto cuesta mi evento?
                                        </h2>
                                        <Grafico categorias={categorias} />
                                    </div>
                                </>
                            )}
                    </div>
                </div>
            ) :
                <BlockPagos categorias={categorias} />
            }

        </section >
    )
}