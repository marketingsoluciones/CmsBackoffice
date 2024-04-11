import React, { FC, useState } from 'react';
interface Dropdown2Props {
    items: any;
    title: any;
  }

const Dropdown2: FC <Dropdown2Props> = ({items, title}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="inline-flex justify-center w-full rounded-md border border-slate-200 shadow-sm px-4 py-2 bg-slate-50 text-sm font-medium text-gray-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rosa"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          {selectedOption || title}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-md shadow-lg z-10 bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="flex flex-col py-1" role="none">
          {items.map((items) => (
            <button
              onClick={() => handleOptionSelect(items.text)}
              className="inline-flex px-4 py-2 items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 "
              role="menuitem"
            >
                {items.icon}
                {items.text}
            </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown2;
