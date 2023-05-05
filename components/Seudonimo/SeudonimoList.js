export const SeudonimoList = ({ list, listDown, setListDown }) => {
    return (
        <>
            <div className="bg-white rounded-xl p-3 space-y-0.5 w-[200px]  shadow-xl">
                {list.map(list => (
                    <div
                        onClick={()=>setListDown(!listDown)}                    
                        className="flex  items-center gap-3 cursor-pointer hover:bg-gray-300 rounded-xl p-2  ">
                        <div >
                            {list.icon}
                        </div>
                        <span 
                        className="text-sm truncate"
                        > {list.nombre}</span>
                    </div>
                ))}
            </div>
        </>
    )
}