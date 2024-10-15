'use client'

import React from "react"
import Link from "next/link"
import { useState } from "react"
import { BuscadorProps, Socio } from "@/types"
import { Input } from "@/components/ui/input"



export const Buscador: React.FC<BuscadorProps> = ({ socios }) => {

  const [search, setSearch] = useState('')
  const [stwich, setStwich] = useState(false)

  //funcion de busqueda
  const searcher = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target?.value)
  }

  // metodo de filtrado
  const results = !search ? socios : socios.filter((dato: Socio) => dato.nombre.toUpperCase().includes(search.toLocaleUpperCase()))
  const resultsCodigo = !search ? socios : socios.filter((dato: Socio) => dato.accion.toUpperCase().includes(search.toLocaleUpperCase()))

  const handleCLick = () => {
    setStwich(!stwich)
  }

  return (
    <div className=" h-full bg-slate-50 text-zinc-700">
      <div className="flex flex-col p-2 w-full bg-white">
        <p className="pl-1 font-bold ">Buscar Socio</p>
        <article className="flex flex-row items-center rounded-sm mb-3 ">
          <Input value={search} onChange={searcher} type="text" placeholder={stwich ? 'Introduce una accion' : 'Introduce un nombre'} className="h-7 ml-1 p-2 rounded-sm text-zinc-500 shadow-sm shadow-slate-300" />
          <button className=" bg-white py-1 px-2 mx-2 rounded-sm text-sm hover:bg-zinc-600 hover:text-white transition text-zinc-500 shadow-sm shadow-slate-300" onClick={handleCLick}> cambiar filtro </button>
        </article>
      </div>
      <div className='h-full overflow-y-auto scrollbar '>
        {!stwich ?
          results.map((socio: Socio) => (
            <Link className='flex flex-col p-2 border-y hover:bg-zinc-200 transition hover:text-zinc-950' href={`/socios-junta/${socio.accion}`} key={socio.accion} >
              <p className='text-end'>{socio.accion}</p>
              <p className='text-xs'>{socio.nombre}</p>
            </Link>
          ))
          :
          resultsCodigo.map((socio: Socio) => (
            <Link className='flex flex-col p-2 border-y hover:bg-zinc-200 transition hover:text-zinc-950' href={`/socios-junta/${socio.accion}`} key={socio.accion} >
              <p className='text-end'>{socio.accion}</p>
              <p className='text-xs'>{socio.nombre}</p>
            </Link>
          ))

        }
      </div>
    </div >
  )
}