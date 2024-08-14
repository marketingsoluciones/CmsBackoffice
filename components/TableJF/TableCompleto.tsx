"use client"
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
/* registerLocale('es', es) */
/* import { generateXLSX, getDataTreeFacturaWispHup, getDataTreeTransaction } from "../utils/funciones.js" */
import { usePDF } from 'react-to-pdf';
import React, { ChangeEventHandler, InputHTMLAttributes, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { FetchGraphQL, /* fetchApiJaihom, */ queries } from "../../utils/Fetching.js";
import { Factura, /* FetchFacturas, FetchTransaction */ } from "../../utils/Interfaces.js";
import { Column, ColumnDef, ColumnFiltersState, FilterFn, SortingFn, Table, createColumnHelper, flexRender, getCoreRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, sortingFns, useReactTable } from "@tanstack/react-table";
import { RankingInfo, rankItem, compareItems } from '@tanstack/match-sorter-utils'
import { getDate, getDateTime, obtenerPrimerYUltimoDiaSemana } from "./Time";
import ClickAwayListener from "react-click-away-listener";
import { FiltroFactura, FiltroTime } from "./Filtros";
import { Herramientas } from "./Herramientas";
import { TableJF } from "./Table";

const columnHelperFactura = createColumnHelper<Factura>()

declare module '@tanstack/table-core' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
        itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
    let dir = 0

    // Only sort by rank if the column has ranking information
    if (rowA.columnFiltersMeta[columnId]) {
        dir = compareItems(
            rowA.columnFiltersMeta[columnId]?.itemRank!,
            rowB.columnFiltersMeta[columnId]?.itemRank!
        )
    }

    // Provide an alphanumeric fallback for when the item ranks are equal
    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}


