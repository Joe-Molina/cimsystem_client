import React from 'react'
import { ContactProps } from '../../../types/types'
import { format } from '@formkit/tempo'
import { DialogEditCase } from './DialogEditCase'

export function DataCaseRow({ info,  date, color }: { info:string, date?: Date, color: string}) {
  return (
      <span className={`bg-${color}-100 text-${color}-800 p-2 rounded-md w-full`}>{info} {date ? format( date, 'short') : ''}</span>
  )
}

export function DataCase({caso}: { caso: ContactProps }) {
  return (
   <div className='  border-slate-300 flex flex-col gap-5 items-end border p-3 h-72 rounded-md overflow-auto'>
    <div className='flex w-full gap-4 justify-between'>
    <DialogEditCase id={caso.id}/>
    {caso.caseStatus ? <DataCaseRow color='green' info='Caso concluido'/>: <DataCaseRow color='red' info={`Caso abierto ${caso.contactCall_createdAt ? format( caso.contactCall_createdAt, 'short') : format( caso.createdAt, 'short')}`}/>}
    </div>
    <div className='flex flex-col gap-2 w-full'>
      <div className='flex w-full gap-3'>
        {caso.contact ? <DataCaseRow info='Mensaje: ' date={caso.contact_createdAt!} color='green'/> : <DataCaseRow info='Mensaje: ' color='red'/>}
        {caso.contactCall ? <DataCaseRow info='Llamada: ' date={caso.contactCall_createdAt!} color='green'/> : <DataCaseRow info='llamada: ' color='red'/>}     
      </div>
        {caso.PromisePayment ? <DataCaseRow info='este caso tiene una promesa de pago'color='yellow'/> : ''}
        {caso.PromiseNonPayment ? <DataCaseRow info='este caso tiene una promesa de Impago'color='red'/> : ''}
        <div className='flex flex-col bg-slate-100 p-3'>
          <p>nota:</p>
        {caso.note ? <DataCaseRow info={caso.note} color=''/> : ''}
        </div>
        
    </div>

   </div>
  )
}