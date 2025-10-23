'use client'
import React from 'react'
import { Datazo } from './components/Datazo'
import { useGetCasesWithCuotas } from '../hooks/useCasesWithCuotas'
import { separateDataByGestor } from './utils/transformContactsToChartData'
import { ChartPie } from './components/Chart'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function page() {
  const {cases , isLoadingCases} = useGetCasesWithCuotas() // esto lo puedo cambiar por uno q carga mas rapido pero no tiene las cuotas actuales

  if(isLoadingCases){
    return(
      <div>cargando</div>
    )
  }
  const data = separateDataByGestor(cases)

  // la chamba de hoy sera poner chartds (listoooooooooooooooo hijuputaaaaaaaaa)
  return (
    <div className='bg-slate-100 h-full p-7'>
      <div className='bg-white shadow-md rounded-md p-5 h-full w-full'>
        <h1 className='text-xl'>Reporte General</h1>
              <div className='bg-white rounded-md p-5'>
        <h1 className='text-xl'>Casos Asignados Para Primer Contacto</h1>
          <div className='flex gap-2'>
            <Link href={'/cobranza/contactos/2'}><Button>maryelin</Button></Link>
            <Link href={'/cobranza/contactos/3'}> <Button>Gianfranco</Button></Link>
            <Link href={'/cobranza/contactos/4'}> <Button>Daniela</Button></Link>
          </div>
      </div>
        <div className='flex justify-between gap-4 w-full h-[calc(100%-30px)] '>
          <ChartPie dataName='Casos Cerrados' data={data.closeCases} text1='Casos que fueron cerrados este mes' />
          <ChartPie dataName='Total acciones' data={data.payments} text1='Acciones que pagaron este mes' />
          <ChartPie dataName='Cuotas Pagadas' data={data.totalPayments} text1='Cuotas pagadas desde el 7 de octubre' />
          <ChartPie dataName='Casos sin respuesta' data={data.noResponse} text1='Casos que no respondieron' />
          <ChartPie dataName='Contacto erroneo' data={data.contactUnavailable} text1='Acciones con un numero de contacto erroneo o no diponible' />
        </div>
      </div>
    </div>
  )
}

export default page