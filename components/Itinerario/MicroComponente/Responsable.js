import { Modal } from "../../modals/Modal";
import { AddUser } from "../../Icons/index"
import { ResponsableList } from "./ResponsableList"
import { useEffect, useState } from "react"

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

export const Responsable = () => {
    const [openResponsableList, setOpenResponsableList] = useState(false)

    useEffect(() => {
        console.log(openResponsableList)
    }, [openResponsableList])


    return (
        <div className="flex justify-center items-center">
            {/* <span className="text-[13px] text-rosa">Responsable</span> */}
            <div onClick={() => setOpenResponsableList(!openResponsableList)} className="w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14 rounded-full flex items-center justify-center cursor-pointer text-gray-600 hover:text-gray-800">
                <AddUser className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10" />
            </div>
            {openResponsableList
                ? <Modal openIcon={openResponsableList} setOpenIcon={setOpenResponsableList} classe={"h-max w-[16%]"} >
                    <ResponsableList DataArry={ResponsablesArry} openModal={openResponsableList} setOpenModal={setOpenResponsableList} />
                </Modal>
                : null
            }
        </div>
    )
}