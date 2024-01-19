import { Form, Formik, FormikValues, useField } from "formik";
import { Dispatch, FC, HtmlHTMLAttributes, SetStateAction, useEffect, useState } from "react";

import { InputFieldGlobal } from "./Inputs/InputFieldGlobal";
import { SelectField } from "./Inputs/SelectField";
import * as yup from "yup";
import { fetchApiEventos, queries } from "../../utils/Fetching";
import { ImageProfile } from "../WeddingPlannerComponents/PresupuestoComponents/Funciones";
import useHover from "../../hooks/useHover";
/* import { IoMdContacts } from "react-icons/io" */
import { ImportGuest } from "../Invitaciones/ImportGuest";
import { useImportGuest } from "../../hooks/useImportGuest";
import { ForApiPeople } from "./ForApiGoogle";
import { EventContextProvider } from "../../context/EventContext";
import { WarningIcon } from "../Icons/index";
import { InputField } from "./Inputs/InputField"
import { useToast } from "../../hooks/useToast";
import { AuthContextProvider } from "../../context";


const FormInvitado = ({ state, set }) => {
  const { domain } = AuthContextProvider()
  const { event, setEvent } = EventContextProvider();
  const [contact, setContact] = useState(null)
  const [showMedioSelectImport, setShowMedioSelectImport] = useState(false)
  const [showForApiGoogle, setShowForApiGoogle] = useState({ state: false, payload: {} })
    const toast = useToast()
  const [contactsForApiGoogle] = useImportGuest()

  useEffect(() => {
    const scriptGsi = document.createElement('script');
    scriptGsi.src = "https://accounts.google.com/gsi/client";
    scriptGsi.async = true;
    scriptGsi.onload = () => {
    }
    document.body.appendChild(scriptGsi);

    const scriptGapi = document.createElement('script');
    scriptGapi.src = "https://apis.google.com/js/api.js";
    scriptGapi.async = true;
    scriptGapi.onload = () => {
    }
    document.body.appendChild(scriptGapi);
  }, [])

  /* const validationSchema = yup.object().shape({
    nombre: yup.string().required("Nombre requerido").test("Unico", "El nombre debe ser unico", values => {
      return !event.invitados_array.map(item => item.nombre).includes(values)
    }),
    sexo: yup.string().required("Sexo requerido"),
    grupo_edad: yup.string().required("Edad requerido"),
    telefono: yup.string().required("*******").test("Unico", "Telefono requerido", (value) => {
      return !!value?.split(" ")[1]
    }),
    rol: yup.string().required("Rol requerido"),
    correo: yup.string().email().test("Unico", "El correo debe ser unico", (value) => {
      return !event.invitados_array.map(item => item.correo).includes(value)
    })
  }); */

  const initialValues = {
    nombre: "",
    sexo: "hombre",
    grupo_edad: "adulto",
    correo: "",
    telefono: "",
    rol: "",
    nombre_menu: "adultos"
  };

  const handleSubmit = async (values, actions) => {
    try {
      if (values.nombre_menu === "sin menú") values.nombre_menu = undefined
      const result = await fetchApiEventos({
        query: queries.createGuests,
        variables: {
          eventID: event._id,
          guestsArray: values,
        },
        domain
      });

      setEvent((old) => ({ ...old, invitados_array: result?.invitados_array }));
      toast("success", "Invitado creado con exito")
    } catch (error) {
       toast("error", `Ha ocurrido un error ${error}`)
      console.log(error);
    } finally {
      actions.setSubmitting(false);
      set(!state);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    /* validationSchema={validationSchema} */
    >
      {({ isSubmitting, values, setFieldValue, resetForm }) => {

        return (
          <Form className="w-[70%]">
            <ResetForm setFieldValue={setFieldValue} resetForm={resetForm} contact={contact} />
            {/* {showForApiGoogle.state && <ForApiPeople setContact={setContact} showForApiGoogle={showForApiGoogle} setShowForApiGoogle={setShowForApiGoogle} />} */}
            {showMedioSelectImport && <ImportGuest setShowMedioSelectImport={setShowMedioSelectImport} setContact={setContact} setShowForApiGoogle={setShowForApiGoogle} />}
            <div className="border-l-2 border-gray-100 pl-3 my-2 w-full ">
              <h2 className="font-display text-3xl capitalize text-gray-500 font-light">
                Crear
              </h2>
              <h2 className="font-display text-5xl capitalize text-gray-500 font-medium">
                Invitado
              </h2>
            </div>

            <div className="text-gray-500 font-body flex flex-col gap-4 w-full">
              <div className="  flex items-center justify-center relative pt-4">
                <div className="flex absolute z-[5] right-0 top-0 text-secondary* cursor-pointer"
                  onClick={() => {
                    window["ReactNativeWebView"] || navigator["contacts"]
                      ? setShowMedioSelectImport(true)
                      : contactsForApiGoogle().then(result => {
                        setShowForApiGoogle(result)
                      })
                  }}
                >
                  <p className="w-14 text-xs leading-3 capitalize">importar contactos</p>
                  {/*  <IoMdContacts className="w-7 h-7" /> */}
                </div>
                <img
                  src={ImageProfile[values.sexo]?.image ?? "/placeholder/user.png"}
                  alt={ImageProfile[values.sexo]?.alt}
                  className="w-14 h-14 rounded-full mr-6 "
                />
                <div className="w-full flex flex-col ">
                  <label className="text-base">Nombre</label>
                  <InputFieldGlobal
                    className="text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%]  truncate"
                    name="nombre"
                  />
                </div>
              </div>

              <div className=" w-full h-full flex gap-2">
                <div className="w-3/4 flex-col flex gap-1 relative text-base">
                  <BooleanSwitch
                    label="Sexo"
                    lista={["hombre", "mujer"]}
                    name="sexo"
                  />
                </div>
                <div className="w-3/4 flex-col flex gap-1 relative text-base">
                  <BooleanSwitch
                    label="Edad"
                    lista={["adulto", "niño"]}
                    name="grupo_edad"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col ">
                <label className="text-base">Correo</label>
                <InputFieldGlobal
                  className={"text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%]  truncate"}
                  name="correo"
                  label="Correo"
                  type="email"
                />
              </div>
              <div className="w-full h-full flex gap-6">

                <div className="w-full flex flex-col *items-center justify-center">
                  <label className="text-base">Telefono</label>
                  <InputFieldGlobal
                    className={"text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%]  truncate"}
                    name="telefono"
                    type="tel"
                  />
                </div>

                <div className="w-1/2 h-full">
                  <label className="text-base">Menu</label>
                  <SelectField
                    name={"nombre_menu"}
                    options={[...event?.menus_array?.map(elem => elem.nombre_menu), "sin menú"]}
                    className={" text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3"}
                    colSpan={null}
                    icon={null}
                    iconClassName={null}
                  />
                </div>

              </div>
              <div className="w-full h-8 flex flex-col relative text-sm mb-7">
                <SelectField
                  name={"rol"}
                  label={"Rol"}
                  options={event.grupos_array}
                  className={"text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3 w-full"}
                 
                />
              </div>

              <button
                className={`font-display rounded-full py-2 px-6 text-white font-medium transition w-full hover:opacity-70 text-base  ${isSubmitting ? "bg-secondary" : "bg-rosa"
                  }`}
                disabled={isSubmitting}
                type="submit"
              >
                Crear invitado
              </button>
            </div>
          </Form>
        )
      }}
    </Formik>
  );
};

export default FormInvitado;

const ResetForm = ({ setFieldValue, resetForm, contact }) => {
  useEffect(() => {
    resetForm()
    //aquí formatear todos los numeros de télefonos iguales
    const contacto = {
      telefono: contact?.phones[0],
      nombre: contact?.name,
      correo: contact?.email
    }

    for (let clave in contacto) {
     /*  (clave, contacto[clave]) */
      setFieldValue(clave, contacto[clave])
    }
  }, [contact])
  return (
    <>
      {/* aquí pendiente para seleccionar cuando el contacto tiene más de un numero de telefono */}
      {/* {contact && <div className="bg-blue-200 absolute">{JSON.stringify(contact, null, 2)}</div>} */}
    </>
  )
}



export const BooleanSwitch = ({ lista, label, disabled, ...props }) => {
  const [field, meta, { setValue }] = useField({ name: props.name });
  const [hoverRef, isHovered] = useHover();

  return (
    <div className=" relative w-full">
      <label className="font-display text-sm text-primary w-full capitalize">
        {label}
      </label>
      <div className="flex h-7 items-center justify-center relative">
        <div
          value={lista[0]}
          onClick={() => !disabled && setValue(lista[0])}
          {...props}
          {...field}
          className={`font-display text-center w-1/2 h-7 border text-gray-500 border-gray-200 py-1 text-sm rounded-l-lg focus:outline-none ${!disabled && "hover:bg-green-300 hover:text-white"} capitalize cursor-pointer transition ${meta.value == lista[0] ? "bg-green-300 text-white" : "bg-white"
            }`}
        >
          {lista[0]}
        </div>
        <div
          value={lista[1]}
          onClick={() => !disabled && setValue(lista[1])}
          {...props}
          {...field}
          className={`w-1/2 h-7 font-display text-center text-gray-500 border border-gray-200 py-1 text-sm rounded-r-lg focus:outline-none ${!disabled && "hover:bg-rosa hover:text-white"} capitalize cursor-pointer transition ${meta.value == lista[1] ? "bg-rosa text-white" : "bg-white"
            }`}
        >
          {lista[1]}
        </div>
        {disabled && <div ref={hoverRef} className="w-full h-full z-10 absolute"></div>}
      </div>
      {isHovered && (
        <div className="transform translate-y-1 bg-gray-700 absolute z-10 top-14 rounded-lg text-white px-3 py-1 text-xs">
          Campo bloqueado, elmine el invitado y créelo nuevamente.
        </div>
      )}
      {meta.touched && meta.error && (
        <p className="font-display absolute rounded-xl text-xs left-0 bottom-0 transform translate-y-full text-red flex gap-1">
          <WarningIcon className="w-4 h-4" />
          {meta.error}
        </p>
      )}
    </div>

  );
};
