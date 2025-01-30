"use client"

import * as React from "react"
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
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  // DropdownMenuCheckboxItem,
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
import { format } from "@formkit/tempo"
import { Msj } from "./services"
import Link from "next/link"
import copy from 'copy-to-clipboard';
// import { redirect } from "next/navigation"


const enviarWs = async (data: Cobranza_info) => {

  copy(Msj.getWs(data))

  window.open(`https://api.whatsapp.com/send/?phone=58${data.celular}`, '_blank')

}
export interface Cobranza_info {
  cant_cuotas_vencidas: number;
  cargos_cantidad: number;
  cargos_divisa: number;
  accion: string;
  cedula: string;
  celular: string;
  e_mail: string;
  nombre: string;
  telefonos: string;
  total_divisa: number;
  ultimo_pago: Date;
  deuda_total: number;
}

export const columns: ColumnDef<Cobranza_info>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
    header: "nombre",
    cell: ({ row }) => (
      <div className="capitalize text-left overflow-hidden ">{row.getValue("nombre")}</div>
    ),
  },
  {
    accessorKey: "cedula",
    header: "cedula",
    cell: ({ row }) => (
      <div className="capitalize text-left">V.{row.getValue("cedula")}</div>
    ),
  },
  {
    accessorKey: "accion",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-left"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          accion
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase px-4">{row.getValue("accion")}</div>,
  },
  {
    accessorKey: "celular",
    header: "celular",
    cell: ({ row }) => (
      <div className="capitalize text-left">{row.getValue("celular")}</div>
    ),
  },
  {
    accessorKey: "e_mail",
    header: "e_mail",
    cell: ({ row }) => (
      <div className="capitalize text-left">{row.getValue("e_mail")}</div>
    ),
  },
  {
    accessorKey: "ultimo_pago",
    header: 'ultimo pago',
    cell: ({ row }) => {
      const date: Date = row.getValue("ultimo_pago")

      return <div className="font-medium"><div className="bg-slate-100 inline px-3 py-1 rounded-xl font-semibold text-neutral-600">{date ? format(date, 'short') : 'sin ultimo pago'}</div></div>
    },
  },
  {
    accessorKey: "cant_cuotas_vencidas",
    header: ({ column }) => {
      return (
        <Button
          className="text-xs text-left "
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          cuotas vencidas
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase px-5 ">{Number(row.getValue("cant_cuotas_vencidas"))}</div>,
  },
  {
    accessorKey: "total_divisa",
    header: 'mantenimientos',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_divisa"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-left font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "cargos_divisa",
    header: 'cargos',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cargos_divisa"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="font-medium">{amount ? formatted : 0}</div>
    },
  },
  {
    accessorKey: "deuda_total",
    header: 'deuda total',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("deuda_total"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-left font-bold">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const socio_data = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem

            >
              <Button rel="noopener noreferrer" onClick={enviarWs.bind(null, socio_data)}>
                Mensaje de ws
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem

            >
              <Button rel="noopener noreferrer" onClick={async () => await Msj.sentMail([socio_data])}>
                Mensaje gmail
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
            <DropdownMenuItem><Link href={`/informacion/socios/${socio_data.accion}`} target="_blank">ver detalles de pagos</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface DataTableDemoProps {
  data: Cobranza_info[];
}

export function DataTableDemo({ data }: DataTableDemoProps) {

  const [deudas, setDeudas] = React.useState(data)
  const [check, setcheck] = React.useState(false)

  React.useEffect(() => {

    if (check) {
      setDeudas(data.filter(socio => socio.cargos_cantidad > 0))
    } else {
      setDeudas(data)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obtenerRowSeleccionadas = (rows: any, deudas: Cobranza_info[]) => {
    const indices = Object.keys(rows).map(Number); // Convertir las claves a números
    const arrayFiltrado = indices.map((indice) => deudas[indice]);

    return arrayFiltrado
  }



  React.useEffect(() => { console.log(obtenerRowSeleccionadas(rowSelection, deudas)) }, [rowSelection, deudas])

  const table = useReactTable<Cobranza_info>({
    data: deudas,
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
    <div className="w-full  p-4">
      <div className="flex gap-3 items-center py-4 ">
        <Input
          placeholder="Filtar por nombres..."
          value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nombre")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filtar por cuotas vencidas..."
          type="number"
          // value={(table.getColumn("cant_cuotas_vencidas")?.getFilterValue() as number) ?? ""}
          onChange={(event) =>
            event.target.value ? setDeudas(data.filter(socio => socio.cant_cuotas_vencidas === parseInt(event.target.value))) : setDeudas(data)
          }
          className="w-56"
        />

        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" onClick={() => setcheck(!check)} />
          <Label htmlFor="airplane-mode">ver solo cargos</Label>
          <div></div>
        </div>
        {(obtenerRowSeleccionadas(rowSelection, deudas).length > 0) &&
          <Button variant="outline" className="ml-auto" onClick={async () => await Msj.sentMail(obtenerRowSeleccionadas(rowSelection, deudas))}>
            enviar correos
          </Button>
        }

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {/* {table.getFilteredSelectedRowModel().rows.length} de{" "} */}
          {table.getFilteredRowModel().rows.length} Socios en esta seccion.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
