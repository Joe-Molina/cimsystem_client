"use client"
import React from 'react'
import { useParams } from 'next/navigation'; // <-- Correcto, para App Router
import { Toaster } from '@/components/ui/sonner';
import useFetchcases from '../hooks/useCases';
import { DataCase } from './components/DataCaseRow';
import { useAllCobranzaInfo } from '../../../react_query_hooks/useCobranza';
import useFetchCobranza from '../hooks/useCobranza';
import { DialogWhatsApp } from '../../[gestor]/components/DialogWs';
import { enviarWs } from '../../../components/DataTable';
import { Button } from '@/components/ui/button';

export default function Page() { // NO es async y NO recibe 'params'

    const params = useParams<{ accion: string }>();
    const accion = params.accion;  
    const {query: {data}} = useAllCobranzaInfo()

    const {cases,isLoading} = useFetchcases({accion})
    const {cobranza, isLoadingCobranza} = useFetchCobranza({accion})

    if(!isLoadingCobranza){
      console.log(cobranza)
    }

    return (
        <div className='bg-slate-100 h-[calc(100%-40px)] md:p-7 sm:p-1'>
            <Toaster/>
            <div className='bg-white shadow-md rounded-md p-5 h-full w-full '>
                {/* Mostramos el ID del gestor obtenido */}
            <div className='flex gap-2 items-center '>
              <h1 className='font-bold text-xl'>Casos: {accion}</h1>
            {!isLoadingCobranza && cobranza?.celular ? <Button className="w-26 text-start" variant="outline" onClick={enviarWs.bind(null, cobranza!)}>Enviar Mensaje</Button> : <p>cargando</p>}
            <h1 className='font-bold text-sm bg-slate-200 p-1 rounded-sm '>{cobranza?.celular}</h1>
            </div>
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