import { Form, Formik } from "formik";
import { SubHeader } from "./SubHeader";
import { AddEvent, Description, Duration, GuardarButtom, IconList, Responsable, ResponsableList, SelectIcon, Time, Tips } from "../MicroComponente";
import { Modal } from "../../modals/Modal";
import { useState } from "react";

export const Protocolo = ({ event, IconArry }) => {

    const newDate = new Date(parseInt(event?.fecha));
    const options = { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" };
    const time = newDate.toLocaleDateString("es-VE", options)
    const [openIcon, setOpenIcon] = useState(false)
    const [openResponsableList, setOpenResponsableList] = useState(false)
    const [selectIcon, setSelectIcon] = useState(null)
    const resultadoIcon = IconArry.find((Icon) => Icon.id == selectIcon);

    const ResponsablesArry = [
        {
            icon: "/rol_Decorador.png",
            title: "Decorador",
        },
        {
            icon: "/rol_Fotografo.png",
            title: "Fotográfor",
        },
        {
            icon: "/rol_Catering.png",
            title: "Catering",
        },
        {
            icon: "/rol_Musica.png",
            title: "Música",
        },
        {
            icon: "/rol_Maquillista.png",
            title: "Maquillista",
        },
        {
            icon: "/rol_novio.png",
            title: "Oficiante",
        },
    ]

    const initialValues = {
        time: "",
        Descripcion:"",

    }

    return (
        <>
            <SubHeader time={time} title={"Protocolo"} />
            <Formik initialValues={initialValues} >
                <Form>
                    <div className="flex items-center justify-center border-b border-dashed pb-3" >
                        <SelectIcon openIcon={openIcon} setOpenIcon={setOpenIcon} resultadoIcon={resultadoIcon} />
                        <div className="w-[15%] relative flex flex-col items-center">
                            <Time />
                            <Duration />
                        </div>
                        <Description />
                        <Responsable openModal={openResponsableList} setOpenModal={setOpenResponsableList} />
                        <Tips />
                    </div>
                </Form>
            </Formik>
            <AddEvent/>
            <GuardarButtom/>
            {
                openIcon ? (
                    <Modal openIcon={openIcon} setOpenIcon={setOpenIcon} classe={"h-max md:w-[30%]"} >
                        <IconList IterArry={IconArry} openIcon={openIcon} setOpenIcon={setOpenIcon} setSelectIcon={setSelectIcon} />
                    </Modal>
                ) : null
            }
            {
                openResponsableList ? (
                    <Modal openIcon={openResponsableList} setOpenIcon={setOpenResponsableList} classe={"h-max w-[16%]"} >
                        <ResponsableList DataArry={ResponsablesArry} openModal={openResponsableList} setOpenModal={setOpenResponsableList} />
                    </Modal>
                ) : null
            }
        </>
    )
}