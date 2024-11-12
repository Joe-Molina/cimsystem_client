import React from 'react'
import { useFacturas } from '../socios/[accion]/hooks/useFacturas'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { format } from 'date-fns'
import { TableFacturasDetails } from '../socios/[accion]/components/TableFacturasDetails'



interface FacturasPros {
  accion: string
}

export const Facturas: React.FC<FacturasPros> = ({ accion }) => {

  const { facturas } = useFacturas({ accion })

  return (
    <section className="w-full z-30 overflow-auto max-h-[43vh] overflow-x-hidden">
      <Accordion type="single" collapsible className="w-full">
        <div className='flex w-full justify-between items-center text-sm'>
          <div className='w-32'>N Factura</div>
          <div className='w-36'>Fecha</div>
          <div className='w-36'>Accion</div>
          <div className='w-36'>Sub_Total</div>
          <div className='w-36'>IVA</div>
          <div className='w-36'>Total</div>
          <div className='w-5'>.</div>
        </div>
        {
          facturas?.map(fac => (
            <AccordionItem value={fac.numero} key={fac.numero}>
              <AccordionTrigger className='flex  w-full text-zinc-500'>
                <div className='w-32'>{fac.numero}</div>
                <div className='w-36'> {format(fac.fecha_hora, 'dd/MM/yyyy HH:mm:ss')}</div>
                <div className='w-36 font-medium'>{fac.accion}</div>
                <div className='w-36 font-medium'>{fac.sub_total} Bs</div>
                <div className='w-36 font-medium'>{fac.monto_iva} Bs</div>
                <div className='w-36 font-medium '>{fac.total} Bs</div>

              </AccordionTrigger>
              <AccordionContent className='pl-12'>
                <TableFacturasDetails numero={fac.numero} />
              </AccordionContent>
            </AccordionItem>
          ))
        }
      </Accordion>
    </section>
  )
}
