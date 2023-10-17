import { DineroIcon } from "../../Icons/index"
import { getCurrency } from "./Funciones"

export const CostoFinalPresupuesto = () => {
    return (
        <>
            <DineroIcon className="w-12 h-12 text-rosa" />
            <p className="font-display text-gray-500 font-light text-md grid place-items-center">
                Coste Final <br />
                <span className="font-semibold text-lg text-center">
                    {getCurrency(
                        0, /* currencyState */ "EUR"
                    )}
                </span>
            </p>
            <div className=" w-full rounded-xl overflow-hidden flex my-2">
                <div className="w-1/2 bg-rosa py-1 px-3">
                    <p className="text-xs font-display text-white">

                        <span> Pagado </span>{getCurrency(
                            0, /* currencyState */"EUR"
                        )}
                    </p>
                </div>

                <div className="w-1/2 bg-yellow-300 py-1 px-3">
                    <p className="text-xs font-display text-primary">
                        <span>  Por pagar </span>
                        {getCurrency(
                            0, /* currencyState */ "EUR"
                        )}
                    </p>
                </div>
            </div>
        </>
    )
}