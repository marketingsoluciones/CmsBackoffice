import { useState } from "react"
import { Cuentas } from "./Cuentas"
import { Marcas } from "./Marcas"

export const ModuloPreferencias = () => {
    const [optionSelect, setOptionSelect] = useState(0)

    const Components = [
        {
            component: <Cuentas/>,
        },
        {

            component: <Marcas/>,
        }
    ]

    return (
        <div>
            <p className=" mt-1 text-3xl text-rosa">
                Preferencias personales
            </p>
            <div className="bg-white rounded-lg">
                <div className="text-base pl-3 py-3">
                    <button onClick={() => setOptionSelect(0)} className={`px-3 ${optionSelect == 0 ? "border-b border-rosa text-rosa transition duration-100 " : ""}`}>
                        Cuenta
                    </button>
                    <button onClick={() => setOptionSelect(1)} className={`px-3 ${optionSelect == 1 ? "border-b border-rosa text-rosa transition duration-100" : ""}`}>
                        Tus marcas
                    </button>
                </div>
                {Components[optionSelect].component}
            </div>
        </div>
    )
}