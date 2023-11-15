import { Formik, Form } from "formik"
import { InputFieldGlobal } from "../../formularios/Inputs/InputFieldGlobal"
import { SelectField } from "../../formularios/Inputs/SelectField"

export const AgregarProducto = ({ actionButton, setActionButton }) => {
    const initialValues = {

    }

    const handelSubmit = (value) => {

    }

    return (
        <div className="h-[100vh]">
            <p className=" text-slate-600 mt-1 px-5 text-xl md:text-3xl text-rosa">
                Agregar Producto
            </p>
            <div className="bg-white h-[calc(100%-135px)] mx-5 my-2 rounded-lg flex flex-col items-center justify-center   ">

                <Formik initialValues={initialValues} onSubmit={handelSubmit}>
                    <Form>
                        <p className="hidden md:block text-xl text-rosa mb-5 text-center md:text-start ">
                            Añadir producto a la carta
                        </p>
                        <p className=" md:hidden text-xl text-rosa mb-5 text-center ">
                            Añadir producto
                        </p>
                        <div className="flex flex-col md:flex-row  md:space-x-10 mb-5 md:mb-10 w-full ">
                            <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                                <label className="text-gray-500">Nombre</label>
                                <label className="text-gray-500  text-sm">Indica el nombre de tu plato o bebida</label>
                                <InputFieldGlobal
                                    name="nombre"
                                    className="focus:outline-none border border-gray-300 rounded-lg py-1 px-3 py-3 w-[100%] truncate "
                                    placeholder=""
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label className="text-gray-500">Categoria</label>
                                <label className="text-gray-500 text-sm">Selecciona la categoria usarias este plato</label>
                                <SelectField
                                    className="font-display capitalize cursor-pointer text-sm* text-gray-500 border border-gray-300 focus:border-primary transition w-full py-3 px-2 rounded-lg focus:outline-none  "
                                    options={["Cóctel de bievenida ", "Carta de vinos ", "Carta de cerveza ", "Lista de aperitivos ", "Listado de entradas ", "Listado de postres"]}
                                    name="asistencia"
                                    label=""

                                />
                            </div>
                        </div>

                        <div className="flex flex-col mb-5 md:mb-10 space-y-1">
                            <label className="text-gray-500">Alérgenos</label>
                            <label className="text-gray-500 text-sm">Indica si este plato tiene algun alérgeno</label>
                            <InputFieldGlobal
                                name="nombre"
                                className="focus:outline-none border border-gray-300 rounded-lg py-1 px-3 py-3 w-[100%] truncate "
                                placeholder=""
                            />
                        </div>

                        <div className="flex justify-center space-x-5">
                            <button className="px-4 py-2 bg-gray-300 rounded-lg text-white text-base" onClick={() => setActionButton(0)} type="button">
                                cancelar
                            </button>
                            <button className="px-4 py-2 bg-rosa rounded-lg text-white text-base" onClick={() => setActionButton(0)} type="button">
                                guardar
                            </button>
                        </div>
                    </Form>
                </Formik>


            </div>

        </div>
    )
}