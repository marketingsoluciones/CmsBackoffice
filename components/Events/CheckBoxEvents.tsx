import React, { useState } from 'react';

interface Props {
  onChange?: (isChecked: boolean) => void;
  title:any;
}

export const CheckboxEvents:   
 React.FC<Props> = ({ title, onChange }) => {

  const [isChecked, setIsChecked] = useState(false);

  const handleButtonClick = () => {
    setIsChecked(!isChecked);
  };
  return (
<button
      onClick={handleButtonClick}
      className="flex flex-row items-center justify-center box-border pr-[17px] gap-[5px]"
    >
      <div className="flex items-center justify-center text-rosa">
      <input
      type="checkbox"
      checked={isChecked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"   

    />
    </div>
    <div className="flex flex-col items-center justify-center text-black font-normal">
    {title}
    </div>
      </button>
    
    

  );
};