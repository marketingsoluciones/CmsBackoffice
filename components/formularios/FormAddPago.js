// importaciones librerias
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { EventContextProvider } from "../../context/EventContext";
import { CheckIcon } from "../Icons/index";
import { InputFieldGlobal } from "./Inputs/InputFieldGlobal";


const validacion = (values) => {
  let errors = {}

  if (!values.importe) {
    errors.importe = "Importe requerido"
  }
  if (!values.fechaPago) {
    errors.fechaPago = "Selecciona una fecha"
  }
  if (!values.fechaVencimiento) {
    errors.fechaVencimiento = "Selecciona una fecha"
  }
  if (!values.pagado_por) {
    errors.pagado_por = "Favor indicar quien paga"
  }
  if (!values.medio_pago) {
    errors.medio_pago = "Modo de pago requerido"
  }

  return errors
}

const FormAddPago = ({ GastoID, cate }) => {
  const { event, setEvent } = EventContextProvider()


  const checkbox = {
    true: "pagado",
    false: "pendiente"
  }

  return (
    <Formik
      initialValues={{
        importe: "",
        pagado: "",
        fechaPago: "",
        fechaVencimiento: "",
        pagado_por: "",
        medio_pago: ""

      }}

      onSubmit={async (values) => {
        let res;
        const params = {
          query: `mutation{
                nuevoPago(evento_id:"${event?._id}", categoria_id:"${cate}", gasto_id: "${GastoID}",pagos_array:{
                  importe : ${values.importe},
                  estado  : "${checkbox[values.pagado]}",
                  fecha_pago : "${values.fechaPago}" ,
                  fecha_vencimiento : "${values.fechaVencimiento}",
                  pagado_por: "${values.pagado_por}"
                  medio_pago : "${values.medio_pago}"
                }){
                  pagado
                  categorias_array{
                    pagado
                    gastos_array{
                      pagado
                      pagos_array{
                        _id
                        estado
                        fecha_creacion
                        fecha_pago
                        fecha_vencimiento
                        medio_pago
                        importe
                        pagado_por
                      }
                    }
                  }
                    
                }
              }`,
          variables: {},
        }
        try {
          const { data: resp } = await api.ApiApp(params)
          res = resp.data.nuevoPago
        } catch (error) {
          console.log(error)
        } finally {
          setEvent(old => {
            const idxCate = old?.presupuesto_objeto?.categorias_array?.findIndex(item => item?._id == cate)
            const idxGasto = old?.presupuesto_objeto?.categorias_array[idxCate]?.gastos_array?.findIndex(item => item?._id == GastoID)
            old.presupuesto_objeto.pagado = res?.pagado
            old.presupuesto_objeto.categorias_array[idxCate].pagado = res?.categorias_array[0]?.pagado
            old.presupuesto_objeto.categorias_array[idxCate].gastos_array[idxGasto].pagado = res?.categorias_array[0]?.gastos_array[0]?.pagado
            old.presupuesto_objeto.categorias_array[idxCate].gastos_array[idxGasto].pagos_array?.push(res?.categorias_array[0]?.gastos_array[0]?.pagos_array[0])
            return { ...old }
          })
        }
      }}

      validate={validacion}
    >
      {(props) => <BasicFormLogin {...props} />}
    </Formik>
  );
}

export default FormAddPago


export const BasicFormLogin = ({
  handleChange,
  handleSubmit,
  isSubmitting,
  values,
}) => {

  const [ischecked, setCheck] = useState(false)

  useEffect(() => {
    values.pagado = ischecked
  }, [ischecked])
  return (
    <>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 py-6 w-full " >
        <div className="col-span-2 border-l-2 border-gray-100 pl-3 w-full ">
          <h2 className="font-display text-3xl capitalize text-gray-500 font-light">Añadir</h2>
          <h2 className="font-display text-5xl capitalize text-gray-500 font-medium">Pago</h2>
        </div>

        <div>
          <label className="text-base ">Importe</label>
          <InputFieldGlobal
            name="importe"
            placeholder="4.80 €"
            onChange={handleChange}
            value={values.importe}
            type="number"
            min="0"
            step="0.10"
            className="text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%]  truncate"
            autoComplete="off" />
        </div>
        <div className="relative flex items-center gap-2">
          <input type="checkbox" className="hidden" name="pagado" checked={ischecked} onChange={() => setCheck(!ischecked)} />
          <div onClick={() => setCheck(!ischecked)} className={`w-6 h-6 rounded-md border border-gray-200 transition ${ischecked && "bg-primary border-none"} cursor-pointer`}>
            {ischecked && <CheckIcon className="text-white " />}
          </div>
          <p className="font-display text-md font-medium text-gray-500">¿Pagado?</p>
        </div>
        <div>
          <label className="text-base">Fecha de pago</label>
          <InputFieldGlobal
            name="fechaPago"
            onChange={handleChange}
            value={values.fechaPago}
            className="text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%]  truncate"
            type="date"
            autoComplete="off" />
        </div>
        <div>
          <label className="text-base">Fecha de vencimiento </label>
          <InputFieldGlobal
            name="fechaVencimiento"
            onChange={handleChange}
            value={values.fechaVencimiento}
            className="text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%]  truncate"
            type="date"
            autoComplete="off" />
        </div>
        <div>
          <label className="text-base">Pagado por</label>

          <InputFieldGlobal
            name="pagado_por"
            label="Pagado por"
            placeholder="Carlos diaz"
            onChange={handleChange}
            value={values.pagado_por}
            className="text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%]  truncate"
            type="text"
            autoComplete="off" />
        </div>
        <div>
          <label className="text-base">Modo de pago</label>
          <InputFieldGlobal
            name="medio_pago"
            placeholder="Efectivo"
            onChange={handleChange}
            value={values.medio_pago}
            className="text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%]  truncate"
            type="text"
            autoComplete="off" />
        </div>

        <button disabled={isSubmitting} type="submit" className={`col-span-2 font-display rounded-full mt-4 py-2 px-6 text-white font-medium transition w-full hover:opacity-70  bg-rosa
          }`} >Añadir pago</button>
      </form>
    </>
  )
}
