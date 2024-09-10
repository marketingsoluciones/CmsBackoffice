import React from 'react';

interface ProgressIndicatorProps {
  title: string;
  value: number;
  maxValue: number;
  currency: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  title,
  value,
  maxValue,
  currency,
}) => {
  const progressPercentage = (value / maxValue) * 100;

  return (
    <div className="w-[250px] flex flex-col bg-gray-200 rounded-md p-4 gap-2">
    
    <div className='flex flex-col items-start justify-start gap-2'>
      <h2 className="text-lg font-semibold">{title}</h2>
      <span className="ml-2 text-sm font-normal">{value}/{maxValue}</span>
    </div>
    <div className='flex items-start justify-normal border-[1px] border-white '/>

    <div className="flex flex-col items-center justify-start">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-rosa h-2 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="w-full flex flex-row items-start justify-between ml-2 text-sm">
        <div className='flex items-start justify-start '>
            {currency}
            </div>
            <div className='flex items-start justify-start font-normal'>
            {value}/{maxValue} 
            </div>

        </div>
    </div>

    </div>
  );
};

export default ProgressIndicator;