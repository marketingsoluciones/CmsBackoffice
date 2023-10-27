import { Form, Formik } from "formik"
import * as yup from "yup";
import { InputFieldGlobal } from "../../components/formularios/Inputs/InputFieldGlobal"
import { SelectField } from "../../components/formularios/Inputs/SelectField"
import { PlusCirculoIcon } from "../Icons/index";
import { fetchApiEventos, queries } from "../../utils/Fetching";
import { AuthContextProvider } from "../../context/AuthContext";
import { EventsGroupContextProvider } from "../../context/EventsGroupContext";
import { useState } from "react";
export const FormCrearEvento = ({ state, set }) => {
    const { user } = AuthContextProvider()
  const { setEventsGroup, eventsGroup } = EventsGroupContextProvider();

    const [valir, setValir] = useState(false)


    const ListaTipo = [
        "cumpleaños",
        "boda",
        "babyshower",
        "graduación",
        "bautizo",
        "comunión",
        "desdepida de soltero",
        "otro",
    ];

    const initialValues/* : MyValues = EditEvent ? */ =
      /*   {
            ...event,
            fecha: new Date(parseInt(event.fecha)).toJSON().slice(0, -14)
        }
        : */ {
        nombre: "",
        tipo: "",
        fecha: new Date().toJSON(),
        pais: "",
        poblacion: "",
        usuario_id: user.uid,
        usuario_nombre: user.displayName,
    }

    const createEvent = async (values) => {
        try {
            const crearEvento = await fetchApiEventos({
                query: queries.eventCreate,
                variables: values,
            });
            if (crearEvento) {
                setEventsGroup({ type: "ADD_EVENT", payload: crearEvento });

            }
           /*  toast("success", "Evento creado con exito"); */
        } catch (error) {
            /* toast("error", "Ha ocurrido un error al crear el evento"); */
            console.log(error);
        } finally {
            set(!state);
            setValir(true)
        }
    }

    const handleSubmit = (values) => {
        createEvent(values)
    }

    const validationSchema = yup.object().shape({
        nombre: yup.string().required("Nombre de evento requerido"),
        tipo: yup.string().required("No has seleccionado un tipo de evento"),
    });



    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        /* validationSchema={validationSchema} */
        >
            <Form className="w-full">
                <div className="border-l-2 border-gray-100 pl-3 w-full ">
                    <h2 className="font-display text-3xl capitalize text-rosa font-light">
                        {/* EditEvent ? "Editar" : */ "Crear"}
                    </h2>
                    <h2 className="font-display text-5xl capitalize text-gray-500 font-medium">
                        Evento
                    </h2>
                </div>
                <div
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 py-6 w-full"
                >
                    <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                        <label className=" text-rosa">Nombre del evento</label>
                        <InputFieldGlobal
                            name="nombre"
                            className="focus:outline-none border-b border-gray-300  py-1 px-3 py-1 w-full truncate text-base "
                            placeholder="Ej: cumpleaños de Lucía"
                        />
                    </div>
                    <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                        <label className=" text-rosa">Tipo de evento</label>
                        <SelectField
                            name="tipo"
                            className=" capitalize cursor-pointer text-sm  border border-gray-300  transition w-full py-1 px-2 mt-1 rounded-lg focus:outline-none "
                            options={ListaTipo}
                            icon={<PlusCirculoIcon />}
                            iconClassName="top-3 right-5 text-gray-600 "
                        />
                    </div>
                    <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                        <label className=" text-rosa">Fecha del evento</label>
                        <InputFieldGlobal
                            name="fecha"
                            className=" text-base focus:outline-none border-b border-gray-300  py-1 px-3 py-1 w-full truncate "
                            type="date"
                        />
                    </div>
                    <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                        <label className=" text-rosa">País</label>
                        <SelectField
                            name="pais"
                            className=" capitalize cursor-pointer text-sm  border border-gray-300  transition w-full py-1 px-2 mt-1 rounded-lg focus:outline-none "
                            options={ListaTipo}
                            icon={<PlusCirculoIcon />}
                            iconClassName="top-3 right-5 text-gray-600 "
                        />
                    </div>
                </div>
                <div className="flex justify-center space-x-5">
                    <button className="px-4 py-2 bg-gray-400 rounded-lg text-white" onClick={() => set(!state)} type="button">
                        cancelar
                    </button>
                    <button className="px-4 py-2 bg-rosa rounded-lg text-white" type="submit"  >
                        guardar
                    </button>
                </div>
            </Form>
        </Formik>
    )
}