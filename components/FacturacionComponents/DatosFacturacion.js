import { Formik, Form } from "formik"
import { InputFieldGlobal } from "../formularios/Inputs/InputFieldGlobal"
import { SelectField } from "../formularios/Inputs/SelectField"
import { ArrowDownIcon } from "../Icons/index"
import * as Yup from "yup";
import { useToast } from "../../hooks/useToast"

export const DatosFacturacion = ({ actionButtton }) => {
    const toast = useToast()

    const initialValues = {
        nombre: "",
        apellido: "",
        nombreCompañia: "",
        email: "",
        pais: "",
        apartamento: "",
        ciudad: "",
        estado: "",
        postal: "",
        impuesto: "",
        MetodoPago: "",
        calle: "",
    }
    const validation = Yup.object(
        {
          nombre: Yup.string().required("Campo requerido"),
          apellido: Yup.string().required("Campo requerido"),
          email: Yup.string().required("Campo requerido"),
          nombreCompañia: Yup.string().required("Campo requerido"),
        }
      )

    const handleSubmit = (values, { resetForm }) => {
        resetForm({ value: '' })
        toast("success", "Tus datos han sido guardados")
    }

    const pr = [
        "",
        "hola",
        "si"
    ]

    return (
        <div className=" h-[100vh]">
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validation}
            >
                {
                    ({ values }) => (
                        <Form className="bg-white rounded-lg px-20 py-10 space-y-5 h-[calc(100%-70px)] overflow-auto">
                            <div className=" border-b flex flex-col items-center space-y-2 px-28 pb-3  ">
                                <p className="text-rosa w-full">
                                    Contacto de Facturacion
                                </p>
                                <div className="flex items-center justify-center space-x-3 w-[100%] " >
                                    <label className="text-gray-700  text-base w-20 w-[30%] text-end font-semibold  ">Nombre</label>
                                    <div className="flex w-[100%] space-x-2">
                                        <InputFieldGlobal
                                            name="nombre"
                                            className="focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%] truncate text-base "
                                            placeholder="nombre de pila"
                                        />
                                        <InputFieldGlobal
                                            name="apellido"
                                            className="focus:outline-none border border-gray-300 rounded-lg py-1 px-3 w-[100%] truncate text-base "
                                            placeholder="apellido"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center space-x-3 w-[100%]  " >
                                    <label className="text-gray-700 text-base w-[30%] text-end font-semibold ">Nombre de la compañia</label>
                                    <div className="w-[100%]">
                                        <InputFieldGlobal
                                            name="nombreCompañia"
                                            className="focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%] truncate text-base "
                                            placeholder="Nombre de la compañia"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center space-x-3 w-[100%]  " >
                                    <label className="text-gray-700 text-base w-[30%] text-end font-semibold">Correo eléctronico</label>
                                    <div className="w-[100%]">
                                        <InputFieldGlobal
                                            name="email"
                                            className="focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%] truncate text-base "
                                            placeholder="correo de contacto"
                                        />
                                    </div>
                                </div>
                                <p className="text-base text-gray-600 pt-2"> Estaremos enviando facturas a este correo electrónico.</p>
                            </div>

                            <div className=" border-b flex flex-col items-center space-y-2 px-28 pb-5 ">
                                <p className="text-rosa w-full">
                                    Dirección de Envio
                                </p>
                                <div className="flex items-center space-x-3 w-[100%]  " >
                                    <label className="text-gray-700  text-base w-20 w-[30%] text-end font-semibold ">País</label>
                                    <SelectField
                                        name="pais"
                                        className=" capitalize cursor-pointer text-sm  border border-gray-300 w-[100%] transition w-full py-1 px-2 mt-1 rounded-lg focus:outline-none "
                                        options={pr}
                                        icon={<ArrowDownIcon />}
                                        iconClassName="top-2 right-5 text-gray-600 "
                                    />

                                </div>
                                <div className="flex items-center justify-center space-x-3 w-[100%]  " >
                                    <label className="text-gray-700  text-base w-20 w-[30%] text-end font-semibold">Dirección</label>
                                    <div className="flex w-[100%] space-x-2">
                                        <InputFieldGlobal
                                            name="calle"
                                            className="focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%] truncate text-base "
                                            placeholder="Calle"
                                        />
                                        <InputFieldGlobal
                                            name="apartamento"
                                            className="focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%] truncate text-base "
                                            placeholder="Apartamento"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 w-[100%]  " >
                                    <label className="text-gray-700  text-base w-20 w-[30%] text-end font-semibold">Ciudad</label>
                                    <InputFieldGlobal
                                        name="ciudad"
                                        className="focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%] truncate text-base "
                                        placeholder="correo de contacto"
                                    />
                                </div>
                                <div className="flex items-center space-x-3 w-[100%]" >
                                    <label className="text-gray-700  text-base w-20 w-[30%] text-end font-semibold">Estado</label>
                                    <SelectField
                                        name="estado"
                                        className=" capitalize cursor-pointer text-sm  border border-gray-300 w-[100%] transition w-full py-1 px-2 mt-1 rounded-lg focus:outline-none "
                                        options={pr}
                                        icon={<ArrowDownIcon />}
                                        iconClassName="top-2 right-5 text-gray-600 "
                                    />
                                </div>
                                <div className="flex items-center space-x-3 w-[100%]  " >
                                    <label className="text-gray-700  text-base w-20 w-[30%] text-end font-semibold">ZIP/Postal</label>
                                    <InputFieldGlobal
                                        name="postal"
                                        className="focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%] truncate text-base "
                                        placeholder=""
                                    />
                                </div>
                                <div className="flex items-center space-x-3 w-[100%]  " >
                                    <label className="text-gray-700  text-base w-20 w-[30%] text-end font-semibold">Número de impuesto sobre las ventas (opcional)</label>
                                    <InputFieldGlobal
                                        name="impuesto"
                                        className="focus:outline-none border border-gray-300 rounded-lg py-1 px-3  w-[100%] truncate text-base "
                                        placeholder="123456789"
                                    />
                                </div>
                            </div>

                            <div className="  flex flex-col items-center space-y-2 px-28 pb-5 ">
                                <p className="text-rosa w-full">
                                    Método de pago
                                </p>
                                <div className="flex w-full space-x-5">

                                    <div className="flex items-center space-x-1 py-5  border border-gray-300 rounded-lg  w-[50%]  " >
                                        <InputFieldGlobal
                                            type="radio"
                                            name="MetodoPago"
                                            value="TDC"
                                            className=" w-[100%]  cursor-pointer"
                                        />
                                        <label className="text-base w-[100%] font-semibold ">Tarjeta de crédito</label>
                                    </div>
                                    <div className="flex items-center space-x-1 py-5  border border-gray-300 rounded-lg  w-[50%]   "  >
                                        <InputFieldGlobal
                                            type="radio"
                                            name="MetodoPago"
                                            value="PayPal"
                                            className=" w-[100%]  cursor-pointer"

                                        />
                                        <img src="/Facturacion/paypalLogo.png" />
                                        <label className="text-base w-[100%] font-semibold ">PayPal</label>
                                    </div>
                                </div>

                            </div>

                            <div className="bg-gray-200 rounded-lg px-5 py-3 mt-3 flex items-center justify-between">
                                <button onClick={() => actionButtton(0)} type="button" className="border border-rosa rounded-lg py-1 px-3 text-rosa text-base bg-white">
                                    volver
                                </button>
                                <div className="flex items-center space-x-3">
                                    {/*   <p>
                                    Próxima factura estimada después de que finalice la prueba (1 módulo)  $49
                                </p> */}
                                    {(() => {
                                        if (values.MetodoPago == "TDC") {
                                            return (
                                                <button type="submit" className="bg-rosa rounded-lg px-7 py-2.5 text-white text-base" >
                                                    {/* Revisar compra */} Guardar Datos
                                                </button>
                                            )
                                        } else {
                                            return (
                                                <button type="submit" className="bg-amarillo rounded-lg px-7 py-2.5 text-white text-base " >
                                                    {/* <img src="/Facturacion/paypaLogoColor.png" /> */} Guardar Datos
                                                </button>
                                            )
                                        }
                                    })()}

                                </div>
                            </div>
                        </Form>
                    )
                }

            </Formik>
        </div>
    )
}