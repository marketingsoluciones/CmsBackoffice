import React, { useState } from 'react';
import ClickAwayListener from "react-click-away-listener";

interface AddUserModalProps {
  addUsers:any;
  setAddUsers:any;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ addUsers, setAddUsers }) => {
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('Inglés');

  const handleEmailChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newEmails = event.target.value.split('\n').map((email) => email.trim());
    setInviteEmails(newEmails);
  };

  const handleSubmit = () => {
    // Aquí implementarías la lógica para enviar las invitaciones
    console.log('Enviar invitaciones:', inviteEmails);
    
  };

  return (
    <ClickAwayListener onClickAway={() => addUsers && setAddUsers(false)}>
    <div className="flex flex-col items-start justify-start z-50 py-2 gap-2">
    
    <div className='self-stretch flex items-center justify-between'>
    <div className="text-xl font-bold ">Añadir usuarios</div>
        <button onClick={() => {setAddUsers(!addUsers)}} className="text-gray-500 hover:text-gray-700" >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12" />
          </svg>
        </button>
    </div>



    <div className='flerx flex-col items-start justify-start font-medium text-sm text-gray-600'>
    <p>Hay <span className='font-bold'>dos formas</span> de añadir usuarios:</p>
        <ul>
          <li className='font-bold'>Solicitud enviada por el usuario</li>
          <li className='font-bold'>Invitación enviada por la empresa</li>
        </ul>
    </div>

        <div className="mb-4">
          <label htmlFor="inviteLink" className="block text-sm font-medium text-gray-700">
            Solicitud
          </label>
          <div className="self-stretch mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="rrppLink"
                    id="rrppLink"
                    value={"https://eventosorganizador.com/divas-divinas"}
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
                <div className='flerx flex-col items-start justify-start font-normal text-xs text-gray-600'>
    <p>Comparte este enlace con los usuarios para que accedan directamente a la pantalla de envío de solicitud</p>

    </div>

        </div>

        <div className="self-stretch mb-4">
          <label htmlFor="inviteEmails" className="block text-sm font-medium text-gray-700">
            Invitación
          </label>
          <p className="text-sm text-gray-500">Se enviará una invitación a cada correo electrónico.</p>
          <textarea 
          id="inviteEmails" 
          placeholder="Escribe aquí... Cada línea es un e-mail (e-mail][ESPACIO][Nombre y apellidos]"
          rows="4" 
          className="shadow-sm focus:ring-pink-500 focus:border-pink-500 mt-1 block w-full sm:text-sm border-[1px] border-gray-300 rounded-md" 
          value={inviteEmails.join('/n')} 
          
          onChange={handleEmailChange} />
        </div>
        <div className="mb-4">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
          Selecciona idioma
          </label>
          <select id="language" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"   
 value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="Inglés">Inglés</option>
            <option value="Español">Español</option>
            {/* Agrega más opciones de idioma según sea necesario */}
          </select>
        </div>
        <button onClick={handleSubmit} className="bg-rosa hover:bg-pink-500 text-white font-bold py-2 px-4 rounded">
          Enviar invitaciones
        </button>
      </div>
    </ClickAwayListener>
  );
};

export default AddUserModal;