export default function TableCompleto() {
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' })
    const [file, setFile] = useState<any>()
    const [showPreviewPdf, setShowPreviewPdf] = useState<any>({ state: false, title: "", payload: {} })
    const [selectRow, setSelectRow] = useState<string | null>(null)
    const [searchColumn, setSearchColumn] = useState<string | null>(null)
    const [search, setSearch] = useState<boolean>(false)
    const [columnsView, setColumnsView] = useState<boolean>(false)
    const [inputView, setInputView] = useState<boolean>(false)
    const [showTable, setShowTable] = useState<boolean>(true)
    const [data, setData] = useState<Factura[]>([])
    const rerender = useReducer(() => ({}), {})[1]
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [globalFilter, setGlobalFilter] = useState('')

    const [typeFilter, setTypeFilter] = useState("factura")//transaccion
    const [dateFilter, setDateFilter] = useState("month")
    const [stateFilter, setStateFilter] = useState("conciliated")
    const [rangeFilter, setRangeFilter] = useState(null)
    const d = new Date()
    const [startDateFilter, setStartDateFilter] = useState<Date>(new Date(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}-`));
    const [endDateFilter, setEndDateFilter] = useState<Date>(new Date(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}-`));
    const inputRef = useRef(null);
    const [updated, setUpdated] = useState('');
    const [uploading, setUploading] = useState<boolean>(false)
    const [showSpinner, setShowSpinner] = useState<boolean>(false)
    const [columnVisibility, setColumnVisibility] = React.useState({ recargado: false, forma_pago: false, cajeroID: false, cajero: false, banco: false, conciliado: false, updatedAt: false })
    const [tableMaster, setTableMaster] = useState<any>()

    const handleChange = (event) => {
        if (event.key === 'Enter') {
            console.log(inputRef.current.ref)
            setUpdated(inputRef.current.value);
        }
    }
    const onOptionChangeType: ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log(e.target.value)
        setShowTable(false)
        setTimeout(() => {
            setShowTable(true)
        }, 3000);
        setTypeFilter(e.target.value)
    }
    const onOptionChangeDate: ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log(e.target.value)
        setDateFilter(e.target.value)
    }
    const onOptionChangeState: ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log(e.target.value)
        setStateFilter(e.target.value)
    }
    const handleGetFactura = (id_factura: string) => {
        /*   fetchApiJaihom({
              query: queries.getFacturaWispHup,
              variables: {
                  id_factura
              },
          }).then((resp: string) => {
              console.log(JSON.parse(resp))
          }) */
    }
    const handleGetReferencia = (id_referencia: string) => {
        /* console.log(id_referencia) */
        /* fetchApiJaihom({
            query: queries.getTransacciones,
            variables: {
                args: { referencia: id_referencia }
            },
        }).then((resp: FetchTransaction) => {
            console.log(1005, resp.results[0])
        }) */
    }

    const ejem = [
        {
            name:"",
            header:"",
            cell:"",
            footer:"",
            enableColumnFilter:"",
            enableHiding: false,
        }
    ]

    const columnsFactura = useMemo<ColumnDef<Factura>[]>(() => [
        

        columnHelperFactura.accessor('id_factura', {
            id: 'id_factura',
            header: () => <span>id_factura</span>,
            cell: info => <div /* onClick={() => handleGetFactura(info.getValue())} */ className="text-center">{/* {info.getValue()} */}</div>,
            footer: info => info.column.id,
            filterFn: 'fuzzy',
            sortingFn: fuzzySort,
            enableHiding: false,
        }),
        columnHelperFactura.accessor('criterio', {
            header: () => <span>criterio</span>,
            cell: info => info.getValue(),
            footer: info => info.column.id,
            enableColumnFilter: false,
        }),
        columnHelperFactura.accessor('recargado', {
            header: () => <span>recargado</span>,
            cell: info => <span>{info.getValue() ? "recargado" : null}</span>,
            footer: info => info.column.id,
            enableColumnFilter: false,
        }),
        columnHelperFactura.accessor('forma_pago', {
            header: () => <span>forma_pago</span>,
            cell: info => info.getValue(),
            footer: info => info.column.id,
            enableColumnFilter: false,
        }),
        columnHelperFactura.accessor('total_cobrado', {
            header: () => <span>total_cobrado</span>,
            cell: info => <div className="text-right">{info.getValue().toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>,
            footer: info => info.column.id,
            enableHiding: false,
        }),
        columnHelperFactura.accessor('fecha_pago', {
            header: () => <span>fecha_pago</span>,
            cell: info => <div className="text-center">{getDate(info.getValue())}</div>,
            footer: info => info.column.id,
            enableColumnFilter: false,
            enableHiding: false,
        }),
        columnHelperFactura.accessor('fecha_pago_ref', {
            header: () => <span>fecha_pago_ref</span>,
            cell: info => <div className="text-center">{info.getValue()}</div>,
            footer: info => info.column.id,
            enableColumnFilter: false,
            enableHiding: false,
        }),
        columnHelperFactura.accessor('referencia', {
            header: () => <span>referencia</span>,
            cell: info => <div className="text-right" >{info.getValue()}</div>,
            footer: info => info.column.id,
        }),
        columnHelperFactura.accessor('cajeroID', {
            header: () => <span>cajeroID</span>,
            cell: info => <div className="text-right" >{info.getValue()}</div>,
            footer: info => info.column.id,
        }),
        columnHelperFactura.accessor('cajero', {
            header: () => <span>cajero</span>,
            cell: info => <div className="text-right" >{info.getValue()}</div>,
            footer: info => info.column.id,
        }),
        columnHelperFactura.accessor('updatedAt', {
            header: () => <span>updatedAt</span>,
            cell: info => { return <div className="text-center">{getDateTime(info.getValue())}</div> },
            footer: info => info.column.id,
            enableColumnFilter: false
        }),
    ], [typeFilter])



    const table = useReactTable({
        data,
        columns:
            useMemo(() => columnsFactura, [typeFilter]),
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
            columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
    })

    useEffect(() => {
        table?.setPageSize(250)
    }, [])

    useEffect(() => {
        if (startDateFilter && endDateFilter) {
            setRangeFilter({ startDateFilter, endDateFilter: new Date(endDateFilter.getTime() + 86399000) })
        } else {
            setRangeFilter(null)
        }
    }, [startDateFilter, endDateFilter])

    useEffect(() => {
        let args: any = {}
        if (dateFilter === "lastmonth") {
            const dt = new Date()
            const y = dt.getFullYear()
            const m = dt.getMonth()
            args = {
                rangeDate: {
                    gt: new Date(`${y}-${m}-1`),
                    lt: new Date(new Date(`${y}-${m + 1}-1 23:59:59`).getTime() - 86400000),
                }
            }
        }
        if (dateFilter === "month") {
            const dt = new Date()
            const y = dt.getFullYear()
            const m = dt.getMonth()
            args = {
                rangeDate: {
                    gt: new Date(`${y}-${m + 1}-1`),
                    lt: new Date(new Date(`${y}-${m + 2}-1 23:59:59`).getTime() - 86400000),
                }
            }
        }
        if (dateFilter === "week") {
            const r = obtenerPrimerYUltimoDiaSemana()
            args = {
                rangeDate: {
                    gt: r.primero,
                    lt: r.ultimo,
                }
            }
        }
        if (dateFilter === "day") {
            const dt = new Date()
            const y = dt.getFullYear()
            const m = dt.getMonth()
            const d = dt.getDate()
            args = {
                rangeDate: {
                    gt: new Date(`${y}-${m + 1}-${d}`),
                    lt: new Date(`${y}-${m + 1}-${d} 23:59:59`),
                }
            }
        }
        if (rangeFilter && dateFilter === "range") {
            args = {
                rangeDate: {
                    gt: new Date(rangeFilter.startDateFilter),
                    lt: new Date(rangeFilter.endDateFilter),
                }
            }
        }
        if (stateFilter === "all") { }
        if (typeFilter === "factura") {
            if (stateFilter === "noConciliated") { { args = { ...args, pagado: false } } }
            if (stateFilter === "conciliated") { args = { ...args, pagado: true } }
            /* fetchApiJaihom({
                query: queries.getFacturas,
                variables: {
                    args,
                    skip: 0,
                    limit: 0
                },
            }).then((resp: FetchFacturas) => {
                console.log(resp)
                setData(resp?.results)
            }) */
        }
        if (typeFilter === "transaccion") {
            if (stateFilter === "noConciliated") { args = { ...args, conciliado: false } }
            if (stateFilter === "conciliated") { args = { ...args, conciliado: true } }
            delete args.pagado
            /*  fetchApiJaihom({
                 query: queries.getTransacciones,
                 variables: {
                     args,
                     skip: 0,
                     limit: 0
                 },
             }).then((resp: FetchTransaction) => {
                 const results: Transaction[] = resp.results.map((elem: Transaction) => {
                     const monto_facturas = elem.facturas.reduce((acc, item) => {
                         return acc + item.total_cobrado
                     }, 0)
                     const diferencia = elem.monto - monto_facturas
                     return {
                         ...elem,
                         monto_facturas,
                         diferencia
                     }
                 })
                 setData(results)
             }) */
        }
    }, [typeFilter, dateFilter, stateFilter, rangeFilter])

    useEffect(() => {
        if (table.getState().columnFilters[0]?.id === 'fullName') {
            if (table.getState().sorting[0]?.id !== 'fullName') {
                table.setSorting([{ id: 'fullName', desc: false }])
            }
        }
    }, [table.getState().columnFilters[0]?.id])

    const handleChangeFile = (e, banco) => {
        e.preventDefault();
        setShowSpinner(true)
        setUploading(true)
        let reader = new FileReader();
        let file = e.target.files[0];
        setFile(file)
        /* fetchApiJaihom({
            query: queries.uploadBanco,
            variables: { file, banco },
            type: "formData"
        }).then((result) => {
            if (result === "ok") {
                setUploading(false)
            }
            setShowSpinner(false)
        }) */
    };

    const handleConciliar = (e) => {
        e.preventDefault();
        setShowSpinner(true)
        setUploading(true)
        setFile(file)
        /* fetchApiJaihom({
            query: queries.runConciliation,
            variables: {},
        }).then((result) => {
            if (result === "ok") {
                setUploading(false)
            }
            setShowSpinner(false)
        }) */
    };

    const handleRecargar = (e) => {
        e.preventDefault();
    };

    const handleRecargarAll = (e) => {
        e.preventDefault()
        const ids_factura = data.map(elem => elem.id_factura)
        /* fetchApiJaihom({
            query: queries.refreshFacturaWispHup,
            variables: { ids_factura },
        }).then((result) => {
            console.log(result)
        }) */
    };

    return (
        <div className="flex w-full text-xs capitalize">
            {showPreviewPdf.state &&
                <div className="absolute w-full h-[calc(100%-100px)] z-50 justify-center flex">
                    <ClickAwayListener onClickAway={() => setShowPreviewPdf({ state: false })}>
                        <div className="bg-gray-200 flex flex-col w-[764px] h-[615px] translate-y-[46px] rounded-xl shadow-lg border-[1px] border-gray-300">
                            <div className="bg-white flex w-full h-10 rounded-xl rounded-b-none items-center px-2 border-b-[1px] border-gray-300 shadow-sm">
                                <div className="flex-1 flex items-center" >
                                    <div className="flex-1" />
                                </div>
                                <div onClick={() => setShowPreviewPdf(false)} className="bg-gray-50 w-8 h-8 hover:bg-gray-200 rounded-full flex justify-center cursor-pointer text-lg text-gray-700 pt-0">x</div>
                            </div>
                            <div className="w-full h-[555px]">
                                <div className="w-[980px] h-[740px] scale-75 bg-white -translate-x-[109px] -translate-y-[84px] border-[1px] rounded-none ">
                                </div>
                            </div>
                        </div>
                    </ClickAwayListener>
                </div>
            }

            {
                showSpinner &&
                <div className="absolute z-50 w-full top-0 left-0 h-full bg-gray-600 opacity-50 flex items-center justify-center ">
                    <div id="loader" className="absolute" />
                </div>
            }

            {/* <input id="child" type="number" onKeyDown={handleChange} className={`${!inputView && "hidden"} h-4 text-right text-xs font-medium`} /> */}
            <div className="w-full h-[calc(100vh-110px)] overflow-auto">
                <div className="bg-white flex flex-col w-[calc(1280px-40px)] xl:w-[calc(100%-64px)] h-[calc(100vh-160px)] border border-gray-300 rounded-xl p-2 mx-2 xl:ml-8">
                    <div className="flex space-x-4 items-center">
                        <div className="flex-1 flex justify-end py-1">
                            <div className="w-[600px] flex flex-col px-2 pb-1">
                                {/* filtrar por fecha de pago */}
                                <FiltroTime
                                    onOptionChangeDate={onOptionChangeDate}
                                    dateFilter={dateFilter}
                                    startDateFilter={startDateFilter}
                                    setStartDateFilter={setStartDateFilter}
                                    endDateFilter={endDateFilter}
                                    setEndDateFilter={setEndDateFilter}
                                />
                            </div>
                        </div>
                        <div className="h-10 py-1 space-y-4 text-gray-600 items-center justify-center">
                            <Herramientas setShowPreviewPdf={setShowPreviewPdf} setColumnsView={setColumnsView} columnsView={columnsView} table={table} />
                        </div>
                    </div>
                    <TableJF showTable={showTable} targetRef={targetRef} table={table} TableForward={TableForward} typeFilter={typeFilter} setTableMaster={setTableMaster} setSearch={setSearch} search={search} flexRender={flexRender} setSelectRow={setSelectRow} selectRow={selectRow} Filter={Filter} />
                </div>
            </div>
            <style>{`
      #loader {
        border: 16px solid #f3f3f3;
        border-top: 16px solid #3498db;
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
        display: block; /* El spinner debe estar oculto por defecto */
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      tfoot {
        color: gray;
      }

      tfoot th {
        font-weight: normal;
      }

      table *tbody {
        display: block;
        max-height: calc(100vh - 340px);
        width: calc(100% + 8px);
        overflow-y: scroll;
      }

      thead, tbody tr, tfoot {
        display: table;
        width: 100%;
        table-layout: fixed;
      }

      `}</style>
        </div >
    )
}

