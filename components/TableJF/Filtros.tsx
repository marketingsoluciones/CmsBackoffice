import { FC, useState } from "react"
import ClickAwayListener from "react-click-away-listener";
import DatePicker from "react-datepicker"
import { GoClock } from "react-icons/go";

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
    setEndDateFilter: any
    showModal?: any
    setShowModal?: any
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

export const FiltroTime: FC<PropsFiltroTime> = ({ onOptionChangeDate, dateFilter, startDateFilter, setStartDateFilter, endDateFilter, setEndDateFilter }) => {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <Time showModal={showModal} setShowModal={setShowModal} onOptionChangeDate={onOptionChangeDate} dateFilter={dateFilter} startDateFilter={startDateFilter} setStartDateFilter={setStartDateFilter} endDateFilter={endDateFilter} setEndDateFilter={setEndDateFilter} />
        </>

    )
}

export const Time: FC<PropsFiltroTime> = ({ showModal, setShowModal, onOptionChangeDate, dateFilter, startDateFilter, setStartDateFilter, endDateFilter, setEndDateFilter }) => {
    return (
        <div className="relative">
            <div className={`${showModal ? "bg-slate-200 rounded-full h-7 w-7 " : ""} h-7 w-7 flex items-center justify-center `}>
                <GoClock onClick={() => setShowModal(!showModal)} className="w-5 h-5 cursor-pointer" />
            </div>
            {
                showModal &&
                <ClickAwayListener onClickAway={() => showModal && setShowModal(!showModal)}>
                    <div className="border-[1px] border-gray-300  rounded-md px-2 py-3 absolute w-[408px] bg-white -left-[390px] m-3  grid grid-cols-4 gap-2 justify-items-center z-50  " >
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
                        <div className=" col-span-4 inline-flex items-center space-x-1 text-xs justify-self-start">
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
                                className="text-xs w-24 h-6 ml-2 bg-slate-100 rounded-md focus:ring-0 pl-1 focus:outline-none" />
                            <DatePicker
                                selected={dateFilter === "range" ? endDateFilter : null}
                                onChange={(date: Date) => setEndDateFilter(date)}
                                popperClassName="!text-xs"
                                calendarClassName="rasta-stripes scale-75 -translate-x-10 -translate-y-8"
                                disabled={dateFilter !== "range"}
                                locale="es"
                                dateFormat="P"
                                className="text-xs w-24 h-6 ml-2 bg-slate-100 rounded-md focus:ring-0 pl-1 focus:outline-none" />
                        </div>
                    </div>
                </ClickAwayListener>
            }
        </div >
    )
}