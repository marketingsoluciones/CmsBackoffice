import { FC, useMemo } from "react";
import { AuthContextProvider } from "../../../context";
import { ModalRight } from "../../modals/ModalRight";
import { FormDataProspecto } from "../../formularios/FormDataProspecto"
import { TableCompleto } from "../../TableJF/TableCompleto";
import { fuzzySort } from "../../TableJF";
import { AccessorFn, AccessorFnColumnDefBase, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Prospectos } from "../../../utils/Interfaces";
import { BodyStaticAPP, childrenSchema } from "../../../utils/schemas";
import { useRouter } from "next/router";

// export interface childrenSchema {
//   Header: string
//   accessor: string
//   enableHiding: string
//   filterFn: AccessorFn<any>
// }


export const BuzonProspectos: FC = () => {
  const router = useRouter()

  const { openModalRight, setOpenModalRight } = AuthContextProvider()
  const columnHelperFactura = createColumnHelper<any>()
  const f1 = BodyStaticAPP?.findIndex((elem) => elem.route === router.asPath.split("/")[1])
  const f2 = BodyStaticAPP[f1].children?.findIndex((elem) => elem.route === `${router.asPath.split("/")[1]}/${router.query.slug[0]}`)
  const schemaArr = [...BodyStaticAPP[f1]?.children[f2]?.schema]
  console.log(1002, schemaArr)
  schemaArr?.map((item: childrenSchema) => { console.log(1004, item.accessor) })

  const columnsDef = useMemo<ColumnDef<any>[]>(
    () => schemaArr?.map((item: childrenSchema) => {
      console.log(1001, router.asPath, router.query.slug, schemaArr.length)
      const colum = columnHelperFactura.accessor(item?.accessor, {
        id: item?.accessor,
        header: () => <span>{item?.Header}</span>,
        cell: info => <div /* onClick={() => handleGetFactura(info.getValue())} */ className="text-center">{/* {info.getValue()} */}</div>,
        footer: info => info.column.id,
        filterFn: item?.filterFn,
        sortingFn: item?.sortingFn,
      })
      console.log(1005, colum)
      return colum
    }), [router?.asPath])

  console.log(1001, columnsDef)

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
      {openModalRight?.state ?
        <ModalRight state={openModalRight} set={setOpenModalRight} styles={"px-3 py-[10px]"}>
          <FormDataProspecto data={openModalRight.data} />
        </ModalRight>
        : null
      }
    </>
  )
}