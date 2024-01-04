export const FondosCard = () => {
    return (
        <div className="grid grid-cols-4 w-[40%] bg-white rounded-lg p-3 shadow-lg">
            <div className="flex flex-col justify-center items-center col-span-2 ">
                <span className="text-[12px] font-semibold">
                    Fondos Disponibles
                </span>
                <span className="text-rosa text-[30px]">
                    $ 0.00
                    <span className="text-[20px] ml-1">USD</span>
                </span>
            </div>
            <div className="flex flex-col space-y-2 col-span-2 justify-center">
                <span className="text-[13px]">
                    Seleccione entre depósito directo, PayPal o wallet
                </span>
                <button className="bg-rosa text-white rounded-lg text-base px-2 py-1">
                    Retiradas de fondos
                </button>
            </div>
        </div>
    )
}