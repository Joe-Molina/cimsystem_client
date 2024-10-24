import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Back from '@/app/syh/components/header/BackButton'

async function FacturaSocioPage({ params: { codigo } }: { params: { codigo: string } }) {

  const data = await fetch(`http://localhost:3002/facturas/${codigo}`)

  const { facturas } = await data.json()

  return (
    <div className='z-10 overflow-auto m-4 border border-zinc-100 rounded-md mb-3'>
      <Back />
      <h1 className='p-1 px-3 text-3xl font-semibold'>Facturas</h1>
      <h2 className='p-3 text-3xl font-semibold'>{facturas[0]?.nombrecli + `. (${codigo})`}</h2>
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
            <TableHead className="text-right">Monto total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {
            facturas.map((dato: any, index: any) => (
              dato.tipodoc == "FAC" &&
              <TableRow key={index} className={dato.estatusdoc != 2 ? 'bg-red-700 hover:bg-red-800 text-white ' : ''}>
                <TableCell>{dato.fechadoc.slice(0, 10)}</TableCell>
                <TableCell>{dato.documento}</TableCell>
                <TableCell>{dato.nombre + dato.notas}</TableCell>
                <TableCell>{dato.tipodoc}</TableCell>
                <TableCell>{dato.proveedor}</TableCell>
                <TableCell>{dato.cantidad}</TableCell>
                <TableCell >{dato.emisor}</TableCell>
                <TableCell className="text-right">{dato.montototal}</TableCell>
              </TableRow>

            ))
          }

        </TableBody>
      </Table>
    </div>
  )
}

export default FacturaSocioPage