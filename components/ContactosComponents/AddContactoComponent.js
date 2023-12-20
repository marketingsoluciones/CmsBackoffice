import { Form, Formik, Field } from "formik"
import { InputFieldGlobal } from "../../components/formularios/Inputs/InputFieldGlobal"
import { SelectField } from "../formularios/Inputs/SelectField"
import { ArrowDownIcon } from "../Icons/index"

export const AddContactoComponent = ({ setModalPersona, modalPersona }) => {



    const initialValues = {

    }

    const handelsumbit = () => {

    }

    return (
        <>
            <div className="h-full ">
                <div className="flex flex-row-reverse">
                    <button onClick={() => setModalPersona(!modalPersona)} >
                        X
                    </button>
                </div>
                <div className="flex flex-col justify-center  items-center space-y-5 [h-90%]">
                    <p className="text-rosa text-3xl">Añadir persona</p>
                    <Formik initialValues={initialValues} onSubmit={handelsumbit}>
                        <Form>
                            <div className="space-y-3">
                                <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                                    <label className="text-gray-500 ">Nombre </label>
                                    <InputFieldGlobal
                                        name="nombreMenu"
                                        className="text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%]  truncate "
                                        placeholder=""
                                    />
                                </div>
                                <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                                    <label className="text-gray-500 ">Organización</label>
                                    <InputFieldGlobal
                                        name="organizacion"
                                        className=" text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%]  truncate "
                                        placeholder=""
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-gray-500">Etiqueta</label>
                                    <SelectField
                                        className="text-base font-display capitalize cursor-pointer text-sm* text-gray-500 border border-gray-300 focus:border-primary transition w-full py-2 px-1 rounded-lg focus:outline-none  "
                                        options={["Cóctel de bievenida ", "Carta de vinos ", "Carta de cerveza ", "Lista de aperitivos ", "Listado de entradas ", "Listado de postres"]}
                                        name="asistencia"
                                        label=""
                                        icon={<ArrowDownIcon />}
                                        iconClassName="top-2 right-2 text-gray-600 "

                                    />
                                </div>
                                <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                                    <label className="text-gray-500 ">Correo eléctronico</label>
                                    <InputFieldGlobal
                                        name="email"
                                        className="text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3 w-[100%]  truncate "
                                        placeholder=""
                                    />
                                </div>
                                <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                                    <label className="text-gray-500 ">Telefono</label>
                                    <InputFieldGlobal
                                        name="telefono"
                                        className="text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%]  truncate "
                                        placeholder=""
                                    />
                                </div>

                                <div className="space-x-6 flex justify-center text-base pt-10 ">
                                    <button onClick={() => setModalPersona(!modalPersona)} type="button" className="px-3 py-1 bg-gray-400 rounded-lg  text-white">
                                        Cancelar
                                    </button>
                                    <button type="button" className="px-3 py-1 bg-rosa rounded-lg  text-white">
                                        Guardar
                                    </button>
                                </div>
                            </div>

                        </Form>
                    </Formik>
                </div>
            </div>

        </>
    )
}