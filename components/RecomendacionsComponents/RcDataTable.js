import { DataTable, User, columns, DataBase } from "../ui"


export const RcDataTable = () => {


    return (
        <>
            <DataTable columns={columns} data={DataBase} />
        </>
    )
}