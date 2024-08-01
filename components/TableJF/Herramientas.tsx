import ClickAwayListener from "react-click-away-listener"
import { GrDocumentPdf } from "react-icons/gr"
import { RiFileExcel2Fill } from "react-icons/ri"
import { TbSettingsFilled } from "react-icons/tb"

export const Herramientas = ({ setShowPreviewPdf, setColumnsView, columnsView, table }) => {
    return (
        <div className="space-x-3 flex px-2">
            <div /* onClick={() => generateXLSX({ data, tableMaster })} */ className="w-6 h-6" >
                <label className={`hover:scale-120 transform  flex flex-col items-center justify-center gap-1 cursor-pointer relative`} >
                    <RiFileExcel2Fill className="w-6 h-6 text-green-700" />
                </label>
            </div>
            <div
                onClick={() => {
                    setShowPreviewPdf({ state: true })
                }}
                className="w-6 h-6"
            >
                <label className={`hover:scale-120 transform  flex flex-col items-center justify-center gap-1 cursor-pointer relative`} >
                    <GrDocumentPdf className="w-6 h-6 text-red-700" />
                </label>
            </div>
            <ClickAwayListener onClickAway={() => setColumnsView(false)}>
                <div className="relative ">
                    <TbSettingsFilled onClick={() => setColumnsView(!columnsView)} className="w-6 h-6 cursor-pointer" />
                    <div className="bg-gray-200 shadow-lg rounded-xl absolute -translate-x-[132px] translate-y-2" >
                        {columnsView && <div className="bg-white w-36 h-64 m-2 inline-block border border-black shadow rounded space-y-1">
                            <div className="px-1 border-b border-black">
                                <label>
                                    <input
                                        {...{
                                            type: 'checkbox',
                                            checked: table.getIsAllColumnsVisible(),
                                            onChange: table.getToggleAllColumnsVisibilityHandler(),
                                        }}
                                    />{' '}
                                    Toggle All
                                </label>
                            </div>
                            {table.getAllLeafColumns().map(column => {
                                return (
                                    <div key={column.id} className="px-1">
                                        <label>
                                            <input
                                                {...{
                                                    type: 'checkbox',
                                                    checked: column.getIsVisible(),
                                                    onChange: column.getToggleVisibilityHandler(),
                                                }}
                                            />{' '}
                                            {column.id}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>}
                    </div>
                </div>
            </ClickAwayListener>
        </div>
    )
}