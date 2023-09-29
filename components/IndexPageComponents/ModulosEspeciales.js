import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'

export const ModulosEspeciales = ({ DataModulos }) => {

    return (
        <>

            <div className="px-10 space-y-3">
                <p className="text-xl text-rosa ">Navega en los Módulos especiales</p>

                <div className='hidden md:block'>
                    <div className="grid grid-cols-4">
                        {
                            DataModulos.map((item, idx) => {
                                return (
                                        <div key={idx} className="flex  items-center justify-center  ">
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

                <div className='md:hidden block'>
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        autoplay
                        modules={[ Autoplay]}
                    >
                        {
                            DataModulos.map((item, idx) => {
                                return (
                                    <SwiperSlide  key={idx}>
                                            <div className="flex  items-center justify-center  ">
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