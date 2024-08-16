"use client"

import * as React from "react"
import { Star, StarOff, ChevronsUpDown } from "lucide-react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CustomLink } from "../CustomLink"
import Link from "next/link"

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    lastPrice: 700,
    time: "24h %",
    marketCap: "$880,423,640,582",
    coin: "Bitcoin",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    lastPrice: 700,
    time: "24h %",
    marketCap: "$880,423,640,582",
    coin: "Ethereum",
  },
  {
    id: "derv1ws0",
    amount: 837,
    lastPrice: 700,
    time: "24h %",
    marketCap: "$880,423,640,582",
    coin: "Binance",
  },
  {
    id: "5kma53ae",
    amount: 874,
    lastPrice: 700,
    time: "24h %",
    marketCap: "$880,423,640,582",
    coin: "Tether",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    lastPrice: 700,
    time: "24h %",
    marketCap: "$880,423,640,582",
    coin: "Solana",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    lastPrice: 700,
    time: "24h %",
    marketCap: "$880,423,640,582",
    coin: "XRP",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    lastPrice: 700,
    time: "24h %",
    marketCap: "$880,423,640,582",
    coin: "Cardona",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    lastPrice: 700,
    time: "24h %",
    marketCap: "$880,423,640,582",
    coin: "Avalanche",
  },
]

export type Payment = {
  id: string
  amount: number
  lastPrice: number
  time: string
  marketCap: string
  coin: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div
        onClick={() => table.toggleAllPageRowsSelected()}
        className="cursor-pointer"
      >
        {table.getIsAllPageRowsSelected() ? (
          <Star className="h-4 w-4 text-yellow-400" />
        ) : (
          <Star className="h-4 w-4" />
        )}
      </div>
    ),
    cell: ({ row }) => (
      <div
        onClick={() => row.toggleSelected()}
        className="cursor-pointer"
      >
        {row.getIsSelected() ? (
          <Star className="h-4 w-4 text-yellow-400" />
        ) : (
          <Star className="h-4 w-4" />
        )}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "#",
    cell: ({ row }) => {
      const rowNumber = row.index + 1;
      return (
        <div className="capitalize">{rowNumber}</div>
      );
    },
  },
  {
    accessorKey: "coin",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("coin")}</div>,
  },
  {
    accessorKey: "lastPrice",
    header: () => <div className="text-right">Last Price</div>,
    cell: ({ row }) => {
      const lastPrice = parseFloat(row.getValue("lastPrice"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(lastPrice)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "time",
    header: () => <div className="text-right">24h %</div>,
    cell: ({ row }) => (
      <div className="text-right capitalize">{row.getValue("time")}</div>
    ),
  },
  {
    accessorKey: "marketCap",
    header: () => <div className="text-right">Market Cap</div>,
    cell: ({ row }) => (
      <div className="text-right capitalize">{row.getValue("marketCap")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Last 7 Days</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <Button className="bg-brand-surfaceMain text-brand-onSurface hover:bg-brand-primary hover:text-brand-surfaceMain">
            <Link href="/signup">Trade</Link>
          </Button>
        </div>
      )
    },
  },
]

export function MarketTrend() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    // <section className="bg-brand-surface dark:bg-brand-bg font-DMSans py-10 lg:py-20">
    <section className="pb-24">
      <div className="container">
        <article className="flex items-center justify-between">
          <h2 className="text-clamp-slg font-bold max-w-[30rem] leading-none">Market Update</h2>
          <CustomLink href={"/"} textarea={"See All Coins"} />
        </article>
        <div className="flex items-center justify-end py-4">
          <Input
            placeholder="Filter coin name..."
            value={(table.getColumn("coin")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("coin")?.setFilterValue(event.target.value)
            }
            className="w-full sm:max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
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
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
