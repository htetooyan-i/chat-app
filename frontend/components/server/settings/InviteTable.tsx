"use client"
import * as React from "react"
import {
    ColumnFiltersState,
    getFilteredRowModel,
    VisibilityState,
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Spinner from '@/components/ui/Loader';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import InviteServerModal from "../InviteServerModal"

interface InviteTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    noDataMessage?: string,
    loading?: boolean,
    footer?: React.ReactNode,
    className?: string
}



export function InviteTable<TData, TValue>({
    columns,
    data,
    noDataMessage = "No data available.",
    loading = false,
    footer,
    className
}: InviteTableProps<TData, TValue>) {

    const [showInviteModal, setShowInviteModal] = useState(false);

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({})
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

  return (
    <div className={`w-full ${className} flex flex-col gap-4`}>
        <InviteServerModal
            show={showInviteModal}
            onClose={() => setShowInviteModal(false)}
            fromSettings={true}
        />
        <header className='pt-2 flex items-center justify-between gap-4 flex-shrink-0'>
            <div className='w-full flex items-center justify-between mb-4'>
                <p className='uppercase text-[12px] font-bold'>Active invite codes</p>
                <div className='flex gap-2'>
                    <button
                        disabled
                        className='cursor-not-allowed text-[12px] px-2 py-1 bg-muted-background text-error border border-muted-border rounded hover:bg-muted-background/70 transition-colors font-semibold'
                    >
                        Pause Invites
                    </button>
                    <button
                        className='cursor-pointer text-[12px] px-2 py-1 bg-accent text-white rounded hover:bg-accent/80 transition-colors font-semibold'
                        onClick={() => setShowInviteModal(true)}
                    >
                        Create Invite
                    </button>
                </div>
            </div>
        </header>
        <Table className={`min-w-full w-max overflow-hidden rounded-md bg-muted-background`}>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                    return (
                        <TableHead key={header.id}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </TableHead>
                    )
                    })}
                </TableRow>
                ))}
            </TableHeader>
        <TableBody>
            {loading ? (
                <TableRow>
                    <TableCell colSpan={columns.length} className="py-10 text-center">
                        <Spinner size="large" />
                    </TableCell>
                </TableRow>
            ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                >
                    {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        {noDataMessage}
                    </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
    </div>
  )
}