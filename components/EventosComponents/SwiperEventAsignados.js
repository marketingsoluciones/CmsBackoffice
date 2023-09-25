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

export const SwiperEventAsignados = () => {
    return (
        <>

            <div className="flex gap-2 justify-center md:w-[88%]">
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

            <div className="flex md:flex-row flex-col items-center  justify-center md:space-x-10">
                <div className="md:w-[10%]">
                    <p className=" hidden md:block text-xl font-semibold text-gray-600">Eventos<br /> Asignados</p>
                    <p className="  md:hidden text-xl font-semibold text-gray-600">Eventos Asignados</p>
                </div>
                <div className="md:w-[55%] w-full" >
                    <Swiper
                        spaceBetween={0}
                        /* slidesPerView={2} */
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
                        <SwiperSlide>
                            <CardCreateEvent />
                        </SwiperSlide>
                        <SwiperSlide>
                            <CardCreateEvent />
                        </SwiperSlide>
                        <SwiperSlide>
                            <CardComponent />
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

        </>
    )
}