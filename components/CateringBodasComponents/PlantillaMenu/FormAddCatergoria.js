import { Formik, Form } from "formik"
import * as yup from "yup";
import { InputFieldGlobal } from "../../formularios/Inputs/InputFieldGlobal";

export const FormAddCategoria = ({ state, set }) => {
    const initialValues = {
        producto: "",
        categoria: "",
    }

    const handleSubmit = () => {

    }

    const pr = [
        "hola",
        "si"
    ]

    return (

        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            <Form className="w-full">
                <div className="border-l-2 border-gray-100 pl-3 w-full ">
                    <h2 className="font-display text-3xl capitalize text-rosa font-light">
                        {"Añadir"}
                    </h2>
                    <h2 className="font-display text-5xl capitalize text-gray-500 font-medium">
                        Categoria
                    </h2>
                </div>
                <div
                 className="space-y-5 my-7"
                >
                    <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                        <label className=" text-rosa*">Nombre de la categoria</label>
                        <InputFieldGlobal
                            name="nombre"
                            className="focus:outline-none border rounded-lg border-gray-300  py-1 px-3 py-1 w-full truncate text-base "
                            placeholder="Ej: Listado de dulces dieteticos"
                        />
                    </div>
                </div>
                <div className="flex justify-center space-x-5">
                    <button className="px-4 py-2 border border-rosa rounded-lg text-rosa" onClick={() => set(!state)} type="button">
                        Cancelar
                    </button>
                    <button className="px-4 py-2 bg-rosa rounded-lg text-white" type="button">
                        Añadir
                    </button>
                </div>
            </Form>
        </Formik>
    )
}