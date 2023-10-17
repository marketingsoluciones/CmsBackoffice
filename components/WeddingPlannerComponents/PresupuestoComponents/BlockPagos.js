import React, { useContext, useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
/* import { EventContextProvider } from "../../context"; */
/* import FormEditarPago from "../Forms/FormEditarPago"; */
/* import { EditarIcon } from "../icons"; */
/* import { capitalize } from '../../utils/Capitalize'; */
import { getCurrency, capitalize } from "./Funciones";


export const BlockPagos = ({categorias}) => {
    const [active, setActive] = useState(0);

    const ListaTabs = [
        { title: "todos" },
        { title: "pagados" },
        { title: "Pendientes" },
    ];

    return (
        <div
            className="w-full max-w-screen-lg relative mx-auto inset-x-0"
        >

            <div className="bg-white p-6 h-max shadow-md rounded-xl mt-10 overflow-x-auto ">
                <TablaDatosPagos active={active} categorias={categorias} />
            </div>
        </div>
    );
};



const TablaDatosPagos = ({categorias}) => {
    /* const { event, currencyState } = EventContextProvider() */
    /* const categorias = event?.presupuesto_objeto?.categorias_array; */
    const [PagosOrFormAdd, setShowPagos] = useState(true)
    const [PagoID, setPagoID] = useState("")

    const Columna = useMemo(
        () => [
            {
                Header: "Estado",
                accessor: "estado",
                id: "estado",
                Cell: (props) => {
                    const [value, setValue] = useState(props?.value);
                    useEffect(() => {
                        setValue(props?.value)
                    }, [props?.value])
                    return (
                        <div className="grid place-items-center h-full w-full">
                            <p
                                className={`${value == "pendiente" ? "text-red" : "text-green"
                                    } font-display font-medium capitalize`}
                            >
                                {value}
                            </p>
                        </div>
                    );
                },
            },
            {
                Header: "Gasto",
                accessor: "nombreGasto",
                id: "gasto",
                Cell: (props) => {
                    const [value, setValue] = useState();
                    useEffect(() => {
                        setValue(props?.value)
                    }, [props?.value])
                    return (
                        <div className="w-full ">
                            <p className="font-display font-semibold text-gray-500 text-lg *md:text-left leading-5 ">
                                {capitalize(value)} <br />
                                <span className="text-xs font-light">{capitalize(props?.row?.original?.nombreCategoria)}</span>
                            </p>
                        </div>
                    );
                },
            },
            {
                Header: "Detalles",
                accessor: "fecha_pago",
                id: "detalles",
                Cell: (props) => {
                    const [value, setValue] = useState();
                    useEffect(() => {
                        setValue(props?.value)
                    }, [props?.value])
                    return (
                        <div className="font-display text-gray-500 flex items-center justify-center flex-col h-full   ">
                            {value && <p className="w-2/4">Pagado el {value}</p>}
                        </div>
                    );
                },
            },
            {
                Header: "Importe",
                accessor: "importe",
                id: "importe",
                Cell: (props) => {
                    const [value, setValue] = useState(props?.value);
                    useEffect(() => {
                        setValue(props?.value)
                    }, [props?.value])
                    return (
                        <div className="font-display font-semibold text-gray-500 text-lg grid place-items-center h-full ">
                            <p className="w-4/5">{getCurrency(value, /* currencyState */ "EUR")}</p>
                        </div>
                    );
                },
            },
            {
                Header: "",
                accessor: "editar",
                id: "editar",
                Cell: (props) => {
                    const handleEdit = () => {
                        try {
                            setShowPagos(!PagosOrFormAdd)
                        } catch (error) {
                            console.log(error)
                        } finally {
                            setPagoID(props?.row?.original?._id)
                        }
                    }

                    return (
                        <div onClick={handleEdit} className=" w-10 rounded-md hover:shadow-md hover:bg-gray-300 grid place-items-center h-full right-0 mx-auto">
                            {/* <EditarIcon className="w-5 h-5" /> */}x
                        </div>
                    );
                },
            },
        ],
        [/* currencyState */]
    );

    //Recorrer cada categoria
    const data = categorias?.reduce((acc, categoria) => {
        if (categoria?.gastos_array?.length >= 1) {
            // Recorrer cada gasto
            const reduce = categoria?.gastos_array?.reduce((arr, gasto) => {
                if (gasto?.pagos_array?.length >= 1) {

                    // Recorrer cada pago
                    const reducePagos = gasto?.pagos_array?.reduce((arrPagos, pago) => {
                        const objetoNuevo = {
                            ...pago,
                            idCategoria: categoria?._id,
                            nombreCategoria: categoria?.nombre,
                            idGasto: gasto?._id,
                            nombreGasto: gasto?.nombre
                        }
                        arrPagos?.push(objetoNuevo);
                        return arrPagos

                    }, [])
                    arr = [...arr, ...reducePagos]
                }
                return arr;
            }, []);

            if (reduce.length >= 1) {
                acc = [...acc, ...reduce];
            }
        }
        return acc;
    }, []);





    return (
        <>
            {PagosOrFormAdd
                ? <DataTable columns={Columna} data={data} />
                : (
                    <div className="bg-white  p-6">
                        <p onClick={() => setShowPagos(!PagosOrFormAdd)} className="absolute font-display text-xl transform transition top-5 right-5 text-gray-500 hover:scale-125 cursor-pointer">X</p>
                        {/* <FormEditarPago ListaPagos={data} IDPagoAModificar={PagoID} set={act => setShowPagos(act)} state={PagosOrFormAdd} /> */}
                    </div>
                )
            }

        </>
    )
};

const DataTable = ({ columns, data }) => {

    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
        useTable({ columns, data });
    const colSpan = {
        0: 1,
        1: 2,
        2: 2,
        3: 2,
        4: 1,
    };
    const colSpanMovil = {
        0: 1,
        1: 1,
        2: 1,
        3: 1,
        4: 1,
    };
    return (
        <div className="w-full  ">
            <table {...getTableProps()} className="table w-full rounded-lg relative overflow-x-auto    ">
                <thead className="w-full  ">
                    {headerGroups.map((headerGroup, id) => (
                        <tr
                          /*   {...headerGroup.getHeaderGroupProps()} */
                            className="w-full grid grid-cols-4 md:grid-cols-8 py-2 bg-gray-100 uppercase"
                            key={id}
                        >
                            {headerGroup.headers.map((column, idx, id) => (
                                <th
                                    /* {...column.getHeaderProps()} */
                                    className={`font-display  font-light text-gray-500 text-sm col-span-${colSpanMovil[idx]} md:col-span-${colSpan[idx]} `}
                                    key={id}
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} className="text-gray-500 text-sm  overflow-x-auto   ">
                    {rows.length >= 1 ? rows.map((row, id) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                className="w-full transition border-b border-base hover:bg-base cursor-pointer w-full grid grid-cols-5* md:grid-cols-8 "
                                key={id}
                            >
                                {row.cells.map((cell, idx) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            key={idx}
                                            className={`font-display text-sm text-center  py-2 col-span-${colSpanMovil[idx]}  md:col-span-${colSpan[idx]}`}
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    }) : <tr className="w-full transition border-b border-base hover:bg-base cursor-pointer w-full grid place-items-center">
                        <td className="py-5 font-display text-lg text-gray-500 uppercase ">No hay pagos asociados</td></tr>}
                </tbody>
            </table>
        </div>
    );
};
