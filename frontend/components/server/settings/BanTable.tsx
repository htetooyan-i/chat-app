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

interface BanDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    noDataMessage?: string,
    loading?: boolean,
    className?: string,
    footer?: React.ReactNode,
    setSelectedBans: React.Dispatch<React.SetStateAction<any[]>>,
}

export function BanDataTable<TData, TValue>({
    columns,
    data,
    noDataMessage = "No data available.",
    loading = false,
    className,
    footer,
    setSelectedBans,
}: BanDataTableProps<TData, TValue>) {

    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = React.useState({})

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

    React.useEffect(() => {
        const selectedRows = table.getSelectedRowModel().rows;
        setSelectedBans(selectedRows.map(row => row.original));
    }, [rowSelection]);

    return (
        <div className={`w-full ${className} flex flex-col gap-4`}>
            <header className='pt-2 flex items-center justify-between gap-4 flex-shrink-0'>
                <p className="text-[15px] font-bold text-foreground shrink-0">Recent Bans</p>
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        className="bg-chat-panel border border-muted-border rounded-md px-2 py-1 text-sm"
                        placeholder="Search bans by username..."
                        value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
                        onChange={(event) => table.getColumn("user")?.setFilterValue(event.target.value)}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="default" className="ml-auto bg-accent hover:bg-accent/80 cursor-pointer">Filter Columns</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <Table className='min-w-full w-max overflow-hidden rounded-md bg-muted-background'>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
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
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
                        <TableCell colSpan={columns.length} className="px-4 py-2">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 text-sm text-muted-foreground">
                                    {table.getFilteredSelectedRowModel().rows.length} of {" "}
                                    {table.getFilteredRowModel().rows.length} bans selected.
                                </div>
                                <p className="text-left text-sm font-semibold text-muted-text">
                                    Showing {table.getFilteredRowModel().rows.length} bans
                                </p>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            {footer ? <footer>{footer}</footer> : null}
        </div>
    )
}