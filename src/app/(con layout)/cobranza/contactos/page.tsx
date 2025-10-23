"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { Toaster } from 'sonner'



export default async function Page() {
  return (
    <div className='bg-slate-100 h-full p-7'>

      <Toaster />
      <div className='bg-white shadow-md rounded-md p-5 h-full w-full'>
        <h1 className='text-xl'>Casos Asignados Para Primer Contacto</h1>
          <div className='flex gap-2'>
            <Link href={'/cobranza/contactos/2'}><Button>maryelin</Button></Link>
            <Link href={'/cobranza/contactos/3'}> <Button>Gianfranco</Button></Link>
            <Link href={'/cobranza/contactos/4'}> <Button>Daniela</Button></Link>
          </div>
      </div>
    </div>
  )
}
