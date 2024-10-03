import { useMemo } from "react"
import { BodyStaticAPP } from "../../../utils/schemas"
import { TableCompleto } from "../../TableJF/TableCompleto"
import { createColumnHelper } from "@tanstack/react-table";
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
    const f1 = BodyStaticAPP?.find((elem) => elem.title === "Formacion Enterprice") as Parent | undefined;
    const f2 = f1?.children?.find((elem) => elem.route === "Cluster/BuzonProspectos") as Child | undefined;
    const f3 = f2?.schema;

    const columnsDef = useMemo(
        () => f3?.map((item: any) => {
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