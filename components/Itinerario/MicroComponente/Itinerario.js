import { Anillos, Baile, Baile2, Brindis, Carro, Cena, Cocteles, Comida, Dividersvg, Fotografo, FuegosArtificiales, Iglesia, Maquillaje, Merienda, Novios, PlusIcon, Salida, SesionFotos, Sol, Torta, Vestido, Dress, Dots } from "../../Icons/index"
import { Form, Formik } from "formik";
import { SubHeader } from "./SubHeader";
import { AddEvent, Description, Duration, GuardarButtom, IconList, Responsable, ResponsableList, SelectIcon, Time, Tips } from ".";
import { Modal } from "../../modals/Modal";
import { useEffect, useState } from "react";
import { InputTime } from "../../formularios/Inputs/InputTime";
import { EventContextProvider } from "../../../context/EventContext";
import { Task } from "./Task"


export const Itinerario = ({ data }) => {
    const { event } = EventContextProvider()
    const newDate = new Date();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const options = {
        year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", timeZone
    };
    const date = newDate.toLocaleDateString(navigator?.languages, options)
    const itinerario = event?.itinerarios_array?.find(elem => elem.title === data?.title)
    if (itinerario?.tasks?.length == 0) {

    }




    return (
        <>
            <SubHeader date={date} title={data?.title} />
            <div className="w-full">
                {itinerario?.tasks?.map((elem, idx) => {
                    return (
                        <Task task={elem} key={idx} date={date} itinerario={itinerario} />
                    )
                })
                }
            </div>
            <AddEvent />
            <GuardarButtom />
        </>
    )
}


