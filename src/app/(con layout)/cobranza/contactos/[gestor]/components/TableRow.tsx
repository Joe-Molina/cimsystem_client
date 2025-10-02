import { TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import { ContactActions, ContactProps } from "../page"
import { format } from '@formkit/tempo'
import useSendWs from '../hooks/useFetchCobranzas'
import { Cobranza_info } from '../../../components/DataTable'
import { DialogWhatsApp } from './DialogWs'

export default function TableRowContact({contact, contactActions, cobranza}: {contact: ContactProps, contactActions:ContactActions, cobranza: Cobranza_info }) {
  console.log(cobranza.cant_cuotas_vencidas)
  return (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">{contact.accion}</TableCell>
              <TableCell className="font-medium">{contact.contact ? <button  className="bg-green-200 inline-block px-2 rounded-md text-green-700 font-bold"><div>contactado</div></button> : <button onClick={() => contactActions.actualizarContacto(contact.id)} className="bg-red-200 inline-block px-2 rounded-md text-red-700 font-bold">sin contactar</button>}</TableCell>
              <TableCell className="font-medium">{contact.response ? <button className="bg-green-200 inline-block px-2 rounded-md text-green-700 font-bold">Respondido</button> : <button onClick={() => contactActions.actualizarResponse(contact.id)} className="bg-red-200 inline-block px-2 rounded-md text-red-700 font-bold">sin Responder</button>}</TableCell>
              <TableCell className="font-medium">{contact.contactCall ? <button  className="bg-green-200 inline-block px-2 rounded-md text-green-700 font-bold">Llamada realizada</button> : <button onClick={() => contactActions.actualizarContactoCall(contact.id)} className="bg-red-200 inline-block px-2 rounded-md text-red-700 font-bold">sin Llamar</button>}</TableCell>
              <TableCell className="font-medium">{contact.responseCall ? <button className="bg-green-200 inline-block px-2 rounded-md text-green-700 font-bold">Llamada atendida</button> : <button onClick={() => contactActions.actualizarResponseCall(contact.id)} className="bg-red-200 inline-block px-2 rounded-md text-red-700 font-bold">no Atentido</button>}</TableCell>
              <TableCell className="font-medium">
                {
                  contact.contact ? 
                    <button className="bg-yellow-100 inline-block px-2 rounded-md text-yellow-600 font-bold">esperando respuesta</button>
                    :
                    contact.contactAvailable ? 
                      <button className="bg-red-200 inline-block px-2 rounded-md text-red-700 font-bold">contacto no disponible</button>
                      :
                      <button onClick={() => contactActions.actualizarContactAvailable(contact.id)} className="bg-violet-200 inline-block px-2 rounded-md text-violet-700 font-bold">verificar contacto</button>
                    }
                    </TableCell>
              <TableCell><DialogWhatsApp accion={contact.accion} data={cobranza} actualizarContacto={contactActions.actualizarContacto} contactId={contact.id}/></TableCell>
              <TableCell><span>{cobranza.celular}</span></TableCell>
              <TableCell className="font-medium"><span className='bg-orange-300 px-2 rounded-md text-orange-800 font-semibold'>{cobranza.cant_cuotas_vencidas}</span></TableCell>
              <TableCell className="text-right"><span className="bg-blue-100 inline-block px-2 rounded-md text-sky-500 font-semibold">{format(contact.createdAt, "full")}</span></TableCell> 
            </TableRow>
  )
}
