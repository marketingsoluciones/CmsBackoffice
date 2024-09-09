import React, { useState } from 'react';
import ClickAwayListener from "react-click-away-listener";

interface User {
  name: string;
  email: string;
  rrppLink: string;
  label: any;
  label2: any;
  label3: any;
  label4: any;
  avatar: any;
  
}

interface UserEditProps {
    user: User;
    addUsers:any;
    setAddUsers:any;


}

const UserEdit: React.FC<UserEditProps> = ({ user, addUsers, setAddUsers}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);

    const   
   handleChange = () => {
      setIsChecked(!isChecked);
    };
    const   
   handleChange2 = () => {
      setIsChecked2(!isChecked2);

    };
    const   
    handleChange3 = () => {
       setIsChecked3(!isChecked3);

     };
     const   
     handleChange4 = () => {
        setIsChecked4(!isChecked4);
      };




  return (
<ClickAwayListener onClickAway={() => addUsers && setAddUsers(false)}>
        <div className="flex flex-col items-start justify-start px-4 text-left gap-3 pt-4 ">
            <div className='self-stretch flex items-start justify-between'>
            <div className='flex items-start justify-start text-black font-semibold text-[18px] '>
                Editar Usuario
            </div>
            <button onClick={() => {setAddUsers(!addUsers)}} type="button" className="w-6 h-6 text-gray-400 hover:text-gray-500 focus:outline-none focus:shadow-outline-gray">
            <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"></path>
            </svg>
            </button>
            </div>

          
          <div className="flex items-start justify-start sm:flex sm:items-start">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <img className="h-10 w-10" src={user.avatar} alt="" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{user.name}</h3>
              <div className="mt-2">
                <p className="text-sm leading-5 text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-start justify-start mt-6">
            <div className="self-stretch w-full flex flex-col items-start justify-start gap-6">
              
              <div className="self-stretch w-full flex flex-col ">
                <label htmlFor="rrppLink" className="block text-sm font-medium text-gray-700">
                  Link de RRPP
                </label>
                <div className="self-stretch mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="rrppLink"
                    id="rrppLink"
                    value={user.rrppLink}
                    className="block w-full flex-1 rounded-none rounded-l-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="https://example.com"
                    disabled
                  />
                  <div className="flex -mr-px">
                  <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-r-md text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2h-6m-2-4h4m-4 0H6m6 4H4m6 6H4m0 0H6m6-6m-6 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <label htmlFor="groups" className="block text-sm font-medium text-gray-700">
                  Grupos
                </label>
                <div className='self-stretch w-full flex flex-col items-start justify-start gap-2'>
                <div className={`self-stretch flex items-center   
                p-4 rounded-md ${isChecked ? 'bg-rosa hover:bg-pink-100 text-white' : 'bg-pink-100 hover:bg-rosa text-gray-700'}`}>
        <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
        />
        <span className="ml-3">{user.label}</span>
                </div>

                <div className={`self-stretch flex items-center   
                p-4 rounded-md ${isChecked2 ? 'bg-rosa hover:bg-pink-100 text-white' : 'bg-pink-100 hover:bg-rosa text-gray-700'}`}>
        <input
        type="checkbox"
        checked={isChecked2}
        onChange={handleChange2}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <span className="ml-3">{user.label2}</span>
                </div>

                <div className={`self-stretch flex items-center   
                p-4 rounded-md ${isChecked3 ? 'bg-rosa hover:bg-pink-100 text-white' : 'bg-pink-100 hover:bg-rosa text-gray-700'}`}>
        <input
        type="checkbox"
        checked={isChecked3}
        onChange={handleChange3}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <span className="ml-3">{user.label3}</span>
                </div>
                <div className={`self-stretch flex items-center   
                p-4 rounded-md ${isChecked4 ? 'bg-rosa hover:bg-pink-100 text-white' : 'bg-pink-100 hover:bg-rosa text-gray-700'}`}>
        <input
        type="checkbox"
        checked={isChecked4}
        onChange={handleChange4}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <span className="ml-3">{user.label4}</span>
                </div>
                </div>
                <div className="mt-1">
                  <div className="flex items-center">

                  </div>
                  {/* Resto de los grupos */}
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch mt-6 flex justify-end">
            <button
             
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Borrar
            </button>
            <button
              
              className="ml-3 bg-rosa hover:bg-pink-500 text-white font-bold py-2 px-4 rounded"
            >
              Guardar
            </button>
          </div>
        </div>
    </ClickAwayListener>
  );
};

export default UserEdit;