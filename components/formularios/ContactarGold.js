import { Form, Formik, Field } from "formik"
import { InputFieldGlobal } from "./Inputs/InputFieldGlobal"
import { TextareaFieldSimple } from "./Inputs/TextareaFieldSimple"

export const ContactarGold = ({ setOpenModal, openModal }) => {



    const initialValues = {
        emails: "",
        asunto: "",
        mensaje: ""
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
                <div className="flex flex-col justify-center* items-center h-[90%] space-y-5">
                    <img src="CoronaGold.png" alt="CoronaGold" />
                    <h1 className="text-amarillo text-xl text-center">¿Te gustaría adquirir la VERSIÓN GOLD?</h1>
                    <Formik initialValues={initialValues} onSubmit={handelsumbit}>
                        <Form>
                            <div className="space-y-7">
                                <div className="flex flex-col space-y-1 my-5 md:mb-0 ">
                                    <label className="text-gray-500 text-base">Selecciona la versión que deseas</label>
                                    <div className="space-x-2 flex itmes-center" >

                                        <Field type="checkbox" name="checked" value={"landingPage"} className="" />
                                        <label className="text-base text-gray-700">Landing page</label>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1 my-5 md:mb-0 ">
                                    <label className="text-gray-500 text-base">Correo eléctronico</label>
                                    <InputFieldGlobal
                                        name="emails"
                                        className=" text-base focus:outline-none border border-gray-300 rounded-lg py-1 px-3 py-2 w-[100%]  truncate "
                                        placeholder="first@friend.com"
                                    />
                                </div>
                                <div className="space-x-6 flex justify-center">
                                    <button onClick={() => setOpenModal(!openModal)} type="button" className="px-3 py-1 border border-amarillo rounded-lg  text-amarillo text-base">
                                        Cancelar
                                    </button>
                                    <button type="button" className="px-3 py-1 bg-amarillo rounded-lg  text-white text-base">
                                        enviar
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