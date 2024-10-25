/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Image from 'next/image'



export default function Dates({ fechaInicio, fechaFin }: any) {

  console.log(typeof (fechaFin))
  console.log(typeof (fechaInicio))

  const fin = typeof (fechaFin) === "string" ? fechaFin.slice(0, 10) : fechaFin.toISOString().slice(0, 10)
  const start = typeof (fechaInicio) === "string" ? fechaInicio.slice(0, 10) : fechaInicio.toISOString().slice(0, 10)


  return (
    <div className='flex justify-around border-t items-center '>

      <div className='flex items-center gap-1 text-sm font-medium '><Image src='/iconos/up.svg' alt='' width={20} height={20} />{start}</div>
      {/* end time  */}
      <div className='flex items-center text-sm font-medium justify-center gap-1'>{fin}<Image src='/iconos/down.svg' alt='' width={20} height={20} /></div>

    </div>
  )
}
