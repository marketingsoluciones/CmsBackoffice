export const ResponsableList = ({ openModal, setOpenModal, DataArry }) => {
    return (
        <>
            <div className="flex flex-col items-center space-y-2 w-max*" >
                <span className="text-rosa text-[20px]">Responsable </span>
                {
                    DataArry.map((item, idx) => {
                        return (
                            <div key={idx} className="grid grid-cols-3 justify-items-center* items-center *space-x-2 cursor-pointer hover:bg-slate-200 p-1 rounded-lg" >

                                <div className="col-span-1">
                                    <img src={item.icon} className="h-10 " />
                                </div>

                                <span className="col-span-2  w-28">{item.title}</span>
                            </div>
                        )
                    })
                }
                <button className="bg-rosa py-1 px-2 text-white rounded-lg text-" onClick={() => setOpenModal(!openModal)}>
                    cerrar
                </button>
            </div>
        </>
    )
}