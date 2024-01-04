export const GananciasCard = () => {
    return (
        <>
            <div className=" w-[40%] bg-white rounded-lg p-3 shadow-lg">
                <div className="text-[13px]">
                    <span> Ganancias proyectadas para <button className="text-rosa border-b border-rosa  " > este mes ! </button></span>
                </div>
                <div>
                    <span className="text-rosa text-[30px]">
                        $ 0.00
                        <span className="text-[20px] ml-1">USD</span>
                    </span>
                </div>
                <div>
                    <span className=" text-[13px] ">
                        Total de recompensas pendientes de aprobación y aprobadas y pendientes de dic 2023.
                    </span>
                </div>
            </div>

        </>
    )
}