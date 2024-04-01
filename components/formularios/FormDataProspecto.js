import { Form, Formik } from "formik"
import { InputFieldGlobal } from "./Inputs/InputFieldGlobal"

export const FormDataProspecto = ({ data }) => {
    const initialValue = {
        nombre: "",
        apellido: "",

        empresa: "",
        puestoTrabajo: "",
        email: "",
        etiqueta: "",

        telefono: "",
        etiquetaTelefono: "",
        paisTelefono: "",


    }
    return (
        <>
            <Formik initialValues={initialValue}>
                <Form>
                    <div className="space-y-3 flex flex-col items-center">
                        <h1 className="text-[40px] text-azulCorporativo text-center truncate w-[100%]">{data.title}</h1>

                        <div className="grid grid-cols-2 space-x-2 w-full">
                            <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                                <label className="text-gray-500 ">Nombre </label>
                                <InputFieldGlobal
                                    name="nombre"
                                    className="text-base focus:outline-none border border-gray-300 rounded-lg py-1.5 px-3  w-[100%]  truncate "
                                    placeholder=""
                                />
                            </div>
                            <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                                <label className="text-gray-500 ">Apellido</label>
                                <InputFieldGlobal
                                    name="apellido"
                                    className="text-base focus:outline-none border border-gray-300 rounded-lg py-1.5 px-3  w-[100%]  truncate "
                                    placeholder=""
                                />
                            </div>
                        </div>

                        <div className="space-y-3 ">
                            <div className="grid grid-cols-2 space-x-2">
                                <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                                    <label className="text-gray-500 ">Empresa </label>
                                    <InputFieldGlobal
                                        name="empresa"
                                        className="text-base focus:outline-none border border-gray-300 rounded-lg py-1.5 px-3  w-[100%]  truncate "
                                        placeholder=""
                                    />
                                </div>
                                <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                                    <label className="text-gray-500 ">Puesto de trabajo</label>
                                    <InputFieldGlobal
                                        name="puestoTrabajo"
                                        className="text-base focus:outline-none border border-gray-300 rounded-lg py-1.5 px-3  w-[100%]  truncate "
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-6 space-x-2">
                                <div className="flex flex-col space-y-1 mb-5 md:mb-0 col-span-4">
                                    <label className="text-gray-500 ">Correo electrónico </label>
                                    <InputFieldGlobal
                                        name="email"
                                        className="text-base focus:outline-none border border-gray-300 rounded-lg py-1.5 px-3  w-[100%]  truncate "
                                        placeholder=""
                                    />
                                </div>
                                <div className="flex flex-col space-y-1 mb-5 md:mb-0 col-span-2 ">
                                    <label className="text-gray-500 ">Etiqueta </label>
                                    <InputFieldGlobal
                                        name="etiqueta"
                                        className="text-base focus:outline-none border border-gray-300 rounded-lg py-1.5 px-3  w-[100%]  truncate "
                                        placeholder=""
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 space-x-2">
                            <div className="flex flex-col space-y-1 mb-5 md:mb-0 col-span-1">
                                <label className="text-gray-500 ">Pais </label>
                                <InputFieldGlobal
                                    name="email"
                                    className="text-base focus:outline-none border border-gray-300 rounded-lg py-1.5 px-3  w-[100%]  truncate "
                                    placeholder=""
                                />
                            </div>
                            <div className="flex flex-col space-y-1 mb-5 md:mb-0 col-span-4">
                                <label className="text-gray-500 ">Telefono</label>
                                <InputFieldGlobal
                                    name="email"
                                    className="text-base focus:outline-none border border-gray-300 rounded-lg py-1.5 px-3  w-[100%]  truncate "
                                    placeholder=""
                                />
                            </div>
                            <div className="flex flex-col space-y-1 mb-5 md:mb-0 col-span-2 ">
                                <label className="text-gray-500 ">Etiqueta </label>
                                <InputFieldGlobal
                                    name="etiqueta"
                                    className="text-base focus:outline-none border border-gray-300 rounded-lg py-1.5 px-3  w-[100%]  truncate "
                                    placeholder=""
                                />
                            </div>
                        </div>
                        <butto className=" cursor-pointer bg-rosa text-white px-4 py-2 rounded-lg hover:bg-pink-400">
                            Guardar
                        </butto>
                    </div>
                </Form>
            </Formik>

        </>
    )
}