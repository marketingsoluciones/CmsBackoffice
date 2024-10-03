import { FC, useMemo } from "react";
import { AuthContextProvider } from "../../../context";
import { ModalRight } from "../../modals/ModalRight";
import { FormDataProspecto } from "../../formularios/FormDataProspecto"
import { TableCompleto } from "../../TableJF/TableCompleto";
import { fuzzySort } from "../../TableJF";
import { createColumnHelper } from "@tanstack/react-table";
import { BodyStaticAPP } from "../../../utils/schemas.js";

interface propsBuzonProspectos { }



export const BuzonProspectos: FC<propsBuzonProspectos> = ({ }) => {
  const { openModalRight, setOpenModalRight } = AuthContextProvider()
  const columnHelperFactura = createColumnHelper()
  const f1 = BodyStaticAPP.find((elem) => elem.title === "Formacion Enterprice")
  const f2 = f1.children.find((elem) => elem.route === "Cluster/BuzonProspectos")
  const f3 = f2.schema

  const columnsDef = useMemo(
    () => f3.map((item: any) => {
      const colum = columnHelperFactura.accessor(item.accessor, {
        id: item.accessor,
        header: () => <span>{item.Header}</span>,
        cell: info => <div /* onClick={() => handleGetFactura(info.getValue())} */ className="text-center">{/* {info.getValue()} */}</div>,
        footer: info => info.column.id,
        filterFn: item?.filterFn,
        sortingFn: fuzzySort,
      })
      return colum
    }), [])


  /* const columnsDef = useMemo<ColumnDef<Prospectos>[]>(() => [
    columnHelperFactura.accessor('_id', {
      id: '_id',
      header: () => <span>id_factura</span>,
      cell: info => <div /* onClick={() => handleGetFactura(info.getValue())}  className="text-center">{/* {info.getValue()} }</div>,
      footer: info => info.column.id,
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,
      enableHiding: false,
    }),
    columnHelperFactura.accessor('prospecto', {
      id: 'prospecto',
      header: () => <span>prospecto</span>,
      cell: info => <div /* onClick={() => handleGetFactura(info.getValue())} className="text-center">{/* {info.getValue()} }</div>,
      footer: info => info.column.id,
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,
      enableHiding: false,
    }),
    columnHelperFactura.accessor('fecha', {
      id: 'fecha',
      header: () => <span>fecha</span>,
      cell: info => <div /* onClick={() => handleGetFactura(info.getValue())}  className="text-center">{/* {info.getValue()} }</div>,
      footer: info => info.column.id,
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,
      enableHiding: false,
    }),
    columnHelperFactura.accessor('updatedAt', {
      header: () => <span>updatedAt</span>,
      cell: info => { return <div className="text-center">{getDateTime(info.getValue())}</div> },
      footer: info => info.column.id,
      enableColumnFilter: false
    }),
  ], []) */


  return (
    <>
      <h1 className="text-[20px] pb-2 ">Tus Prospectos</h1>
      <TableCompleto columnsDef={columnsDef} />
      {
        openModalRight?.state ?
          <ModalRight state={openModalRight} set={setOpenModalRight} styles={"px-3 py-[10px]"}>
            <FormDataProspecto data={openModalRight.data} />
          </ModalRight>
          : null
      }
    </>

  )
}