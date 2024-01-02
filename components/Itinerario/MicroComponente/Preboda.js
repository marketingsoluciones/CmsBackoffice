
import { useState } from "react";
import { SubHeader, SelectIcon, IconList, Time, Description, Responsable, ResponsableList, Tips, Duration, AddEvent, GuardarButtom } from "../MicroComponente";
import { Modal } from "../../modals/Modal";
import { Form, Formik } from "formik";

export const Preboda = ({ event, IconArry }) => {
    const newDate = new Date(parseInt(event?.fecha));
    const options = { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" };
    const time = newDate.toLocaleDateString("es-VE", options)
    const [openIcon, setOpenIcon] = useState(false)
    const [openResponsableList, setOpenResponsableList] = useState(false)
    const [selectIcon, setSelectIcon] = useState(null)
    const resultadoIcon = IconArry.find((Icon) => Icon.id == selectIcon);

    const ResponsablesArry = [
        {
            icon: "/rol_novia.png",
            title: "Novia",
        },
        {
            icon: "/rol_novio.png",
            title: "Novio",
        },
        {
            icon: "/rol_invitados.png",
            title: "Invitados",
        },
        {
            icon: "/rol_proveedor.png",
            title: "Proveedor",
        },

    ]

    const initialValues = {
        time: "",
        Descripcion:"",

    }

    return (
        <>
            <SubHeader time={time} title={"Preboda"} />
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