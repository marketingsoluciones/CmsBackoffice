import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRouter } from "next/router"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

export const ModulosEspeciales = ({ DataModulos }) => {
    const router = useRouter()

    return (
        <>

            <div className="md:px-10 space-y-3">
                <p className="md:text-xl text-center md:text-left text-rosa text-[15.5px] ">Navega en los módulos especiales</p>

                <div className='hidden md:block'>
                    <div className="grid grid-cols-4">
                        {
                            DataModulos.map((item, idx) => {
                                return (
                                        <div key={idx} className="flex  items-center justify-center cursor-pointer text-azulCorporativo " onClick={()=> router.push(item.route)}>
                                            <div className="bg-white p-4 rounded-full mr-4 text-rosa">
                                                {item.icon}
                                            </div>
                                            {item.texto}
                                        </div>
                                )

                            })
                        }
                    </div>
                </div>

                <div className='md:hidden '>
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        autoplay
                        pagination={{ clickable: true }}
                        modules={[Navigation, Autoplay, Pagination]}
                    >
                        {
                            DataModulos.map((item, idx) => {
                                return (
                                    <SwiperSlide className=''  key={idx}>
                                            <div className="flex  items-center justify-center text-azulCorporativo  ">
                                                <div className="bg-white p-4 rounded-full mr-4 text-rosa">
                                                    {item.icon}
                                                </div>
                                                {item.texto}
                                            </div>
                                    </SwiperSlide>
                                )

                            })
                        }
                    </Swiper>

                </div>
            </div>
        </>
    )
}