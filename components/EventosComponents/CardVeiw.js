import { SwiperEventCreados } from "./SwiperEventCreados";
import { SwiperEventAsignados } from "./SwiperEventAsignados";
import { CardVeiwIcon, TableVeiwIcon } from "../Icons/index";
import { OptionsButtons } from "./OptionsButtons";
import { useState } from "react";

export const CardVeiw = () => {
    const [optionSelect, setOptionSelect] = useState(0)

    const optionsArry = [
        {
            icon: <CardVeiwIcon />,
            component: "",
            state: false
        },
        {
            icon: <TableVeiwIcon />,
            component: "",
            state: false
        }
    ]

    const handleClickOption = (idx) => {
        setOptionSelect(idx);
    };


    return (
        <>
            <div className="space-y-4">
                <p className="ml-4 text-sm">Controla los eventos creados o asignados por otros organizadores</p>
                <div className="bg-white space-y-5 rounded-xl flex flex-col py-2 px-4 ">

                    {/* botones en la cabecera del componente */}

                    <div className="flex  justify-between">
                        <div>
                            <button className="bg-rosa rounded-lg px-4 py-1 text-white">
                                Crear evento
                            </button>
                        </div>
                        <div className="flex space-x-3">
                            <OptionsButtons
                                optionsArry={optionsArry}
                                optionSelect={optionSelect}
                                onClick={handleClickOption}
                            />
                        </div>
                    </div>

                    {/* cuarpo con el Swiper */}

                    <div className="md:w-[90%] space-y-4 md:space-y-1 ">

                        <SwiperEventCreados />
                        <SwiperEventAsignados />
                    </div>

                </div>
            </div>
        </>
    )
}