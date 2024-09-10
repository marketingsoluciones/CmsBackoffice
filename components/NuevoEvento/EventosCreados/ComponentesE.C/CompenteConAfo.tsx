import React, { useState } from 'react';

interface Zone {
  name: string;
  current: number;
  max: number;
}

interface CapacityControlProps {
  title: string;
  totalPeople: number;
  zones: Zone[];
  
}

const CapacityControl: React.FC<CapacityControlProps> = ({ title, totalPeople, zones }) => {
  const [expandedZones, setExpandedZones] = useState<string[]>([]);

  const toggleZone = (zoneName: string) => {
    setExpandedZones((prev) =>
      prev.includes(zoneName) ? prev.filter((z) => z !== zoneName) : [...prev, zoneName]
    );
  };

  return (
    <div className="bg-gray-200 p-4 rounded">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>Han asistido {totalPeople} personas en total</p>
      <div className="flex justify-end">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Configuración del aforo
        </button>
      </div>
      <div className="mt-4">
        {zones.map((zone) => (
          <div key={zone.name} className="zone bg-white p-2 rounded mb-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg">{zone.name}</h3>
              <button
                onClick={() => toggleZone(zone.name)}
                className="text-gray-500 hover:text-gray-700"
              >
                {expandedZones.includes(zone.name) ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12H5.25m0 0H2.25M19.5 12v7.5m-7.5-7.5v7.5m0 0H2.25" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
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
              <div className="mt-2">
                {/* Aquí puedes agregar más detalles o información sobre la zona */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CapacityControl;