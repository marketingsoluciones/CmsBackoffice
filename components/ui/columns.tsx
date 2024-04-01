"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Checkbox } from "../ui"
import { IoIosMore, IoIosWarning } from "react-icons/io";
import { LuArrowUpDown } from "react-icons/lu";
import { FaPhoneVolume } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { AuthContextProvider } from "../../context";



// type Columns de estado de referido
export type UserER = {
    id: string
    nombre: string
    estado: "Bloqueado" | "Activo" | "Inactivo" | "En espera"
    fecha: string
    facturacionEvento: string
    facturacionSAAS: string
    SaasEventos: string
    amount: number
}
// Columns de estado de referido
export const columnsER: ColumnDef<UserER>[] = [
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

// type Columns de Recomendaciones y Recompensas
export type UserRCRC = {
    id: string
    referido: string
    producto: string
    fuente: string
    estadoRecompensa: "Bloqueado" | "Disponible" | "En espera" | "Sin servicios"
    fecha: string
    amount: string
}
// Columns de Recomendaciones y Recompensas
export const columnsRCRC: ColumnDef<UserRCRC>[] = [
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
        accessorKey: "referido",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Referido
                    <LuArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const { openModalRight, setOpenModalRight } = AuthContextProvider()

            return (
                <div className=" cursor-pointer"
                    onClick={() => setOpenModalRight({ data: { title: row.original.referido }, state: true })}
                >
                    {row.original.referido}
                </div>
            )
        }
    },
    {
        accessorKey: "producto",
        header: "Producto",
    },
    {
        accessorKey: "fuente",
        header: "Fuente",
    },
    {
        accessorKey: "estadoRecompensa",
        header: "Estado de recompensa",
        cell: ({ row }) => {
            return (
                <div>
                    {(() => {
                        if (row.original.estadoRecompensa == "Disponible") {
                            return (
                                <div className="text-verde flex items-center space-x-1">
                                    <span>
                                        {row.original.estadoRecompensa}
                                    </span>
                                </div>
                            )
                        }
                        if (row.original.estadoRecompensa == "En espera") {
                            return (
                                <div className="text-yellow-600 flex items-center space-x-1">
                                    <span>
                                        {row.original.estadoRecompensa}
                                    </span>
                                </div>
                            )
                        }
                        if (row.original.estadoRecompensa == "Bloqueado") {
                            return (
                                <div className="text-red-600 flex items-center space-x-1">
                                    <span>

                                        {row.original.estadoRecompensa}
                                    </span>
                                </div>
                            )
                        }
                        if (row.original.estadoRecompensa == "Sin servicios") {
                            return (
                                <div className="text-gray-500 flex items-center space-x-1">
                                    <span>
                                        {row.original.estadoRecompensa}
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
        accessorKey: "amount",
        header: "Cantidad",
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

// type monedero
export type UserM = {
    id: string
    fecha: string
    documento: string
    descripcion: string
    deuda: string
    haber: string
    amount: number
}
// Columns de monedero
export const columnsM: ColumnDef<UserM>[] = [
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
        accessorKey: "fecha",
        header: "Fecha de creacion",
    },
    {
        accessorKey: "documento",
        header: "Documento",
        cell: ({ row }) => {
            return (
                <div className="">
                    {row.original.documento}
                </div>
            )
        }
    },
    {
        accessorKey: "descripcion",
        header: "Descripcion",
    },
    {
        accessorKey: "deuda",
        header: "Debe",
    },
    {
        accessorKey: "haber",
        header: "Haber",
        cell: ({ row }) => {
            return (
                <div>
                    {(() => {
                        return (
                            <div>
                                {row.original.haber}
                            </div>
                        )
                    })()}
                </div>
            )
        }
    },
    {
        accessorKey: "amount",
        header: "Saldo",
        cell: ({ row }) => {
            return (
                <div>
                    {(() => {
                        return (
                            <div>
                                {row.original.amount}
                            </div>
                        )
                    })()}
                </div>
            )
        }
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