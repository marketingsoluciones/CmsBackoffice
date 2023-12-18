import React from "react";
import { CochinoIcon, DineroIcon } from "../Icons/index";
import { Swiper, SwiperSlide } from "swiper/react";
import router from "next/router";
import { getCurrency } from "../WeddingPlannerComponents/PresupuestoComponents/Funciones";
import { EventContextProvider } from "../../context/EventContext";


const BlockPresupuesto = () => {
  const { event } = EventContextProvider();
  const ListaBlock = [
    { icon: <CochinoIcon className="text-gray-500" />, amount: getCurrency(event?.presupuesto_objeto?.coste_estimado), subtitle: "estimado" },
    { icon: <DineroIcon className="text-gray-500" />, amount: getCurrency(event?.presupuesto_objeto?.coste_final), subtitle: "gastado" },
  ];

  const settings = {
    spaceBetween: 50,
    loop: true,
    breakpoints: {
      "0": {
        slidesPerView: 1,
        spaceBetween: 25,
      },
      "768": {
        slidesPerView: 3,
        spaceBetween: 25,
        allowTouchMove: false,
      }
    }
  };
  return (
    <div className="w-[50%] md:w-1/3 box-border">
      <h2 className="font-display text-xl font-semibold text-gray-500 pb-2 text-left">
        Presupuesto
      </h2>

      <div className="w-full shadow rounded-xl bg-white py-4 flex flex-col gap-4 h-48 items-center justify-center">
        <Swiper
          //spaceBetween={50}
          {...settings}
          className="md:w-full w-24"
        >
          {ListaBlock.map((item, idx) => (
            <SwiperSlide key={idx} className="mx-auto inset-x-0 w-max flex flex-col justify-center items-center  ">

                <span className="py-1">
                  {item.icon}
                </span>
                <p className="font-display font-semibold text-lg text-gray-700 leading-6">
                  {item.amount}
                </p>
                <p className="font-display font-base text-xs text-gray-500">
                  {item.subtitle}
                </p>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* <button  onClick={() => router.push("/presupuesto")} className="focus:outline-none rounded-lg border border-rosa px-2 mx-auto inset-x-0 font-display text-rosa text-sm py-1 hover:text-white hover:bg-rosa transition">
          Añadir gastos
        </button> */}
      </div>
    </div>
  );
};

export default BlockPresupuesto;
