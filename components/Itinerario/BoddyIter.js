import { Anillos, Baile, Baile2, Brindis, Carro, Cena, Cocteles, Comida, Dividersvg, Fotografo, FuegosArtificiales, Iglesia, Maquillaje, Merienda, Novios, PlusIcon, Salida, SesionFotos, Sol, Torta, Vestido, Dress, Dots } from "../Icons/index"
import { SelectIcon } from "./MicroComponente/SelectIcon"
import { Time } from "./MicroComponente/Time"
import { Description } from "./MicroComponente/Description"
import { useEffect, useState } from "react"
import { Modal } from "../modals/Modal"
import { IconList } from "./MicroComponente/IconList"
import { Formik, Form } from "formik"
import { InputFieldGlobal } from "../formularios/Inputs/InputFieldGlobal"
import { useToast } from "@chakra-ui/react"
import { MyDocument } from "../CreatePDF"
import * as yup from "yup"

export const BoddyIter = ({ IterArryst, setIterArryst, createPdf }) => {
    const [itinerary, setItinerary] = useState(false)
    const [openIcon, setOpenIcon] = useState(false)
    const [selectIcon, setSelectIcon] = useState(null)
    const toast = useToast()


    const IconArry = [
        {
            id: "10",
            icon: <Anillos />,
        },
        {
            id: "11",
            icon: <FuegosArtificiales />,
        },
        {
            id: "12",
            icon: <Baile />,
        },
        {
            id: "13",
            icon: <Baile2 />,
        },
        {
            id: "14",
            icon: <Brindis />,
        },
        {
            id: "15",
            icon: <Carro />,
        },
        {
            id: "16",
            icon: <Cena />
        },
        {
            id: "17",
            icon: <Cocteles />,
        },
        {
            id: "18",
            icon: <Comida />,
        },
        {
            id: "19",
            icon: <Fotografo />,
        },
        {
            id: "20",
            icon: <Iglesia />,
        },
        {
            id: "21",
            icon: <Maquillaje />,
        },
        {
            id: "22",
            icon: <Merienda />,
        },
        {
            id: "23",
            icon: <Novios />,
        },
        {
            id: "24",
            icon: <Salida />,
        },
        {
            id: "25",
            icon: <SesionFotos />,
        },
        {
            id: "26",
            icon: <Sol />,
        },
        {
            id: "27",
            icon: <Torta />,
        },
        {
            id: "28",
            icon: <Vestido />,
        },
        {
            id: "29",
            icon: <Dress />,
        },
    ]

    const resultadoIcon = IconArry.find((Icon) => Icon.id == selectIcon);

    const handleSubmit = (values) => {
        console.log(values)
        try {
            const IterArry = JSON.parse(localStorage.getItem("dataIter")) || []
            IterArry.push(values)
            const myArryIterJSON = JSON.stringify(IterArry)
            localStorage.setItem("dataIter", myArryIterJSON)
            /*  toast("success", "evento creado con exito"); */

        } catch (error) {
            /*  toast("error", "Ha ocurrido un error al crear el Menu"); */
            console.log(error)
        }
    }

    if (handleSubmit != null) {

        useEffect(() => {
            setIterArryst(JSON.parse(localStorage.getItem("dataIter")))
        }, [])
    }

    const initialValues = {
        description: "",
        idIcon: selectIcon,
        timeH: "",
        timeM: ""
    }

    const validationSchema = yup.object().shape({
        description: yup.string().required(),
        timeH: yup.number().required(),
        timeM: yup.number().required(),
    });

    return (
        <>
            <div className="flex flex-col items-center bg-white h-full p-5 rounded-lg ">
                <div className="text-rosa font-title text-5xl">
                    El gran día
                </div>
                <div className="bg-rosa h-1 w-16 rounded mb-7" />

                {IterArryst?.map((item, idx) => {
                    const IconSelect = IconArry.find((Icon) => Icon.id === item?.idIcon);
                    return (
                        <div key={idx} className="flex justify-center items-center w-full  space-x-10 ">
                            <div className="w-16" >
                                {IconSelect?.icon}
                                <div className=" mb-4 mt-1" />
                            </div>
                            <div className="w-44  flex  items-center justify-center">
                                <p className="text-3xl border-b ">
                                    {item?.timeH}
                                </p>
                                <Dots />
                                <p className="text-3xl border-b ">
                                    {item?.timeM}
                                </p>
                            </div>
                            <div>
                                <Dividersvg />
                            </div>
                            <div className="w-44 ">
                                <p className="text-xl border-b">
                                    {item?.description}
                                </p>

                            </div>
                        </div>
                    )
                })}

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <Form className="flex flex-col items-center justify-center" >
                        <div className="flex justify-center items-center w-full  space-x-10 ">
                            <div className="mb-4 w-16  " >
                                <SelectIcon openIcon={openIcon} setOpenIcon={setOpenIcon} resultadoIcon={resultadoIcon} />
                               
                            </div>
                            <div className="w-44 flex items-center  mb-4 space-x-1">
                                <InputFieldGlobal
                                    type="number"
                                    name="timeH"
                                    className="focus:outline-none border-b border-solid* rounded-lg py-1 px-3 w-[100%] truncate text-3xl md:text-3xl"
                                    placeholder="HH"
                                />
                                <Dots />
                                <InputFieldGlobal
                                    type="number"
                                    name="timeM"
                                    className="focus:outline-none border-b border-solid* rounded-lg py-1 px-3 w-[100%] truncate text-md md:text-3xl"
                                    placeholder="MM"
                                />
                            </div>
                            <div>
                                <Dividersvg />
                            </div>
                            <div className="w-44 mb-4">
                                <InputFieldGlobal
                                    name="description"
                                    className="focus:outline-none border-b border-solid* rounded-lg py-1 px-3 w-[100%] truncate text-md md:text-xl"
                                    placeholder="What do you want to do"
                                />
                            </div>
                        </div>
                        <button onClick={() => { setItinerary(!itinerary) }} type="submit" className="text-rosa flex items-center justify-center space-x-4 my-10">
                            <PlusIcon />
                            <p>
                                Añadir Evento
                            </p>
                        </button>
                    </Form>
                </Formik>

                <button onClick={() => ""} className=" bg-rosa text-white py-3 px-4 rounded-lg">
                    Guardar
                </button>
            </div>
            {
                openIcon ? (
                    <Modal openIcon={openIcon} setOpenIcon={setOpenIcon} classe={""} >
                        <IconList IterArry={IconArry} openIcon={openIcon} setOpenIcon={setOpenIcon} setSelectIcon={setSelectIcon} />
                    </Modal>
                ) : null
            }
            
        </>
    )
}