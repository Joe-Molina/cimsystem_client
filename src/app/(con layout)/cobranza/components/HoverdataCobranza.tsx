
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function HoverDataCobranza({ socio }: { socio: { total_divisa: number, cant_cuotas_vencidas: number, cargos_divisa: number, deuda_total: number } }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="w-28 font-bold justify-end p-0 ">{socio.deuda_total.toFixed(2)}$</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-120">
        <Table>
          <TableCaption>Deuda del socio.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>cuotas vencidas</TableHead>
              <TableHead>cargos</TableHead>
              <TableHead>Mantenimiento</TableHead>
              <TableHead>total de deuda</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="text-center text-sm bg-neutral-100 rounded-lg">
              <TableCell>{socio.cant_cuotas_vencidas}</TableCell>
              <TableCell>{socio.cargos_divisa ? socio.cargos_divisa : 0}$</TableCell>
              <TableCell>{socio.total_divisa ? socio.total_divisa.toFixed(2) : 0}$</TableCell>
              <TableCell className="font-bold ">{socio.deuda_total.toFixed(2)}$</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </HoverCardContent>
    </HoverCard>
  )
}
