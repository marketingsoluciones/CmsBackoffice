import { FC, useMemo } from "react";
import { AuthContextProvider } from "../../../context";
import { ModalRight } from "../../modals/ModalRight";
import { FormDataProspecto } from "../../formularios/FormDataProspecto"
import { TableCompleto } from "../../TableJF/TableCompleto";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { childrenSchema, SchemaChildren } from "../../../utils/schemas";
import { useRouter } from "next/router";

interface props {
  schemaChildren: SchemaChildren[]
  ButtonActive: any
  title: any
}

export const ColumnsDefTable: FC<props> = ({ schemaChildren, ButtonActive, title }) => {
  const router = useRouter()
  const { dispatch } = AuthContextProvider()
  const columnHelperFactura = createColumnHelper<any>()
  const f1 = schemaChildren?.findIndex((elem) => elem.route === `${router.asPath.split("/")[1]}/${router.query.slug[0]}`)
  const itemSchema = schemaChildren[f1]
  const schemaArr = itemSchema?.schema ? [...itemSchema?.schema] : []

  function transformColumnArray(columnArray) {
    return columnArray.reduce((acc, column) => {
      acc[column.accessor] = column.visibility != undefined ? column.visibility : false
      return acc;
    }, {});
  }

  const transformedObject = transformColumnArray(schemaArr);

  const columnsDef = useMemo<ColumnDef<any>[]>(
    () => schemaArr?.map((item: childrenSchema) => {
      const colum = columnHelperFactura.accessor(item?.accessor, {
        id: item?.accessor,
        header: () => <span>{item?.Header}</span>,
        cell: info => <div
          onClick={(e: any) => { item.Cell }}
          onDoubleClick={(e: any) => {
            e.stopPropagation()
          }} className="text-left truncate pr-10">{info.getValue()}</div>,
        footer: info => info.column.id,
        filterFn: item?.filterFn,
        sortingFn: item?.sortingFn,
      })
      return colum
    }), [router?.asPath])


  return (
    <>
      <div className="flex items-center justify-between py-2 ">
        <h1 className="text-[20px] ">{schemaChildren[f1]?.title}</h1>
        {
          ButtonActive &&
          <button className="bg-rosa rounded-lg px-4 py-1 text-white text-base " onClick={() => dispatch({ type: "CREATE", payload: {} })}>
            {title ? title : "sin titulo"}
          </button>
        }
      </div>
      <TableCompleto columnsDef={columnsDef} itemSchema={itemSchema} transformedObject={transformedObject} />
    </>
  )
}