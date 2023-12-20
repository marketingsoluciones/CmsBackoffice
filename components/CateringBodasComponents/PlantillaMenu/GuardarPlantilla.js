import { Form, Formik, Field } from "formik"
import { InputFieldGlobal } from "../../formularios/Inputs/InputFieldGlobal"

export const GuardarPlantilla = ({ setOpenModal, openModal }) => {

    const dataArryCategorias = [
        {
            value: "Coctel de bienvenida",
            label: "Coctel de bienvenida"
        },
        {
            value: "Carta de vinos",
            label: "Carta de vinos"
        },
        {
            value: "Carta de cervezas",
            label: "Carta de cervezas"
        },
        {
            value: "Listado de aperitivos",
            label: "Listado de aperitivos"
        },
        {
            value: "Listado de entradas",
            label: "Listado de entradas"
        },
        {
            value: "Listado de postres",
            label: "Listado de postres"
        },
    ]

    const initialValues = {
        checked: [],
    }

    const handelsumbit = () => {

    }

    return (
        <>
            <div className="h-full ">
                <div className="flex flex-row-reverse">
                    <button onClick={() => setOpenModal(!openModal)} >
                        X
                    </button>
                </div>
                <div className="flex flex-col justify-center  items-center space-y-5 h-96">
                    <p className="text-acento text-3xl">Guardar Plantilla</p>
                    <Formik initialValues={initialValues} onSubmit={handelsumbit}>
                        <Form>
                            <div className="space-y-5">
                                <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                                    <label className="text-gray-500 text-xl">Nombre de la plantilla</label>
                                    <InputFieldGlobal
                                        name="nombreMenu"
                                        className="focus:outline-none border border-gray-300 rounded-lg py-1 px-3 py-3 w-[100%]  truncate "
                                        placeholder=""
                                    />
                                </div>
                                <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                                    <label className="text-gray-500 text-xl">Nota</label>
                                    <InputFieldGlobal
                                        name="nombreMenu"
                                        className="focus:outline-none border border-gray-300 rounded-lg py-1 px-3 py-3 w-[100%]  truncate "
                                        placeholder=""
                                    />
                                </div>

                                <div className="space-x-6 flex justify-center">
                                    <button onClick={() => setOpenModal(!openModal)} type="button" className="px-3 py-1 bg-gray-400 rounded-lg  text-white">
                                        Cancelar
                                    </button>
                                    <button type="button" className="px-3 py-1 bg-acento rounded-lg  text-white">
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