function Filter({ column, table }: { column: Column<any, unknown>, table: Table<any> }) {
    const [isMounted, setIsMounted] = useState<any>(false)

    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true)
        }
        return () => {
            column.setFilterValue("")
            setIsMounted(false)
        }
    }, [])

    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)

    const columnFilterValue = column.getFilterValue()

    const sortedUniqueValues = useMemo(
        () =>
            typeof firstValue === 'number'
                ? []
                : Array.from(column.getFacetedUniqueValues().keys()).sort(),
        [column.getFacetedUniqueValues()]
    )

    return typeof firstValue === 'number' ? (
        <>
            <div className="w-[calc(100%-10px)] flex space-x-2 ">
                    <DebouncedInput
                        type="number"
                        min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                        max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                        value={(columnFilterValue as [number, number])?.[0] ?? ''}
                        onChange={value =>
                            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
                        }
                        placeholder={`Min`}
                        className="flex-1 text-xs font-normal w-10* h-4 border shadow rounded-[0.25rem] text-right focus:ring-0 pl-1 focus:outline-none"
                    />
                    <DebouncedInput
                        type="number"
                        min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                        max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                        value={(columnFilterValue as [number, number])?.[1] ?? ''}
                        onChange={value =>
                            column.setFilterValue((old: [number, number]) => [old?.[0], value])
                        }
                        placeholder={`Max`}
                        className="flex-1 text-xs font-normal w-10 h-4 border shadow rounded-[0.25rem] text-right focus:ring-0 pl-1 focus:outline-none"
                    />
            </div>
            <div className="relative">
                <span onClick={() => column.setFilterValue("")} className="absolute select-none translate-x-0.5 -translate-y-3 text-sm font-medium text-gray-700 w-3 h-3 cursor-pointer">x</span>
            </div>
        </>
    ) : (
        <>
            {/* <datalist id={column.id + 'list'}>
          {sortedUniqueValues.slice(0, 5000).map((value: any) => (
            <option value={value} key={value} />
          ))}
        </datalist> */}
            <DebouncedInput
                type="text"
                value={(columnFilterValue ?? '') as string}
                onChange={value => column.setFilterValue(value)}
                placeholder={`${column.id}`}
                className="text-xs font-normal w-full h-4 rounded-[0.25rem] focus:ring-0 pl-1 focus:outline-none border py-2 relative"
                list={column.id + 'list'}
            />
            <div className="relative">
                <span onClick={() => column.setFilterValue("")} className="absolute select-none -translate-x-3.5 -translate-y-2 text-sm font-medium text-gray-700 w-3 h-3 cursor-pointer">x</span>
            </div>
        </>
    )
}

// A debounced input react component
function DebouncedInput({ value: initialValue, onChange, debounce = 500, ...props }: {
    value: string | number,
    onChange: (value: string | number) => void,
    debounce?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <input className="text-xs" {...props} value={value} onChange={e => setValue(e.target.value)} />
    )
}



const TableForward = ({ table, typeFilter, setTableMaster }) => {
    useEffect(() => {
        setTableMaster(table)
    }, [typeFilter])


    return (<></>)
}