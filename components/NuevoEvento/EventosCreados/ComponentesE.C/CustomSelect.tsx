import React from 'react';
import { useRouter } from 'next/router';

interface PropsCustomSelect {
  title: string;
  url: any; // Cambia el tipo de dato según lo que esperas recibir
}

const CustomSelect: React.FC<PropsCustomSelect> = ({ title, url }) => {
  const router = useRouter();

  const handleOptionSelect = (selectedOption: string) => {
    if (selectedOption === 'opcion1') {
      router.push(url.component); // Cambia '/Comision2' por la ruta real de tu otra página
    } else if (selectedOption === 'opcion2') {
      router.push(url.component); // Cambia '/ListasRecepcion' por la ruta real de tu otra página
    }
    // Agrega más condiciones para otras opciones si es necesario
  };

  return (
    <div className="relative">
      <select
        className="select-text w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring focus:border-blue-300"
        onChange={(e) => handleOptionSelect(e.target.value)}
        defaultValue="title" // Establece la opción predeterminada
      >
        <option value="" disabled>
           {/* Muestra el título predeterminado */}
        </option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        {/* Agrega más opciones aquí */}
      </select>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {/* Agrega un icono aquí (por ejemplo, un ícono de flecha hacia abajo) */}
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {/* Define el icono aquí */}
        </svg>
      </div>
    </div>
  );
};

export default CustomSelect;