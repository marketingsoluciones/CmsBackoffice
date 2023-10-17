import { useState } from "react";
import { OpcionesPresupuesto } from "./OpcionesPresupuesto";
import { BlockListaCategorias } from "./BlockListaCategorias";
import { MontoPresupuesto } from "./MontoPresupuesto";
import { CostoFinalPresupuesto } from "./CostoFinalPresupuesto"
import Grafico from "./Grafico";
import { BlockPagos } from "./BlockPagos";

export const AddPresupuesto = ({ setOptionSelect }) => {
    const categorias = [
        {
            coste_estimado: 10,
            coste_final: 5,
            gastos_array: [
                {
                    coste_estimado: 0,
                    coste_final: 0,
                    nombre: "alquiler del salón",
                    pagado: 0,
                    pagos_array: [],
                    _id: "652820865de8dd8d15311c38"

                },
            ],
            nombre: "salón de fiesta",
            pagado: 0,
            _id: "652820865de8dd8d15311c37"
        },
        {
            coste_estimado: 20,
            coste_final: 10,
            gastos_array: [
                {
                    coste_estimado: 0,
                    coste_final: 0,
                    nombre: "alquiler",
                    pagado: 0,
                    pagos_array: [],
                    _id: "652820865de8dd8d15311c39"

                },
            ],
            nombre: "banquete",
            pagado: 0,
            _id: "652820865de8dd8d15311c38"
        },
    ]

    const [active, setActive] = useState(true);
    const [showCategoria, setShowCategoria] = useState({
        isVisible: false,
        id: "",
    });

    return (
        <section >
            <button type="button" onClick={() => setOptionSelect(0)}>
                volver
            </button>
            <OpcionesPresupuesto setActive={setActive} active={active} />
            {active ? (
                <div className="grid md:grid-cols-3 w-full gap-6 pt-2 pl-3 pr-3 md:pr-0 pb-4">
                    <BlockListaCategorias
                        categorias_array={categorias}
                    />
                    <div className="md:col-span-2 w-full flex flex-col relative">
                        {
                            showCategoria.isVisible ? (
                                <>
                                </>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div className=" bg-white shadow-md rounded-xl grid place-items-center p-4">
                                            <MontoPresupuesto
                                                estimado={
                                                    0
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
                <BlockPagos categorias={categorias}/>
            }

        </section >
    )
}