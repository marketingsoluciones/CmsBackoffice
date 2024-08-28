import React from 'react';

interface Evento {
  img: string;
  title: string;
}

const EventosComponent: React.FC<{ DataEventos: Evento[] }> = ({ DataEventos }) => {
    

    return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {DataEventos.map((item, idx) => (
        <div key={idx} className="relative w-[120px] h-[120px] sm:w-[180px] sm:h-[180px]">
          <img
            className="absolute top-0 left-0 w-full h-full object-cover"
            alt=""
            src={item.img}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-center">
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventosComponent;
