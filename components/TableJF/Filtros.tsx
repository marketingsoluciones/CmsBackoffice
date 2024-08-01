import { FC } from "react"
import DatePicker from "react-datepicker"

interface PropsFiltroFactura {
    onOptionChangeType: any
    typeFilter: any
    onOptionChangeState: any
    stateFilter: any
    handleRecargarAll: any
}

interface PropsFiltroTime {
    onOptionChangeDate: any
    dateFilter: any
    startDateFilter: any
    setStartDateFilter: any
    endDateFilter: any
    setEndDateFilter:any
}

export const FiltroFactura: FC<PropsFiltroFactura> = ({ onOptionChangeType, typeFilter, onOptionChangeState, stateFilter, handleRecargarAll }) => {
    return (
        <div className="border-[1px] border-gray-300 flex-1 rounded-xl inline-flex flex-col px-1 pt-2 pb-1 space-y-1">
            <div className="space-x-3">
                <div className="inline-flex items-center space-x-1">
                    <input type="radio" name="type" value="factura" id="factura" onChange={onOptionChangeType} checked={"factura" === typeFilter} />
                    <label htmlFor="factura">facturas</label>
                </div>
                <div className="inline-flex items-center space-x-1">
                    <input type="radio" name="type" value="transaccion" id="transaccion" onChange={onOptionChangeType} checked={"transaccion" === typeFilter} />
                    <label htmlFor="transaccion">transacciones</label>
                </div>
            </div>
            <div className="space-x-3">
                <div className="inline-flex items-center space-x-1">
                    <input type="radio" name="state" value="all" id="all" onChange={onOptionChangeState} checked={"all" === stateFilter} />
                    <label htmlFor="all">todas</label>
                </div>
                <div className="inline-flex items-center space-x-1">
                    <input type="radio" name="state" value="conciliated" id="conciliated" onChange={onOptionChangeState} checked={"conciliated" === stateFilter} />
                    <label htmlFor="conciliated">conciliadas</label>
                </div>
                <div className="inline-flex items-center space-x-1">
                    <input type="radio" name="state" value="noConciliated" id="noConciliated" onChange={onOptionChangeState} checked={"noConciliated" === stateFilter} />
                    <label htmlFor="noConciliated">no conciliadas</label>
                </div>
            </div>
            <div className="flex items-center flex-1">
                <div className="flex-1"></div>
                <button
                    onClick={handleRecargarAll}
                    disabled={stateFilter !== "noConciliated" || typeFilter !== "factura"}
                    type="button"
                    className={`w-28 h-6  ${stateFilter !== "noConciliated" || typeFilter !== "factura" ? "bg-gray-300" : "bg-blue-500"} hover:bg-blue-400 rounded-lg flex items-center justify-center select-none font-medium text-xs text-white`}>RECARGAR</button>
            </div>
        </div>
    )
}

export const FiltroTime: FC<PropsFiltroTime> = ({ onOptionChangeDate, dateFilter, startDateFilter, setStartDateFilter, endDateFilter,setEndDateFilter }) => {
    return (
        <div className="border-[1px] border-gray-300 flex-1 rounded-xl inline-flex flex-col px-1 py-2 space-y-2">
            <div className="space-x-3">
                <div className="inline-flex items-center space-x-1">
                    <input type="radio" name="date" value="lastmonth" id="lastmonth" onChange={onOptionChangeDate} checked={"lastmonth" === dateFilter} />
                    <label htmlFor="lastmonth">mes anterior</label>
                </div>
                <div className="inline-flex items-center space-x-1">
                    <input type="radio" name="date" value="month" id="month" onChange={onOptionChangeDate} checked={"month" === dateFilter} />
                    <label htmlFor="month">mes</label>
                </div>
                <div className="inline-flex items-center space-x-1">
                    <input type="radio" name="date" value="week" id="week" onChange={onOptionChangeDate} checked={"week" === dateFilter} />
                    <label htmlFor="week">semana</label>
                </div>
                <div className="inline-flex items-center space-x-1">
                    <input type="radio" name="date" value="day" id="day" onChange={onOptionChangeDate} checked={"day" === dateFilter} />
                    <label htmlFor="day">dia</label>
                </div>
            </div>
            <div className="flex w-full text-xs">
                <div className="inline-flex items-center space-x-1">
                    <input type="radio" name="date" value="range" id="range" onChange={onOptionChangeDate} checked={"range" === dateFilter} />
                    <label htmlFor="range">rango</label>
                </div>
                <DatePicker
                    selected={dateFilter === "range" ? startDateFilter : null}
                    onChange={(date: Date) => setStartDateFilter(date)}
                    popperClassName="!text-xs"
                    calendarClassName="rasta-stripes scale-75 -translate-x-10 -translate-y-8"
                    disabled={dateFilter !== "range"}
                    locale="es"
                    dateFormat="P"
                    className="text-xs w-24 h-6 ml-2" />
                <DatePicker
                    selected={dateFilter === "range" ? endDateFilter : null}
                    onChange={(date: Date) => setEndDateFilter(date)}
                    popperClassName="!text-xs"
                    calendarClassName="rasta-stripes scale-75 -translate-x-10 -translate-y-8"
                    disabled={dateFilter !== "range"}
                    locale="es"
                    dateFormat="P"
                    className="text-xs w-24 h-6 ml-2" />
            </div>

        </div>
    )
}