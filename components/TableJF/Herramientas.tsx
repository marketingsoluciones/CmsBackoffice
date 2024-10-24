import ClickAwayListener from "react-click-away-listener"
import { GrDocumentPdf } from "react-icons/gr"
import { RiFileExcel2Fill } from "react-icons/ri"
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoGear } from "react-icons/go";
import { GoFilter } from "react-icons/go";
import { GoPlus } from "react-icons/go";
import { IoIosStarOutline } from "react-icons/io";
import { Modal } from "../modals/Modal";
import { Form, Formik } from "formik";
import InputFieldTSX from "../formularios/Inputs/InputFieldTSX";
import { ArrowDownIcon } from "lucide-react";
import { SelectFieldTSX } from "../formularios/Inputs/SelectFieldTSX";



export const Herramientas = ({ setShowPreviewPdf, setColumnsView, columnsView, table, columns }) => {
    const [favoriteFilterView, setFavoriteFilterView] = useState(false)
    const [ToolsViw, setToolsView] = useState(false)

    return (
        <div className="space-x-1 flex pr-2 pl-1">
            < FavoriteFilter setFavoriteFilterView={setFavoriteFilterView} favoriteFilterView={favoriteFilterView} columns={columns} />
            < Filter setColumnsView={setColumnsView} columnsView={columnsView} table={table} />
            < Tools setToolsView={setToolsView} ToolsViw={ToolsViw} table={table} setShowPreviewPdf={setShowPreviewPdf} />
        </div>
    )
}

