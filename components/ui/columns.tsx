"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Checkbox } from "../ui"
import { IoIosMore, IoIosWarning } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuArrowUpDown } from "react-icons/lu";
import { FaPhoneVolume } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";


export type User = {
    id: string
    nombre: string
    estado: "Bloqueado" | "Activo" | "Inactivo" | "En espera"
    fecha: string
    facturacionEvento:string
    facturacionSAAS: string
    SaasEventos: string
    amount: number
}

export const columns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                /* checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} */
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "nombre",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre
                    <LuArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            console.log(row)
            return (
                <div className="">
                    {row.original.nombre}
                </div>
            )
        }
    },
    {
        accessorKey: "estado",
        header: "Estado",
        cell: ({ row }) => {
            console.log(row)
            return (
                <div>
                    {(() => {
                        if (row.original.estado == "Activo") {
                            return (
                                <div className="text-verde flex items-center space-x-1">
                                    <FaPhoneVolume />
                                    <span>
                                        {row.original.estado}
                                    </span>
                                </div>
                            )
                        }
                        if (row.original.estado == "Inactivo") {
                            return (
                                <div className="text-yellow-600 flex items-center space-x-1">
                                    <IoIosWarning />
                                    <span>
                                        {row.original.estado}
                                    </span>
                                </div>
                            )
                        }
                        if (row.original.estado == "Bloqueado") {
                            return (
                                <div className="text-red-600 flex items-center space-x-1">
                                    <HiUsers />
                                    <span>

                                        {row.original.estado}
                                    </span>
                                </div>
                            )
                        }
                        if (row.original.estado == "En espera") {
                            return (
                                <div className="text-gray-500 flex items-center space-x-1">
                                    <HiUsers />
                                    <span>
                                        {row.original.estado}
                                    </span>
                                </div>
                            )
                        }

                    })()}
                </div>
            )
        }
    },
    {
        accessorKey: "fecha",
        header: "Fecha de creacion",
    },
    {
        accessorKey: "facturacionEvento",
        header: "Facturación de eventos", 
    },
    {
        accessorKey: "facturacionSAAS",
        header: "Facturación SAAS", 
    },
    {
        accessorKey: "SaasEventos",
        header: "Comisiones SAAS/Eventos", 
    },
    {
        id: "actions",
        /* header: <IoSettingsOutline /> , */
        cell: ({ row }) => {
            const user = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-5 p-0">
                            <span className="sr-only">Open menu</span>
                            <IoIosMore className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                            Copy user ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
