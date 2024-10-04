import { useMemo } from "react"
import { BodyStaticAPP } from "../../../utils/schemas"
import { TableCompleto } from "../../TableJF/TableCompleto"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { fuzzySort } from "../../TableJF"
interface Child {
    route: string;
    schema: any; // Ajusta el tipo según sea necesario
    // otras propiedades
}

interface Parent {
    title: string;
    children?: Child[];
    // otras propiedades
}

export const InvitadosCloster = () => {
    const columnHelperFactura = createColumnHelper()
    const f1 = BodyStaticAPP?.findIndex((elem) => elem.title === "Formacion Enterprice")
    const f2 = BodyStaticAPP[f1].children?.findIndex((elem) => elem.route === "Cluster/Invitados")
    const schemaArr = BodyStaticAPP[f1]?.children[f2]?.schema


    const columnsDef = useMemo<ColumnDef<any>[]>(
        () => schemaArr?.map((item: any) => {
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

    return (
        <>
            <h1 className="text-[20px] pb-2 ">Tus Invitados</h1>
            <TableCompleto columnsDef={columnsDef} />
        </>
    )
}