export const Tools = ({ setToolsView, ToolsViw, table, setShowPreviewPdf }) => {
    return (
        <div className="relative">
            <div className={`${ToolsViw ? "bg-slate-200 rounded-full h-7 w-7 " : ""} h-7 w-7 flex items-center justify-center `}>
                <BsThreeDotsVertical onClick={() => setToolsView(!ToolsViw)} className="w-5 h-5 cursor-pointer" />
            </div>
            {ToolsViw &&
                <ClickAwayListener onClickAway={() => ToolsViw && setToolsView(!ToolsViw)}>
                    <div className="bg-white w-max h-max border border-gray-300 shadow rounded-md absolute translate-y-2 p-3 -left-7 space-y-3 z-50 " >
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
            <div className={`${columnsView ? "bg-slate-200 rounded-full h-7 w-7 " : ""} h-7 w-7 flex items-center justify-center `} >

                <GoGear onClick={() => setColumnsView(!columnsView)} className="w-5 h-5 cursor-pointer" />
            </div>
            {columnsView &&
                <ClickAwayListener onClickAway={() => columnsView && setColumnsView(!setColumnsView)}>
                    <div className="bg-white w-[250px] h-max border border-gray-300 shadow rounded-md absolute -translate-x-[200px] translate-y-2 z-50 " >
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
                        {/* <div className="flex items-center justify-between p-3 bg-gray-100">
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
                        </div> */}

                    </div>
                </ClickAwayListener>
            }
        </div >
    )
}


export const FavoriteFilter = ({ setFavoriteFilterView, favoriteFilterView, columns }) => {
    const [openModalCrearFilter, setOpenModalCrearFilter] = useState({ state: false, type: "crear" })
    const [isHovered, setIsHovered] = useState(false);
    console.log(isHovered)
    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };
    const columnsTableArray = columns.map(objeto => objeto.id);
    const optionsEjemplo = [
        "estatus",
        "fecha",
        "babyshower",
        "graduación",
        "bautizo",
        "comunión",
        "desdepida de soltero",
        "otro",
    ]
    const Visibilidad = [
        "Privada",
        "Publica",
    ]

    const initialValues = {
        name: "",
    }

    const handelsumbit = () => {
        setOpenModalCrearFilter({state:!openModalCrearFilter.state, type:null})
    }



    return (
        <div className="relative ">
            <div className={`${favoriteFilterView ? "bg-slate-200 rounded-full h-7 w-7 " : ""} h-7 w-7 flex items-center justify-center `}>
                <GoFilter onClick={() => setFavoriteFilterView(!favoriteFilterView)} className={` w-5 h-5 cursor-pointer`} />
            </div>
            {favoriteFilterView &&
                <ClickAwayListener onClickAway={() => favoriteFilterView && setFavoriteFilterView(!favoriteFilterView)}>
                    <div className=" bg-white w-[250px] h-max border border-gray-300 shadow rounded-md absolute -translate-x-[200px] translate-y-2 z-50 " >
                        <div className="px-3 pt-3">
                            <label className="font-semibold text-[14px]">
                                Filtros
                            </label>
                        </div>
                        <div className="py-4 ">
                            <div className={`flex justify-between pr-2 hover:bg-gray-100 px-3`} onMouseOver={handleMouseOver} onMouseLeave={handleMouseOut}>
                                <div className="px-1 py-1 flex items-center justify-center space-x-1">
                                    <input
                                        {...{
                                            type: 'checkbox',
                                        }}
                                    />{' '}
                                    <label>
                                        filtro 1
                                    </label>
                                </div>
                                <div className={`cursor-pointer flex space-x-2 ${isHovered ? "" : "hidden"}`}>
                                    <IoIosStarOutline
                                        className="h-6 w-4"
                                    />
                                    <MdOutlineEdit
                                        onClick={() => setOpenModalCrearFilter({state:!openModalCrearFilter.state, type:"editar"})}
                                        className="h-6 w-4"
                                    />
                                </div>
                            </div>
                            

                            {/* {table.getAllLeafColumns().map(column => {
                                return (
                                    <div className="flex justify-between pr-2">
                                        <div key={column.id + 1} className="px-1 py-1 flex items-center justify-center space-x-1">
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
                            })} */}
                        </div>
                        <div onClick={() => setOpenModalCrearFilter({state:!openModalCrearFilter.state, type:"crear"})} className="flex items-center font-semibold  justify-center p-3 bg-gray-100 hover:bg-gray-200 cursor-pointer">
                            <GoPlus className="h-5 w-5 cursor-pointer" />
                            <label className="cursor-pointer" >
                                Agregar nuevo filtro
                            </label>
                        </div>
                    </div>
                </ClickAwayListener>
            }
            {
                openModalCrearFilter.state &&
                <Modal classe={"md:w-[30%] h-max"}>
                    <Formik initialValues={initialValues} onSubmit={handelsumbit}>
                        <Form>
                            <div className="space-y-5 flex flex-col justify-center">
                                <div>
                                    <span className="text-xl">
                                        Personaliza Tu Filtro:
                                    </span>
                                </div>
                                <div className="flex justify-center space-x-4 ">
                                    <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                                        <label className="text-md">Nombre de la plantilla:</label>
                                        <InputFieldTSX
                                            name="name"
                                            className="focus:outline-none border border-gray-300 rounded-md px-3 w-[100%] truncate mt-1"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1 mb-5 md:mb-0 ">
                                        <label className="text-md">Visibilidad:</label>
                                        <SelectFieldTSX
                                            name="producto"
                                            className=" capitalize cursor-pointer text-sm  border border-gray-300  transition w-full py-1 px-2 mt-1 rounded-lg focus:outline-none "
                                            options={Visibilidad}
                                            icon={<ArrowDownIcon className="h-4 w-4" />}
                                            iconClassName="top-[9px] right-2 text-gray-600"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center bg-gray-100 p-2 rounded-md space-y-2">
                                    <label className="w-full text-md">Criterios para tu filtro:</label>
                                    <div className="flex space-x-2 ">
                                        <SelectFieldTSX
                                            name="columns"
                                            className=" capitalize cursor-pointer text-sm  border border-gray-300  transition w-full py-1 pl-2 pr-5 mt-1 rounded-lg focus:outline-none truncate "
                                            options={columnsTableArray}
                                            icon={<ArrowDownIcon className="h-4 w-4" />}
                                            iconClassName="top-[9px] right-2 text-gray-600"
                                        />
                                        <SelectFieldTSX
                                            name="type"
                                            className=" capitalize cursor-pointer text-sm  border border-gray-300  transition w-full py-1 pl-2 pr-5 mt-1 rounded-lg focus:outline-none truncate "
                                            options={optionsEjemplo}
                                            icon={<ArrowDownIcon className="h-4 w-4" />}
                                            iconClassName="top-[9px] right-2 text-gray-600"
                                        />
                                        <SelectFieldTSX
                                            name="estado"
                                            className=" capitalize cursor-pointer text-sm  border border-gray-300  transition w-full py-1 px-2 mt-1 rounded-lg focus:outline-none "
                                            options={optionsEjemplo}
                                            icon={<ArrowDownIcon className="h-4 w-4" />}
                                            iconClassName="top-[9px] right-2 text-gray-600"
                                        />
                                    </div>
                                    <button type="button" className="hover:text-gray-700">+ Agregar criterio </button>
                                </div>
                                <div className="space-x-4 flex justify-center ">
                                    <button type="button" className={`${openModalCrearFilter.type == "editar"? "":"hidden"} px-3 py-1 bg-red-600 rounded-lg  text-white w-20`}>
                                        Borrar
                                    </button>
                                    <button onClick={() => setOpenModalCrearFilter({state:!openModalCrearFilter.state, type:null})} type="button" className="px-3 py-1 bg-gray-400 rounded-lg  text-white w-20">
                                        Cancelar
                                    </button>
                                    <button type="submit" className="px-3 py-1 bg-acento rounded-lg  text-white w-20">
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </Modal>
            }
        </div >
    )
}


