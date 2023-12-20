import { useEffect } from "react";
import { useState } from "react";
import { CochinoIcon } from "../../Icons/index";
import { getCurrency } from "./Funciones";
import { EventContextProvider } from "../../../context/EventContext";
import { api } from "../../../utils/api";

export const MontoPresupuesto = ({ estimado }) => {
    const [modificar, setModificar] = useState(false);
    const [value, setValue] = useState(estimado?.toFixed(2));
    const [mask, setMask] = useState();
    const { event, setEvent, currencyState } = EventContextProvider()

    useEffect(() => {
        setMask(getCurrency(!!value ? value : 0, "EUR"));
    }, [value, /* currencyState */]);

    const handleChange = (e) => {
        e.preventDefault();
        const r = e.target.value?.split(".")
        setValue(parseFloat(!!r[1] ? `${r[0]}.${r[1]?.slice(0, 2)}` : e.target.value));
    };

    const keyDown = (e) => {
        let tecla = e.key.toLowerCase();
        (tecla == "enter" || tecla == " ") && handleBlur();
    };

    const handleBlur = async () => {
        const params = {
            query: `mutation {
        editPresupuesto(evento_id:"${event._id}", coste_estimado:${!!value ? value : 0}  ){
          coste_final
          coste_estimado
          pagado
          categorias_array {
            _id
            coste_proporcion
            coste_estimado
            coste_final
            pagado
            nombre
            gastos_array{
              _id
              coste_proporcion
              coste_estimado
              coste_final
              pagado
              nombre
              pagos_array {
                _id
                estado
                fecha_creacion
                fecha_pago
                fecha_vencimiento
                medio_pago
                importe
              }
            }
          }
        }
      }`,
            variables: {},
        }
        let datos;
        try {
            const { data } = await api.ApiApp(params)
            datos = data.data.editPresupuesto
        } catch (error) {
            console.log(error)
        } finally {
            setModificar(false)
            setEvent(old => ({ ...old, presupuesto_objeto: datos }))
        }

    }

    return (
        <>
            <CochinoIcon className="w-12  text-gray-500 " />
            <p className="font-display text-gray-500 font-light text-md grid place-items-center">
                Presupuesto estimado <br />
            </p>
            {modificar ? (
                <input
                    type="number"
                    min={0}
                    value={!!value ? value : ""}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={(e) => keyDown(e)}
                    className="font-display appearance-none text-gray-500 font-semibold text-lg text-center border-b w-1/2 focus:outline-none border-gray-200"
                />
            ) : (
                <span className="font-display text-gray-500 font-semibold text-lg text-center h-5 flex items-center">
                    {mask}
                </span>
            )}
            <button
                onClick={() => setModificar(!modificar)}
                className="border-rosa border font-display focus:outline-none text-rosa text-xs bg-white px-3 py-1 rounded-lg my-2 hover:bg-rosa hover:text-white transition"
            >
                {modificar ? "Aceptar" : "Modificar presupuesto"}
            </button>
            <style jsx>
                {`
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        `}
            </style>
        </>
    );
}