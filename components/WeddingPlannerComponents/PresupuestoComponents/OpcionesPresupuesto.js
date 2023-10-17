export const OpcionesPresupuesto = ({active, setActive}) => {
    return (
        <div className="pt-2 flex justify-between justify-center items-center w-[98%]">
            <div className="md:w-[31.7%] w-full flex md:ml-3 mx-3 md:mx-0 ">
                <div
                    onClick={() => setActive(true)}
                    className={`w-full py-2 md:py-1 ${active ? "bg-rosa text-white" : "bg-white text-primary"
                        } h-full grid place-items-center font-display font-medium text-sm cursor-pointer hover:opacity-90 rounded-l-xl `}
                >
                    <p>Presupuesto</p>
                </div>
                <div
                    onClick={() => setActive(false)}
                    className={`w-full py-2  md:py-1 ${active ? "bg-white text-primary" : "bg-rosa text-white"
                        } h-full grid place-items-center font-display font-medium text-sm cursor-pointer hover:opacity-90 rounded-r-xl`}
                >
                    <p>Pagos</p>
                </div>
            </div>
            <div >
                {/* <SelectMoneda /> */}
            </div>
        </div>
    )
}