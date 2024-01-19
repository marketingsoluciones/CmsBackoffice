import { DataTable, User, DataBase } from "../ui"


export const RcDataTable = ({columns}) => {


    return (
        <>
            <DataTable columns={columns} data={DataBase} />
        </>
    )
}