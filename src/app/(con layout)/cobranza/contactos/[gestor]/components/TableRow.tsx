import { TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import { format } from '@formkit/tempo'
import { Cobranza_info } from '../../../components/DataTable'
import { DialogWhatsApp } from './DialogWs'
import { ContactActions, ContactProps } from '../../types/types'

export default function TableRowContact({contact, contactActions, cobranza}: {contact: ContactProps, contactActions:ContactActions, cobranza: Cobranza_info }) {
  return (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">{contact.accion}</TableCell>
              <TableCell className="font-medium">{cobranza.nombre}</TableCell>
              <TableCell className="font-medium">{contact.contact ? <button  className="bg-green-200 inline-block px-2 rounded-md text-green-700 font-bold"><div>contactado</div></button> : <button onClick={() => contactActions.actualizarContacto(contact.id)} className="bg-red-200 inline-block px-2 rounded-md text-red-700 font-bold">sin contactar</button>}</TableCell>
              <TableCell><DialogWhatsApp accion={contact.accion} data={cobranza} actualizarContacto={contactActions.actualizarContacto} contactId={contact.id}/></TableCell>
              <TableCell className="font-medium">{contact.response ? <button className="bg-green-200 inline-block px-2 rounded-md text-green-700 font-bold">Respondido</button> : contact.contact ? <button onClick={() => contactActions.actualizarResponse(contact.id)} className="bg-red-200 inline-block px-2 rounded-md text-red-700 font-bold">sin Respuesta</button>: <button className="bg-red-300 inline-block px-2 rounded-md text-red-800 font-bold">no contactado</button>}</TableCell>
              <TableCell className="font-medium">{contact.contactCall ? <button  className="bg-green-200 inline-block px-2 rounded-md text-green-700 font-bold">Llamada realizada</button> : <button onClick={() => contactActions.actualizarContactoCall(contact.id)} className="bg-red-200 inline-block px-2 rounded-md text-red-700 font-bold">sin Llamar</button>}</TableCell>
              <TableCell>{cobranza.celular && <span className='p-2 bg-slate-500 text-slate-200 rounded-md font-normal'>{cobranza.celular}</span>}</TableCell>
              <TableCell className="font-medium">{contact.responseCall ? <button className="bg-green-200 inline-block px-2 rounded-md text-green-700 font-bold">Llamada atendida</button> : contact.contactCall ? <button onClick={() => contactActions.actualizarResponseCall(contact.id)} className="bg-red-200 inline-block px-2 rounded-md text-red-700 font-bold">no Atentido</button>: <button onClick={() => contactActions.actualizarResponseCall(contact.id)} className="bg-red-300 inline-block px-2 rounded-md text-red-800 font-bold">esperando llamar</button>}</TableCell>
              <TableCell className="font-medium">
                { contact.responseCall || contact.response 
                ?
                  <button className="bg-green-100 inline-block px-2 rounded-md text-green-600 font-bold">Caso Asignado</button>
                :
                    contact.contactAvailable ? 
                      <button className="bg-red-200 inline-block px-2 rounded-md text-red-700 font-bold">contacto no disponible</button>
                      :
                      <button onClick={() => contactActions.actualizarContactAvailable(contact.id)} className="bg-yellow-200 inline-block rounded-md text-yellow-700 font-bold p-2">verificar contacto</button>
                    }
                    </TableCell>
              <TableCell className="font-medium"><span className='bg-orange-300 px-2 rounded-md text-orange-800 font-semibold'>{cobranza.cant_cuotas_vencidas}</span></TableCell>
              <TableCell className="text-right"><span className="bg-blue-100 inline-block px-2 rounded-md text-sky-500 font-semibold">{format(contact.createdAt, "full")}</span></TableCell> 
            </TableRow>
  )
}
