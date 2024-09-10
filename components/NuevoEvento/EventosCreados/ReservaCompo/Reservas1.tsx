import React, { useState } from 'react';

interface Table {
  id: any;
  capacity: number;
  isAvailable: boolean;
}

interface Event {
  id: number;
  name: string;
  date: string;
  tables: Table[];
}

const eventsData: Event[] = [
  // Reemplaza con tus datos de eventos reales
  {
    id: 1,
    name: 'Zona 1',
    date: '2024-11-29',
    tables: [
      { id: "Box 1", capacity: 20, isAvailable: true },
      { id: "Box 2", capacity: 40, isAvailable: false },
      { id: "Box 3", capacity: 20, isAvailable: true },
      { id: "Box 4", capacity: 40, isAvailable: false },
      { id: "Box 5", capacity: 20, isAvailable: true },
      { id: "Box 6", capacity: 40, isAvailable: false },
      // ... más mesas
    ],
  },
  {
    id: 2,
    name: 'Zona 2',
    date: '2024-11-29',
    tables: [
      { id: "Box 1", capacity: 20, isAvailable: true },
      { id: "Box 2", capacity: 40, isAvailable: false },
      { id: "Box 3", capacity: 20, isAvailable: true },
      { id: "Box 4", capacity: 40, isAvailable: false },
      { id: "Box 5", capacity: 20, isAvailable: true },
      { id: "Box 6", capacity: 40, isAvailable: false },
      // ... más mesas
    ],
  },
  {
    id: 2,
    name: 'Zona 3',
    date: '2024-11-29',
    tables: [
      { id: "Box 1", capacity: 20, isAvailable: true },
      { id: "Box 2", capacity: 40, isAvailable: false },
      { id: "Box 3", capacity: 20, isAvailable: true },
      { id: "Box 4", capacity: 40, isAvailable: false },
      { id: "Box 5", capacity: 20, isAvailable: true },
      { id: "Box 6", capacity: 40, isAvailable: false },
      // ... más mesas
    ],
  },
];

function ReservationSystem() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [reservationData, setReservationData] = useState({
    name: '',
    email: '',
    guests: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservationName, setReservationName] = useState('');
  const [reservationGuests, setReservationGuests] = useState(0);

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setSelectedTable(null);
    setReservationData({ name: '', email: '', guests: 0 });
  };

  const handleTableSelect = (tableId: number) => {
    setSelectedTable(tableId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReservationName('');
    setReservationGuests(0);
  };

  const handleReservation = () => {
    // Lógica para enviar la reserva al backend (implementar)
    console.log('Reservando mesa:', selectedTable, reservationName, reservationGuests);
    const updatedTables = selectedEvent?.tables.map((table) => {
      if (table.id === selectedTable) {
        return {
          ...table,
          isAvailable: false,
          reservation: {
            name: reservationName,
            guests: reservationGuests,
          },
        };
      }
      return table;
    });
    setSelectedEvent({
      ...selectedEvent,
      tables: updatedTables,
    });
    handleCloseModal();
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-800">Reserva tu Zona</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-rosa text-white rounded-md hover:bg-pink-500 focus:outline-none">Buscar Zona</button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none">Ver zonas disponibles</button>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="event" className="block text-sm font-medium text-gray-700 mb-1">Selecciona una Zona</label>
        <select id="event" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500" onChange={(e) => setSelectedEvent(JSON.parse(e.target.value))}>
          {eventsData.map((event) => (
            <option key={event.id} value={JSON.stringify(event)}>{event.name} {/* - {event.date} */}</option>
          ))}
        </select>
      </div>

      {selectedEvent && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">{selectedEvent.name} - {selectedEvent.date}</h3>
          <div className="grid grid-cols-2 gap-4">
            {selectedEvent.tables.map((table) => (
              <div key={table.id} className={`p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 ${table.isAvailable ? 'bg-white' : 'bg-gray-200 text-gray-500'}`} onClick={() => handleTableSelect(table.id)}>
                <div className="text-center font-medium">{table.id}</div>
                <div className="text-center">{table.capacity}</div>
              </div>
            ))}
          </div>

          {selectedTable && (
        <div>
          {/* Modal de reserva */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">

              <div className="bg-white p-6 rounded-md shadow-md">
                <h3 className="text-lg font-medium mb-4">Datos de la Reserva</h3>
                <div className="mb-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre y Apellido</label>
                  <input type="text" id="name" className="mt-1 block w-full px-3 py-2 bg-white shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md" required value={reservationName} onChange={(e) => setReservationName(e.target.value)} />
                </div>
                <div className="mb-2">
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Número de invitados</label>
                  <input type="number" id="guests" className="mt-1 block w-full px-3 py-2 bg-white shadow-sm border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md" required value={reservationGuests} onChange={(e) => setReservationGuests(Number(e.target.value))} />
                </div>
                <button onClick={handleReservation} className="px-4 py-2 bg-rosa text-white rounded-md hover:bg-pink-500 focus:outline-none">Reservar</button>
              </div>
            </div>
          )}
        </div>
      )}
        </div>
      )}


    </div>
  );
}

export default ReservationSystem;
