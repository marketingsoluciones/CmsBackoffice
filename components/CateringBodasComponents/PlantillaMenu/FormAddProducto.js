import { Formik, Form } from "formik"
import * as yup from "yup";
import { SelectField } from "../../formularios/Inputs/SelectField";
import { ArrowDownIcon } from "../../Icons/index";

export const FormAddProducto = ({ state, set }) => {
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
                        Producto
                    </h2>
                </div>
                <div
                 className="space-y-5 my-7"
                >
                    <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                        <label className=" text-rosa*">Producto</label>
                        <SelectField
                            name="producto"
                            className=" capitalize cursor-pointer text-sm  border border-gray-300  transition w-full py-1 px-2 mt-1 rounded-lg focus:outline-none "
                            options={pr}
                            icon={<ArrowDownIcon />}
                            iconClassName="top-2 right-5 text-gray-600 "
                        />
                    </div>
                    <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                        <label className=" text-rosa*">Seleccionar categoria</label>
                        <SelectField
                            name="categoria"
                            className=" capitalize cursor-pointer text-sm  border border-gray-300  transition w-full py-1 px-2 mt-1 rounded-lg focus:outline-none "
                            options={pr}
                            icon={<ArrowDownIcon />}
                            iconClassName="top-2 right-5 text-gray-600 "
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