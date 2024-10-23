'use client'

import React from "react"
import Link from "next/link"
import { useState } from "react"

interface SocioSearch {
  codigo: string
  nombre: string
}

interface Socios {
  socios: SocioSearch[]
}

export const Buscador = ({ socios }: Socios) => {

  const [search, setSearch] = useState('')
  const [stwich, setStwich] = useState(false)
  const [loading, setLoading] = useState(false)


  //funcion de busqueda
  const searcher = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  // metodo de filtrado
  const results = !search ? socios : socios.filter((dato: SocioSearch) => dato.nombre.toUpperCase().includes(search.toLocaleUpperCase()))
  const resultsCodigo = !search ? socios : socios.filter((dato: SocioSearch) => dato.codigo.toUpperCase().includes(search.toLocaleUpperCase()))

  const handleCLick = () => {
    setStwich(!stwich)
  }

  const handleCLick2 = () => {
    setLoading(!loading)
    console.log(loading)
  }

  return (
    <div className="flex flex-col h-full">

      {
        loading ?

          <div className="text-3xl font-bold">cargando...</div>

          :

          <>
            <h1 >Buscar Socio</h1>
            <nav className=" h-10 flex items-center rounded-sm mb-3">
              <input value={search} onChange={searcher} type="text" placeholder={stwich ? 'Introduce una accion' : 'Introduce un nombre'} className="h-7 ml-1 p-2 rounded-sm text-zinc-500 shadow-sm shadow-slate-300" />
              <button className="bg-white py-1 px-2 mx-2 rounded-sm text-sm hover:bg-slate-600 hover:text-white transition text-zinc-500 shadow-sm shadow-slate-300" onClick={handleCLick}> cambiar filtro </button>

            </nav>


            <section className='overflow-y-auto'>

              <article className='flex my-1 items-center border-b border-b-gray-200'>
                <p className='py-1 px-3 text-sm rounded-xl mx-2 font-bold w-24'>accion n° </p>
                <p className='py-1 px-3 text-sm rounded-xl mx-2 font-bold'>Nombre</p>
              </article>

              {!stwich ?
                results.map((socio: SocioSearch) => (
                  <Link className='flex my-2 ' href={`/socios/${socio.codigo}`} key={socio.codigo} onClick={handleCLick2}>
                    <p className='py-1 px-3 text-sm rounded-md mx-2 font-thin bg-zinc-600 text-zinc-100  w-24 text-center'>{socio.codigo}</p>
                    <p className='py-1 px-3 text-sm rounded-md mx-2 shadow-sm hover:bg-gray-200 '>{socio.nombre}</p>
                  </Link>
                ))
                :
                resultsCodigo.map((socio: SocioSearch) => (
                  <Link className='flex my-2 ' href={`/socios/${socio.codigo}`} key={socio.codigo} onClick={handleCLick2}>
                    <p className='py-1 px-3 text-sm rounded-md mx-2 font-thin bg-zinc-600 text-zinc-100  w-24 text-center'>{socio.codigo}</p>
                    <p className='py-1 px-3 text-sm rounded-md mx-2 shadow-sm hover:bg-gray-200 '>{socio.nombre}</p>
                  </Link>
                ))

              }

            </section>

          </>
      }

    </div>
  )
}