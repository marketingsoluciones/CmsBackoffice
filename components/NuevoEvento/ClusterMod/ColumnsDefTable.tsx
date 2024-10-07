import { FC, useMemo } from "react";
import { AuthContextProvider } from "../../../context";
import { ModalRight } from "../../modals/ModalRight";
import { FormDataProspecto } from "../../formularios/FormDataProspecto"
import { TableCompleto } from "../../TableJF/TableCompleto";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {childrenSchema, SchemaChildren } from "../../../utils/schemas";
import { useRouter } from "next/router";

interface props {
  schemaChildren: SchemaChildren[]
}

export const ColumnsDefTable: FC<props> = ({ schemaChildren }) => {
  const router = useRouter()
  const { openModalRight, setOpenModalRight } = AuthContextProvider()
  const columnHelperFactura = createColumnHelper<any>()

  const f1 = schemaChildren?.findIndex((elem) => elem.route === `${router.asPath.split("/")[1]}/${router.query.slug[0]}`)
  const schemaArr = schemaChildren[f1]?.schema ? [...schemaChildren[f1]?.schema] : []


  const columnsDef = useMemo<ColumnDef<any>[]>(
    () => schemaArr?.map((item: childrenSchema) => {
      const colum = columnHelperFactura.accessor(item?.accessor, {
        id: item?.accessor,
        header: () => <span>{item?.Header}</span>,
        cell: info => <div /* onClick={() => handleGetFactura(info.getValue())} */ className="text-center">{/* {info.getValue()} */}</div>,
        footer: info => info.column.id,
        filterFn: item?.filterFn,
        sortingFn: item?.sortingFn,
      })
      return colum
    }), [router?.asPath])


  return (
    <>
      <h1 className="text-[20px] pb-2">{schemaChildren[f1]?.title}</h1>
      <TableCompleto columnsDef={columnsDef} />
    </>
  )
}