"use client"
import * as React from "react"
import {
    ColumnFiltersState,
    getFilteredRowModel,
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
import Spinner from '@/components/ui/Loader';
import { Input } from "@/components/ui/input"

interface ServerDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    noDataMessage?: string,
    loading?: boolean,
    footer?: React.ReactNode,
    className?: string
}

export function ServerDataTable<TData, TValue>({
    columns,
    data,
    noDataMessage = "No data available.",
    loading = false,
    footer,
    className
}: ServerDataTableProps<TData, TValue>) {


    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    })

  return (
    <div className={`w-full ${className} flex flex-col gap-4`}>
        <header className='pt-2 flex items-center justify-between gap-4 flex-shrink-0'>
            <p className="text-[15px] font-bold text-foreground shrink-0">Recent Members</p>
            {/* Filter and Sort Options */}
            <div className="flex-1 flex items-center gap-2">
                <Input type="text" className="bg-chat-panel border border-muted-border rounded-md px-2 py-1 text-sm outline-none focus:ring-0 focus:border-accent" placeholder="Search members..."    
                value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("user")?.setFilterValue(event.target.value)
                }
                />

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
            <TableFooter>
                <TableRow> 
                    {footer}
                </TableRow>
            </TableFooter>
        </Table>
    </div>
  )
}