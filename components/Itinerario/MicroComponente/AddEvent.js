export const AddEvent = ({addTask}) => {
    return (
        <div onClick={()=>addTask()} className="flex space-x-2 items-center justify-center mt-3 cursor-pointer hover:text-pink-600">
            <span>
                +
            </span>
            <span className="text-rosa hover:text-pink-600">
                Añadir actividad
            </span>
        </div>
    )
}