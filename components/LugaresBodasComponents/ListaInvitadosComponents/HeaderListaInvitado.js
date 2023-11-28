import { EventContextProvider } from "../../../context/EventContext"
export const HeaderListaInvitado = () => {
    const {event} = EventContextProvider()
    return(
        <div className="flex justify-between bg-white px-4 py-4 rounded-lg shadow-lg mb-5">
                <div>
                    <p>Lista de invitados</p>
                </div>

                <div>
                    <p>{event.nombre}</p>
                </div>
           </div>
    )
}