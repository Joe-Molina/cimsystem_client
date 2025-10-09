import { TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import { format } from '@formkit/tempo'
import { Cobranza_info } from '../../../components/DataTable'
import { DialogWhatsApp } from './DialogWs'
import { ContactActions, ContactProps } from '../../types/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function TableRowContact({contact, contactActions, cobranza}: {contact: ContactProps, contactActions:ContactActions, cobranza: Cobranza_info }) {
  return (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">{contact.accion}</TableCell>
              <TableCell className="font-medium">{cobranza.nombre}</TableCell>
              <TableCell className="font-medium">{contact.contact ? <button  className="bg-green-200 inline-block px-2 rounded-md text-green-700 font-bold"><div>mensaje enviado</div></button> : <button  className="bg-red-200 inline-block px-2 rounded-md text-red-700 font-bold">sin contactar</button>}</TableCell>
              <TableCell></TableCell>
              <TableCell className="font-medium">{contact.response ? <button className="bg-green-200 inline-block px-2 rounded-md text-green-700 font-bold">Respondido</button> : contact.contact ? <button  className="bg-red-200 inline-block px-2 rounded-md text-red-700 font-bold">sin Respuesta</button>: <button className="bg-red-300 inline-block px-2 rounded-md text-red-800 font-bold">no contactado</button>}</TableCell>
              <TableCell className="font-medium">{contact.contactCall ? <button  className="bg-green-200 inline-block px-2 rounded-md text-green-700 font-bold">Llamada realizada</button> : <button className="bg-red-200 inline-block px-2 rounded-md text-red-700 font-bold">sin Llamar</button>}</TableCell>
              <TableCell>{cobranza.celular && <span className='p-2 bg-slate-500 text-slate-200 rounded-md font-normal'>{cobranza.celular}</span>}</TableCell>
              <TableCell className="font-medium">{contact.responseCall ? <button className="bg-green-200 inline-block px-2 rounded-md text-green-700 font-bold">Llamada atendida</button> : contact.contactCall ? <button className="bg-red-200 inline-block px-2 rounded-md text-red-700 font-bold">no Atentido</button>: <button onClick={() => contactActions.actualizarResponseCall(contact.id)} className="bg-red-300 inline-block px-2 rounded-md text-red-800 font-bold">esperando llamar</button>}</TableCell>
              <TableCell className="font-medium">
                { contact.responseCall || contact.response 
                ?
                  !contact.caseStatus ? <Button className="bg-green-100 inline-block rounded-md text-green-600 font-bold hover:bg-green-900 hover:text-green-400">Caso Asignado</Button> : <Button className="bg-sky-100 inline-block rounded-md text-sky-600 font-bold hover:bg-sky-900 hover:text-sky-400">Caso Cerrado</Button>
                :
                    contact.contactAvailable ? 
                      <button className="bg-red-200 inline-block px-2 rounded-md text-red-700 font-bold">contacto no disponible</button>
                      :
                      <button className="bg-yellow-200 inline-block rounded-md text-yellow-700 font-bold p-2">verificar contacto</button>
                    }
                    </TableCell>
              <TableCell className="font-medium"><span className='bg-orange-300 px-2 rounded-md text-orange-800 font-semibold'>{contact.cuotasIniciales}</span></TableCell>
              <TableCell className="font-medium"><span className='bg-orange-300 px-2 rounded-md text-orange-800 font-semibold'>{cobranza.cant_cuotas_vencidas}</span></TableCell>
              <TableCell className="text-right"><span className="bg-blue-100 inline-block px-2 rounded-md text-sky-500 font-semibold">{format(contact.createdAt, "full")}</span></TableCell> 
              <TableCell><Link href={`/cobranza/contactos/casos/${contact.accion}`} ><Button >Ver Caso</Button></Link></TableCell>
            </TableRow>
  )
}
