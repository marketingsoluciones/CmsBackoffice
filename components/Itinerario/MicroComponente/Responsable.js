import { Modal } from "../../modals/Modal";
import { AddUser } from "../../Icons/index"
import { ResponsableList } from "./ResponsableList"
import { useEffect, useState } from "react"
import { useField } from "formik";
import { EventContextProvider } from "../../../context/EventContext";

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

const ResponsablesArryDia = [



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

export const Responsable = ({ itinerario, handleChange, title, task, ...props }) => {
    const [field, meta, helpers] = useField({ name: props?.name });
    const [selectIcon, setSelectIcon] = useState([])
    const [openResponsableList, setOpenResponsableList] = useState(false)
    console.log(title)

    useEffect(() => {
        if (selectIcon) {
            helpers.setValue(selectIcon.map((item) => item.title))
            handleChange("responsable", selectIcon.map((item) => item.title))
        }
    }, [selectIcon])

    return (
        <div
            style={{ paddingRight: field?.value?.length + 5, marginRight: -5.5 * field.value.length }}
            className="flex justify-center items-center pl-1 "
        >
            {field?.value.length > 0
                ?
                <div
                    style={{ width: 25 * field?.value?.length }}
                    className="w-6 md:w-8 lg:w-8 h-6 md:h-8 lg:h-10 cursor-pointer relative">
                    {field.value.map((item, idx) => {
                        return (
                            < div
                                key={idx}
                                style={{ left: 20 * idx }}
                                className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10 cursor-pointer absolute  "
                                onClick={() => {
                                    setOpenResponsableList(!openResponsableList)
                                }} {...props}>
                                {title === "el gran día" ?
                                    <img src={ResponsablesArryDia.find((elem) => elem?.title === item)?.icon} className="h-10 " /> :
                                    <img src={ResponsablesArry.find((elem) => elem?.title === item)?.icon} className="h-10 " />}

                            </div>
                        )
                    })}
                </div>
                :
                <div onClick={() => setOpenResponsableList(!openResponsableList)} className="w-10 md:w-12 lg:w-8 h-10 md:h-12 lg:h-14 rounded-full flex items-center justify-center cursor-pointer text-gray-600 hover:text-gray-800 -mr-4">
                    <AddUser className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10" />
                </div>
            }
            {
                openResponsableList
                    ? <Modal openIcon={openResponsableList} setOpenIcon={setOpenResponsableList} classe={"h-max w-[16%]"} >
                        <ResponsableList itinerario={itinerario} DataArry={ResponsablesArry} DataArryDia={ResponsablesArryDia} openModal={openResponsableList} setOpenModal={setOpenResponsableList} setSelectIcon={setSelectIcon} task={task} selectIcon={selectIcon} value={field.value} title={title} />
                    </Modal>
                    : null
            }
        </div >
    )
}