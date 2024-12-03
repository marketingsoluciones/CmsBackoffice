import { Form, Formik } from "formik"
import { InputFieldGlobal } from "./Inputs/InputFieldGlobal"
import { IoPricetagOutline } from "react-icons/io5";
import { MdPriceCheck } from "react-icons/md";
import { IoFlagOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { PiBinocularsLight } from "react-icons/pi";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";


export const FormDataProspecto = ({ data }) => {
    const initialValue = {
        etiquetas:"",
        valor:"",
        fechaCierre:"",
        nombre: "",
        prospecto:"",

        nombrePersona:"",
        email: "",
        emailTipo:"",

        paisTelefono: "",
        telefono: "",
        tipoTelefono: "",

        nombreEmpresa: "",
        direccion: "",
    }
    return (
        <>
            <Formik initialValues={initialValue}>
                <Form className="h-full">
                    <h1 className="text-[25px] text-azulCorporativo truncate w-[100%] pl-6 ">{data?.title}</h1>
                    <div className="space-y-3 flex flex-col justify-center h-[100%]  ">
                        <div className="space-y-1">
                            <label className="text-[17px]">Detalles</label>
                            <div className="flex items-center space-x-2 pl-3">
                                <div>
                                    <IoPricetagOutline className="h-auto w-5" />
                                </div>
                                <div>
                                    <InputFieldGlobal
                                        name="etiquetas"
                                        className="text-base focus:outline-none focus:ring-1 ring-gray-300 rounded-lg py-1.5 pl-1 w-[100%] truncate"
                                        placeholder="Etiquetas"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 pl-3">
                                <div>
                                    <MdPriceCheck className="h-auto w-5" />
                                </div>
                                <div>
                                    <InputFieldGlobal
                                        name="valor"
                                        className="text-base focus:outline-none focus:ring-1 ring-gray-300 rounded-lg py-1.5 pl-1 w-[100%] truncate"
                                        placeholder="Valor"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 pl-3">
                                <div>
                                    <IoFlagOutline className="h-auto w-5" />
                                </div>
                                <div>
                                    <InputFieldGlobal
                                        name="fechaCierre"
                                        className="text-base focus:outline-none focus:ring-1 ring-gray-300 rounded-lg py-1.5 pl-1 w-[100%] truncate"
                                        placeholder="Fecha prevista de cierre"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 pl-3">
                                <div>
                                    <HiOutlineUserCircle className="h-auto w-5" />
                                </div>
                                <div>
                                    <InputFieldGlobal
                                        name="nombre"
                                        className="text-base focus:outline-none focus:ring-1 ring-gray-300 rounded-lg py-1.5 pl-1 w-[100%] truncate"
                                        placeholder="Nombre"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 pl-3">
                                <div>
                                    <PiBinocularsLight className="h-auto w-5" />
                                </div>
                                <div>
                                    <InputFieldGlobal
                                        name="prospecto"
                                        className="text-base focus:outline-none focus:ring-1 ring-gray-300 rounded-lg py-1.5 pl-1 w-[100%] truncate"
                                        placeholder="Prospecto"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[17px]">Persona</label>
                            <div className="flex items-center space-x-2 pl-3">
                                <div>
                                    <FiUser className="h-auto w-5" />
                                </div>
                                <div>
                                    <InputFieldGlobal
                                        name="nombrePersona"
                                        className="text-base focus:outline-none focus:ring-1 ring-gray-300 rounded-lg py-1.5 pl-1 w-[100%] truncate"
                                        placeholder="Nombre"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 pl-3">
                                <div>
                                    <MdOutlineEmail className="h-auto w-5 " />
                                </div>
                                <div>
                                    <InputFieldGlobal
                                        name="email"
                                        className="text-base focus:outline-none focus:ring-1 ring-gray-300 rounded-lg py-1.5 pl-1  w-[100%] truncate"
                                        placeholder="Correo electronico"
                                    />
                                </div>
                                <div >
                                    <InputFieldGlobal
                                        name="emailTipo"
                                        className="text-base focus:outline-none focus:ring-1 ring-gray-300 rounded-lg py-1.5 pl-1  w-[50%] truncate"
                                        placeholder="Tipo"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 pl-3">
                                <div>
                                    <FiPhone className="h-auto w-5" />
                                </div>
                                <div className=" w-[20%]">
                                    <InputFieldGlobal
                                        name="paisTelefono"
                                        className="text-base focus:outline-none focus:ring-1 ring-gray-300 rounded-lg py-1.5 pl-1 w-[100%] truncate"
                                        placeholder="pais"
                                    />
                                </div>
                                <div className="w-[40%]">
                                    <InputFieldGlobal
                                        name="telefono"
                                        className="text-base focus:outline-none focus:ring-1 ring-gray-300 rounded-lg py-1.5 pl-1 w-[100%] truncate"
                                        placeholder="Telefono"
                                    />
                                </div>
                                <div className="w-[22%]">
                                    <InputFieldGlobal
                                        name="tipoTelefono"
                                        className="text-base focus:outline-none focus:ring-1 ring-gray-300 rounded-lg py-1.5 pl-1 w-[100%] truncate"
                                        placeholder="tipo"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[17px]">Organizacion</label>
                            <div className="flex items-center space-x-2 pl-3">
                                <div>
                                    <HiOutlineBuildingOffice2 className="h-auto w-5" />
                                </div>
                                <div className="w-[100%]">
                                    <InputFieldGlobal
                                        name="nombreEmpresa"
                                        className="text-base focus:outline-none focus:ring-1 ring-gray-300 rounded-lg py-1.5 pl-1 w-[100%] truncate"
                                        placeholder="Nombre de la empresa u Organizacion"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 pl-3">
                                <div>
                                    <IoLocationOutline className="h-auto w-5" />
                                </div>
                                <div className="w-[100%]">
                                    <InputFieldGlobal
                                        name="direccion"
                                        className="text-base focus:outline-none focus:ring-1 ring-gray-300 rounded-lg py-1.5 pl-1 w-[100%] truncate"
                                        placeholder="Direccion"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="pt-5  flex flex-row-reverse">
                            <butto className=" cursor-pointer bg-rosa text-white  px-4 py-2 rounded-lg hover:bg-pink-400">
                                Guardar
                            </butto>
                        </div>
                    </div>
                </Form>
            </Formik>

        </>
    )
}