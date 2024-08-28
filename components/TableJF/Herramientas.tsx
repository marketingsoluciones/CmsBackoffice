import ClickAwayListener from "react-click-away-listener"
import { GrDocumentPdf } from "react-icons/gr"
import { RiFileExcel2Fill } from "react-icons/ri"
import { HiOutlineFilter } from "react-icons/hi";
import { TbFilterHeart } from "react-icons/tb";
import { TbFilterPlus } from "react-icons/tb";
import { TbFilterX } from "react-icons/tb";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

export const Herramientas = ({ setShowPreviewPdf, setColumnsView, columnsView, table }) => {
    const [favoriteFilterView, setFavoriteFilterView] = useState(false)
    const [ToolsViw, setToolsView] = useState(false)


    return (
        <div className="space-x-3 flex px-2">
            < FavoriteFilter setFavoriteFilterView={setFavoriteFilterView} favoriteFilterView={favoriteFilterView} table={table} />
            < Filter setColumnsView={setColumnsView} columnsView={columnsView} table={table} />
            < Tools setToolsView={setToolsView} ToolsViw={ToolsViw} table={table} setShowPreviewPdf={setShowPreviewPdf} />
        </div>
    )
}


export const Tools = ({ setToolsView, ToolsViw, table, setShowPreviewPdf }) => {
    return (
        <div className="relative">
            <BsThreeDotsVertical onClick={() => setToolsView(!ToolsViw)} className="w-6 h-6 cursor-pointer" />
            {ToolsViw &&
                <ClickAwayListener onClickAway={() => ToolsViw && setToolsView(!ToolsViw)}>
                    <div className="bg-white w-max h-max border border-gray-300 shadow rounded-md absolute translate-y-2 p-3 -left-7 space-y-3 " >
                        <div /* onClick={() => generateXLSX({ data, tableMaster })} */ className="w-6 h-6 hover:scale-120 transform  flex flex-col items-center justify-center gap-1 cursor-pointer relative" >
                            <RiFileExcel2Fill className="w-6 h-6 text-green-700" />
                        </div>
                        <div onClick={() => { setShowPreviewPdf({ state: true }) }} className="w-6 h-6 hover:scale-120 transform  flex flex-col items-center justify-center gap-1 cursor-pointer relative">
                            <GrDocumentPdf className="w-6 h-6 text-red-700" />
                        </div>
                    </div>
                </ClickAwayListener>
            }
        </div >
    )
}

export const Filter = ({ setColumnsView, columnsView, table }) => {
    return (
        <div className="relative">
            <HiOutlineFilter onClick={() => setColumnsView(!columnsView)} className="w-6 h-6 cursor-pointer" />
            {columnsView &&
                <ClickAwayListener onClickAway={() => columnsView && setColumnsView(!setColumnsView)}>
                    <div className="bg-white w-[250px] h-max border border-gray-300 shadow rounded-md absolute -translate-x-[200px] translate-y-2 " >
                        <div className="px-3 pt-3">
                            <label className="font-semibold text-[14px]">
                                Customise Columns
                            </label>
                        </div>
                        <div className="grid grid-cols-2 p-3 ">
                            <div className="flex space-x-1 items-center pl-1">
                                <input
                                    {...{
                                        type: 'checkbox',
                                        checked: table.getIsAllColumnsVisible(),
                                        onChange: table.getToggleAllColumnsVisibilityHandler(),
                                    }}
                                />{' '}
                                <label>
                                    Toggle All
                                </label>
                            </div>
                        </div>
                        <div className="px-3 py-2 bg-gray-100">
                            <label className="font-semibold">
                                Columnas Disponibles
                            </label>
                        </div>
                        <div className="p-3 ">
                            {table.getAllLeafColumns().map(column => {
                                return (
                                    <div key={column.id} className="px-1 py-1 flex space-x-1">

                                        <input
                                            {...{
                                                type: 'checkbox',
                                                checked: column.getIsVisible(),
                                                onChange: column.getToggleVisibilityHandler(),
                                            }}
                                        />{' '}
                                        <label>
                                            {column.id}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-100">
                            <div className="flex items-center space-x-2 font-semibold">
                                <TbFilterPlus className="h-5 w-5" />
                                <label >
                                    Crear Vista
                                </label>
                            </div>
                            <div>
                                <button className="bg-gray-200 px-2 py-2 rounded-lg hover:bg-gray-300">
                                    Guardar
                                </button>
                            </div>
                        </div>

                    </div>
                </ClickAwayListener>
            }
        </div >
    )
}

export const FavoriteFilter = ({ setFavoriteFilterView, favoriteFilterView, table }) => {
    return (
        <div className="relative ">
            <TbFilterHeart onClick={() => setFavoriteFilterView(!favoriteFilterView)} className="w-6 h-6 cursor-pointer" />
            {favoriteFilterView &&
                <ClickAwayListener onClickAway={() => favoriteFilterView && setFavoriteFilterView(!favoriteFilterView)}>
                    <div className=" bg-white w-[250px] h-max border border-gray-300 shadow rounded-md absolute -translate-x-[200px] translate-y-2 " >
                        <div className="px-3 pt-3">
                            <label className="font-semibold text-[14px]">
                                Vistas
                            </label>
                        </div>
                        <div className="p-3 ">
                            {table.getAllLeafColumns().map(column => {
                                return (
                                    <div className="flex justify-between pr-2">
                                        <div key={column.id} className="px-1 py-1 flex items-center justify-center space-x-1">
                                            <input
                                                {...{
                                                    type: 'checkbox',
                                                    checked: column.getIsVisible(),
                                                    onChange: column.getToggleVisibilityHandler(),
                                                }}
                                            />{' '}
                                            <label>
                                                {column.id}
                                            </label>
                                        </div>
                                        <div className="cursor-pointer">
                                            <MdOutlineEdit className="h-6 w-4" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-100">
                            <div className="flex items-center space-x-2 font-semibold">
                                <TbFilterX className="h-5 w-5" />
                                <label >
                                    Eliminar Vistas
                                </label>
                            </div>
                            <div>
                                <button className="bg-gray-200 px-2 py-2 rounded-lg hover:bg-gray-300">
                                    Borrar
                                </button>
                            </div>
                        </div>
                    </div>
                </ClickAwayListener>
            }

        </div >
    )
}