import React from 'react'

export function Datazo({cant, dato}:{dato: string, cant: number}) {
  return (
    <div className='flex flex-col items-center justify-center w-full bg-blue-200 text-blue-600'>
        <span className='text-xl'>{cant}</span>
        <span className='text-xs'>{dato}</span>
    </div>
  )
}
