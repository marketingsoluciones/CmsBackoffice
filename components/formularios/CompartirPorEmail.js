import { Form, Formik, Field } from "formik"
import { InputFieldGlobal } from "./Inputs/InputFieldGlobal"
import { TextareaFieldSimple } from "./Inputs/TextareaFieldSimple"

export const CompartirPorEmail= ({ setOpenModal, openModal }) => {

   

    const initialValues = {
       emails:"",
       asunto:"",
       mensaje:""
    }

    const handelsumbit = () => {

    }

    return (
        <>
            <div className="h-full overflow-auto*">
                <div className="flex flex-row-reverse">
                    <button onClick={() => setOpenModal(!openModal)} >
                        X
                    </button>
                </div>
                <div className="flex flex-col justify-center  items-center  [h-90%]">
                    <h1 className="text-rosa text-xl">Invita a tus amigos</h1>
                    <h2 className="text-base font-semibold text-gray-600">Correos electrónicos de los amigos</h2>
                    <Formik initialValues={initialValues} onSubmit={handelsumbit}>
                        <Form>
                            <div className="space-y-2">
                                <div className="flex flex-col space-y-1 my-5 md:mb-0 ">
                                    <label className="text-gray-500 text-base">Separa los correos electronicos por comas.</label>
                                    <InputFieldGlobal
                                        name="emails"
                                        className=" text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3 py-2 w-[100%]  truncate "
                                        placeholder="first@friend.com, second@friend.com"
                                    />
                                </div>
                                <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                                    <label className="text-gray-500 text-base">Asunto</label>
                                    <InputFieldGlobal
                                        name="asunto"
                                        className=" text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3 py-2 w-[100%]  truncate "
                                        placeholder="Mi regalo para ti"
                                    />
                                </div>
                                <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                                    <label className="text-gray-500 text-base">Mensaje</label>
                                    <TextareaFieldSimple
                                        name="mensaje"
                                        className=" text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3 py-2 w-[100%]  truncate "
                                        placeholder="Mi regalo para ti"
                                    />
                                </div>
                                
                                <div className="space-x-6 flex justify-center">
                                    <button onClick={() => setOpenModal(!openModal)} type="button" className="px-3 py-1 bg-gray-400 rounded-lg  text-white">
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