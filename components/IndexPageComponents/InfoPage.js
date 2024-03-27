import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRouter } from 'next/router';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';


export const InfoPage = ({ DataArry }) => {
    const router = useRouter()
    return (
        <>
            <div className="bg-white py-10 space-y-5 rounded-xl ">
                <p className=" text-center px-5 md:px-0 text-azulCorporativo  ">Coordina desde tu <span className="text-rosa"> panel de gestión para empresas </span> tus publicaciones en Bodas de Hoy y tus eventos<br /> activos.</p>
                <div className="hidden md:block">
                    <div className=" grid grid-cols-3">
                        {
                            DataArry.map((item, idx) => {
                                return (
                                    <div key={idx} className="flex flex-col items-center space-y-2">
                                        <div className="h-44">
                                            <img src={item.img} alt={item.title} />
                                        </div>
                                        <p className="font-semibold text-azulCorporativo">{item.title}</p>
                                        <div className="h-13 w-[80%]">
                                            <p className="text-center text-[13px] text-azulCorporativo ">{item.texto}</p>
                                        </div>
                                        <button onClick={() => router.push(item.route)} className="bg-rosa rounded-lg text-white py-1 px-7 shadow-lg text-base " >
                                            {item.button}
                                        </button>
                                    </div>
                                )

                            })
                        }
                    </div>
                </div>
                <div className="md:hidden  ">
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        autoplay
                        pagination={{ clickable: true }}
                        modules={[Autoplay, Navigation, Pagination]}
                    >
                        {
                            DataArry.map((item, idx) => {
                                return (

                                    <SwiperSlide className='' key={idx}>
                                        <div className="flex flex-col items-center space-y-4 ">
                                            <div className="h-44">
                                                <img src={item.img} alt={item.title} />
                                            </div>
                                            <p className="font-semibold">{item.title}</p>
                                            <div className="h-15">
                                                <p className="text-center">{item.texto}</p>
                                            </div>
                                            <button className="bg-rosa rounded-lg text-white py-1 px-7 shadow-lg ">
                                                {item.button}
                                            </button>
                                        </div>
                                    </SwiperSlide >
                                )

                            })
                        }
                    </Swiper>
                </div>
            </div >

        </>
    )
}