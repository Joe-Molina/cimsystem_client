import React from 'react'
import { useInvitados } from '../hooks/useGetGuests'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from 'date-fns'

interface InvitadosProps {
  accion: string
}

export const Invitados: React.FC<InvitadosProps> = ({ accion }) => {
  const { invitados } = useInvitados({ accion })

  return (
    <section className="w-full z-30 overflow-auto max-h-[43vh] overflow-x-hidden text-sm ">
      <Table>
        <TableCaption>Lista de Invitados</TableCaption>
        <TableHeader >
          <TableRow >
            <TableHead className="w-[300px] text-black">Nombre</TableHead>
            <TableHead className='text-black'>Cedula</TableHead>
            <TableHead className='text-black'>fecha</TableHead>
            <TableHead className='text-black'>Id Invitado</TableHead>
            <TableHead className="text-right text-black">Tipo Invitado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='text-zinc-500 gap-3'>
          {invitados && invitados.map((inv) => (
            <TableRow key={inv.id_invit} className=''>
              <TableCell className="font-medium p-3">{inv.nombre_i}</TableCell>
              <TableCell>{inv.cedula_i}</TableCell>
              <TableCell>{format(inv.fecha_hora, 'dd/MM/yyyy HH:mm:ss')}</TableCell>
              <TableCell>{inv.id_invit}</TableCell>
              <TableCell className="text-right pr-16">{inv.tipo_pase}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
