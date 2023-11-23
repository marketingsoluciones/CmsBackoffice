import CardComponent from "./CardComponent"
import CardCreateEvent from "./CardCreateEvent"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'
import 'swiper/css/pagination';
import { EventsGroupContextProvider } from "../../context/EventsGroupContext";
import { EventContextProvider } from "../../context/EventContext";
import { useState } from "react";
import { useEffect } from "react";


export const Lista = [
    { nombre: "Pendientes", value: "pendiente", color: "gray-300" },
    { nombre: "Archivados", value: "archivado", color: "gray-300" },
    { nombre: "Realizados", value: "realizado", color: "gray-300" },
];

export const SwiperEventCreados = ({ setOpenModal, openModal }) => {
    const { eventsGroup } = EventsGroupContextProvider();
    const { idxGroupEvent, setIdxGroupEvent } = EventContextProvider()
    const [isActiveStateSwiper, setIsActiveStateSwiper] = useState(idxGroupEvent?.isActiveStateSwiper)
    const [tabsGroup, setTabsGroup] = useState([]);

    useEffect(() => {
        if (eventsGroup) {
            const arrNuevo = eventsGroup?.reduce((acc, event) => {
                acc[event.estatus.toLowerCase()].push(event)
                return acc;
            },
                { pendiente: [], archivado: [], realizado: [] }
            );

            const countEmptys = (arr) => {
                if (arr.length < 3) {
                    const NewArr = [];
                    for (let i = 0; i < Math.abs(arr?.length - 3); i++) NewArr.push(i);
                    return NewArr;
                }
                return [];
            };

            const result = Object.entries(arrNuevo).map((eventos) => {
                return ({
                    status: eventos[0],
                    data: eventos[1]?.sort((a, b) => { return b.fecha_creacion - a.fecha_creacion }),
                    vacio: countEmptys(eventos[1]),
                })
            });

            setTabsGroup(result);
        }
    }, [eventsGroup, idxGroupEvent]);

    const idxNew = tabsGroup[isActiveStateSwiper]?.data.findIndex(elem => elem._id == idxGroupEvent.event_id)

    useEffect(() => {
        if (idxNew > -1) {
            setTimeout(() => {
                setIdxGroupEvent((old) => {
                    return { ...old, idx: idxNew }
                })
            }, 10);
        }
    }, [idxNew])


    return (
        <div className=" ">
            <p className="uppercase font-semibold text-gray-500">Eventos creados</p>
            <div className="flex md:gap-2 justify-center mb-3">
                {Lista.map((item, idx) => (
                    <button
                        onClick={(e) => setIsActiveStateSwiper(idx)}
                        key={idx}
                        className={`${isActiveStateSwiper == idx
                            ? `bg-${item.color} text-white`
                            : "bg-white text-gray-500"
                            } w-max px-4 py-0.5 rounded-xl flex items-center justify-center cursor-pointer hover:bg-${item.color
                            } hover:text-gray-500 transition focus:outline-none text-sm font-display`}
                    >
                        {item.nombre}
                    </button>
                ))}
            </div>

            <div className=" h-max  ">
                {
                    tabsGroup.map((group, idx) => {
                        return (
                            <div key={idx} >
                                {isActiveStateSwiper == idx ? (
                                    <>
                                        <Swiper
                                            initialSlide={idxNew < 0 ? idxGroupEvent?.idx - 2 : idxNew - 2}
                                            pagination={{ clickable: true }}
                                            modules={[Navigation, Autoplay, Pagination]}
                                            breakpoints={{
                                                0: {
                                                    slidesPerView: 1,
                                                    spaceBetween: 10,
                                                },
                                                768: {
                                                    slidesPerView: 3,
                                                },
                                            }}
                                            id={group?.status}
                                            className={` h-50  ${isActiveStateSwiper == idx ? "" : "hidden"}`}
                                        >
                                            {
                                                group?.data?.map((evento, idx) => (
                                                    <SwiperSlide
                                                        key={idx}
                                                        className="flex items-center justify-center pl-8"
                                                        onClick={() => { setIdxGroupEvent({ idx, isActiveStateSwiper, event_id: evento._id }) }}
                                                    >
                                                        <CardComponent data={group?.data} grupoStatus={group?.status} idx={idx} />
                                                    </SwiperSlide>
                                                ))
                                            }
                                            {group.status !== "pendiente" ? group.data?.length === 0 &&
                                                <SwiperSlide
                                                    className={`flex items-center justify-center`}
                                                >
                                                    <div className={`w-72 h-36 rounded-xl flex flex-col items-center justify-center shadow-lg bg-base border border-gray-100 transition `}>
                                                        <p className="font-display font-base text-md">{`Ningún evento ${group.status}`}</p>
                                                    </div>
                                                </SwiperSlide> :
                                                <SwiperSlide
                                                    className={`flex items-center justify-center pl-8`}
                                                >
                                                    <CardCreateEvent setOpenModal={setOpenModal} openModal={openModal} />
                                                </SwiperSlide>
                                            }
                                        </Swiper>
                                    </>
                                ) : null}
                            </div>
                        )
                    })
                }

                {/* <div className="">
                    <p className="hidden md:block text-xl font-semibold text-gray-600">Eventos<br /> Creados</p>
                    <p className=" md:hidden text-xl font-semibold text-gray-600">Eventos Creados</p>
                </div>

                <div className="w-[50%] " >
                    <Swiper
                        spaceBetween={10}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 0,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 0,
                            },
                        }}
                        autoplay
                        pagination={{ clickable: true }}
                        modules={[Navigation, Autoplay, Pagination]}
                    >
                        <SwiperSlide >
                            
                        </SwiperSlide>
                        <SwiperSlide>
                            <CardComponent />
                        </SwiperSlide>
                        <SwiperSlide>
                            <CardComponent />
                        </SwiperSlide>
                    </Swiper>
                </div> */}
            </div>
        </div>
    )
}