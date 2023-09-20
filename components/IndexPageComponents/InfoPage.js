import { Swiper, SwiperSlide } from 'swiper/react';
import {  Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'

export const InfoPage = ({ DataArry }) => {
    return (
        <>
            <div className="bg-white  py-10  space-y-5 rounded-xl">
                <p className=" text-center px-5 md:px-0 ">Coordina desde tu <span className="text-rosa"> panel de gestión para empresas </span> tus publicaciones en Bodas de Hoy y tus eventos<br /> activos.</p>
                <div className="hidden md:block">
                    <div className=" grid grid-cols-3">
                        {
                            DataArry.map((item, idx) => {
                                return (
                                    <>
                                        <div key={idx} className="flex flex-col items-center space-y-2">
                                            <div className="h-44">
                                                <img src={item.img} alt={item.title} />
                                            </div>
                                            <p className="font-semibold">{item.title}</p>
                                            <div className="h-14">
                                                <p className="text-center">{item.texto}</p>
                                            </div>
                                            <button className="bg-rosa rounded-lg text-white py-1 px-7 shadow-lg ">
                                                {item.button}
                                            </button>
                                        </div>
                                    </>
                                )

                            })
                        }
                    </div>
                </div>
                <div className="md:hidden block">
                    
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            autoplay
                            modules={[ Autoplay]}
                        >
                            {
                                DataArry.map((item, idx) => {
                                    return (

                                        <SwiperSlide key={idx}>
                                            <div className="flex flex-col items-center space-y-2">
                                                <div className="h-44">
                                                    <img src={item.img} alt={item.title} />
                                                </div>
                                                <p className="font-semibold">{item.title}</p>
                                                <div className="h-14">
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