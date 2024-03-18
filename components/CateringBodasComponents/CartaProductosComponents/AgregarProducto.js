import { Formik, Form } from "formik"
import { InputFieldGlobal } from "../../formularios/Inputs/InputFieldGlobal"
import { SelectField } from "../../formularios/Inputs/SelectField"
import { ArrowDownIcon, ArrowLeft } from "../../Icons/index"

export const AgregarProducto = ({ setActionButton, setChildrenComponentState }) => {
    
    const initialValues = {
        nombre: "",
        categoria: "",
        alergenos: ""
    }

    const handelSubmit = (value) => {
        console.log(value)
    }

    const DataCategoria = [
        "Cóctel de bievenida ",
        "Carta de vinos ",
        "Carta de cerveza ",
        "Lista de aperitivos ",
        "Listado de entradas ",
        "Listado de postres"
    ]

    return (
        <div className="">
            <div onClick={() => setChildrenComponentState(0)} className="w-5 h-5 z-10 top-2 left-3 text-gray-700 cursor-pointer">
                <ArrowLeft />
            </div>
            <p className=" mt-1  text-xl md:text-3xl text-rosa">
                Agregar Producto
            </p>
            <div className="bg-white h-[calc(100vh-150px)] my-2 rounded-lg flex flex-col items-center justify-center   ">
                <Formik initialValues={initialValues} onSubmit={handelSubmit}>
                    <Form>
                        <p className="hidden md:block text-[25px] text-rosa mb-5 text-center md:text-start ">
                            Añadir producto a la carta
                        </p>
                        <p className=" md:hidden text-xl text-rosa mb-5 text-center ">
                            Añadir producto
                        </p>
                        <div className="flex flex-col md:flex-row  md:space-x-10 mb-5 md:mb-5 w-full ">
                            <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                                <label className="text-gray-500">Nombre</label>
                                <label className="text-gray-500  text-sm">Indica el nombre de tu plato o bebida</label>
                                <InputFieldGlobal
                                    name="nombre"
                                    className="capitalize text-sm  border border-gray-300  transition w-full py-2 px-2 mt-1 rounded-lg focus:outline-none "
                                    placeholder=""
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label className="text-gray-500">Categoria</label>
                                <label className="text-gray-500 text-sm">Selecciona la categoria usarias este plato</label>
                                <SelectField
                                    className="capitalize cursor-pointer text-sm  border border-gray-300  transition w-full py-2 px-2 mt-1 rounded-lg focus:outline-none  "
                                    options={DataCategoria}
                                    name="categoria"
                                    label=""
                                    icon={<ArrowDownIcon />}
                                    iconClassName="top-3 right-5 text-gray-600 "
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mb-5 md:mb-10 space-y-1">
                            <label className="text-gray-500">Alérgenos</label>
                            <label className="text-gray-500 text-sm">Indica si este plato tiene algun alérgeno</label>
                            <InputFieldGlobal
                                name="alergenos"
                                className="capitalize text-sm  border border-gray-300  transition w-full py-3 px-2 mt-1 rounded-lg focus:outline-none"
                                placeholder=""
                            />
                        </div>
                        <div className="flex justify-center space-x-5">
                            <button className="px-4 py-2 bg-gray-400 rounded-lg text-white text-base" onClick={() => setActionButton(0)} type="button">
                                cancelar
                            </button>
                            <button className="px-4 py-2 bg-rosa rounded-lg text-white text-base"  type="submit">
                                guardar
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}