import { Formik } from "formik";
import { useContext, useState } from "react";
import { api } from "../../utils/api";
import { InputFieldGlobal } from "./Inputs/InputFieldGlobal";
import { EventContextProvider } from "../../context/EventContext";
import { AuthContextProvider } from "../../context";

const validacion = (values) => {
  let errors = {};
  if (!values.nombre) {
    errors.nombre = "Nombre no valido";
  }

  return errors;
};

const FormCrearCategoria = ({ set, state }) => {
  const { domain } = AuthContextProvider()
  const { event, setEvent } = EventContextProvider()
  return (
    <Formik
      initialValues={{
        nombre: "",
      }}
      onSubmit={async (values, actions) => {
        let nuevoCategoria;
        const params = {
          query: `mutation {
            nuevoCategoria(evento_id:"${event?._id}",nombre:"${values?.nombre}"){
              _id
              nombre
              coste_estimado
              coste_final
              pagado
              gastos_array {
                _id
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
          `,
          variables: {},
        };

        try {
          actions.setSubmitting(true);
          const { data } = await api.ApiApp(params, domain);
          nuevoCategoria = data.data.nuevoCategoria;
        } catch (error) {
          console.log(error);
        } finally {
          set(!state);
          setEvent(old => {
            old?.presupuesto_objeto?.categorias_array?.push(nuevoCategoria);
            return old
          });
          actions.setSubmitting(false);
        }
      }}
      validate={validacion}
    >
      {(props) => <BasicForm {...props} />}
    </Formik>
  );
};

export default FormCrearCategoria;

export const BasicForm = ({
  handleChange,
  handleSubmit,
  isSubmitting,
  values,
  handleBlur,
}) => {
  return (
    <>
      <div className="border-l-2 border-gray-100 pl-3 w-full ">
        <h2 className="font-display text-3xl capitalize  text-gray-500 font-light">
          Crear <br />
          <span className="font-display text-5xl capitalize text-gray-500 font-medium">
            Categoria
          </span>
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-6 w-full">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center box-content">
            <img
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              alt="imagen-invitados"
              className="w-12 h-12 rounded-full mr-6 "
            />
            <div>
              <label className="text-base text-rosa"> Nombre de la categoria </label>
              <InputFieldGlobal
                className="text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%]  truncate"
                name="nombre"
                onChange={handleChange}
                value={values.nombre}
                onBlur={handleBlur}
                type="text"
              />
            </div>
          </div>
        </div>
        <button
          className={`font-display rounded-full mt-4 py-2 px-6 text-white font-medium transition w-full hover:opacity-70 text-base ${isSubmitting ? "bg-secondary" : "bg-rosa"
            }`}
          disabled={isSubmitting}
          type="submit"
        >
          Crear categoría
        </button>
      </form>
    </>
  );
};
