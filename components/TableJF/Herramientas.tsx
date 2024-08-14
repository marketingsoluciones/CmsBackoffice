import ClickAwayListener from "react-click-away-listener"
import { GrDocumentPdf } from "react-icons/gr"
import { RiFileExcel2Fill } from "react-icons/ri"
import { HiOutlineFilter } from "react-icons/hi";
import { TbFilterHeart } from "react-icons/tb";
import { TbFilterPlus } from "react-icons/tb";
import { TbFilterX } from "react-icons/tb";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

export const Herramientas = ({ setShowPreviewPdf, setColumnsView, columnsView, table }) => {
    const [favoriteFilterView, setFavoriteFilterView] = useState(false)

    return (
        <div className="space-x-3 flex px-2">
            <div /* onClick={() => generateXLSX({ data, tableMaster })} */ className="w-6 h-6 hover:scale-120 transform  flex flex-col items-center justify-center gap-1 cursor-pointer relative" >
                <RiFileExcel2Fill className="w-6 h-6 text-green-700" />
            </div>
            <div onClick={() => { setShowPreviewPdf({ state: true }) }} className="w-6 h-6 hover:scale-120 transform  flex flex-col items-center justify-center gap-1 cursor-pointer relative">
                <GrDocumentPdf className="w-6 h-6 text-red-700" />
            </div>
            < FavoriteFilter setFavoriteFilterView={setFavoriteFilterView} favoriteFilterView={favoriteFilterView} table={table} />
            < Filter setColumnsView={setColumnsView} columnsView={columnsView} table={table} />
        </div>
    )
}

export const Filter = ({ setColumnsView, columnsView, table }) => {
    return (
        <div className="relative">
            <HiOutlineFilter onClick={() => setColumnsView(!columnsView)} className="w-6 h-6 cursor-pointer" />
            <div className="bg-gray-200 shadow-lg rounded-xl absolute -translate-x-[132px] translate-y-2" >
                {columnsView &&
                    <ClickAwayListener onClickAway={() => columnsView && setColumnsView(!setColumnsView)}>
                        <div className="bg-white w-36 h-max m-2 inline-block border border-black shadow rounded space-y-1">
                            <div className="px-1 py-2 border-b border-black flex space-x-2">
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
                            <div className="py-1 border-b border-black">
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
                            <div className="py-2">
                                <div className="flex mx-1 p-0.5 rounded-lg items-center justify-center cursor-pointer space-x-1.5 bg-slate-300  hover:bg-slate-200 ">
                                    <TbFilterPlus />
                                    <label className="cursor-pointer">
                                        Añadir a favorito
                                    </label>
                                </div>
                            </div>
                        </div>
                    </ClickAwayListener>
                }
            </div>
        </div >
    )
}

export const FavoriteFilter = ({ setFavoriteFilterView, favoriteFilterView, table }) => {
    return (
        <div className="relative ">
            <TbFilterHeart onClick={() => setFavoriteFilterView(!favoriteFilterView)} className="w-6 h-6 cursor-pointer" />
            <div className="bg-gray-200 shadow-lg rounded-xl absolute -translate-x-[132px] translate-y-2" >
                {favoriteFilterView &&
                    <ClickAwayListener onClickAway={() => favoriteFilterView && setFavoriteFilterView(!favoriteFilterView)}>
                        <div className="bg-white w-max h-max m-2 inline-block border border-black shadow rounded space-y-1">
                            <div className="py-1 border-b border-black w-[170px]">
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
                                                <MdOutlineEdit className="h-6 w-4"/>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="py-2">
                                <div className="flex mx-1 p-0.5 rounded-lg items-center justify-center cursor-pointer space-x-1.5 bg-slate-300  hover:bg-slate-200 ">
                                    <TbFilterX />
                                    <label className="cursor-pointer">
                                        Eliminar favorito
                                    </label>
                                </div>
                            </div>
                        </div>
                    </ClickAwayListener>
                }
            </div>
        </div >
    )
}