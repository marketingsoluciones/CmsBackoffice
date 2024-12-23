import { SwiperEventCreados } from "./SwiperEventCreados";
import { SwiperEventAsignados } from "./SwiperEventAsignados";
import { CardVeiwIcon, SearchIcon, TableVeiwIcon } from "../Icons/index";
import { OptionsButtons } from "./OptionsButtons";
import { useState } from "react";
import { OnlyViewTable } from "../OnlyViewTable";
import { AuthContextProvider } from "../../context/AuthContext";
import GlobalFilter from "../Datatable/GlobalFilter";

export const CardVeiw = ({ setOpenModal, openModal, viewResumen, setViewResumen }) => {
    const [optionSelect, setOptionSelect] = useState(0)
    const [global, setGlobal] = useState()
    const [seteador, setSeteador] = useState(() => () => { })


    const optionsArry = [
        {
            icon: <CardVeiwIcon />,
            component: <ViewCard setOpenModal={setOpenModal} openModal={openModal} viewResumen={viewResumen} setViewResumen={setViewResumen} />,
            state: false
        },
        {
            icon: <TableVeiwIcon />,
            component: <Viewtable setSeteador={setSeteador} />,
            state: false
        }
    ]

    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };


    return (
        <>
            <div className="space-y-4 w-full h-[100vh] ">

                <p className=" text-sm bg-white p-2 rounded-lg text-gray-500">Controla los eventos creados o asignados por otros organizadores</p>

                <div className="relative">
                    <button onClick={() => setOpenModal(!openModal)} className="bg-rosa rounded-lg px-4 py-1 text-white text-base">
                        Crear evento
                    </button>

                    <div className=" absolute h-8  rounded-md px-2 flex items-center  border-gray-400 border-2  bottom-0 right-0 w-1/3 ">
                        <SearchIcon />
                        <GlobalFilter
                            globalFilter={global}
                            setGlobalFilter={seteador}
                        />
                    </div>
                </div>

                <div className={`bg-white space-y-5 rounded-xl  py-2 md:px-4 ${optionSelect == 0 ? "h-[calc(100%-350px)]" : "h-max"} overflow-auto  `}>

                    {/* botones en la cabecera del componente */}

                    <div className=" flex justify-end mt-2 space-x-3">
                        <OptionsButtons
                            optionsArry={optionsArry}
                            optionSelect={optionSelect}
                            onClick={handleClickOption}
                        />
                    </div>

                    {/* cuarpo de los componentes Swiper and table */}

                    <div className={`${optionSelect == 0 ? "w-[75%]*" : "w-full"}`}>
                        {optionsArry[optionSelect]?.component}
                    </div>

                </div>
            </div>
        </>
    )
}

export const ViewCard = ({ setOpenModal, openModal, viewResumen, setViewResumen }) => {
    return (
        <div>
            <SwiperEventCreados setOpenModal={setOpenModal} openModal={openModal} viewResumen={viewResumen} setViewResumen={setViewResumen} />
            {/* <SwiperEventAsignados /> */}
        </div>
    )
}

export const Viewtable = ({ setSeteador }) => {
    const { state, dispatch } = AuthContextProvider()

    return (
        <>
            <OnlyViewTable slug={"business"} dispatch={dispatch} setbuscador={setSeteador} />
        </>
    )
}