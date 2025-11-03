import React from 'react'
import { ContactProps } from '../../types/types'
import { format, } from '@formkit/tempo'
import { DialogEditCase } from './DialogEditCase'

export function DataCaseRow({ info,  date, color }: { info:string, date?: Date, color: string}) {
  return (
      <span className={`bg-${color}-100 text-${color}-800 p-2 rounded-md w-full`}>{info} {date ? format( date, 'short') : ''}</span>
  )
}

export function DataCaseRowContact({ info,  date, contact, response }: { info:string, date?: Date, contact: boolean, response: boolean}) {
  return (
      <div className='flex flex-col bg-slate-50 p-2'> 
        <div className='flex gap-1'>
        <span className={`p-2 rounded-md`}>{info}</span>
          <span className={`p-2 rounded-md w-full text-xs flex justify-center items-center ${contact? 'bg-green-200 text-green-800': 'bg-red-200 text-red-800'} `}>{contact? `Realizado` : 'Pendiente'}</span>
          <span className={`p-2 rounded-md w-full  text-xs flex justify-center items-center ${response? 'bg-green-200 text-green-800': 'bg-red-200 text-red-800'} `}>{response? `respondido ${(format(date!,'short'))}` : 'sin respuesta'}</span>
        </div>
      </div>
  )
}

export function DataCase({caso}: { caso: ContactProps }) {

  return (
   <div className='border-slate-300 flex flex-col gap-5 items-end border p-3 rounded-md'>
    <div className='flex w-full gap-4 justify-between'>
    <DialogEditCase id={caso.id}/>
    {caso.caseStatus ? <DataCaseRow color='green' info='Caso concluido'/>: <DataCaseRow color='red' info={`Caso abierto ${caso.contactCall_createdAt ? format( caso.contactCall_createdAt, 'short') : format( caso.createdAt, 'short')}`}/>}
    </div>
    <div className='flex flex-col gap-2 w-full'>
        {caso.PromisePayment ? <DataCaseRow info='este caso tiene una promesa de pago'color='green'/> : ''}
        {caso.PromiseNonPayment ? <DataCaseRow info='este caso tiene una promesa de Impago'color='red'/> : ''}
      <DataCaseRow info={caso.contactAvailable? 'contacto no disponible' : 'contacto disponible'} color={caso.contactAvailable? "red" : 'green'}/>
      <div className='flex flex-col w-full gap-3'>
        <DataCaseRowContact info='Mensaje: ' date={caso.response_createdAt!} contact={caso.contact} response={caso.response}/>
        <DataCaseRowContact info='Llamada: ' date={caso.responseCall_createdAt!} contact={caso.contactCall} response={caso.responseCall}/>
      </div>
        <div className='flex flex-col bg-slate-100 p-3'>
          <p>nota:</p>
        {caso.note ? <DataCaseRow info={caso.note} color=''/> : ''}
        </div>
        
    </div>
   </div>
  )
}