import React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useFacturasDetails } from '../hooks/useFacturasDetails'

interface TableProps {
  numero: string
}

export const TableFacturasDetails: React.FC<TableProps> = ({ numero }) => {

  const { DetallesFactura } = useFacturasDetails({ numero })

  return (
    <Table className='bg-zinc-50'>
      <TableHeader className=''>
        <TableRow>
          <TableHead>Descripcion</TableHead>
          <TableHead>PvP</TableHead>
          <TableHead >Cantidad</TableHead>
          <TableHead className="text-right">Importe</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DetallesFactura && DetallesFactura.map((detail, index) => (
          <TableRow key={index} className='text-zinc-600'>
            <TableCell>{detail.descripcio}</TableCell>
            <TableCell>{detail.pvp} Bs</TableCell>
            <TableCell>{detail.cantidad}</TableCell>
            <TableCell className="text-right">{detail.importe} Bs</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
