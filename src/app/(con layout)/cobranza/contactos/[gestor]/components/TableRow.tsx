import { TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import { ContactProps } from "../page"
import { format } from '@formkit/tempo'
import useSendWs from '../hooks/useFetchCobranzas'
import { Cobranza_info } from '../../../components/DataTable'
import { DialogWhatsApp } from './DialogWs'

export default function TableRowContact({contact, actualizarContacto, actualizarResponse, cobranza}: {contact: ContactProps, actualizarContacto: (id: number) => Promise<void>, actualizarResponse: (id: number) => Promise<void>, cobranza: Cobranza_info }) {
  console.log(cobranza.cant_cuotas_vencidas)
  return (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">{contact.accion}</TableCell>
              <TableCell className="font-medium">{contact.contact ? <button  className="bg-green-200 inline-block px-2 rounded-md text-green-700 font-bold">contactado</button> : <button onClick={() => actualizarContacto(contact.id)} className="bg-red-200 inline-block px-2 rounded-md text-red-700 font-bold">sin contactar</button>}</TableCell>
              <TableCell className="font-medium">{contact.response ? <button className="bg-green-200 inline-block px-2 rounded-md text-green-700 font-bold">Respondido</button> : <button onClick={() => actualizarResponse(contact.id)} className="bg-red-200 inline-block px-2 rounded-md text-red-700 font-bold">sin Responder</button>}</TableCell>
              <TableCell><DialogWhatsApp accion={contact.accion} data={cobranza} actualizarContacto={actualizarContacto} contactId={contact.id}/></TableCell>
              <TableCell><span>{cobranza.celular}</span></TableCell>
              <TableCell className="font-medium"><span className='bg-orange-300 px-2 rounded-md text-orange-800 font-semibold'>{cobranza.cant_cuotas_vencidas}</span></TableCell>
              <TableCell className="text-right"><span className="bg-blue-100 inline-block px-2 rounded-md text-sky-500 font-semibold">{format(contact.createdAt, "full")}</span></TableCell> 
            </TableRow>
  )
}
