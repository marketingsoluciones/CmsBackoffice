import { Formik, Form } from "formik"
import { InputFieldGlobal } from "./Inputs/InputFieldGlobal"
import { SelectField } from "./Inputs/SelectField"
import { ArrowDownIcon } from "../Icons/index"
import { AuthContextProvider } from "../../context/AuthContext"
export const ConfiguracionCuentasForm = () => {
    const { user } = AuthContextProvider()
    console.log(user)

    const initialValues = {
        nombre: user?.displayName,
        email: user?.email,
        asunto: "",
        mensaje: ""
    }

    const handelsumbit = () => {

    }

    const handleChange = () => {

    }
    const pr = [
        "",
        "hola",
        "si"
    ]
    return (
        <Formik initialValues={initialValues} onSubmit={handelsumbit}>
            <Form>
                <div className="  flex flex-col items-center space-y-2 px-28 pb-5 ">
                    <div className="flex w-[100%] items-center justify-center space-x-5">
                        <label htmlFor="photo" className={"relative cursor-pointer hover:opacity-50"}>
                            <img src={user?.photoURL ?? "/placeholder/user.png"} alt={"perfil"} className={"border-primary border-2 rounded-full objeto-cover h-20 w-20  object-cover object-center"} />
                            {/* loading */ true && (
                                <div className="flex items-center* *justify-center h-20 w-20 rounded-full bg-primary bg-opacity-90 absolute top-0 left-0 text-white">
                                    {/* <LoadingItem size="small" text="Cargando" /> */}
                                </div>
                            )}
                        </label>
                        <input type="file" id="photo" name="photo" className="hidden" onChange={handleChange} />
                        <div className="flex flex-col">
                            <label className="text-rosa  font-semibold ">Elegir foto</label>
                            <label className="text-gray-500  text-base ">Tamaño máximo 2 MB. Formatos: JPG, GIF, PNG.</label>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 w-[100%]  " >
                        <label className="text-gray-700  text-base w-20 w-[30%] text-end font-semibold ">Tu nombre</label>
                        <InputFieldGlobal
                            name="nombre"
                            className="focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%] truncate text-base "
                            placeholder="correo de contacto"
                        />
                    </div>
                    <div className="flex items-center space-x-3 w-[100%]  " >
                        <label className="text-gray-700  text-base w-20 w-[30%] text-end font-semibold">Correo electrónico</label>
                        <InputFieldGlobal
                            name="email"
                            className="focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%] truncate text-base "
                            placeholder="correo de contacto"
                        />
                    </div>
                    <div className="flex items-center space-x-3 w-[100%]" >
                        <label className="text-gray-700  text-base w-20 w-[30%] text-end font-semibold">Huso horario</label>
                        <SelectField
                            name="horario"
                            className=" capitalize cursor-pointer text-sm  border border-gray-300 w-[100%] transition w-full py-1 px-2 mt-1 rounded-lg focus:outline-none "
                            options={pr}
                            icon={<ArrowDownIcon />}
                            iconClassName="top-2 right-5 text-gray-600 "
                        />
                    </div>
                    <p className="text-base text-gray-500 ml-52">La zona horaria se actualiza automáticamente para concordar con la zona horaria de tu ordenador</p>
                    <div className="flex items-center space-x-3 w-[100%]  " >
                        <label className="text-gray-700  text-base w-20 w-[30%] text-end font-semibold">Formato de fecha/número</label>
                        <SelectField
                            name="formato"
                            className=" capitalize cursor-pointer text-sm  border border-gray-300 w-[100%] transition w-full py-1 px-2 mt-1 rounded-lg focus:outline-none "
                            options={pr}
                            icon={<ArrowDownIcon />}
                            iconClassName="top-2 right-5 text-gray-600 "
                        />
                    </div>
                    <div className="flex items-center space-x-3 w-[100%]  " >
                        <label className="text-gray-700  text-base w-20 w-[30%] text-end font-semibold">Idioma</label>
                        <SelectField
                            name="idioma"
                            className=" capitalize cursor-pointer text-sm  border border-gray-300 w-[100%] transition w-full py-1 px-2 mt-1 rounded-lg focus:outline-none "
                            options={pr}
                            icon={<ArrowDownIcon />}
                            iconClassName="top-2 right-5 text-gray-600 "
                        />
                    </div>
                    <div className="flex items-center space-x-3 w-[100%]  " >
                        <label className="text-gray-700  text-base w-20 w-[30%] text-end font-semibold">Moneda por defecto</label>
                        <SelectField
                            name="moneda"
                            className=" capitalize cursor-pointer text-sm  border border-gray-300 w-[100%] transition w-full py-1 px-2 mt-1 rounded-lg focus:outline-none "
                            options={pr}
                            icon={<ArrowDownIcon />}
                            iconClassName="top-2 right-5 text-gray-600 "
                        />
                    </div>
                    <div>
                        <button className="bg-rosa rounded-lg py-1 px-5 text-white text-base">
                            Guardar
                        </button>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}