import { FC } from "react"
import { BiSearchAlt2 } from "react-icons/bi"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"

interface PropsTable {
    showTable: any
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


export const TableJF: FC<PropsTable> = ({ Filter, showTable, targetRef, table, TableForward, typeFilter, setTableMaster, setSearch, search, flexRender, setSelectRow, selectRow }) => {
    return (
        <div>
            {
                showTable &&
                <div ref={targetRef} className="flex flex-col flex-1 border-[1px] border-gray-300 !rounded-xl">
                    <table className="">
                        <thead className=" w-full ">
                            {table.getHeaderGroups().map(headerGroup => {
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
                                                                {/* {idx === 0 && <BiSearchAlt2
                                                                onClick={() => {
                                                                    setSearch(!search)
                                                                    //setSearchColumn(searchColumn === header.id ? null : header.id)
                                                                    //searchColumn === header.id && header.column.setFilterValue(null)
                                                                }}
                                                                className="w-3.5 h-3.5 ml-1 cursor-pointer" />
                                                                 } */}
                                                                <div
                                                                    {...{
                                                                        className: header.column.getCanSort()
                                                                            ? 'cursor-pointer select-none flex flex-1* justify-start items-start px-1 space-x-1 capitalice'
                                                                            : '',
                                                                        onClick: header.column.getToggleSortingHandler(),
                                                                    }} >
                                                                    <div className="pl-1">
                                                                        {flexRender(
                                                                            header.column.columnDef.header,
                                                                            header.getContext()
                                                                        )}
                                                                    </div>
                                                                    {{
                                                                        asc: <TiArrowSortedDown />,
                                                                        desc: <TiArrowSortedUp />,
                                                                    }[header.column.getIsSorted() as string] ?? <span className="w-3" />}
                                                                </div>
                                                            </div>
                                                            {/* { search
                                                            ?  header.column.getCanFilter() ? (
                                                                <div className={`${search ? " translate-x-0" : " "} flex-1 px-1 flex items-center mt-1 transition-all delay-150  `}>
                                                                    <Filter column={header.column} table={table} />
                                                                </div>
                                                            ) : null
                                                            : null
                                                        } */}
                                                        </div>
                                                        )}
                                                </th>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </thead>
                        <tbody className={` block overflow-y-scroll w-[calc(100%+8px)] h-[calc(100vh-265px)] `}>
                            {table.getRowModel().rows.map(row => {
                                return (
                                    <tr key={row.id} onClick={() => setSelectRow(row.id === selectRow ? null : row.id)} className={`${row.id === selectRow && "bg-gray-300"} hover:bg-gray-200 select-none`}>
                                        {row.getVisibleCells().map(cell => {
                                            return (
                                                <td className="px-2" key={cell.id}
                                                    onClick={(e: any) => {
                                                        if (cell.column.id === "transacciones") {
                                                            const rootelementOld = document.getElementById("parent")
                                                            if (rootelementOld) rootelementOld.removeAttribute("id")
                                                            e.target.id = "parent"
                                                            const rootelement = document.getElementById("parent")
                                                            const child = document.getElementById("child")
                                                            // if (rootelement) {
                                                            //   rootelement?.appendChild(child)
                                                            //   setInputView(true)
                                                            //   child.focus()
                                                            // }
                                                        }
                                                    }}
                                                    onDoubleClick={(e: any) => {
                                                        console.log(e)
                                                        const lastElem = document.getElementById("select")
                                                        if (lastElem) {
                                                            lastElem.style.userSelect = "none"
                                                            lastElem.removeAttribute("id")
                                                        }
                                                        e.target.id = "select"
                                                        e.target.style.userSelect = "text"
                                                        e.stopPropagation()
                                                    }}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
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
                    <hr className="" />
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
            }
        </div>

    )
}

