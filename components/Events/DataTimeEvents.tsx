import React, { FC, useState } from 'react';

interface Props {
  label: string;
}

const DateTimePicker1: FC<Props> = ({ label }) => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  // Helper para convertir Date a formato datetime-local (yyyy-MM-ddTHH:mm)
  const formatDateTimeLocal = (date: Date | null): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setStartTime(value ? new Date(value) : null);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEndTime(value ? new Date(value) : null);
  };

  return (
    <div className='flex flex-col items-start justify-start gap-2'>
      <label htmlFor={label} className='font-bold'>{label}</label>

      <div className="self-stretch flex">
        <input
          type="datetime-local"
          value={formatDateTimeLocal(startTime)}
          onChange={handleStartTimeChange}
          className="border border-gray-300 focus:border-rosa p-2 rounded-md"
        />
        <input
          type="datetime-local"
          value={formatDateTimeLocal(endTime)}
          onChange={handleEndTimeChange}
          className="border border-gray-300 focus:border-rosa p-2 rounded-md ml-2"
        />
      </div>
    </div>
  );
};

export default DateTimePicker1;