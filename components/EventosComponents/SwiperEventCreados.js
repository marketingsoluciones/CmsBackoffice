import CardComponent from "./CardComponent"
import CardCreateEvent from "./CardCreateEvent"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'
import 'swiper/css/pagination';

export const Lista = [
    { nombre: "Pendientes", value: "pendiente", color: "tertiary" },
    { nombre: "Archivados", value: "archivado", color: "gray-300" },
    { nombre: "Realizados", value: "realizado", color: "secondary" },
];

export const SwiperEventCreados = () => {
    return (
        <div className=" ">

            <div className="flex md:gap-2 justify-center">
                {Lista.map((item, idx) => (
                    <button
                        /*  onClick={(e) => setIsActiveStateSwiper(idx)} */
                        key={idx}
                        className={` w-max px-4 py-0.5 rounded-xl flex items-center justify-center cursor-pointer  hover:text-gray-500 transition focus:outline-none text-sm font-display`}
                    >
                        {item.nombre}
                    </button>
                ))}
            </div>

            <div className=" flex items-center justify-center w-full space-x-10  ">
                
                <div className="">
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
                            <CardCreateEvent />
                        </SwiperSlide>
                        <SwiperSlide>
                            <CardComponent />
                        </SwiperSlide>
                        <SwiperSlide>
                            <CardComponent />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}