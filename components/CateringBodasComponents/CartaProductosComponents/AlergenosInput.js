import { useEffect, useState } from "react"
import { AlergenosModal } from "./AlergenosModal"
import { Altramuces, Apio, ArrowDownIcon, Azucar, Cacahuetes, Crustaceos, FrutosCascara, Gluten, Huevos, Lacteos, Moluscos, Mostaza, Pescado, Sesamo, Soja, Sulfitos } from "../../Icons/index"
import { useField } from "formik";

export const AlergenosInput = ({ ...props }) => {
    const [field, meta, helpers] = useField({ name: props?.name });
    const [addAlergenos, setAddAlergenos] = useState([])
    const [openAlergenosModal, setOpenAlergenosModal] = useState(false)
    const DataAlergenos = [
        {
            icon: <Gluten />,
            title: "Gluten"
        },
        {
            icon: <Crustaceos />,
            title: "Crustáceos"
        },
        {
            icon: <Huevos />,
            title: "Huevos"
        },
        {
            icon: <Sesamo />,
            title: "Sésamo"
        },
        {
            icon: <Azucar />,
            title: "Azúcar"
        },
        {
            icon: <Apio />,
            title: "Apio"
        },
        {
            icon: <Cacahuetes />,
            title: "Cacahuetes"
        },
        {
            icon: <Moluscos />,
            title: "Moluscos"
        },
        {
            icon: <Sulfitos />,
            title: "Sulfitos"
        },
        {
            icon: <Lacteos />,
            title: "Lácteos"
        },
        {
            icon: <Mostaza />,
            title: "Mostaza"
        },
        {
            icon: <FrutosCascara />,
            title: "Frutos Cascara"
        },
        {
            icon: <Soja />,
            title: "Soja"
        },
        {
            icon: <Altramuces />,
            title: "Altramuces"
        },
        {
            icon: <Pescado />,
            title: "Pescado"
        },
    ]

    useEffect(() => {
        helpers.setValue( addAlergenos?.map((item) => item.title))
     }, [addAlergenos])

    const DataTitleAlergenos = addAlergenos.map((item) => item.title)


    return (
        <div className="flex flex-col mb-5 md:mb-10 space-y-1 relative">
            <label className="text-gray-500">Alérgenos</label>
            <label className="text-gray-500 text-sm">Indica si este plato tiene algun alérgeno</label>
            <div onClick={() => setOpenAlergenosModal(!openAlergenosModal)} className="cursor-pointer capitalize text-sm  border border-gray-300  transition w-full py-4 px-2 mt-1 rounded-lg focus:outline-none flex items-center justify-between " >
                <div className="grid grid-cols-9 gap-2 ">
                    {DataTitleAlergenos && DataTitleAlergenos?.map((item, idx) => {
                        return (
                            <div key={idx}>
                                {DataAlergenos.find((elem) => elem?.title === item)?.icon}
                            </div>
                        )
                    })}
                </div>
                <div className={` text-gray-600 transition ${openAlergenosModal && "rotate-180"} `}>
                    <ArrowDownIcon />
                </div>
            </div>
            <div className={`absolute -top-52 right-10  ${!openAlergenosModal ? "hidden" : ""}`}>
                <AlergenosModal DataAlergenos={DataAlergenos} openModal={openAlergenosModal} setOpenModal={setOpenAlergenosModal} setAddAlergenos={setAddAlergenos} addAlergenos={addAlergenos}  value={field.value} />
            </div>
        </div>
    )
}