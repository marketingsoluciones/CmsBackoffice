import React, { FC, useState } from 'react';

interface Props {
  label: string;
}

const DateTimePicker1: FC<Props> = ({ label }) => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(new Date(event.target.value));
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(new Date(event.target.value));
  };

  return (
    <div className='flex flex-col items-start justify-start gap-2'>
      <label htmlFor={label} className='font-bold'>{label}</label>

      <div className="self-stretch flex">
        <input
          type="datetime-local"
          value={startTime ? startTime.toISOString() : ''}
          onChange={handleStartTimeChange}
          className="border border-gray-300 focus:border-rosa p-2 rounded-md"
        />
        <input
          type="datetime-local"
          value={endTime ? endTime.toISOString() : ''}
          onChange={handleEndTimeChange}
          className="border border-gray-300 focus:border-rosa p-2 rounded-md ml-2"
        />
      </div>
    </div>
  );
};

export default DateTimePicker1;