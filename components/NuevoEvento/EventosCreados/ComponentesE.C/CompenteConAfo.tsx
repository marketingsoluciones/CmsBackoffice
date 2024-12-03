import React, { useState } from 'react';

interface Zone {
  name: string;
  current: number;
  max: number;
  subZones?: SubZone[]; // Optional array of sub-zones
}

interface SubZone {
  name: string;
  available: number; // Available capacity for the sub-zone
}

interface CapacityControlProps {
  title: string;
  totalPeople: number;
  zones: Zone[];
}

const CapacityControl: React.FC<CapacityControlProps> = ({ title, totalPeople, zones }) => {
  const [expandedZones, setExpandedZones] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [entryCount, setEntryCount] = useState(0);
  const [exitCount, setExitCount] = useState(0);

  const toggleZone = (zoneName: string) => {
    setExpandedZones((prev) =>
      prev.includes(zoneName) ? prev.filter((z) => z !== zoneName) : [...prev, zoneName]
    );
  };

  const handleEntry = (count: number) => {
    if (selectedZone) {
      const newCurrent = Math.min(selectedZone.current + count, selectedZone.max);
      setSelectedZone({ ...selectedZone, current: newCurrent });
      setEntryCount(entryCount + count);
    }
  };

  const handleExit = (count: number) => {
    if (selectedZone) {
      const newCurrent = Math.max(selectedZone.current - count, 0);
      setSelectedZone({ ...selectedZone, current: newCurrent });
      setExitCount(exitCount + count);
    }
  };

  const closeModal = () => {
    setSelectedZone(null);
    setShowModal(false);
    setEntryCount(0);
    setExitCount(0);
  };

  return (
    <div className="self-stretch bg-gray-200 p-4 rounded">
      <div className="flex items-center justify-between px-2">
        <div className="flex flex-col items-start justify-start">
          <h2 className="text-xl font-bold">{title}</h2>
          <p>Han asistido {totalPeople} personas en total</p>
        </div>
        <div className="flex">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Configuración del aforo
          </button>
        </div>
      </div>
  
      {zones.map((zone) => (
        <div key={zone.name} className="zone bg-white p-2 rounded mb-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg">{zone.name}</h3>
            <button
              onClick={() => {
                toggleZone(zone.name);
                setSelectedZone(zone);
                setShowModal(true);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              {expandedZones.includes(zone.name) ? (
                <svg data-slot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"></path>
</svg>
              ) : (
                <svg data-slot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"></path>
</svg>
              )}
            </button>
          </div>
          <div className="flex justify-between">
            <p>{zone.current}/{zone.max}</p>
            <div className="progress h-2 rounded-full">
              <div
                className="progress-bar bg-blue-500 h-2 rounded-full"
                style={{ width: `${(zone.current / zone.max) * 100}%` }}
              />
            </div>
          </div>
          {expandedZones.includes(zone.name) && (
            <div>
              {zone.subZones?.map((subZone) => (
                <div key={subZone.name} className="sub-zone">
                  <p>{subZone.name}: {subZone.available} disponibles</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
  
  {showModal && (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Control de Acceso - {selectedZone?.name}
              </h3>
              <div className="mt-2">
                <p>Entradas: {entryCount}</p>
                <p>Salidas: {exitCount}</p>
                <div className="mt-4">
                  <label htmlFor="entry" className="block text-sm font-medium text-gray-700">
                    Entradas
                  </label>
                  <input
                    type="number"
                    id="entry"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={entryCount}
                    onChange={(e) => setEntryCount(Number(e.target.value))}
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="exit" className="block text-sm font-medium text-gray-700">
                    Salidas
                  </label>
                  <input
                    type="number"
                    id="exit"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={exitCount}
                    onChange={(e) => setExitCount(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            onClick={closeModal}
            className="self-stretch inline-block items-center justify-center rounded-md border border-transparent shadow-sm  bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={() => handleEntry(entryCount)}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-3 sm:w-auto sm:text-sm"
          >
            Registrar Entradas
          </button>
        </div>
      </div>
    </div>
  </div>
)}
  </div>
);
};

export default CapacityControl;