"use client"
import React from 'react'
import { useParams } from 'next/navigation'; // <-- Correcto, para App Router
import { Toaster } from '@/components/ui/sonner';
import useFetchcases from '../hooks/useCases';
import { DataCase } from './components/DataCaseRow';

export default function Page() { // NO es async y NO recibe 'params'

    const params = useParams<{ accion: string }>();
    const accion = params.accion;  

    const {cases,isLoading} = useFetchcases({accion})

    return (
        <div className='bg-slate-100 h-[calc(100%-40px)] md:p-7 sm:p-1'>
            <Toaster/>
            <div className='bg-white shadow-md rounded-md p-5 h-full w-full '>
                {/* Mostramos el ID del gestor obtenido */}
                
            <h1 className='font-bold text-xl'>Casos: {accion}</h1>
                <div className='flex items-center mb-3  p-2 rounded-md h-full'>
                  <div className='flex gap-3 w-1/2 overflow-auto h-full p-4'>
                    {
                      isLoading  || !cases
                      ?
                      <p>cargando</p>
                      :
                      cases.map((caso) => (
                          <DataCase caso={caso} key={caso.id}/>
                      ))
                    }
                  </div>
                </div>
            </div>
        </div>
    )
}