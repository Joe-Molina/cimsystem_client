import React from 'react'
import Image from 'next/image'
import { useFacturasDetails } from '../hooks/useFacturasDetails'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface FacturasPros {
  codigo: string
}

export const Facturas: React.FC<FacturasPros> = ({ codigo }) => {

  const { DetallesFactura } = useFacturasDetails({ codigo })

  console.log(DetallesFactura)

  if (!DetallesFactura) {
    return (
      <Image src={"/loader3.webp"} alt={"loader"} width={400} height={400} className="h-24 w-24" />
    )
  }

  return (

    <section className="w-full z-30 overflow-auto max-h-[43vh] overflow-x-hidden">
      <Table>
        <TableCaption>Lista de facturas recientes</TableCaption>
        <TableHeader>
          <TableRow className=''>
            <TableHead className="">fecha</TableHead>
            <TableHead >Documento</TableHead>
            <TableHead >Nombre</TableHead>
            <TableHead>tipo docmento</TableHead>
            <TableHead>Proveedor</TableHead>
            <TableHead>cantidad</TableHead>
            <TableHead>emisor</TableHead>
            <TableHead>nombre cli</TableHead>
            <TableHead className="text-right">Monto total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            DetallesFactura.map((dato: any, index: any) => (
              dato.tipodoc == "FAC" &&
              <TableRow key={index} className={`text-zinc-500`}>
                <TableCell>{dato.fechadoc.slice(0, 10)}</TableCell>
                <TableCell>{dato.documento}</TableCell>
                <TableCell>{dato.nombre + dato.notas}</TableCell>
                <TableCell>{dato.tipodoc}</TableCell>
                <TableCell>{dato.proveedor}</TableCell>
                <TableCell>{dato.cantidad}</TableCell>
                <TableCell >{dato.emisor}</TableCell>
                <TableCell >{dato.nombrecli}</TableCell>
                <TableCell className="text-right">{dato.montototal}</TableCell>
              </TableRow>

            ))
          }

        </TableBody>
      </Table>

    </section>

  )
}
