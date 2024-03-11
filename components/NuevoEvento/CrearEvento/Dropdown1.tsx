// Dropdown.tsx

import React, { useState, useEffect, useRef } from "react";

interface DropdownProps {
  items: any;
}

const Dropdown: React.FC<DropdownProps> = ({ items }) => {
  const activatorRef = useRef<HTMLButtonElement>(null);
  const dropdownListRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectOption, setSelectOption] = useState("+18");

  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  const keyHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" && isOpen) {
      setIsOpen(false);
    }
  };

  const clickOutsideHandler = (event: MouseEvent) => {
    if (dropdownListRef.current) {
      if (
        dropdownListRef.current.contains(event.target as Node) ||
        activatorRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      dropdownListRef.current?.querySelector("a")?.focus();
      document.addEventListener("mousedown", clickOutsideHandler);
    } else {
      document.removeEventListener("mousedown", clickOutsideHandler);
    }
  }, [isOpen]);

  return (
    <div className="w-full relative text-left">
      <button
        className="w-full justify-between flex px-4 py-2 rounded-md border border-slate-100 bg-slate-100 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        aria-haspopup="true"
        aria-controls={selectOption}
        onClick={clickHandler}
        ref={activatorRef}
      >
        <div className="">
        {selectOption}{" "}
        </div>
        <div className="">
        { !isOpen ? (
          <svg
            className="w-4 h-4 inline-block ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 inline-block ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        )}
        </div>
      </button>
      <ul
        ref={dropdownListRef}
        className={`${
          isOpen ? "block" : "hidden"
        } absolute z-10 mt-2 w-40 bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg`}
      >
        {items.map((item, index) => (
          <option onClick={
            () => {
              setSelectOption(item.option)
            }
          } className="px-4 py-2 hover:bg-gray-100 text-sm" key={index}>           
              {item.option}
          </option>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
