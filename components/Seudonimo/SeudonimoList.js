export const SeudonimoList = ({ list, listDown, setListDown }) => {
    return (
        <>
            <div className="bg-white rounded-xl p-3 space-y-1 ">
                {list.map(list => (
                    <div
                        onClick={()=>setListDown(!listDown)}                    
                        className="flex  items-center gap-3 cursor-pointer hover:bg-gray-300 rounded-xl p-2  ">
                        <div >
                            {list.icon}
                        </div>
                        <span>{list.nombre}</span>
                    </div>
                ))}
            </div>
        </>
    )
}