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

export const Responsable = ({ handleChange, ...props }) => {
    const [field, meta, helpers] = useField({ name: props?.name });
    const [selectIcon, setSelectIcon] = useState()
    const [openResponsableList, setOpenResponsableList] = useState(false)

    console.log(field.value)

    useEffect(() => {
        if (selectIcon) {
            helpers.setValue(selectIcon)
            handleChange("responsable", selectIcon)
        }
    }, [selectIcon])


    return (
        <div className="flex justify-center items-center">
            {
                field?.value
                    ? <div
                        className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10 cursor-pointer"
                        onClick={() => {
                            setOpenResponsableList(!openResponsableList)

                        }} {...props}>
                             <img src={ResponsablesArry.find((elem) => elem?.title === field?.value).icon} className="h-10 " />
                        
                    </div> :
                    <div onClick={() => setOpenResponsableList(!openResponsableList)} className="w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14 rounded-full flex items-center justify-center cursor-pointer text-gray-600 hover:text-gray-800">
                        <AddUser className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10" />
                    </div>
            }
            {openResponsableList
                ? <Modal openIcon={openResponsableList} setOpenIcon={setOpenResponsableList} classe={"h-max w-[16%]"} >
                    <ResponsableList DataArry={ResponsablesArry} openModal={openResponsableList} setOpenModal={setOpenResponsableList} setSelectIcon={setSelectIcon} />
                </Modal>
                : null
            }
        </div>
    )
}