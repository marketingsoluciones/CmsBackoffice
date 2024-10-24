import { FC } from "react"
import { BiSearchAlt2 } from "react-icons/bi"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"

interface PropsTable {
    targetRef: any
    table: any
    TableForward: any
    typeFilter: any
    setTableMaster: any
    setSearch: any
    search: any
    flexRender: any
    Filter: any
    setSelectRow: any
    selectRow: any
}


export const TableJF: FC<PropsTable> = ({  targetRef, table, TableForward, typeFilter, setTableMaster, flexRender, setSelectRow, selectRow }) => {

    table.getRowModel().rows.slice(0, 1).map(row => {
        row.getVisibleCells().map(cell => {
            console.log(10005, cell.getContext().getValue())
        })
    })
    return (
        <div>
            <div ref={targetRef} className="flex flex-col flex-1 border-[1px] border-gray-300 !rounded-xl">
                <table className="">
                    <thead className=" w-full ">
                        {table?.getHeaderGroups().map(headerGroup => {
                            return (
                                <tr key={headerGroup.id} className="border-b-[1px] border-gray-300  ">
                                    <TableForward table={table} typeFilter={typeFilter} setTableMaster={setTableMaster} />
                                    {headerGroup.headers.map((header, idx) => {
                                        return (
                                            <th key={header.id} className={`${idx !== 0 && "border-l-[1px] border-gray-300 "} py-2 !w-10 `}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : (<div className={`${header.id === "checkbox" ? "!w-10" : ""} flex flex-col justify-start h-full  `}>
                                                        <div className="flex items-start ">
                                                            <div
                                                                {...{
                                                                    className: header.column.getCanSort()
                                                                        ? 'cursor-pointer select-none flex flex-1 justify-start items-start px-1 space-x-1 capitalice'
                                                                        : '',
                                                                    onClick: header.column.getToggleSortingHandler(),
                                                                }} >
                                                                <div className="pl-1">
                                                                    {flexRender(
                                                                        header.column.columnDef.header,
                                                                        header.getContext()
                                                                    )}
                                                                </div>
                                                                {
                                                                {
                                                                    asc: <TiArrowSortedDown />,
                                                                    desc: <TiArrowSortedUp />,
                                                                }
                                                                [header.column.getIsSorted() as string] ?? <span className="w-3 h-full" />
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    )}
                                            </th>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </thead>
                    <tbody className={` block overflow-y-scroll w-[calc(100%+8px)] h-[calc(100vh-265px)] relative `}>
                        {
                            table.getRowModel().rows.length > 0 &&
                            table.getRowModel().rows.map(row => {
                                return (
                                    <tr key={row.id} onClick={() => setSelectRow(row.id === selectRow ? null : row.id)} className={`${row.id === selectRow && "bg-gray-300"} hover:bg-gray-200 select-none border-b`}>
                                        {row.getVisibleCells().map(cell => {
                                            return (
                                                <td key={cell.id} onClick={(e: any) => { console.log(10009, "hola") }} className="py-2 pl-2">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )

                            })
                        }
                        {
                            table.getRowModel().rows.length <= 0 &&
                            <div className="flex  items-center justify-center w-full h-full">
                                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4" />
                            </div>
                        }
                    </tbody>
                    <tfoot className="hidden">
                        {table.getFooterGroups().map(footerGroup => (
                            <tr key={footerGroup.id}>
                                {footerGroup.headers.map(header => (
                                    <th key={header.id} className="">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.footer,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </tfoot>
                </table>
                <div className="flex flex-1 items-center gap-2 justify-between px-4 bg-gray-100 rounded-b-xl">
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                        className="h-8 text-xs rounded-lg border-[1px] border-gray-300"
                    >
                        {[25, 50, 100, 250].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Filas por página {pageSize}
                            </option>
                        ))}
                    </select>
                    <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-lg border-[1px]">
                        <button
                            className="border rounded p-1"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {'<<'}
                        </button>
                        <button
                            className="border rounded p-1"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {'<'}
                        </button>
                        <div>Página</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} de{' '}
                            {table.getPageCount()}
                        </strong>
                        <button
                            className="border rounded p-1"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            {'>'}
                        </button>
                        <button
                            className="border rounded p-1"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            {'>>'}
                        </button>
                    </div>
                    <div className="inline-flex space-x-2">
                        <span>total de registros {table.getPrePaginationRowModel().rows.length}</span>
                    </div>
                </div>
            </div>
            <style>
                {`
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

                    .loader {
                                border-top-color:  #3498db;
                                -webkit-animation: spinner 1.5s linear infinite;
                                animation: spinner 1.5s linear infinite;
                            }

                        @-webkit-keyframes spinner {
                            0% {
                            -webkit-transform: rotate(0deg);
                            }
                            100% {
                            -webkit-transform: rotate(360deg);
                            }
                        }

                        @keyframes spinner {
                            0% {
                            transform: rotate(0deg);
                            }
                            100% {
                            transform: rotate(360deg);
                            }
                        }
                `}
            </style>
        </div>

    )
}